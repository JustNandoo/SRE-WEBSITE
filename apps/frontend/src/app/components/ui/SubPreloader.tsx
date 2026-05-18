"use client";

import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation"; // Import ini
import { ReactNode } from "react";

// --- VARIANTS ---

const columnVariants: Variants = {
  initial: {
    height: "100vh",
    bottom: 0,
  },
  enter: (i: number) => ({
    height: "0vh",
    transition: {
      duration: 1.2, // Durasi 1.2 detik
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i, // Stagger effect
    },
    transitionEnd: { height: "0vh", display: "none" }
  }),
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 50 }, // Mulai agak bawah
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      delay: 0.6, // Tunggu tirai naik setengah jalan
      ease: "easeOut" 
    } 
  },
};

export default function SubPreloader({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Ambil URL saat ini
  const columns = 5; 

  if (pathname.startsWith("/admin-sre")) {
    return <>{children}</>;
  }

  return (
    // TAMBAHKAN key={pathname} DISINI. INI KUNCINYA!
    <div key={pathname} className="relative min-h-screen w-full">
      
      {/* 1. GRID SHUTTERS (TIRAI) */}
      <div className="fixed inset-0 z-[9999] flex pointer-events-none">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
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