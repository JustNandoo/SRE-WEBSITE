"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaArrowRight,
} from "react-icons/fa";
import { motion, Variants } from "framer-motion";
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

// ================= SINGLE ITEM COMPONENT (New) =================
// Kita pisahkan itemnya agar tidak terjadi double loop
function SocialItem({ social, index }: { social: any; index: number }) {
  return (
    <Link
      href={social.url}
      target="_blank"
      className="group relative flex items-center justify-between py-8 md:py-10 border-b border-[#fff0aa]/20 hover:bg-[#fff0aa] transition-colors px-2 md:px-4"
    >
      {/* LEFT */}
      <div className="flex items-center gap-6 md:gap-12">
        <span className="text-xs opacity-50 group-hover:text-[#012e21]">
          0{index + 1}
        </span>
        <span className="font-akira text-2xl md:text-4xl lg:text-5xl group-hover:text-[#012e21] group-hover:translate-x-4 transition-all">
          {social.name}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 md:gap-8">
        <span className="hidden md:block text-sm tracking-widest uppercase group-hover:text-[#012e21]">
          {social.handle}
        </span>

        {/* Circle Button */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#fff0aa]/30 flex items-center justify-center overflow-hidden group-hover:bg-[#012e21] group-hover:border-[#012e21]">
          
          {/* Default Icon (Slide Up) */}
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
            {social.icon}
          </div>
          
          {/* Hover Arrow (Slide In) */}
          <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#fff0aa]">
            <FaArrowRight className="-rotate-45" />
          </div>

        </div>
      </div>
    </Link>
  );
}

// ================= MOBILE / TABLET =================
function ContactStatic() {
  return (
    <div className="w-full flex flex-col border-t border-[#fff0aa]/20">
      {/* Loop di sini untuk versi statis */}
      {socialLinks.map((social, index) => (
        <SocialItem key={social.id} social={social} index={index} />
      ))}
    </div>
  );
}

// ================= DESKTOP =================
function ContactMotion() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex flex-col border-t border-[#fff0aa]/20"
    >
      {/* Loop di sini untuk versi animasi */}
      {socialLinks.map((social, index) => (
        <motion.div key={social.id} variants={fadeUp}>
          <SocialItem social={social} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ================= MAIN =================
export default function SectionContact() {
  return (
    <footer
      data-scroll-section
      className={`relative min-h-screen bg-[#012e21] text-[#fff0aa] pt-32 pb-10 overflow-hidden ${poppins.variable} ${akira.variable}`}
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 h-[120%] -top-[10%] opacity-20 pointer-events-none"
        data-scroll
        data-scroll-speed="-0.3"
      >
        <Image
          src="/img/bg/bg3.png"
          alt="Background"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/40 to-[#012e21]/80" />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10 flex flex-col h-full justify-between">
        {/* HEADER */}
        <div className="mb-20">
          <p className="tracking-[0.3em] uppercase text-sm opacity-70 mb-4 font-poppins">
            Stay in the loop
          </p>
          <h1 className="font-akira text-[11vw] leading-[0.85] uppercase">
            LET&apos;S GET <br />
            <span className="text-[#134576]">CONNECTED</span>
          </h1>
        </div>

        {/* LIST (Responsive Switch) */}
        <div className="block lg:hidden">
          <ContactStatic />
        </div>

        <div className="hidden lg:block">
          <ContactMotion />
        </div>

        {/* FOOTER */}
        <div className="mt-20 flex flex-col md:flex-row justify-between text-xs opacity-60 font-poppins">
          <div>
            <p>SURABAYA, INDONESIA</p>
            <p>PENS – EEPIS</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-6 justify-center">
            <span>© 2025 SRE PENS</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:underline uppercase"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}