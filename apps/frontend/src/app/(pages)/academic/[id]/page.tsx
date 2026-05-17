import { use } from "react";
import { academicContent } from "@/lib/academicData";
import AcademicDetailContent from "@/app/components/academic/AcademicDetailContent";
import { notFound } from "next/navigation";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import { createClient } from "@/lib/supabase/server";

export default async function AcademicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('academics').select('*').eq('id', id).single();

  let academic: any = null;
  if (data) {
    academic = {
      id: data.id,
      title: data.title,
      image: data.image,
      description: data.description,
      category: data.category,
      pdfUrl: data.pdf_url,
    };
  } else {
    academic = academicContent.find((a) => String(a.id) === String(id));
  }

  if (!academic || !academic.pdfUrl) notFound();

  return (
    <SmoothScrollProvider>
      <AcademicDetailContent academic={academic} pdfUrl={academic.pdfUrl} />
    </SmoothScrollProvider>
  );
}
