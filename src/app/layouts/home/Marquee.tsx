"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});


export default function MarqueeContact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const totalWidth = marquee.scrollWidth;
      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth / 5,
          duration: 50,
          repeat: -1,
          ease: "linear",
          modifiers: {
            x: (x) => `${parseFloat(x) % totalWidth}px`,
          },
        }
      );
    }
  }, []);

  return (
    <main className="z-10 bg-[#012e21] py-2">
      <div
        className="flex items-center justify-center"
        style={{ width: "100%" }}
      >
        {/* marquee area */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex space-x-4 whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`italic ${poppins.variable} font-bold tracking-wide text-center text-[36px] text-[#fff0aa]`}
              >
                ● Go Green and Achieve Net Zero Future ● SRE PENS
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
