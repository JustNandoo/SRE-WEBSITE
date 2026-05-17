// lib/articleData.ts

// --- 1. DEFINISI TIPE DATA ---

export interface ArticleContent {
  id: string | number;
  author: string;
  title: string;
  image: string;
  description: string;
  created_by: string;
  date: string;
  content: string;
}

// Export 'Article' agar bisa dipakai di component SectionHome
export type Article = ArticleContent;

export const articleContent: ArticleContent[] = [];