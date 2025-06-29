import { use } from "react";
import { upcomingEvents } from "../../../../../lib/activityData";
import ActivityDetailContent from "@/app/components/activity/ActivityDetailContent";
import { notFound } from "next/navigation";

export default function ActivityDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  const activity = upcomingEvents.find((e) => e.id === id);
  if (!activity) notFound();

  return <ActivityDetailContent activity={activity} />;
}
