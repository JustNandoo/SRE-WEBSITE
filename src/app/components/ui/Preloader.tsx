"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    // Safety Timer: Paksa selesai setelah 5 detik jika counter macet
    const safetyTimer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(safetyTimer);
  }, []);

  useEffect(() => {
    if (index === 100) {
      // Delay sedikit di 100% agar user sempat melihat angka penuh
      setTimeout(() => setIsLoading(false), 800);
      return;
    }

    // Logic Counter: Semakin mendekati 100, semakin lambat (Lazy Load feel)
    const delay = index === 0 ? 500 : Math.random() * (index > 80 ? 50 : 20);
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index]);

  // Animasi Slide ke Atas
  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-150vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#012e21] text-[#fff0aa] cursor-wait"
        >
          {dimension.width > 0 && (
            <>
              {/* TYPOGRAPHY COUNTER */}
              <div className="absolute z-10 flex flex-col items-center justify-center mix-blend-difference">
                 <motion.h1 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[15vw] md:text-[12rem] font-black leading-none tracking-tighter"
                 >
                    {index}%
                 </motion.h1>
                 <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-sm uppercase tracking-[0.5em] mt-4"
                 >
                    Loading Experience
                 </motion.p>
              </div>

              {/* SVG CURVE (Efek Lengkungan Elastis) */}
              <svg className="absolute top-full w-full h-[300px] fill-[#012e21] pointer-events-none">
                <motion.path
                  initial={{ d: `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0` }}
                  exit={{
                    d: `M0 0 L${dimension.width} 0 L${dimension.width} 300 Q${dimension.width / 2} 300 0 300`,
                    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                  }}
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}