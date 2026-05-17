-- ====================================================================
-- SUPABASE POSTGRESQL COMPLETE SCHEMA & DATA SEEDING
-- Project: SRE PENS V2 Monorepo
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================
-- 1. DROP EXISTING TABLES (IF ANY) TO ENSURE CLEAN SEED
-- ==========================================================
DROP TABLE IF EXISTS public.members CASCADE;
DROP TABLE IF EXISTS public.divisions CASCADE;
DROP TABLE IF EXISTS public.merchandise CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.academics CASCADE;

-- ==========================================================
-- 2. ACADEMICS TABLE & SEED
-- ==========================================================
CREATE TABLE public.academics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Renewable Energy',
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.academics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on academics" ON public.academics FOR SELECT USING (true);

INSERT INTO public.academics (title, image, description, category, pdf_url) VALUES
('Renewable Energy Revolution', 'https://i.pinimg.com/736x/e8/93/31/e893314f4cd66e0f7db10a632fbe1547.jpg', 'Exploring the latest advancements in wind power technology.', 'Renewable Energy', 'https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview'),
('Green Energy Consulting', 'https://i.pinimg.com/736x/c7/ed/cb/c7edcbde497698b360a57a2605b12edc.jpg', 'Exploring the latest advancements in wind power technology.', 'Renewable Energy', 'https://drive.google.com/file/d/1s8HeBiCtmvgcKa62CFxgpux_hqiq997o/preview'),
('Climate Crisis', 'https://i.pinimg.com/736x/ae/07/88/ae0788f78306106d59443ca0b7686cfa.jpg', 'Dampak krisis iklim dan upaya penanggulangannya, khususnya melalui kebijakan dan inisiatif terkait energi terbarukan.', 'Penelitian', 'https://drive.google.com/file/d/1g-vT_7-hKv46r5McmAwrHOkjgy9wrr4j/preview'),
('Energy Storage', 'https://i.pinimg.com/736x/39/c9/4c/39c94c6e956b2ad3e3e9fb51bf5af061.jpg', 'Modul/buku elektronik ini membahas teknologi penyimpanan energi (energy storage), meliputi latar belakang, jenis, manfaat, implementasi, serta tantangan dan peluangnya di Indonesia, terutama dalam konteks energi terbarukan.', 'Renewable Energy', 'https://drive.google.com/file/d/1F_ldxIfTWZx8sXSSgf_bQ5Vp8I7hDfz0/preview'),
('Green Energy & Green Jobs', 'https://i.pinimg.com/736x/7b/f9/51/7bf951aac3c712c02cfc8d193713333c.jpg', 'Pengembangan green energy dan green jobs di Indonesia merupakan langkah krusial menuju masa depan yang berkelanjutan, meskipun ada tantangan yang perlu diatasi melalui kebijakan kuat dan kolaborasi.', 'Artikel Ilmiah', 'https://drive.google.com/file/d/1LCmOMDenfgNnrgRSbGWkgWG1iDvzVjpQ/preview');


-- ==========================================================
-- 3. ACTIVITIES / EVENTS TABLE & SEED
-- ==========================================================
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on activities" ON public.activities FOR SELECT USING (true);

