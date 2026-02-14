"use client";

import React from "react";
import Image from "next/image";

interface MissionProps {
  imgPath: string;
  heading: string;
  text: string;
}

interface MissionWrapperProps {
  children: React.ReactNode;
}

export const MissionCard: React.FC<MissionProps> = ({ imgPath, heading, text }) => {
  return (
    <div
      // Layout & Style Modern
      // Tambahan class untuk animasi hover:
      // transition-all duration-300 ease-out -> Membuat animasi halus
      // hover:-translate-y-2 -> Efek angkat ke atas (y: -10)
      // hover:scale-[1.02] -> Efek membesar sedikit
      // hover:shadow-[...] -> Efek bayangan saat hover
      className="relative w-full bg-white p-8 mb-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center gap-6 break-inside-avoid-column cursor-pointer border border-transparent hover:border-[#134576]/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0px_20px_40px_-10px_rgba(19,69,118,0.15)]"
    >
      {/* Icon Container - Bersih & Minimalis */}
      <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-[#F2C601]/20 rounded-2xl">
        <Image
          src={`/img/icons/about/${imgPath}`}
          alt={imgPath}
          height={100}
          width={100}
          className="w-12 h-12 object-contain"
          unoptimized
        />
      </div>

      {/* Typography Hierarchy */}
      <div className="flex-1">
        <h3 className="text-[#134576] text-2xl font-bold mb-2 tracking-tight">
          {heading}
        </h3>
        <p className="text-[#134576]/70 font-medium text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export const MissionCardWrapper: React.FC<MissionWrapperProps> = ({ children }) => {
  return (
    // CSS Columns untuk layout Masonry (bata)
    <section className="columns-1 md:columns-2 gap-6 w-full">
      {children}
    </section>
  );
};