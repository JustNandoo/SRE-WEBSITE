import { createClient } from '@/lib/supabase/client';
import { AcademicCardProps } from '@/lib/academicData';
import { EventData } from '@/lib/activityData';
import { ArticleContent } from '@/lib/articleData';
import { MerchItem } from '@/lib/merchData';
import { Division } from '@/lib/staffData';
import { REGISTRATION_BUCKET, type RegistrationFileKind } from '@/lib/registrationData';
import type { AuthError, User } from '@supabase/supabase-js';
import type {
  RecruitmentSettingsEntity,
  RegistrationDivisionId,
  RegistrationEntity,
  RegistrationStatus,
} from '@sre-pens/shared-types';

export async function fetchAcademics(): Promise<AcademicCardProps[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('academics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchAcademics error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    description: item.description,
    category: item.category,
    pdfUrl: item.pdf_url,
  }));
}

export async function fetchActivities(): Promise<EventData[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchActivities error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    time: item.time,
    category: item.category,
    description: item.description,
    content: item.content,
    image: item.image,
  }));
}

export async function fetchArticles(): Promise<ArticleContent[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchArticles error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    author: item.author,
    created_by: item.created_by,
    image: item.image,
    description: item.description,
    content: item.content,
    date: item.published_date,
  }));
}

export async function fetchMerchandise(): Promise<MerchItem[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('merchandise')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchMerchandise error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image,
    tag: item.tag || '',
    link: item.order_link,
  }));
}

export async function fetchStaffDivisions(): Promise<Division[] | null> {
  const supabase = createClient();
  const { data: divisions, error: divError } = await supabase
    .from('divisions')
    .select('*')
    .order('order_index', { ascending: true });
  const { data: members, error: memError } = await supabase
    .from('members')
    .select('*')
    .order('order_index', { ascending: true });

  if (divError || memError || !divisions || !members || members.length < 20) {
    console.log("Using local dummy staff data fallback (Supabase unseeded or offline).");
    return null;
  }

  return divisions.map((div) => ({
    id: div.id,
    division: div.name,
    description: div.description,
    members: members
      .filter((m) => m.division_id === div.id)
      .map((m) => ({
        name: m.name,
        role: m.role,
        major: m.major,
        img: m.img_url || '',
        socials: {
          linkedin: m.linkedin_url || '',
          instagram: m.instagram_handle || '',
        },
      })),
  }));
}

export interface ExternalRelation {
  id: string;
  partner_name: string;
  category: 'Company Visit' | 'External Forum/Delegation' | 'Alumni Network';
  description: string;
  logo_url: string;
  collaboration_date: string;
  status: string;
}

export interface CollaborationRequest {
  id: string;
  organization_name: string;
  contact_person: string;
  email: string;
  whatsapp: string;
  proposal_subject: string;
  message: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  pj: string;
  period: string;
  target_time: string;
  budget: number;
  status: 'Direncanakan' | 'Sedang Berjalan' | 'Selesai' | 'Dibatalkan';
}

export async function fetchExternalRelations(): Promise<ExternalRelation[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('external_relations')
    .select('*')
    .order('collaboration_date', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchExternalRelations error:", error);
    return null;
  }
  return data;
}

export async function fetchCollaborationRequests(): Promise<CollaborationRequest[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('collaboration_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchCollaborationRequests error:", error);
    return null;
  }
  return data;
}

export async function fetchProjects(): Promise<Project[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchProjects error:", error);
    return null;
  }
  return data;
}


// ==========================================================
// APPLICANT AUTH (akun pendaftar Open Recruitment)
// ==========================================================

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
}

export interface ApplicantUser {
  id: string;
  email: string;
  fullName: string;
}

const toApplicantUser = (user: User): ApplicantUser => ({
  id: user.id,
  email: user.email ?? '',
  fullName: (user.user_metadata?.full_name as string | undefined) ?? '',
});

function translateAuthError(error: AuthError): string {
  switch (error.code) {
    case 'invalid_credentials':
      return 'Email atau password salah.';
    case 'email_not_confirmed':
      return 'Email belum dikonfirmasi. Cek inbox kamu lalu klik tautan konfirmasi.';
    case 'user_already_exists':
    case 'email_exists':
      return 'Email ini sudah terdaftar. Silakan masuk.';
    case 'weak_password':
      return 'Password terlalu lemah. Gunakan minimal 8 karakter.';
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.';
    case 'signup_disabled':
      return 'Pendaftaran akun sedang ditutup.';
    default:
      return error.message || 'Terjadi kesalahan. Coba lagi.';
  }
}

