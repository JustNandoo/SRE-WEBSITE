import { use } from "react";
import { upcomingEvents } from "@/lib/activityData";
import ActivityDetailContent from "@/app/components/activity/ActivityDetailContent";
import { notFound } from "next/navigation";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

export default function ActivityDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);

  const activity = upcomingEvents.find((e) => e.id === id);
  if (!activity) notFound();

  return (
    <SmoothScrollProvider>
      <ActivityDetailContent activity={activity} />
    </SmoothScrollProvider>
  );
}
