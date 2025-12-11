"use client";

import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import { motion } from "framer-motion";

// --- FONTS ---
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
});

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 0.5 },
  },
};

const lineAnim = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.5, ease: "circOut" },
  },
};

export default function SectionAbout() {
  return (
    <section
      data-scroll-section
      // KEMBALI KE WARNA ORIGINAL: bg-[#fff0aa]
      className={`relative w-full rounded-t-[3rem] -mt-8 bg-[#fff0aa] text-[#012e21] overflow-hidden ${poppins.variable} ${akira.variable}`}
    >
      {/* 
        =========================================
        BACKGROUND LAYER
        ========================================= 
      */}
      {/* Parallax Image */}
      <div className="absolute top-0 left-0 w-full h-[120%] -z-10 overflow-hidden">
        <div
          data-scroll
          data-scroll-speed="-0.3"
          className="relative w-full h-full bg-[url('/img/bg/bg4.png')] bg-cover bg-center opacity-20 mix-blend-multiply"
        ></div>
      </div>
      
      {/* Gradient Overlay untuk Blending (Cream to Transparent) */}
      <div className="absolute inset-0 bg-linear-to-b from-[#fff0aa] via-transparent to-[#fff0aa]/80 pointer-events-none z-0" />

      {/* 
        =========================================
        CONTENT CONTAINER
        ========================================= 
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="relative z-10 px-6 py-24 md:px-10 lg:px-20 lg:py-32 flex flex-col min-h-screen justify-between"
      >
        
        {/* --- HEADER: TOP SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20">
          {/* Small Tag */}
          <div className="overflow-hidden">
            <motion.div variants={textReveal} className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#134576] animate-pulse"></span>
              <span className="font-poppins uppercase tracking-widest text-xs md:text-sm font-bold text-[#134576]">
                Who We Are
              </span>
            </motion.div>
          </div>

          {/* Sub-heading */}
          <div className="overflow-hidden mt-4 md:mt-0 max-w-xs md:text-right">
             <motion.p variants={textReveal} className="font-poppins text-sm text-[#012e21]/70 leading-relaxed font-medium">
               Establishing a sustainable future through student innovation.
             </motion.p>
          </div>
        </div>

        {/* --- SEPARATOR LINE --- */}
        <motion.div 
          variants={lineAnim} 
          className="w-full h-0.5 bg-[#012e21]/20 mb-10 md:mb-16"
        />

        {/* --- MAIN TYPOGRAPHY (BIG TITLE) --- */}
        <div className="relative mb-16 md:mb-24">
          {/* Baris 1: ABOUT (Hijau Tua) */}
          <div className="overflow-hidden leading-[0.85]">
            <motion.h2
              variants={textReveal}
              className="font-akira text-[14vw] md:text-[11vw] text-[#012e21] uppercase"
            >
              About
            </motion.h2>
          </div>
          
          {/* Baris 2: SRE PENS (Biru Tua) */}
          <div className="overflow-hidden leading-[0.85] flex md:justify-end">
            <motion.h1
              variants={textReveal}
              // Menggunakan warna biru aksen (#134576) agar kontras dengan background cream
              className="font-akira text-[14vw] md:text-[11vw] text-[#134576] uppercase"
            >
              SRE PENS
            </motion.h1>
          </div>
        </div>

        {/* --- GRID CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* Column Left: Visual / Catchphrase */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div className="overflow-hidden">
              <motion.h3 
                variants={textReveal} 
                className="font-poppins text-2xl md:text-3xl font-semibold leading-tight text-[#134576]"
              >
                "Empowering Energy Transition."
              </motion.h3>
            </div>
            
            {/* Part Of Badge */}
            <motion.div 
              variants={fadeIn}
              className="mt-10 lg:mt-auto pt-10 border-t border-[#012e21]/20"
            >
              <p className="text-xs uppercase tracking-widest text-[#012e21]/60 mb-2 font-bold">Member of</p>
              <Link 
                href="https://sre.co.id" 
                target="_blank"
                className="font-akira text-sm md:text-lg text-[#012e21] hover:text-[#134576] transition-colors flex items-center gap-2 group"
              >
                SRE INDONESIA
                <svg className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </motion.div>
          </div>

          {/* Column Right: Paragraph & Button */}
          <div className="lg:col-span-8">
            <motion.div 
              variants={fadeIn} 
              data-scroll 
              data-scroll-speed="0.5"
            >
              <p className="font-poppins text-lg md:text-xl lg:text-2xl leading-relaxed text-[#012e21]/80 font-medium mb-10">
                <strong className="text-[#012e21] font-extrabold">Society of Renewable Energy PENS</strong> is a Student Chapter dedicated to accelerating the understanding and implementation of <span className="underline decoration-[#134576] decoration-2 underline-offset-4 text-[#134576]">Renewable Energy</span>. 
                <br /><br />
                We bridge the gap between academic knowledge and real-world application, fostering innovations that drive the <span className="text-[#134576] font-bold">Sustainability of the Energy Transition</span>.
              </p>

              {/* Huge Action Button (Warna Original: Dark Green Button + Cream Text) */}
              <Link href="/about" className="group relative inline-flex items-center justify-between w-full md:w-auto bg-[#012e21] text-[#fff0aa] rounded-full px-8 py-6 md:px-12 md:py-8 overflow-hidden transition-all hover:bg-[#024431] shadow-xl hover:shadow-2xl">
                 <span className="relative z-10 font-akira text-lg md:text-xl tracking-wide group-hover:tracking-widest transition-all duration-500">
                   Discover More
                 </span>
                 <div className="relative z-10 ml-6 w-10 h-10 md:w-12 md:h-12 border border-[#fff0aa]/30 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#fff0aa] group-hover:text-[#012e21] transition-all duration-500">
                    <svg className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                 </div>
              </Link>
            </motion.div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}