export async function signUpApplicant(input: {
  fullName: string;
  email: string;
  password: string;
  redirectPath?: string;
}): Promise<ApiResult<{ user: ApplicantUser; needsEmailConfirmation: boolean }>> {
  const supabase = createClient();
  const next = input.redirectPath ?? '/pendaftaran';
  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: { full_name: input.fullName.trim() },
      emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    console.error('Supabase signUpApplicant error:', error);
    return { data: null, error: translateAuthError(error) };
  }
  if (!data.user) {
    return { data: null, error: 'Gagal membuat akun. Coba lagi.' };
  }
  // Supabase mengembalikan user tanpa identities jika email sudah terdaftar
  // (saat konfirmasi email aktif) — tanpa error, demi mencegah enumerasi email.
  if (data.user.identities && data.user.identities.length === 0) {
    return { data: null, error: 'Email ini sudah terdaftar. Silakan masuk.' };
  }

  return {
    data: { user: toApplicantUser(data.user), needsEmailConfirmation: !data.session },
    error: null,
  };
}

export async function signInApplicant(email: string, password: string): Promise<ApiResult<ApplicantUser>> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

  if (error || !data.user) {
    console.error('Supabase signInApplicant error:', error);
    return { data: null, error: error ? translateAuthError(error) : 'Gagal masuk. Coba lagi.' };
  }
  return { data: toApplicantUser(data.user), error: null };
}

export async function signOutApplicant(): Promise<void> {
  const supabase = createClient();
  // scope "local": bersihkan sesi tanpa round-trip ke server agar logout tidak
  // menggantung bila jaringan/endpoint logout lambat.
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) console.error('Supabase signOutApplicant error:', error);
}

export async function fetchCurrentApplicant(): Promise<ApplicantUser | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return toApplicantUser(data.user);
}

