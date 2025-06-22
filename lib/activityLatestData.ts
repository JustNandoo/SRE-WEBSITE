// lib/activityLatestData.ts
export interface ActivityData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export const latestActivities: ActivityData[] = [
  {
    id: "1",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/300/200",
    date: "2025-06-20"
  },
  {
    id: "2",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/300/200",
    date: "2025-06-19"
  },
  {
    id: "3",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/300/200",
    date: "2025-06-18"
  },
  {
    id: "4",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/300/200",
    date: "2025-06-17"
  }
];