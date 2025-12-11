"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Sub-component Item Menu ---
const MobileNavLink = ({ title, href, index, closeMenu }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link 
        href={href} 
        onClick={closeMenu} 
        className="group relative flex items-center gap-4 text-5xl md:text-7xl font-bold tracking-tighter text-[#fff0aa] hover:text-white transition-colors duration-300"
      >
        <span className="w-3 h-3 rounded-full bg-transparent group-hover:bg-[#fff0aa] transition-colors duration-300 transform scale-0 group-hover:scale-100" />
        {title}
      </Link>
    </motion.div>
  )
}

export default function NavbarSRE() {
  const [isActive, setIsActive] = useState(false);
  const menuItems = ["Home", "About", "Academic", "Activity", "Article", "Contact"];

  return (
    <>
      <motion.header
        id="navbar"
        className={`
          fixed z-50 
          left-1/2 -translate-x-1/2  /* KUNCI: Selalu center horizontal */
          flex justify-between items-center 
          px-6 md:px-8
          border border-transparent
          
          /* Animasi perubahan bentuk */
          transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]

          /* 
             LOGIC OVERRIDE:
             Jika isActive (Menu Buka) -> Paksa style transparan & full width (!important)
             Jika Tidak -> Gunakan class default (yang nanti dimanipulasi Locomotive Scroll)
          */
          ${
            isActive
              ? "!w-full !top-0 !bg-transparent !rounded-none !shadow-none !py-6 !border-transparent delay-0"
              : "w-full top-0 py-6 bg-transparent rounded-none"
          }
        `}
      >
        {/* LOGO */}
        <div className="z-50">
          <Link href="/">
            <div className={`relative transition-all duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}>
              <Image
                src="/logo/svg/sreLogoOne.svg"
                alt="SRE Logo"
                width={120} 
                height={40}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>
        </div>

        {/* TOMBOL MENU (BURGER) */}
        <div className="z-50">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`
              relative flex items-center justify-center gap-3 px-4 py-2 rounded-full 
              transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group
              ${
                isActive
                  ? "bg-[#fff0aa] text-[#012e21]" 
                  : "bg-[#fff0aa]/10 border border-[#fff0aa]/20 text-[#fff0aa] hover:bg-[#fff0aa] hover:text-[#012e21]" 
              }
            `}
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:block overflow-hidden h-4 w-12 text-center">
              <motion.div animate={{ y: isActive ? -16 : 0 }} className="flex flex-col items-center">
                <span className="block h-4 leading-4">Menu</span>
                <span className="block h-4 leading-4">Close</span>
              </motion.div>
            </span>

            {/* Icon Burger Lines */}
            <div className={`relative w-5 h-2.5 flex flex-col justify-between items-end transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}>
              <span className={`h-[1.5px] w-full bg-current transition-all duration-300 ${isActive ? "rotate-90 translate-y-1" : ""}`} />
              <span className={`h-[1.5px] w-full bg-current transition-all duration-300 ${isActive ? "rotate-0 -translate-y-1" : "w-2/3 group-hover:w-full"}`} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* --- FULLSCREEN OVERLAY MENU --- */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#012e21] flex flex-col justify-center items-center"
          >
             {/* Background Decoration (Glow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#fff0aa] opacity-5 rounded-full blur-3xl pointer-events-none" />

            {/* List Menu */}
            <div className="relative z-10 flex flex-col items-start justify-center space-y-2 md:space-y-4">
              <p className="text-[#fff0aa]/50 text-xs md:text-sm uppercase tracking-[0.2em] mb-4 ml-1">Navigation</p>
              {menuItems.map((item, index) => (
                <MobileNavLink 
                    key={item} 
                    title={item} 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    index={index} 
                    closeMenu={() => setIsActive(false)} 
                />
              ))}
            </div>
            
            {/* Footer Menu */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.8, duration: 0.5 }} 
                className="absolute bottom-10 w-full px-10 flex justify-between items-end text-[#fff0aa]"
            >
               <div className="text-xs md:text-sm leading-relaxed opacity-60">
                 <p>Society of Renewable Energy</p><p>PENS Surabaya</p>
               </div>
               <div className="flex gap-4 text-xs md:text-sm font-medium">
                 <a href="#">Instagram</a><a href="#">LinkedIn</a>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}