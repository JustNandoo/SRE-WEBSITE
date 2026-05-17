import { use } from "react";
import { upcomingEvents } from "@/lib/activityData";
import ActivityDetailContent from "@/app/components/activity/ActivityDetailContent";
import { notFound } from "next/navigation";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import { createClient } from "@/lib/supabase/server";

export default async function ActivityDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data } = await supabase.from('activities').select('*').eq('id', id).single();

  let activity: any = null;
  if (data) {
    activity = {
      id: data.id,
      title: data.title,
      date: data.date,
      time: data.time,
      category: data.category,
      description: data.description,
      content: data.content,
      image: data.image,
    };
  } else {
    activity = upcomingEvents.find((e) => String(e.id) === String(id));
  }

  if (!activity) notFound();

  return (
    <SmoothScrollProvider>
      <ActivityDetailContent activity={activity} />
    </SmoothScrollProvider>
  );
}
