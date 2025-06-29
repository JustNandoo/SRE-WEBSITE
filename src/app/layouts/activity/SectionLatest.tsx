"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { latestActivities } from "../../../../lib/activityLatestData";
import ActivityLatestCard from "@/app/components/activity/ActivityLatestCard";
import { Poppins } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

const SectionLatest: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0,
          y: -30,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (cardsWrapperRef.current) {
        gsap.from(cardsWrapperRef.current.children, {
          scrollTrigger: {
            trigger: cardsWrapperRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10926C] to-[#134576]" ref={sectionRef}>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-32">
        {/* Header */}
        <div className="mb-8">
          <h2
            ref={headingRef}
            className={`text-3xl md:text-4xl font-bold text-white ${poppins.variable}`}
          >
            Our Latest Activity
          </h2>
        </div>

        {/* Activity Cards */}
        <div className="space-y-4" ref={cardsWrapperRef}>
          {latestActivities.map((activity) => (
            <ActivityLatestCard
              key={activity.id}
              activity={activity}
              index={parseInt(activity.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SectionLatest;
