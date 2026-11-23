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

-- 2. Fungsi aman: baris milik sendiri sebagai JSON, status disamarkan bila
--    belum diumumkan. Pakai to_jsonb() agar tidak perlu mencocokkan tipe tiap
--    kolom (menghindari error "structure of query does not match", 400).
DROP FUNCTION IF EXISTS public.get_my_registration();

CREATE FUNCTION public.get_my_registration()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT to_jsonb(r) || jsonb_build_object(
           'status',
           CASE
             WHEN COALESCE(
               (SELECT announcement_released FROM public.recruitment_settings WHERE id = 1),
               false
             ) THEN r.status
             ELSE 'Menunggu'
           END
         )
  FROM public.registrations r
  WHERE r.user_id = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_my_registration() FROM public;
GRANT EXECUTE ON FUNCTION public.get_my_registration() TO authenticated;
