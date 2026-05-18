"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaCheck } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Invalid login credentials.");
    } else if (data.session) {
      setSuccess("Granted. Redirecting...");
      setTimeout(() => {
        router.push("/admin-sre");
      }, 1000);
    }
  };

  return (
    <div className={`min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#012e21] text-white ${poppins.variable} ${akira.variable} font-sans selection:bg-[#fff0aa] selection:text-[#012e21] overflow-y-auto`}>
      {/* Left Column: Clean Minimalist Form Section */}
      <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 md:p-14 border-r border-white/10 bg-[#012e21] min-h-screen lg:min-h-0 relative z-10 shadow-2xl">
        {/* Top Header / Masthead */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3.5">
            {/* Replace Shield Icon with favicon.ico */}
            <div className="w-10 h-10 relative flex-shrink-0 bg-white/5 p-1.5 border border-white/15">
              <Image src="/favicon.ico" alt="SRE PENS Logo" fill className="object-contain" sizes="40px" />
            </div>
            <div className="overflow-hidden">
              <span className="font-akira tracking-widest text-lg sm:text-xl uppercase block leading-none text-white">SRE PENS</span>
              <span className="font-poppins font-semibold text-[10px] text-[#fff0aa] tracking-[0.2em] uppercase block mt-1.5">STAFF CONSOLE</span>
            </div>
          </div>
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
              <span className="font-poppins text-[11px] text-[#fff0aa] font-semibold tracking-[0.25em] uppercase">RESTRICTED ACCESS</span>
            </div>
            {/* Title with Akira font */}
            <h1 className="font-akira text-3xl sm:text-4xl uppercase tracking-tighter text-white mb-4 leading-tight">
              AUTHENTICATION.
            </h1>
            {/* Paragraph with Poppins font */}
            <p className="font-poppins text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Enter your verified staff credentials to access the SRE PENS management system console.
            </p>
          </div>

          {/* Notices */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/40 text-red-300 font-poppins text-xs flex items-center gap-3 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-poppins text-xs flex items-center gap-3 font-medium">
              <FaCheck size={12} className="text-emerald-400 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-poppins text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">
                STAFF EMAIL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                  <FaEnvelope size={14} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sre-pens.com"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] rounded-none py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-sm tracking-wide transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-poppins text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">
                PASSPHRASE
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                  <FaLock size={14} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] rounded-none py-3.5 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none font-poppins text-sm tracking-wide transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-1 font-poppins text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-white/70 hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-none border-white/30 bg-transparent text-[#fff0aa] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#fff0aa]"
                />
                <span className="font-medium tracking-wide">Remember session</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Please contact the Super Admin (superadmin@sre-pens.com) to reset staff credentials.")}
                className="text-white/60 hover:text-[#fff0aa] tracking-wide underline underline-offset-4 transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || success !== null}
              className="w-full bg-[#fff0aa] text-[#012e21] hover:bg-white hover:text-black py-4 font-akira text-xs sm:text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-8 font-bold shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span>VERIFYING CREDENTIALS...</span>
              ) : success ? (
                <span>AUTHORIZED</span>
              ) : (
                <span>PROCEED TO CONSOLE</span>
              )}
            </button>
          </form>
        </div>

        {/* Minimalist Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-poppins text-xs text-white/50 tracking-wide gap-2 flex-shrink-0">
          <span>© 2026 Society of Renewable Energy</span>
          <span className="font-semibold text-white/60 uppercase tracking-widest text-[10px]">RESTRICTED INTERNAL NETWORK</span>
        </div>
      </div>

      {/* Right Column: Clean Editorial Visual Section matching SRE Theme */}
      <div className="hidden lg:flex lg:col-span-7 xl:col-span-7 flex-col justify-between p-10 md:p-16 bg-[#011f16] border-l border-white/10 min-h-screen lg:min-h-0 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

        <div className="relative z-10 flex items-center justify-between font-poppins text-xs text-white/60 tracking-wider uppercase flex-shrink-0">
          <span className="text-[#fff0aa] font-semibold">SRE PENS / ARCHIVE 2026</span>
          <span>SYSTEM STATUS: <strong className="text-emerald-400 font-semibold">ONLINE</strong></span>
        </div>

        {/* Framed Minimalist Image Showcase */}
        <div className="relative z-10 my-auto w-full max-w-2xl mx-auto border border-white/15 p-4 bg-[#012e21]/80 shadow-2xl backdrop-blur-sm">
          <div className="relative w-full aspect-[16/10] max-h-[480px] overflow-hidden bg-black">
            <Image
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7"
              alt="Renewable Energy Installation"
              fill
              sizes="60vw"
              priority
              className="object-cover opacity-90 contrast-125 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011f16] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-poppins text-xs text-white z-10">
              <span className="bg-[#012e21]/90 px-3.5 py-1.5 border border-white/20 font-semibold tracking-wider">OFFSHORE INSTALLATION // 01</span>
              <span className="bg-[#fff0aa] text-[#012e21] px-2.5 py-1 font-akira text-[10px] tracking-widest font-bold">RAW / 4K</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-start justify-between font-poppins text-sm">
            <div>
              <span className="text-[#fff0aa] font-bold block tracking-wide">FIG. 01 — WIND POWER GENERATOR TOWER</span>
              <span className="text-xs text-white/70 mt-0.5 block">Sustainable infrastructure empowering energy transition across East Java.</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-6 grid grid-cols-3 font-poppins text-xs text-white/60 uppercase tracking-wider flex-shrink-0 gap-4">
          <div>
            <span className="text-white/40 block font-normal text-[10px] mb-1">DATA REPOSITORY</span>
            <span className="text-white font-medium">ACTIVE MIRROR</span>
          </div>
          <div className="text-center">
            <span className="text-white/40 block font-normal text-[10px] mb-1">ENCRYPTION STANDARD</span>
            <span className="text-[#fff0aa] font-semibold">AES-256 / SSL</span>
          </div>
          <div className="text-right">
            <span className="text-white/40 block font-normal text-[10px] mb-1">LOCATION</span>
            <span className="text-white font-medium">SURABAYA, ID</span>
          </div>
        </div>
      </div>
    </div>
  );
}
