"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function News() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [hoverAnimation, setHoverAnimation] = useState<gsap.core.Tween | null>(
    null
  );

  useEffect(() => {
    if (buttonRef.current) {
      const animation = gsap.to(buttonRef.current, {
        scale: 1.05,
        y: -3,
        boxShadow: "0px 12px 0px 0px rgba(1,46,33, 50%)",
        ease: "power2.out",
        duration: 0.2,
        paused: true,
      });

      setHoverAnimation(animation);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
      });

      // Cards Animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      });

      // Button Animation
      gsap.from(buttonRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-full bg-[url('/img/bg/bg2.png')] bg-cover bg-fixed bg-center"
    >
      <div className="mx-auto h-full flex flex-col items-center px-4 py-8">
        {/* Header section */}
        <div
          ref={headerRef}
          className="w-full flex flex-col items-center mb-4 md:mb-12 px-4"
        >
          <div className="relative w-full max-w-md flex justify-between items-start">
            <div className="flex-1 flex flex-col">
              <h1 className="text-center text-3xl md:text-4xl lg:text-[3.5rem] font-semibold">
                <span className="text-yellow-200">{"WHAT'S NEW AT"}</span>
              </h1>
              <h1 className="text-center md:text-right px-3 text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <span className="text-teal-400">SRE PENS</span>
              </h1>
            </div>

            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 hidden md:block">
              <Image
                src="/img/icons/signAsk.png"
                width={50}
                height={50}
                alt="Decoration icon"
                className="w-10 h-10 md:w-12 md:h-12 lg:w-18 lg:h-18"
              />
            </div>
          </div>
        </div>

        {/* Boxes */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="w-full p-6 bg-[#022E21] rounded-[2rem] shadow-xl space-y-5"
            >
              <div className="flex flex-col -space-y-7 text-[#FFF1AA]">
                <h1 className="text-[3rem] font-bold">Lorem</h1>
                <h1 className="text-[3rem] font-bold">Ipsum</h1>
              </div>
              <p className="text-[#FFF1AA]/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris.
              </p>
              <Image
                src="/img/bg/bg1.jpg"
                width={100}
                height={100}
                alt="Decoration icon"
                className="w-full rounded-[1.5rem]"
              />
            </div>
          ))}
        </div>

        {/* button */}
        <div className="my-20">
          <Link
            ref={buttonRef}
            href="#"
            className="flex max-w-md mx-auto items-center justify-center py-3 px-6 sm:px-4 md:px-8 rounded-full font-medium text-white bg-[#012e21] border-2 border-[#fff0aa] shadow-lg transition-all hover:shadow-sm"
            onMouseEnter={() => hoverAnimation?.play()}
            onMouseLeave={() => hoverAnimation?.reverse()}
          >
            See More Activity
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
