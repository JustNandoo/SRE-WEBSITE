"use client";

import { Poppins } from "next/font/google";
// import Link from "next/link";
import React from "react";
import Image from "next/image";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export default function NotFound() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image with overlay */}
      <div className="absolute w-full h-full brightness-50 bg-[url('/img/bg/bg1.jpg')] bg-cover bg-fixed bg-center z-0"></div>

      {/* Text Content */}
      <Image
        src="/img/icons/404.svg"
        alt="404"
        width={100}
        height={100}
        priority
        className="w-96 h-96 absolute z-20 items-center justify-center mx-auto"
      />
      <Image
        src="/img/icons/lineCable.svg"
        alt="404"
        width={100}
        height={100}
        priority
        className="w-32 h-32 absolute z-20 bottom-0 right-115"
      />
      <div
        className={`relative z-10 flex flex-col items-center text-center text-white ${poppins.variable} px-4`}
      >
        <h2 className="text-md md:text-lg font-bold mt-2 drop-shadow-md">
          Oops. The page were you looking for doesn’t exist.
        </h2>
      </div>
    </div>
  );
}
