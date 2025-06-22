// src/layouts/activity/SectionLatest.tsx
"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Poppins } from "next/font/google";
import { latestActivities } from '../../../../lib/activityLatestData';
import Image from 'next/image';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SectionLatest: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, x: -50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.6, 
            delay: index * 0.1,
            ease: "power2.out" 
          }
        );
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-[#10926C] to-[#134576] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className={`${poppins.variable} text-white text-3xl sm:text-4xl lg:text-5xl font-bold`}>
            Our Latest Activity
          </h1>
        </div>

        {/* Activities List */}
        <div className="space-y-6">
          {latestActivities.map((activity) => (
            <div 
              key={activity.id}
              ref={addToRefs}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/3 relative overflow-hidden">
                  <div className="aspect-[4/3] md:aspect-auto md:h-full">
                    <Image 
                    width={100}
                    height={100}
                      src={activity.image || '/api/placeholder/400/300'} 
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <h3 className={`${poppins.variable} text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight`}>
                      {activity.title || 'Lorem Ipsum'}
                    </h3>
                    
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {activity.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-white/70 text-xs md:text-sm">
                      {activity.date && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {activity.date}
                        </span>
                      )}
                      {activity.date && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {activity.date}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionLatest;