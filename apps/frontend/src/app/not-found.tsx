"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Glitch Effect)
      const tl = gsap.timeline();

      // --- PERBAIKAN DI SINI ---
      // Logika dibalik: Mulai dari Dark (#012e21) -> Flash ke Cream (#fff0aa) -> Kembali Dark
      // Ini mencegah layar putih penuh saat pertama load.
      tl.fromTo(containerRef.current, 
        { backgroundColor: "#012e21" }, // Start: Dark Green
        { 
          backgroundColor: "#fff0aa", // Flash: Cream
          duration: 0.08, // Sangat cepat (strobe effect)
          ease: "none", 
          repeat: 5, // Berkedip 5 kali
          yoyo: true // Kembali ke warna awal
        }
      );

      // Reveal Elements
      tl.from(".sre-reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      }, "-=0.5"); // Mulai sedikit lebih awal berbarengan dengan akhir flash

      // 2. Diagonal Marquee Animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });

      // 3. Mouse Interaction (Magnetic Button & Distort)
      let requestRef: number;
      
      const handleMouseMove = (e: MouseEvent) => {
        if (requestRef) cancelAnimationFrame(requestRef);
        
        requestRef = requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 20;
          const yPos = (clientY / window.innerHeight - 0.5) * 20;

          gsap.to(".interactive-layer", {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      // Pastikan bg awal di class adalah Dark Green agar tidak ada flash putih dari CSS
      className="relative h-screen w-full overflow-hidden bg-[#012e21] text-[#fff0aa] font-sans"
    >
      {/* --- NOISE TEXTURE (Essential for Awwwards look) --- */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.08] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* --- BACKGROUND DIAGONAL MARQUEE (Kinetic Typography) --- */}
      <div 
        ref={marqueeRef}
        className="absolute inset-0 flex flex-col justify-center items-center opacity-10 pointer-events-none select-none overflow-hidden rotate-[-15deg] scale-150 z-0"
      >
        {/* Baris Marquee Berulang */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="marquee-row w-[200vw] flex whitespace-nowrap overflow-hidden my-2">
             <div className="marquee-inner flex gap-8 font-goldman font-black text-[8vw] uppercase leading-none text-transparent stroke-text" style={{ WebkitTextStroke: "2px #fff0aa" }}>
                <span>System Failure 404</span>
                <span>•</span>
                <span>Energy Void</span>
                <span>•</span>
                <span>System Failure 404</span>
                <span>•</span>
                <span>Energy Void</span>
             </div>
          </div>
        ))}
      </div>

      {/* --- FOREGROUND CONTENT (Split Layout) --- */}
      <div className="relative z-30 h-full w-full grid grid-cols-1 lg:grid-cols-2 p-6 md:p-12 interactive-layer">
        
        {/* LEFT: Technical Data (Industrial Look) */}
        <div className="flex flex-col justify-between h-full order-2 lg:order-1 mt-5 lg:mt-10 md:mt-0">
           
           {/* Header Info */}
           <div className="sre-reveal flex items-center gap-4">
              <div className="w-3 h-3 bg-[#fff0aa] animate-pulse"></div>
              <span className="font-mono text-xs uppercase tracking-widest opacity-70">Error Log: #ERR_404_GRID</span>
           </div>

           {/* Main Message */}
           <div className="sre-reveal my-auto">
              <h1 className="text-6xl md:text-8xl font-black font-goldman uppercase leading-[0.85] mb-6 mix-blend-difference">
                 Dead <br/> End.
              </h1>
              <p className="font-mono text-sm md:text-base opacity-80 max-w-md leading-relaxed border-l-2 border-[#fff0aa] pl-6">
                 /SYSTEM_ALERT: The requested energy node is offline. Possible causes: link decay, route migration, or dimensional misalignment.
              </p>
           </div>

           {/* Footer Info */}
           <div className="sre-reveal font-mono text-[10px] opacity-40 uppercase tracking-widest">
              ID: SRE-PENS-WEB-V2 // <br className="md:hidden"/>
              STATUS: DISCONNECTED
           </div>
        </div>


        {/* RIGHT: Visual Anchor & Action */}
        <div className="flex flex-col justify-center items-center lg:items-end h-full order-1 lg:order-2">
           
           {/* Big 404 Visual */}
           <div className="relative sre-reveal">
              <div className="absolute -inset-10 border border-[#fff0aa]/20 rounded-full animate-[spin_10s_linear_infinite] md:block hidden"></div>
              <div className="absolute -inset-4 border border-[#fff0aa]/40 rounded-full animate-[spin_15s_linear_infinite_reverse] md:block hidden"></div>
              
              <h2 className="text-[12rem] md:text-[15rem] font-black font-goldman leading-none text-[#fff0aa] mix-blend-difference relative z-10">
                 404
              </h2>
              
              {/* Glitch Overlay Text */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-mono bg-[#012e21] px-2 text-[#fff0aa] z-20 whitespace-nowrap">
                 PAGE NOT FOUND
              </span>
           </div>

           {/* Call to Action (Magnetic Button Style) */}
           <div className="mt-12 sre-reveal">
              <Link href="/" className="group relative inline-flex items-center justify-center">
                 {/* Circle Background */}
                 <div className="absolute w-20 h-20 rounded-full bg-[#fff0aa] scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></div>
                 
                 {/* Text & Icon */}
                 <div className="relative z-10 flex items-center gap-4 px-8 py-4 border-b border-[#fff0aa] group-hover:border-transparent transition-colors duration-300">
                    <span className="font-bold font-goldman text-xl uppercase tracking-widest text-[#fff0aa] group-hover:text-[#012e21] transition-colors duration-300">
                       Return Home
                    </span>
                    <FaArrowRight className="text-[#fff0aa] group-hover:text-[#012e21] -rotate-45 group-hover:rotate-0 transition-all duration-300 transform group-hover:translate-x-2" />
                 </div>
              </Link>
           </div>

        </div>

      </div>

      {/* --- GRID OVERLAY (Fine Detail) --- */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff0aa 1px, transparent 1px), linear-gradient(90deg, #fff0aa 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.03 }}></div>
    </div>
  );
}