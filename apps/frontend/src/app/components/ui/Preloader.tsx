"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- VARIANTS ---

const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2,
    },
  },
};

const textReveal: Variants = {
  initial: {
    y: 20,
    opacity: 0,
    filter: "blur(5px)", // Blur dikurangi biar lebih cepat jelas
  },
  enter: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5, // Muncul dalam 0.5 detik
      ease: "easeOut",
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: "blur(5px)",
    transition: {
      duration: 0.3, // Hilang cepat
      ease: "easeIn",
    },
  },
};

const counterAnim: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const curveAnim: Variants = {
  initial: ({ width, height }: { width: number; height: number }) => ({
    d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height}  L0 0`,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: ({ width }: { width: number; height: number }) => ({
    d: `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 L0 0`,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  }),
};

export default function Preloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  if (pathname.startsWith("/admin-sre")) return null;

  // Kata-kata dikurangi agar pas dengan durasi loading
  const words = ["Hello", "Bonjour", "こんにちは", "Halo"];

  useEffect(() => {
    // === 1. CEK SESSION (Aktifkan baris ini jika sudah mau production) ===
    // const hasVisited = sessionStorage.getItem("hasVisited");
    // if (hasVisited) {
    //   setIsLoading(false);
    //   return;
    // }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    resize();

    // === 2. LOGIK COUNTER (Total 3.2 Detik) ===
    // 32ms * 100 = 3200ms
    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(countInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 32);

    // === 3. LOGIK KATA (Setiap 800ms) ===
    // Total 4 kata * 800ms = 3200ms (Sinkron dengan counter)
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) return prev;
        return prev + 1;
      });
    }, 800);

    // === 4. SELESAI (Total 3.5 Detik) ===
    // Memberi jeda sedikit setelah counter 100% baru tirai naik
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
      sessionStorage.setItem("hasVisited", "true");
    }, 3500);

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(countInterval);
      clearInterval(wordInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#012e21] text-[#fff0aa] cursor-wait"
        >
          {/* WORD ROTATOR */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.p
                key={index} // Key ini penting agar react tahu ini kata baru
                variants={textReveal}
                initial="initial"
                animate="enter"
                exit="exit"
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
              >
                {words[index]}
                <span className="text-[#fff0aa]/50">.</span>
              </motion.p>
            </AnimatePresence>
          </div>

          {/* COUNTER */}
          <motion.div
            variants={counterAnim}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute bottom-10 right-10 md:bottom-20 md:right-20 z-20 flex items-baseline gap-2"
          >
            <span className="text-6xl md:text-9xl font-black font-mono leading-none">
              {count}
            </span>
            <span className="text-xl md:text-2xl font-bold opacity-50">%</span>
          </motion.div>

          {/* SVG CURVE */}
          {dimension.width > 0 && (
            <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none z-0 fill-[#012e21]">
              <motion.path
                variants={curveAnim}
                custom={dimension}
                initial="initial"
                exit="exit"
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
