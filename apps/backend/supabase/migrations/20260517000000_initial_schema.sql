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
CREATE POLICY "Allow authenticated full access on academics" ON public.academics FOR ALL USING (auth.role() = 'authenticated');

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
CREATE POLICY "Allow authenticated full access on activities" ON public.activities FOR ALL USING (auth.role() = 'authenticated');

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
CREATE POLICY "Allow authenticated full access on articles" ON public.articles FOR ALL USING (auth.role() = 'authenticated');

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
CREATE POLICY "Allow authenticated full access on merchandise" ON public.merchandise FOR ALL USING (auth.role() = 'authenticated');

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
CREATE POLICY "Allow authenticated full access on divisions" ON public.divisions FOR ALL USING (auth.role() = 'authenticated');

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
CREATE POLICY "Allow authenticated full access on members" ON public.members FOR ALL USING (auth.role() = 'authenticated');

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

INSERT INTO public.members (division_id, name, role, major, img_url, linkedin_url, instagram_handle, order_index) VALUES
('spv', 'Dr. Ir. Nu Rhahida Arini, S.T., M.T.', 'Supervisor (Pembina)', 'Lecturer', 'https://nurhahidaarini.com/me-2.jpg', '', '', 1),
('exec', 'Elzia Wanoko', 'President', 'D4 Teknik Mekatronika', '1sKGyNr-p_NozMQ3T7TEibRpD7iGOGQVa', '', 'elleelz_', 1),
('exec', 'Wining Yulianti', 'Vice President 1', 'D4 Sistem Pembangkit Energi', '1s0-ccU_JqoNRqB7MBsU0ca0o72Czvu8x', '', 'winingyulianti._', 2),
('exec', 'Muhammad Ar Rayan', 'Vice President 2', 'D4 Teknik Mekatronika', '1LzVe051BZNTrzkkDuHfg-wm1ErKOtAEw', '', 'aarayannn', 3),
('admin', 'Nisfa Nisrina', 'Secretary 1', 'D4 Teknik Mekatronika', '1zWJ1AZCDQl9_dpKaNKnMVGrgs37zAOgq', '', 'nisfaa_nr', 1),
('admin', 'Azza Amaliah Zahara', 'Secretary 2', 'D3 Teknologi Multimedia Broadcasting', '', '', '', 2),
('admin', 'Safira Aisya Putri', 'Treasurer 1', 'D4 Sains Data Terapan', '', '', 'safasyya', 3),
('admin', 'Kiandra Kirani', 'Treasurer 2', 'D4 Teknik Telekomunikasi', '1ll0zplpkuPoHv0kn6kbMdkqNkN4MPwKx', '', 'kiraandr_', 4),
('hr', 'Farah Hasna Salsabila', 'Head of Human Resources', 'D4 Teknik Informatika', '1vfW3P-ttw36wwnCY4qyhnvLCD9CrIPgE', '', 'farahasns', 1),
('hr', 'Muhammad Naufal', 'HR Associate', 'D4 Teknik Mekatronika', '1KhPgi7zob2Ng8_J03NvtzwbAW6Tt8xWr', '', 'muhamnaufal', 2),
('hr', 'Jihan Alya Mukhbita', 'HR Associate', 'D4 Teknik Mekatronika', '16yu0Ss60aAjbZc6gnVuA5DAGs5g7gjRS', '', 'jihannalyaaa', 3),
('hr', 'Nafi'' Firdaus Hardiansyah', 'HR Associate', 'D4 Sistem Pembangkit Energi', '10ynd4QFXh9OApjXjk3ijYB5-2MPvesnv', '', 'naffirdauss', 4),
('hr', 'Mochammad Fajriah Nur C.', 'HR Associate', 'D4 Sistem Pembangkit Energi', '1naQZVlEAqCVqdH9VvEmSm-fo5nNYX5W8', '', 'fr.cahya', 5),
('hr', 'Zahra Rizkiyatul Ummah', 'HR Associate', 'D4 Teknik Mekatronika', '1c0YnXx2UvRISFq4r94-5-t__vq4oVMxY', '', 'z.zacra_24', 6),
('hr', 'Jihad Akhbar Ayatullah', 'HR Associate', 'D4 Teknik Mekatronika', '1kuMLInbzhYZv5JmkZ5_RtPXP8nXiXpB-', '', 'jihadakhbar_', 7),
('hr', 'Andika Krisna Mahendra', 'HR Associate', 'D4 Teknologi Rekayasa Internet', '1C5jddKY4E6h0F7K0dMdDHRqDDrBFWOVt', '', 'mheeend_', 8),
('hr', 'Moch. Aldi Aksani', 'HR Associate', 'D4 Sistem Pembangkit Energi', '1TBHPXJYds7m9myXo_w-8VDMBLs9tFNss', '', 'aldiaksani', 9),
('hr', 'Attini Atmara', 'HR Associate', 'D3 Teknik Telekomunikasi', '1mnWsIoKaNdrSreZfMTEaF5BqXHtbP4kg', '', 'attmaraa_', 10),
('hr', 'Ni''matul ''Aysya Tsaaniyah', 'HR Associate', 'D4 Teknik Telekomunikasi', '1Ih32rSomZ6_R8UXJV7hELO7tn5FPE5Rg', '', 'syatsaa_', 11),
('hr', 'M. Yanuar Ihsanul Qulub', 'HR Associate', 'D4 Teknik Elektro Industri', '1Lecrdn0Y-xqrGUqf1Hbd9UwKgjBftHJz', '', 'myanu._', 12),
('hr', 'Azam Akbar Mubarak', 'HR Associate', 'D4 Sistem Pembangkit Energi', '1nTNa1oat7lIvI8fINbjauSxtTAH2oWYn', '', 'azamakbar__', 13),
('pr', 'Fathan Ahmad Zaidan', 'Head of Public Relations', 'D4 Teknik Mekatronika', '1FEiLX-bUrdX5EL7ByhHQSdCIpV4M9ST5', '', 'fathanzaidann', 1),
('pr', 'Resky Ayu Wandira', 'PR Associate', 'D4 Sains Data Terapan', '1mkjMp9jgMuFTRPkp0wC-bcMVzP7rJLYs', '', '1directly_', 2),
('pr', 'Herdan Wahyu Mairendra Pangestu', 'PR Associate', 'D4 Sains Data Terapan', '1AP0r3Bx4X_E_aF78bovW5_yIzex925lV', '', 'mairendraap', 3),
('pr', 'Gendys Amoret', 'PR Associate', 'D4 Teknik Telekomunikasi', '1tjfeU25a7-8lJNnBpFtbsx5OzQOpoo2h', '', 'ggenmore', 4),
('pr', 'Redyan Rezi Muhammad', 'PR Associate', 'D4 Sistem Pembangkit Energi', '1RmcjRv7Lv-1-uKWQZKiauAndTNAA1y9c', '', 'redyanrz.m', 5),
('pr', 'Urmila Ristina Zega', 'PR Associate', 'D4 Teknik Telekomunikasi', '1lL8lyDzA3vO_MohlJO_2FqawZnl6yOHH', '', 'aemil.st_', 6),
('pr', 'Rafli Ananda Ramadani', 'PR Associate', 'D4 Sistem Pembangkit Energi', '1uQ4AlWqmGqnwXzR1IxdzinJ6VrygenJx', '', 'raflinnd', 7),
('pr', 'Fatma Aliea Wibowo', 'PR Associate', 'D4 Teknik Telekomunikasi', '1-ho4eKnM-9S2ecqLqTZUeI2D-SOXYCLR', '', 'fatmaalea', 8),
('pr', 'Achmad Ragil Kurniawan', 'PR Associate', 'D4 Sistem Pembangkit Energi', '1GBC2Kv2aL1e2yFrUA9RIvQ_Tr6J1KoSX', '', 'aglkrwn', 9),
('finance', 'Indra Rahmat Maulidi', 'Head of Finance', 'D4 Teknik Informatika', '1kqvfnSB5AiiZ10hnt_5ip7_xpFJSPgbG', '', 'rm_indraa', 1),
('finance', 'Kamila Anwar', 'Finance Associate', 'D4 Teknik Mekatronika', '15W8fIQv5yGVlkIiilX4tD9if9-RKDdV2', '', 'kamilanwr', 2),
('finance', 'Maylinda Sava Fuana Wati', 'Finance Associate', 'D4 Teknik Elektro Industri', '1gXxF-E-z_BACGo_f9EWUhQQffa4YQ8Mc', '', 'maylindsavaa', 3),
('finance', 'Felisa Nailah Putri', 'Finance Associate', 'D3 Teknik Informatika', '1o1BXth4KB3dHGqT-xTFZ3huEvfBbvC0i', '', 'stlrrt', 4),
('finance', 'Made Suralaya Indra Nata', 'Finance Associate', 'D4 Teknologi Rekayasa Internet', '1irNsB8SwoExk3OgZ6aDde8H_za8Vb5h_', '', 'nat_indraa', 5),
('finance', 'Amelia Pramudhita Ramadhani Putri', 'Finance Associate', 'D4 Sistem Pembangkit Energi', '1dWRHRi9h5Weal4Jq9xIW95ZNuAHIW2kY', '', 'liapramudhita', 6),
('finance', 'Dyah Fahmi Putri', 'Finance Associate', 'D3 Teknik Elektro Industri', '1zgaCwZUAGigmKgGSR1UCKeeXiG__r4vD', '', 'urgirl.moon', 7),
('finance', 'Muhammad Atharyudhia L', 'Finance Associate', 'D4 Teknik Elektro Industri', '1k2wdgUQaAvMsTjuYA90UWsKbf7TiI7M9', '', 'atharyudhiaaaa', 8),
('finance', 'I Gede Arjuna Danendra P. H.', 'Finance Associate', 'D4 Sains Data Terapan', '1vIy0bwaasSoiGFAPFGJMdhSgtkwa-u0Z', '', 'junendraa', 9),
('finance', 'Laudita Esma Syahputri', 'Finance Associate', 'D4 Sains Data Terapan', '1rlUorrB0xj0RfooVcf6g5ENf4_9cjGdm', '', 'celauu.ta', 10),
('finance', 'Peri Nurjaman', 'Finance Associate', 'D4 Teknik Telekomunikasi', '1psH_EVhLaPmBeagH1e1Q2yIGo7cbjnnA', '', 'pey.nr', 11),
('education', 'Rizky Ramadhan Putra R.', 'Head of Education', 'D4 Sistem Pembangkit Energi', '1yy0IdHnAWqPzfVav60tJ-YRvJonG19Fb', '', 'rizkyrprr', 1),
('education', 'Agung Ahmadi', 'Education Associate', 'D4 Sistem Pembangkit Energi', '1QF-7eQFgNZt0RK030wdHUluHJyX4UJu3', '', 'agn.ahmdi', 2),
('education', 'Talita Evania Amirah', 'Education Associate', 'D4 Sains Data Terapan', '1eJisljZzSjA0ZJdxBTrCa8cReoRTN2TC', '', 'vnnyyyt', 3),
('education', 'Jelita Pammai', 'Education Associate', 'D4 Teknologi Rekayasa Internet', '1bTxfrr3av0cxMbObGB7c3Lz1DEHzX_AV', '', 'jelizzzzzzz', 4),
('education', 'Lufthansa Alif Aleyya Praptomo', 'Education Associate', 'D4 Sistem Pembangkit Energi', '1iy0bzgUUgnUjWqiwh8loF3baxy_WBqpy', '', 'lufths_', 5),
('education', 'Jen Roy Syaifudin', 'Education Associate', 'D4 Teknik Komputer', '1l-BnSkdVffnLhNLUuWaoAqOD6IrNLaC_', '', 'syaifudinnn.__', 6),
('education', 'Adelisa Afianti', 'Education Associate', 'D4 Sistem Pembangkit Energi', '1dmEHNoA2nMZERdFtWmEF_T-v_nkBLY_u', '', 'adelafnt_', 7),
('education', 'Muhammad Adhitya Ramadhani', 'Education Associate', 'D4 Teknik Komputer', '1jYFCKHFdrUkq2LQO-8JQwqJSmPddavWG', '', 'adhitya_arta', 8),
('education', 'Amrina Rahmawati Haqq', 'Education Associate', 'D4 Sistem Pembangkit Energi', '1K09hb8krhtITeM7AYVkEnfNhx8P7CIzC', '', 'arhaqqz', 9),
('education', 'Muhamad Nabil A.', 'Education Associate', 'D4 Teknik Mekatronika', '1E2MOSJiIBQPuSExujEQKbIn2w_doriCe', '', 'nabil_anandiansyah', 10),
('education', 'Kennenth Laurence Eldridge H', 'Education Associate', 'D4 Teknik Mekatronika', '1Ftp58yBAzGyI78uwNCvWxTOP8s5QDAkj', '', 'ken_kennenth', 11),
('education', 'Rafi Noer Ananta', 'Education Associate', 'D4 Sistem Pembangkit Energi', '', '', 'rafianant_', 12),
('comp-research', 'Akhmad Tri Wicaksono', 'Head of Competition & Research', 'D4 Sistem Pembangkit Energi', '1wwb29M58SFHSvgpL0L0rCRmP52EJ3pkh', '', 'ahmmd_d91', 1),
('comp-research', 'Muhammad Chairul Tirtana Firmansyah', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '1w1HGQJvE7n3djhamUf0Ox58eKfwtkCdM', '', 'frmn_calonengineering', 2),
('comp-research', 'Ro''uf Aufa Rifqi', 'Competition & Research Associate', 'D4 Teknik Elektro Industri', '1h1k_XOFBZCrEgutjgwwWcpe8drvrC4vg', '', 'r_aufarifqi', 3),
('comp-research', 'Syafiq Agra Rizqullah', 'Competition & Research Associate', 'D4 Teknik Elektro Industri', '1WXZl_jb0GUzfcmeEr7nemY49TFZtlzpK', '', 'agraaa_22', 4),
('comp-research', 'Titis Widiyawati', 'Competition & Research Associate', 'D4 Sains Data Terapan', '1ZrDWIt-GTQX-CyZRg3r7_4pWTPlziCbQ', '', 'wdya_inisaya', 5),
('comp-research', 'Chelsea Nevanda', 'Competition & Research Associate', 'D4 Teknik Komputer', '1mRcCY-eGYMuljCuO8EbMTurbG2El5h7s', '', 'im_chellnvanda', 6),
('comp-research', 'Muhammad Syah Erham Amru', 'Competition & Research Associate', 'D4 Teknik Mekatronika', '15c8wUERnFW25WTw0YmyHe1-Kgow6UedS', '', 'syaherhamm', 7),
('comp-research', 'Galang Seto Panuntun', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '1hf5RS7P5HEjTks5eMymZ1O42y3mxaPyS', '', 'galangsp_', 8),
('comp-research', 'Sutan Adam Pamungkas', 'Competition & Research Associate', 'D4 Teknik Mekatronika', '10SHmc0anWdLSd6ByZLDuuS6z35HYFX_5', '', 'pamungkas.stn', 9),
('comp-research', 'Joe Funda Irkham', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '', '', 'joe.f_i', 10),
('comp-research', 'Gilang Ramadhan S. Z. P.', 'Competition & Research Associate', 'D4 Teknik Mekatronika', '13mJDtH6Hk-5khKJjNgC1HCrMtnH5ZXqE', '', 'gllanng', 11),
('comp-research', 'Maulana Hildan Henri Firdaus', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '1UuYSLaNhReMjBmLLxuLur1x0VCtlkdGC', '', 'hildaann_', 12),
('comp-research', 'Raja Alamsyah', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '1knEZy2njrha85UXH8hd3T4Gb56PenEVg', '', 'rajalamsyahh', 13),
('comp-research', 'Affan Gani Ibrahim', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '', '', 'affangn04', 14),
('comp-research', 'Nazurah Fitri Atha Zahirah', 'Competition & Research Associate', 'D4 Teknik Telekomunikasi', '1nGYT_Hcb4oWhhwW6o2jD_1afPbPxpdO1', '', 'nzrhftr_', 15),
('comp-research', 'Aldy Rahman Maulana', 'Competition & Research Associate', 'D4 Sistem Pembangkit Energi', '11i09nek8Fa_9rMzrzydpGzw-PttX1wO2', '', 'aldyraahmanm', 16),
('comp-research', 'Annisa Safira Maharani', 'Competition & Research Associate', 'D4 Teknik Mekatronika', '1G5l-zZ_MN-RmKz5VQtNgMCd96cdiN_1J', '', 'hkusfr', 17),
('comp-research', 'Dewi Setyorini', 'Competition & Research Associate', 'D4 Teknik Elektro Industri', '1r4-ty_zndKhqY54w2NJ3z8tTNLeQA9Wh', '', 'dewi.styy', 18),
('content-marketing', 'Mohammad Arkaan Na''im', 'Head of Content Marketing', 'D4 Teknik Elektro Industri', '1XOx6Q72hml5zNFIXFShc2ZJd03ZvkBtd', '', 'arkaan.naim', 1),
('content-marketing', 'Muhammad Nufail Dzakwan', 'Content Marketing Associate', 'D4 Teknik Elektronika', '1ZHb8iOAdlyfPItFDP57XBSuWwPU0dKS6', '', 'aufa.dzkwn', 2),
('content-marketing', 'Taesha Marchelia Handoyo', 'Content Marketing Associate', 'D4 Sistem Pembangkit Energi', '', '', 'tae_shamarch', 3),
('content-marketing', 'Salsabilah Aurelia Arum', 'Content Marketing Associate', 'D4 Sistem Pembangkit Energi', '', '', 'cacabilahk', 4),
('content-marketing', 'Giosandira Gema Satrio Wicaksono', 'Content Marketing Associate', 'D4 Sistem Pembangkit Energi', '', '', 'giostrioww', 5),
('content-marketing', 'Febrian Yoga Waskita', 'Content Marketing Associate', 'D4 Sistem Pembangkit Energi', '', '', 'bynwaskita', 6),
('content-marketing', 'Rahmania Ayu Fitria Hanum', 'Content Marketing Associate', 'D4 Teknik Telekomunikasi', '18hzPF6NDZZ1RYTTJ8NgSTk316UuEMJWn', '', 'rhmaniayu', 7),
('content-marketing', 'Syifa Ayu Handayani', 'Content Marketing Associate', 'D3 Teknik Telekomunikasi', '1UqZ2rNW8vwLghuIVBXAdkXKzF0GM0cDh', '', 'ofmine.syf', 8),
('content-marketing', 'Moch Yusuf Alidrus', 'Content Marketing Associate', 'D4 Teknik Elektro Industri', '1Yr9JjWy-T3CI0kJDvdlxbI8rybGFqDo3', '', 'ysaelidrus', 9),
('content-marketing', 'Habibi Mulya Asmara', 'Content Marketing Associate', 'D4 Teknik Mekatronika', '', '', 'allboutabie', 10),
('graphic-design', 'Dino Ariel Ihsan Saputra', 'Head of Graphic Design', 'D3 Teknik Informatika', '', '', 'dinoariels', 1),
('graphic-design', 'Muhammad Fa''iz Al Fa''iruz Abady', 'Graphic Design Associate', 'D4 Sistem Pembangkit Energi', '1KflxKoLCvNcTkD6hLozROmWdOiVy6u0k', '', 'faiz.fairuz_', 2),
('graphic-design', 'Yahya Yazid Ilmany', 'Graphic Design Associate', 'D4 Sistem Pembangkit Energi', '1cgn1-GJE7jQlamANUgs3LFny1UwOEUQD', '', 'yaazudd', 3),
('graphic-design', 'Vianda Clainere Yunior Lay', 'Graphic Design Associate', 'D4 Teknologi Game', '1fn0NFVzblaiE2vf86Bc0aAn36vk_ttQT', '', 'vi__anda', 4),
('graphic-design', 'Adit Prasetyo', 'Graphic Design Associate', 'D4 Teknik Mekatronika', '19GtIFqmyAroSNR6NDB-ywym7MeIQE7A9', '', 'ditprss', 5),
('graphic-design', 'Vierril Kevana Rizqullah', 'Graphic Design Associate', 'D4 Sains Data Terapan', '141V7ox5mcD_5PXsOq9KQzndbQTk0fezJ', '', 'vrl.kvnr', 6),
('graphic-design', 'Muhammad Mikail Abdillah', 'Graphic Design Associate', 'D4 Teknik Mekatronika', '1RkRjmPZN5v5w7Dmp2g446USPUHfrd9qC', '', 'mikail_235', 7),
('graphic-design', 'Mahira Sania Ardava', 'Graphic Design Associate', 'D3 Teknik Telekomunikasi', '1TNM8APhgyqCLc2uEQxLCOt1DGL6dqOiN', '', 'mahirasan.a', 8),
('graphic-design', 'Muayyad Iffah Hudaya', 'Graphic Design Associate', 'D3 Teknik Telekomunikasi', '1UBBirr2wHyb_ij4Wij66iUDu01-o_a8i', '', 'iffahhudaya', 9),
('graphic-design', 'Syaila Almira Purwanto', 'Graphic Design Associate', 'D4 Teknologi Rekayasa Multimedia', '1u651JeCxlTjx8_c9MWuxGinvo3myDhbk', '', 'syailaalmira', 10),
('graphic-design', 'Rifansyah Al Farafis', 'Graphic Design Associate', 'D4 Teknologi Game', '1EMGYyLbnsctkF-c6XOBEKzu8QIjNWqVx', '', 'rifansyahalf', 11),
('graphic-design', 'Anindya Rasyava Az Zahra', 'Graphic Design Associate', 'D4 Teknik Mekatronika', '1u5_4jgRNkxjY4RElWQIqaTupWelojp85', '', 'anindiae_', 12),
('web-dev', 'Tegar Aprilian', 'Head of Web Development', 'D3 Teknik Informatika', '1AuDzQUVLjakda65pLM77RDyNVwHcE93J', '', 'himdeunn', 1),
('web-dev', 'Muhammad Rillo Aditya Azka Saputra', 'Web Development Associate', 'D3 Teknik Informatika', '1iKwRZAIxzJ2hZLBhxgJu9Md6wKALTWqL', '', 'rwillow_', 2),
('web-dev', 'Djenar Virgiani Sayyid Nashrullah', 'Web Development Associate', 'D4 Teknik Elektronika', '1aVeAcpQi6Lo8FzwC3BkgkCMfYeCj2054', '', 'virgiant__', 3),
('web-dev', 'Acaryanandana Alif Fajar', 'Web Development Associate', 'D4 Sains Data Terapan', '1TiXLMQGw5I8fAqioeWPq3uzM9fr-kEQM', '', 'nandowwww__', 4);


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
    password_text VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on user_roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Allow super-admin and admin access on user_roles" ON public.user_roles FOR ALL USING (true);

