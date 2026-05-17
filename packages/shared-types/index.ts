// ==========================================================
// SHARED TYPESCRIPT INTERFACES FOR SRE PENS V2
// Matches Supabase PostgreSQL Schema exactly
// ==========================================================

export interface AcademicEntity {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityEntity {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleEntity {
  id: string;
  title: string;
  author: string;
  created_by: string;
  image: string;
  description: string;
  content: string;
  published_date: string;
  created_at: string;
  updated_at: string;
}

export interface MerchandiseEntity {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
  order_link: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemberEntity {
  id: string;
  division_id: string;
  name: string;
  role: string;
  major: string;
  img_url?: string;
  linkedin_url?: string;
  instagram_handle?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DivisionEntity {
  id: string;
  name: string;
  description: string;
  order_index: number;
  members?: MemberEntity[];
  created_at: string;
}
