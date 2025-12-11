"use client";

import { Poppins } from "next/font/google";
import SectionHome from "@/app/layouts/activity/SectionHome";
import SectionLatest from "@/app/layouts/activity/SectionLatest";
import Contact from "@/app/layouts/SectionContact";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ActivityPage() {
  return (
    <div className={poppins.variable}>
      <SmoothScrollProvider>
        <SectionHome />
        <SectionLatest />
        <Contact />
      </SmoothScrollProvider>
    </div>
  );
}
