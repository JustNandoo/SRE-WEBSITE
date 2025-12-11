"use client";

import React, { useState } from "react";
import { Search, Check, X, Phone } from "lucide-react";
import { oprecData, type OprecData } from "@/lib/dataOprec";

export default function SectionHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<OprecData | null>(null);
  const [notFound, setNotFound] = useState(false);

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
    } else {
      setSelected(null);
      setNotFound(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[url('/img/bg/bg1.jpg')] bg-cover bg-center bg-fixed brightness-50"></div>
      <div className="absolute inset-0 bg-black/40 -z-[5]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-white">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-12 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
            <p className="text-green-200 text-sm font-semibold tracking-wider">
              PENGUMUMAN RESMI
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Open Recruitment <br />
            <span className="text-green-300">SRE PENS 2025</span>
          </h1>
          <p className="text-green-100 text-base md:text-lg">
            Society of Renewable Energy – Politeknik Elektronika Negeri Surabaya
          </p>
        </div>

        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-xl p-2 flex">
              <input
                type="text"
                placeholder="Masukkan nama lengkap kamu..."
                className="flex-1 px-4 py-3 text-gray-800 outline-none text-lg rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <Search size={18} />
                <span>Cari</span>
              </button>
            </div>
          </div>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="w-full max-w-2xl mx-auto mb-6 px-2">
            <div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                  <X size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">
                    Nama Tidak Ditemukan
                  </h3>
                  <p className="text-red-200 text-sm">
                    Mohon maaf, nama yang kamu cari tidak ditemukan dalam daftar
                    peserta atau belum lolos seleksi tahap ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {selected && (
          <div className="w-full max-w-3xl mx-auto px-2">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-green-500">
              <div
                className={`${
                  selected.status === "Lolos"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600"
                    : "bg-gradient-to-r from-gray-600 to-gray-700"
                } px-6 py-6`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selected.status === "Lolos"
                      ? "SELAMAT! ANDA LOLOS SELEKSI"
                      : "BELUM LOLOS SELEKSI"}
                  </h2>
                  {selected.status === "Lolos" && (
                    <div className="bg-white rounded-full p-2">
                      <Check size={28} className="text-green-600" />
                    </div>
                  )}
                </div>
                <p className="text-green-100 text-sm mt-2">
                  Open Recruitment SRE PENS 2025
                </p>
              </div>

              {/* Data */}
              <div className="p-8 space-y-5">
                <div>
                  <p className="text-gray-400 text-sm mb-1">NAMA LENGKAP</p>
                  <h3 className="text-white text-3xl font-bold">
                    {selected.name.toUpperCase()}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    DIVISI PENEMPATAN
                  </p>
                  <p className="text-green-400 text-xl font-bold">
                    {selected.division.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">ORGANISASI</p>
                  <p className="text-white text-lg font-semibold">
                    Society of Renewable Energy PENS
                  </p>
                </div>

                {/* Conditional CTA */}
                {selected.status === "Lolos" ? (
                  <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-6">
                    <h4 className="text-green-300 text-lg font-bold mb-3">
                      🎉 Selamat! Silakan konfirmasi ke CP berikut
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://wa.me/6281230387540"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all"
                      >
                        <Phone size={18} /> Nifsa
                      </a>
                      <a
                        href="https://wa.me/6289680860523"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all"
                      >
                        <Phone size={18} /> Safira
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border-2 border-gray-600 rounded-xl p-6 text-center">
                    <p className="text-gray-300 text-base leading-relaxed">
                      Terima kasih atas partisipasimu! ✨  
                      Tetap semangat, perjalananmu baru saja dimulai —  
                      masih banyak kesempatan keren menanti 💪
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-slate-950 px-6 py-4 border-t border-gray-700 text-center text-gray-400 text-xs">
                Society of Renewable Energy – Politeknik Elektronika Negeri
                Surabaya
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!selected && !notFound && (
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-green-300" />
              </div>
              <p className="text-white text-lg leading-relaxed">
                Masukkan nama lengkap kamu untuk melihat hasil seleksi  
                Open Recruitment SRE PENS 2025
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
