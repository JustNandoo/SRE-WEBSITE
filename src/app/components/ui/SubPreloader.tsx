"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubPreloader({ isActive }: { isActive: boolean }) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // --- SETTINGAN DURASI (Diperlambat) ---
  const DURATION = 1.2; // Detik (sebelumnya 0.6)
  const EASE = [0.76, 0, 0.24, 1]; // Kurva Bezier halus

  // 1. Container (Layar Hijau)
  const slideUp = {
    initial: { top: "100vh" },
    enter: { 
        top: "0vh", 
        transition: { duration: DURATION, ease: EASE } 
    },
    exit: { 
        top: "-100vh", 
        transition: { duration: DURATION, ease: EASE, delay: 0.2 } 
    }
  };

  // 2. SVG Curve (Ekor Lengkungan)
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 300 0 0`;

  const curveAnim = {
    initial: { d: initialPath },
    enter: { 
        d: initialPath, 
        transition: { duration: DURATION, ease: EASE } 
    },
    exit: { 
        d: targetPath, 
        transition: { duration: DURATION, ease: EASE, delay: 0.2 } 
    }
  };

  // 3. Teks (Word Reveal)
  const textContainer = {
    enter: { 
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
    },
    exit: { 
        opacity: 0 
    }
  };

  const textItem = {
    initial: { y: "100%" },
    enter: { 
        y: "0%", 
        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } 
    },
    exit: { y: "-100%" }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && dimension.width > 0 && (
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#012e21] pointer-events-none"
        >
          {/* SVG CURVE (Bottom Tail) */}
          <svg className="absolute top-full w-full h-[300px] fill-[#00a979]">
            <motion.path 
                variants={curveAnim} 
                initial="initial" 
                animate="enter" 
                exit="exit" 
            />
          </svg>

          {/* TEXT CONTENT */}
          <div className="absolute z-10 flex gap-4 md:gap-8 overflow-hidden">
            <motion.div
                variants={textContainer}
                initial="initial"
                animate="enter"
                exit="exit"
                className="flex items-center gap-4 md:gap-6"
            >
                {/* Kata 1: SRE */}
                <div className="overflow-hidden relative">
                    <motion.h1 
                        variants={textItem} 
                        className="text-[#fff0aa] text-5xl md:text-7xl font-black uppercase tracking-tighter"
                    >
                        SRE
                    </motion.h1>
                </div>

                {/* Kata 2: PENS */}
                <div className="overflow-hidden relative">
                    <motion.h1 
                        variants={textItem} 
                        className="text-[#fff0aa] text-5xl md:text-7xl font-black uppercase tracking-tighter"
                    >
                        PENS
                    </motion.h1>
                </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}