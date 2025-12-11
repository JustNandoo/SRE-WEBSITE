"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

export interface ArticleCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  date?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  image,
  description,
  date = "2023-04-19",
}) => {
  
  return (
    <Link href={`/article/${id}`} className="block h-full w-full group cursor-pointer">
      <div className="relative h-[450px] w-full overflow-hidden rounded-4xl bg-[#012e21] border border-white/5 shadow-xl transition-all duration-500 hover:shadow-[#F2C601]/20">
        
        {/* --- 1. BACKGROUND IMAGE (Zoom & Grayscale Effect) --- */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0"
            priority
          />
        </div>

        {/* --- 2. GRADIENT OVERLAY --- */}
        {/* Gelap di bawah agar teks terbaca, transisi opacity saat hover */}
        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

        {/* --- 3. TOP CONTENT (Date Badge) --- */}
        <div className="absolute top-5 left-5 z-10">
           <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white group-hover:bg-[#F2C601] group-hover:text-[#012e21] group-hover:border-[#F2C601] transition-colors duration-300">
              <FaCalendarAlt className="text-xs" />
              <span className="text-xs font-bold font-mono uppercase tracking-widest">{date}</span>
           </div>
        </div>

        {/* --- 4. BOTTOM CONTENT (Info & Reveal) --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          
          {/* Label Kecil */}
          <span className="block text-[#F2C601] text-[10px] font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            Read Article
          </span>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.1] mb-3 group-hover:text-[#F2C601] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description (Slide Up Reveal) */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
             <div className="overflow-hidden">
                <p className="text-white/70 text-sm md:text-base font-serif leading-relaxed line-clamp-3 mb-6">
                   {description}
                </p>
                
                {/* Action Link */}
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group/btn">
                   Continue Reading 
                   <span className="bg-white/20 p-2 rounded-full group-hover/btn:bg-[#F2C601] group-hover/btn:text-[#012e21] transition-colors duration-300">
                      <FaArrowRight className="group-hover/btn:-rotate-45 transition-transform duration-300" />
                   </span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default ArticleCard;