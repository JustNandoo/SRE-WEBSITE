"use client";

import React from "react";

interface MerchFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const MerchFilter: React.FC<MerchFilterProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div
      className="lg:sticky lg:top-32 flex flex-col gap-6"
      data-scroll
      data-scroll-sticky
      data-scroll-target="#catalog-wrapper"
    >
      <h3 className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2 hidden lg:block">
        Collections
      </h3>

      {/* LAYOUT PERUBAHAN:
         - Mobile: 'flex-wrap' agar tombol turun ke bawah (tidak perlu scroll).
         - Desktop: 'lg:flex-col' untuk list vertikal.
      */}
      <div className="flex flex-wrap lg:flex-col gap-3 lg:gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
               text-left text-sm md:text-lg lg:text-2xl font-bold uppercase tracking-tight transition-all duration-300 hover:text-[#F2C601] whitespace-nowrap
               
               /* Mobile Style (Pill / Tag) */
               px-4 py-2 rounded-full border lg:border-none lg:px-0 lg:py-0
               
               ${
                 activeCategory === cat
                   ? "bg-[#F2C601] text-[#012e21] border-[#F2C601] lg:bg-transparent lg:text-[#F2C601] lg:translate-x-2"
                   : "bg-transparent text-[#fff0aa]/60 border-[#fff0aa]/20 lg:text-[#fff0aa]/40"
               }
            `}
          >
            {/* Dot Indicator (Desktop Only) */}
            {activeCategory === cat && (
              <span className="hidden lg:inline-block mr-2 text-sm align-middle text-[#F2C601]">
                ●
              </span>
            )}
            {cat}
          </button>
        ))}
      </div>

      <div className="hidden lg:block mt-12 pt-12 border-t border-[#fff0aa]/20">
        <p className="text-xs opacity-50 font-mono leading-relaxed">
          Free shipping for SRE members within campus area.
        </p>
      </div>
    </div>
  );
};

export default MerchFilter;