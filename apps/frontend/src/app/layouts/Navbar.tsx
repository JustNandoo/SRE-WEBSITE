"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

// --- Sub-component Item Menu (Fullscreen) ---
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
  );
};

// --- Sub-component Desktop Nav Link ---
const DesktopNavLink = ({ title, href, hasDropdown = false, children }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-[#fff0aa]/80 hover:text-[#fff0aa] transition-colors duration-300 px-4 py-2"
      >
        {title}
        {hasDropdown && (
          <FaChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              isHovered ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </Link>

      {/* DROPDOWN MENU */}
      {hasDropdown && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#012e21] border border-[#fff0aa]/20 rounded-xl shadow-xl overflow-hidden py-2"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default function NavbarSRE() {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Cek status login agar item "Login" hanya tampil untuk yang belum login.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const fullScreenMenuItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Merchandise", href: "/merchandise" },
    { title: "Contact", href: "/contact" },
    { title: "Pendaftaran", href: "/pendaftaran" },
    // Sudah login -> "Profile"; belum login -> "Login".
    // (isLoggedIn null = masih dicek, jangan tampilkan apa pun dulu agar tak flicker.)
    ...(isLoggedIn === true ? [{ title: "Profile", href: "/profile" }] : []),
    ...(isLoggedIn === false ? [{ title: "Login", href: "/login" }] : []),
  ];

  return (
    <>
      <motion.header
        id="navbar"
        // Tambahkan class 'nav-open' jika active, agar SmoothScrollProvider bisa mendeteksi
        className={`
          fixed z-50 
          left-1/2 -translate-x-1/2
          flex justify-between items-center 
          px-6 md:px-12
          transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
          w-full top-0 py-6 bg-transparent rounded-none border-transparent
          ${isActive ? "nav-open !w-full !top-0 !bg-transparent !rounded-none !shadow-none !py-6 !border-transparent delay-0" : ""}
        `}
      >
        {/* --- LOGO (KIRI) --- */}
        <div className="z-50 shrink-0">
          <Link href="/">
            <div
              className={`relative transition-all duration-300 ${
                isActive ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src="/logo/svg/sreLogoOne.svg"
                alt="SRE Logo"
                width={120}
                height={35}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>
        </div>

        {/* --- DESKTOP NAVIGATION (TENGAH) ---
        <nav
          className={`hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
            isActive ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <DesktopNavLink title="Home" href="/" />
          <DesktopNavLink title="About" href="/about" />
          <DesktopNavLink title="Merch" href="/merchandise" />

          <DesktopNavLink title="Milestone" href="#" hasDropdown>
            <div className="flex flex-col">
              <Link
                href="/academic"
                className="px-6 py-3 text-sm text-[#fff0aa]/70 hover:text-[#012e21] hover:bg-[#fff0aa] transition-colors duration-200 text-left"
              >
                Academic
              </Link>
              <Link
                href="/activity"
                className="px-6 py-3 text-sm text-[#fff0aa]/70 hover:text-[#012e21] hover:bg-[#fff0aa] transition-colors duration-200 text-left"
              >
                Activity
              </Link>
              <Link
                href="/article"
                className="px-6 py-3 text-sm text-[#fff0aa]/70 hover:text-[#012e21] hover:bg-[#fff0aa] transition-colors duration-200 text-left"
              >
                Article
              </Link>
            </div>
          </DesktopNavLink>
          <DesktopNavLink title="Contact" href="/contact" />
        </nav> */}

        {/* --- TOMBOL MENU BURGER (KANAN) --- */}
        <div className="z-50 shrink-0">
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
              <motion.div
                animate={{ y: isActive ? -16 : 0 }}
                className="flex flex-col items-center"
              >
                <span className="block h-4 leading-4">Menu</span>
                <span className="block h-4 leading-4">Close</span>
              </motion.div>
            </span>

            <div
              className={`relative w-5 h-2.5 flex flex-col justify-between items-end transition-transform duration-300 ${
                isActive ? "rotate-45" : ""
              }`}
            >
              <span
                className={`h-[1.5px] w-full bg-current transition-all duration-300 ${
                  isActive ? "rotate-90 translate-y-1" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-current transition-all duration-300 ${
                  isActive ? "rotate-0 -translate-y-1" : "w-2/3 group-hover:w-full"
                }`}
              />
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#fff0aa] opacity-5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start justify-center space-y-2 md:space-y-4">
              <p className="text-[#fff0aa]/50 text-xs md:text-sm uppercase tracking-[0.2em] mb-4 ml-1">
                Navigation
              </p>
              {fullScreenMenuItems.map((item, index) => (
                <MobileNavLink
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  index={index}
                  closeMenu={() => setIsActive(false)}
                />
              ))}

              <div className="flex gap-6 mt-8 ml-1 pt-8 border-t border-[#fff0aa]/20">
                 <Link href="/academic" onClick={() => setIsActive(false)} className="text-[#fff0aa]/60 hover:text-[#fff0aa] text-sm uppercase tracking-widest">Academic</Link>
                 <Link href="/activity" onClick={() => setIsActive(false)} className="text-[#fff0aa]/60 hover:text-[#fff0aa] text-sm uppercase tracking-widest">Activity</Link>
                 <Link href="/article" onClick={() => setIsActive(false)} className="text-[#fff0aa]/60 hover:text-[#fff0aa] text-sm uppercase tracking-widest">Article</Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-10 w-full px-10 flex justify-between items-end text-[#fff0aa]"
            >
              <div className="text-xs md:text-sm leading-relaxed opacity-60">
                <p>Society of Renewable Energy</p>
                <p>PENS Surabaya</p>
              </div>
              <div className="flex gap-4 text-xs md:text-sm font-medium">
                <a href="https://www.instagram.com/sre_pens">Instagram</a>
                <a href="https://www.linkedin.com/in/society-of-renewable-energy-politeknik-elektronika-negeri-surabaya">LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}