"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import localFont from "next/font/local";

// ================= FONT =================
const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

// ================= TYPES =================
interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

// ================= DESKTOP (lg+) =================
function ParallaxTextDesktop({ children, baseVelocity }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        style={{ x }}
        className="font-akira text-[6vw] uppercase font-bold flex gap-10 whitespace-nowrap"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="mr-10">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ================= MOBILE / TABLET =================
function ParallaxTextMobile({ children }: { children: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <div className="marquee-track font-akira text-[8vw] uppercase font-bold flex gap-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="mr-10">
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}

// ================= MAIN COMPONENT =================
export default function Marquee() {
  return (
    <section
      data-scroll-section
      className={`relative z-30 w-full bg-[#012e21] border-y border-[#fff0aa] overflow-hidden text-[#fff0aa] ${akira.variable}`}
    >
      <div className="py-2 md:py-6">
        {/* MOBILE & TABLET */}
        <div className="block lg:hidden">
          <ParallaxTextMobile>
            SRE PENS • Go Green • Go Innovation
          </ParallaxTextMobile>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <ParallaxTextDesktop baseVelocity={2}>
            SRE PENS • Go Green • Go Innovation
          </ParallaxTextDesktop>
        </div>
      </div>

      {/* CSS KEYFRAMES */}
      <style jsx>{`
        .marquee-track {
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
