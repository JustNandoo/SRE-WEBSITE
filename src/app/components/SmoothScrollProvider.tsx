"use client";

import { useEffect, useRef, ReactNode } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    let scrollInstance: any;

    const initLocomotive = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      if (containerRef.current) {
        scrollInstance = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          lerp: 0.08, // Smoothness level
          multiplier: 1,
          class: "is-reveal",
          smartphone: { smooth: true },
          tablet: { smooth: true },
        });

        scrollRef.current = scrollInstance;

        // --- LOGIC TRANSISI NAVBAR ---
        const navbar = document.getElementById("navbar");

        scrollInstance.on("scroll", (args: any) => {
          const scrollY = args.scroll.y;

          if (navbar) {
            // Cek apakah classlist mengandung '!w-full' (artinya menu sedang buka)
            // Jika menu buka, jangan jalankan logic scroll ini
            if (navbar.classList.contains("!w-full")) return;

            if (scrollY > 50) {
              // --- STATE: SCROLLED (Kapsul Melayang) ---
              navbar.classList.remove("w-full", "top-0", "py-6", "bg-transparent", "rounded-none", "border-transparent");
              
              navbar.classList.add(
                "w-[90%]",           
                "md:w-[70%]",        
                "top-5",             
                "py-3",              
                "rounded-full",      
                "bg-[#012e21]/80",   
                "backdrop-blur-md",  
                "shadow-2xl",        
                "border-white/10"    
              );
              
            } else {
              // --- STATE: TOP (Default Full Width) ---
              navbar.classList.remove(
                "w-[90%]", "md:w-[70%]", "top-5", "py-3", 
                "rounded-full", "bg-[#012e21]/80", "backdrop-blur-md", 
                "shadow-2xl", "border-white/10"
              );

              navbar.classList.add("w-full", "top-0", "py-6", "bg-transparent", "rounded-none", "border-transparent");
            }
          }
        });
      }
    };

    if (typeof window !== "undefined") {
      initLocomotive();
    }

    return () => {
      if (scrollInstance) scrollInstance.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="smooth-wrapper"
      data-scroll-container
      className="overflow-hidden min-h-screen"
    >
      {children}
    </div>
  );
}