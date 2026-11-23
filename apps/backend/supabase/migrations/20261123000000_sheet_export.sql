-- ==========================================================
-- Ekspor LIVE data pendaftar ke spreadsheet (Google Sheets IMPORTDATA)
-- ==========================================================
-- Endpoint CSV di aplikasi (/api/pendaftar-sheet) digerbangi token rahasia.
-- Token disimpan di tabel yang TIDAK bisa dibaca anon (tanpa policy RLS),
-- hanya bisa diambil staf CMS yang login lewat get_sheet_export_token().

CREATE TABLE IF NOT EXISTS public.sheet_export_config (
  id    int  PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  token text NOT NULL
);

ALTER TABLE public.sheet_export_config ENABLE ROW LEVEL SECURITY;
-- Sengaja tanpa policy: anon/authenticated tidak bisa SELECT -> token rahasia.

INSERT INTO public.sheet_export_config (id, token)
VALUES (1, encode(gen_random_bytes(24), 'hex'))
ON CONFLICT (id) DO NOTHING;

-- Data pendaftar untuk spreadsheet — HANYA dikembalikan bila token cocok.
CREATE OR REPLACE FUNCTION public.export_registrations(p_token text)
RETURNS TABLE (
  nama       text,
  email      text,
  nrp        text,
  prodi      text,
  divisi_1   text,
  divisi_2   text,
  status     text,
  portofolio text,
  twibbon    text,
  dikirim    timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_token IS NULL OR p_token <> (SELECT token FROM public.sheet_export_config WHERE id = 1) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
  RETURN QUERY
    SELECT
      r.full_name,
      r.email,
      r.nrp,
      r.study_program,
      r.division_id::text,
      COALESCE(r.division_id_2::text, ''),
      r.status::text,
      COALESCE(r.portfolio_url, ''),
      COALESCE(r.twibbon_proof, ''),
      r.submitted_at
    FROM public.registrations r
    ORDER BY r.submitted_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.export_registrations(text) FROM public;
GRANT EXECUTE ON FUNCTION public.export_registrations(text) TO anon, authenticated;

-- Ambil token (hanya staf CMS yang sudah login) — untuk ditampilkan di panel admin.
CREATE OR REPLACE FUNCTION public.get_sheet_export_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  t text;
BEGIN
  IF NOT public.is_cms_user() THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  SELECT token INTO t FROM public.sheet_export_config WHERE id = 1;
  RETURN t;
END;
$$;

REVOKE ALL ON FUNCTION public.get_sheet_export_token() FROM public;
GRANT EXECUTE ON FUNCTION public.get_sheet_export_token() TO authenticated;
