"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FaUserCog,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { type User } from "@supabase/supabase-js";

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

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setEmail(user.email || "");
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (data) {
        setUserRole(data.role);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    if (!email) {
      setNotice({ type: "error", message: "Email is required." });
      return;
    }
    
    if (password && password !== confirmPassword) {
      setNotice({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (!password) {
      setNotice({ type: "error", message: "Please enter a new password to confirm changes." });
      return;
    }

    setLoading(true);
    
    try {
      // Use the secure RPC we created to update the profile without email confirmation overhead
      const { data, error } = await supabase.rpc("update_own_profile", {
        new_email: email,
        new_password: password
      });

      if (error) throw error;
      
      setNotice({ type: "success", message: "Profile updated successfully! Your password has been securely hashed and encrypted." });
      setPassword("");
      setConfirmPassword("");
      fetchUserData(); // Refresh data
    } catch (err: any) {
      console.error(err);
      setNotice({ type: "error", message: err.message || "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  // If user is not yet loaded, show loading state
  if (!userRole) {
    return (
      <div className={`min-h-screen p-6 md:p-12 text-white bg-[#012e21] flex items-center justify-center ${poppins.variable} ${akira.variable} font-sans`}>
        <FaSpinner className="animate-spin text-4xl text-[#fff0aa]" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 md:p-12 text-white bg-[#012e21] ${poppins.variable} ${akira.variable} font-sans`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="relative p-8 border border-white/10 bg-[#011f16] shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff0aa]/5 blur-3xl rounded-full" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#fff0aa]/30" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaUserCog className="text-[#fff0aa] text-xl" />
                <h1 className="font-akira text-2xl uppercase tracking-wider text-white">
                  Profile Settings
                </h1>
              </div>
              <p className="text-white/60 font-medium text-sm">
                Manage your account credentials and security.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">
                Current Role
              </p>
              <div className="px-3 py-1 bg-[#fff0aa]/10 border border-[#fff0aa]/30 text-[#fff0aa] text-xs font-bold uppercase tracking-wider rounded-sm">
                {userRole.replace("-", " ")}
              </div>
            </div>
          </div>
        </div>

        {/* NOTICE BAR */}
        {notice && (
          <div
            className={`p-4 border font-medium text-sm flex items-center gap-3 shadow-sm ${
              notice.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                : "bg-red-950/40 border-red-500/30 text-red-300"
            }`}
          >
            {notice.type === "success" ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
            {notice.message}
          </div>
        )}

        {/* PROFILE FORM */}
        <div className="p-8 border border-white/10 bg-[#011f16] shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Account ID (Read Only) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold block">
                  Account ID
                </label>
                <input
                  type="text"
                  value={user?.id || ""}
                  disabled
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/50 font-mono cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#fff0aa] font-bold block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fff0aa] transition-colors"
                  placeholder="admin@sre-pens.com"
                />
              </div>

              <div className="hidden md:block"></div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#fff0aa] font-bold block">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fff0aa] transition-colors"
                  placeholder="Enter new password (min. 6 characters)"
                  minLength={6}
                />
                <p className="text-xs text-white/40 mt-1">
                  Password will be securely hashed and encrypted in the database.
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#fff0aa] font-bold block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fff0aa] transition-colors"
                  placeholder="Re-type new password"
                  minLength={6}
                />
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#fff0aa] text-[#012e21] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
}
