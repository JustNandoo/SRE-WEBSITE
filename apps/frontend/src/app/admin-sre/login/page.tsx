"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
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

const elagern = localFont({
  src: "../../fonts/Elagern.ttf",
  variable: "--font-elagern",
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
    <div className={`min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#011a12] text-white ${poppins.variable} ${akira.variable} ${elagern.variable} font-sans selection:bg-[#F2C601] selection:text-[#011a12] overflow-y-auto`}>
      {/* Left Column: Editorial Form Section */}
      <div className="flex flex-col justify-between p-6 sm:p-8 md:p-12 border-r border-white/15 bg-[#011a12] min-h-screen lg:min-h-0">
        {/* Editorial Masthead */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F2C601] text-[#011a12] flex items-center justify-center font-bold flex-shrink-0">
              <FaShieldAlt size={16} />
            </div>
            <div className="overflow-hidden">
              <span className="font-akira tracking-widest text-base sm:text-lg uppercase block leading-none truncate text-white">SRE PENS</span>
              <span className="font-poppins font-bold text-[10px] sm:text-xs text-[#F2C601] tracking-[0.2em] uppercase block mt-1.5">VOL. II / NO. 2026</span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 font-akira text-[10px] text-white hover:text-[#F2C601] uppercase tracking-widest border border-white/20 px-3.5 py-2 hover:border-[#F2C601] whitespace-nowrap flex-shrink-0 transition-colors"
          >
            <FaArrowLeft size={10} /> RETURN
          </Link>
        </div>

        {/* Central Form Area */}
        <div className="w-full max-w-md mx-auto my-auto py-8 sm:py-12 flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <p className="font-akira text-[10px] sm:text-xs text-[#F2C601] tracking-[0.3em] uppercase mb-3">SECURE ENDPOINT</p>
            <h1 className="font-elagern text-5xl sm:text-6xl tracking-wide font-normal text-white mb-4 leading-none">
              Authentication.
            </h1>
            <p className="font-poppins text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Restricted administrative access. Please authenticate using verified staff credentials to enter the CMS console.
            </p>
          </div>

          {/* Notices */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/40 text-red-400 font-poppins text-xs flex items-center gap-3 tracking-wide">
              <span className="w-2 h-2 bg-red-500 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-poppins text-xs flex items-center gap-3 tracking-wide">
              <FaCheck size={12} className="text-emerald-400 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-akira text-[11px] sm:text-xs text-[#F2C601] tracking-wider uppercase">
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
                  className="w-full bg-transparent border border-white/25 rounded-none py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C601] font-poppins text-sm tracking-wide"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-akira text-[11px] sm:text-xs text-[#F2C601] tracking-wider uppercase">
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
                  className="w-full bg-transparent border border-white/25 rounded-none py-3.5 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C601] font-poppins text-sm tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-2 font-poppins text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-white/70 hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-none border-white/30 bg-transparent text-[#F2C601] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#F2C601]"
                />
                <span className="uppercase tracking-wider">REMEMBER SESSION</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Please contact the Super Admin (superadmin@sre-pens.com) to reset staff credentials.")}
                className="text-white/60 hover:text-[#F2C601] uppercase tracking-wider underline underline-offset-4"
              >
                FORGOT PASSWORD?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || success !== null}
              className="w-full bg-[#F2C601] text-[#011a12] hover:bg-white hover:text-black py-4 rounded-none font-akira text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mt-8 font-bold"
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

        {/* Editorial Footer */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between font-poppins text-xs text-white/50 tracking-widest uppercase gap-2 flex-shrink-0">
          <span>© 2026 SOCIETY OF RENEWABLE ENERGY</span>
          <span>SECURED BY SUPABASE RLS</span>
        </div>
      </div>

      {/* Right Column: Framed Editorial Visual Section */}
      <div className="hidden lg:flex flex-col justify-between p-8 md:p-12 bg-[#011a12] border-l border-white/15 min-h-screen lg:min-h-0">
        <div className="text-right font-poppins font-semibold text-xs text-white/60 tracking-[0.2em] uppercase flex-shrink-0">
          ARCHIVAL REPOSITORY / 01-26
        </div>

        {/* Framed Image */}
        <div className="my-auto w-full max-w-xl mx-auto border border-white/15 p-3 bg-[#01251a]">
          <div className="relative w-full aspect-[4/3] max-h-[420px] overflow-hidden bg-black">
            <Image
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7"
              alt="Renewable Energy Installation"
              fill
              sizes="50vw"
              priority
              className="object-cover grayscale contrast-125"
            />
            {/* Subtle overlay grid for editorial texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-start justify-between font-akira">
            <div>
              <span className="text-[#F2C601] text-xs sm:text-sm tracking-wider uppercase block">FIG. 01 — WIND POWER GENERATOR</span>
              <span className="font-poppins text-xs text-white/70 tracking-wide mt-1 block">OFFSHORE INSTALLATION SERIES / ARCHIVE 2026</span>
            </div>
            <span className="text-[10px] px-2.5 py-1 bg-white/10 border border-white/20 text-white font-bold tracking-wider">RAW / 4K</span>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 grid grid-cols-2 flex-shrink-0">
          <div>
            <span className="font-akira text-[10px] text-white tracking-wider uppercase block mb-1.5">SYSTEM STATUS</span>
            <span className="font-poppins font-semibold text-xs text-[#F2C601] tracking-wider uppercase">ONLINE & ACTIVE</span>
          </div>
          <div className="text-right">
            <span className="font-akira text-[10px] text-white tracking-wider uppercase block mb-1.5">ENCRYPTION LEVEL</span>
            <span className="font-poppins text-xs tracking-wider uppercase text-white/80">AES-256 / SHA-256</span>
          </div>
        </div>
      </div>
    </div>
  );
}
