"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { articleContent, Article } from "@/lib/articleData";
import ArticleCard from "@/app/components/article/ArticleCard";
import { Poppins } from "next/font/google";
import { FaArrowRight, FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// --- SUB-COMPONENT: NOISE OVERLAY ---
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.04] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// --- HELPER ---
const truncateText = (text: string, maxLength: number) =>
  text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

// --- KOMPONEN FEATURED HERO ---
const FeaturedArticle = ({ article }: { article: Article }) => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-[#022321]">
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        data-scroll
        data-scroll-speed="-0.5"
      >
        <Image
          src={article.image || "/img/default.jpg"}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022321] via-[#022321]/50 to-transparent opacity-90" />
      </div>

      {/* 2. CONTENT */}
      <div
        className="absolute inset-0 flex flex-col justify-end z-10 pb-16 sm:pb-24 px-6 sm:px-10 md:px-16"
        data-scroll
        data-scroll-speed="0.1"
      >
        <div className="container mx-auto border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-3 flex flex-col gap-4 text-white/80">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-start gap-3"
              >
                <span className="bg-[#F2C601] text-[#022321] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  Featured Story
                </span>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mt-2">
                  <FaCalendarAlt className="text-[#F2C601]" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                  <FaUser className="text-[#F2C601]" />
                  <span>{article.author || "SRE Team"}</span>
                </div>
              </motion.div>
            </div>

            {/* Title */}
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
              >
                {truncateText(article.title, 90)}
              </motion.h1>
            </div>

            {/* CTA */}
            <div className="lg:col-span-2 flex lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href={`/article/${article.id}`}
                  className="group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#F2C601] hover:border-[#F2C601] transition-all duration-300"
                >
                  <FaArrowRight className="text-white group-hover:text-[#022321] text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN MARQUEE ---
const MarqueeSeparator = () => (
  <div
    className="bg-[#F2C601] py-3 overflow-hidden relative z-20 -mt-1 border-y border-[#022321]"
  >
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="text-[#022321] text-sm md:text-base font-black uppercase tracking-[0.2em] mx-8 flex items-center gap-4"
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="2"
        >
          Latest Insights{" "}
          <span className="w-2 h-2 bg-[#022321] rounded-full"></span>
          Research <span className="w-2 h-2 bg-[#022321] rounded-full"></span>
          Technology <span className="w-2 h-2 bg-[#022321] rounded-full"></span>
        </span>
      ))}
    </div>
  </div>
);

// --- MAIN SECTION ---
const SectionHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [randomArticle, setRandomArticle] = useState<Article | null>(null);

  const filteredArticles = articleContent.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setRandomArticle(
      articleContent[Math.floor(Math.random() * articleContent.length)]
    );
  }, []);

  return (
    <section
      className={`relative bg-linear-to-b from-[#185897] to-[#012e21] min-h-screen ${poppins.variable}`}
      data-scroll-section
    >
      <NoiseOverlay />

      {randomArticle && <FeaturedArticle article={randomArticle} />}

      <MarqueeSeparator />

      <div className="container mx-auto px-6 md:px-10 py-24 md:py-32 relative z-10">
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12 border-b border-white/10 pb-12">
          <div className="relative">
            <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none">
              EXPLORE
              <br />
              <span
                className="text-transparent stroke-text block opacity-30"
                style={{ WebkitTextStroke: "1px #fff" }}
              >
                ARTICLES
              </span>
            </h2>
          </div>

          <div className="w-full lg:w-auto">
            <div className="relative group w-full lg:min-w-[400px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                <FaSearch className="text-white/30 group-focus-within:text-[#F2C601] transition-colors text-lg" />
              </div>
              <input
                type="text"
                placeholder="Find interesting topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-8 text-white text-lg placeholder-white/20 focus:outline-none focus:border-[#F2C601]/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  layout
                  key={article.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  data-scroll
                  data-scroll-speed={index % 3 === 1 ? "0.1" : "0"}
                >
                  <ArticleCard
                    id={Number(article.id)}
                    title={article.title}
                    image={article.image}
                    description={article.description}
                    date={article.date}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center"
              >
                <h3 className="text-2xl text-white/30 font-serif italic">
                  No articles found matching "{searchTerm}".
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionHome;
