export interface AcademicCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  category?: string;
  pdfUrl?: string;
}

export const academicContent: AcademicCardProps[] = [
  {
    id: 1,
    title: 'Renewable Energy Revolution',
    image: 'https://i.pinimg.com/736x/e8/93/31/e893314f4cd66e0f7db10a632fbe1547.jpg',
    description: 'Exploring the latest advancements in wind power technology.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Renewable Energy'
  },
  {
    id: 2,
    title: 'Green Energy Consulting',
    image: 'https://i.pinimg.com/736x/c7/ed/cb/c7edcbde497698b360a57a2605b12edc.jpg',
    description: 'Exploring the latest advancements in wind power technology.',
    pdfUrl: "https://drive.google.com/file/d/1s8HeBiCtmvgcKa62CFxgpux_hqiq997o/preview",
    category: 'Renewable Energy'
  },
  {
    id: 3,
    title: 'Climate Crisis',
    image: 'https://i.pinimg.com/736x/ae/07/88/ae0788f78306106d59443ca0b7686cfa.jpg',
    description: 'Dampak krisis iklim dan upaya penanggulangannya, khususnya melalui kebijakan dan inisiatif terkait energi terbarukan.',
    pdfUrl: "https://drive.google.com/file/d/1g-vT_7-hKv46r5McmAwrHOkjgy9wrr4j/preview",
    category: 'Penelitian'
  },
  {
    id: 4,
    title: 'Energy Storage',
    image: 'https://i.pinimg.com/736x/39/c9/4c/39c94c6e956b2ad3e3e9fb51bf5af061.jpg',
    description: 'Modul/buku elektronik ini membahas teknologi penyimpanan energi (energy storage), meliputi latar belakang, jenis, manfaat, implementasi, serta tantangan dan peluangnya di Indonesia, terutama dalam konteks energi terbarukan.',
    pdfUrl: "https://drive.google.com/file/d/1F_ldxIfTWZx8sXSSgf_bQ5Vp8I7hDfz0/preview",
    category: 'Renewable Energy'
  },
  {
    id: 5,
    title: 'Green Energy & Green Jobs',
    image: 'https://i.pinimg.com/736x/7b/f9/51/7bf951aac3c712c02cfc8d193713333c.jpg',
    description: 'Pengembangan green energy dan green jobs di Indonesia merupakan langkah krusial menuju masa depan yang berkelanjutan, meskipun ada tantangan yang perlu diatasi melalui kebijakan kuat dan kolaborasi.',
    pdfUrl: "https://drive.google.com/file/d/1LCmOMDenfgNnrgRSbGWkgWG1iDvzVjpQ/preview",
    category: 'Artikel Ilmiah'
  },
];