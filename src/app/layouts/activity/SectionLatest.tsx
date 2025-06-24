"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Poppins } from "next/font/google";
import { latestActivities } from '../../../../lib/activityLatestData';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

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
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animate each activity card
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 30,
              scale: 0.98,
              willChange: "transform, opacity",
              transformOrigin: "center",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-b from-[#10926C] to-[#134576] min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className={`${poppins.variable} text-white text-3xl sm:text-4xl lg:text-5xl font-bold`}>
            Our Latest Activity
          </h1>
        </div>

        {/* Activity Cards */}
        <div className="space-y-6">
          {latestActivities.map((activity) => (
            <div
              key={activity.id}
              ref={addToRefs}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02] will-change-transform"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/3 relative">
                  <div className="aspect-[4/3] md:aspect-auto md:h-full">
                    <Image
                      width={100}
                      height={100}
                      src={activity.image || '/api/placeholder/400/300'}
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <h3 className={`${poppins.variable} text-white text-xl md:text-2xl lg:text-3xl font-bold`}>
                      {activity.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      {activity.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-white/70 text-xs md:text-sm">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1..." clipRule="evenodd" />
                        </svg>
                        {activity.date}
                      </span>
                    </div>
                    <div className="pt-2">
                      <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/40">
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
