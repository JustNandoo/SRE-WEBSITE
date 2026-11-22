import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const supabaseAnonKey = 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE1OTg4ODMwMDAsImV4cCI6MTkwNDQ0MzAwMH0.placeholder';

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() wajib di middleware: selain memvalidasi token ke server auth,
  // ia juga ME-REFRESH token yang hampir kedaluwarsa dan menuliskan cookie
  // baru. Tanpa ini, token basi dibiarkan lewat sehingga semua query data
  // gagal ("fetching terus"). getSession() tidak melakukan refresh.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const redirectTo = (path: string, params?: Record<string, string>) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = '';
    Object.entries(params ?? {}).forEach(([key, value]) => url.searchParams.set(key, value));
    const response = NextResponse.redirect(url);
    // Bawa cookie sesi yang baru di-refresh agar tidak hilang saat redirect.
    supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
    return response;
  };

  // ---------- CMS (/admin-sre) — hanya akun yang terdaftar di user_roles ----------
  const isAuthPage = pathname === '/admin-sre/login';
  const isAdminRoute = pathname.startsWith('/admin-sre');

  if (isAdminRoute) {
    // Sejak ada akun pendaftar publik, "sudah login" belum tentu staf CMS.
    let isCmsUser = false;
    if (user) {
      const { data: roleRow } = await supabase
        .from('user_roles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      isCmsUser = !!roleRow;
    }

    if (!isAuthPage && !isCmsUser) {
      return user ? redirectTo('/') : redirectTo('/admin-sre/login');
    }
    if (isAuthPage && isCmsUser) {
      return redirectTo('/admin-sre');
    }
    return supabaseResponse;
  }

  // ---------- Pendaftar Open Recruitment ----------
  const applicantProtectedRoutes = ['/pendaftaran', '/profile'];
  const applicantAuthRoutes = ['/login', '/register'];
  const matches = (routes: string[]) =>
    routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // Staf CMS yang sudah login tidak pernah berada di sisi pengguna: beranda,
  // area pendaftar, dan halaman login/daftar langsung diarahkan ke dashboard
  // admin. Jadi saat superadmin membuka kembali situs, ia masuk ke admin —
  // bukan terdampar di tampilan user.
  if (user && (pathname === '/' || matches(applicantProtectedRoutes) || matches(applicantAuthRoutes))) {
    const { data: roleRow } = await supabase
      .from('user_roles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();
    if (roleRow) return redirectTo('/admin-sre');
  }

  // Pendaftar belum login mencoba membuka area terproteksi -> ke halaman login.
  if (matches(applicantProtectedRoutes) && !user) {
    return redirectTo('/login', { next: pathname });
  }

  // Pendaftar (non-CMS) yang sudah login pada /login atau /register -> pendaftaran.
  if (matches(applicantAuthRoutes) && user) {
    const next = request.nextUrl.searchParams.get('next');
    const safeNext =
      next && next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/admin-sre') ? next : '/pendaftaran';
    return redirectTo(safeNext);
  }

  return supabaseResponse;
}
