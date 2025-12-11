"use client";

import React, { useState, useEffect } from "react";
// PERBAIKAN 1: Import tipe 'Variants'
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Poppins } from "next/font/google";
import { FaSearch } from "react-icons/fa";
import EventCard from "@/app/components/activity/ActivityCard";
import { upcomingEvents, type EventData } from "@/lib/activityData";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SectionHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] =
    useState<EventData[]>(upcomingEvents);

  // Logic Search Filter
  useEffect(() => {
    const results = upcomingEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm]);

  // Framer Motion Variants (Explicitly Typed)
  // PERBAIKAN 2: Tambahkan tipe ': Variants' pada objek animasi
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <section
      className={`min-h-screen bg-[#10926C] relative overflow-hidden ${poppins.variable}`}
      data-scroll-section
    >
      {/* BACKGROUND DECORATION (Parallax Text) */}
      <div
        className="absolute top-[15%] -right-20 whitespace-nowrap opacity-[0.05] pointer-events-none select-none"
        data-scroll
        data-scroll-speed="-2"
      >
        <h1 className="text-[25vw] font-black text-[#F2C601] leading-none">
          EVENTS
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-32 md:py-40 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col mb-20 md:mb-28">
          {/* Label Kecil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-0.5 bg-[#F2C601]"></div>
            <span className="text-[#F2C601] font-mono tracking-widest text-sm uppercase">
              Agenda & Activities
            </span>
          </motion.div>

          {/* Massive Title */}
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="text-[10vw] md:text-[7rem] font-bold text-white leading-[0.9] tracking-tighter"
              >
                <span className="block" data-scroll data-scroll-speed="0.2">
                  WHAT&apos;S NEW AT
                </span>
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-[10vw] md:text-[7rem] font-black text-[#F2C601] leading-[0.9] tracking-tighter"
                style={{
                  WebkitTextStroke: "1px #F2C601",
                  color: "transparent",
                }} // Outline Effect Gold
              >
                <span className="block" data-scroll data-scroll-speed="0.1">
                  SRE PENS
                </span>
              </motion.h1>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR (Floating Glass) --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-10">
          <div className="max-w-md">
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Join our workshops, seminars, and community gatherings. Stay
              updated with the latest movement in renewable energy.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <FaSearch className="text-white/40 group-focus-within:text-[#F2C601] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Find events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C601]/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* --- EVENTS GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  layout
                  className="h-full"
                >
                  {/* Wrapper untuk Activity Card */}
                  <div className="h-full">
                    <EventCard event={event} index={index} />
                  </div>
                </motion.div>
              ))
            ) : (
              // Empty State
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <h3 className="text-2xl text-white/40 font-mono">
                  No events found.
                </h3>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-[#F2C601] underline hover:text-white transition-colors"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}