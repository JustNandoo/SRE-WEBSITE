"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import localFont from "next/font/local";

// Pastikan file Akira.otf benar-benar ada di folder public/fonts atau src/fonts
// Sesuaikan path "../.." ini dengan struktur foldermu
const akira = localFont({
  src: "../../fonts/Akira.otf", 
  variable: "--font-akira",
  display: "swap", // Penting: agar teks muncul dulu walaupun font belum load
});

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Range wrap disesuaikan (-20% sampai -45%) agar looping mulus
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap w-full">
      <motion.div 
        className="scroller font-akira text-[8vw] md:text-[6vw] uppercase font-bold flex whitespace-nowrap gap-10" 
        style={{ x }}
      >
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section 
      // Jika marquee tetap tidak muncul, coba hapus 'data-scroll-section' ini dulu
      data-scroll-section 
      className={`relative z-30 w-full bg-[#012e21] border-y border-[#fff0aa] overflow-hidden ${akira.variable}`}
    >
      {/* Background Container */}
      <div className="flex flex-col gap-2 py-2 md:py-6 text-[#fff0aa]">
         <ParallaxText baseVelocity={2}>SRE PENS • Go Green • Go Innovation</ParallaxText>
      </div>
    </section>
  );
}