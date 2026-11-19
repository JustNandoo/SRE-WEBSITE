-- ====================================================================
-- Migration: Applicant accounts & Open Recruitment registration
-- Path: apps/backend/supabase/migrations/20261117000000_applicant_registration.sql
--
-- Mulai migrasi ini, pengunjung publik bisa membuat akun sendiri
-- (Supabase Auth email + password) untuk mengisi form pendaftaran.
-- Artinya "authenticated" TIDAK lagi berarti "staf SRE", jadi:
--   1. Semua policy "Allow authenticated full access on <tabel>" diganti
--      menjadi akses khusus akun CMS (punya baris di public.user_roles).
--   2. public.user_roles hanya bisa dibaca pemiliknya / staf CMS.
--   3. Tabel public.registrations + bucket storage registration-files.
--
-- Jalankan di: Supabase Dashboard → SQL Editor (atau `supabase db push`).
-- ====================================================================


-- ==========================================================
-- 1. HELPER: apakah user yang sedang login adalah akun CMS?
-- ==========================================================
-- SECURITY DEFINER agar bisa membaca user_roles tanpa terkena RLS
-- (mencegah rekursi saat dipakai di policy user_roles sendiri).
CREATE OR REPLACE FUNCTION public.is_cms_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_cms_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_cms_user() TO anon, authenticated;


-- ==========================================================
-- 2. KETATKAN POLICY CMS YANG SUDAH ADA
-- ==========================================================
-- Setiap tabel yang punya policy "Allow authenticated full access on X"
-- (initial_schema + coordinator_tables) diganti ke is_cms_user().
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND policyname LIKE 'Allow authenticated full access on %'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, pol.tablename);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.is_cms_user()) WITH CHECK (public.is_cms_user())',
      'Allow CMS staff full access on ' || pol.tablename,
      pol.tablename
    );
  END LOOP;
END $$;


-- ==========================================================
-- 3. KETATKAN public.user_roles
-- ==========================================================
-- Sebelumnya: SELECT USING (true) + FOR ALL USING (true) → siapa pun
-- (termasuk anon) bisa membaca & mengubah role. Penulisan sekarang hanya
-- lewat RPC manage_cms_user / update_own_profile (SECURITY DEFINER).
DROP POLICY IF EXISTS "Allow public read access on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow super-admin and admin access on user_roles" ON public.user_roles;
-- Bisa sudah dibuat oleh 20261118000000_secure_user_roles.sql bila dijalankan lebih dulu.
DROP POLICY IF EXISTS "Allow own or CMS read on user_roles" ON public.user_roles;

CREATE POLICY "Allow own or CMS read on user_roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_cms_user());


-- ==========================================================
-- 4. TABEL PENDAFTARAN (OPEN RECRUITMENT)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    nrp VARCHAR(15) NOT NULL CHECK (nrp ~ '^[0-9]{6,15}$'),
    study_program VARCHAR(150) NOT NULL,
    division_id VARCHAR(50) NOT NULL,     -- Pilihan 1 (wajib)
    division_id_2 VARCHAR(50),            -- Pilihan 2 (opsional, tidak boleh sama dgn pilihan 1)
    cover_letter_path TEXT NOT NULL,   -- Motivation letter (.pdf)
    cv_path TEXT NOT NULL,             -- CV (.pdf)
    portfolio_url TEXT,                -- Wajib untuk graphic-design, content-marketing, web-dev
    mbti_result_path TEXT NOT NULL,    -- Screenshot hasil tes MBTI (.jpg / .png)
    status VARCHAR(20) NOT NULL DEFAULT 'Menunggu'
      CHECK (status IN ('Menunggu', 'Diproses', 'Lolos', 'Tidak Lolos')),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT registrations_division_open CHECK (
      division_id IN ('hr', 'pr', 'comp-research', 'education',
       'content-marketing', 'graphic-design', 'web-dev', 'finance',
       'brand-ambassador', 'treasurer')
    ),
    CONSTRAINT registrations_division2_open CHECK (
      division_id_2 IS NULL OR division_id_2 IN ('hr', 'pr', 'comp-research', 'education',
       'content-marketing', 'graphic-design', 'web-dev', 'finance',
       'brand-ambassador', 'treasurer')
    ),
    -- Pilihan 2 boleh kosong, tapi jika diisi tidak boleh sama dengan pilihan 1.
    CONSTRAINT registrations_division2_distinct CHECK (
      division_id_2 IS NULL OR division_id_2 <> division_id
    ),
    -- Portofolio wajib bila SALAH SATU pilihan termasuk divisi berportofolio.
    CONSTRAINT registrations_portfolio_required CHECK (
      (division_id NOT IN ('content-marketing', 'graphic-design', 'web-dev')
        AND (division_id_2 IS NULL
             OR division_id_2 NOT IN ('content-marketing', 'graphic-design', 'web-dev')))
      OR (portfolio_url IS NOT NULL AND portfolio_url ~* '^https?://')
    )
);

CREATE INDEX IF NOT EXISTS registrations_division_idx ON public.registrations (division_id);
CREATE INDEX IF NOT EXISTS registrations_division2_idx ON public.registrations (division_id_2);
CREATE INDEX IF NOT EXISTS registrations_status_idx ON public.registrations (status);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Pendaftar: hanya bisa melihat & mengirim pendaftarannya sendiri (sekali kirim).
CREATE POLICY "Applicants read own registration"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Applicants submit own registration"
  ON public.registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() AND status = 'Menunggu');

-- Staf CMS: akses penuh untuk review & ubah status.
CREATE POLICY "Allow CMS staff full access on registrations"
  ON public.registrations
  FOR ALL
  TO authenticated
  USING (public.is_cms_user())
  WITH CHECK (public.is_cms_user());

CREATE TRIGGER update_registrations_modtime
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


-- ==========================================================
-- 5. STORAGE BUCKET UNTUK BERKAS PENDAFTARAN
-- ==========================================================
-- Private bucket. Struktur path: <user_id>/<jenis-berkas>.<ext>
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'registration-files',
  'registration-files',
  false,
  5242880, -- 5 MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Pendaftar hanya boleh mengelola berkas di folder miliknya sendiri.
-- (INSERT + SELECT + UPDATE dibutuhkan untuk upload dengan upsert.)
CREATE POLICY "Applicants upload own registration files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'registration-files'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Applicants read own registration files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'registration-files'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Applicants replace own registration files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'registration-files'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Staf CMS boleh membaca semua berkas pendaftar (untuk review).
CREATE POLICY "CMS staff read all registration files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'registration-files'
    AND public.is_cms_user()
  );
