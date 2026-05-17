export interface AcademicCardProps {
  id: string | number;
  title: string;
  image: string;
  description: string;
  category?: string;
  pdfUrl?: string;
}

export const academicContent: AcademicCardProps[] = [];