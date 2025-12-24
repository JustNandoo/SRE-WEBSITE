export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

export const upcomingEvents: EventData[] = [
  {
    id: "1",
    title: "Seminar Nasional: Smart Grid & IoT untuk Ketahanan Energi Indonesia 2045",
    date: "2024-08-16",
    time: "08:30 - 16:00 WIB",
    category: "Seminar",
    description: "Mengupas tuntas integrasi teknologi Smart Grid dan Internet of Things (IoT) untuk mewujudkan sistem kelistrikan nasional yang andal, efisien, dan berkelanjutan.",
    content: `
### Latar Belakang
Menyongsong Indonesia Emas 2045, transisi menuju energi bersih dan berkelanjutan menjadi sebuah keniscayaan. Jaringan listrik pintar atau Smart Grid yang didukung oleh teknologi Internet of Things (IoT) merupakan tulang punggung dari sistem energi masa depan. Teknologi ini tidak hanya memungkinkan efisiensi distribusi dan konsumsi energi, tetapi juga memfasilitasi integrasi sumber-sumber energi terbarukan yang bersifat intermiten seperti tenaga surya dan angin. Politeknik Elektronika Negeri Surabaya (PENS), sebagai kampus teknologi terdepan, mengambil inisiatif untuk menjadi pusat diskusi dan inovasi dalam bidang ini melalui seminar nasional yang komprehensif.

### Tujuan Acara
1.  Memberikan wawasan mendalam mengenai konsep, arsitektur, dan implementasi Smart Grid di Indonesia.
2.  Mengeksplorasi peran vital teknologi IoT dalam monitoring, kontrol, dan optimisasi jaringan listrik.
3.  Menjadi platform bagi akademisi, praktisi industri, pemerintah, dan mahasiswa untuk berdiskusi mengenai tantangan dan peluang dalam pengembangan Smart Grid.
4.  Mendorong lahirnya inovasi dan kolaborasi riset dalam bidang teknologi energi pintar.

### Rangkaian Materi
* **Sesi 1: Kebijakan dan Peta Jalan Smart Grid Nasional** - oleh perwakilan dari Kementerian Energi dan Sumber Daya Mineral (ESDM).
* **Sesi 2: Implementasi Smart Grid di Jaringan PLN: Studi Kasus dan Proyeksi** - oleh Direktur Transmisi dan Perencanaan Sistem PT PLN (Persero).
* **Sesi 3: The Role of IoT and Big Data Analytics in Modern Power Systems** - oleh pakar dari Schneider Electric / Siemens.
* **Sesi 4: Riset dan Inovasi Keamanan Siber untuk Infrastruktur Smart Grid** - oleh Kepala Pusat Studi Cyber Security PENS.
* **Sesi Panel Diskusi:** Tantangan Regulasi, Teknologi, dan Sumber Daya Manusia dalam Akselerasi Smart Grid di Indonesia.

### Pembicara Utama
* **Ir. Jisman P. Hutajulu, M.M.** (Direktur Jenderal Ketenagalistrikan, Kementerian ESDM RI)*
* **Dr. Ir. Anang Tjahjono, M.T.** (Dosen Ahli & Peneliti Senior PENS bidang Power Electronics)
* **[Nama Perwakilan Industri]** (Country Manager/CTO dari perusahaan teknologi terkemuka)
* **[Nama Perwakilan PT PLN]** (Executive Vice President bidang Smart Grid & New Energy)

*(Catatan: Daftar pembicara bersifat tentatif dan dapat berubah sewaktu-waktu)*

### Pendaftaran
* **Mahasiswa PENS:** Rp 75.000
* **Mahasiswa Umum:** Rp 100.000
* **Umum/Profesional:** Rp 250.000
* **Link Pendaftaran:** [https://pens.ac.id/seminar-smartgrid2024](https://pens.ac.id/seminar-smartgrid2024)
* **Fasilitas:** Sertifikat digital, materi seminar, makan siang, coffee break, dan networking session.
`,
    image: "https://i.pinimg.com/736x/a0/1a/62/a01a62f90c6412d8dcc659385c92ba9e.jpg"
  },
  {
    id: "2",
    title: "Workshop Intensif: Desain dan Instalasi PLTS Atap untuk Hunian",
    date: "2024-09-06",
    time: "09:00 - 17:00 WIB",
    category: "Workshop",
    description: "Pelatihan langsung untuk merancang, menghitung kebutuhan, dan memahami standar keamanan instalasi Pembangkit Listrik Tenaga Surya (PLTS) Atap.",
    content: `
### Deskripsi Workshop
Seiring meningkatnya kesadaran akan energi bersih dan biaya listrik yang terus naik, Pembangkit Listrik Tenaga Surya (PLTS) Atap menjadi solusi yang semakin populer bagi masyarakat urban. Namun, instalasi yang efektif dan aman memerlukan pemahaman teknis yang mendalam. Workshop ini dirancang untuk memberikan peserta pengetahuan teoretis sekaligus keterampilan praktis dalam merencanakan sistem PLTS Atap, mulai dari awal hingga akhir. Workshop akan dibimbing langsung oleh dosen ahli dari Program Studi Sarjana Terapan Teknik Energitika PENS dan praktisi industri yang berpengalaman.

### Target Peserta
* Mahasiswa Teknik (Elektro, Energi, Fisika, Mesin)
* Profesional dan teknisi di bidang kelistrikan
* Pemilik rumah yang tertarik memasang PLTS Atap
* Pegiat energi terbarukan dan masyarakat umum

### Materi yang Akan Dipelajari
1.  **Dasar-Dasar Energi Surya:** Potensi radiasi matahari di Indonesia, prinsip kerja sel surya (fotovoltaik).
2.  **Komponen Utama PLTS Atap:** Pengenalan modul surya, inverter (on-grid, off-grid, hybrid), baterai, sistem mounting, dan sistem proteksi.
3.  **Perancangan dan Dimensioning (Sizing):**
    * Menganalisis profil beban listrik rumah tangga.
    * Menghitung jumlah panel surya dan kapasitas inverter yang dibutuhkan.
    * Simulasi performa sistem menggunakan software (PVSyst/HelioScope).
4.  **Instalasi dan Keselamatan (K3):** Standar pemasangan yang aman, prosedur instalasi mekanis dan elektris, grounding, dan proteksi petir.
5.  **Regulasi dan Aspek Ekonomi:** Aturan ekspor-impor listrik dari PLN, perhitungan ROI (Return on Investment), dan skema pembiayaan.
6.  **Sesi Praktik:** Hands-on perakitan komponen dasar di Laboratorium Energi Terbarukan PENS.

### Investasi
* **Early Bird (s/d 20 Agustus 2024):** Rp 450.000
* **Harga Normal:** Rp 550.000
* **Terbatas hanya untuk 30 peserta.**

### Fasilitas
* Modul workshop & software simulator
* Sertifikat kompetensi
* Makan siang & 2x coffee break
* Seminar kit eksklusif
* Akses ke laboratorium dan konsultasi langsung dengan instruktur.
`,
    image: "https://i.pinimg.com/736x/d2/3c/f6/d23cf69b3274eb18f1bedeae605b7b5c.jpg"
  },
  {
    id: "3",
    title: "PENS Energy Innovation Challenge 2024",
    date: "2024-10-18",
    time: "09:00 - Selesai",
    category: "Kompetisi",
    description: "Ajang kompetisi inovasi bagi mahasiswa tingkat nasional untuk menciptakan solusi nyata dalam bidang efisiensi energi dan energi terbarukan.",
    content: `
### Tentang Kompetisi
**PENS Energy Innovation Challenge (PENS-EIC) 2024** adalah sebuah kompetisi yang diselenggarakan oleh Himpunan Mahasiswa Teknik Energitika PENS untuk menantang para inovator muda dari seluruh Indonesia. Tema tahun ini adalah **"Inovasi Energi Terbarukan untuk Kemandirian Komunitas Lokal"**. Kami mengundang mahasiswa untuk merancang dan mempresentasikan ide-ide brilian yang dapat diimplementasikan untuk membantu desa, komunitas pesisir, atau area terpencil dalam memenuhi kebutuhan energi mereka secara mandiri dan berkelanjutan.

### Kategori Lomba
1.  **Rancang Bangun Teknologi:** Pembuatan prototipe perangkat keras (misal: turbin mikrohidro piko, sistem monitoring energi berbasis IoT, kompor biomassa efisiensi tinggi).
2.  **Inovasi Digital dan Perangkat Lunak:** Pengembangan aplikasi atau platform untuk manajemen energi, prediksi potensi energi terbarukan, atau marketplace energi.
3.  **Studi dan Perencanaan Sistem:** Konsep perencanaan sistem energi terbarukan terintegrasi untuk sebuah kawasan studi kasus.

### Linimasa Kompetisi
* **Pendaftaran dan Pengumpulan Proposal:** 1 Juli - 31 Agustus 2024
* **Pengumuman Finalis:** 20 September 2024
* **Technical Meeting:** 11 Oktober 2024
* **Grand Final & Pameran Prototipe:** 18 Oktober 2024 di Hall Gedung Pascasarjana PENS

### Dewan Juri
* Dosen Ahli dari PENS dan Institut Teknologi Sepuluh Nopember (ITS)
* Perwakilan dari Direktorat Jenderal EBTKE, Kementerian ESDM
* Praktisi dari perusahaan energi (misal: Pertamina NRE, Medco Power)
* Venture Capitalist dengan fokus pada Green Technology

### Hadiah
* **Juara 1:** Rp 15.000.000 + Piala + Sertifikat
* **Juara 2:** Rp 10.000.000 + Piala + Sertifikat
* **Juara 3:** Rp 7.500.000 + Piala + Sertifikat
* **Best Prototype Award:** Rp 2.500.000

Informasi lebih lanjut dan buku panduan dapat diunduh di website resmi Himpunan Mahasiswa Teknik Energitika PENS.
`,
    image: "https://i.pinimg.com/736x/6a/29/5b/6a295b22cc0a6c3cfa2fa85bfa1c5828.jpg"
  },
  {
    id: "4",
    title: "Guest Lecture: The Future of Green Hydrogen",
    date: "2024-11-05",
    time: "13:30 - 15:30 WIB",
    category: "Kuliah Tamu",
    description: "Kuliah tamu eksklusif bersama pakar internasional mengenai potensi, tantangan, dan teknologi di balik ekonomi hidrogen hijau.",
    content: `
### Ringkasan
Hidrogen hijau (green hydrogen), yang diproduksi menggunakan energi terbarukan, digadang-gadang sebagai 'bahan bakar masa depan' yang dapat mendekarbonisasi sektor-sektor yang sulit dielektrifikasi seperti industri berat dan transportasi jarak jauh. Program Studi Teknik Energitika PENS dengan bangga mempersembahkan kuliah tamu (guest lecture) yang akan mengupas tuntas salah satu topik paling mutakhir di dunia energi.

### Pembicara
**Prof. Dr. Michael Schmidt**
* Head of Hydrogen Technologies Department, Fraunhofer Institute for Solar Energy Systems (ISE), Freiburg, Jerman.
* Seorang peneliti terkemuka dengan lebih dari 100 publikasi ilmiah tentang teknologi elektroliser, sel bahan bakar, dan integrasi hidrogen ke dalam sistem energi.

*(Acara ini akan diselenggarakan dalam Bahasa Inggris)*

### Poin-Poin Kunci Pembahasan
* **What is Green Hydrogen and Why is it Important?** Membedah perbedaan antara hidrogen hijau, biru, dan abu-abu serta perannya dalam target Net-Zero Emission.
* **State-of-the-Art Production Technologies:** Tinjauan mendalam mengenai teknologi elektroliser terkini (Alkaline, PEM, SOEC) dan efisiensinya.
* **Challenges in Storage and Transportation:** Mengatasi tantangan dalam menyimpan dan mendistribusikan hidrogen secara aman dan ekonomis.
* **Global Case Studies and Indonesia's Potential:** Mempelajari proyek-proyek hidrogen hijau yang sukses di dunia dan menganalisis potensi Indonesia sebagai produsen hidrogen hijau di masa depan.
* **Future Outlook:** Proyeksi perkembangan teknologi dan penurunan biaya dalam dekade mendatang.

### Peserta
Acara ini gratis dan terbuka untuk umum, namun diwajibkan melakukan registrasi terlebih dahulu karena tempat terbatas. Sangat direkomendasikan untuk mahasiswa S1/S2/S3, dosen, peneliti, dan para profesional di sektor energi.

### Lokasi & Registrasi
* **Lokasi:** Auditorium Gedung Pascasarjana, Kampus PENS Surabaya
* **Mode:** Hybrid (Luring terbatas & Daring via Zoom)
* **Link Registrasi:** [https://pens.ac.id/guest-lecture-hydrogen](https://pens.ac.id/guest-lecture-hydrogen)
* **Pendaftaran ditutup pada 1 November 2024 atau jika kuota telah terpenuhi.**
`,
    image: "https://i.pinimg.com/736x/76/32/7d/76327d3b6c8bee75a6f294816575b1b0.jpg"
  }
];