"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaPlus } from "react-icons/fa";
import { Member } from "@/lib/staffData";

// --- 1. DEFINISIKAN DEFAULT IMAGE DISINI ---
const DEFAULT_IMAGE = "https://i.pinimg.com/736x/28/06/e3/2806e3dc1bc4025ab3a280127fd4d65b.jpg";

export const MemberCard = ({ member }: { member: Member }) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- HELPER FUNCTIONS ---
  const getInstagramUrl = (username: string) =>
    username ? `https://www.instagram.com/${username}/` : null;

  const getLinkedinUrl = (username: string) =>
    username ? `https://www.linkedin.com/in/${username}/` : null;

  const linkedInUrl = getLinkedinUrl(member.socials.linkedin);
  const instagramUrl = getInstagramUrl(member.socials.instagram);

  // --- LOGIKA GENERATE LINK GAMBAR ---
  const constructImageUrl = (source: string) => {
    // A. Jika kosong, pakai default
    if (!source) return DEFAULT_IMAGE;

    // B. Jika sudah berupa link lengkap (https://...), kembalikan aslinya
    if (source.startsWith("http")) return source;

    // C. Jika bukan link (berarti ID Google Drive), format ke URL thumbnail
    return `https://drive.google.com/thumbnail?id=${source}&sz=w1000`;
  };

  const finalImageUrl = constructImageUrl(member.img);

  return (
    <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#012e21]">
      
      {/* IMAGE */}
      <div className="relative w-full h-full">
        <Image
          src={finalImageUrl}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-all duration-700 ease-in-out 
               ${
                 isOpen
                   ? "scale-105"
                   : "group-hover:scale-105"
               }
            `}
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#012e21] via-transparent to-transparent opacity-90" />

      {/* TOGGLE & SOCIALS CONTAINER */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
        {(linkedInUrl || instagramUrl) && (
          <>
            {/* TOGGLE BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-30
                 ${
                   isOpen
                     ? "bg-[#fff0aa] text-[#012e21]"
                     : "bg-[#fff0aa]/20 text-[#fff0aa] backdrop-blur-md hover:bg-[#fff0aa] hover:text-[#012e21]"
                 }
                 `}
              aria-label="Toggle Social Media"
            >
              <div
                className={`transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-[135deg]" : "rotate-0"
                }`}
              >
                <FaPlus />
              </div>
            </button>

            {/* SOCIAL ICONS */}
            <div
              className={`flex flex-col gap-2 mt-2 transition-all duration-300 ease-out origin-top
                 ${
                   isOpen
                     ? "opacity-100 translate-y-0 scale-100 visible"
                     : "opacity-0 -translate-y-4 scale-75 invisible"
                 }
                 `}
            >
              {linkedInUrl && (
                <Link
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <FaLinkedin size={18} />
                </Link>
              )}

              {instagramUrl && (
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <FaInstagram size={18} />
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* INFO BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full px-5 py-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        
        {/* Role dengan garis dekorasi */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-px bg-[#fff0aa]/50" />
          <p className="text-[#fff0aa]/80 font-bold text-xs md:text-sm uppercase tracking-widest font-mono truncate">
            {member.role}
          </p>
        </div>

        {/* Nama */}
        <h3 className="text-[#fff0aa] text-lg md:text-2xl font-bold font-sans tracking-wide leading-tight uppercase line-clamp-2">
          {member.name}
        </h3>

        {/* Major / Jurusan (Pastikan properti ini ada di staffData.ts) */}
        {member.major && (
          <div className="flex items-center gap-2 mt-2">
            <p className="text-white/75 text-xs uppercase font-semibold tracking-wider font-mono truncate">
              {member.major}
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
};