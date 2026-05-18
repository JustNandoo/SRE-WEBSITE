"use client";

import React, { useState, useEffect } from "react";
import { staffData, Division } from "@/lib/staffData";
import { MemberCard } from "@/app/components/about/MemberCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { fetchStaffDivisions } from "@/services/api";

export default function SectionMember() {
  const [divisionsData, setDivisionsData] = useState<Division[]>(staffData);

  useEffect(() => {
    async function loadData() {
      const data = await fetchStaffDivisions();
      if (data && data.length > 0) {
        setDivisionsData(data);
      }
    }
    loadData();
  }, []);

  // Fungsi untuk handle klik tombol panah (Scroll Kiri/Kanan)
  const handleScroll = (elementId: string, direction: "left" | "right") => {
    const container = document.getElementById(elementId);
    if (container) {
      const scrollAmount = direction === "left" ? -350 : 350; // Jarak scroll
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-[#fff0aa] py-24 md:py-32"
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-10">
        
        {/* === HEADER === */}
        <div className="mb-20 md:mb-32 text-center md:text-left border-b border-[#012e21]/10 pb-10">
          <div className="text-[12vw] md:text-[8rem] font-black text-[#012e21] leading-[0.85] tracking-tighter uppercase overflow-hidden">
            <span 
              className="block" 
              data-scroll 
              data-scroll-speed="0.2"
            >
              MEET THE
            </span>
            <span
              className="block text-transparent"
              data-scroll
              data-scroll-speed="0.1"
              style={{ WebkitTextStroke: "1px #012e21" }}
            >
              PILLARS
            </span>
          </div>
        </div>

        {/* === CONTENT (Looping Departemen) === */}
        <div className="flex flex-col gap-24 md:gap-40">
          {divisionsData.length > 0 ? (
            divisionsData.map((dept, index) => (
              <div
                key={dept.id}
                id={`wrapper-${dept.id}`}
                className="flex flex-col md:flex-row gap-8 md:gap-10 border-t border-[#012e21]/10 pt-10 md:pt-0 md:border-none"
              >
                
                {/* --- KIRI: Sticky Title & Navigation --- */}
                <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                  <div 
                    className="md:sticky md:top-32 flex flex-col gap-4"
                    data-scroll
                    data-scroll-sticky
                    data-scroll-target={`#wrapper-${dept.id}`}
                  >
                    <span className="text-[#012e21]/40 font-mono text-sm font-bold uppercase tracking-widest">
                      0{index + 1} — Division
                    </span>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-[#012e21] uppercase leading-[0.9]">
                      {dept.division}
                    </h2>

                    <p className="text-sm md:text-base text-[#012e21]/70 leading-relaxed font-sans mt-2">
                      {dept.description}
                    </p>

                    {/* Tombol Panah (Hanya Tampil di Desktop & Jika Member > 2) (Sembunyikan untuk SPV) */}
                    {dept.id !== "spv" && dept.members.length > 2 && (
                      <div className="hidden md:flex items-center gap-2 mt-6">
                        <button
                          onClick={() => handleScroll(`scroll-${dept.id}`, "left")}
                          className="w-12 h-12 rounded-full border border-[#012e21]/20 flex items-center justify-center text-[#012e21] hover:bg-[#012e21] hover:text-[#fff0aa] transition-all duration-300"
                          aria-label="Previous members"
                        >
                          <FaArrowLeft size={14} />
                        </button>
                        <button
                          onClick={() => handleScroll(`scroll-${dept.id}`, "right")}
                          className="w-12 h-12 rounded-full border border-[#012e21]/20 flex items-center justify-center text-[#012e21] hover:bg-[#012e21] hover:text-[#fff0aa] transition-all duration-300"
                          aria-label="Next members"
                        >
                          <FaArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- KANAN: Scrollable Member Cards --- */}
                <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6">
                  {/* Container Horizontal Scroll */}
                  <div
                    id={`scroll-${dept.id}`}
                    className="flex gap-6 md:gap-8 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {dept.members.map((member, mIndex) => (
                      <div 
                        key={mIndex} 
                        className="snap-start flex-shrink-0 w-[280px] md:w-[320px] transition-transform duration-300 hover:-translate-y-2"
                      >
                        <MemberCard member={member} />
                      </div>
                    ))}
                  </div>

                  {/* Indikator Swipe untuk Mobile (Sembunyikan juga jika SPV) */}
                  {dept.id !== "spv" && dept.members.length > 1 && (
                    <div className="md:hidden flex justify-end items-center gap-2 mt-[-20px] opacity-40">
                        <span className="text-[10px] uppercase tracking-widest font-mono text-[#012e21]">Swipe</span>
                        <FaArrowRight size={10} className="text-[#012e21]" />
                    </div>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="py-32 text-center animate-pulse font-mono tracking-widest text-[#012e21]/80 uppercase">
              Fetching division structure from Supabase...
            </div>
          )}
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="mt-32 border-t border-[#012e21]/10 pt-10 text-center">
        <p className="text-[#012e21]/50 text-sm font-mono uppercase tracking-widest">
          SRE PENS • {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}