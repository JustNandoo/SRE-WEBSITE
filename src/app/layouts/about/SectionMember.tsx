"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram, FaPlus } from "react-icons/fa";

// --- 1. IMPORT DATA DARI LIB ---
// Pastikan path ini sesuai dengan lokasi file staffData.ts kamu
import { staffData, Member } from "@/lib/staffData"; 

// --- 2. COMPONENT KARTU MEMBER (INTERAKTIF) ---
const MemberCard = ({ member }: { member: Member }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#012e21]"
    >
      {/* BACKGROUND IMAGE */}
      {/* Logic: Foto berwarna jika tombol diklik (isOpen) ATAU di-hover */}
      <Image
        src={member.img}
        alt={member.name}
        fill
        className={`object-cover transition-all duration-700 ease-in-out 
          ${isOpen ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}
        `}
      />
      
      {/* GRADIENT OVERLAY (Agar teks terbaca) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#012e21] via-transparent to-transparent opacity-90" />
      
      {/* --- TOMBOL TOGGLE SOCIAL MEDIA (POJOK KANAN ATAS) --- */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
         
         {/* Main Toggle Button */}
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-30 
              ${isOpen 
                ? 'bg-[#fff0aa] text-[#012e21]' 
                : 'bg-[#fff0aa]/20 text-[#fff0aa] backdrop-blur-md hover:bg-[#fff0aa] hover:text-[#012e21]'
              }
            `}
         >
            <motion.div 
              animate={{ rotate: isOpen ? 135 : 0 }} // Putar 135 derajat jadi "X"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               <FaPlus />
            </motion.div>
         </button>

         {/* Dropdown Icons (Muncul saat isOpen = true) */}
         <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 mt-2"
              >
                  {/* LinkedIn Button */}
                  {member.socials.linkedin !== "#" && (
                    <Link 
                      href={member.socials.linkedin} 
                      target="_blank" 
                      className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                        <FaLinkedin size={18} />
                    </Link>
                  )}

                  {/* Instagram Button */}
                  {member.socials.instagram !== "#" && (
                    <Link 
                      href={member.socials.instagram} 
                      target="_blank" 
                      className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                        <FaInstagram size={18} />
                    </Link>
                  )}
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* --- INFO TEXT (BOTTOM) --- */}
      <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[#fff0aa] text-lg md:text-xl font-bold leading-tight font-akira tracking-wide">
            {member.name}
        </p>
        <div className="flex items-center gap-2 mt-2">
            <span className="w-8 h-[1px] bg-[#fff0aa]/50"></span>
            <p className="text-white/70 text-xs uppercase tracking-widest font-mono">
                {member.role}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. COMPONENT UTAMA ---
export default function SectionMember() {
  return (
    <section 
      className="relative min-h-screen bg-[#fff0aa] py-24 md:py-32" 
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-20 md:mb-32 text-center md:text-left border-b border-[#012e21]/10 pb-10">
          <motion.h1 
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-[12vw] md:text-[8rem] font-black text-[#012e21] leading-[0.85] tracking-tighter uppercase overflow-hidden"
          >
            {/* Parallax Effect pada Teks Header */}
            <span className="block" data-scroll data-scroll-speed="0.2">MEET THE</span>
            <span 
              className="block text-transparent stroke-text" 
              data-scroll 
              data-scroll-speed="0.1" 
              style={{ WebkitTextStroke: "1px #012e21" }}
            >
               TEAM
            </span>
          </motion.h1>
        </div>

        {/* --- LOOPING DATA STAFF (STICKY LAYOUT) --- */}
        <div className="flex flex-col gap-20 md:gap-32">
          {staffData.map((dept, index) => (
            <div key={dept.id} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
              
              {/* KOLOM KIRI: STICKY TITLE (Nama Divisi) */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="sticky top-10 flex flex-col gap-4">
                  <span className="text-[#012e21]/40 font-mono text-sm">
                    0{index + 1}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#012e21] uppercase leading-none">
                    {dept.division}
                  </h2>
                  <p className="text-[#012e21]/70 text-sm font-medium leading-relaxed max-w-[200px]">
                    {dept.description}
                  </p>
                </div>
              </div>

              {/* KOLOM KANAN: GRID FOTO MEMBER */}
              <div className="md:col-span-8 lg:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                  {dept.members.map((member, idx) => (
                    <MemberCard key={`${dept.id}-${idx}`} member={member} />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* --- FOOTER DECORATION --- */}
      <div className="mt-32 border-t border-[#012e21]/10 pt-10 text-center">
        <p className="text-[#012e21]/50 text-sm font-mono uppercase tracking-widest">
            SRE PENS • {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}