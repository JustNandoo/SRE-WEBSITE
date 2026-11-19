import type { RegistrationDivisionId, RegistrationStatus } from "@sre-pens/shared-types";

// ==========================================================
// OPEN RECRUITMENT — konstanta form pendaftaran
// ==========================================================

export const MBTI_TEST_URL = "https://mistypeinvestigator.com";

/** Twibbon wajib diunggah peserta sebagai syarat pendaftaran. */
export const TWIBBON_URL = "https://twb.nz/twibbon-oprec-staff-sre-pens-2";

/** Grup WhatsApp pendaftar — ditampilkan setelah pendaftaran terkirim. */
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/KHdVIRJM6LE0AKSfyjwfVe?s=cl&p=a&iam=2";

export const REGISTRATION_BUCKET = "registration-files";

/** Batas ukuran tiap berkas (harus sama dengan file_size_limit bucket). */
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = "5 MB";

export interface DivisionOption {
  id: RegistrationDivisionId;
  label: string;
  requiresPortfolio: boolean;
}

/** Daftar divisi Open Recruitment (tetap; tidak terikat ke public.divisions). */
export const registrationDivisions: DivisionOption[] = [
  { id: "hr", label: "Human Resource", requiresPortfolio: false },
  { id: "pr", label: "Public Relation", requiresPortfolio: false },
  { id: "comp-research", label: "Competition, Research & Development", requiresPortfolio: false },
  { id: "education", label: "Education", requiresPortfolio: false },
  { id: "content-marketing", label: "Content Marketing", requiresPortfolio: true },
  { id: "graphic-design", label: "Design Graphic", requiresPortfolio: true },
  { id: "web-dev", label: "Web Development", requiresPortfolio: true },
  { id: "finance", label: "Finance", requiresPortfolio: false },
  { id: "brand-ambassador", label: "Brand Ambassador", requiresPortfolio: false },
  { id: "treasurer", label: "Treasurer", requiresPortfolio: false },
];

export const divisionRequiresPortfolio = (id: string) =>
  registrationDivisions.some((d) => d.id === id && d.requiresPortfolio);

export const divisionLabel = (id: string) =>
  registrationDivisions.find((d) => d.id === id)?.label ?? id;

/** Saran isian prodi (input tetap bebas agar tidak memblokir prodi yang belum terdaftar). */
export const studyProgramSuggestions: string[] = [
  "D3 Teknik Elektronika",
  "D3 Teknik Telekomunikasi",
  "D3 Teknik Elektro Industri",
  "D3 Teknik Informatika",
  "D3 Teknologi Multimedia Broadcasting",
  "D4 Teknik Elektronika",
  "D4 Teknik Telekomunikasi",
  "D4 Teknik Elektro Industri",
  "D4 Teknik Informatika",
  "D4 Teknik Mekatronika",
  "D4 Teknik Komputer",
  "D4 Sistem Pembangkitan Energi",
  "D4 Teknologi Game",
  "D4 Teknologi Rekayasa Internet",
  "D4 Teknologi Rekayasa Multimedia",
  "D4 Sains Data Terapan",
];

export type RegistrationFileKind = "cover-letter" | "cv" | "mbti" | "twibbon";

const IMAGE_FILE_RULE = {
  accept: ".jpg,.jpeg,.png,image/jpeg,image/png",
  mimeTypes: ["image/jpeg", "image/png"],
  extensions: ["jpg", "jpeg", "png"],
};

export const registrationFileRules: Record<
  RegistrationFileKind,
  { accept: string; mimeTypes: string[]; extensions: string[] }
> = {
  "cover-letter": { accept: ".pdf,application/pdf", mimeTypes: ["application/pdf"], extensions: ["pdf"] },
  cv: { accept: ".pdf,application/pdf", mimeTypes: ["application/pdf"], extensions: ["pdf"] },
  mbti: IMAGE_FILE_RULE,
  twibbon: IMAGE_FILE_RULE,
};

/** Validasi berkas di sisi klien. Mengembalikan pesan error atau null. */
export function validateRegistrationFile(kind: RegistrationFileKind, file: File | null): string | null {
  if (!file) return "Berkas wajib diunggah.";
  const rule = registrationFileRules[kind];
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!rule.extensions.includes(ext) || (file.type && !rule.mimeTypes.includes(file.type))) {
    return `Format harus ${rule.extensions.map((e) => "." + e).join(" / ")}.`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) return `Ukuran maksimal ${MAX_FILE_SIZE_LABEL}.`;
  return null;
}

export const NRP_PATTERN = /^[0-9]{6,15}$/;

export const registrationStatusCopy: Record<RegistrationStatus, { title: string; body: string }> = {
  Menunggu: {
    title: "Pendaftaran diterima.",
    body: "Berkasmu sudah masuk dan menunggu diperiksa tim SRE PENS. Pantau pengumuman resmi di Instagram @sre_pens.",
  },
  Diproses: {
    title: "Sedang diseleksi.",
    body: "Berkasmu sedang direview. Informasi tahap berikutnya akan dikirim lewat email akunmu.",
  },
  Lolos: {
    title: "Selamat, kamu lolos.",
    body: "Kamu lolos seleksi Open Recruitment SRE PENS. Tunggu informasi lanjutan dari tim SRE PENS.",
  },
  "Tidak Lolos": {
    title: "Terima kasih sudah mendaftar.",
    body: "Kamu belum lolos di periode ini. Masih banyak kesempatan lain bersama SRE PENS.",
  },
};

export const registrationStatuses: RegistrationStatus[] = ["Menunggu", "Diproses", "Lolos", "Tidak Lolos"];

/** Role CMS yang boleh membuka halaman data pendaftar (/admin-sre/pendaftar). */
export const REGISTRATION_VIEWER_ROLES = ["super-admin", "p-level", "hr", "staff-hr"];
/** Role CMS yang boleh mengubah status pendaftar. */
export const REGISTRATION_EDITOR_ROLES = ["super-admin", "p-level", "hr"];
