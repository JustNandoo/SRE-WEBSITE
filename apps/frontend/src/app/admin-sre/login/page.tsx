"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
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
      setSuccess("Authentication successful! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/admin-sre");
      }, 1000);
    }
  };

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#011a12] text-white ${poppins.variable} ${akira.variable} font-sans selection:bg-[#F2C601] selection:text-[#011a12]`}>
      {/* Left Column: Form Section */}
      <div className="flex flex-col justify-between p-8 md:p-16 lg:p-20 relative z-10 bg-[#012e21]/40 backdrop-blur-3xl border-r border-white/10">
        {/* Top Header & Return Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2C601] text-[#012e21] rounded-xl flex items-center justify-center font-bold shadow-[0_0_20px_rgba(242,198,1,0.4)]">
              <FaShieldAlt size={20} />
            </div>
            <span className="font-akira tracking-wider text-xl uppercase text-white">SRE CMS</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-white/60 hover:text-[#F2C601] transition-colors uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full bg-white/5"
          >
            <FaArrowLeft size={10} /> Back to Site
          </Link>
        </div>

        {/* Middle Form Area */}
        <div className="w-full max-w-md mx-auto my-12">
          <div className="text-center lg:text-left mb-10 space-y-3">
            <h1 className="font-akira text-3xl md:text-4xl uppercase tracking-tighter text-white">
              Welcome back!
            </h1>
            <p className="text-sm font-sans text-white/60">
              The faster you log in, the faster you manage the portal.
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-mono flex items-center gap-3 animate-shake">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-mono flex items-center gap-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-mono text-xs font-semibold text-white/80 uppercase tracking-wider pl-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#F2C601] transition-colors">
                  <FaEnvelope size={14} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sre-pens.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-black/60 transition-all duration-300 font-mono text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs font-semibold text-white/80 uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#F2C601] transition-colors">
                  <FaLock size={14} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-black/60 transition-all duration-300 font-mono text-sm shadow-inner"
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
            <div className="flex items-center justify-between text-xs font-mono pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-white/70 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#F2C601] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#F2C601]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Please contact the Super Admin (superadmin@sre-pens.com) to reset staff credentials.")}
                className="text-white/60 hover:text-[#F2C601] transition-colors underline underline-offset-4"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || success !== null}
              className="w-full bg-[#F2C601] hover:bg-[#fff0aa] text-[#011a12] font-bold py-4 rounded-xl font-mono text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(242,198,1,0.2)] hover:shadow-[0_15px_40px_rgba(242,198,1,0.4)] disabled:opacity-50 flex items-center justify-center gap-3 mt-6"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={16} />
                  <span>Authenticating...</span>
                </>
              ) : success ? (
                <span>Access Granted</span>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center lg:text-left text-white/30 text-[11px] font-mono leading-relaxed pt-6 border-t border-white/10">
          <p>© 2026 Society of Renewable Energy PENS. Protected by Supabase RLS.</p>
        </div>
      </div>

      {/* Right Column: Stunning Visual Banner Section matching the reference layout */}
      <div className="relative hidden lg:flex items-end p-16 overflow-hidden bg-[#011a12]/90 border-l border-white/10">
        {/* Full Cover Image */}
        <Image
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7"
          alt="Renewable Energy Wind Turbines"
          fill
          sizes="50vw"
          priority
          className="object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-1000"
        />

        {/* Gradient Overlay for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-[#011a12]/40 to-transparent" />

        {/* Decorative Grid Overlay Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#F2C601_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

        {/* Top Right Floating Logo Label */}
        <div className="absolute top-16 right-16 z-20">
          <span className="font-akira text-2xl tracking-widest text-white/90 drop-shadow-lg">
            SRE PENS
          </span>
        </div>

        {/* Bottom Typography Overlay matching the Aespa / Karina reference */}
        <div className="relative z-20 space-y-4 max-w-xl">
          <div className="flex items-baseline gap-4">
            <h2 className="font-akira text-4xl xl:text-5xl uppercase tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Green Energy
            </h2>
            <span className="font-mono text-xl text-[#F2C601] tracking-widest font-bold">
              재생 가능 에너지
            </span>
          </div>

          <p className="text-sm font-sans leading-relaxed text-white/80 drop-shadow backdrop-blur-sm bg-black/20 p-4 rounded-2xl border border-white/10 font-light">
            SRE PENS (Society of Renewable Energy) is a dedicated student organization at Electronic Engineering Polytechnic Institute of Surabaya committed to advancing green technology, smart grid research, and energy transition innovation across Indonesia.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="w-3 h-3 rounded-full bg-[#F2C601] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F2C601] font-bold">
              CMS Secure Connection Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
