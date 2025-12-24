"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { FaArrowLeft, FaBolt } from "react-icons/fa";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      const tl = gsap.timeline();

      tl.from(".sre-element", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      })
      .from(".circuit-line", {
        scaleX: 0,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      }, "-=0.8");

      // 2. Mouse Parallax untuk Angka 404
      const handleMouseMove = (e: MouseEvent) => {
        if (!textRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        gsap.to(textRef.current, {
          x: xPos * -40, 
          y: yPos * -40, 
          duration: 1.2,
          ease: "power2.out",
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
      // Background SRE Green (#012e21)
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#012e21] text-[#fff0aa]"
    >
      {/* --- BACKGROUND NOISE --- */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.07] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilterSRE">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterSRE)" />
        </svg>
      </div>

      {/* --- BACKGROUND GIANT 404 (Parallax) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <h1
          ref={textRef}
          // Warna teks besar dibuat sangat transparan agar menyatu dengan background
          className="font-goldman font-black text-[30vw] md:text-[40vw] leading-none tracking-tighter text-[#fff0aa] opacity-[0.03] whitespace-nowrap"
        >
          404
        </h1>
      </div>

      {/* --- DECORATIVE CIRCUIT LINES (Engineering Vibe) --- */}
      {/* Garis Horizontal Atas */}
      <div className="circuit-line absolute top-24 left-0 w-1/3 h-px bg-[#fff0aa]/20 hidden md:block" />
      <div className="circuit-line absolute top-23 left-1/3 w-2 h-2 bg-[#fff0aa]/40 rounded-full hidden md:block" />
      
      {/* Garis Vertikal Kanan */}
      <div className="circuit-line absolute bottom-0 right-24 w-px h-1/3 bg-[#fff0aa]/20 hidden md:block" />
      <div className="circuit-line absolute bottom-[33%] right-[93px] w-2 h-2 bg-[#fff0aa]/40 rounded-full hidden md:block" />


      {/* --- MAIN CONTENT --- */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-2xl">
        
        {/* Animated Icon (Disconnected Power) */}
        <div className="sre-element mb-6 relative">
            <div className="absolute inset-0 bg-[#fff0aa] blur-2xl opacity-20 animate-pulse rounded-full"></div>
            <FaBolt className="text-5xl md:text-7xl text-[#fff0aa] drop-shadow-[0_0_15px_rgba(255,240,170,0.5)]" />
        </div>

        {/* Technical Error Code */}
        <div className="sre-element mb-4 flex items-center gap-3">
             <span className="h-px w-8 bg-[#fff0aa]/50"></span>
             <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[#fff0aa]/70">
                System Failure: 404
             </p>
             <span className="h-px w-8 bg-[#fff0aa]/50"></span>
        </div>

        {/* Headline */}
        <h2 className="sre-element text-4xl md:text-6xl font-bold font-goldman uppercase tracking-tight mb-6 text-[#fff0aa]">
          Energy Source <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fff0aa] to-[#fff0aa]/40">
            Not Found
          </span>
        </h2>

        {/* Description */}
        <p className="sre-element font-montserrat text-sm md:text-base text-[#fff0aa]/80 leading-relaxed mb-10 max-w-md mx-auto">
          The grid connection to this URL has been disrupted. 
          Please return to the main generator to restore power.
        </p>

        {/* --- BUTTON (SRE Style) --- */}
        <div className="sre-element">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 overflow-hidden rounded-full border border-[#fff0aa]/30 bg-[#fff0aa]/5 hover:bg-[#fff0aa] transition-all duration-300"
          >
            {/* Hover Background Fill Effect */}
            <span className="absolute inset-0 w-full h-full bg-[#fff0aa] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            
            <FaArrowLeft className="relative z-10 text-xs text-[#fff0aa] group-hover:text-[#012e21] transition-colors duration-300 group-hover:-translate-x-1" />
            <span className="relative z-10 font-bold font-montserrat text-xs md:text-sm uppercase tracking-widest text-[#fff0aa] group-hover:text-[#012e21] transition-colors duration-300">
              Reconnect Home
            </span>
          </Link>
        </div>
      </div>

      {/* --- FOOTER DECORATION (SRE BRANDING) --- */}
      <div className="absolute bottom-8 w-full px-8 md:px-12 flex justify-between items-end text-[10px] md:text-xs font-mono text-[#fff0aa]/40 uppercase tracking-widest z-20">
        <div className="flex flex-col text-left">
           <span>Society of Renewable Energy</span>
           <span>PENS Surabaya</span>
        </div>
        
        <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[#fff0aa]/10" />

        <div className="text-right">
             <span>Status: Offline</span>
        </div>
      </div>
    </div>
  );
}