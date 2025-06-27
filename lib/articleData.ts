// lib/articleData.ts
import { ArticleCardProps } from "../src/app/components/article/ArticleCard";

export interface ArticleContent extends ArticleCardProps {
  content: string;
  created_by: string;
}

export const articleContent: ArticleContent[] = [
  {
    id: 1,
    title:
      "PLTS Terapung Cirata: Energi Bersih di Atas Waduk Terbesar se-Asia Tenggara",
    image:
      "https://awsimages.detik.net.id/visual/2023/11/09/plts-cirata-dok-pln-9_169.jpeg?w=900&q=80",
    description:
      "Presiden Joko Widodo meresmikan Pembangkit Listrik Tenaga Surya (PLTS) Terapung Cirata di Kabupaten Purwakarta, sebagai PLTS terapung terbesar di Asia Tenggara.",
    created_by: "Kementerian Komunikasi dan Informatika",
    content: `PURWAKARTA, JAWA BARAT – Indonesia mengambil langkah monumental dalam transisi menuju energi bersih dengan peresmian Pembangkit Listrik Tenaga Surya (PLTS) Terapung Cirata oleh Presiden Joko Widodo. Proyek yang berlokasi di atas hamparan Waduk Cirata, Jawa Barat, ini tidak hanya menjadi sebuah instalasi energi, tetapi juga simbol kemajuan teknologi dan ambisi iklim nasional, dengan kapasitas terpasang mencapai 192 Megawatt peak (MWp) yang menjadikannya sebagai PLTS terapung terbesar di kawasan Asia Tenggara.

Dalam sambutannya, Presiden Joko Widodo menyatakan bahwa peresmian ini adalah sebuah hari yang bersejarah bagi pembangunan energi baru terbarukan (EBT) di Indonesia. "Hari ini adalah bukti nyata bahwa kita mampu membangun fasilitas energi terbarukan berskala besar. Kita berhasil memanfaatkan potensi Waduk Cirata tidak hanya untuk tenaga air, tetapi juga untuk tenaga surya, tanpa mengorbankan lahan produktif. Ini adalah lompatan besar menuju target Net Zero Emission kita," tegas Presiden.

Proyek strategis ini merupakan buah dari sinergi internasional antara BUMN Indonesia, PT PLN (Persero) melalui subholding-nya, PLN Nusantara Power, dengan perusahaan energi terkemuka asal Uni Emirat Arab (UEA), Masdar. Kolaborasi ini terwujud melalui investasi signifikan senilai Rp1,7 triliun, yang menunjukkan tingginya kepercayaan investor global terhadap potensi dan iklim investasi EBT di Indonesia.

Dibangun di atas 200 hektare permukaan air waduk, PLTS Terapung Cirata diproyeksikan mampu memasok listrik bersih untuk lebih dari 50.000 rumah tangga dan secara signifikan akan mengurangi emisi karbon hingga 214.000 ton per tahun. Keberadaannya menjadi tonggak penting yang tidak hanya akan memperkuat bauran energi nasional, tetapi juga diharapkan dapat memicu efek domino, mendorong negara-negara lain di kawasan untuk mengadopsi solusi serupa dalam pengembangan energi bersih mereka. Pemerintah juga menyatakan bahwa proyek ini merupakan fase pertama, dengan rencana pengembangan lebih lanjut untuk memaksimalkan potensi Waduk Cirata di masa depan.`,
  },
  {
    id: 2,
    title: "Finlandia Memperkenalkan 'Baterai Pasir' Pertama di Dunia",
    image:
      "https://i.pinimg.com/736x/37/f8/fb/37f8fbbec2c9897af99d7bcc504ab4bb.jpg",
    description:
      "Sebuah perusahaan di Finlandia telah memasang baterai pasir komersial pertama di dunia yang dapat menyimpan energi hijau selama berbulan-bulan.",
    created_by: "BBC News",
    content: `KANKAANPÄÄ, FINLANDIA – Di tengah tantangan global untuk menemukan cara yang andal dan terjangkau dalam menyimpan energi terbarukan, sebuah perusahaan rintisan asal Finlandia, Polar Night Energy, berhasil menciptakan terobosan yang revolusioner. Mereka telah meluncurkan sistem 'baterai pasir' pertama di dunia yang beroperasi secara komersial, menawarkan solusi cerdas untuk salah satu masalah terbesar dalam transisi energi: intermittency atau sifat tidak menentu dari tenaga surya dan angin.

Teknologi inovatif ini bekerja dengan prinsip yang sangat sederhana namun efektif. Sistem ini menggunakan sebuah silo baja besar yang diisi dengan ratusan ton pasir berkualitas rendah—material yang melimpah dan murah. Ketika surplus listrik dari panel surya atau turbin angin tersedia dengan harga murah, energi tersebut digunakan untuk memanaskan pasir hingga suhu mencapai 500°C. Silo yang terinsulasi dengan baik ini mampu menyimpan energi panas tersebut dengan tingkat efisiensi tinggi selama berbulan-bulan, layaknya sebuah termos raksasa.

Kejeniusan sistem ini terletak pada kemampuannya untuk menjembatani kesenjangan antara produksi dan permintaan energi. Energi panas yang tersimpan kemudian dapat diekstraksi kapan pun dibutuhkan, terutama selama musim dingin yang panjang dan brutal di Finlandia, di mana permintaan untuk pemanasan melonjak sementara harga energi mencapai puncaknya. Energi panas dari baterai pasir ini disalurkan ke jaringan pemanas distrik (district heating) lokal untuk menghangatkan rumah dan gedung perkantoran.

"Ini adalah cara yang sangat efisien untuk 'mengemas' surplus energi musim panas untuk kebutuhan vital di musim dingin," jelas salah satu teknisi Polar Night Energy. "Inovasi ini tidak hanya mengurangi ketergantungan kami pada bahan bakar fosil, tetapi juga secara drastis menekan biaya pemanasan bagi masyarakat."

Dengan biaya instalasi yang rendah dan dampak lingkungan yang minimal, inovasi 'baterai pasir' ini dianggap sebagai paradigma baru dalam teknologi penyimpanan energi. Solusi ini membuka jalan bagi negara-negara lain, terutama yang memiliki musim dingin yang ekstrem, untuk mengadopsi sistem serupa dan mempercepat langkah mereka menuju kedaulatan serta keberlanjutan energi.`,
  },
  {
    id: 3,
    title:
      "Para Ilmuwan Pecahkan Rekor Dunia untuk Efisiensi Sel Surya Perovskite",
    image:
      "https://www.surrey.ac.uk/sites/default/files/styles/image_gallery/public/2024-11/file%20%283%29.webp?itok=XJNAOrxZ",
    description:
      "Para peneliti telah mengembangkan sel surya perovskite yang lebih stabil dan efisien, membuka jalan bagi energi surya yang lebih terjangkau.",
    created_by: "EurekAlert!",
    content: `BERLIN, JERMAN – Sebuah pencapaian monumental dalam perlombaan menuju energi bersih telah berhasil diraih. Tim ilmuwan gabungan dari beberapa institusi riset terkemuka di Eropa telah mengumumkan terobosan baru dengan menciptakan sel surya tandem perovskite-silikon yang berhasil memecahkan rekor dunia efisiensi konversi daya, mencapai 33,9%. Angka ini bukan sekadar statistik, melainkan sebuah loncatan besar yang berpotensi mendefinisikan ulang masa depan energi surya dan mempercepat transisi energi global.

Sel surya tandem perovskite-silikon telah lama dianggap sebagai 'cawan suci' dalam teknologi fotovoltaik. Teknologi ini menggabungkan keandalan sel surya silikon konvensional dengan kemampuan penyerapan cahaya superior dari material perovskite. Secara sederhana, sel tandem ini bekerja dalam dua lapisan: lapisan perovskite di bagian atas menangkap foton berenergi tinggi (cahaya biru), sementara lapisan silikon di bawahnya menangkap foton berenergi lebih rendah (cahaya merah) yang melewatinya. Kombinasi ini memungkinkan sel untuk mengubah spektrum cahaya matahari yang lebih luas menjadi listrik, melampaui batas teoretis sel silikon tunggal.

Namun, tantangan terbesar yang selama ini menghambat komersialisasi perovskite adalah masalah degradasi atau ketidakstabilan materialnya yang cepat rusak saat terpapar panas dan kelembapan. Terobosan yang dicapai tim ilmuwan ini berpusat pada penyelesaian masalah krusial tersebut.

Dengan menerapkan teknik deposisi antarmuka yang inovatif, mereka berhasil menciptakan lapisan pelindung mikroskopis yang sangat stabil dan efisien di antara kedua material. "Kami tidak hanya berhasil mendorong batas efisiensi, tetapi yang lebih penting, kami berhasil memecahkan kode stabilitas yang selama ini menjadi 'tumit Achilles' bagi teknologi perovskite," ungkap seorang peneliti utama dalam rilis pers mereka.

Implikasi dari kemajuan ini sangat luas. Efisiensi yang lebih tinggi berarti lebih sedikit panel yang dibutuhkan untuk menghasilkan jumlah listrik yang sama, secara langsung mengurangi biaya lahan dan instalasi. Ditambah dengan biaya produksi perovskite yang pada dasarnya jauh lebih murah daripada silikon, kemajuan ini membuka jalan bagi produksi massal panel surya yang tidak hanya lebih bertenaga tetapi juga secara signifikan lebih terjangkau. Para ahli memproyeksikan bahwa teknologi ini dapat menurunkan biaya listrik tenaga surya hingga ke level yang akan membuatnya menjadi sumber energi termurah di hampir seluruh belahan dunia, mempercepat adopsi energi surya secara masif dalam skala global.`,
  },
];