INSERT INTO public.activities (title, date, time, category, description, content, image) VALUES
('Seminar Nasional: Smart Grid & IoT untuk Ketahanan Energi Indonesia 2045', '2024-08-16', '08:30 - 16:00 WIB', 'Seminar', 'Mengupas tuntas integrasi teknologi Smart Grid dan Internet of Things (IoT) untuk mewujudkan sistem kelistrikan nasional yang andal, efisien, dan berkelanjutan.', '### Latar Belakang
Menyongsong Indonesia Emas 2045, transisi menuju energi bersih dan berkelanjutan menjadi sebuah keniscayaan. Jaringan listrik pintar atau Smart Grid yang didukung oleh teknologi Internet of Things (IoT) merupakan tulang punggung dari sistem energi masa depan.', 'https://i.pinimg.com/736x/a0/1a/62/a01a62f90c6412d8dcc659385c92ba9e.jpg'),
('Workshop Intensif: Desain dan Instalasi PLTS Atap untuk Hunian', '2024-09-06', '09:00 - 17:00 WIB', 'Workshop', 'Pelatihan langsung untuk merancang, menghitung kebutuhan, dan memahami standar keamanan instalasi Pembangkit Listrik Tenaga Surya (PLTS) Atap.', '### Deskripsi Workshop
Seiring meningkatnya kesadaran akan energi bersih dan biaya listrik yang terus naik, Pembangkit Listrik Tenaga Surya (PLTS) Atap menjadi solusi yang semakin populer bagi masyarakat urban.', 'https://i.pinimg.com/736x/d2/3c/f6/d23cf69b3274eb18f1bedeae605b7b5c.jpg'),
('PENS Energy Innovation Challenge 2024', '2024-10-18', '09:00 - Selesai', 'Kompetisi', 'Ajang kompetisi inovasi bagi mahasiswa tingkat nasional untuk menciptakan solusi nyata dalam bidang efisiensi energi dan energi terbarukan.', '### Tentang Kompetisi
PENS Energy Innovation Challenge (PENS-EIC) 2024 adalah sebuah kompetisi yang diselenggarakan oleh Himpunan Mahasiswa Teknik Energitika PENS untuk menantang para inovator muda dari seluruh Indonesia.', 'https://i.pinimg.com/736x/6a/29/5b/6a295b22cc0a6c3cfa2fa85bfa1c5828.jpg'),
('Guest Lecture: The Future of Green Hydrogen', '2024-11-05', '13:30 - 15:30 WIB', 'Kuliah Tamu', 'Kuliah tamu eksklusif bersama pakar internasional mengenai potensi, tantangan, dan teknologi di balik ekonomi hidrogen hijau.', '### Ringkasan
Hidrogen hijau (green hydrogen), yang diproduksi menggunakan energi terbarukan, digadang-gadang sebagai bahan bakar masa depan.', 'https://i.pinimg.com/736x/76/32/7d/76327d3b6c8bee75a6f294816575b1b0.jpg');


-- ==========================================================
-- 4. ARTICLES TABLE & SEED
-- ==========================================================
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'SRE PENS',
    created_by VARCHAR(150) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    published_date VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on articles" ON public.articles FOR SELECT USING (true);

INSERT INTO public.articles (title, author, created_by, image, description, content, published_date) VALUES
('PLTS Terapung Cirata: Energi Bersih di Atas Waduk Terbesar se-Asia Tenggara', 'SRE PENS', 'Kementerian Komunikasi dan Informatika', 'https://awsimages.detik.net.id/visual/2023/11/09/plts-cirata-dok-pln-9_169.jpeg?w=900&q=80', 'Presiden Joko Widodo meresmikan Pembangkit Listrik Tenaga Surya (PLTS) Terapung Cirata di Kabupaten Purwakarta, sebagai PLTS terapung terbesar di Asia Tenggara.', 'PURWAKARTA, JAWA BARAT – Indonesia mengambil langkah monumental dalam transisi menuju energi bersih dengan peresmian Pembangkit Listrik Tenaga Surya (PLTS) Terapung Cirata oleh Presiden Joko Widodo. Proyek yang berlokasi di atas hamparan Waduk Cirata, Jawa Barat, ini tidak hanya menjadi sebuah instalasi energi, tetapi juga simbol kemajuan teknologi dan ambisi iklim nasional.', '09 Nov 2023'),
('Finlandia Memperkenalkan ''Baterai Pasir'' Pertama di Dunia', 'SRE PENS', 'BBC News', 'https://i.pinimg.com/736x/37/f8/fb/37f8fbbec2c9897af99d7bcc504ab4bb.jpg', 'Sebuah perusahaan di Finlandia telah memasang baterai pasir komersial pertama di dunia yang dapat menyimpan energi hijau selama berbulan-bulan.', 'KANKAANPÄÄ, FINLANDIA – Di tengah tantangan global untuk menemukan cara yang andal dan terjangkau dalam menyimpan energi terbarukan, sebuah perusahaan rintisan asal Finlandia, Polar Night Energy, berhasil menciptakan terobosan yang revolusioner.', '05 Jul 2022'),
('Para Ilmuwan Pecahkan Rekor Dunia untuk Efisiensi Sel Surya Perovskite', 'SRE PENS', 'EurekAlert!', 'https://www.surrey.ac.uk/sites/default/files/styles/image_gallery/public/2024-11/file%20%283%29.webp?itok=XJNAOrxZ', 'Para peneliti telah mengembangkan sel surya perovskite yang lebih stabil dan efisien, membuka jalan bagi energi surya yang lebih terjangkau.', 'BERLIN, JERMAN – Sebuah pencapaian monumental dalam perlombaan menuju energi bersih telah berhasil diraih. Tim ilmuwan gabungan dari beberapa institusi riset terkemuka di Eropa telah mengumumkan terobosan baru dengan menciptakan sel surya tandem perovskite-silikon yang berhasil memecahkan rekor dunia.', '12 Apr 2024');


-- ==========================================================
-- 5. MERCHANDISE TABLE & SEED
-- ==========================================================
CREATE TABLE public.merchandise (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    tag VARCHAR(100),
    order_link TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.merchandise ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on merchandise" ON public.merchandise FOR SELECT USING (true);

INSERT INTO public.merchandise (name, category, price, image, tag, order_link, is_available) VALUES
('T-Shirt Econysm', 'Apparel', 'IDR 65.000', 'https://lh3.googleusercontent.com/d/1N03qfs9j6dwoOw1Vszt1JAMHrIMxq4Ro=w1000', 'Best Recommended', 'https://www.instagram.com/greenspark.pens/', true),
('SRE Pin Series', 'Accessories', 'IDR 5.000/ITEM', 'https://lh3.googleusercontent.com/d/1UdnZwAwV65zSilUpZPSLbSU3nQ9IUSEo=w1000', 'Limited', 'https://www.instagram.com/greenspark.pens/', true),
('SRE Keychain Series', 'Accessories', 'IDR 10.000/ITEM', 'https://lh3.googleusercontent.com/d/1xxeR6rcMe-_laslTDLbaFGuTvHjmz8SH=w1000', 'Limited', 'https://www.instagram.com/greenspark.pens/', true);


-- ==========================================================
-- 6. STAFF & DIVISIONS (ABOUT MEMBER SECTION) & SEED
-- ==========================================================
CREATE TABLE public.divisions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on divisions" ON public.divisions FOR SELECT USING (true);

CREATE TABLE public.members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    division_id VARCHAR(50) REFERENCES public.divisions(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    role VARCHAR(150) NOT NULL,
    major VARCHAR(150) NOT NULL,
    img_url TEXT,
    linkedin_url TEXT,
    instagram_handle VARCHAR(100),
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on members" ON public.members FOR SELECT USING (true);

INSERT INTO public.divisions (id, name, description, order_index) VALUES
('spv', 'The Supervisor', 'Providing strategic guidance, wisdom, and mentorship to ensure the organization''s growth and stability.', 1),
('exec', 'Executive Board', 'The main pillars driving the organization''s vision.', 2),
('admin', 'Secretary and Treasurer', 'Managing administration and financial stability.', 3),
('hr', 'Human Resources', 'The heartbeat of the organization. Cultivating talent, fostering internal bonding, and ensuring a thriving community culture.', 4),
('pr', 'Public Relations', 'Building bridges between the organization and the world. Managing external communications, partnerships, and brand image.', 5),
('finance', 'Finance', 'Managing financial resources, budgeting, and ensuring fiscal responsibility to sustain organizational operations and growth.', 6),
('education', 'Education', 'Empowering members through knowledge sharing, workshops, and training programs to enhance skills and expertise in renewable energy.', 7),
('comp-research', 'Competition & Research', 'Driving innovation and excellence through competitive participation and cutting-edge research in renewable energy technologies.', 8),
('content-marketing', 'Content Marketing', 'Crafting compelling narratives and engaging content to amplify the organization''s voice and reach across digital platforms.', 9),
('graphic-design', 'Graphic Design', 'Transforming ideas into visual masterpieces. Creating stunning designs that communicate the organization''s identity and message.', 10),
('web-dev', 'Web Development', 'Building and maintaining digital infrastructure. Crafting seamless web experiences that power the organization''s online presence.', 11);

INSERT INTO public.members (division_id, name, role, major, img_url, instagram_handle, order_index) VALUES
('spv', 'Dr. Ir. Nu Rhahida Arini, S.T., M.T.', 'Supervisor (Pembina)', 'Lecturer', 'https://nurhahidaarini.com/me-2.jpg', '', 1),
('exec', 'Elzia Wanoko', 'President', 'D4 Teknik Mekatronika', '1sKGyNr-p_NozMQ3T7TEibRpD7iGOGQVa', 'elleelz_', 1),
('exec', 'Wining Yulianti', 'Vice President 1', 'D4 Sistem Pembangkit Energi', '1s0-ccU_JqoNRqB7MBsU0ca0o72Czvu8x', 'winingyulianti._', 2),
('exec', 'Muhammad Ar Rayan', 'Vice President 2', 'D4 Teknik Mekatronika', '1LzVe051BZNTrzkkDuHfg-wm1ErKOtAEw', 'aarayannn', 3),
('admin', 'Nisfa Nisrina', 'Secretary 1', 'D4 Teknik Mekatronika', '1zWJ1AZCDQl9_dpKaNKnMVGrgs37zAOgq', 'nisfaa_nr', 1),
('admin', 'Azza Amaliah Zahara', 'Secretary 2', 'D3 Teknologi Multimedia Broadcasting', '', '', 2),
('admin', 'Safira Aisya Putri', 'Treasurer 1', 'D4 Sains Data Terapan', '', 'safasyya', 3),
('admin', 'Kiandra Kirani', 'Treasurer 2', 'D4 Teknik Telekomunikasi', '1ll0zplpkuPoHv0kn6kbMdkqNkN4MPwKx', 'kiraandr_', 4),
('web-dev', 'Tegar Aprilian', 'Head of Web Development', 'D3 Teknik Informatika', '1AuDzQUVLjakda65pLM77RDyNVwHcE93J', 'himdeunn', 1),
('web-dev', 'Muhammad Rillo Aditya Azka Saputra', 'Web Development Associate', 'D3 Teknik Informatika', '1iKwRZAIxzJ2hZLBhxgJu9Md6wKALTWqL', 'rwillow_', 2),
('web-dev', 'Djenar Virgiani Sayyid Nashrullah', 'Web Development Associate', 'D4 Teknik Elektronika', '1aVeAcpQi6Lo8FzwC3BkgkCMfYeCj2054', 'virgiant__', 3),
('web-dev', 'Acaryanandana Alif Fajar', 'Web Development Associate', 'D4 Sains Data Terapan', '1TiXLMQGw5I8fAqioeWPq3uzM9fr-kEQM', 'nandowwww__', 4);


-- ==========================================================
-- 7. FUNCTION & TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ==========================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_academics_modtime BEFORE UPDATE ON public.academics FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_activities_modtime BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_articles_modtime BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_merchandise_modtime BEFORE UPDATE ON public.merchandise FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_members_modtime BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================================
-- 8. USER ROLES & AUTHORIZATION TABLE
-- ==========================================================
DROP TABLE IF EXISTS public.user_roles CASCADE;

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY, -- References auth.users(id) in practice
    email TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('staff', 'admin', 'super-admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on user_roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Allow super-admin and admin access on user_roles" ON public.user_roles FOR ALL USING (true);

CREATE TRIGGER update_user_roles_modtime BEFORE UPDATE ON public.user_roles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
