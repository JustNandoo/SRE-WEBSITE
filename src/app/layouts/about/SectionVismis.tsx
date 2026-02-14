"use client";

import Image from "next/image";
import { useRef } from "react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import {
  MissionCardWrapper,
  MissionCard,
} from "../../components/about/MissionCard";

// ================= FONT =================
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

// ================= NOISE =================
const NoiseOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="7" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

export default function Vismis() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      data-scroll-section
      className={`relative w-full min-h-screen pt-32 pb-32 -mt-20 z-20 rounded-t-[3rem] lg:rounded-t-[5rem] bg-[#F2C601] text-[#012e21] overflow-hidden ${poppins.variable} ${akira.variable}`}
    >
      <NoiseOverlay />

      {/* ================= VISION ================= */}
      <div className="container mx-auto px-6 md:px-10 mb-40 relative z-10">
        <div className="flex flex-col items-center text-center relative">
          <div className="relative inline-block mb-12">
            {/* Floating Icon */}
            <div
              data-scroll
              data-scroll-speed="0.4"
              className="absolute -top-12 -right-8 lg:-top-20 lg:-right-10 z-10"
            >
              <Image
                src="/img/icons/about/BalingBiru.svg"
                alt="Decoration"
                width={160}
                height={160}
                className="w-24 h-24 lg:w-48 lg:h-48 opacity-90 drop-shadow-xl"
              />
            </div>

            <h2
              data-scroll
              data-scroll-speed="0.1"
              className="font-akira text-[18vw] lg:text-[14rem] leading-[0.8] text-[#10926C] font-bold uppercase mix-blend-multiply opacity-90"
            >
              Vision
            </h2>
          </div>

          <div className="max-w-5xl">
            <p className="font-poppins text-2xl lg:text-4xl font-medium leading-relaxed tracking-tight text-[#022E21]">
              &ldquo;Raise interest and spread insight regarding Renewable Energy
              by developing innovation, exchanging ideas, and facilitating
              active student participation.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ================= MISSION ================= */}
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-20 lg:mb-28 px-4 border-b-2 border-[#022E21]/10 pb-10">
          <div data-scroll data-scroll-speed="0.2">
            <div className="w-20 h-20 lg:w-28 lg:h-28 bg-[#022E21] rounded-full flex items-center justify-center mb-2 shadow-xl">
              <Image
                src="/img/icons/about/Panel.svg"
                alt="Panel"
                width={60}
                height={60}
                className="w-10 h-10 lg:w-14 lg:h-14 invert"
              />
            </div>
          </div>

          <h2 className="font-akira text-6xl lg:text-8xl text-[#022E21] tracking-tighter leading-none">
            Our <br /> Mission
          </h2>
        </div>

        {/* Mission Cards Grid */}
        <div className="w-full">
          <MissionCardWrapper>
            {[
              {
                img: "math.gif",
                title: "Education",
                text: "Disseminating knowledge and implementing the development of renewable energy that is green and sustainable.",
              },
              {
                img: "eco-earth.gif",
                title: "Environment",
                text: "Reducing the impact of conventional energy, preserving culture, and protecting the Earth.",
              },
              {
                img: "wind-turbine.gif",
                title: "Technology",
                text: "Developing cutting-edge innovations to increase the capacity and benefits of renewable energy.",
              },
              {
                img: "renewable-energy.gif",
                title: "Law",
                text: "Supporting the transition from conventional energy to green energy to achieve Indonesia's net zero emission target.",
              },
            ].map((item, i) => (
              <div key={i} className="w-full">
                <MissionCard
                  imgPath={item.img}
                  heading={item.title}
                  text={item.text}
                />
              </div>
            ))}
          </MissionCardWrapper>
        </div>
      </div>
    </section>
  );
}