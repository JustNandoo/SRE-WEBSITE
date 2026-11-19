-- ====================================================================
-- Migration: Tutup kebocoran public.user_roles
-- Path: apps/backend/supabase/migrations/20261118000000_secure_user_roles.sql
--
-- Masalah sebelum migrasi ini (dari 20260517000000_initial_schema.sql):
--   - "Allow public read access on user_roles"  SELECT USING (true)
--   - "Allow super-admin and admin access on user_roles" FOR ALL USING (true)
--   Policy tanpa "TO <role>" berlaku untuk anon juga. Siapa pun yang memegang
--   publishable key (ikut terkirim ke browser) bisa MEMBACA email + role +
--   password_text seluruh staf, dan bisa MENGUBAH/MENAMBAH baris user_roles
--   (misalnya menjadikan akunnya sendiri super-admin).
--
-- Yang dilakukan migrasi ini:
--   1. Semua policy lama di user_roles dihapus. Baca hanya baris sendiri
--      atau oleh staf CMS; tulis HANYA lewat RPC SECURITY DEFINER.
--   2. Hak tabel anon/authenticated dicabut (pertahanan berlapis).
--   3. manage_cms_user & update_own_profile ditulis ulang tanpa
--      password_text, plus perbaikan bug ambigu "user_id = user_id".
--   4. Kolom password_text DIHAPUS. Password hanya disimpan sebagai hash
--      bcrypt di auth.users.
--
-- Migrasi ini berdiri sendiri (idempotent) dan aman dijalankan sebelum
-- atau sesudah 20261117000000_applicant_registration.sql.
--
-- SETELAH MENJALANKAN: password semua akun staf yang pernah tersimpan di
-- password_text harus dianggap bocor. Ganti password setiap akun lewat
-- halaman /admin-sre/accounts (super-admin) atau /admin-sre/profile.
--
-- Jalankan di: Supabase Dashboard → SQL Editor (atau `supabase db push`).
-- ====================================================================


-- ==========================================================
-- 1. HELPER: apakah user yang sedang login adalah akun CMS?
-- ==========================================================
-- Sama persis dengan definisi di 20261117000000 (CREATE OR REPLACE).
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
-- 2. POLICY & HAK AKSES public.user_roles
-- ==========================================================
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Hapus SEMUA policy yang ada (termasuk yang mungkin dibuat manual di dashboard).
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_roles'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.user_roles', pol.policyname);
  END LOOP;
END $$;

-- Baca: baris milik sendiri (middleware & sidebar cek role) atau staf CMS
-- (halaman /admin-sre/accounts). anon tidak mendapat policy apa pun.
CREATE POLICY "Allow own or CMS read on user_roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_cms_user());

-- Tidak ada policy INSERT/UPDATE/DELETE: penulisan hanya lewat RPC di bawah.
REVOKE ALL ON public.user_roles FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.user_roles FROM authenticated;
GRANT SELECT ON public.user_roles TO authenticated;


