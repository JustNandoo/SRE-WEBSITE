-- ==========================================================
-- Divisi penerimaan (pendaftar pilih 2 divisi, diterima di SALAH SATU)
-- ==========================================================
-- Saat admin menandai pendaftar "Lolos" (lolos berkas -> tahap wawancara),
-- admin memilih diterima di divisi yang mana. Nilai ini ikut disamarkan sampai
-- pengumuman dirilis (sama seperti status).

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS accepted_division TEXT;

COMMENT ON COLUMN public.registrations.accepted_division IS
  'Divisi tempat pendaftar diterima (salah satu dari division_id / division_id_2). NULL jika belum.';

-- Perbarui fungsi aman: status DAN accepted_division disamarkan sampai diumumkan.
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
                THEN r.accepted_division ELSE NULL END
         )
  FROM public.registrations r
  WHERE r.user_id = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_my_registration() FROM public;
GRANT EXECUTE ON FUNCTION public.get_my_registration() TO authenticated;
