"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaClock, FaArrowRight } from "react-icons/fa";
import { EventData } from "@/lib/activityData"; // Sesuaikan path import

interface ActivityCardProps {
  event: EventData;
  index?: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ event, index }) => {
  // Helper: Format Tanggal (Memisahkan Hari dan Bulan)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = date.toLocaleDateString("en-GB", { month: "short" });
    return { day, month };
  };

  const { day, month } = formatDate(event.date);

  return (
    <Link href={`/activity/${event.id}`} className="block h-full w-full group">
      <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-4xl bg-[#012e21] border border-white/5 shadow-2xl transition-all duration-500 hover:shadow-[#F2C601]/20">
        {/* --- 1. BACKGROUND IMAGE (Zoom & Grayscale Effect) --- */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        </div>

        {/* --- 2. GRADIENT OVERLAY --- */}
        {/* Gelap di bawah agar teks terbaca, transisi opacity saat hover */}
        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* --- 3. TOP CONTENT (Date & Index) --- */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
          {/* Date Badge (Calendar Style) */}
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-14 h-16 text-white group-hover:bg-[#F2C601] group-hover:text-[#012e21] group-hover:border-[#F2C601] transition-colors duration-300">
            <span className="text-[10px] font-bold uppercase tracking-wider leading-none mb-1">
              {month}
            </span>
            <span className="text-2xl font-black leading-none">{day}</span>
          </div>

          {/* Index Number (Editorial Decoration) */}
          {index !== undefined && (
            <span className="text-white/20 font-black text-5xl font-mono leading-none select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* --- 4. BOTTOM CONTENT (Info & Reveal) --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {/* Category Tag & Time */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#F2C601] text-[#012e21] text-[10px] font-bold uppercase tracking-widest">
              {event.category}
            </span>
            <div className="flex items-center gap-1.5 text-white/80 text-xs font-mono">
              <FaClock className="text-[#F2C601]" />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black text-white leading-[1.1] mb-2 group-hover:text-[#F2C601] transition-colors duration-300 line-clamp-2">
            {event.title}
          </h3>

          {/* Description (Slide Up Reveal) */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="text-white/70 text-sm font-light leading-relaxed pt-2 line-clamp-2 mb-4">
                {event.description}
              </p>

              {/* Action Button */}
              <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group/btn">
                See Details
                <span className="bg-white/20 p-1.5 rounded-full group-hover/btn:bg-[#F2C601] group-hover/btn:text-[#012e21] transition-colors duration-300">
                  <FaArrowRight className="group-hover/btn:-rotate-45 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
