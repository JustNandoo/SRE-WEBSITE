"use client";

import React from "react";
import { staffData } from "@/lib/staffData";
import { MemberCard } from "@/app/components/about/MemberCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function SectionMember() {

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
          {staffData.map((dept, index) => (
            <div
              key={dept.id}
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
                  
                  <p className="text-[#012e21]/70 text-sm leading-relaxed max-w-[250px] mb-4">
                    {dept.description}
                  </p>

                  {/* LOGIC: HANYA TAMPILKAN NAVIGASI JIKA BUKAN SPV DAN MEMBER LEBIH DARI 1 */}
                  {dept.id !== "spv" && dept.members.length > 1 && (
                    <div className="hidden md:flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => handleScroll(`scroll-container-${dept.id}`, "left")}
                        className="w-24 h-12 rounded-full border-2 border-[#012e21] text-[#012e21] flex items-center justify-center hover:bg-[#012e21] hover:text-[#fff0aa] transition-colors duration-300"
                        aria-label="Scroll Left"
                      >
                        <FaArrowLeft />
                      </button>
                      <button 
                        onClick={() => handleScroll(`scroll-container-${dept.id}`, "right")}
                        className="w-24 h-12 rounded-full border-2 border-[#012e21] text-[#012e21] flex items-center justify-center hover:bg-[#012e21] hover:text-[#fff0aa] transition-colors duration-300"
                        aria-label="Scroll Right"
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* --- KANAN: Horizontal Scroll List --- */}
              <div 
                id={`wrapper-${dept.id}`} 
                className="w-full md:w-2/3 lg:w-3/4 overflow-hidden relative"
              >
                <div 
                  id={`scroll-container-${dept.id}`}
                  className="
                    flex gap-5 md:gap-6 overflow-x-auto pb-12 pt-2
                    snap-x snap-mandatory 
                    scrollbar-hide 
                  "
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {/* Mapping Members */}
                  {dept.members.map((member, idx) => (
                    <div 
                      key={`${dept.id}-${idx}`} 
                      className="
                        flex-shrink-0 
                        snap-start 
                        w-[280px] md:w-[320px] lg:w-[350px]
                      "
                    >
                      <MemberCard member={member} />
                    </div>
                  ))}

                  {/* Spacer (Hanya jika bukan SPV agar layout rapi) */}
                  {dept.id !== "spv" && (
                     <div className="w-4 md:w-10 flex-shrink-0" />
                  )}
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
          ))}
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