"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  FaBook,
  FaCalendarAlt,
  FaNewspaper,
  FaTshirt,
  FaUserTie,
  FaArrowRight,
  FaSpinner,
  FaPlus,
  FaCheckCircle,
  FaSyncAlt,
  FaGlobe,
  FaTasks,
  FaFileAlt,
  FaInfoCircle,
  FaFolderOpen,
  FaUsers,
  FaFileInvoiceDollar,
  FaHandHoldingHeart,
  FaGraduationCap,
  FaLeaf,
  FaInstagram,
  FaChartLine,
  FaRobot,
  FaFlask,
  FaTrophy,
  FaLightbulb,
  FaArchive,
  FaAward,
  FaUsersCog,
  FaRegListAlt,
  FaPalette,
} from "react-icons/fa";
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

interface CardItem {
  name: string;
  table: string;
  icon: React.ComponentType<any>;
  color: string;
  path: string;
  count?: number;
}

export default function AdminDashboardOverview() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const getCardsConfigForRole = (role: string | null): CardItem[] => {
    if (!role) return [];

    switch (role) {
      case "super-admin":
      case "p-level":
      case "staff":
        return [
          { name: "Academics", table: "academics", icon: FaBook, color: "text-[#fff0aa]", path: "/admin-sre/academics" },
          { name: "Activities", table: "activities", icon: FaCalendarAlt, color: "text-emerald-400", path: "/admin-sre/activities" },
          { name: "Articles", table: "articles", icon: FaNewspaper, color: "text-amber-300", path: "/admin-sre/articles" },
          { name: "Merchandise", table: "merchandise", icon: FaTshirt, color: "text-[#fff0aa]", path: "/admin-sre/merchandise" },
          { name: "Active Members", table: "staff", icon: FaUserTie, color: "text-teal-300", path: "/admin-sre/staff" },
          { name: "External Partners", table: "external_relations", icon: FaGlobe, color: "text-sky-400", path: "/admin-sre/external-relations" },
          { name: "Work Programs", table: "projects", icon: FaTasks, color: "text-rose-400", path: "/admin-sre/projects" },
        ];

      case "secretary":
        return [
          { name: "Laporan LPJ", table: "lpj", icon: FaFileAlt, color: "text-teal-300", path: "/admin-sre/lpj" },
          { name: "Agenda & Kalendar", table: "agenda", icon: FaCalendarAlt, color: "text-[#fff0aa]", path: "/admin-sre/agenda" },
          { name: "Pusat Informasi", table: "pusat_informasi", icon: FaInfoCircle, color: "text-sky-400", path: "/admin-sre/pusat-informasi" },
          { name: "Arsip Surat", table: "arsip_surat", icon: FaFolderOpen, color: "text-amber-300", path: "/admin-sre/arsip-surat" },
          { name: "Database Anggota", table: "database_anggota", icon: FaUsers, color: "text-rose-400", path: "/admin-sre/database-anggota" },
        ];

      case "treasurer":
        return [
          { name: "Laporan Keuangan", table: "laporan_keuangan_publik", icon: FaFileInvoiceDollar, color: "text-[#fff0aa]", path: "/admin-sre/laporan-keuangan-publik" },
          { name: "Donasi & Pendanaan", table: "donasi_pendanaan", icon: FaHandHoldingHeart, color: "text-emerald-400", path: "/admin-sre/donasi-pendanaan" },
          { name: "Manajemen Anggaran", table: "manajemen_anggaran", icon: FaTasks, color: "text-teal-300", path: "/admin-sre/manajemen-anggaran" },
        ];

      case "education":
        return [
          { name: "Articles", table: "articles", icon: FaNewspaper, color: "text-amber-300", path: "/admin-sre/articles" },
          { name: "Academics", table: "academics", icon: FaBook, color: "text-[#fff0aa]", path: "/admin-sre/academics" },
          { name: "Learning Center", table: "learning_center", icon: FaGraduationCap, color: "text-teal-300", path: "/admin-sre/learning-center" },
          { name: "Green Energy Update", table: "green_energy_update", icon: FaLeaf, color: "text-emerald-400", path: "/admin-sre/green-energy-update" },
        ];

      case "content-marketing":
        return [
          { name: "Engagement Feed", table: "engagement_feed", icon: FaInstagram, color: "text-rose-400", path: "/admin-sre/engagement-feed" },
          { name: "Account Insight", table: "account_insight", icon: FaChartLine, color: "text-[#fff0aa]", path: "/admin-sre/account-insight" },
          { name: "AI Analisis", table: "ai_analisis", icon: FaRobot, color: "text-sky-400", path: "/admin-sre/ai-analisis" },
        ];

      case "crd":
        return [
          { name: "Program Kerja CRD", table: "program_kerja_crd", icon: FaTasks, color: "text-teal-300", path: "/admin-sre/program-kerja-crd" },
          { name: "Project & Research", table: "project_research_development", icon: FaFlask, color: "text-emerald-400", path: "/admin-sre/project-research-development" },
          { name: "Competition Center", table: "competition_center", icon: FaTrophy, color: "text-[#fff0aa]", path: "/admin-sre/competition-center" },
          { name: "Delegasi Lomba", table: "delegasi_lomba", icon: FaGlobe, color: "text-sky-400", path: "/admin-sre/delegasi-lomba" },
          { name: "Medium Archive", table: "idea_medium_archive", icon: FaLightbulb, color: "text-amber-300", path: "/admin-sre/idea-medium-archive" },
          { name: "Research Archive", table: "research_archive", icon: FaArchive, color: "text-rose-400", path: "/admin-sre/research-archive" },
          { name: "Arsip Prestasi", table: "prestasi_crd", icon: FaAward, color: "text-[#fff0aa]", path: "/admin-sre/prestasi-crd" },
        ];

      case "hr":
        return [
          { name: "Divisions & Staff", table: "staff", icon: FaUserTie, color: "text-[#fff0aa]", path: "/admin-sre/staff" },
          { name: "Monitoring Staff", table: "monitoring_staff", icon: FaUsersCog, color: "text-teal-300", path: "/admin-sre/monitoring-staff" },
          { name: "Administrasi Staff", table: "administrasi", icon: FaRegListAlt, color: "text-sky-400", path: "/admin-sre/administrasi" },
        ];

      case "pr":
        return [
          { name: "Tracker Program", table: "tracker_program", icon: FaTasks, color: "text-rose-400", path: "/admin-sre/tracker-program" },
          { name: "Sub Divisi Jobdesk", table: "sub_divisi_jobdesk", icon: FaGlobe, color: "text-teal-300", path: "/admin-sre/sub-divisi-jobdesk" },
          { name: "Kontak Staff PR", table: "kontak_sosmed_staff", icon: FaUsers, color: "text-[#fff0aa]", path: "/admin-sre/kontak-sosmed-staff" },
        ];

      case "graphic-design":
        return [
          { name: "Brand Identity", table: "graphic_assets", icon: FaPalette, color: "text-amber-300", path: "/admin-sre/graphic-assets" },
          { name: "Design Showcase", table: "design_showcase", icon: FaAward, color: "text-emerald-400", path: "/admin-sre/design-showcase" },
        ];

      case "finance":
        return [
          { name: "Merchandise", table: "merchandise", icon: FaTshirt, color: "text-[#fff0aa]", path: "/admin-sre/merchandise" },
        ];

      default:
        return [];
    }
  };

  const fetchTableCount = async (tableName: string) => {
    try {
      if (tableName === "staff" || tableName === "divisions") {
        const { data } = await supabase.from("divisions").select("members");
        return data ? data.reduce((sum: number, d: any) => sum + (d.members?.length || 0), 0) : 0;
      }
      const { count, error } = await supabase
        .from(tableName)
        .select("*", { count: "exact", head: true });
      if (error) {
        console.error(`Error fetching count for ${tableName}:`, error.message);
        return 0;
      }
      return count || 0;
    } catch (e) {
      console.error(e);
      return 0;
    }
  };

  const loadStats = async (role: string | null) => {
    setLoading(true);
    const config = getCardsConfigForRole(role);
    
    const countPromises = config.map(async (item) => {
      const count = await fetchTableCount(item.table);
      return { ...item, count };
    });

    const populatedCards = await Promise.all(countPromises);
    setCards(populatedCards);
    setLoading(false);
  };

  const fetchUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("user_roles").select("role").eq("id", user.id).single();
      if (data) {
        setUserRole(data.role);
        return data.role;
      }
    }
    setUserRole("staff");
    return "staff";
  };

  useEffect(() => {
    fetchUserRole().then((role) => {
      loadStats(role);
    });
  }, []);

  const quickLink1 = cards[0] || null;
  const quickLink2 = cards[1] || null;

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
              {userRole ? `${userRole.replace("-", " ").toUpperCase()} SESSION` : "SECURE CONNECTION"}
            </div>
            <h1 className="font-akira text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              SRE PENS // OVERVIEW
            </h1>
            <p className="font-poppins text-xs sm:text-sm text-white/80 max-w-2xl mt-3 leading-relaxed font-light">
              Welcome to your customized overview panel. Manage content domains specific to your role, review statistics, and monitor records in real-time.
            </p>
          </div>
          <button
            onClick={() => loadStats(userRole)}
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
            <span className="w-1.5 h-1.5 bg-[#fff0aa]" /> SUMMARY METRICS
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
                  <div className={`p-3.5 bg-white/5 border border-white/15 ${card.color}`}>
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
          {!loading && cards.length === 0 && (
            <div className="col-span-full py-12 text-center text-white/40 font-poppins text-sm border border-dashed border-white/10">
              No metrics available for your current role.
            </div>
          )}
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
              Select any domain below to start publishing or editing data records instantly.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLink1 && (
              <Link
                href={quickLink1.path}
                className="flex items-center justify-center gap-3 py-4 px-6 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md text-center"
              >
                <FaPlus size={12} className="flex-shrink-0" /> {quickLink1.name.toUpperCase()}
              </Link>
            )}
            {quickLink2 && (
              <Link
                href={quickLink2.path}
                className="flex items-center justify-center gap-3 py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-poppins font-semibold text-xs uppercase tracking-widest transition-all border border-white/15 text-center"
              >
                <FaPlus size={12} className="flex-shrink-0" /> {quickLink2.name.toUpperCase()}
              </Link>
            )}
            {!quickLink1 && !quickLink2 && (
              <div className="col-span-full text-center text-white/40 font-poppins text-xs py-4">
                No quick actions configured.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
