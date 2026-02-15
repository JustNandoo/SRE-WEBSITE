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
  const [isMobile, setIsMobile] = useState(false);

  // --- LOGIC 1: DETEKSI MOBILE & BERSIHKAN SAMPAH LOCOMOTIVE ---
  useEffect(() => {
    const checkMobile = () => {
      // Cek apakah layar di bawah ukuran LG (1024px)
      const mobile = window.matchMedia("(max-width: 1024px)").matches;
      setIsMobile(mobile);

      // PENTING: Jika mobile, paksa bersihkan class di <html> yang bikin stuck
      if (mobile) {
        document.documentElement.classList.remove("has-scroll-smooth");
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- LOGIC 2: RESET SCROLL SAAT PINDAH HALAMAN ---
  useEffect(() => {
    // Reset Native (Mobile)
    window.scrollTo(0, 0);

    // Reset Locomotive (Desktop)
    if (scrollRef.current) {
      scrollRef.current.update();
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    }
  }, [pathname]);

  // --- LOGIC 3: INISIALISASI SCROLL ENGINE ---
  useEffect(() => {
    // Fungsi Transform Navbar (Shared Logic)
    const handleNavbarTransform = (scrollY: number) => {
      const navbar = document.getElementById("navbar");
      if (!navbar || navbar.classList.contains("nav-open")) return;

      if (scrollY > 50) {
        navbar.classList.remove("w-full", "top-0", "py-6", "bg-transparent", "rounded-none", "border-transparent");
        navbar.classList.add("w-[90%]", "md:w-[70%]", "top-5", "py-3", "rounded-full", "bg-[#012e21]/80", "backdrop-blur-md", "shadow-2xl", "border-white/10");
      } else {
        navbar.classList.remove("w-[90%]", "md:w-[70%]", "top-5", "py-3", "rounded-full", "bg-[#012e21]/80", "backdrop-blur-md", "shadow-2xl", "border-white/10");
        navbar.classList.add("w-full", "top-0", "py-6", "bg-transparent", "rounded-none", "border-transparent");
      }
    };

    let scrollInstance: any;

    const initScroll = async () => {
      // Cek ulang ukuran layar saat init
      const mobileCheck = window.matchMedia("(max-width: 1024px)").matches;

      if (mobileCheck) {
        // ===============================================
        // MODE MOBILE: NATIVE SCROLL (RINGAN & LANCAR)
        // ===============================================
        console.log("Mobile Detected: Locomotive Disabled.");
        
        const onNativeScroll = () => {
          handleNavbarTransform(window.scrollY);
        };

        window.addEventListener("scroll", onNativeScroll);
        // Trigger sekali di awal
        onNativeScroll();

        return () => window.removeEventListener("scroll", onNativeScroll);

      } else {
        // ===============================================
        // MODE DESKTOP: LOCOMOTIVE SCROLL (SMOOTH)
        // ===============================================
        console.log("Desktop Detected: Locomotive Enabled.");
        
        // Import hanya jika Desktop
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        if (containerRef.current) {
          const options = {
            el: containerRef.current,
            smooth: true,
            lerp: 0.08,
            multiplier: 1,
            class: "is-reveal",
            // Matikan fitur tablet/hp di config juga sebagai pengaman
            smartphone: { smooth: false },
            tablet: { smooth: false },
            resetNativeScroll: true
          };

          scrollInstance = new LocomotiveScroll(options as any);
          scrollRef.current = scrollInstance;

          // Resize Observer agar halaman tidak terpotong
          const resizeObserver = new ResizeObserver(() => {
            scrollInstance.update();
          });
          resizeObserver.observe(containerRef.current);

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
  }, []); // Run once on mount

  return (
    <div
      ref={containerRef}
      id="smooth-wrapper"
      data-scroll-container
      // PENTING: Style ini memastikan scroll tidak macet di HP
      // Di desktop (else), Locomotive butuh min-h-screen
      className={isMobile ? "overflow-y-auto overflow-x-hidden" : "min-h-screen"}
      style={isMobile ? { height: 'auto', overflowY: 'auto' } : {}}
    >
      {children}
    </div>
  );
}