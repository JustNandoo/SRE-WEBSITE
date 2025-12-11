"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { latestActivities } from "@/lib/activityLatestData";
import ActivityLatestCard from "@/app/components/activity/ActivityLatestCard";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SectionLatest() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-linear-to-b from-[#10926C] to-[#012e21] ${poppins.variable} pb-32`}
      data-scroll-section
    >
      {/* --- HEADER SECTION --- */}
      <div className="container mx-auto px-6 md:px-10 pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#F2C601] animate-pulse"></span>
            <span className="text-white font-mono text-xs uppercase tracking-widest">
              Journey Log
            </span>
          </motion.div>

          <div className="relative">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none z-10 relative"
            >
              LATEST ACTIVITY
            </motion.h1>
            <h1
              className="absolute top-1 left-1 text-5xl md:text-7xl lg:text-8xl font-black text-transparent stroke-text tracking-tighter leading-none opacity-20 blur-sm pointer-events-none"
              style={{ WebkitTextStroke: "1px white" }}
            >
              LATEST ACTIVITY
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 mt-6 max-w-md font-light text-sm md:text-base"
          >
            Discover our recent milestones, workshops, and community events that
            drive the renewable energy movement forward.
          </motion.p>
        </div>
      </div>

      {/* --- GRID 2 KOLOM --- */}
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
          {latestActivities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i % 2 === 0 ? 0 : 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              data-scroll
              data-scroll-speed={i % 2 === 0 ? "0" : "0.1"}
              className={i % 2 !== 0 ? "lg:mt-2" : ""}
            >
              {/* Wrapper untuk hover effect container */}
              <div className="relative bg-[#fff0aa] rounded-4xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2">
                <ActivityLatestCard activity={activity} index={i} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
