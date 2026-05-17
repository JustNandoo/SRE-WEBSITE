"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAcademics, fetchActivities, fetchArticles, fetchMerchandise, fetchStaffDivisions } from "@/services/api";
import { FaBook, FaCalendarAlt, FaNewspaper, FaTshirt, FaUserTie, FaArrowRight, FaSpinner, FaPlus, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const akira = localFont({
  src: "../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

export default function AdminDashboardOverview() {
  const [counts, setCounts] = useState({ academics: 0, activities: 0, articles: 0, merchandise: 0, staff: 0 });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    const [acads, acts, arts, merch, divs] = await Promise.all([
      fetchAcademics(),
      fetchActivities(),
      fetchArticles(),
      fetchMerchandise(),
      fetchStaffDivisions(),
    ]);

    const totalMembers = divs ? divs.reduce((sum, d) => sum + (d.members?.length || 0), 0) : 0;

    setCounts({
      academics: acads?.length || 0,
      activities: acts?.length || 0,
      articles: arts?.length || 0,
      merchandise: merch?.length || 0,
      staff: totalMembers,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    { name: "Academics", count: counts.academics, icon: FaBook, color: "from-blue-500/20 to-blue-600/30", text: "text-blue-400", path: "/admin-sre/academics" },
    { name: "Activities", count: counts.activities, icon: FaCalendarAlt, color: "from-emerald-500/20 to-emerald-600/30", text: "text-emerald-400", path: "/admin-sre/activities" },
    { name: "Articles", count: counts.articles, icon: FaNewspaper, color: "from-purple-500/20 to-purple-600/30", text: "text-purple-400", path: "/admin-sre/articles" },
    { name: "Merchandise", count: counts.merchandise, icon: FaTshirt, color: "from-amber-500/20 to-amber-600/30", text: "text-amber-400", path: "/admin-sre/merchandise" },
    { name: "Active Members", count: counts.staff, icon: FaUserTie, color: "from-pink-500/20 to-pink-600/30", text: "text-pink-400", path: "/admin-sre/staff" },
  ];

  return (
    <div className={`space-y-12 ${poppins.variable} ${akira.variable} font-sans`}>
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#012e21] via-[#014f38] to-[#011a12] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#F2C601]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2C601]/10 border border-[#F2C601]/30 text-[#F2C601] font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F2C601] animate-pulse" />
              Live PostgreSQL Database
            </div>
            <h1 className="font-akira text-3xl md:text-5xl uppercase tracking-tighter text-white">
              SRE PENS / SYSTEM OVERVIEW
            </h1>
            <p className="text-white/70 max-w-2xl mt-3 font-sans leading-relaxed">
              Welcome to the central administrative console. Manage all content domains, monitor live database records, and execute real-time schema mutations instantly.
            </p>
          </div>
          <button
            onClick={loadStats}
            disabled={loading}
            className="self-start md:self-auto flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-sm uppercase tracking-wider transition-all duration-300 shadow-inner"
          >
            <FaSyncAlt className={loading ? "animate-spin text-[#F2C601]" : "text-[#F2C601]"} />
            <span>Refresh Stats</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2C601] mb-6 flex items-center gap-3">
          <span>Database Summary Metrics</span>
          <span className="h-px bg-white/10 flex-1" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.name}
                href={card.path}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-8 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl hover:border-white/20 flex flex-col justify-between h-48"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-sm tracking-wider uppercase text-white/60 group-hover:text-white transition-colors">{card.name}</span>
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${card.text}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="relative z-10 flex items-end justify-between">
                  {loading ? (
                    <FaSpinner className="animate-spin text-white/40 mb-1" size={28} />
                  ) : (
                    <span className="font-akira text-5xl tracking-tighter text-white">{card.count}</span>
                  )}
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-[#F2C601] group-hover:translate-x-1 transition-all">
                    <span>Manage</span> <FaArrowRight size={10} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Action & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-[#F2C601] font-mono text-xs uppercase tracking-widest mb-4">
              <FaCheckCircle size={16} /> Supabase RLS Secured
            </div>
            <h3 className="font-akira text-2xl uppercase tracking-tighter text-white mb-3">System Integrity</h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
              All tables are fully indexed with UUID primary keys and secured by Row Level Security policies. Media objects are backed by Google Cloud Storage and CDN pipelines.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-between">
            <span>Connection Status: Active</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-akira text-2xl uppercase tracking-tighter text-white mb-3">Quick Navigation</h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
              Select any domain below to start creating new articles, scheduling upcoming activities, updating academic resources, or modifying team member roles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin-sre/articles"
              className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-[#F2C601] hover:bg-[#fff0aa] text-[#012e21] font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              <FaPlus size={12} /> New Article
            </Link>
            <Link
              href="/admin-sre/activities"
              className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 border border-white/10"
            >
              <FaPlus size={12} /> New Activity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
