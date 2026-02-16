"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- 1. DEFINISI VARIANTS (Safe for Deployment) ---

// Animasi Container Utama (Slide Up dengan Curve)
const slideUp: Variants = {
  initial: { 
    top: 0 
  },
  exit: {
    top: "-100vh",
    transition: { 
      duration: 0.8, 
      ease: [0.76, 0, 0.24, 1], // Custom Bezier Easing
      delay: 0.2 
    },
  },
};

// Animasi Kata-kata (Slide Up & Fade)
const textReveal: Variants = {
  initial: { 
    y: 40, 
    opacity: 0,
    filter: "blur(10px)"
  },
  enter: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { 
        duration: 0.5, 
        ease: [0.76, 0, 0.24, 1] 
    } 
  },
  exit: {
    y: -40,
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  }
};

// Animasi Counter (Angka)
const counterAnim: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Animasi Kurva SVG (Dinamis)
const curveAnim: Variants = {
  initial: ({ width, height }: { width: number; height: number }) => ({
    d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height}  L0 0`,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: ({ width }: { width: number; height: number }) => ({
    d: `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 L0 0`,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
  }),
};

// --- KOMPONEN UTAMA ---

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0); // State untuk angka 0-100
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const words = ["Hello", "Bonjour", "Sugeng Rawuh", "SRE PENS"];

  useEffect(() => {
    // 1. Cek Session (Agar tidak muncul berulang kali saat refresh, opsional)
    // Hapus baris if(hasVisited) ini jika ingin preloader SELALU muncul saat dev
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsLoading(false);
      return; 
    }

    // 2. Set Dimensi Layar
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    resize(); 

    // 3. Logic Counter (0 - 100%)
    // Kita buat counter selesai dalam waktu sekitar 2000ms - 2500ms
    const countInterval = setInterval(() => {
        setCount((prev) => {
            if (prev === 100) {
                clearInterval(countInterval);
                return 100;
            }
            return prev + 1;
        });
    }, 20); // Kecepatan counter

    // 4. Logic Word Rotator
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) return prev;
        return prev + 1;
      });
    }, 450); // Ganti kata setiap 450ms

    // 5. Selesai Loading (Total Waktu)
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); 
      sessionStorage.setItem("hasVisited", "true");
    }, 2600); // Sedikit lebih lama dari counter agar smooth

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
          // Tambahkan cursor-wait agar UX lebih jelas
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#012e21] text-[#fff0aa] cursor-wait"
        >
          
          {/* A. CONTENT TENGAH (Word Rotator) */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
             <AnimatePresence mode="wait">
                <motion.p 
                    key={index} // Key penting agar Framer mendeteksi perubahan kata
                    variants={textReveal}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                >
                    {words[index]}
                    {/* Titik aksen */}
                    <span className="text-[#fff0aa]/50">.</span>
                </motion.p>
             </AnimatePresence>
          </div>

          {/* B. CONTENT POJOK KANAN BAWAH (Counter Besar) */}
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
              <span className="text-xl md:text-2xl font-bold opacity-50">
                %
              </span>
          </motion.div>

          {/* C. SVG CURVE (Lengkungan Bawah) */}
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