-- ====================================================================
-- Migration: Realtime untuk public.registrations
-- Path: apps/backend/supabase/migrations/20261117000001_registrations_realtime.sql
--
-- Halaman /admin-sre/pendaftar berlangganan perubahan tabel ini sehingga
-- pendaftar baru langsung muncul tanpa refresh. Realtime tetap mematuhi RLS:
-- hanya akun CMS (is_cms_user) yang menerima event semua baris.
-- Jalankan SETELAH 20261117000000_applicant_registration.sql.
-- ====================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'registrations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.registrations;
  END IF;
END $$;
