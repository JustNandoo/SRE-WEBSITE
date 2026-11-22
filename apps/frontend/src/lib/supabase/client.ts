import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client untuk browser.
 *
 * PENTING: jangan meng-override `auth.storage`. `@supabase/ssr` menyimpan sesi
 * di COOKIE agar server (server.ts) dan middleware bisa membacanya. Sebelumnya
 * storage dipaksa ke sessionStorage sehingga sesi hanya ada di sisi klien —
 * membuat server menganggap pengguna belum login (dashboard tidak muncul setelah
 * login, ter-logout / lambat saat reload, dan sebagian request gagal).
 *
 * createBrowserClient sudah mengelola cookie, persistSession, autoRefreshToken,
 * dan mengembalikan instance singleton (satu koordinator refresh token — tanpa
 * balapan refresh antar-pemanggil).
 */
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE1OTg4ODMwMDAsImV4cCI6MTkwNDQ0MzAwMH0.placeholder';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
