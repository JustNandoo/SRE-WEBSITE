export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

export const upcomingEvents: EventData[] = [];