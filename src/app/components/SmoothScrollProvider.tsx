"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>(null);
  const pathname = usePathname();

  // --- EFFECT 1: RESET SCROLL SAAT PINDAH HALAMAN ---
  useEffect(() => {
    // 1. Reset Native Scroll (Mobile)
    window.scrollTo(0, 0);

    // 2. Reset Locomotive Scroll (Desktop)
    if (scrollRef.current) {
      scrollRef.current.update();
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    }
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
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;

      if (isMobile) {
        // === MOBILE NATIVE ===
        const onNativeScroll = () => {
          handleNavbarTransform(window.scrollY);
        };
        window.addEventListener("scroll", onNativeScroll);
        
        onNativeScroll(); // Initial check

        return () => window.removeEventListener("scroll", onNativeScroll);
      } else {
        // === DESKTOP LOCOMOTIVE ===
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        if (containerRef.current) {
          scrollInstance = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.08,
            multiplier: 1,
            class: "is-reveal",
            // PERBAIKAN DI SINI: Tambahkan 'breakpoint: 0'
            smartphone: { 
              smooth: false,
              breakpoint: 0 // Wajib ada untuk TypeScript
            },
            tablet: { 
              smooth: false, 
              breakpoint: 0 // Wajib ada untuk TypeScript
            },
            resetNativeScroll: true 
          });

          scrollRef.current = scrollInstance;

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
  }, []);

  return (
    <div
      ref={containerRef}
      id="smooth-wrapper"
      data-scroll-container
      className="min-h-screen"
    >
      {children}
    </div>
  );
}