-- ==========================================================
-- Sembunyikan status seleksi dari pendaftar sampai pengumuman dirilis
-- ==========================================================
-- BUG: setelah admin mengubah status (mis. Lolos) tetapi pengumuman belum
-- dirilis, pendaftar sudah bisa tahu hasilnya (status terkirim apa adanya).
--
-- FIX: pendaftar tidak lagi membaca tabel registrations secara langsung.
-- Mereka memakai fungsi get_my_registration() yang MENYAMARKAN status menjadi
-- 'Menunggu' selama recruitment_settings.announcement_released = false.
-- Staf CMS tetap melihat status asli lewat policy is_cms_user() yang sudah ada.

-- 1. Cabut hak baca langsung pendaftar atas tabel (agar status tak bisa diintip
--    lewat query API). Staf CMS tidak terpengaruh (punya policy sendiri).
DROP POLICY IF EXISTS "Applicants read own registration" ON public.registrations;

-- 2. Fungsi aman: baris milik sendiri, status disamarkan bila belum diumumkan.
CREATE OR REPLACE FUNCTION public.get_my_registration()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  email text,
  full_name text,
  nrp text,
  study_program text,
  division_id text,
  division_id_2 text,
  cover_letter_path text,
  cv_path text,
  portfolio_url text,
  mbti_result_path text,
  twibbon_proof text,
  status text,
  submitted_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  announced boolean;
BEGIN
  SELECT announcement_released INTO announced
  FROM public.recruitment_settings WHERE id = 1;

  RETURN QUERY
    SELECT
      r.id,
      r.user_id,
      r.email::text,
      r.full_name::text,
      r.nrp::text,
      r.study_program::text,
      r.division_id::text,
      r.division_id_2::text,
      r.cover_letter_path::text,
      r.cv_path::text,
      r.portfolio_url::text,
      r.mbti_result_path::text,
      r.twibbon_proof::text,
      (CASE WHEN COALESCE(announced, false) THEN r.status::text ELSE 'Menunggu' END),
      r.submitted_at,
      r.created_at,
      r.updated_at
    FROM public.registrations r
    WHERE r.user_id = auth.uid();
END;
$$;

REVOKE ALL ON FUNCTION public.get_my_registration() FROM public;
GRANT EXECUTE ON FUNCTION public.get_my_registration() TO authenticated;
