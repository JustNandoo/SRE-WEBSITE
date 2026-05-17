"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { upcomingEvents } from "@/lib/activityData";
import { FaArrowRight } from "react-icons/fa";

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

// ================= MAIN SECTION =================
export default function SectionNews() {
  // State untuk melacak berita mana yang sedang di-hover
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Ambil maksimal 3 berita untuk home page
  const displayedEvents = upcomingEvents.slice(0, 3);

  return (
    <section
      data-scroll-section
      className={`relative py-20 md:py-32 bg-[#012e21] text-[#fff0aa] ${poppins.variable} ${akira.variable} overflow-hidden`}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        
        {/* === HEADER (Sangat Padat & Rapi) === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4 opacity-80">
              <span className="w-2 h-2 bg-[#fff0aa] rounded-full animate-pulse" />
              <span className="tracking-[0.3em] uppercase text-xs font-bold font-mono">
                Recent Updates
              </span>
            </div>
            <h2 
              className="font-akira text-5xl md:text-7xl lg:text-[6rem] uppercase leading-[0.85] tracking-tight"
            >
              WHAT&apos;S <br />
              <span className="text-transparent opacity-80" style={{ WebkitTextStroke: "1px #fff0aa" }}>
                NEW
              </span>
            </h2>
          </div>

          <Link
            href="/activity"
            className="group flex items-center gap-4 text-[#fff0aa] border-b border-[#fff0aa]/30 pb-2 hover:border-[#fff0aa] transition-colors duration-300 w-max"
          >
            <span className="font-mono uppercase tracking-widest text-xs font-bold">
              View All Activity
            </span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* === CONTENT SPLIT (Fixed Height Desktop) === */}
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
          
          {/* KIRI: Daftar Berita (Text Only) */}
          <div className="w-full lg:w-3/5 flex flex-col">
            {displayedEvents.map((event, index) => (
              <div
                key={event.id}
                onMouseEnter={() => setActiveIndex(index)}
                // Untuk mobile: Tap untuk mengubah gambar
                onClick={() => setActiveIndex(index)} 
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-10 border-b border-[#fff0aa]/20 cursor-pointer first:border-t"
              >
                {/* Info & Judul */}
                <div className="flex gap-6 md:gap-10 items-start md:items-center w-full">
                  <span className="font-mono text-sm opacity-40 font-bold mt-1 md:mt-0 transition-opacity duration-300 group-hover:opacity-100">
                    0{index + 1}
                  </span>
                  <div className="flex flex-col">
                    <h3 
                      className={`text-2xl md:text-4xl lg:text-[2.5rem] font-black uppercase leading-[1.1] tracking-tighter transition-all duration-500 ease-out origin-left
                        ${activeIndex === index ? "text-[#fff0aa] translate-x-2 md:translate-x-4 scale-105" : "text-[#fff0aa]/50"}
                      `}
                    >
                      {event.title}
                    </h3>
                    <p className={`font-mono text-xs uppercase tracking-widest mt-3 transition-opacity duration-500
                        ${activeIndex === index ? "opacity-80" : "opacity-0"}
                    `}>
                      {event.date} &nbsp;•&nbsp; {event.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* KANAN: Display Gambar Dinamis (Statis & Kompak) */}
          <div className="w-full lg:w-2/5 h-[300px] md:h-[400px] lg:h-[500px] relative rounded-2xl overflow-hidden bg-[#fff0aa]/5">
            {displayedEvents.map((event, index) => (
              <div
                key={event.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out
                  ${activeIndex === index 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-110 z-0 pointer-events-none"
                  }
                `}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                
                {/* Overlay Hitam Transparan Agar Elegan */}
                <div className="absolute inset-0 bg-[#012e21]/20 mix-blend-multiply" />
              </div>
            ))}
            
            {/* Dekorasi Sudut (Opsional untuk Awwwards Feel) */}
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fff0aa]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#fff0aa]/30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}