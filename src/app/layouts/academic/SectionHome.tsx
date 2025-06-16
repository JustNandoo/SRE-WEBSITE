"use client"

import React, { useState, useEffect } from 'react';
import AcademicCard, { AcademicCardProps } from '../../components/academic/AcademicCard';
import { academicContent } from '../../../../lib/academicData';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});


export default function AcademicSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState<AcademicCardProps[]>([]);
  
  // Filter cards based on search term
  useEffect(() => {
    const results = academicContent.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.category && card.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCards(results);
  }, [searchTerm]);

  // Initialize filtered cards with all cards
  useEffect(() => {
    setFilteredCards(academicContent);
  }, []);

  return (
    <div className="min-h-screen bg-[#134576]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-32">
        {/* Heading Section - Responsive font sizes */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h1 className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-bold leading-tight flex flex-col ${poppins.variable}`}>
            Hello,<br className="md:hidden" />
            <span className="text-white">Enthusiast!</span>
          </h1>
        </div>

        {/* Search Section - Improved responsive layout */}
        <div className="flex flex-col sm:flex-row sm:justify-end mb-8">
          <div className="w-full sm:w-xl sm:max-w-4xl">
            <p className={`text-white text-sm mb-2 ${poppins.variable}`}>Tired Scrolling? Try searching!</p>
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

        {/* Content Section Title - Adjusted spacing */}
        <h2 className={`text-white text-lg sm:text-xl font-medium mb-4 sm:mb-6 ${poppins.variable}`}>{`'Playlist' for your knowledge`}</h2>

        {/* Content Cards Grid - Responsive grid system */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCards.map((card) => (
            <AcademicCard 
              key={card.id}
              id={card.id}
              title={card.title}
              image={card.image}
              description={card.description}
              category={card.category}
            />
          ))}
        </div>
        
        {/* Show message when no results found */}
        {filteredCards.length === 0 && (
          <div className="text-center py-6 sm:py-10">
            <p className={`${poppins.variable} text-white text-base sm:text-lg`}>No matching academic resources found. Try a different search term.</p>
          </div>
        )}
      </main>
    </div>
  );
}