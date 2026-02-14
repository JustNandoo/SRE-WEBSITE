"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation"; // TAMBAHAN PENTING
import "locomotive-scroll/dist/locomotive-scroll.css";

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>(null);
  const pathname = usePathname(); // Hook untuk mendeteksi perubahan URL

  // --- EFFECT 1: RESET SCROLL SAAT PINDAH HALAMAN ---
  useEffect(() => {
    // 1. Reset Native Scroll (Mobile)
    window.scrollTo(0, 0);

    // 2. Reset Locomotive Scroll (Desktop)
    if (scrollRef.current) {
      // update(): Hitung ulang tinggi halaman baru
      scrollRef.current.update();
      
      // scrollTo(0): Paksa scroll visual kembali ke paling atas
      // duration: 0 & disableLerp: true agar instan tanpa animasi lambat
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    }
  }, [pathname]); // Dijalankan setiap kali pathname berubah

  // --- EFFECT 2: INISIALISASI SCROLL ---
  useEffect(() => {
    // Definisi Logic Navbar
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
        
        // Panggil sekali di awal untuk set state navbar yang benar saat refresh di tengah halaman
        onNativeScroll();

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
            // Matikan total di mobile/tablet
            smartphone: { smooth: false },
            tablet: { smooth: false },
            // Penting: Reset native scroll agar tidak konflik
            resetNativeScroll: true 
          });

          scrollRef.current = scrollInstance;

          // Resize observer untuk memantau perubahan konten dinamis (misal gambar loading lambat)
          // Ini mencegah halaman "terpotong" di tengah
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
  }, []); // Hanya jalan sekali saat mount (karena logic pathname dipisah di effect atas)

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