"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import {
  MissionCardWrapper,
  MissionCard,
} from "../../components/about/MissionCard";

// --- FONT SETUP ---
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf", // Pastikan path ini benar
  variable: "--font-akira",
  display: "swap",
});

// --- SUB-COMPONENT: NOISE OVERLAY ---
// Memberikan tekstur "grain" agar warna solid terlihat lebih premium
const NoiseOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="7"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

export default function Vismis() {
  const containerRef = useRef(null);

  // --- VARIANTS (Explicitly Typed) ---
  // PERBAIKAN 2: Tambahkan tipe ': Variants'
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      // Rounded Top besar & Negative Margin untuk efek tumpuk
      className={`relative w-full min-h-screen pt-32 pb-32 -mt-20 z-20 rounded-t-[3rem] lg:rounded-t-[5rem] bg-[#F2C601] text-[#012e21] overflow-hidden ${poppins.variable} ${akira.variable}`}
      data-scroll-section
    >
      <NoiseOverlay />

      {/* --- VISION SECTION --- */}
      <div className="container mx-auto px-6 md:px-10 mb-40 relative z-10">
        <div className="flex flex-col items-center text-center relative">
          {/* Judul Besar */}
          <div className="relative inline-block mb-12">
            {/* Icon Melayang */}
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="max-w-5xl"
          >
            <p className="font-poppins text-2xl lg:text-4xl font-medium leading-relaxed tracking-tight text-[#022E21]">
              &ldquo;Raise interest and spread insight regarding Renewable
              Energy by developing innovation, exchanging ideas, and
              facilitating active student participation.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- MISSION SECTION --- */}
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

        {/* Grid Kartu */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <MissionCardWrapper>
            <motion.div variants={itemVariants} className="w-full">
              <MissionCard
                imgPath="math.gif"
                heading="Education"
                text="Disseminating knowledge and implementing the development of renewable energy that is green and sustainable."
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <MissionCard
                imgPath="eco-earth.gif"
                heading="Environment"
                text="Reducing the impact of conventional energy, preserving culture, and protecting the Earth."
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <MissionCard
                imgPath="wind-turbine.gif"
                heading="Technology"
                text="Developing cutting-edge innovations to increase the capacity and benefits of renewable energy."
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <MissionCard
                imgPath="renewable-energy.gif"
                heading="Law"
                text="Supporting the transition from conventional energy to green energy to achieve Indonesia's net zero emission target."
              />
            </motion.div>
          </MissionCardWrapper>
        </motion.div>
      </div>
    </section>
  );
}
