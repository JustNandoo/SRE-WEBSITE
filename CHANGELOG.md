# Changelog & Monorepo Migration Notes

## [1.2.0] - 2026-05-17

### 🚀 Monorepo Architecture Migration (NPM Workspaces)
Repositori SRE PENS V2 resmi dimigrasikan dari struktur aplikasi tunggal (*single app*) menjadi struktur **Monorepo** berbasis **NPM Workspaces** untuk mempersiapkan pengembangan sistem Backend terintegrasi dan memastikan *clean code structure*.

#### 📁 Struktur Direktori Baru
```text
sre-pens-v2/
├── apps/
│   ├── frontend/         # @sre-pens/frontend (Next.js 16 App Router & Supabase SDK)
│   └── backend/          # @sre-pens/backend (Sistem API backend baru & Supabase Schema)
├── packages/
│   └── shared-types/     # @sre-pens/shared-types (Tipe TypeScript bersama)
├── package.json          # Root Workspace Config
├── vercel.json           # Aturan pengalihan & konfigurasi hosting
└── CHANGELOG.md          # Catatan perubahan & riwayat rilis
```

### 🗄️ Arsitektur & Integrasi Supabase (PostgreSQL)
- **Supabase JS & SSR SDK**: Menginstal paket `@supabase/supabase-js` dan `@supabase/ssr` pada *frontend* dan *backend* *workspaces*.
- **Client Utilities**: Membuat utilitas koneksi Supabase untuk *browser* (`apps/frontend/src/lib/supabase/client.ts`) dan *server* (`apps/frontend/src/lib/supabase/server.ts`).
- **AI Agent Skills**: Mengintegrasikan agen keterampilan otomatis `supabase/agent-skills` (`Postgres Best Practices` dan `Supabase Client`) di `.\.agents\skills\`.
- **Database Schema & Data Seeding**: Skema DDL SQL lengkap beserta *Row Level Security* (RLS), *Triggers* pembaruan stempel waktu otomatis, serta skrip pengisian data (*seeding*) tersedia di `apps/backend/supabase/migrations/20260517000000_initial_schema.sql`.
- **API Services Layer**: Membangun utilitas pengambil data asinkron (`fetchAcademics`, `fetchActivities`, `fetchArticles`, `fetchMerchandise`, `fetchStaffDivisions`) di `apps/frontend/src/services/api.ts`.
- **Frontend UI Integration**: Menghubungkan seluruh komponen antarmuka (*Academic, Activity, Article, Merchandise*, dan *About (Section Member)*) agar 100% mengambil data dinamis dari Supabase.
- **Penghapusan Total Data Dummy**: Menghapus seluruh larik data *dummy* statis di dalam kode lokal (`apps/frontend/src/lib/*Data.ts`) dan menggantinya dengan status pemuatan (*loading state*) yang elegan.
- **Shared Types**: Definisi antarmuka TypeScript (*Interface*) yang 100% selaras dengan tabel database tersedia di `packages/shared-types/index.ts`.

### 🔒 CMS & Portal Administrasi Backend (`/admin-sre/`)
- **Modul Pengelola Konten (CRUD CMS)**: Membangun 5 modul halaman pengelolaan data mutakhir dan responsif dengan fitur penambahan, penyuntingan, penghapusan, serta pencarian instan:
  - 📰 **Articles** (`/admin-sre/articles`): Pengelolaan publikasi artikel dan berita.
  - 📅 **Activities** (`/admin-sre/activities`): Penjadwalan seminar, *workshop*, dan kompetisi.
  - 🎓 **Academics** (`/admin-sre/academics`): Repositori modul ilmiah, jurnal, dan tautan PDF.
  - 🛍️ **Merchandise** (`/admin-sre/merchandise`): Katalog produk, label harga, status ketersediaan (*in stock / sold out*), serta tautan pemesanan.
  - 👥 **Staff & Divisions** (`/admin-sre/staff`): Pengelolaan struktur organisasi, divisi, profil anggota, serta tautan LinkedIn & Instagram.
- **Manajemen Akun & Role (RBAC)**: Menambahkan tabel `public.user_roles` dengan skema *Role-Based Access Control* (`staff`, `admin`, `super-admin`) yang terintegrasi dengan tabel `auth.users` Supabase. Telah membuat skrip inisialisasi akun (`setup-roles.mjs`).
- **Autentikasi Staf & Awwwards Editorial UI**: Merancang ulang antarmuka login di `apps/frontend/src/app/admin-sre/login/page.tsx` mengusung gaya editorial/arsitektural khas *Awwwards* tanpa animasi (*static elegance*). Mengintegrasikan paduan tipografi ikonis **Elagern** (Serif) pada judul utama *"Authentication."* dan **Akira** pada *masthead*, dengan hirarki grid geometris tajam, bingkai foto monokromatik bergaya pameran seni, serta perlindungan keamanan penuh dari Supabase Auth dan Middleware JWT.
- **Dashboard Overview**: Membangun antarmuka utama CMS di `apps/frontend/src/app/admin-sre/page.tsx` beserta *Sidebar Navigasi* dinamis (`AdminSidebar.tsx`) yang menampilkan metrik jumlah data secara *real-time* dari tabel Supabase.
- **Penonaktifan Total Preloader & SubPreloader**: Memodifikasi `Preloader.tsx`, `SubPreloader.tsx`, dan `CustomScrollbar.tsx` agar langsung dinonaktifkan secara otomatis (`return null` atau *bypass*) pada seluruh rute `/admin-sre/` demi memberikan pengalaman navigasi *dashboard* dan login yang instan, responsif, dan bebas hambatan visual.
- **Navbar Protection**: Menyesuaikan `NavbarWrapper.tsx` agar menyembunyikan navigasi publik secara otomatis pada seluruh rute `/admin-sre`.

### ✨ Peningkatan & Pembersihan Kode (*Clean Code Refactoring*)
- **Frontend Refactoring**: Memisahkan aplikasi Next.js ke dalam direktori `apps/frontend` dengan penyesuaian `package.json` menjadi `@sre-pens/frontend`.
- **UI & Layout Updates**: Implementasi desain antarmuka interaktif dan dinamis baru pada `SectionNews.tsx` di halaman utama beranda dengan animasi pemuatan data Supabase.
- **Gitignore Optimization**: Pembaruan aturan `.gitignore` agar mendukung hirarki direktori bersarang di seluruh *workspaces* (`node_modules`, `.next`, `dist`, `build`, `.agents`).
- **Pondasi Backend API**: Inisialisasi struktur dasar untuk pengembangan layanan mikro backend di dalam `apps/backend`.

---

## Panduan Pengembang (*Developer Guide*)

### Menjalankan Server Pengembangan (*Development*)
Untuk menjalankan aplikasi Frontend lokal:
```bash
npm run dev:frontend
```

Untuk melakukan *build production* Frontend:
```bash
npm run build:frontend
```
