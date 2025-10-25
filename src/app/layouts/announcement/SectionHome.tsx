"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Poppins } from "next/font/google";
import { Search, Check, X } from "lucide-react";
import { oprecData, type OprecData } from "../../../../lib/readCSV";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SectionHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<OprecData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Animasi GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
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
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSelected(null);
      setNotFound(false);
      return;
    }

    const found = oprecData.find(
      (item) =>
        item.name.toLowerCase().trim() === searchTerm.toLowerCase().trim()
    );

    if (found) {
      setSelected(found);
      setNotFound(false);
      gsap.fromTo(
        ".result-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    } else {
      setSelected(null);
      setNotFound(true);
      gsap.fromTo(
        ".notfound-alert",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ✅ Background di belakang */}
      <div className="absolute inset-0 -z-10 bg-[url('/img/bg/bg1.jpg')] bg-cover bg-center bg-fixed brightness-50"></div>

      {/* ✅ Overlay opsional agar teks tetap kontras */}
      <div className="absolute inset-0 bg-black/40 -z-[5]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 sm:py-24 md:py-32 text-white">
        {/* Header */}
        <div
          ref={headerRef}
          className="w-full flex flex-col items-center mb-12 text-center px-2 sm:px-4"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-4">
            <p className="text-green-200 text-xs sm:text-sm font-semibold tracking-wider">
              PENGUMUMAN RESMI
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Open Recruitment <br />
            <span className="text-green-300">SRE PENS 2025</span>
          </h1>
          <p className="text-green-100 text-sm sm:text-base md:text-lg">
            Society of Renewable Energy – Politeknik Elektronika Negeri Surabaya
          </p>
        </div>

        {/* Search Section */}
        <div
          ref={searchRef}
          className="flex flex-col sm:flex-row justify-center mb-10 px-2"
        >
          <div className="w-full max-w-md sm:max-w-xl">
            <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Masukkan nama lengkap kamu..."
                className="flex-1 px-4 py-3 text-gray-800 outline-none text-base sm:text-lg rounded-xl sm:rounded-none sm:rounded-l-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className={`${poppins.variable} bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-r-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105`}
              >
                <Search size={18} />
                <span className="text-sm sm:text-base">Cari</span>
              </button>
            </div>
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="notfound-alert w-full max-w-lg sm:max-w-2xl mx-auto mb-6 px-2">
            <div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                  <X size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
                    Nama Tidak Ditemukan
                  </h3>
                  <p className="text-red-200 text-sm sm:text-base">
                    Mohon maaf, nama yang kamu cari tidak ditemukan dalam daftar
                    peserta atau belum lolos seleksi tahap ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result Card */}
        {selected && (
          <div className="result-card w-full max-w-4xl mx-auto px-2 sm:px-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-green-500">
              {/* Header */}
              <div
                className={`${
                  selected.status === "Lolos"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600"
                    : "bg-gradient-to-r from-gray-600 to-gray-700"
                } px-5 sm:px-8 py-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-3 sm:gap-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center sm:text-left">
                    {selected.status === "Lolos"
                      ? "SELAMAT! ANDA LOLOS SELEKSI"
                      : "BELUM LOLOS SELEKSI"}
                  </h2>
                  {selected.status === "Lolos" && (
                    <div className="bg-white rounded-full p-2 sm:p-3 mx-auto sm:mx-0">
                      <Check size={28} className="text-green-600" />
                    </div>
                  )}
                </div>
                <p className="text-green-100 text-sm sm:text-lg font-medium">
                  Open Recruitment SRE PENS 2025
                </p>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">
                        NAMA LENGKAP
                      </p>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold break-words">
                        {selected.name.toUpperCase()}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">
                        DIVISI PENEMPATAN
                      </p>
                      <p className="text-green-400 text-lg sm:text-xl font-bold break-words">
                        {selected.division.toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">
                        ORGANISASI
                      </p>
                      <p className="text-white text-sm sm:text-lg font-semibold">
                        Society of Renewable Energy PENS
                      </p>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="flex items-center justify-center">
                    <div className="bg-white p-3 sm:p-4 rounded-xl">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-200 to-green-400 rounded-lg flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded grid grid-cols-3 gap-1 p-2">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-600 mt-2">
                        QR Code
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                {selected.status === "Lolos" ? (
                  <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-4 sm:p-6">
                    <h4 className="text-green-300 text-base sm:text-lg font-bold mb-3">
                      📋 Silakan lakukan pendaftaran ulang
                    </h4>
                    <p className="text-green-100 text-sm sm:text-base mb-3">
                      Informasi pendaftaran ulang dan link grup divisi akan
                      dikirimkan melalui email resmi dan grup WhatsApp.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border-2 border-gray-600 rounded-xl p-4 sm:p-6">
                    <p className="text-gray-300 text-sm sm:text-base">
                      Terima kasih atas partisipasimu! Tetap semangat dan jangan
                      menyerah untuk kegiatan selanjutnya 💪
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-slate-950 px-6 sm:px-8 py-4 border-t border-gray-700 text-center text-gray-400 text-xs sm:text-sm">
                Society of Renewable Energy – Politeknik Elektronika Negeri
                Surabaya
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selected && !notFound && (
          <div className="text-center max-w-md mx-auto px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-green-300 sm:w-10 sm:h-10" />
              </div>
              <p className="text-white text-sm sm:text-lg leading-relaxed">
                Masukkan nama lengkap kamu untuk melihat hasil seleksi Open
                Recruitment SRE PENS 2025
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SectionHome;
