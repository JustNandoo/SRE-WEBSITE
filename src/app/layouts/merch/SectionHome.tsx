"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { FaAsterisk } from "react-icons/fa";
import { merchItems } from "@/lib/merchData"; // Import Data
import MerchCard from "@/app/components/merch/MerchCard"; // Import Card
import MerchFilter from "@/app/components/merch/MerchFilter"; // Import Filter

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

export default function SectionMerch() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = merchItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const categories = ["All", "Apparel", "Accessories", "Essentials"];

  return (
    <section
      className={`relative min-h-screen bg-[#012e21] text-[#fff0aa] ${poppins.variable}`}
      data-scroll-section
    >
      <NoiseOverlay />

      {/* ================= HERO SECTION ================= */}
      <div className="relative pt-32 pb-12 lg:pb-20 px-6 md:px-10 container mx-auto mb-12 lg:mb-20">
        <div className="flex flex-col border-b border-[#fff0aa]/20 pb-16">
          {/* Top Meta */}
          <div className="flex justify-between items-center mb-8 font-mono text-xs uppercase tracking-widest opacity-60">
            <span>SRE Supply Co.</span>
            <span>Est. 2024</span>
          </div>

          {/* Massive Title */}
          <div className="relative">
            <h1 className="text-[13vw] leading-[0.8] font-black tracking-tighter text-[#fff0aa] mix-blend-difference z-10 relative">
              OFFICIAL <br />
              <span className="text-[#F2C601]">MERCH</span>
            </h1>

            {/* Floating Hero Image (Parallax) */}
            <div
              className="hidden md:block absolute top-[10%] right-[10%] w-[30vw] aspect-[3/4] z-0 overflow-hidden"
              data-scroll
              data-scroll-speed="-1.5"
            >
              <Image
                src="https://lh3.googleusercontent.com/d/1rlUorrB0xj0RfooVcf6g5ENf4_9cjGdm=w1000"
                alt="Hero Merch"
                fill
                sizes="33vw"
                className="object-cover grayscale opacity-60"
              />
            </div>
          </div>

          {/* Subtitle / Description */}
          <div className="mt-12 md:w-1/3 ml-auto z-10 relative">
            <p className="text-sm md:text-base leading-relaxed opacity-80">
              Engineered for the renewable generation. High-quality apparel and
              accessories that embody the spirit of sustainability and
              innovation.
            </p>
            <div className="mt-8 flex items-center gap-2 text-[#F2C601] text-xs font-bold uppercase tracking-widest">
              <FaAsterisk className="animate-spin-slow" />
              <span>Limited Drops Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CATALOG SECTION ================= */}
      <div className="container mx-auto px-4 md:px-10 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* --- SIDEBAR (Filter Component) --- */}
          <div className="lg:w-1/4 z-20">
             <MerchFilter 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
             />
          </div>

          {/* --- PRODUCT GRID --- */}
          <div id="catalog-wrapper" className="lg:w-3/4">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-32">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    // Logic Parallax: Kolom ganjil (index 1, 3, 5...) bergerak beda speed
                    data-scroll
                    data-scroll-speed={index % 2 !== 0 ? "1" : "0"}
                    className={`${index % 2 !== 0 ? "md:mt-24" : ""}`}
                  >
                    <MerchCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 border-t border-[#fff0aa]/20 text-center">
                <p className="font-mono text-[#fff0aa]/40">
                  No items available in this collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= FOOTER MARQUEE ================= */}
      <div className="py-6 bg-[#F2C601] border-y border-[#fff0aa]/10 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-[#012e21] text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Shop The Future
              </span>
              <div className="w-4 h-4 bg-[#012e21] rounded-full mx-8" />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
}