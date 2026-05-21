-- ==========================================================
-- COORDINATOR TABLES & SEED DATA (Generated)
-- ==========================================================

DROP TABLE IF EXISTS public.account_insight CASCADE;
CREATE TABLE public.account_insight (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name TEXT NOT NULL,
    value TEXT NOT NULL,
    change_percent TEXT NOT NULL,
    period TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.account_insight ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on account_insight" ON public.account_insight FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on account_insight" ON public.account_insight FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_account_insight_modtime BEFORE UPDATE ON public.account_insight FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.account_insight (metric_name, value, change_percent, period) VALUES
('Pertumbuhan Followers Instagram', '+124 Followers', '+5.2%', 'Mei 2026'),
('LinkedIn Post Impressions', '12,890 Views', '+18.4%', 'Mei 2026'),
('Profile Visits (Instagram Link-in-bio)', '840 Clicks', '-2.1%', 'Mei 2026');

DROP TABLE IF EXISTS public.administrasi CASCADE;
CREATE TABLE public.administrasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_type TEXT NOT NULL,
    recipient TEXT NOT NULL,
    date_issued TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.administrasi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on administrasi" ON public.administrasi FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on administrasi" ON public.administrasi FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_administrasi_modtime BEFORE UPDATE ON public.administrasi FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.administrasi (document_type, recipient, date_issued, status) VALUES
('Surat Keputusan (SK) Pengurus', 'Seluruh Pengurus SRE PENS Periode 2026/2027', '2026-03-01', 'Active / Valid'),
('Sertifikat Kegiatan', 'Peserta Webinar Renewable Energy 101', '2026-04-15', 'Archived'),
('Surat Izin Cuti / Sakit', 'Syaila Almira (Graphic Design)', '2026-05-18', 'Active / Valid');

DROP TABLE IF EXISTS public.agenda CASCADE;
CREATE TABLE public.agenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.agenda ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on agenda" ON public.agenda FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on agenda" ON public.agenda FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_agenda_modtime BEFORE UPDATE ON public.agenda FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.agenda (event_name, date, time, location) VALUES
('Rapat Koordinasi Tengah Semester', '2026-05-25', '19:00 WIB', 'Zoom Meeting'),
('Company Visit: Pertamina New Renewable Energy', '2026-06-10', '09:00 WIB', 'Surabaya Office'),
('Internal Green Energy Hackathon', '2026-06-20', '08:00 WIB', 'Gedung Pascasarjana PENS');

DROP TABLE IF EXISTS public.ai_analisis CASCADE;
CREATE TABLE public.ai_analisis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL,
    ai_recommendation TEXT NOT NULL,
    confidence_score TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_analisis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on ai_analisis" ON public.ai_analisis FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on ai_analisis" ON public.ai_analisis FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_ai_analisis_modtime BEFORE UPDATE ON public.ai_analisis FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.ai_analisis (topic, ai_recommendation, confidence_score, date) VALUES
('Carbon Tax Regulation Indonesia', 'Buat carousel post menjelaskan skema pajak karbon baru di Indonesia secara sederhana dengan ilustrasi komik mini. Gunakan hashtag regulasi energi terbarukan.', '95%', '2026-05-18'),
('Solar Charger DIY', 'Format video vertikal (Reels) tutorial merakit powerbank bertenaga surya skala kecil. Sangat potensial menjangkau audiens mahasiswa teknik.', '89%', '2026-05-19'),
('Alumni Career Story', 'Lakukan wawancara singkat via email dengan alumni SRE PENS yang kini berkarir di start-up energi hijau. Tulis sebagai artikel singkat dan post kutipan di LinkedIn.', '92%', '2026-05-20');

DROP TABLE IF EXISTS public.arsip_surat CASCADE;
CREATE TABLE public.arsip_surat (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    letter_number TEXT NOT NULL,
    type TEXT NOT NULL,
    sender_receiver TEXT NOT NULL,
    subject TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.arsip_surat ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on arsip_surat" ON public.arsip_surat FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on arsip_surat" ON public.arsip_surat FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_arsip_surat_modtime BEFORE UPDATE ON public.arsip_surat FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.arsip_surat (letter_number, type, sender_receiver, subject, date) VALUES
('012/SRE-PENS/V/2026', 'Surat Keluar', 'BEM PENS', 'Undangan Kolaborasi Green Campus', '2026-05-10'),
('B/234/BEM-PENS/EXT/V/2026', 'Surat Masuk', 'BEM PENS', 'Persetujuan Izin Kegiatan Seminar', '2026-05-12'),
('013/SRE-PENS/V/2026', 'Surat Keluar', 'Dinas ESDM Jatim', 'Permohonan Kunjungan Lapangan', '2026-05-19');

DROP TABLE IF EXISTS public.competition_center CASCADE;
CREATE TABLE public.competition_center (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_name TEXT NOT NULL,
    organizer TEXT NOT NULL,
    deadline TEXT NOT NULL,
    prize_pool TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.competition_center ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on competition_center" ON public.competition_center FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on competition_center" ON public.competition_center FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_competition_center_modtime BEFORE UPDATE ON public.competition_center FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.competition_center (competition_name, organizer, deadline, prize_pool) VALUES
('Energy Innovation Challenge 2026', 'Institut Teknologi Bandung', '2026-06-15', 'IDR 50.000.000'),
('International Green Tech Hackathon', 'SRE Global Organization', '2026-07-01', 'USD 5,000'),
('Lomba Karya Tulis Ilmiah Energi Terbarukan', 'Universitas Indonesia', '2026-06-25', 'IDR 15.000.000');

DROP TABLE IF EXISTS public.database_anggota CASCADE;
CREATE TABLE public.database_anggota (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    nrp TEXT NOT NULL,
    division TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.database_anggota ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on database_anggota" ON public.database_anggota FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on database_anggota" ON public.database_anggota FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_database_anggota_modtime BEFORE UPDATE ON public.database_anggota FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.database_anggota (name, nrp, division, phone, status) VALUES
('Adit Prasetyo', '3122600045', 'Graphic Design', '081234567890', 'Aktif'),
('Nazurah Fitri Atha Zahirah', '3122600021', 'CRD', '089876543210', 'Aktif'),
('Febrian Yoga Waskita', '3122600033', 'Content Marketing', '082233445566', 'Aktif');

DROP TABLE IF EXISTS public.delegasi_lomba CASCADE;
CREATE TABLE public.delegasi_lomba (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_name TEXT NOT NULL,
    members TEXT NOT NULL,
    competition TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.delegasi_lomba ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on delegasi_lomba" ON public.delegasi_lomba FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on delegasi_lomba" ON public.delegasi_lomba FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_delegasi_lomba_modtime BEFORE UPDATE ON public.delegasi_lomba FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.delegasi_lomba (team_name, members, competition, status) VALUES
('SRE EEPIS Helios Team', 'Aldy Rahman (Mekatronika), Annisa Safira (Mekatronika)', 'Energy Innovation Challenge 2026', 'Penyusunan Proposal'),
('Zephyr Wind Project Team', 'Nazurah Fitri (Telekomunikasi), Affan Gani (SPE)', 'International Green Tech Hackathon', 'Finalis'),
('Bio-Cycle Team', 'Dewi Setyorini (Elektro Industri), Giosandira (SPE)', 'Lomba Karya Tulis UI', 'Pendaftaran');

DROP TABLE IF EXISTS public.design_showcase CASCADE;
CREATE TABLE public.design_showcase (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_name TEXT NOT NULL,
    designer TEXT NOT NULL,
    preview_url TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.design_showcase ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on design_showcase" ON public.design_showcase FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on design_showcase" ON public.design_showcase FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_design_showcase_modtime BEFORE UPDATE ON public.design_showcase FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.design_showcase (project_name, designer, preview_url, status) VALUES
('Poster Webinar Renewable Energy 101', 'Vianda Clainere', 'https://figma.com/file', 'Approved'),
('Desain Feed Instagram: Sejarah PLTB di Dunia', 'Yahya Yazid Ilmany', 'https://figma.com/file', 'Approved'),
('Banner Latar Belakang Panggung Seminar SPIC', 'Muhammad Fa''iz Al Fa''iruz', 'https://figma.com/file', 'Menunggu Review');

DROP TABLE IF EXISTS public.donasi_pendanaan CASCADE;
CREATE TABLE public.donasi_pendanaan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_name TEXT NOT NULL,
    amount TEXT NOT NULL,
    project_name TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.donasi_pendanaan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on donasi_pendanaan" ON public.donasi_pendanaan FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on donasi_pendanaan" ON public.donasi_pendanaan FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_donasi_pendanaan_modtime BEFORE UPDATE ON public.donasi_pendanaan FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.donasi_pendanaan (donor_name, amount, project_name, date, status) VALUES
('Alumni SRE PENS EEPIS 2022', '1500000', 'Solar Cell Panel Charger Station', '2026-05-09', 'Success'),
('Bapak Ir. Heri Susanto', '500000', 'Wind Turbine Generator Research', '2026-05-14', 'Success'),
('CV. Synergy Solusi Energi', '2000000', 'Biomass Waste Reactor Lab', '2026-05-19', 'Success');

DROP TABLE IF EXISTS public.engagement_feed CASCADE;
CREATE TABLE public.engagement_feed (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_title TEXT NOT NULL,
    platform TEXT NOT NULL,
    likes TEXT NOT NULL,
    comments TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.engagement_feed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on engagement_feed" ON public.engagement_feed FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on engagement_feed" ON public.engagement_feed FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_engagement_feed_modtime BEFORE UPDATE ON public.engagement_feed FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.engagement_feed (post_title, platform, likes, comments) VALUES
('Hari Bumi 2026: Restoring Our Ecosystem', 'Instagram', '350', '24'),
('Info Karir & Magang di Bidang Renewable Energy 2026', 'LinkedIn', '542', '41'),
('Tips Mengurangi Carbon Footprint Sehari-hari', 'TikTok', '1200', '86');

DROP TABLE IF EXISTS public.graphic_assets CASCADE;
CREATE TABLE public.graphic_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name TEXT NOT NULL,
    category TEXT NOT NULL,
    download_link TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.graphic_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on graphic_assets" ON public.graphic_assets FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on graphic_assets" ON public.graphic_assets FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_graphic_assets_modtime BEFORE UPDATE ON public.graphic_assets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.graphic_assets (asset_name, category, download_link) VALUES
('Logo SRE PENS Vector High-Res (SVG/PNG)', 'Logo Official', 'https://drive.google.com'),
('Color Brand Palette Guide SRE PENS 2026', 'Color Palette & Guidelines', 'https://drive.google.com'),
('Template PPT Presentasi Kegiatan (Canva)', 'Template Canva / Slide Presentasi', 'https://canva.com/design');

DROP TABLE IF EXISTS public.green_energy_update CASCADE;
CREATE TABLE public.green_energy_update (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    headline TEXT NOT NULL,
    source TEXT NOT NULL,
    date TEXT NOT NULL,
    summary_link TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.green_energy_update ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on green_energy_update" ON public.green_energy_update FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on green_energy_update" ON public.green_energy_update FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_green_energy_update_modtime BEFORE UPDATE ON public.green_energy_update FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.green_energy_update (headline, source, date, summary_link) VALUES
('PLTS Terapung Cirata Resmi Beroperasi Penuh Meningkatkan Kapasitas Listrik Nasional', 'Kementerian ESDM', '2026-05-10', 'https://esdm.go.id'),
('Teknologi Solid-State Battery Siap Masuk Jalur Produksi Massal Mobil Listrik 2027', 'Bloomberg Green', '2026-05-15', 'https://bloomberg.com'),
('Indonesia Canangkan Target Nol Emisi Net-Zero Carbon Sektor Industri Lebih Cepat', 'Green Energy News', '2026-05-20', 'https://greenenergy.id');

DROP TABLE IF EXISTS public.idea_medium_archive CASCADE;
CREATE TABLE public.idea_medium_archive (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    read_time TEXT NOT NULL,
    publish_date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.idea_medium_archive ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on idea_medium_archive" ON public.idea_medium_archive FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on idea_medium_archive" ON public.idea_medium_archive FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_idea_medium_archive_modtime BEFORE UPDATE ON public.idea_medium_archive FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.idea_medium_archive (title, author, read_time, publish_date) VALUES
('Membongkar Potensi Hidrogen Hijau sebagai Bahan Bakar Masa Depan Indonesia', 'Affan Gani Ibrahim', '5 Mins Read', '2026-05-01'),
('Kenapa Panel Surya Rumah Tangga Masih Tergolong Mahal? Ini Analisisnya', 'Aldy Rahman Maulana', '7 Mins Read', '2026-05-14'),
('Pembangkit Listrik Tenaga Bayu (PLTB) Sidrap: Pelajaran Bagi Kampus PENS', 'Nazurah Fitri Atha', '6 Mins Read', '2026-05-19');

DROP TABLE IF EXISTS public.kontak_sosmed_staff CASCADE;
CREATE TABLE public.kontak_sosmed_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    instagram TEXT NOT NULL,
    linkedin TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.kontak_sosmed_staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on kontak_sosmed_staff" ON public.kontak_sosmed_staff FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on kontak_sosmed_staff" ON public.kontak_sosmed_staff FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_kontak_sosmed_staff_modtime BEFORE UPDATE ON public.kontak_sosmed_staff FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.kontak_sosmed_staff (staff_name, whatsapp, instagram, linkedin) VALUES
('Taesha Marchelia Handoyo', '081223344551', '@tae_shamarch', 'https://linkedin.com/in/taesha-marchelia'),
('Salsabilah Aurelia Arum', '081223344552', '@cacabilahk', 'https://linkedin.com/in/salsabilah-aurelia'),
('Giosandira Gema Satrio', '081223344553', '@giostrioww', 'https://linkedin.com/in/giosandira-gema');

DROP TABLE IF EXISTS public.laporan_keuangan_publik CASCADE;
CREATE TABLE public.laporan_keuangan_publik (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    amount TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.laporan_keuangan_publik ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on laporan_keuangan_publik" ON public.laporan_keuangan_publik FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on laporan_keuangan_publik" ON public.laporan_keuangan_publik FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_laporan_keuangan_publik_modtime BEFORE UPDATE ON public.laporan_keuangan_publik FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.laporan_keuangan_publik (title, type, amount, date, category) VALUES
('Iuran Kas Bulanan Pengurus Mei', 'Pemasukan', '450000', '2026-05-05', 'Kas Bulanan'),
('Pembelian Domain & Hosting Website SRE PENS', 'Pengeluaran', '380000', '2026-05-12', 'Operasional'),
('Sponsorship PT. Pertamina Gas Negara', 'Pemasukan', '2500000', '2026-05-18', 'Sponsor');

DROP TABLE IF EXISTS public.learning_center CASCADE;
CREATE TABLE public.learning_center (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_name TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.learning_center ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on learning_center" ON public.learning_center FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on learning_center" ON public.learning_center FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_learning_center_modtime BEFORE UPDATE ON public.learning_center FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.learning_center (module_name, category, difficulty, author) VALUES
('Dasar Sistem PV (Photovoltaic) & Baterai', 'Solar Energy', 'Beginner', 'Affan Gani Ibrahim'),
('Perancangan Blade Wind Turbine Skala Mikro', 'Wind Power', 'Intermediate', 'Nazurah Fitri'),
('Potensi Biomassa dan Konversi Energi Ramah Lingkungan', 'Bioenergy & Hydrogen', 'Advanced', 'Dewi Setyorini');

DROP TABLE IF EXISTS public.lpj CASCADE;
CREATE TABLE public.lpj (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    division TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.lpj ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on lpj" ON public.lpj FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on lpj" ON public.lpj FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_lpj_modtime BEFORE UPDATE ON public.lpj FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.lpj (title, division, date, status) VALUES
('LPJ Webinar Renewable Energy 101', 'Education', '2026-04-12', 'Approved'),
('LPJ SRE PENS Welcoming Party 2026', 'HR', '2026-05-02', 'Approved'),
('Laporan Progress Proyek Semester Genap', 'CRD', '2026-05-18', 'Pending');

DROP TABLE IF EXISTS public.manajemen_anggaran CASCADE;
CREATE TABLE public.manajemen_anggaran (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    division_name TEXT NOT NULL,
    allocated TEXT NOT NULL,
    spent TEXT NOT NULL,
    remaining TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.manajemen_anggaran ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on manajemen_anggaran" ON public.manajemen_anggaran FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on manajemen_anggaran" ON public.manajemen_anggaran FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_manajemen_anggaran_modtime BEFORE UPDATE ON public.manajemen_anggaran FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.manajemen_anggaran (division_name, allocated, spent, remaining) VALUES
('Education', '3000000', '1200000', '1800000'),
('CRD', '5000000', '3100000', '1900000'),
('Content Marketing', '1500000', '450000', '1050000');

DROP TABLE IF EXISTS public.monitoring_staff CASCADE;
CREATE TABLE public.monitoring_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_name TEXT NOT NULL,
    division TEXT NOT NULL,
    task_completion TEXT NOT NULL,
    attendance TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.monitoring_staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on monitoring_staff" ON public.monitoring_staff FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on monitoring_staff" ON public.monitoring_staff FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_monitoring_staff_modtime BEFORE UPDATE ON public.monitoring_staff FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.monitoring_staff (staff_name, division, task_completion, attendance) VALUES
('Muhammad Nufail Dzakwan', 'Content Marketing', '95', '100'),
('Muhammad Fa''iz Al Fa''iruz', 'Graphic Design', '88', '92'),
('Aldy Rahman Maulana', 'CRD', '90', '85');

DROP TABLE IF EXISTS public.prestasi_crd CASCADE;
CREATE TABLE public.prestasi_crd (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    award_title TEXT NOT NULL,
    recipient TEXT NOT NULL,
    competition TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.prestasi_crd ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on prestasi_crd" ON public.prestasi_crd FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on prestasi_crd" ON public.prestasi_crd FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_prestasi_crd_modtime BEFORE UPDATE ON public.prestasi_crd FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.prestasi_crd (award_title, recipient, competition, date) VALUES
('Juara 1 Lomba Karya Tulis Ilmiah Nasional Energi', 'Helios Team SRE PENS', 'National Energy Summit ITB', '2025-10-12'),
('Best Presentation Award', 'Nazurah Fitri Atha Zahirah', 'International Green Tech Hackathon Singapore', '2025-11-20'),
('Juara 2 Inovasi Alat Tepat Guna Hijau', 'Zephyr Team PENS', 'Dies Natalis EEPIS 38', '2026-04-29');

DROP TABLE IF EXISTS public.program_kerja_crd CASCADE;
CREATE TABLE public.program_kerja_crd (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_name TEXT NOT NULL,
    pj TEXT NOT NULL,
    status TEXT NOT NULL,
    budget TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.program_kerja_crd ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on program_kerja_crd" ON public.program_kerja_crd FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on program_kerja_crd" ON public.program_kerja_crd FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_program_kerja_crd_modtime BEFORE UPDATE ON public.program_kerja_crd FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.program_kerja_crd (program_name, pj, status, budget) VALUES
('SRE PENS Innovation Competition (SPIC)', 'Aldy Rahman Maulana', 'Sedang Berjalan', '3500000'),
('Green Technology Workshop', 'Annisa Safira Maharani', 'Selesai', '1200000'),
('Riset Mandiri PLTS Portable EEPIS', 'Affan Gani Ibrahim', 'Sedang Berjalan', '2000000');

DROP TABLE IF EXISTS public.project_research_development CASCADE;
CREATE TABLE public.project_research_development (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    research_title TEXT NOT NULL,
    lead_researcher TEXT NOT NULL,
    timeline TEXT NOT NULL,
    funding_status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.project_research_development ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on project_research_development" ON public.project_research_development FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on project_research_development" ON public.project_research_development FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_project_research_development_modtime BEFORE UPDATE ON public.project_research_development FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.project_research_development (research_title, lead_researcher, timeline, funding_status) VALUES
('Rancang Bangun Turbin Savonius Vertikal untuk Angin Kecepatan Rendah', 'Nazurah Fitri', 'Agustus 2026', 'Internal Funding'),
('Simulasi Efisiensi Pendinginan PV Panel dengan Water Sprinkler Otomatis', 'Aldy Rahman Maulana', 'Juli 2026', 'Fully Funded'),
('Studi Optimasi Biogas Reaktor Rumah Tangga Menggunakan Limbah Organik', 'Dewi Setyorini', 'September 2026', 'Sponsorship Pending');

DROP TABLE IF EXISTS public.pusat_informasi CASCADE;
CREATE TABLE public.pusat_informasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pusat_informasi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on pusat_informasi" ON public.pusat_informasi FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on pusat_informasi" ON public.pusat_informasi FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_pusat_informasi_modtime BEFORE UPDATE ON public.pusat_informasi FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.pusat_informasi (title, category, date, content) VALUES
('Alur Pengajuan Dana Kegiatan 2026', 'Panduan Administrasi', '2026-05-01', 'SOP terbaru mengenai pengajuan anggaran divisi wajib melalui persetujuan Bendahara Umum maksimal H-10 kegiatan.'),
('Aturan Presensi Rapat dan Kegiatan SRE PENS', 'Regulasi Internal', '2026-05-05', 'Setiap anggota wajib melakukan presensi kehadiran. Ketidakhadiran lebih dari 3 kali rapat pleno tanpa keterangan akan dievaluasi oleh HR.'),
('Batas Akhir Pengumpulan Laporan Bulanan', 'Pengumuman', '2026-05-20', 'Diberitahukan kepada seluruh Head of Division untuk mengumpulkan laporan bulanan paling lambat tanggal 28 setiap bulannya.');

DROP TABLE IF EXISTS public.research_archive CASCADE;
CREATE TABLE public.research_archive (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paper_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    publish_year TEXT NOT NULL,
    doi_number TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.research_archive ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on research_archive" ON public.research_archive FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on research_archive" ON public.research_archive FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_research_archive_modtime BEFORE UPDATE ON public.research_archive FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.research_archive (paper_title, subject, publish_year, doi_number) VALUES
('Design Optimization of Vertical Axis Wind Turbine Blade for Low-Speed Wind Conditions', 'Aerodynamics & Mechanical Wind turbine', '2025', '10.1109/VAWT.2025.04561'),
('Performance Analysis of Monocrystalline PV Panel with Passive Cooling System in Surabaya Climate', 'Solar Cells Performance', '2025', '10.2110/PVPanel.2025.089'),
('Analisis Potensi Biogas dari Campuran Kotoran Sapi dan Sampah Kantin PENS', 'Bioenergy', '2026', 'In Review / Submission');

DROP TABLE IF EXISTS public.sub_divisi_jobdesk CASCADE;
CREATE TABLE public.sub_divisi_jobdesk (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sub_division TEXT NOT NULL,
    role_name TEXT NOT NULL,
    assignee TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sub_divisi_jobdesk ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on sub_divisi_jobdesk" ON public.sub_divisi_jobdesk FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on sub_divisi_jobdesk" ON public.sub_divisi_jobdesk FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_sub_divisi_jobdesk_modtime BEFORE UPDATE ON public.sub_divisi_jobdesk FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.sub_divisi_jobdesk (sub_division, role_name, assignee, description) VALUES
('Media Relations', 'Menyusun draf Press Release & Kontak Redaktur Berita', 'Taesha Marchelia', 'Menulis draf siaran pers hasil riset PV charger dan menghubungi redaksi EEPIS News.'),
('Institutional Relations', 'Menghubungi Kemahasiswaan PENS untuk Persetujuan Ormawa', 'Salsabilah Aurelia', 'Mengurus tanda tangan izin Ormawa SRE PENS ke Kepala Departemen Kemahasiswaan.'),
('Community Outreach', 'Mempersiapkan Materi Sosialisasi Sekolah Binaan', 'Giosandira Gema', 'Merancang slide pengenalan solar cell dasar untuk dipresentasikan di SMA Negeri binaan SRE PENS.');

DROP TABLE IF EXISTS public.tracker_program CASCADE;
CREATE TABLE public.tracker_program (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_name TEXT NOT NULL,
    pr_lead TEXT NOT NULL,
    media_partner TEXT NOT NULL,
    press_release_status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tracker_program ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on tracker_program" ON public.tracker_program FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on tracker_program" ON public.tracker_program FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_tracker_program_modtime BEFORE UPDATE ON public.tracker_program FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO public.tracker_program (program_name, pr_lead, media_partner, press_release_status) VALUES
('Siaran Pers Grand Opening SRE PENS 2026', 'Taesha Marchelia', 'EEPIS News / Harian PENS', 'Sudah Terbit'),
('Publikasi Rekrutmen Staff Magang SRE PENS', 'Salasabilah Aurelia', 'Event Kampus Surabaya', 'Sudah Terbit'),
('Siaran Pers Riset Alat Solar PV Charger PENS', 'Taesha Marchelia', 'Jawa Pos / Radar Surabaya', 'Dalam Penyuntingan');

