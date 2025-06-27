import { use } from "react";
import { articleContent } from "../../../../../lib/articleData";
import ArticleDetailContent from "@/app/components/article/ArticleDetailContent";
import { notFound } from "next/navigation";

// Async param fetch dengan React.use()
export default function ArticleDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params); // <- Ini dia kunci utama

  const article = articleContent.find((a) => a.id === Number(id));
  if (!article) notFound();

  return <ArticleDetailContent article={article} />;
}
