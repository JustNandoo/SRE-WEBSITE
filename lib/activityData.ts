// lib/activityData.ts
export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  image: string; // 🆕 added image field
}

export const upcomingEvents: EventData[] = [
  {
    id: "1",
    title: "Lorem Ipsum Dolor Sit Amet",
    date: "2025-06-25",
    time: "14:00",
    category: "Workshop",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: "https://i.pinimg.com/736x/19/ef/aa/19efaa4a1192466e3fa4c554bee2833e.jpg"
  },
  {
    id: "2",
    title: "Consectetur Adipiscing",
    date: "2025-06-26",
    time: "10:00",
    category: "Seminar",
    description: "Sed do eiusmod tempor incididunt ut labore",
    image: "https://i.pinimg.com/736x/19/ef/aa/19efaa4a1192466e3fa4c554bee2833e.jpg"
  },
  {
    id: "3",
    title: "Ut Labore Et Dolore",
    date: "2025-06-27",
    time: "16:00",
    category: "Conference",
    description: "Magna aliqua ut enim ad minim veniam",
    image: "https://i.pinimg.com/736x/19/ef/aa/19efaa4a1192466e3fa4c554bee2833e.jpg"
  },
  {
    id: "4",
    title: "Quis Nostrud Exercitation",
    date: "2025-06-28",
    time: "09:00",
    category: "Training",
    description: "Ullamco laboris nisi ut aliquip ex ea commodo",
    image: "https://i.pinimg.com/736x/19/ef/aa/19efaa4a1192466e3fa4c554bee2833e.jpg"
  }
];
