// lib/activityLatestData.ts
export interface ActivityData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export const latestActivities: ActivityData[] = [
  {
    id: "1",
    title: "Webinar Nasional: Inovasi dan Implementasi Smart Grid untuk Energi Terbarukan",
    description: "Sebuah webinar yang membahas tentang perkembangan teknologi smart grid dan perannya dalam mengoptimalkan distribusi dan manajemen energi terbarukan di Indonesia. Acara ini menghadirkan para ahli dari industri dan akademisi.",
    image: "https://i.pinimg.com/736x/a0/1a/62/a01a62f90c6412d8dcc659385c92ba9e.jpg",
    date: "2025-06-25"
  },
  {
    id: "2",
    title: "Pameran Proyek Mahasiswa: Prototipe Pembangkit Listrik Tenaga Surya Efisiensi Tinggi",
    description: "Pameran ini menampilkan berbagai prototipe dan inovasi dari mahasiswa PENS di bidang energi surya, termasuk panel surya dengan sistem pelacakan otomatis dan inverter cerdas untuk meningkatkan efisiensi energi.",
    image: "https://i.pinimg.com/736x/a0/1a/62/a01a62f90c6412d8dcc659385c92ba9e.jpg",
    date: "2025-06-19"
  },
  {
    id: "3",
    title: "Workshop Desain dan Instalasi Sistem Pembangkit Listrik Tenaga Angin Skala Kecil",
    description: "Pelatihan praktis bagi mahasiswa dan umum untuk mempelajari dasar-dasar perancangan, instalasi, dan pemeliharaan turbin angin skala kecil untuk aplikasi perumahan atau pedesaan.",
    image: "https://i.pinimg.com/736x/a0/1a/62/a01a62f90c6412d8dcc659385c92ba9e.jpg",
    date: "2025-06-12"
  },
  {
    id: "4",
    title: "Kuliah Tamu: Tantangan dan Peluang Pengembangan Energi Panas Bumi di Indonesia",
    description: "Kuliah bersama praktisi dari industri panas bumi yang mengupas tuntas potensi besar geothermal di Indonesia, serta tantangan teknologi dan regulasi yang dihadapi dalam pengembangannya.",
    image: "https://i.pinimg.com/736x/a0/1a/62/a01a62f90c6412d8dcc659385c92ba9e.jpg",
    date: "2025-06-05"
  }
];