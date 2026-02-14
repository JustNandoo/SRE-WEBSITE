"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaPlus } from "react-icons/fa";
import { Member } from "@/lib/staffData";

export const MemberCard = ({ member }: { member: Member }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      // Layout & Hover Effects
      className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#012e21]"
    >
      {/* IMAGE */}
      <Image
        src={member.img}
        alt={member.name}
        fill
        className={`object-cover transition-all duration-700 ease-in-out 
          ${
            isOpen
              ? "grayscale-0 scale-105"
              : "grayscale group-hover:grayscale-0 group-hover:scale-105"
          }
        `}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#012e21] via-transparent to-transparent opacity-90" />

      {/* TOGGLE & SOCIALS CONTAINER */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
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
        >
          {/* Plus Icon with Rotation */}
          <div
            className={`transition-transform duration-300 ease-out ${
              isOpen ? "rotate-[135deg]" : "rotate-0"
            }`}
          >
            <FaPlus />
          </div>
        </button>

        {/* SOCIAL ICONS (Animated Reveal) */}
        <div
          className={`flex flex-col gap-2 mt-2 transition-all duration-300 ease-out origin-top
            ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100 visible"
                : "opacity-0 -translate-y-4 scale-75 invisible"
            }
          `}
        >
          {member.socials.linkedin !== "#" && (
            <Link
              href={member.socials.linkedin}
              target="_blank"
              className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
            >
              <FaLinkedin size={18} />
            </Link>
          )}

          {member.socials.instagram !== "#" && (
            <Link
              href={member.socials.instagram}
              target="_blank"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
            >
              <FaInstagram size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* INFO BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-[#fff0aa] text-lg md:text-xl font-bold font-akira tracking-wide leading-tight">
          {member.name}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-8 h-px bg-[#fff0aa]/50" />
          <p className="text-white/70 text-xs uppercase tracking-widest font-mono truncate">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
};