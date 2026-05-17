"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaUser, FaCalendarAlt, FaTag } from "react-icons/fa";
import type { ArticleContent } from "@/lib/articleData";

export default function ArticleDetailContent({
  article,
}: {
  article: ArticleContent;
}) {
  // Fallback data jika properti tidak ada di tipe ArticleContent
  const category = (article as any).category || "Article";
  const date = (article as any).date || "Recent Post";

  return (
    <div
      className="relative min-h-screen bg-[#f4f4f4]"
      data-scroll-section
      // --- BACKGROUND GRID PATTERN ---
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* =========================================================
          1. HERO IMAGE (PARALLAX)
      ========================================================= */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden border-b border-black/5">
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          data-scroll
          data-scroll-speed="-0.5" // Efek Parallax: Gambar bergerak lambat
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          {/* Overlay agar teks badge terbaca */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-90" />
        </div>

        {/* Floating Category Badge */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span
            data-scroll
            data-scroll-speed="0.2"
            className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-mono text-sm uppercase tracking-[0.2em]"
          >
            {category}
          </span>
        </div>
      </div>

      {/* =========================================================
          2. CONTENT CARD (CLEAN WHITE)
      ========================================================= */}
      <div className="relative z-20 px-4 sm:px-6 md:px-10 -mt-20 md:-mt-32 pb-20">
        <div className="bg-white rounded-4xl md:rounded-[3.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
          {/* HEADER AREA */}
          <div className="px-6 py-10 md:px-16 md:py-16 text-center border-b border-gray-100/50 relative z-10">
            <div className="flex justify-start mb-12">
              <Link
                href="/article"
                className="group inline-flex items-center gap-2 text-[#012e21]/50 hover:text-[#012e21] transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-[#012e21]/10 flex items-center justify-center group-hover:bg-[#012e21] group-hover:text-white transition-all duration-300 bg-gray-50">
                  <FaArrowLeft className="text-xs" />
                </div>
                <span className="text-xs font-bold font-mono uppercase tracking-widest">
                  Back to Articles
                </span>
              </Link>
            </div>

            {/* Title & Meta (Center) */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#012e21] leading-[1.1] mb-8 tracking-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {/* Author */}
                <div className="flex items-center gap-2 text-[#012e21]/70 bg-gray-50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
                  <FaUser className="text-[#F2C601] text-xs" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wide">
                    {article.created_by}
                  </span>
                </div>

                {/* Date (Mockup/Real if exists) */}
                <div className="flex items-center gap-2 text-[#012e21]/70 bg-gray-50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
                  <FaCalendarAlt className="text-[#F2C601] text-xs" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wide">
                    {date}
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 text-[#012e21]/70 bg-gray-50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
                  <FaTag className="text-[#F2C601] text-xs" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wide">
                    {category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT BODY */}
          <div className="px-6 py-10 md:px-16 md:py-20 relative z-10">
            <div className="max-w-3xl mx-auto">
              <article className="text-lg md:text-xl text-[#012e21]/80 font-serif leading-relaxed whitespace-pre-line text-justify">
                {/* First Letter Drop Cap */}
                <span className="float-left text-5xl md:text-6xl font-black text-[#012e21] mr-3 -mt-1.5 leading-none">
                  {article.content.charAt(0)}
                </span>
                {article.content.slice(1)}
              </article>

              {/* Decorative End Mark */}
              <div className="flex justify-center mt-16 opacity-30 gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#012e21]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#012e21]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#012e21]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