-- ==========================================================
-- 3. RPC: manage_cms_user (CRUD akun staf oleh super-admin)
-- ==========================================================
-- Signature sama dengan versi lama agar frontend tetap kompatibel.
-- Perubahan:
--   - Hanya super-admin (p-level read-only, sesuai UI /admin-sre/accounts).
--   - Tidak lagi menyimpan password_text.
--   - UPDATE: password kosong = password tidak diganti.
--   - Password baru minimal 8 karakter.
--   - Perbaikan bug: "WHERE user_id = user_id" ambigu (parameter vs kolom
--     auth.identities.user_id) → sekarang dikualifikasi eksplisit.
--   - Super-admin tidak bisa menghapus akunnya sendiri / akun super-admin lain.
CREATE OR REPLACE FUNCTION public.manage_cms_user(
  action_type TEXT,
  user_id UUID,
  user_email TEXT,
  user_password TEXT,
  user_role TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user_id  CONSTANT UUID := manage_cms_user.user_id;
  v_email    CONSTANT TEXT := lower(trim(manage_cms_user.user_email));
  v_password CONSTANT TEXT := coalesce(manage_cms_user.user_password, '');
  v_role     CONSTANT TEXT := manage_cms_user.user_role;
  v_target_role TEXT;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.id = auth.uid() AND ur.role = 'super-admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: hanya super-admin yang dapat mengelola akun.';
  END IF;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'user_id wajib diisi.';
  END IF;

  IF action_type = 'CREATE' THEN
    IF v_email = '' OR v_role IS NULL OR v_role = '' THEN
      RAISE EXCEPTION 'Email dan role wajib diisi.';
    END IF;
    IF length(v_password) < 8 THEN
      RAISE EXCEPTION 'Password minimal 8 karakter.';
    END IF;

    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      v_email, crypt(v_password, gen_salt('bf')), NOW(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('role', v_role),
      NOW(), NOW()
    );

    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      v_user_id, v_user_id,
      jsonb_build_object('sub', v_user_id, 'email', v_email),
      'email', v_email, NOW(), NOW(), NOW()
    );

    INSERT INTO public.user_roles (id, email, role)
    VALUES (v_user_id, v_email, v_role);

    RETURN json_build_object('success', true, 'message', 'User created successfully');

  ELSIF action_type = 'UPDATE' THEN
    IF v_email = '' OR v_role IS NULL OR v_role = '' THEN
      RAISE EXCEPTION 'Email dan role wajib diisi.';
    END IF;
    IF v_password <> '' AND length(v_password) < 8 THEN
      RAISE EXCEPTION 'Password minimal 8 karakter.';
    END IF;

    UPDATE auth.users u
    SET
      email = v_email,
      encrypted_password = CASE
        WHEN v_password = '' THEN u.encrypted_password
        ELSE crypt(v_password, gen_salt('bf'))
      END,
      raw_user_meta_data = coalesce(u.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role', v_role),
      updated_at = NOW()
    WHERE u.id = v_user_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Akun tidak ditemukan.';
    END IF;

    UPDATE auth.identities i
    SET
      identity_data = jsonb_build_object('sub', v_user_id, 'email', v_email),
      provider_id = v_email,
      updated_at = NOW()
    WHERE i.user_id = v_user_id AND i.provider = 'email';

    UPDATE public.user_roles ur
    SET email = v_email, role = v_role, updated_at = NOW()
    WHERE ur.id = v_user_id;

    RETURN json_build_object('success', true, 'message', 'User updated successfully');

  ELSIF action_type = 'DELETE' THEN
    IF v_user_id = auth.uid() THEN
      RAISE EXCEPTION 'Tidak dapat menghapus akun sendiri.';
    END IF;

    SELECT ur.role INTO v_target_role FROM public.user_roles ur WHERE ur.id = v_user_id;
    IF v_target_role = 'super-admin' THEN
      RAISE EXCEPTION 'Akun super-admin tidak dapat dihapus.';
    END IF;

    DELETE FROM public.user_roles ur WHERE ur.id = v_user_id;
    DELETE FROM auth.identities i WHERE i.user_id = v_user_id;
    DELETE FROM auth.users u WHERE u.id = v_user_id;

    RETURN json_build_object('success', true, 'message', 'User deleted successfully');
  END IF;

  RAISE EXCEPTION 'Invalid action type';
END;
$$;

REVOKE ALL ON FUNCTION public.manage_cms_user(TEXT, UUID, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.manage_cms_user(TEXT, UUID, TEXT, TEXT, TEXT) TO authenticated;


-- ==========================================================
-- 4. RPC: update_own_profile (ganti password sendiri)
-- ==========================================================
-- Perubahan:
--   - Tidak lagi menyimpan password_text.
--   - Password minimal 8 karakter.
--   - Metadata lama (mis. full_name pendaftar) tidak ditimpa; role hanya
--     disinkronkan untuk akun CMS.
--   - Variabel "current_role" (nama fungsi bawaan SQL) diganti v_role.
CREATE OR REPLACE FUNCTION public.update_own_profile(
  new_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_uid  UUID := auth.uid();
  v_role TEXT;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Must be logged in to update profile';
  END IF;

  IF new_password IS NULL OR length(new_password) < 8 THEN
    RAISE EXCEPTION 'Password minimal 8 karakter.';
  END IF;

  SELECT ur.role INTO v_role FROM public.user_roles ur WHERE ur.id = v_uid;

  UPDATE auth.users u
  SET
    encrypted_password = crypt(new_password, gen_salt('bf')),
    raw_user_meta_data = CASE
      WHEN v_role IS NULL THEN u.raw_user_meta_data
      ELSE coalesce(u.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role', v_role)
    END,
    updated_at = NOW()
  WHERE u.id = v_uid;

  RETURN json_build_object('success', true, 'message', 'Profile updated successfully');
END;
$$;

REVOKE ALL ON FUNCTION public.update_own_profile(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_own_profile(TEXT) TO authenticated;


-- ==========================================================
-- 5. HAPUS PASSWORD PLAIN-TEXT
-- ==========================================================
ALTER TABLE public.user_roles DROP COLUMN IF EXISTS password_text;
