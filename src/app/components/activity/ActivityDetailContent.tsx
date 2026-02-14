"use client";

import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/lib/activityData";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";

export default function ActivityDetailContent({ activity }: { activity: EventData }) {
  return (
    <div 
      className="relative min-h-screen bg-[#f4f4f4]" 
      data-scroll-section
      // --- BACKGROUND GRID PATTERN ---
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px' // Ukuran kotak grid
      }}
    >
      
      {/* =========================================================
          1. HERO IMAGE (PARALLAX)
      ========================================================= */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden border-b border-black/5">
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          data-scroll
          data-scroll-speed="-0.5"
        >
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90" />
        </div>

        {/* Floating Category Badge */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
           <span 
             data-scroll 
             data-scroll-speed="0.2"
             className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-mono text-sm uppercase tracking-[0.2em]"
           >
             {activity.category || "Event"}
           </span>
        </div>
      </div>

      {/* =========================================================
          2. CONTENT CARD (CLEAN WHITE)
      ========================================================= */}
      <div className="relative z-20 px-4 sm:px-6 md:px-10 -mt-20 md:-mt-32 pb-20">
        
        {/* The White Card (Polos & Bersih) */}
        <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
           
           {/* HEADER AREA */}
           <div className="px-6 py-10 md:px-16 md:py-16 border-b border-gray-100/50 relative z-10">
              
              {/* Back Button (Kiri) */}
              <div className="flex justify-start mb-12">
                <Link 
                  href="/activity" 
                  className="group inline-flex items-center gap-2 text-[#012e21]/50 hover:text-[#012e21] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-[#012e21]/10 flex items-center justify-center group-hover:bg-[#012e21] group-hover:text-white transition-all duration-300 bg-gray-50">
                    <FaArrowLeft className="text-xs" />
                  </div>
                  <span className="text-xs font-bold font-mono uppercase tracking-widest">Back to Events</span>
                </Link>
              </div>

              {/* Title & Meta (Center) */}
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#012e21] leading-[1.1] mb-8 tracking-tight">
                  {activity.title}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-[#012e21]/70 bg-gray-50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
                      <FaCalendarAlt className="text-[#F2C601]" />
                      <span className="text-sm font-bold font-mono uppercase tracking-wide">{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#012e21]/70 bg-gray-50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
                      <FaClock className="text-[#F2C601]" />
                      <span className="text-sm font-bold font-mono uppercase tracking-wide">{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#012e21]/70 bg-gray-50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
                      <FaTag className="text-[#F2C601]" />
                      <span className="text-sm font-bold font-mono uppercase tracking-wide">{activity.category}</span>
                  </div>
                </div>
              </div>

           </div>

           {/* CONTENT BODY */}
           <div className="px-6 py-10 md:px-16 md:py-20 relative z-10">
              <div className="max-w-3xl mx-auto">
                 <p className="text-lg md:text-xl text-[#012e21]/80 font-serif leading-relaxed whitespace-pre-line text-justify first-letter:text-5xl first-letter:font-black first-letter:text-[#012e21] first-letter:float-left first-letter:mr-3 first-letter:-mt-1.5">
                    {activity.content}
                 </p>
                 
                 {/* Decorative End Mark */}
                 <div className="flex justify-center mt-16 opacity-30 gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#012e21]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#012e21]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#012e21]"></div>
                 </div>
              </div>
           </div>

        </div>
      </div>

    </div>
  );
}