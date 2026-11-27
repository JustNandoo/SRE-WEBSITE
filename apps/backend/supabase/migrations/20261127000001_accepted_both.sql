-- ==========================================================
-- Diterima di KEDUA pilihan divisi (utama tetap pilihan 1)
-- ==========================================================
-- accepted_division   = divisi penerimaan utama (prioritas).
-- accepted_division_2 = divisi penerimaan kedua, HANYA diisi bila pendaftar
--                       diterima di kedua pilihannya. NULL jika hanya satu.

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS accepted_division_2 TEXT;

COMMENT ON COLUMN public.registrations.accepted_division_2 IS
  'Divisi penerimaan kedua (bila diterima di kedua pilihan). NULL jika hanya satu.';

-- Perbarui fungsi aman: samarkan status + kedua divisi sampai pengumuman dirilis.
CREATE OR REPLACE FUNCTION public.get_my_registration()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT to_jsonb(r) || jsonb_build_object(
           'status',
           CASE WHEN COALESCE(
                  (SELECT announcement_released FROM public.recruitment_settings WHERE id = 1), false)
                THEN r.status ELSE 'Menunggu' END,
           'accepted_division',
           CASE WHEN COALESCE(
                  (SELECT announcement_released FROM public.recruitment_settings WHERE id = 1), false)
                THEN r.accepted_division ELSE NULL END,
           'accepted_division_2',
           CASE WHEN COALESCE(
                  (SELECT announcement_released FROM public.recruitment_settings WHERE id = 1), false)
                THEN r.accepted_division_2 ELSE NULL END
         )
  FROM public.registrations r
  WHERE r.user_id = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_my_registration() FROM public;
GRANT EXECUTE ON FUNCTION public.get_my_registration() TO authenticated;
