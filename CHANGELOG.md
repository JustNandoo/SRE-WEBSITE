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
- **Database Schema**: Skema DDL SQL lengkap beserta *Row Level Security* (RLS) dan *Triggers* pembaruan stempel waktu otomatis tersedia di `apps/backend/supabase/migrations/20260517000000_initial_schema.sql`.
- **Shared Types**: Definisi antarmuka TypeScript (*Interface*) yang 100% selaras dengan tabel database tersedia di `packages/shared-types/index.ts`.

### ✨ Peningkatan & Pembersihan Kode (*Clean Code Refactoring*)
- **Frontend Refactoring**: Memisahkan aplikasi Next.js ke dalam direktori `apps/frontend` dengan penyesuaian `package.json` menjadi `@sre-pens/frontend`.
- **UI & Layout Updates**: Implementasi desain antarmuka interaktif dan dinamis baru pada `SectionNews.tsx` di halaman utama beranda.
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
