"use client";

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { upcomingEvents } from "@/lib/activityData";

// ================= FONTS =================
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

// ================= HELPERS =================
const truncateTitle = (text: string, max: number) =>
  text.length <= max ? text : text.slice(0, max) + "...";

// ================= NEWS GRID COMPONENT =================
function NewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {upcomingEvents.slice(0, 3).map((event) => (
        <div
          key={event.id}
          className="group relative flex flex-col h-full border border-[#fff0aa]/20 hover:border-[#fff0aa] transition-colors duration-300 bg-[#012e21]"
        >
          {/* IMAGE CONTAINER */}
          <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-[#fff0aa]/20">
            {/* Overlay Effect on Hover */}
            <div className="absolute inset-0 bg-[#134576]/0 group-hover:bg-[#134576]/20 transition-colors duration-300 mix-blend-overlay z-10" />
            
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute top-4 left-4 bg-[#fff0aa] text-[#012e21] px-3 py-1 text-xs font-akira z-20">
              {event.category}
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="p-6 flex flex-col grow justify-between group-hover:bg-[#fff0aa] transition-colors duration-300">
            <div className="space-y-4">
              <p className="text-xs tracking-widest opacity-60 group-hover:text-[#012e21]/60 transition-colors duration-300">
                {event.date}
              </p>
              <h3 className="text-xl font-semibold leading-tight group-hover:text-[#012e21] transition-colors duration-300">
                {truncateTitle(event.title, 50)}
              </h3>
              <p className="text-sm opacity-70 line-clamp-3 group-hover:text-[#012e21]/70 transition-colors duration-300">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ================= MAIN =================
export default function SectionNews() {
  return (
    <section
      data-scroll-section
      className={`relative py-24 md:py-32 bg-[#012e21] text-[#fff0aa] ${poppins.variable} ${akira.variable}`}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-20 flex flex-col items-center">
        {/* HEADER */}
        <div className="w-full mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 bg-[#134576] rounded-full" />
            <span className="tracking-[0.3em] uppercase text-sm font-bold">
              Recent Updates
            </span>
          </div>

          <h2 className="font-akira text-[10vw] md:text-[8vw] uppercase leading-none">
            WHAT&apos;S NEW
          </h2>
          <h2 className="font-akira text-[10vw] md:text-[8vw] uppercase opacity-80 md:ml-24 leading-none">
            AT SRE PENS
          </h2>
        </div>

        {/* GRID (Unified for Mobile & Desktop) */}
        <div className="w-full">
          <NewsGrid />
        </div>

        {/* BUTTON */}
        <div className="mt-20">
          <Link
            href="/activity"
            className="font-akira text-lg hover:text-[#134576] transition-colors duration-300"
          >
            View All Activity →
          </Link>
        </div>
      </div>
    </section>
  );
}