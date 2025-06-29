import { use } from "react";
import { academicContent } from "../../../../../lib/academicData";
import AcademicDetailContent from "@/app/components/academic/AcademicDetailContent";
import { notFound } from "next/navigation";

export default function AcademicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const academic = academicContent.find((a) => a.id === Number(id));
  if (!academic || !academic.pdfUrl) notFound();

  return <AcademicDetailContent academic={academic} pdfUrl={academic.pdfUrl} />;
}
