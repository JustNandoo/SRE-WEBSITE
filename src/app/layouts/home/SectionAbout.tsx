"use client";
// import Image from "next/image";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
});

export default function About() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
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

  return (
    <div>
      {/* // bg back */}
      <div
        className={`absolute inset-0 -z-10 bg-[url('/img/bg/bg1.jpg')] brightness-50 bg-cover bg-fixed bg-center`}
      ></div>
      {/* bg front */}
      <div className="realtive space-y-10 rounded-t-[5vw] bg-[url('/img/bg/bg4.png')] bg-cover bg-fixed bg-center">
        <div className="px-4 pt-4 pb-32 lg:px-12 md:px-6 sm:px-4 space-y-10">
          <div className="mt-5">
            {/* slogan welcome */}
            <h3
              className={`text-green-700 font-bold text-lg sm:text-2xl md:text-3xl text-center ${poppins.variable}`}
            >
              ★Hello, Energyzens!★
            </h3>
            {/* heading */}
            <div className="flex flex-col leading-none mt-10">
              {/* h2 tetap di kiri */}
              <h2
                className={`self-start text-[#022E21] font-extrabold text-lg text-[2rem] md:text-[3rem] lg:text-[4rem] ${poppins.variable}`}
              >
                About
              </h2>
              {/* h1 berada di tengah */}
              <h1
                className={`self-center text-green-700 font-extrabold text-[5.45rem] md:text-[6.9rem] lg:text-[10rem] xl:text-[11.55rem] ${akira.className}`}
              >
                SRE <span className="text-[#134576]">PENS</span>
              </h1>
            </div>
            {/* Description */}
            <p className="text-gray-800 text-sm sm:text-sm md:text-lg mt-12 text-center leading-relaxed max-w-2xl mx-auto">
              <span className="font-extrabold">SRE PENS</span> is a{" "}
              <span className="text-[#134576] font-bold">
                Student Chapter
              </span>{" "}
              that pays attention to Renewable Energy issues, accommodates the
              knowledge of PENS students in Renewable Energy, and is able to
              implement innovations related to the sustainability of the energy
              transition.
            </p>
          </div>
          {/* button */}
          <Link
            ref={buttonRef}
            href="#"
            className="flex max-w-md mx-auto items-center justify-center py-3 px-6 sm:px-4 md:px-8 rounded-full font-medium text-white bg-[#012e21] border-2 border-[#fff0aa] shadow-lg transition-all hover:shadow-sm"
            onMouseEnter={() => hoverAnimation?.play()}
            onMouseLeave={() => hoverAnimation?.reverse()}
          >
            More About SRE PENS
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
          <div className="flex flex-col items-center justify-center space-y-2">
            <h4
              className={`text-[#fff1aa] font-extrabold text-2xl md:text-3xl lg:text-4xl text-center mt-32 ${poppins.variable}`}
            >
              Part of <span className="text-[#022E21]">SRE Indonesia</span>
            </h4>
            <Link
              href={"#"}
              className="text-[#F2C601] font-bold text-md md:text-xl lg:text-2xl underline flex sm:font-semibold items-center justify-center"
            >
              Official Website
              <svg
                className="w-5 h-5 ml-2 -mr-1 mt-2"
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
    </div>
  );
}
