"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  
  // Animasi untuk teks
  const revealAnim = {
    hidden: { y: "100%" },
    visible: (custom: number) => ({
      y: "0%",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: custom * 0.1,
      },
    }),
  };

  return (
    <section
      className="relative w-full min-h-screen bg-[#012e21] text-[#fff0aa] flex flex-col py-40 md:pt-48 md:pb-40 px-4 md:px-10 overflow-hidden"
      data-scroll-section
    >
      {/* --- BACKGROUND GRID (Agar tidak sepi) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10 flex justify-between px-4 md:px-10">
        <div className="w-[1px] h-full bg-[#fff0aa]"></div>
        <div className="w-[1px] h-full bg-[#fff0aa] hidden md:block"></div>
        <div className="w-[1px] h-full bg-[#fff0aa] hidden md:block"></div>
        <div className="w-[1px] h-full bg-[#fff0aa]"></div>
      </div>

      {/* --- IMPROVISASI ATAS: TECHNICAL HEADER --- */}
      {/* Memberi informasi tambahan untuk mengisi ruang kosong di atas */}
      <div className="w-full border-b border-[#fff0aa]/20 pb-6 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end z-10 relative">
        <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#fff0aa]/60 uppercase tracking-widest">Chapter ID</span>
            <span className="text-sm font-bold font-mono">ID-SBY-PENS-2020</span>
        </div>
        <div className="hidden md:block text-xs font-mono text-[#fff0aa]/60 uppercase tracking-widest max-w-xs text-right">
            Dedicated to advancing student involvement in renewable energy technologies.
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto z-10 relative flex-1 flex flex-col justify-center">
        
        {/* --- MASSIVE TITLE --- */}
        <div className="flex flex-col font-black tracking-tighter leading-[0.8] uppercase select-none">
          
          {/* Baris 1: ABOUT */}
          <div className="overflow-hidden relative">
            <motion.h1
              custom={0}
              variants={revealAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-scroll 
              data-scroll-speed="0.2"
              className="text-[18vw] md:text-[16vw] mb-3 text-transparent hover:text-[#fff0aa] transition-colors duration-700"
              style={{ WebkitTextStroke: "2px #fff0aa" }} // Outline tipis elegan
            >
              ABOUT
            </motion.h1>
          </div>

          {/* Baris 2: US + IMPROVISASI TENGAH (Badge) */}
          <div className="relative flex items-center justify-between mt-4 md:-mt-8">
            
            {/* Spinning Badge Decoration (CSS Only) */}
            <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.8, duration: 1 }}
               className="hidden md:flex relative items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#fff0aa]/30 ml-10"
            >
               <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#fff0aa] opacity-80">
                    <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text fontSize="11" letterSpacing="0.4">
                      <textPath href="#curve">
                        ESTABLISHED • 2020 • SURABAYA •  
                      </textPath>
                    </text>
                  </svg>
               </div>
               <div className="w-2 h-2 bg-[#fff0aa] rounded-full"></div>
            </motion.div>

            {/* Teks US */}
            <div className="overflow-hidden relative text-right flex-1">
                <motion.h1
                custom={1}
                variants={revealAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                data-scroll 
                data-scroll-speed="0.1"
                className="text-[18vw] md:text-[16vw] text-[#fff0aa]"
                >
                US.
                </motion.h1>
            </div>
          </div>
        </div>

        {/* --- IMPROVISASI BAWAH: INTRO BUFFER --- */}
        {/* Area ini memberi jarak aman sebelum masuk Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20 md:mt-32 pt-10 border-t border-[#fff0aa]/20">
            
            <div className="col-span-1 md:col-span-4 flex flex-col justify-between">
                <span className="block w-3 h-3 bg-[#fff0aa] rounded-full mb-4 animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#fff0aa]/60">
                   Scroll Down
                </span>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="col-span-1 md:col-span-8"
            >
                <p className="text-xl md:text-3xl leading-snug font-light text-[#fff0aa]">
                   <span className="font-bold">SRE PENS</span> is more than just a student chapter. We are a catalyst for change, bridging the gap between academic knowledge and real-world renewable energy application.
                </p>
            </motion.div>
        </div>

      </div>
    </section>
  );
}