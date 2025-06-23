"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MissionProps {
  imgPath: string;
  heading: string;
  text: string;
}

interface MissionWrapperProps {
  children: React.ReactNode;
}

export const MissionCard: React.FC<MissionProps> = ({ imgPath, heading, text }) => {
  return (
    <div
      className="mission-card hover:-translate-y-2 hover:shadow-xl duration-300 w-full h-56 rounded-lg bg-white p-5 overflow-hidden mb-5 flex"
    >
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={`/img/icons/about/${imgPath}`}
          alt={imgPath}
          height={100}
          width={60}
          className="w-32 h-32"
          unoptimized
        />
      </div>
      <div className="flex-[2] flex items-center">
        <div>
          <h3 className="text-[#134576] text-3xl font-semibold mb-2">
            {heading}
          </h3>
          <p className="text-[#134576] font-semibold">{text}</p>
        </div>
      </div>
    </div>
  );
};

export const MissionCardWrapper: React.FC<MissionWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".mission-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="columns-1 lg:columns-2 max-w-7xl gap-5">
      {children}
    </section>
  );
};
