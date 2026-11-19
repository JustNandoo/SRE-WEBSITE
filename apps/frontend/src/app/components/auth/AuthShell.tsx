"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footerNote: ReactNode;
}

/**
 * Layout split-screen untuk autentikasi pendaftar.
 * Mengikuti bahasa visual halaman login CMS (/admin-sre/login):
 * zamrud #012e21 / #011f16, aksen emas #fff0aa, Akira + Poppins, sudut tegas.
 */
export default function AuthShell({ eyebrow, title, description, children, footerNote }: AuthShellProps) {
  return (
    <div
      className={`min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#012e21] text-white ${poppins.variable} ${akira.variable} font-sans selection:bg-[#fff0aa] selection:text-[#012e21]`}
      data-scroll-section
    >
      {/* Left Column: Form */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 md:p-14 border-r border-white/10 bg-[#012e21] min-h-screen relative z-10 shadow-2xl">
        {/* Masthead */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 flex-shrink-0">
          <Link href="/" className="flex items-center gap-3.5">
            <div className="w-10 h-10 relative flex-shrink-0 bg-white/5 p-1.5 border border-white/15">
              <Image src="/favicon.ico" alt="SRE PENS Logo" fill className="object-contain" sizes="40px" />
            </div>
            <div className="overflow-hidden">
              <span className="font-akira tracking-widest text-lg sm:text-xl uppercase block leading-none text-white">SRE PENS</span>
              <span className="font-poppins font-semibold text-[10px] text-[#fff0aa] tracking-[0.2em] uppercase block mt-1.5">OPEN RECRUITMENT</span>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 font-poppins text-xs font-semibold text-white/70 hover:text-[#fff0aa] uppercase tracking-wider px-3.5 py-2 rounded-full border border-white/15 hover:border-[#fff0aa] transition-all whitespace-nowrap flex-shrink-0 bg-white/5 hover:bg-white/10"
          >
            <FaArrowLeft size={10} /> RETURN
          </Link>
        </div>

        {/* Central Form Area */}
        <div className="w-full max-w-sm mx-auto my-auto py-10 sm:py-16 flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
              <span className="font-poppins text-[11px] text-[#fff0aa] font-semibold tracking-[0.25em] uppercase">{eyebrow}</span>
            </div>
            <h1 className="font-akira text-3xl sm:text-4xl uppercase tracking-tighter text-white mb-4 leading-tight">{title}</h1>
            <p className="font-poppins text-xs sm:text-sm text-white/80 leading-relaxed font-light">{description}</p>
          </div>

          {children}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-poppins text-xs text-white/50 tracking-wide gap-2 flex-shrink-0">
          <span>© 2026 Society of Renewable Energy</span>
          <span className="font-semibold text-white/60 uppercase tracking-widest text-[10px]">{footerNote}</span>
        </div>
      </div>

      {/* Right Column: Editorial Visual */}
      <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-10 md:p-16 bg-[#011f16] border-l border-white/10 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

        <div className="relative z-10 flex items-center justify-between font-poppins text-xs text-white/60 tracking-wider uppercase flex-shrink-0">
          <span className="text-[#fff0aa] font-semibold">SRE PENS / OPEN RECRUITMENT 2026</span>
          <span>PENDAFTARAN: <strong className="text-emerald-400 font-semibold">DIBUKA</strong></span>
        </div>

        <div className="relative z-10 my-auto w-full max-w-2xl mx-auto border border-white/15 p-4 bg-[#012e21]/80 shadow-2xl backdrop-blur-sm">
          <div className="relative w-full aspect-[16/10] max-h-[480px] overflow-hidden bg-black">
            <Image
              src="/img/bg/bg1.jpg"
              alt="Wind farm"
              fill
              sizes="60vw"
              priority
              className="object-cover opacity-90 contrast-125 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011f16] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-poppins text-xs text-white z-10">
              <span className="bg-[#012e21]/90 px-3.5 py-1.5 border border-white/20 font-semibold tracking-wider">JOIN THE SOCIETY // 2026</span>
              <span className="bg-[#fff0aa] text-[#012e21] px-2.5 py-1 font-akira text-[10px] tracking-widest font-bold">STAFF</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-start justify-between font-poppins text-sm">
            <div>
              <span className="text-[#fff0aa] font-bold block tracking-wide">FIG. 02 — BUILD THE ENERGY TRANSITION</span>
              <span className="text-xs text-white/70 mt-0.5 block">Bergabung bersama mahasiswa PENS yang bergerak di bidang energi terbarukan.</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-6 grid grid-cols-3 font-poppins text-xs text-white/60 uppercase tracking-wider flex-shrink-0 gap-4">
          <div>
            <span className="text-white/40 block font-normal text-[10px] mb-1">LANGKAH 01</span>
            <span className="text-white font-medium">BUAT AKUN</span>
          </div>
          <div className="text-center">
            <span className="text-white/40 block font-normal text-[10px] mb-1">LANGKAH 02</span>
            <span className="text-[#fff0aa] font-semibold">ISI FORMULIR</span>
          </div>
          <div className="text-right">
            <span className="text-white/40 block font-normal text-[10px] mb-1">LANGKAH 03</span>
            <span className="text-white font-medium">TUNGGU SELEKSI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= SHARED FORM PRIMITIVES =================

export function AuthNotice({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  if (tone === "error") {
    return (
      <div role="alert" className="mb-6 p-4 bg-red-950/40 border border-red-500/40 text-red-300 font-poppins text-xs flex items-center gap-3 font-medium">
        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
        <p>{children}</p>
      </div>
    );
  }
  return (
    <div role="status" className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-poppins text-xs flex items-center gap-3 font-medium">
      <FaCheck size={12} className="text-emerald-400 flex-shrink-0" />
      <p>{children}</p>
    </div>
  );
}

interface AuthFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  trailing?: ReactNode;
}

export function AuthField({ label, icon, trailing, id, ...inputProps }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-poppins text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">{icon}</div>
        <input
          id={id}
          {...inputProps}
          className={`w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] rounded-none py-3.5 pl-12 ${trailing ? "pr-12" : "pr-4"} text-white placeholder-white/30 focus:outline-none font-poppins text-sm tracking-wide transition-all`}
        />
        {trailing}
      </div>
    </div>
  );
}

export function AuthSubmitButton({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-[#fff0aa] text-[#012e21] hover:bg-white hover:text-black py-4 font-akira text-xs sm:text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-8 font-bold shadow-lg hover:shadow-xl"
    >
      {children}
    </button>
  );
}
