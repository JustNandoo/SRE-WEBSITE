"use client";

import React from "react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Variants } from "framer-motion";
import MotionSwitch from "@/app/components/MotionSwitch";

// ================= FONTS =================
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

// ================= VARIANTS =================
const revealAnim: Variants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
};

export default function Hero() {
  return (
    <section
      className={`relative w-full min-h-screen bg-[#012e21] text-[#fff0aa] flex flex-col py-40 md:pt-48 md:pb-40 px-4 md:px-10 overflow-hidden ${poppins.variable} ${akira.variable}`}
      data-scroll-section
    >
      {/* ================= GRID BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 flex justify-between px-4 md:px-10">
        <div className="w-px h-full bg-[#fff0aa]" />
        <div className="w-px h-full bg-[#fff0aa] hidden md:block" />
        <div className="w-px h-full bg-[#fff0aa] hidden md:block" />
        <div className="w-px h-full bg-[#fff0aa]" />
      </div>

      {/* ================= TECH HEADER ================= */}
      <div className="w-full border-b border-[#fff0aa]/20 pb-6 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end z-10 relative">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#fff0aa]/60 uppercase tracking-widest">
            Chapter ID
          </span>
          <span className="text-sm font-bold font-mono">ID-SBY-PENS-2024</span>
        </div>

        <div className="hidden md:block text-xs font-mono text-[#fff0aa]/60 uppercase tracking-widest max-w-xs text-right">
          Dedicated to advancing student involvement in renewable energy
          technologies.
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container mx-auto z-10 relative flex-1 flex flex-col justify-center">
        {/* ---------- TITLE ---------- */}
        <div className="flex flex-col font-black tracking-tighter leading-[0.8] uppercase select-none">
          {/* ABOUT */}
          <div className="overflow-hidden">
            <MotionSwitch
              as="h1"
              custom={0}
              variants={revealAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-scroll
              data-scroll-speed="0.2"
              className="font-akira text-[18vw] md:text-[16vw] mb-3 text-stroke text-[#fff0aa] hover:text-[#fff0aa] transition-colors duration-700"
            >
              ABOUT
            </MotionSwitch>
          </div>

          {/* US + BADGE */}
          <div className="relative flex items-center justify-between mt-4 md:-mt-8">
            {/* Spinning Badge (Desktop only) */}
            <MotionSwitch
              className="hidden md:flex relative items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#fff0aa]/30 ml-10"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 0.8, duration: 1 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full fill-[#fff0aa] opacity-80"
                >
                  <path
                    id="curve"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text fontSize="11" letterSpacing="0.4">
                    <textPath href="#curve">
                      ESTABLISHED • 2024 • SURABAYA •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="w-2 h-2 bg-[#fff0aa] rounded-full" />
            </MotionSwitch>

            {/* US */}
            <div className="overflow-hidden text-right flex-1">
              <MotionSwitch
                as="h1"
                custom={1}
                variants={revealAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                data-scroll
                data-scroll-speed="0.1"
                className="font-akira text-[18vw] md:text-[16vw] text-[#fff0aa]"
              >
                US.
              </MotionSwitch>
            </div>
          </div>
        </div>

        {/* ---------- BOTTOM INTRO ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20 md:mt-32 pt-10 border-t border-[#fff0aa]/20">
          <div className="md:col-span-4 flex flex-col justify-between">
            <span className="block w-3 h-3 bg-[#fff0aa] rounded-full mb-4 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#fff0aa]/60">
              Scroll Down
            </span>
          </div>

          <MotionSwitch
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.5, duration: 0.8 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-8"
          >
            <p className="font-poppins text-xl md:text-3xl leading-snug font-light text-[#fff0aa]">
              <span className="font-bold">SRE PENS</span> is more than just a
              student chapter. We are a catalyst for change, bridging the gap
              between academic knowledge and real-world renewable energy
              application.
            </p>
          </MotionSwitch>
        </div>
      </div>
    </section>
  );
}
