# Dokumentasi Kredensial CMS — SRE PENS V2
> **SOCIETY OF RENEWABLE ENERGY — PENS**  
> *Content Management System SRE PENS V2 — Dokumen Internal & Rahasia*

---

## ℹ️ Informasi Sistem & Login
* **URL Login CMS**: `https://sre-pens.com/admin-sre/login` (atau `http://localhost:3000/admin-sre/login` saat lokal)
* **Supabase Project URL**: `https://cvrjgkpjlrqriisillwx.supabase.co`

---

## 🔐 1. Akun Eksekutif / Admin

| No | Level / Role | Email | Password Default | Role Key | Access Level |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Super Admin** | `superadmin@sre-pens.com` | `superadminSRE2026!` | `super-admin` | Full System Control & User Management |
| 2 | **P-Level** | `plevel@sre-pens.com` | `plevelSRE2026!` | `p-level` | Executive Overview & All Division Access |

---

## 🛠️ 2. Akun Koordinator Divisi (Full CRUD)

| No | Divisi | Email | Password Default | Role Key | Ruang Lingkup Fitur CMS |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Secretary** | `secretary@sre-pens.com` | `secretarySRE2026!` | `secretary` | Laporan LPJ, Agenda & Kalendar, Pusat Informasi, Arsip Surat, Database Anggota |
| 2 | **Treasurer** | `treasurer@sre-pens.com` | `treasurerSRE2026!` | `treasurer` | Laporan Keuangan Publik, Donasi & Pendanaan, Manajemen Anggaran |
| 3 | **Education & Research** | `education@sre-pens.com` | `educationSRE2026!` | `education` | Publikasi Artikel, Data Akademik, Learning Center, Green Energy Update |
| 4 | **Content Marketing** | `contentmarketing@sre-pens.com` | `contentmarketingSRE2026!` | `content-marketing` | Engagement Feed, Account Insight, AI Analisis |
| 5 | **Competition & Research Dev. (CRD)** | `crd@sre-pens.com` | `crdSRE2026!` | `crd` | Program Kerja CRD, Project & Research, Competition Center, Delegasi Lomba, Medium Archive, Research Archive, Arsip Prestasi |
| 6 | **Human Resources (HR)** | `hr@sre-pens.com` | `hrSRE2026!` | `hr` | Manajemen Divisi & Staff, Monitoring Staff, Administrasi Staff |
| 7 | **Public Relations (PR)** | `pr@sre-pens.com` | `prSRE2026!` | `pr` | External Relations, Tracker Program, Sub Divisi Jobdesk, Kontak Sosial Media Staff |
| 8 | **Creative Design (Grafis)** | `graphicdesign@sre-pens.com` | `graphicdesignSRE2026!` | `graphic-design` | Brand Identity & Graphic Assets, Design Showcase |
| 9 | **Finance (Usaha)** | `finance@sre-pens.com` | `financeSRE2026!` | `finance` | Manajemen Merchandise & Produk |

---

## 👁️ 3. Akun Staff Per-Divisi (Read-Only)

| No | Divisi | Email | Password Default | Role Key | Access Level |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Staff Secretary** | `staffsecretary@sre-pens.com` | `staffsecretarySRE2026!` | `staff-secretary` | Read Only |
| 2 | **Staff Treasurer** | `stafftreasurer@sre-pens.com` | `stafftreasurerSRE2026!` | `staff-treasurer` | Read Only |
| 3 | **Staff Education** | `staffeducation@sre-pens.com` | `staffeducationSRE2026!` | `staff-education` | Read Only |
| 4 | **Staff Content Marketing** | `staffcontentmarketing@sre-pens.com` | `staffcontentmarketingSRE2026!` | `staff-content-marketing` | Read Only |
| 5 | **Staff CRD** | `staffcrd@sre-pens.com` | `staffcrdSRE2026!` | `staff-crd` | Read Only |
| 6 | **Staff HR** | `staffhr@sre-pens.com` | `staffhrSRE2026!` | `staff-hr` | Read Only |
| 7 | **Staff PR** | `staffpr@sre-pens.com` | `staffprSRE2026!` | `staff-pr` | Read Only |
| 8 | **Staff Creative Design** | `staffgraphicdesign@sre-pens.com` | `staffgraphicdesignSRE2026!` | `staff-graphic-design` | Read Only |
| 9 | **Staff Finance** | `stafffinance@sre-pens.com` | `stafffinanceSRE2026!` | `staff-finance` | Read Only |

---

## 📌 Catatan Penting Security
1. **Perubahan Kata Sandi**: Setiap pemegang akun disarankan mengganti kata sandi bawaan (default) setelah pertama kali login melalui menu **Profile Settings** di sidebar kiri CMS.
2. **Hak Akses Koordinator vs Staff**: 
   * Akun **Koordinator** memiliki hak akses penuh (*Create, Read, Update, Delete*) pada modul divisinya.
   * Akun **Staff** hanya memiliki hak akses melihat data (*Read-Only*).
3. **Seeder / Reset DB**: Untuk mereset ulang seluruh akun ke password default di atas, jalankan file SQL seeder [seed_staff.sql](file:///c:/laragon/www/sre-pens-v2/seed_staff.sql) di SQL Editor Supabase Dashboard.
