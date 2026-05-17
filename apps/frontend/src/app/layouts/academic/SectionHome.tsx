"use client";

import React, { useState, useEffect, useRef } from "react";
import AcademicCard from "@/app/components/academic/AcademicCard";
import { academicContent, AcademicCardProps } from "@/lib/academicData";
import { Poppins } from "next/font/google";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { fetchAcademics } from "@/services/api";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ITEMS_PER_PAGE = 6; // Jumlah kartu per halaman

export default function AcademicSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [academicsData, setAcademicsData] = useState<AcademicCardProps[]>(academicContent);
  const [filteredCards, setFilteredCards] = useState<AcademicCardProps[]>(academicContent);

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchAcademics();
      if (data && data.length > 0) {
        setAcademicsData(data);
        setFilteredCards(data);
      }
    }
    loadData();
  }, []);

  // Logic Filtering
  useEffect(() => {
    const results = academicsData.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.category &&
          card.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCards(results);
    setCurrentPage(1); // Reset ke halaman 1 setiap kali search berubah
  }, [searchTerm, academicsData]);

  // Logic Slicing Data (Pagination)
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCards.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Page Change dengan Scroll
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Optional: Scroll sedikit ke atas grid saat ganti halaman biar UX enak
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className={`min-h-screen bg-[#134576] relative overflow-hidden ${poppins.variable} pb-32`}
      data-scroll-section
    >
      {/* BACKGROUND DECORATION */}
      <div
        className="absolute top-[10%] -left-20 whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
        data-scroll
        data-scroll-speed="-2"
      >
        <h1 className="text-[25vw] font-black text-white leading-none">
          ACADEMIC
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-32 md:py-40 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-6 transition-all duration-700 ease-out translate-y-0 opacity-100">
            <div className="w-10 h-0.5 bg-[#F2C601]"></div>
            <span className="text-[#F2C601] font-mono tracking-widest text-sm uppercase">
              Knowledge Hub
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[12vw] md:text-[8rem] font-bold text-white leading-[0.85] tracking-tighter">
              <span className="block" data-scroll data-scroll-speed="0.2">
                HELLO,
              </span>
            </h1>
            <h1
              className="text-[12vw] md:text-[8rem] font-black text-transparent leading-[0.85] tracking-tighter"
              style={{ WebkitTextStroke: "1px #fff" }}
            >
              <span className="block" data-scroll data-scroll-speed="0.1">
                ENTHUSIAST!
              </span>
            </h1>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-10"
          ref={gridRef}
        >
          {/* Bagian Kiri: Deskripsi */}
          <div className="max-w-md">
            <p className="text-white/60 text-lg font-light leading-relaxed">
              Explore our curated &quot;Playlist&quot; of knowledge. Find resources,
              workshops, and insights to fuel your renewable energy journey.
            </p>
          </div>

          {/* Bagian Kanan: Search Input + Resources Found */}
          <div className="flex flex-col w-full md:w-auto items-start md:items-end gap-3">
            {/* 1. Search Input */}
            <div className="w-full md:w-auto relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                <FaSearch className="text-white/40 group-focus-within:text-[#F2C601] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C601]/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* 2. Resources Found */}
            <div className="px-2">
              <p className="text-white/40 text-sm font-mono tracking-wide">
                Showing{" "}
                <span className="text-[#F2C601] font-bold">
                  {filteredCards.length > 0 ? indexOfFirstItem + 1 : 0}-
                  {Math.min(indexOfLastItem, filteredCards.length)}
                </span>{" "}
                of {filteredCards.length} resources
              </p>
            </div>
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="min-h-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentItems.length > 0 ? (
              currentItems.map((card) => (
                <div key={card.id} className="h-full">
                  <div className="group relative w-full aspect-[3/4] bg-[#0f355a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#F2C601]/30 transition-colors duration-500">
                    <AcademicCard {...card} />
                  </div>
                </div>
              ))
            ) : academicsData.length === 0 ? (
              <div className="col-span-full py-32 text-center animate-pulse font-mono tracking-widest text-[#F2C601]/80 uppercase">
                Fetching resources from Supabase...
              </div>
            ) : (
              <div className="col-span-full py-20 text-center animate-pulse">
                <h3 className="text-2xl text-white/40 font-mono">
                  No results matching &quot;{searchTerm}&quot;
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* --- PAGINATION CONTROLS (AWWWARDS STYLE) --- */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <div className="flex items-center gap-2 p-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <FaChevronLeft />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center px-4 gap-2 border-x border-white/10 h-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative w-8 h-8 flex items-center justify-center text-sm font-mono transition-all rounded-full ${
                        currentPage === page
                          ? "text-[#012e21] font-bold bg-[#F2C601] scale-110"
                          : "text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}