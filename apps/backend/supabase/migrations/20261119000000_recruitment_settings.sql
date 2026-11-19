-- ====================================================================
-- Migration: Pengaturan rekrutmen (periode pendaftaran + pengumuman)
-- Path: apps/backend/supabase/migrations/20261119000000_recruitment_settings.sql
--
-- Satu baris singleton yang mengatur:
--   - registration_open      : saklar manual buka/tutup pendaftaran
--   - registration_closes_at : tanggal tutup otomatis (NULL = tanpa auto-close)
--   - announcement_released  : saklar global "pengumuman sudah dirilis"
--   - invitation_url         : satu link undangan untuk semua pelamar yang Lolos
--
-- "Pendaftaran terbuka" dihitung: registration_open = true
--   DAN (registration_closes_at IS NULL OR now() < registration_closes_at).
-- Jadi tutup otomatis tanpa perlu cron.
--
-- Jalankan di: Supabase Dashboard -> SQL Editor (atau supabase db push).
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.recruitment_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),      -- singleton: selalu 1 baris
  registration_open BOOLEAN NOT NULL DEFAULT false,
  registration_closes_at TIMESTAMPTZ,                -- NULL = tanpa tanggal tutup otomatis
  announcement_released BOOLEAN NOT NULL DEFAULT false,
  invitation_url TEXT,                               -- diisi admin, dibuka pelamar yang Lolos
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pastikan baris singleton ada.
INSERT INTO public.recruitment_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.recruitment_settings ENABLE ROW LEVEL SECURITY;

-- Hapus policy lama bila migrasi dijalankan ulang.
DROP POLICY IF EXISTS "Public read recruitment settings" ON public.recruitment_settings;
DROP POLICY IF EXISTS "CMS staff update recruitment settings" ON public.recruitment_settings;

-- Semua orang boleh membaca: halaman pendaftaran publik perlu tahu buka/tutup,
-- halaman profil perlu tahu apakah pengumuman sudah dirilis.
CREATE POLICY "Public read recruitment settings"
  ON public.recruitment_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Hanya staf CMS yang boleh mengubah pengaturan.
CREATE POLICY "CMS staff update recruitment settings"
  ON public.recruitment_settings
  FOR UPDATE
  TO authenticated
  USING (public.is_cms_user())
  WITH CHECK (public.is_cms_user());

-- Tidak ada policy INSERT/DELETE: baris singleton tidak boleh ditambah/dihapus.
REVOKE ALL ON public.recruitment_settings FROM anon;
GRANT SELECT ON public.recruitment_settings TO anon, authenticated;
GRANT UPDATE ON public.recruitment_settings TO authenticated;

-- Jaga updated_at tetap mutakhir.
DROP TRIGGER IF EXISTS update_recruitment_settings_modtime ON public.recruitment_settings;
CREATE TRIGGER update_recruitment_settings_modtime
  BEFORE UPDATE ON public.recruitment_settings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
