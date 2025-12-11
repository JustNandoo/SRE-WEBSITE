"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { ActivityData } from "@/lib/activityLatestData";

interface ActivityLatestCardProps {
  activity: ActivityData;
  index: number;
}

const ActivityLatestCard: React.FC<ActivityLatestCardProps> = ({
  activity,
  index,
}) => {
  return (
    <Link
      href={`/activity/${activity.id}`}
      // H-[260px]: Mengunci tinggi agar compact & tidak memanjangkan section
      className="block w-full group cursor-pointer h-[260px]"
    >
      <div className="flex h-full w-full bg-[#fff0aa] overflow-hidden">
        
        {/* --- 1. LEFT SIDE: IMAGE (35%) --- */}
        <div className="w-[35%] relative h-full overflow-hidden border-r border-[#012e21]/5">
          <div className="absolute inset-0 w-full h-full bg-gray-200">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
          </div>

          {/* Index Number */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-white font-black text-4xl font-mono leading-none mix-blend-overlay opacity-80">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* --- 2. RIGHT SIDE: CONTENT (65%) --- */}
        <div className="w-[65%] p-5 md:p-6 flex flex-col justify-between relative">
          
          {/* Top: Meta & Title */}
          <div className="flex flex-col gap-2">
            {/* Date Badge */}
            <div className="flex items-center gap-2 text-[#012e21]/50 text-[10px] font-bold uppercase tracking-widest font-mono">
               <FaCalendarAlt />
               <span>{activity.date}</span>
            </div>

            {/* Title (Compact) */}
            <h3 className="text-xl md:text-2xl font-black text-[#012e21] leading-tight group-hover:text-[#10926C] transition-colors duration-300 line-clamp-2">
              {activity.title}
            </h3>

            {/* Description (Shortened to 2 lines) */}
            <p className="text-[#012e21]/70 text-xs md:text-sm font-serif leading-relaxed line-clamp-2">
              {activity.description}
            </p>
          </div>

          {/* Bottom: Action */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-[#012e21] font-bold text-[10px] uppercase tracking-widest group-hover:tracking-wider transition-all duration-300 opacity-60 group-hover:opacity-100">
              Read Story
            </span>
            
            <div className="w-8 h-8 rounded-full border border-[#012e21]/20 flex items-center justify-center text-[#012e21] group-hover:bg-[#012e21] group-hover:text-[#fff0aa] transition-all duration-300">
              <FaArrowRight className="text-[10px] transform group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default ActivityLatestCard;