"use client";

"use client";

import React, { useState, useEffect, useRef } from "react";
import AcademicCard from "../../components/academic/AcademicCard"; // <- import komponen aja
import { academicContent } from "../../../../lib/academicData";
import type { AcademicCardProps } from "../../../../lib/academicData"; // <- ambil tipe datanya dari lib
import { Poppins } from "next/font/google";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

export default function AcademicSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState<AcademicCardProps[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLHeadingElement | null>(null);

  // Filter logic
  useEffect(() => {
    const results = academicContent.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.category &&
          card.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCards(results);
  }, [searchTerm]);

  // Init full data
  useEffect(() => {
    setFilteredCards(academicContent);
  }, []);

  // Animasi Header + Search + Cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Search Animation
      if (searchRef.current) {
        gsap.from(searchRef.current, {
          scrollTrigger: {
            trigger: searchRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      // Playlist Title Animation
      if (playlistRef.current) {
        gsap.from(playlistRef.current, {
          scrollTrigger: {
            trigger: playlistRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0,
          x: -40,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      // Cards Animation
      const cards = gsap.utils.toArray(".academic-card") as HTMLElement[];
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, [filteredCards]);

  return (
    <div className="min-h-screen bg-[#134576]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-32">
        {/* Heading Section */}
        <div ref={headerRef} className="mb-8 sm:mb-12 lg:mb-16">
          <h1
            className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-bold leading-tight flex flex-col ${poppins.variable}`}
          >
            Hello,
            <br className="md:hidden" />
            <span className="text-white">Enthusiast!</span>
          </h1>
        </div>

        {/* Search Section */}
        <div
          ref={searchRef}
          className="flex flex-col sm:flex-row sm:justify-end mb-8"
        >
          <div className="w-full sm:w-xl sm:max-w-4xl">
            <p className={`text-white text-sm mb-2 ${poppins.variable}`}>
              Tired Scrolling? Try searching!
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Keyword..."
                className="w-full py-2 px-4 pr-10 rounded-full bg-gray-200/80 text-gray-800 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Section Subtitle */}
        <h2
          ref={playlistRef}
          className={`text-white text-lg sm:text-xl font-medium mb-4 sm:mb-6 ${poppins.variable}`}
        >{`'Playlist' for your knowledge`}</h2>

        {/* Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredCards.map((card) => (
            <div key={card.id} className="academic-card">
              <AcademicCard {...card} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCards.length === 0 && (
          <div className="text-center py-6 sm:py-10">
            <p
              className={`${poppins.variable} text-white text-base sm:text-lg`}
            >
              No matching academic resources found. Try a different search term.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