export async function resendApplicantConfirmation(email: string): Promise<ApiResult<true>> {
  const supabase = createClient();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email.trim(),
    options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/pendaftaran` },
  });
  if (error) {
    console.error('Supabase resendApplicantConfirmation error:', error);
    return { data: null, error: translateAuthError(error) };
  }
  return { data: true, error: null };
}

/** true jika user yang login punya baris di public.user_roles (akun staf CMS). */
export async function fetchIsCmsUser(userId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_roles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    console.error('Supabase fetchIsCmsUser error:', error);
    return false;
  }
  return !!data;
}

/**
 * Ambil role staf CMS dari user_roles, dengan retry + refresh token + log.
 *
 * Gejala "login pertama bisa, setelah refresh gagal" hampir selalu karena
 * access token sempat BASI saat halaman di-reload: query pertama kena 401
 * sehingga role tidak ter-resolve (menu/cards kosong). Di sini kalau query
 * error, kita paksa refreshSession() lalu coba lagi. Semua langkah dicetak
 * dengan prefix "[role]" agar mudah dibaca dari DevTools Console.
 */
export async function fetchUserRoleById(userId: string): Promise<string | null> {
  const supabase = createClient();
  for (let attempt = 1; attempt <= 3; attempt++) {
    const t0 = Date.now();
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
    const ms = Date.now() - t0;

    if (!error && data?.role) {
      console.log(`[role] OK attempt=${attempt} ${ms}ms role=${data.role}`);
      return data.role as string;
    }
    if (!error) {
      console.warn(`[role] NO-ROW attempt=${attempt} ${ms}ms uid=${userId} (tidak ada baris role untuk user ini)`);
      return null;
    }

    console.warn(`[role] ERROR attempt=${attempt} ${ms}ms code=${error.code ?? '-'} msg=${error.message}`);
    // Kemungkinan token basi -> paksa refresh sebelum percobaan berikutnya.
    try {
      const { error: refreshErr } = await supabase.auth.refreshSession();
      console.log('[role] refreshSession:', refreshErr ? 'GAGAL ' + refreshErr.message : 'ok');
    } catch (e) {
      console.warn('[role] refreshSession threw:', e);
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  console.error(`[role] MENYERAH setelah 3 percobaan untuk uid=${userId}`);
  return null;
}

// ==========================================================
// OPEN RECRUITMENT REGISTRATION
// ==========================================================

export interface RegistrationFormInput {
  fullName: string;
  nrp: string;
  studyProgram: string;
  divisionId: RegistrationDivisionId;
  divisionId2: RegistrationDivisionId | null;
  coverLetter: File;
  cv: File;
  portfolioUrl: string;
  mbtiResult: File;
  /** Bukti twibbon: salah satu dari screenshot (file) atau tautan postingan. */
  twibbonFile: File | null;
  twibbonLink: string;
}

// Tabel public.registrations & bucket registration-files dibuat oleh migrasi
// 20261117000000_applicant_registration.sql. Selama migrasi belum dijalankan,
// Supabase membalas PGRST205 (tabel tidak ada) / "Bucket not found".
const REGISTRATION_NOT_READY_APPLICANT = 'Formulir pendaftaran belum aktif. Silakan coba lagi nanti.';
const REGISTRATION_NOT_READY_CMS =
  'Tabel registrations belum ada di Supabase. Jalankan migrasi 20261117000000_applicant_registration.sql terlebih dahulu.';

function isRegistrationSetupMissing(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === 'PGRST205' || /bucket not found/i.test(error.message ?? '');
}

function logRegistrationError(scope: string, error: { code?: string; message?: string }) {
  if (isRegistrationSetupMissing(error)) {
    console.warn(`Supabase ${scope}: database pendaftaran belum disiapkan (migrasi belum dijalankan).`);
  } else {
    console.error(`Supabase ${scope} error:`, error);
  }
}

export async function fetchMyRegistration(): Promise<ApiResult<RegistrationEntity | null>> {
  const supabase = createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { data: null, error: 'Sesi berakhir. Silakan masuk kembali.' };

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', auth.user.id)
    .maybeSingle();

  if (error) {
    logRegistrationError('fetchMyRegistration', error);
    // Tabel belum ada (migrasi belum jalan) diperlakukan sebagai "belum mendaftar"
    // supaya formulir tetap tampil. Submit nanti yang menolak dengan pesan jelas.
    if (isRegistrationSetupMissing(error)) return { data: null, error: null };
    return { data: null, error: 'Gagal memuat data pendaftaran.' };
  }
  return { data: (data as RegistrationEntity | null) ?? null, error: null };
}

const REGISTRATION_FILE_LABEL: Record<RegistrationFileKind, string> = {
  'cover-letter': 'motivation letter',
  cv: 'CV',
  mbti: 'hasil tes MBTI',
  twibbon: 'screenshot twibbon',
};

/** Upload satu berkas ke bucket privat: <user_id>/<kind>.<ext>. Mengembalikan path. */
export async function uploadRegistrationFile(
  userId: string,
  kind: RegistrationFileKind,
  file: File
): Promise<ApiResult<string>> {
  const supabase = createClient();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `${userId}/${kind}.${ext === 'jpeg' ? 'jpg' : ext}`;

  const { error } = await supabase.storage
    .from(REGISTRATION_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || undefined, cacheControl: '3600' });

  if (error) {
    logRegistrationError(`uploadRegistrationFile (${kind})`, error);
    if (isRegistrationSetupMissing(error)) return { data: null, error: REGISTRATION_NOT_READY_APPLICANT };
    return { data: null, error: `Gagal mengunggah ${REGISTRATION_FILE_LABEL[kind]}. Coba lagi.` };
  }
  return { data: path, error: null };
}

export async function submitRegistration(
  input: RegistrationFormInput,
  onProgress?: (step: string) => void
): Promise<ApiResult<RegistrationEntity>> {
  const supabase = createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { data: null, error: 'Sesi berakhir. Silakan masuk kembali.' };
  const user = auth.user;

  onProgress?.('Mengunggah motivation letter...');
  const coverLetter = await uploadRegistrationFile(user.id, 'cover-letter', input.coverLetter);
  if (coverLetter.error) return { data: null, error: coverLetter.error };

  onProgress?.('Mengunggah CV...');
  const cv = await uploadRegistrationFile(user.id, 'cv', input.cv);
  if (cv.error) return { data: null, error: cv.error };

  onProgress?.('Mengunggah hasil tes MBTI...');
  const mbti = await uploadRegistrationFile(user.id, 'mbti', input.mbtiResult);
  if (mbti.error) return { data: null, error: mbti.error };

  // Bukti twibbon: screenshot diunggah ke bucket, atau tautan disimpan apa adanya.
  let twibbonProof: string | null = null;
  if (input.twibbonFile) {
    onProgress?.('Mengunggah bukti twibbon...');
    const twibbon = await uploadRegistrationFile(user.id, 'twibbon', input.twibbonFile);
    if (twibbon.error) return { data: null, error: twibbon.error };
    twibbonProof = twibbon.data;
  } else {
    const link = input.twibbonLink.trim();
    twibbonProof = link === '' ? null : link;
  }

  onProgress?.('Menyimpan pendaftaran...');
  const portfolio = input.portfolioUrl.trim();
  const { data, error } = await supabase
    .from('registrations')
    .insert({
      user_id: user.id,
      email: user.email,
      full_name: input.fullName.trim(),
      nrp: input.nrp.trim(),
      study_program: input.studyProgram.trim(),
      division_id: input.divisionId,
      division_id_2: input.divisionId2,
      cover_letter_path: coverLetter.data,
      cv_path: cv.data,
      portfolio_url: portfolio === '' ? null : portfolio,
      mbti_result_path: mbti.data,
      twibbon_proof: twibbonProof,
    })
    .select('*')
    .single();

  if (error) {
    logRegistrationError('submitRegistration', error);
    if (isRegistrationSetupMissing(error)) return { data: null, error: REGISTRATION_NOT_READY_APPLICANT };
    if (error.code === 'PGRST204' && /twibbon_proof/i.test(error.message ?? ''))
      return { data: null, error: 'Kolom twibbon belum ada. Jalankan migrasi 20261120000000_registration_twibbon.sql dulu.' };
    if (error.code === '23505') return { data: null, error: 'Kamu sudah pernah mengirim pendaftaran.' };
    if (error.code === '23514') return { data: null, error: 'Ada data yang tidak valid. Periksa kembali isian form.' };
    return { data: null, error: 'Gagal menyimpan pendaftaran. Coba lagi.' };
  }
  return { data: data as RegistrationEntity, error: null };
}

// ==========================================================
// CMS — DATA PENDAFTAR (admin-sre/pendaftar)
// ==========================================================

export type RegistrationDivisionFilter = RegistrationDivisionId | 'all';

/** Daftar pendaftar, terbaru di atas. divisionId 'all' = semua divisi. */
export async function fetchRegistrations(
  divisionId: RegistrationDivisionFilter = 'all'
): Promise<ApiResult<RegistrationEntity[]>> {
  const supabase = createClient();
  let query = supabase.from('registrations').select('*').order('submitted_at', { ascending: false });
  if (divisionId !== 'all') query = query.or(`division_id.eq.${divisionId},division_id_2.eq.${divisionId}`);

  const { data, error } = await query;
  if (error) {
    logRegistrationError('fetchRegistrations', error);
    if (isRegistrationSetupMissing(error)) return { data: null, error: REGISTRATION_NOT_READY_CMS };
    return { data: null, error: 'Gagal memuat data pendaftar.' };
  }
  return { data: (data ?? []) as RegistrationEntity[], error: null };
}

/** Jumlah pendaftar per divisi & per status (untuk tab filter dan kartu statistik). */
export async function fetchRegistrationStats(): Promise<
  ApiResult<{ total: number; byDivision: Record<string, number>; byStatus: Record<string, number> }>
> {
  const supabase = createClient();
  const { data, error } = await supabase.from('registrations').select('division_id, division_id_2, status');
  if (error) {
    logRegistrationError('fetchRegistrationStats', error);
    if (isRegistrationSetupMissing(error)) return { data: null, error: REGISTRATION_NOT_READY_CMS };
    return { data: null, error: 'Gagal memuat statistik pendaftar.' };
  }
  const byDivision: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  (data ?? []).forEach((row) => {
    byDivision[row.division_id] = (byDivision[row.division_id] ?? 0) + 1;
    if (row.division_id_2) byDivision[row.division_id_2] = (byDivision[row.division_id_2] ?? 0) + 1;
    byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
  });
  return { data: { total: data?.length ?? 0, byDivision, byStatus }, error: null };
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<ApiResult<RegistrationEntity>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', id)
    .select('*')
    .single();
  if (error) {
    console.error('Supabase updateRegistrationStatus error:', error);
    return { data: null, error: 'Gagal mengubah status pendaftar.' };
  }
  return { data: data as RegistrationEntity, error: null };
}

/** Signed URL sementara (bucket privat) untuk membuka berkas pendaftar. */
export async function fetchRegistrationFileUrl(path: string, expiresInSeconds = 600): Promise<ApiResult<string>> {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(REGISTRATION_BUCKET).createSignedUrl(path, expiresInSeconds);
  if (error || !data) {
    console.error('Supabase fetchRegistrationFileUrl error:', error);
    return { data: null, error: 'Gagal membuka berkas.' };
  }
  return { data: data.signedUrl, error: null };
}

// ==========================================================
// PENGATURAN REKRUTMEN (periode pendaftaran + pengumuman)
// ==========================================================

const DEFAULT_RECRUITMENT_SETTINGS: RecruitmentSettingsEntity = {
  id: 1,
  registration_open: false,
  registration_closes_at: null,
  announcement_released: false,
  invitation_url: null,
  updated_at: new Date(0).toISOString(),
};

/**
 * Pengaturan rekrutmen (baris singleton id=1). Jika tabel belum ada
 * (migrasi belum dijalankan), kembalikan default "tutup" agar web tetap jalan.
 */
export async function fetchRecruitmentSettings(): Promise<ApiResult<RecruitmentSettingsEntity>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('recruitment_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (error) {
    if (isRegistrationSetupMissing(error)) {
      return { data: DEFAULT_RECRUITMENT_SETTINGS, error: null };
    }
    console.error('Supabase fetchRecruitmentSettings error:', error);
    return { data: DEFAULT_RECRUITMENT_SETTINGS, error: 'Gagal memuat pengaturan rekrutmen.' };
  }
  return { data: (data as RecruitmentSettingsEntity | null) ?? DEFAULT_RECRUITMENT_SETTINGS, error: null };
}

/** Admin: ubah pengaturan rekrutmen (hanya staf CMS yang diizinkan RLS). */
export async function updateRecruitmentSettings(
  patch: Partial<Pick<
    RecruitmentSettingsEntity,
    'registration_open' | 'registration_closes_at' | 'announcement_released' | 'invitation_url'
  >>
): Promise<ApiResult<RecruitmentSettingsEntity>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('recruitment_settings')
    .update(patch)
    .eq('id', 1)
    .select('*')
    .single();
  if (error) {
    console.error('Supabase updateRecruitmentSettings error:', error);
    if (isRegistrationSetupMissing(error)) return { data: null, error: REGISTRATION_NOT_READY_CMS };
    return { data: null, error: 'Gagal menyimpan pengaturan rekrutmen.' };
  }
  return { data: data as RecruitmentSettingsEntity, error: null };
}

/** Pendaftaran terbuka = saklar manual ON dan belum lewat tanggal tutup. */
export function isRegistrationOpen(s: RecruitmentSettingsEntity | null | undefined): boolean {
  if (!s || !s.registration_open) return false;
  if (!s.registration_closes_at) return true;
  return Date.now() < new Date(s.registration_closes_at).getTime();
}

export type RegistrationChange =
  | { type: 'INSERT'; record: RegistrationEntity }
  | { type: 'UPDATE'; record: RegistrationEntity }
  | { type: 'DELETE'; id: string };

/**
 * Berlangganan perubahan tabel registrations (Supabase Realtime).
 * Mengembalikan fungsi untuk berhenti berlangganan.
 */
export function subscribeToRegistrations(
  onChange: (change: RegistrationChange) => void,
  onStatus?: (connected: boolean) => void
): () => void {
  const supabase = createClient();
  const channel = supabase
    .channel('cms-registrations')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, (payload) => {
      if (payload.eventType === 'INSERT') onChange({ type: 'INSERT', record: payload.new as RegistrationEntity });
      else if (payload.eventType === 'UPDATE') onChange({ type: 'UPDATE', record: payload.new as RegistrationEntity });
      else if (payload.eventType === 'DELETE') onChange({ type: 'DELETE', id: (payload.old as { id: string }).id });
    })
    .subscribe((status) => onStatus?.(status === 'SUBSCRIBED'));

  return () => {
    supabase.removeChannel(channel);
  };
}
