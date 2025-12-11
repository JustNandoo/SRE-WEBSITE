// components/AcademicCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // Pastikan install react-icons
import { AcademicCardProps } from "@/lib/academicData";

const AcademicCard: React.FC<AcademicCardProps> = ({
  id,
  title,
  image,
  description,
  category,
}) => {
  return (
    <Link href={`/academic/${id}`} className="block h-full">
      <div className="group relative h-full w-full overflow-hidden rounded-4xl bg-[#012e21]">
        
        {/* --- 1. BACKGROUND IMAGE (Zoom Effect) --- */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={image || "/img/default.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        </div>

        {/* --- 2. GRADIENT OVERLAY --- */}
        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* --- 3. TOP CONTENT (Category Tag) --- */}
        <div className="absolute top-5 left-5 z-20 flex justify-between items-start w-[calc(100%-2.5rem)]">
          {category && (
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#fff0aa] uppercase">
              {category}
            </span>
          )}
          
          {/* Arrow Icon (Muncul saat hover) */}
          <div className="w-10 h-10 rounded-full bg-[#F2C601] flex items-center justify-center text-[#012e21] opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
             <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        {/* --- 4. BOTTOM CONTENT (Info & Reveal) --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          
          {/* SRE Badge Kecil */}
          <div className="flex items-center gap-2 mb-3 opacity-70">
             <div className="w-2 h-2 bg-[#F2C601] rounded-full"></div>
             <span className="text-xs font-bold text-white tracking-widest">SRE PENS</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#F2C601] transition-colors duration-300">
            {title}
          </h3>

          {/* Description (Reveal on Hover) */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
             <div className="overflow-hidden">
                <p className="text-white/70 text-sm font-light leading-relaxed pt-2 line-clamp-3">
                   {description}
                </p>
                <div className="mt-4 text-[#F2C601] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                   Read Article <span className="text-lg">→</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default AcademicCard;