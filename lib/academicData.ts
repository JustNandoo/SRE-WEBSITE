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
    title: 'Sustainable Agriculture',
    image: 'https://i.pinimg.com/736x/a6/f8/91/a6f891b8c76bc70d1e9f4293be482230.jpg',
    description: 'Discover techniques for eco-friendly farming and crop management.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Sustainable Agriculture'
  },
  {
    id: 3,
    title: 'Urban Green Spaces',
    image: 'https://i.pinimg.com/736x/6a/1b/c0/6a1bc0f2324eb0c143533419ad4c86f5.jpg',
    description: 'The importance of integrating green spaces in modern cities.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Urban Environment'
  },
  {
    id: 4,
    title: 'Marine Conservation',
    image: 'https://i.pinimg.com/736x/ee/6e/27/ee6e27475a7f3a3f3e0026f1604cfde2.jpg',
    description: 'Preserving marine ecosystems for future generations.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Marine Conservation'
  },
  {
    id: 5,
    title: 'Solar Power Innovations',
    image: 'https://i.pinimg.com/736x/27/e6/23/27e623b6da6cf84ec0e0a43f88d46eb2.jpg',
    description: 'Innovative solutions for harnessing solar energy worldwide.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Renewable Energy'
  },
  {
    id: 6,
    title: 'Clean Water Initiatives',
    image: 'https://i.pinimg.com/736x/c3/6f/7b/c36f7bde90bcc01acebc1cd27b6d5200.jpg',
    description: 'Bringing clean water solutions to underdeveloped regions.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Water Resources'
  },
  {
    id: 7,
    title: 'Electric Vehicles',
    image: 'https://i.pinimg.com/736x/7f/e9/fe/7fe9fe542a8efd30b86d52b67d25b3e1.jpg',
    description: 'How EVs are transforming the future of transportation.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Transportation'
  },
  {
    id: 8,
    title: 'Biodiversity Protection',
    image: 'https://i.pinimg.com/736x/55/e3/b3/55e3b3a2790aa8d41da4c812d6c019f1.jpg',
    description: 'Efforts to safeguard diverse wildlife species and habitats.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Biological Diversity'
  },
  {
    id: 9,
    title: 'Smart Grids Technology',
    image: 'https://i.pinimg.com/736x/0f/ac/06/0fac06b15d8a05d3d5cf93dba8a7afc1.jpg',
    description: 'Advancing electricity distribution through smart grids.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Energy Technology'
  },
  {
    id: 10,
    title: 'Waste Management Solutions',
    image: 'https://i.pinimg.com/736x/58/63/72/5863723d182bf3075d5a58c1ad4250c5.jpg',
    description: 'Creating efficient systems for recycling and waste reduction.',
    pdfUrl: "https://drive.google.com/file/d/1qkZp_AA0OzOSaS9HiSUjiD023p1OIpFS/preview",
    category: 'Rubbish Management'
  }
];