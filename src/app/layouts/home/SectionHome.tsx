"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
// PERBAIKAN 1: Import tipe 'Variants' dari framer-motion
import { motion, Variants } from "framer-motion";
import "locomotive-scroll/dist/locomotive-scroll.css";

// --- VARIAN ANIMASI (Explicitly Typed) ---
// PERBAIKAN 2: Tambahkan tipe ': Variants' agar TypeScript tidak merah
const slideUp: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, delay: 1.5 } },
};

export default function SectionHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- LOGIC LOCOMOTIVE SCROLL ---
  useEffect(() => {
    let scroll: any;
    const initScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]") || undefined,
        smooth: true,
        multiplier: 1,
        class: "is-reveal",
      });
    };
    initScroll();
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden bg-[#012e21] text-[#fff0aa]"
      data-scroll-section
    >
      {/* =========================================
          LAYER 1: BACKGROUND
         ========================================= */}
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
        {/* PERBAIKAN 3: Typo 'bg-linear-to-t' diganti menjadi 'bg-gradient-to-t' */}
        <div className="absolute inset-0 bg-linear-to-t from-[#012e21] via-[#012e21]/40 to-transparent z-10" />
      </div>

      {/* =========================================
          LAYER 2: CONTENT WRAPPER
         ========================================= */}
      <div
        data-scroll
        data-scroll-speed="0.2"
        className="relative z-20 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-8 md:py-12"
      >
        {/* --- TOP HEADER --- */}
        <div className="flex justify-between items-start mt-20 md:mt-24 border-b border-[#fff0aa]/20 pb-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="hidden md:block text-xs uppercase tracking-[0.2em] font-medium opacity-70"
          >
            Surabaya, Indonesia
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-right text-xs uppercase tracking-[0.2em] font-medium opacity-70 ml-auto"
          >
            Est. 2020
          </motion.div>
        </div>

        {/* --- MAIN TYPOGRAPHY --- */}
        <div className="flex flex-col justify-center w-full relative -mt-10 md:mt-0">
          {/* BARIS 1: SOCIETY OF + ICON (Diam) */}
          <div className="flex items-baseline gap-2 md:gap-4 overflow-hidden">
            <motion.h1
              custom={0}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="text-[13vw] lg:text-[10vw] leading-[0.85] font-semibold uppercase tracking-tighter text-white"
            >
              Society
            </motion.h1>

            <motion.span
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="font-serif italic text-2xl md:text-4xl lg:text-5xl opacity-80 -translate-y-2 md:-translate-y-4"
            >
              of
            </motion.span>
          </div>

          {/* BARIS 2: RENEWABLE (Icon dihapus dari sini) */}
          <div className="flex items-center overflow-hidden w-full">
            <div className="overflow-hidden">
              <motion.h1
                custom={1}
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="text-[13vw] lg:text-[10vw] leading-[0.85] font-bold uppercase tracking-tighter text-[#fff0aa]"
              >
                Renewable
              </motion.h1>
            </div>
          </div>

          {/* BARIS 3: ICON PETIK + ENERGY */}
          <div className="flex justify-end md:justify-start md:ml-[15vw] relative overflow-hidden">
            <motion.h1
              custom={2}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="text-[13vw] lg:text-[10vw] leading-[0.85] font-bold uppercase tracking-tighter text-white relative pl-8 md:pl-16"
            >
              {/* Petik Decoration (Pindah Kiri) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-2 -left-2 md:-top-6 md:left-0.5 w-8 md:w-16"
              >
                <Image
                  src="/img/icons/UnionPetik.png"
                  width={80}
                  height={80}
                  alt="quote"
                  className="object-contain"
                />
              </motion.div>
              Energy
            </motion.h1>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="max-w-xs md:max-w-md text-sm leading-relaxed opacity-80"
          >
            <p>
              Student Organization at{" "}
              <strong className="text-white">PENS Surabaya</strong>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="hidden md:flex items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-widest opacity-50">
              Scroll
            </span>
            <div className="h-px w-12 bg-white/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}