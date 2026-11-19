-- ==========================================================
-- Open Recruitment — bukti unggah twibbon pada pendaftaran
-- ==========================================================
-- Menyimpan bukti bahwa pendaftar sudah mengunggah twibbon.
-- Nilainya salah satu dari:
--   * path storage di bucket registration-files (screenshot), mis. "<uid>/twibbon.png"
--   * tautan eksternal postingan (diawali http / https)
-- NULL untuk data lama sebelum kolom ini ada (tetap valid).

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS twibbon_proof TEXT;

COMMENT ON COLUMN public.registrations.twibbon_proof IS
  'Bukti twibbon: path storage (screenshot) atau tautan postingan (http). NULL = belum diisi.';
