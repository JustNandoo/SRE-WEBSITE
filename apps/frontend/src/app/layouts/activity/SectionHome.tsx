"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { FaSearch } from "react-icons/fa";
import EventCard from "@/app/components/activity/ActivityCard";
import { upcomingEvents, type EventData } from "@/lib/activityData";
import { fetchActivities } from "@/services/api";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SectionHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activitiesData, setActivitiesData] = useState<EventData[]>(upcomingEvents);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>(upcomingEvents);

  useEffect(() => {
    async function loadData() {
      const data = await fetchActivities();
      if (data && data.length > 0) {
        setActivitiesData(data);
        setFilteredEvents(data);
      }
    }
    loadData();
  }, []);

  // Logic Search Filter
  useEffect(() => {
    const results = activitiesData.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, activitiesData]);

  return (
    <section
      className={`min-h-screen bg-gradient-to-b from-[#10926C] to-[#012e21] relative overflow-hidden ${poppins.variable}`}
      data-scroll-section
    >
      {/* BACKGROUND DECORATION (Parallax Text) */}
      <div
        className="absolute top-[15%] -right-20 whitespace-nowrap opacity-[0.05] pointer-events-none select-none"
        data-scroll
        data-scroll-speed="-2"
      >
        <h1 className="text-[25vw] font-black text-[#F2C601] leading-none">
          EVENTS
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-32 md:py-40 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col mb-20 md:mb-28">
          {/* Label Kecil */}
          <div className="flex items-center gap-3 mb-6 transition-all duration-700 ease-out translate-y-0 opacity-100">
            <div className="w-10 h-0.5 bg-[#F2C601]"></div>
            <span className="text-[#F2C601] font-mono tracking-widest text-sm uppercase">
              Plan & Activities
            </span>
          </div>

          {/* Massive Title */}
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <h1 className="text-[10vw] md:text-[7rem] font-bold text-white leading-[0.9] tracking-tighter transition-transform duration-700 ease-out translate-y-0">
                <span className="block" data-scroll data-scroll-speed="0.2">
                  WHAT&apos;S NEWS AT
                </span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1
                className="text-[10vw] md:text-[7rem] font-black text-[#F2C601] leading-[0.9] tracking-tighter transition-transform duration-700 delay-100 ease-out translate-y-0"
                style={{
                  WebkitTextStroke: "1px #F2C601",
                  color: "transparent",
                }} // Outline Effect Gold
              >
                <span className="block" data-scroll data-scroll-speed="0.1">
                  SRE PENS
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR (Floating Glass) --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-10">
          <div className="max-w-md">
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Join our workshops, seminars, and community gatherings. Stay
              updated with the latest movement in renewable energy.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <FaSearch className="text-white/40 group-focus-within:text-[#F2C601] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Find events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C601]/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* --- EVENTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="h-full transition-all duration-500 ease-out hover:-translate-y-2"
              >
                {/* Wrapper untuk Activity Card */}
                <div className="h-full">
                  <EventCard event={event} index={index} />
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="col-span-full py-20 text-center animate-pulse">
              <h3 className="text-2xl text-white/40 font-mono">
                No events found.
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-[#F2C601] underline hover:text-white transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}