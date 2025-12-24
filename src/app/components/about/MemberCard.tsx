"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaPlus } from "react-icons/fa";
import MotionSwitch from "@/app/components/MotionSwitch";
import { Member } from "@/lib/staffData";

export const MemberCard = ({ member }: { member: Member }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionSwitch
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="group relative w-full aspect-3/4 overflow-hidden rounded-2xl bg-[#012e21]"
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

      {/* TOGGLE */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
            ${
              isOpen
                ? "bg-[#fff0aa] text-[#012e21]"
                : "bg-[#fff0aa]/20 text-[#fff0aa] backdrop-blur-md hover:bg-[#fff0aa] hover:text-[#012e21]"
            }
          `}
        >
          <MotionSwitch
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FaPlus />
          </MotionSwitch>
        </button>

        {/* SOCIAL */}
        <MotionSwitch
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2 mt-2"
        >
          {isOpen && (
            <>
              {member.socials.linkedin !== "#" && (
                <Link
                  href={member.socials.linkedin}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                  <FaLinkedin size={18} />
                </Link>
              )}

              {member.socials.instagram !== "#" && (
                <Link
                  href={member.socials.instagram}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                  <FaInstagram size={18} />
                </Link>
              )}
            </>
          )}
        </MotionSwitch>
      </div>

      {/* INFO */}
      <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[#fff0aa] text-lg md:text-xl font-bold font-akira tracking-wide">
          {member.name}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-8 h-px bg-[#fff0aa]/50" />
          <p className="text-white/70 text-xs uppercase tracking-widest font-mono">
            {member.role}
          </p>
        </div>
      </div>
    </MotionSwitch>
  );
};
