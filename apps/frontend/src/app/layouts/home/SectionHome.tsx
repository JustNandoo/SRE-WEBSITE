"use client";

import { useRef } from "react";
import Image from "next/image";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function SectionHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden bg-[#012e21] text-[#fff0aa]"
      data-scroll-section
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <div
          data-scroll
          data-scroll-speed="-0.5"
          className="relative w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/img/bg/bg1.jpg"
            alt="SRE Background"
            fill
            priority
            className="object-cover opacity-50 grayscale-20"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/40 to-transparent z-10" />
      </div>

      {/* ================= CONTENT ================= */}
      <div
        data-scroll
        data-scroll-speed="0.2"
        className="relative z-20 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-8 md:py-12"
      >
        {/* ---------- TOP HEADER ---------- */}
        <div className="flex justify-between items-start mt-20 md:mt-24 border-b border-[#fff0aa]/20 pb-6">
          <div className="hidden md:block text-xs uppercase tracking-[0.2em] font-medium opacity-70">
            Surabaya, Indonesia
          </div>

          <div className="text-right text-xs uppercase tracking-[0.2em] font-medium opacity-70 ml-auto">
            Est. 2024
          </div>
        </div>

        {/* ---------- MAIN TYPOGRAPHY ---------- */}
        <div className="flex flex-col justify-center w-full relative -mt-10 md:mt-0">
          {/* SOCIETY OF */}
          <div className="flex items-baseline gap-2 md:gap-4 overflow-hidden">
            <h1 className="text-[13vw] lg:text-[10vw] leading-[0.85] font-semibold uppercase tracking-tighter text-white">
              Society
            </h1>

            <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl opacity-80 -translate-y-2 md:-translate-y-4">
              of
            </span>
          </div>

          {/* RENEWABLE */}
          <div className="flex items-center overflow-hidden w-full">
            <h1 className="text-[13vw] lg:text-[10vw] leading-[0.85] font-bold uppercase tracking-tighter text-[#fff0aa]">
              Renewable
            </h1>
          </div>

          {/* ENERGY */}
          <div className="flex justify-end md:justify-start md:ml-[15vw] relative overflow-hidden">
            <h1 className="text-[13vw] lg:text-[10vw] leading-[0.85] font-bold uppercase tracking-tighter text-white relative pl-8 md:pl-16">
              {/* Quote Icon Container */}
              <div className="absolute -top-2 -left-2 md:-top-6 md:left-0.5 w-8 md:w-16">
                <Image
                  src="/img/icons/UnionPetik.png"
                  width={80}
                  height={80}
                  alt="quote"
                  className="object-contain"
                />
              </div>
              Energy
            </h1>
          </div>
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2">
          <div className="max-w-xs md:max-w-md text-sm leading-relaxed opacity-80">
            <p>
              Student Organization at{" "}
              <strong className="text-white">PENS Surabaya</strong>
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-50">
              Scroll
            </span>
            <div className="h-px w-12 bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}