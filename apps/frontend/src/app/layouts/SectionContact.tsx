"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaYoutube, FaTiktok, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import MotionSwitch from "@/app/components/MotionSwitch";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

// ================= FONTS =================
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const akira = localFont({
  src: "../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

// ================= DATA =================
const socialLinks = [
  {
    id: "instagram",
    name: "INSTAGRAM",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/sre_pens",
    handle: "@sre_pens",
  },
  {
    id: "linkedin",
    name: "LINKEDIN",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/society-of-renewable-energy-politeknik-elektronika-negeri-surabaya",
    handle: "SRE PENS",
  },
  {
    id: "youtube",
    name: "YOUTUBE",
    icon: <FaYoutube />,
    url: "https://youtube.com/@srepoliteknikelektronikanegeri",
    handle: "SRE Official",
  },
  {
    id: "tiktok",
    name: "TIKTOK",
    icon: <FaTiktok />,
    url: "https://vm.tiktok.com/ZSkoG8mrL/",
    handle: "@sre.pens",
  },
];

// ================= MOTION (DESKTOP ONLY) =================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ================= SINGLE ITEM COMPONENT =================
function SocialItem({ social, index }: { social: (typeof socialLinks)[number]; index: number }) {
  return (
    <Link
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between py-6 sm:py-8 md:py-10 border-b border-[#fff0aa]/15 hover:bg-[#fff0aa] transition-all duration-500 px-3 sm:px-4 md:px-6"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
        <span className="font-poppins text-[10px] sm:text-xs tabular-nums opacity-40 group-hover:text-[#012e21] transition-colors duration-500">
          0{index + 1}
        </span>
        <span className="font-akira text-xl sm:text-2xl md:text-4xl lg:text-5xl group-hover:text-[#012e21] group-hover:translate-x-2 md:group-hover:translate-x-4 transition-all duration-500 ease-out">
          {social.name}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
        <span className="hidden sm:block font-poppins text-xs sm:text-sm tracking-widest uppercase opacity-60 group-hover:text-[#012e21] group-hover:opacity-100 transition-all duration-500">
          {social.handle}
        </span>

        {/* Circle Button */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-[#fff0aa]/25 flex items-center justify-center overflow-hidden group-hover:bg-[#012e21] group-hover:border-[#012e21] transition-all duration-500 flex-shrink-0">
          {/* Default Icon (Slide Up) */}
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:-translate-y-full">
            <span className="text-sm sm:text-base">{social.icon}</span>
          </div>

          {/* Hover Arrow (Slide In) */}
          <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 text-[#fff0aa]">
            <FaArrowRight className="-rotate-45 text-sm sm:text-base" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// The static and motion components have been combined using MotionSwitch below

// ================= MAIN =================
export default function SectionContact() {
  const handleBackToTop = () => {
    // Try Locomotive Scroll first (desktop), fall back to native scroll
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer && (scrollContainer as any).__locomotiveScroll) {
      (scrollContainer as any).__locomotiveScroll.scrollTo(0, { duration: 1200 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      data-scroll-section
      className={`relative min-h-screen bg-[#012e21] text-[#fff0aa] pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-10 overflow-hidden ${poppins.variable} ${akira.variable}`}
    >
      {/* BACKGROUND PARALLAX IMAGE */}
      <div
        className="absolute inset-0 h-[120%] -top-[10%] opacity-15 pointer-events-none"
        data-scroll
        data-scroll-speed="-0.3"
      >
        <Image
          src="/img/bg/bg3.png"
          alt="Background texture"
          fill
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#012e21] via-[#012e21]/50 to-[#012e21]/80" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-20 relative z-10 flex flex-col min-h-[80vh] justify-between">
        {/* ==================== HEADER ==================== */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="font-poppins tracking-[0.3em] uppercase text-xs sm:text-sm opacity-60 mb-3 sm:mb-4">
            Stay in the loop
          </p>
          <h1 className="font-akira text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[9.4vw] leading-[0.85] uppercase">
            LET&apos;S GET <br />
            <span className="text-stroke">CONNECTED</span>
          </h1>
        </div>

        {/* ==================== SOCIAL LINKS LIST ==================== */}
        <div className="flex-1 flex items-start">
          <MotionSwitch
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full flex flex-col border-t border-[#fff0aa]/15"
          >
            {socialLinks.map((social, index) => (
              <MotionSwitch key={social.id} variants={fadeUp}>
                <SocialItem social={social} index={index} />
              </MotionSwitch>
            ))}
          </MotionSwitch>
        </div>

        {/* ==================== FOOTER BAR ==================== */}
        <div className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-[#fff0aa]/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 font-poppins text-[11px] sm:text-xs opacity-50">
            {/* Left info */}
            <div className="space-y-0.5">
              <p className="tracking-widest uppercase">Surabaya, Indonesia</p>
              <p className="tracking-widest uppercase">PENS — EEPIS</p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-6 sm:gap-8">
              <span className="tracking-wider">© 2024 SRE PENS</span>
              <button
                onClick={handleBackToTop}
                className="flex items-center gap-2 uppercase tracking-wider hover:text-[#fff0aa] hover:opacity-100 transition-all duration-300 group"
              >
                <span>Back to top</span>
                <FaArrowUp className="text-[10px] group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}