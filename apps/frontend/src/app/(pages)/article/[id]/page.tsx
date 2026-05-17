import { use } from "react";
import { articleContent } from "@/lib/articleData";
import ArticleDetailContent from "@/app/components/article/ArticleDetailContent";
import { notFound } from "next/navigation";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import { createClient } from "@/lib/supabase/server";

export default async function ArticleDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data } = await supabase.from('articles').select('*').eq('id', id).single();

  let article: any = null;
  if (data) {
    article = {
      id: data.id,
      title: data.title,
      author: data.author,
      created_by: data.created_by,
      image: data.image,
      description: data.description,
      content: data.content,
      date: data.published_date,
    };
  } else {
    article = articleContent.find((a) => String(a.id) === String(id));
  }

  if (!article) notFound();

  return (
    <SmoothScrollProvider>
      <ArticleDetailContent article={article} />
    </SmoothScrollProvider>
  );
}
