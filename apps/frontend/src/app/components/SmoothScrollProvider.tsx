"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>(null);
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  // --- 1. LOGIC TRANSISI NAVBAR (Dipakai di kedua mode) ---
  const handleNavbarTransform = (scrollY: number) => {
    const navbar = document.getElementById("navbar");
    // Jangan ubah jika navbar tidak ada atau menu sedang terbuka
    if (!navbar || navbar.classList.contains("nav-open")) return;

    if (scrollY > 50) {
      // Mode Scrolled (Pill Shape)
      navbar.classList.remove("w-full", "top-0", "py-6", "bg-transparent", "rounded-none", "border-transparent");
      navbar.classList.add("w-[90%]", "md:w-[70%]", "top-5", "py-3", "rounded-full", "bg-[#012e21]/80", "backdrop-blur-md", "shadow-2xl", "border-white/10");
    } else {
      // Mode Top (Full Width)
      navbar.classList.remove("w-[90%]", "md:w-[70%]", "top-5", "py-3", "rounded-full", "bg-[#012e21]/80", "backdrop-blur-md", "shadow-2xl", "border-white/10");
      navbar.classList.add("w-full", "top-0", "py-6", "bg-transparent", "rounded-none", "border-transparent");
    }
  };

  // --- 2. RESET SCROLL SAAT PINDAH HALAMAN ---
  useEffect(() => {
    // Reset Native (Mobile)
    window.scrollTo(0, 0);

    // Reset Locomotive (Desktop)
    if (scrollRef.current) {
      scrollRef.current.update();
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    }
  }, [pathname]);

  // --- 3. INISIALISASI SCROLL ENGINE ---
  useEffect(() => {
    let scrollInstance: any;

    const initScroll = async () => {
      // Cek apakah layar Desktop (LG ke atas / > 1024px)
      // Kita pakai matches 'min-width' agar logic-nya: "Jika Desktop, maka True"
      const checkDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktop(checkDesktop);

      if (!checkDesktop) {
        // ============================================
        // MODE HP/TABLET (NATIVE SCROLL)
        // ============================================
        console.log("Mode: Mobile (Native Scroll)");
        
        // Hapus class sisa locomotive jika ada (pembersihan)
        document.documentElement.classList.remove("has-scroll-smooth");
        document.body.style.overflow = "auto";

        const onNativeScroll = () => {
          handleNavbarTransform(window.scrollY);
        };

        window.addEventListener("scroll", onNativeScroll);
        onNativeScroll(); // Cek posisi awal

        return () => window.removeEventListener("scroll", onNativeScroll);

      } else {
        // ============================================
        // MODE DESKTOP (LOCOMOTIVE SCROLL)
        // ============================================
        console.log("Mode: Desktop (Locomotive Active)");

        // Dynamic Import (Hanya load library jika Desktop)
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        if (containerRef.current) {
          scrollInstance = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.075, // Settingan portofoliomu
            multiplier: 1,
            class: "is-reveal",
            // Paksa reset agar tidak konflik dengan native scroll browser
            resetNativeScroll: true 
          } as any);

          scrollRef.current = scrollInstance;

          // Resize Observer (Penting untuk konten dinamis/gambar)
          const resizeObserver = new ResizeObserver(() => {
            scrollInstance.update();
          });
          resizeObserver.observe(containerRef.current);

          // Hubungkan event scroll locomotive ke Navbar
          scrollInstance.on("scroll", (args: any) => {
            handleNavbarTransform(args.scroll.y);
          });

          return () => {
            resizeObserver.disconnect();
            if (scrollInstance) scrollInstance.destroy();
          };
        }
      }
    };

    const cleanupPromise = initScroll();

    return () => {
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") cleanup();
      });
      if (scrollInstance) scrollInstance.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="smooth-wrapper"
      data-scroll-container
      // LOGIC CSS PENTING:
      // Jika Desktop: 'min-h-screen' (Wajib untuk Locomotive)
      // Jika Mobile: Kosongkan atau 'overflow-x-hidden' agar scroll native browser jalan lancar
      className={isDesktop ? "min-h-screen" : "overflow-x-hidden"}
    >
      {children}
    </div>
  );
}