"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { Poppins } from "next/font/google";
import EventCard from "@/app/components/activity/EventCard";
import { upcomingEvents, type EventData } from "../../../../lib/activityData";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SectionHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setFilteredEvents(upcomingEvents);
  }, []);

  useEffect(() => {
    const results = upcomingEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm]);

  // Animate header, search, and subheading
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(searchRef.current, {
        scrollTrigger: {
          trigger: searchRef.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(subheadingRef.current, {
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#10926C]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-42">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <h1 className={`${poppins.variable} text-[#FFF1AA] text-4xl sm:text-5xl lg:text-8xl font-bold mr-4`}>
              {`WHAT'S NEWS AT`}
            </h1>
            <div className="flex items-center justify-center">
              <Image
                width={100}
                height={100}
                alt=""
                src={"/img/icons/signAsk.png"}
                className="w-14"
              />
            </div>
          </div>
          <h2 className={`${poppins.variable} text-[#8DD3BF] ml-[30rem] text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8`}>
            SRE PENS
          </h2>
        </div>

        {/* Search Section */}
        <div ref={searchRef} className="flex flex-col sm:flex-row sm:justify-start mb-8">
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

        {/* Upcoming Events Section */}
        <div>
          <h3
            ref={subheadingRef}
            className={`${poppins.variable} text-3xl font-bold text-gray-800 mb-8`}
          >
            Upcoming Event
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className={`${poppins.variable} text-gray-600 text-lg`}>
                No events found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SectionHome;
