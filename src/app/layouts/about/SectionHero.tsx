"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      imageRef.current,
      {
        y: 60, // 👈 ini dia
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <div ref={sectionRef} className="w-full relative pt-32 bg-[#012e21]">
      <div className="relative bottom-0">
        <h1
          ref={headingRef}
          className="font-extrabold text-7xl lg:text-[14rem] text-white text-center"
        >
          About Us
        </h1>
        <Image
          ref={imageRef}
          src="/img/icons/about/face-hero.svg"
          alt="union.svg"
          width={50}
          height={50}
          className="w-full"
        />
      </div>
    </div>
  );
}
