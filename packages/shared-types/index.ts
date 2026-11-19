// ==========================================================
// SHARED TYPESCRIPT INTERFACES FOR SRE PENS V2
// Matches Supabase PostgreSQL Schema exactly
// ==========================================================

export interface AcademicEntity {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityEntity {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleEntity {
  id: string;
  title: string;
  author: string;
  created_by: string;
  image: string;
  description: string;
  content: string;
  published_date: string;
  created_at: string;
  updated_at: string;
}

export interface MerchandiseEntity {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
  order_link: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemberEntity {
  id: string;
  division_id: string;
  name: string;
  role: string;
  major: string;
  img_url?: string;
  linkedin_url?: string;
  instagram_handle?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DivisionEntity {
  id: string;
  name: string;
  description: string;
  order_index: number;
  members?: MemberEntity[];
  created_at: string;
}

export type RoleType = 'staff' | 'admin' | 'super-admin';

export interface UserRoleEntity {
  id: string;
  email: string;
  role: RoleType;
  created_at: string;
  updated_at: string;
}

// ==========================================================
// OPEN RECRUITMENT REGISTRATION (public.registrations)
// ==========================================================

export type RegistrationStatus = 'Menunggu' | 'Diproses' | 'Lolos' | 'Tidak Lolos';

export type RegistrationDivisionId =
  | 'hr'
  | 'pr'
  | 'finance'
  | 'education'
  | 'comp-research'
  | 'content-marketing'
  | 'graphic-design'
  | 'web-dev'
  | 'brand-ambassador'
  | 'treasurer';

export interface RegistrationEntity {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  nrp: string;
  study_program: string;
  division_id: RegistrationDivisionId;
  division_id_2?: RegistrationDivisionId | null;
  cover_letter_path: string;
  cv_path: string;
  portfolio_url?: string | null;
  mbti_result_path: string;
  /**
   * Bukti unggah twibbon. Bisa berupa path storage (screenshot di bucket
   * registration-files) atau tautan eksternal (diawali http). null = belum ada
   * kolomnya / belum diisi (kompatibel dengan data lama sebelum migrasi twibbon).
   */
  twibbon_proof?: string | null;
  status: RegistrationStatus;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

// ==========================================================
// PENGATURAN REKRUTMEN (public.recruitment_settings, singleton id=1)
// ==========================================================

export interface RecruitmentSettingsEntity {
  id: number;
  /** Saklar manual buka/tutup pendaftaran. */
  registration_open: boolean;
  /** Tanggal tutup otomatis (ISO). null = tanpa auto-close. */
  registration_closes_at: string | null;
  /** Saklar global: pengumuman hasil sudah dirilis ke semua pelamar. */
  announcement_released: boolean;
  /** Satu link undangan untuk semua pelamar yang Lolos. */
  invitation_url: string | null;
  updated_at: string;
}
