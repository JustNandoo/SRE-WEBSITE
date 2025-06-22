"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "100",
});

export default function Home() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const petikRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-hero",
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
        .fromTo(
          iconRef.current,
          { scale: 0, opacity: 0, rotate: 0 },
          {
            scale: 1,
            opacity: 1,
            rotate: 360,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .fromTo(
          petikRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute w-full h-full brightness-50 bg-[url('/img/bg/bg1.jpg')] bg-cover bg-fixed bg-center"></div>

      {/* Content */}
      <div
        className={`home-hero relative flex flex-col items-center text-center text-white ${poppins.variable} pt-24`}
      >
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold">
          <span ref={line1Ref} className="block">
            Society of
          </span>

          <span ref={line2Ref} className="relative inline-block">
            Renewable{" "}
            <Image
              ref={iconRef}
              src="/img/icons/Union.svg"
              alt="icon"
              height={100}
              width={150}
              className="absolute h-auto -right-[15%] sm:left-[90%] md:left-[90%] -top-[45%] sm:-top-[70%] md:-top-[50%] w-14 sm:w-20 lg:w-26"
            />
          </span>

          <br />

          <span ref={line3Ref} className="relative inline-block">
            <Image
              ref={petikRef}
              src="/img/icons/UnionPetik.png"
              alt="petik"
              height={100}
              width={60}
              className="absolute -left-[12%] sm:-left-[12%] top-[40%] sm:top-[45%] md:top-[25%] lg:-left-[10%] lg:top-[55%] w-8 md:w-12"
            />
            Energy
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="sm:text-sm md:text-lg mt-10 sm:mt-12 md:mt-16 font-extrabold tracking-wide"
        >
          Politeknik Elektronika Negeri Surabaya
        </p>
      </div>
    </div>
  );
}
