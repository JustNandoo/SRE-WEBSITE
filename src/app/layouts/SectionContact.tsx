"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaYoutube, FaTiktok, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

// --- FONTS ---
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const akira = localFont({
  src: "../fonts/Akira.otf", // Pastikan path sesuai
  variable: "--font-akira",
});

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const SectionContact: React.FC = () => {
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

  return (
    <footer
      data-scroll-section
      className={`relative min-h-screen w-full bg-[#012e21] text-[#fff0aa] flex flex-col justify-between pt-32 pb-10 overflow-hidden ${poppins.variable} ${akira.variable}`}
    >
      {/* --- PARALLAX BACKGROUND --- */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-20 z-0 pointer-events-none"
        data-scroll 
        data-scroll-speed="-0.3"
      >
        <Image
          src="/img/bg/bg3.png"
          alt="Background Pattern"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/40 to-[#012e21]/80" />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10 flex flex-col h-full justify-between">
        
        {/* 1. TOP HEADER */}
        <div className="mb-16 md:mb-24">
            <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-poppins text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
            >
                Stay in the loop
            </motion.p>
            
            <motion.h1 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="font-akira text-[11vw] leading-[0.85] uppercase flex flex-col"
            >
                <motion.span variants={fadeUp} className="block">
                    LET'S GET
                </motion.span>
                <motion.span variants={fadeUp} className="block text-[#134576] drop-shadow-lg">
                    CONNECTED
                </motion.span>
            </motion.h1>
        </div>

        {/* 2. SOCIAL LIST (FIXED BUTTONS) */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="w-full flex flex-col border-t border-[#fff0aa]/20"
        >
            {socialLinks.map((social, index) => (
                <motion.div key={social.id} variants={fadeUp} className="w-full">
                    <Link
                        href={social.url}
                        target="_blank"
                        className="group relative flex items-center justify-between py-8 md:py-10 border-b border-[#fff0aa]/20 hover:bg-[#fff0aa] transition-colors duration-500 px-2 md:px-4 cursor-pointer"
                    >
                        {/* Kiri: Nomor & Nama */}
                        <div className="flex items-center gap-6 md:gap-12">
                            <span className="font-poppins text-xs opacity-50 group-hover:text-[#012e21] transition-colors duration-500">
                                0{index + 1}
                            </span>
                            <span className="font-akira text-2xl md:text-4xl lg:text-5xl text-[#fff0aa] group-hover:text-[#012e21] group-hover:translate-x-4 transition-all duration-500 ease-out">
                                {social.name}
                            </span>
                        </div>

                        {/* Kanan: Handle & Animated Button */}
                        <div className="flex items-center gap-4 md:gap-8">
                            <span className="hidden md:block font-poppins font-light text-sm tracking-widest uppercase text-[#fff0aa] group-hover:text-[#012e21] transition-colors duration-500">
                                {social.handle}
                            </span>
                            
                            {/* --- THE FIXED BUTTON --- */}
                            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#fff0aa]/30 overflow-hidden flex items-center justify-center group-hover:border-[#012e21] group-hover:bg-[#012e21] transition-colors duration-500">
                                
                                {/* Ikon Asli (Sosmed) - Geser ke ATAS saat hover */}
                                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                                    <span className="text-xl md:text-2xl text-[#fff0aa]">
                                        {social.icon}
                                    </span>
                                </div>

                                {/* Ikon Panah - Muncul dari BAWAH saat hover */}
                                <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                                    <FaArrowRight className="-rotate-45 text-xl md:text-2xl text-[#fff0aa]" />
                                </div>
                                
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>

        {/* 3. FOOTER INFO */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-end md:items-center font-poppins text-xs opacity-60">
            <div className="flex flex-col gap-1 text-right md:text-left">
                <span>SURABAYA, INDONESIA</span>
                <span>PENS - EEPIS</span>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-6">
                 <span>© 2025 SRE PENS</span>
                 <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="hover:underline hover:text-white transition-colors"
                 >
                    BACK TO TOP
                 </button>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default SectionContact;