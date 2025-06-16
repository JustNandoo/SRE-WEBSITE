"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "100",
});

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute w-full h-full brightness-50 bg-[url('/img/bg/bg1.jpg')] bg-cover bg-fixed bg-center"></div>

      {/* Text Content */}
      <div
        className={`relative flex flex-col items-center text-center text-white ${poppins.variable} pt-24`}
      >
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold">
          Society of <br />
          <span className="relative inline-block">
            Renewable{" "}
            <Image
              src="/img/icons/Union.svg"
              alt="image"
              height={100}
              width={150}
              className="absolute h-auto -right-[15%] sm:left-[90%] md:left-[90%] -top-[45%] sm:-top-[70%] md:-top-[50%] w-14 sm:w-20 lg:w-26"
            />
          </span>
          <br />
          <span className="relative inline-block">
            <Image
              src="/img/icons/UnionPetik.png"
              alt="image"
              height={100}
              width={60}
              className="absolute -left-[12%] sm:-left-[12%] top-[40%] sm:top-[45%] md:top-[25%] lg:-left-[10%] lg:top-[55%] w-8 md:w-12"
            />
            Energy
          </span>
        </h1>
        <p className="sm:text-sm md:text-lg mt-10 sm:mt-12 md:mt-16 font-extrabold tracking-wide">
          Politeknik Elektronika Negeri Surabaya
        </p>
      </div>
    </div>
  );
}
