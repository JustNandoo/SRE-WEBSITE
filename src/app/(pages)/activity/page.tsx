"use client";

import { Poppins } from "next/font/google";
import SectionHome from "@/app/layouts/activity/SectionHome";
import Contact from "@/app/layouts/SectionContact";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ActivityPage() {
  return (
    <div className={poppins.variable}>
        <SectionHome />
        <Contact />
    </div>
  );
}