CREATE TRIGGER update_user_roles_modtime BEFORE UPDATE ON public.user_roles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================================
-- 9. SEED AUTH USERS & ROLES DIRECTLY
-- Note: Required extensions pgcrypto
-- ==========================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DELETE FROM auth.users WHERE email IN ('superadmin@sre-pens.com', 'admin@sre-pens.com', 'staff@sre-pens.com');

INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES 
('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'superadmin@sre-pens.com', crypt('SuperAdminSRE2026!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"super-admin"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'admin@sre-pens.com', crypt('AdminSRE2026!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"admin"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', 'staff@sre-pens.com', crypt('StaffSRE2026!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff"}', NOW(), NOW(), '', '', '', '')
ON CONFLICT (id) DO UPDATE SET 
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = NOW();

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', format('{"sub":"%s","email":"%s"}', '11111111-1111-1111-1111-111111111111', 'superadmin@sre-pens.com')::jsonb, 'email', 'superadmin@sre-pens.com', NOW(), NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', format('{"sub":"%s","email":"%s"}', '22222222-2222-2222-2222-222222222222', 'admin@sre-pens.com')::jsonb, 'email', 'admin@sre-pens.com', NOW(), NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', format('{"sub":"%s","email":"%s"}', '33333333-3333-3333-3333-333333333333', 'staff@sre-pens.com')::jsonb, 'email', 'staff@sre-pens.com', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('11111111-1111-1111-1111-111111111111', 'superadmin@sre-pens.com', 'super-admin', 'SuperAdminSRE2026!'),
('22222222-2222-2222-2222-222222222222', 'admin@sre-pens.com', 'admin', 'AdminSRE2026!'),
('33333333-3333-3333-3333-333333333333', 'staff@sre-pens.com', 'staff', 'StaffSRE2026!')
ON CONFLICT (id) DO UPDATE SET 
  role = EXCLUDED.role,
  password_text = EXCLUDED.password_text;
