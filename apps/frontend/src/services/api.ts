import { createClient } from '@/lib/supabase/client';
import { AcademicCardProps } from '@/lib/academicData';
import { EventData } from '@/lib/activityData';
import { ArticleContent } from '@/lib/articleData';
import { MerchItem } from '@/lib/merchData';
import { Division } from '@/lib/staffData';

export async function fetchAcademics(): Promise<AcademicCardProps[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('academics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchAcademics error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    description: item.description,
    category: item.category,
    pdfUrl: item.pdf_url,
  }));
}

export async function fetchActivities(): Promise<EventData[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchActivities error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    time: item.time,
    category: item.category,
    description: item.description,
    content: item.content,
    image: item.image,
  }));
}

export async function fetchArticles(): Promise<ArticleContent[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchArticles error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    author: item.author,
    created_by: item.created_by,
    image: item.image,
    description: item.description,
    content: item.content,
    date: item.published_date,
  }));
}

export async function fetchMerchandise(): Promise<MerchItem[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('merchandise')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Supabase fetchMerchandise error:", error);
    return null;
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image,
    tag: item.tag || '',
    link: item.order_link,
  }));
}

export async function fetchStaffDivisions(): Promise<Division[] | null> {
  const supabase = createClient();
  const { data: divisions, error: divError } = await supabase
    .from('divisions')
    .select('*')
    .order('order_index', { ascending: true });
  const { data: members, error: memError } = await supabase
    .from('members')
    .select('*')
    .order('order_index', { ascending: true });

  if (divError || memError || !divisions || !members) {
    console.error("Supabase fetchStaffDivisions error:", divError || memError);
    return null;
  }

  return divisions.map((div) => ({
    id: div.id,
    division: div.name,
    description: div.description,
    members: members
      .filter((m) => m.division_id === div.id)
      .map((m) => ({
        name: m.name,
        role: m.role,
        major: m.major,
        img: m.img_url || '',
        socials: {
          linkedin: m.linkedin_url || '',
          instagram: m.instagram_handle || '',
        },
      })),
  }));
}
