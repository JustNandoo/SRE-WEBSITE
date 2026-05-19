"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAcademics, fetchActivities, fetchArticles, fetchMerchandise, fetchStaffDivisions, fetchExternalRelations, fetchProjects } from "@/services/api";
import { FaBook, FaCalendarAlt, FaNewspaper, FaTshirt, FaUserTie, FaArrowRight, FaSpinner, FaPlus, FaCheckCircle, FaSyncAlt, FaGlobe, FaTasks } from "react-icons/fa";
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
  const [counts, setCounts] = useState({ academics: 0, activities: 0, articles: 0, merchandise: 0, staff: 0, external: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    const [acads, acts, arts, merch, divs, partners, projectsData] = await Promise.all([
      fetchAcademics(),
      fetchActivities(),
      fetchArticles(),
      fetchMerchandise(),
      fetchStaffDivisions(),
      fetchExternalRelations(),
      fetchProjects(),
    ]);

    const totalMembers = divs ? divs.reduce((sum, d) => sum + (d.members?.length || 0), 0) : 0;

    setCounts({
      academics: acads?.length || 0,
      activities: acts?.length || 0,
      articles: arts?.length || 0,
      merchandise: merch?.length || 0,
      staff: totalMembers,
      external: partners?.length || 0,
      projects: projectsData?.length || 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    { name: "Academics", count: counts.academics, icon: FaBook, text: "text-[#fff0aa]", path: "/admin-sre/academics" },
    { name: "Activities", count: counts.activities, icon: FaCalendarAlt, text: "text-emerald-400", path: "/admin-sre/activities" },
    { name: "Articles", count: counts.articles, icon: FaNewspaper, text: "text-amber-300", path: "/admin-sre/articles" },
    { name: "Merchandise", count: counts.merchandise, icon: FaTshirt, text: "text-[#fff0aa]", path: "/admin-sre/merchandise" },
    { name: "Active Members", count: counts.staff, icon: FaUserTie, text: "text-teal-300", path: "/admin-sre/staff" },
    { name: "External Partners", count: counts.external, icon: FaGlobe, text: "text-sky-400", path: "/admin-sre/external-relations" },
    { name: "Work Programs", count: counts.projects, icon: FaTasks, text: "text-rose-400", path: "/admin-sre/projects" },
  ];

  return (
    <div className={`space-y-12 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Minimalist Top Banner matching SRE Theme */}
      <div className="relative overflow-hidden bg-[#012e21] p-8 md:p-14 border border-white/15 shadow-2xl relative z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#fff0aa]/5 rounded-full blur-3xl pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/15 text-[#fff0aa] font-poppins font-semibold text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
              LIVE POSTGRESQL ENDPOINT
            </div>
            <h1 className="font-akira text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              SRE PENS // OVERVIEW
            </h1>
            <p className="font-poppins text-xs sm:text-sm text-white/80 max-w-2xl mt-3 leading-relaxed font-light">
              Welcome to the central administrative dashboard. Manage all content domains, monitor live database records, and execute real-time schema mutations instantly.
            </p>
          </div>
          <button
            onClick={loadStats}
            disabled={loading}
            className="self-start md:self-auto flex items-center gap-3 px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#fff0aa] text-white font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaSyncAlt className={loading ? "animate-spin text-[#fff0aa]" : "text-[#fff0aa]"} />
            <span>REFRESH METRICS</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-[#fff0aa] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#fff0aa]" /> DATABASE SUMMARY METRICS
          </h2>
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">UPDATED REAL-TIME</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.name}
                href={card.path}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#fff0aa] p-8 transition-all duration-300 shadow-xl flex flex-col justify-between h-52 relative overflow-hidden"
              >
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-tl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-poppins font-semibold text-sm tracking-wider uppercase text-white/70 group-hover:text-[#fff0aa] transition-colors">{card.name}</span>
                  <div className={`p-3.5 bg-white/5 border border-white/15 ${card.text}`}>
                    <Icon size={20} />
                  </div>
                </div>
                
                <div className="relative z-10 flex items-end justify-between mt-6">
                  {loading ? (
                    <FaSpinner className="animate-spin text-white/40 mb-1" size={28} />
                  ) : (
                    <span className="font-akira text-4xl sm:text-5xl tracking-tighter text-white leading-none">{card.count}</span>
                  )}
                  <div className="flex items-center gap-2 font-poppins font-semibold text-xs text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all uppercase tracking-wider">
                    <span>MANAGE</span> <FaArrowRight size={10} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Action & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#012e21] border border-white/15 p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-[#fff0aa] font-poppins font-semibold text-xs uppercase tracking-widest mb-4">
              <FaCheckCircle size={16} /> ENTERPRISE RLS SECURED
            </div>
            <h3 className="font-akira text-xl sm:text-2xl uppercase tracking-tighter text-white mb-3 leading-tight">SYSTEM INTEGRITY</h3>
            <p className="text-white/70 font-poppins text-xs sm:text-sm leading-relaxed mb-6 font-light">
              All tables are fully indexed with UUID primary keys and secured by internal Row Level Security policies. Media objects are backed by high-speed Google Cloud CDN pipelines.
            </p>
          </div>
          <div className="relative z-10 p-4 bg-white/5 border border-white/15 text-emerald-400 font-poppins font-semibold text-xs flex items-center justify-between uppercase tracking-wider">
            <span>NETWORK STATUS: ONLINE & ACTIVE</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        <div className="bg-[#012e21] border border-white/15 p-8 shadow-2xl flex flex-col justify-between relative">
          <div className="relative z-10">
            <h3 className="font-akira text-xl sm:text-2xl uppercase tracking-tighter text-white mb-3 leading-tight">QUICK NAVIGATION</h3>
            <p className="text-white/70 font-poppins text-xs sm:text-sm leading-relaxed mb-8 font-light">
              Select any domain below to start publishing new articles or scheduling upcoming organizational activities instantly.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin-sre/articles"
              className="flex items-center justify-center gap-3 py-4 px-6 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
            >
              <FaPlus size={12} /> NEW ARTICLE
            </Link>
            <Link
              href="/admin-sre/activities"
              className="flex items-center justify-center gap-3 py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-poppins font-semibold text-xs uppercase tracking-widest transition-all border border-white/15"
            >
              <FaPlus size={12} /> NEW ACTIVITY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
