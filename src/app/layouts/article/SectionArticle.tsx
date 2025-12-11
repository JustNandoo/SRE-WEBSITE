"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArticleCard from "@/app/components/article/ArticleCard";
import { articleContent } from "@/lib/articleData";
import { Poppins } from "next/font/google";
import { FaSearch } from "react-icons/fa";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articleContent);

  useEffect(() => {
    const results = articleContent.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm]);

  return (
    <section
      className={`min-h-screen bg-[#012e21] relative ${poppins.variable}`}
      data-scroll-section
    >
      {/* Background Decor */}
      <div
        className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-[#134576] to-transparent pointer-events-none"
        data-scroll
        data-scroll-speed="-0.5"
      />

      <div className="container mx-auto px-6 md:px-10 py-24 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
            <div>
              <span className="text-[#F2C601] font-mono text-sm tracking-widest uppercase mb-2 block">
                Our Journal
              </span>
              <h2
                className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none"
                data-scroll
                data-scroll-speed="0.1"
                data-scroll-direction="horizontal"
              >
                LATEST
                <br />
                <span className="text-white/20">ARTICLE</span>
              </h2>
            </div>

            {/* Search */}
            <div className="w-full md:w-auto relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#F2C601] transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[300px] bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-[#F2C601] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  layout
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  // Parallax ringan
                  data-scroll
                  data-scroll-speed={index % 2 === 0 ? "0" : "0.05"}
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
                className="col-span-full py-20 text-center"
              >
                <p className="text-white/40 text-xl font-serif italic">
                  No articles found.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
