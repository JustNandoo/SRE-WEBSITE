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

  // --- EFFECT 1: CEK DEVICE & RESET SCROLL SAAT PINDAH HALAMAN ---
  useEffect(() => {
    // Cek apakah mobile (hanya sekali saat mount)
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Reset Scroll Position
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    
    if (scrollRef.current) {
      scrollRef.current.update();
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname]);

  // --- EFFECT 2: INISIALISASI SCROLL ---
  useEffect(() => {
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
      const mobileCheck = window.matchMedia("(max-width: 1024px)").matches;

      if (mobileCheck) {
        // === MOBILE NATIVE ===
        console.log("Mobile mode: Native scroll enabled");
        
        const onNativeScroll = () => {
          handleNavbarTransform(window.scrollY);
        };
        
        window.addEventListener("scroll", onNativeScroll);
        onNativeScroll(); // Initial check

        return () => window.removeEventListener("scroll", onNativeScroll);
      } else {
        // === DESKTOP LOCOMOTIVE ===
        console.log("Desktop mode: Locomotive scroll enabled");
        
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        if (containerRef.current) {
          scrollInstance = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.08,
            multiplier: 1,
            class: "is-reveal",
            // Paksa matikan di tablet/smartphone lewat config juga
            smartphone: { smooth: false }, 
            tablet: { smooth: false },
          } as any); // 'as any' untuk bypass error type breakpoint

          scrollRef.current = scrollInstance;

          // Resize observer penting untuk konten dinamis
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

    // Jalankan init
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
      // PENTING: Jangan gunakan min-h-screen atau overflow-hidden di sini untuk mobile
      // Biarkan tinggi otomatis agar body bisa discroll native
      className={isMobile ? "" : "min-h-screen"} 
      style={isMobile ? { overflow: "visible" } : {}}
    >
      {children}
    </div>
  );
}