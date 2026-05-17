"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleContent, Article } from "@/lib/articleData";
import { Poppins } from "next/font/google";
import { FaArrowRight, FaSearch } from "react-icons/fa";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// --- COMPONENT: DESKTOP ACCORDION ROW ---
const ArticleRow = ({ article, index }: { article: Article; index: number }) => {
  return (
    <Link
      href={`/article/${article.id}`}
      className="group relative block w-full border-t border-[#fff0aa]/20 transition-all duration-700 ease-[0.22,1,0.36,1]"
    >
      {/* 1. ROW HEADER (Always Visible) */}
      <div className="flex flex-col md:flex-row items-baseline justify-between py-8 px-4 md:px-0 group-hover:px-4 transition-all duration-500">
        
        {/* Left: Index & Category */}
        <div className="flex items-center gap-8 w-full md:w-1/4">
           <span className="font-mono text-xs text-[#fff0aa]/40">
              {String(index + 1).padStart(2, "0")}
           </span>
           <span className="font-mono text-xs text-[#fff0aa]/60 uppercase tracking-widest border border-[#fff0aa]/20 px-2 py-1 rounded-full">
              News
           </span>
        </div>

        {/* Center: Title */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
           <h3 className="text-3xl md:text-5xl font-light text-[#fff0aa] group-hover:text-[#F2C601] transition-colors duration-300">
              {article.title}
           </h3>
        </div>

        {/* Right: Date & Arrow */}
        <div className="w-full md:w-1/4 flex justify-between md:justify-end items-center gap-8 mt-4 md:mt-0">
           <span className="font-mono text-xs text-[#fff0aa]/40 uppercase">
              {article.date}
           </span>
           <div className="w-10 h-10 rounded-full border border-[#fff0aa]/20 flex items-center justify-center group-hover:bg-[#F2C601] group-hover:border-[#F2C601] transition-all duration-500">
              <FaArrowRight className="text-[#fff0aa] text-sm -rotate-45 group-hover:rotate-0 group-hover:text-[#012e21] transition-transform duration-500" />
           </div>
        </div>
      </div>

      {/* 2. REVEAL CONTENT (Hidden by default, expands on hover) */}
      {/* Height transition trick for accordion effect */}
      <div className="max-h-0 overflow-hidden group-hover:max-h-[500px] transition-all duration-700 ease-[0.22,1,0.36,1]">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 px-4">
            
            {/* Empty Space for Alignment */}
            <div className="hidden md:block md:col-span-3"></div>

            {/* Image Preview */}
            <div className="md:col-span-5 relative aspect-video w-full overflow-hidden rounded-lg">
               <Image
                  src={article.image || "/img/default.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
               />
            </div>

            {/* Description */}
            <div className="md:col-span-4 flex flex-col justify-between">
               <p className="text-[#fff0aa]/70 font-sans text-sm leading-relaxed max-w-sm">
                  {article.description}
               </p>
               <span className="inline-block mt-6 text-[#F2C601] text-xs font-bold uppercase tracking-widest underline underline-offset-4 decoration-[#F2C601]/30 hover:decoration-[#F2C601] transition-all">
                  Read Full Story
               </span>
            </div>

         </div>
      </div>
    </Link>
  );
};

// --- COMPONENT: MOBILE CARD (Simple Stack) ---
const MobileCard = ({ article, index }: { article: Article; index: number }) => (
   <Link href={`/article/${article.id}`} className="block mb-10 border-b border-[#fff0aa]/10 pb-10">
      <div className="flex items-center justify-between mb-4">
         <span className="font-mono text-xs text-[#fff0aa]/40">
            {String(index + 1).padStart(2, "0")} / {article.date}
         </span>
         <FaArrowRight className="-rotate-45 text-[#F2C601]" />
      </div>
      <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-lg bg-gray-800">
         <Image 
            src={article.image || "/img/default.jpg"} 
            alt={article.title} 
            fill 
            className="object-cover" 
         />
      </div>
      <h3 className="text-2xl font-medium text-[#fff0aa] mb-2">{article.title}</h3>
      <p className="text-sm text-[#fff0aa]/60 line-clamp-3">{article.description}</p>
   </Link>
);

// --- MAIN SECTION ---
export default function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articleContent);

  useEffect(() => {
    const results = articleContent.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm]);

  return (
    <section
      className={`relative min-h-screen bg-[#012e21] text-[#fff0aa] ${poppins.variable} pb-32`}
      data-scroll-section
    >
      {/* 1. HEADER (Sticky & Big) */}
      <div className="pt-32 pb-16 md:pb-24 px-4 md:px-10 container mx-auto">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
               <h1 className="text-[14vw] md:text-[8rem] font-light leading-[0.85] tracking-tighter">
                  SRE <span className="font-serif italic text-[#F2C601]">Journal</span>
               </h1>
            </div>
            
            <div className="w-full md:w-auto flex flex-col items-end gap-4">
               <p className="text-right text-[#fff0aa]/50 font-mono text-xs uppercase max-w-[200px] hidden md:block">
                  A collection of thoughts, research, and updates from our team.
               </p>
               
               {/* Minimal Search Input */}
               <div className="relative w-full md:w-[300px] group">
                  <input 
                     type="text" 
                     placeholder="Search..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-transparent border-b border-[#fff0aa]/30 py-2 pl-0 pr-8 text-[#fff0aa] placeholder-[#fff0aa]/30 focus:outline-none focus:border-[#F2C601] transition-colors font-mono text-sm"
                  />
                  <FaSearch className="absolute right-0 top-1/2 -translate-y-1/2 text-[#fff0aa]/30 text-xs" />
               </div>
            </div>
         </div>
      </div>

      {/* 2. ARTICLE LIST (The Core Experience) */}
      <div className="container mx-auto px-4 md:px-10">
         
         {/* HEADERS (Desktop) */}
         <div className="hidden md:flex justify-between pb-4 px-4 text-[#fff0aa]/30 font-mono text-[10px] uppercase tracking-widest">
            <span className="w-1/4">Index / Category</span>
            <span className="w-1/2">Article Title</span>
            <span className="w-1/4 text-right">Published / Action</span>
         </div>

         {/* LIST CONTAINER */}
         <div className="flex flex-col">
            {filteredArticles.length > 0 ? (
               <>
                  {/* Desktop View */}
                  <div className="hidden md:block">
                     {filteredArticles.map((article, index) => (
                        <ArticleRow key={article.id} article={article} index={index} />
                     ))}
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden">
                     {filteredArticles.map((article, index) => (
                        <MobileCard key={article.id} article={article} index={index} />
                     ))}
                  </div>
               </>
            ) : (
               <div className="py-32 border-t border-[#fff0aa]/20 text-center">
                  <span className="font-mono text-[#fff0aa]/40">No entries found.</span>
               </div>
            )}
            
            {/* Closing Line */}
            <div className="w-full h-px bg-[#fff0aa]/20" />
         </div>

      </div>

      {/* 3. FOOTER MARQUEE (Awwwards Touch) */}
      <div className="mt-32 overflow-hidden py-4 border-y border-[#fff0aa]/10 bg-[#012e21]">
         <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[...Array(6)].map((_, i) => (
               <span key={i} className="text-[#fff0aa]/10 text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8">
                  Renewable Energy Society
               </span>
            ))}
         </div>
      </div>

      {/* Tailwind Animation Config (Pastikan ini ada di tailwind.config.ts atau style global) */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}