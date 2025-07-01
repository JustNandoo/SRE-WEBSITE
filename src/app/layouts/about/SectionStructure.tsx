"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Structure: React.FC = () => {
  const contentRef = useRef(null); // GANTI dari sectionRef ke contentRef

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2C601] to-yellow-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#10926C] font-bold">
            Our Structure
          </h2>
        </div>

        <div className="max-w-5xl h-[500px] sm:h-[500px] bg-[#012e21] mx-auto flex items-center justify-center relative rounded-2xl overflow-hidden">
          <Image
            src="/img/icons/about/StructureTwo.svg"
            alt="Structure Diagram"
            fill
            priority
            className="object-contain w-full h-full transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Structure;
