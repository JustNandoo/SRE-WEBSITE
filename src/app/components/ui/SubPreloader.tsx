"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// --- VARIANT DEFINITIONS (Ditaruh di luar agar aman deployment) ---

// Animasi untuk Kolom (Tirai)
const columnVariants: Variants = {
  initial: {
    height: "100vh", // Awal: Menutup layar penuh
    bottom: 0,
  },
  enter: (i: number) => ({
    height: "0vh", // Akhir: Naik ke atas sampai hilang
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], // Easing Awwwards (Bezier)
      delay: 0.05 * i, // Stagger: Kolom berikutnya delay 0.05s
    },
    transitionEnd: {
      height: "0vh", 
      display: "none" // Hapus dari DOM setelah selesai agar tidak menghalangi klik
    }
  }),
};

// Animasi untuk Konten Halaman (Muncul pelan-pelan)
const contentVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      delay: 0.6, // Tunggu tirai naik dulu baru konten muncul
      ease: "easeOut" 
    } 
  },
};

export default function SubPreloader({ children }: { children: ReactNode }) {
  // Kita gunakan 5 kolom untuk efek shutter yang elegan
  const columns = 5; 

  return (
    <div className="relative min-h-screen w-full">
      
      {/* 1. GRID SHUTTERS (TIRAI KOLOM) */}
      {/* Fixed position z-[9999] memastikan ini menutupi segalanya 
          saat halaman baru pertama kali di-load.
      */}
      <div className="fixed inset-0 z-[9999] flex pointer-events-none">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            custom={i} // Mengirim index ke variant untuk delay
            variants={columnVariants}
            initial="initial"
            animate="enter"
            className="relative w-full bg-[#012e21] border-r border-[#012e21]/10 last:border-none"
          />
        ))}
      </div>

      {/* 2. KONTEN HALAMAN */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="enter"
        className="w-full"
      >
        {children}
      </motion.div>
      
    </div>
  );
}