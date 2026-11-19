import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Tujuan tautan konfirmasi email (PKCE): tukar ?code= menjadi sesi cookie,
// lalu arahkan pendaftar ke halaman tujuan (default /pendaftaran).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next') ?? '/pendaftaran';
  // Hanya izinkan path internal agar tidak bisa dipakai sebagai open redirect.
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/pendaftaran';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('Supabase auth callback error:', error);
  }

  return NextResponse.redirect(`${origin}/login?error=confirmation`);
}
