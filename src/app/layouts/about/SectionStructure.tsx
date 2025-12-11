"use client";

import React, { useRef } from "react";
// PERBAIKAN 1: Import tipe 'Variants'
import { motion, useInView, Variants } from "framer-motion";

// --- DATA STRUKTUR ORGANISASI ---
const divisions = [
  // 1. ADVISOR
  {
    id: "01",
    title: "Advisor",
    role: "Advisory Board",
    desc: "Providing guidance and strategic direction for the organization.",
    colSpan: "md:col-span-1 lg:col-span-1",
    bgClass: "bg-[#fff0aa]/10 hover:bg-[#fff0aa]/20 border-[#fff0aa]/20",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-80",
  },
  // 2. PRESIDENT & VP
  {
    id: "02",
    title: "President & Vice President",
    role: "Top Leadership",
    desc: "Leading SRE PENS towards achieving its vision and mission.",
    colSpan: "md:col-span-2 lg:col-span-3",
    bgClass: "bg-[#F2C601] hover:bg-[#d9b200] border-transparent",
    textClass: "text-[#012e21]",
    iconColor: "opacity-100",
  },
  // 3. SECRETARY
  {
    id: "03",
    title: "Secretary",
    role: "Administration",
    desc: "Managing archives, correspondence, and administrative tasks.",
    colSpan: "md:col-span-1 lg:col-span-1",
    bgClass: "bg-[#fff0aa]/5 hover:bg-[#fff0aa]/10 border-[#fff0aa]/10",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-60",
  },
  // 4. TREASURER
  {
    id: "04",
    title: "Treasurer",
    role: "Financial Keeper",
    desc: "Responsible for managing the organization's treasury and cash flow.",
    colSpan: "md:col-span-1 lg:col-span-1",
    bgClass: "bg-[#fff0aa]/5 hover:bg-[#fff0aa]/10 border-[#fff0aa]/10",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-60",
  },
  // 5. FINANCE
  {
    id: "05",
    title: "Finance",
    role: "Funding & Budgeting",
    desc: "Strategizing fundraising and financial planning.",
    colSpan: "md:col-span-1 lg:col-span-1",
    bgClass: "bg-[#fff0aa]/5 hover:bg-[#fff0aa]/10 border-[#fff0aa]/10",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-60",
  },
  // 6. STRATEGIC RESOURCE MANAGEMENT
  {
    id: "06",
    title: "Strategic Resource Management",
    role: "Public Relation • Human Resources",
    desc: "Focusing on external relations and internal member development.",
    colSpan: "md:col-span-3 lg:col-span-2",
    bgClass: "bg-[#fff0aa]/5 hover:bg-[#fff0aa]/10 border-[#fff0aa]/10",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-60",
  },
  // 7. PROJECT MANAGEMENT
  {
    id: "07",
    title: "Project Management",
    role: "Competition • Research • Education",
    desc: "Executing projects, research competitions, and educational programs.",
    colSpan: "md:col-span-3 lg:col-span-2",
    bgClass: "bg-[#fff0aa]/5 hover:bg-[#fff0aa]/10 border-[#fff0aa]/10",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-60",
  },
  // 8. CREATIVE MEDIA
  {
    id: "08",
    title: "Creative Media",
    role: "Design • Content • Web Dev",
    desc: "Managing visual identity, social media content, and web development.",
    colSpan: "md:col-span-2 lg:col-span-4",
    bgClass: "bg-[#134576] hover:bg-[#0f3a63] border-transparent",
    textClass: "text-[#fff0aa]",
    iconColor: "opacity-80",
  },
];

// PERBAIKAN 2: Tambahkan tipe ': Variants' pada objek animasi
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

export default function Structure() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#012e21] py-24 px-4 md:px-10 overflow-hidden"
      data-scroll-section
    >
      {/* BACKGROUND DECORATION (PARALLAX) */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        data-scroll
        data-scroll-speed="-0.5"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              data-scroll
              data-scroll-speed="0.2"
              className="text-5xl md:text-7xl lg:text-8xl font-black text-[#F2C601] uppercase tracking-tighter leading-[0.9]"
            >
              Our <br /> Structure
            </motion.h2>
          </div>
          <div
            className="max-w-md text-[#fff0aa]/80 text-sm md:text-base font-light"
            data-scroll
            data-scroll-speed="0.1"
          >
            <p>
              A solid hierarchy ensures smooth operations. Meet the divisions
              that drive innovation at SRE PENS.
            </p>
          </div>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {divisions.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className={`
                ${item.colSpan} 
                ${item.bgClass} 
                ${item.textClass}
                relative p-6 md:p-8 rounded-3xl border
                flex flex-col justify-between min-h-[200px]
                group transition-colors duration-500 cursor-default
              `}
            >
              {/* Top: Number & Arrow */}
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`font-mono text-xs border border-current px-2 py-1 rounded-full ${item.iconColor}`}
                >
                  {item.id}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              {/* Bottom: Title, Role & Desc */}
              <div>
                <span className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">
                  {item.role}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-none mb-3">
                  {item.title}
                </h3>
                <p className="text-sm opacity-80 line-clamp-3 font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}