"use client";

import Link from "next/link";
import Image from "next/image";
// PERBAIKAN 1: Import tipe 'Variants'
import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { upcomingEvents } from "@/lib/activityData"; 

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

// --- ANIMATION VARIANTS (Explicitly Typed) ---
// PERBAIKAN 2: Tambahkan tipe ': Variants' pada setiap objek animasi

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function SectionNews() {
  const truncateTitle = (text: string, maxLength: number): string =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  return (
    <section
      data-scroll-section
      className={`relative py-24 md:py-32 bg-[#012e21] text-[#fff0aa] ${poppins.variable} ${akira.variable}`}
    >
      {/* Decorative Background Lines */}
      <div className="absolute inset-0 w-full h-full border-t border-[#fff0aa]/10 pointer-events-none">
        <div className="absolute left-1/4 h-full w-1 bg-[#fff0aa]/5"></div>
        <div className="absolute left-2/4 h-full w-1 bg-[#fff0aa]/5"></div>
        <div className="absolute left-3/4 h-full w-1 bg-[#fff0aa]/5"></div>
      </div>

      <div className="relative container mx-auto px-6 md:px-10 lg:px-20 flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <div className="w-full mb-20 md:mb-32 flex flex-col items-start">
          
          {/* Small Tag */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-3 h-3 bg-[#134576] rounded-full animate-pulse"></span>
            <span className="font-poppins text-[#fff0aa] font-bold tracking-[0.3em] uppercase text-sm md:text-base">
              Recent Updates
            </span>
          </motion.div>

          {/* MAIN TITLE */}
          <div className="flex flex-col w-full">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="font-akira text-[10vw] md:text-[8vw] leading-tight text-[#fff0aa] uppercase drop-shadow-2xl"
            >
              WHAT&apos;S NEW
            </motion.h2>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="font-akira text-[10vw] md:text-[8vw] leading-tight text-[#fff0aa]/80 uppercase md:ml-24"
            >
              AT SRE PENS
            </motion.h2>
          </div>
        </div>

        {/* --- NEWS GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {upcomingEvents.slice(0, 3).map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              className="group relative flex flex-col h-full border border-[#fff0aa]/20 hover:border-[#fff0aa] transition-colors duration-500 bg-[#012e21]"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-4/3 overflow-hidden border-b border-[#fff0aa]/20">
                {/* PERBAIKAN 3: Typo 'bg-linear-to-t' diganti 'bg-gradient-to-t' jika ada, 
                    tapi di sini menggunakan bg color biasa jadi aman. */}
                <div className="absolute inset-0 bg-[#134576]/0 group-hover:bg-[#134576]/20 z-10 transition-colors duration-500 mix-blend-overlay"></div>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20 bg-[#fff0aa] text-[#012e21] px-3 py-1 text-xs font-akira tracking-wider">
                  {event.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col grow justify-between group-hover:bg-[#fff0aa] transition-colors duration-500">
                <div className="space-y-4">
                  <p className="font-poppins text-xs tracking-widest text-[#fff0aa]/60 group-hover:text-[#012e21]/60 transition-colors">
                    {event.date}
                  </p>
                  <h3 className="font-poppins text-xl md:text-2xl font-semibold leading-tight text-[#fff0aa] group-hover:text-[#012e21] transition-colors duration-500">
                    {truncateTitle(event.title, 50)}
                  </h3>
                  <p className="font-poppins text-sm font-light text-[#fff0aa]/70 line-clamp-3 group-hover:text-[#012e21]/70 transition-colors">
                    {event.description}
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 border border-[#fff0aa]/30 rounded-full flex items-center justify-center group-hover:border-[#012e21]/30 transition-colors">
                    <svg className="w-4 h-4 text-[#fff0aa] group-hover:text-[#012e21] transform -rotate-45 group-hover:rotate-0 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- BUTTON SECTION --- */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-20 w-full flex justify-center"
        >
          <Link
            href="/activity"
            className="group relative inline-flex items-center gap-4 py-4 px-2"
          >
            <span className="font-akira text-[#fff0aa] text-lg hover:text-[#134576] transition-colors duration-300">
              View All Activity
            </span>
            <span className="w-12 h-px bg-[#fff0aa] group-hover:w-20 transition-all duration-300"></span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}