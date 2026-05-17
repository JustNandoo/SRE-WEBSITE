"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

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
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[#014f38] via-[#012e21] to-black text-white ${poppins.variable} ${akira.variable} font-sans px-4 py-12 relative overflow-hidden`}>
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F2C601]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Left Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/"
          className="flex items-center gap-3 text-white/60 hover:text-[#F2C601] transition-colors font-mono text-sm tracking-widest uppercase border border-white/10 hover:border-[#F2C601]/50 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md"
        >
          <FaArrowLeft size={12} /> Return to Site
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphism Card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F2C601]/10 border border-[#F2C601]/30 text-[#F2C601] mb-6 shadow-inner">
              <FaShieldAlt size={28} />
            </div>
            <h1 className="font-akira text-3xl md:text-4xl uppercase tracking-tighter text-white mb-2">
              SRE PENS
            </h1>
            <p className="text-xs font-mono text-[#F2C601] tracking-[0.3em] uppercase">
              Administrative Portal
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-mono flex items-center gap-3 animate-shake">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-sm font-mono flex items-center gap-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">
                Staff Email Address
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
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-black/50 transition-all duration-300 font-mono text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">
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
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-black/50 transition-all duration-300 font-mono text-sm shadow-inner"
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

            <button
              type="submit"
              disabled={loading || success !== null}
              className="w-full bg-[#F2C601] hover:bg-[#fff0aa] text-[#012e21] font-bold py-4 rounded-2xl font-mono text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(242,198,1,0.2)] hover:shadow-[0_15px_40px_rgba(242,198,1,0.4)] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={16} />
                  <span>Authenticating...</span>
                </>
              ) : success ? (
                <span>Granted</span>
              ) : (
                <span>Log In to CMS</span>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-[11px] font-mono leading-relaxed">
              Protected by Supabase Auth & RLS. Unauthorized access attempts are logged and strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
