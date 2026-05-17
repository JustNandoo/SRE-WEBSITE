"use client";

import Image from "next/image";
import Link from "next/link";
import { AcademicCardProps } from "@/lib/academicData";
import {
  FaArrowLeft,
  FaFilePdf,
  FaDownload,
  FaExpand,
  FaBookOpen,
} from "react-icons/fa";

export default function AcademicDetailContent({
  academic,
  pdfUrl,
}: {
  academic: AcademicCardProps;
  pdfUrl: string;
}) {
  return (
    <div
      className="relative min-h-screen bg-[#f4f4f4]"
      data-scroll-section
      // --- BACKGROUND GRID PATTERN ---
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* =========================================================
          1. HERO IMAGE (PARALLAX)
      ========================================================= */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden border-b border-black/5">
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          data-scroll
          data-scroll-speed="-0.5"
        >
          <Image
            src={academic.image || "/img/default.jpg"}
            alt={academic.title}
            fill
            priority
            className="object-cover"
          />
          {/* Overlay agar teks badge terbaca */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-80" />
        </div>

        {/* Floating Category Badge */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span
            data-scroll
            data-scroll-speed="0.2"
            className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-mono text-sm uppercase tracking-[0.2em]"
          >
            {academic.category || "Academic"}
          </span>
        </div>
      </div>

      {/* =========================================================
          2. CONTENT CARD (CLEAN WHITE)
      ========================================================= */}
      <div className="relative z-20 px-4 sm:px-6 md:px-10 -mt-20 md:-mt-32 pb-20">
        {/* The White Card */}
        <div className="bg-white rounded-4xl md:rounded-[3.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
          {/* HEADER AREA */}
          <div className="px-6 py-10 md:px-16 md:py-16 text-center">
            {/* Back Button (Left Aligned) */}
            <div className="flex justify-start mb-8">
              <Link
                href="/academic"
                className="group inline-flex items-center gap-2 text-[#012e21]/50 hover:text-[#012e21] transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-[#012e21]/10 flex items-center justify-center group-hover:bg-[#012e21] group-hover:text-white transition-all duration-300 bg-gray-50">
                  <FaArrowLeft className="text-xs" />
                </div>
                <span className="text-xs font-bold font-mono uppercase tracking-widest">
                  Back to Library
                </span>
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#012e21] leading-[1.1] mb-6 tracking-tight">
              {academic.title}
            </h1>

            {/* Description with Icon */}
            <div className="flex flex-col items-center">
              <FaBookOpen className="text-[#F2C601] mb-4 text-xl opacity-50" />
              <p className="text-lg md:text-xl text-[#012e21]/60 font-serif leading-relaxed max-w-3xl mx-auto">
                {academic.description}
              </p>
            </div>
          </div>

          {/* PDF VIEWER SECTION */}
          <div className="bg-[#f8f9fa] border-t border-gray-100 p-4 md:p-10">
            {/* UI Frame PDF */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
              {/* Fake Header Bar */}
              <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-4 w-px bg-gray-200 mx-1"></div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaFilePdf className="text-red-500 text-xs" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wide">
                      Preview Mode
                    </span>
                  </div>
                </div>
                <FaExpand className="text-gray-300 text-xs" />
              </div>

              {/* Iframe Area */}
              <div className="relative w-full aspect-3/4 md:aspect-video bg-gray-50">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              {/* Footer Action */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="block text-sm font-bold text-[#012e21]">
                    Useful material?
                  </span>
                  <span className="text-xs text-gray-400">
                    Save it for later study.
                  </span>
                </div>
                <a
                  href={pdfUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#012e21] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#F2C601] hover:text-[#012e21] transition-all shadow-lg hover:-translate-y-1 w-full sm:w-auto justify-center"
                >
                  <FaDownload />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
