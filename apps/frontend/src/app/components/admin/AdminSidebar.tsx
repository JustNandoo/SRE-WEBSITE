"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { fetchUserRoleById } from "@/services/api";
import { ToastStyles, ToastItem } from "@/app/components/ui/Toast";
import { type User } from "@supabase/supabase-js";
import {
  FaHome,
  FaBook,
  FaCalendarAlt,
  FaNewspaper,
  FaTshirt,
  FaUserTie,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaExternalLinkAlt,
  FaGlobe,
  FaTasks,
  FaFileAlt,
  FaFolderOpen,
  FaInfoCircle,
  FaUsers,
  FaUserPlus,
  FaRegListAlt,
  FaGraduationCap,
  FaLeaf,
  FaRobot,
  FaInstagram,
  FaChartLine,
  FaFlask,
  FaTrophy,
  FaLightbulb,
  FaArchive,
  FaAward,
  FaUsersCog,
  FaFileInvoiceDollar,
  FaHandHoldingHeart,
  FaPalette,
  FaUserCog,
  FaExclamationTriangle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Image from "next/image";

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Global Toast and Confirm states
  const [toasts, setToasts] = useState<Array<{ id: string; type: "success" | "error"; text: string }>>([]);
  const [confirmOptions, setConfirmOptions] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  } | null>(null);

  // Register handlers on window for access by child page components
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).showToast = (type: "success" | "error", text: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, text }]);
      };
      (window as any).showConfirmModal = (options: {
        title: string;
        message: string;
        onConfirm: () => void;
        onCancel?: () => void;
      }) => {
        setConfirmOptions(options);
      };
    }
  }, []);

  const handleConfirmAction = () => {
    if (confirmOptions?.onConfirm) {
      confirmOptions.onConfirm();
    }
    setConfirmOptions(null);
  };

  const handleCancelAction = () => {
    if (confirmOptions?.onCancel) {
      confirmOptions.onCancel();
    }
    setConfirmOptions(null);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user }, error }) => {
      console.log("[sidebar] getUser:", user?.email ?? "(null)", error ? "err=" + error.message : "");
      setUser(user);
      if (user) {
        const role = await fetchUserRoleById(user.id);
        console.log("[sidebar] role resolved:", role);
        if (role) setUserRole(role);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const u = session?.user ?? null;
      console.log("[sidebar] authStateChange:", event, u?.email ?? "(null)");
      setUser(u);
      if (u) {
        const role = await fetchUserRoleById(u.id);
        if (role) setUserRole(role);
      } else {
        setUserRole(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // Logout SINKRON: hapus sesi lokal + cookie lalu langsung redirect, TANPA
  // menunggu jaringan. Sebelumnya `await supabase.auth.signOut()` bisa
  // menggantung sehingga tombol "KELUAR..." macet dan tak pernah keluar.
  // Membersihkan cookie sb-*-auth-token (path=/) sudah terbukti efektif,
  // jadi middleware di /admin-sre/login melihat tidak ada sesi lagi.
  const handleLogout = () => {
    setLoggingOut(true);
    // Revoke di server best-effort, TANPA ditunggu (tidak boleh memblokir).
    try {
      void supabase.auth.signOut({ scope: "local" });
    } catch (e) {
      console.error("Signout error:", e);
    }
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Abaikan bila storage tidak tersedia (mode privat, dll).
    }
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0]?.trim();
        if (!name) return;
        // Host-only (path=/) dan varian berdomain, untuk jaga-jaga.
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      });
    }
    window.location.href = "/admin-sre/login";
  };

  if (pathname === "/admin-sre/login") {
    return <div className="admin-viewport min-h-screen w-full bg-[#012e21]">{children}</div>;
  }

  const getNavItemsByRole = (role: string | null) => {
    if (!role) return [];

    if (role === "super-admin" || role === "p-level") {
      return [
        {
          groupName: "Main Overview",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Manage Accounts", path: "/admin-sre/accounts", icon: FaUsersCog },
            { name: "Academics", path: "/admin-sre/academics", icon: FaBook },
            { name: "Activities", path: "/admin-sre/activities", icon: FaCalendarAlt },
            { name: "Articles", path: "/admin-sre/articles", icon: FaNewspaper },
            { name: "Merchandise", path: "/admin-sre/merchandise", icon: FaTshirt },
            { name: "Divisions & Staff", path: "/admin-sre/staff", icon: FaUserTie },
            { name: "External Relations", path: "/admin-sre/external-relations", icon: FaGlobe },
            { name: "Semester Projects", path: "/admin-sre/projects", icon: FaTasks },
          ]
        },
        {
          groupName: "Secretary & Administration",
          items: [
            { name: "Laporan LPJ", path: "/admin-sre/lpj", icon: FaFileAlt },
            { name: "Agenda & Kalendar", path: "/admin-sre/agenda", icon: FaCalendarAlt },
            { name: "Pusat Informasi", path: "/admin-sre/pusat-informasi", icon: FaInfoCircle },
            { name: "Arsip Surat", path: "/admin-sre/arsip-surat", icon: FaFolderOpen },
            { name: "Database Anggota", path: "/admin-sre/database-anggota", icon: FaUsers },
          ]
        },
        {
          groupName: "Treasurer",
          items: [
            { name: "Laporan Keuangan", path: "/admin-sre/laporan-keuangan-publik", icon: FaFileInvoiceDollar },
            { name: "Donasi & Pendanaan", path: "/admin-sre/donasi-pendanaan", icon: FaHandHoldingHeart },
            { name: "Manajemen Anggaran", path: "/admin-sre/manajemen-anggaran", icon: FaTasks },
          ]
        },
        {
          groupName: "Education & Research",
          items: [
            { name: "Learning Center", path: "/admin-sre/learning-center", icon: FaGraduationCap },
            { name: "Green Energy Update", path: "/admin-sre/green-energy-update", icon: FaLeaf },
          ]
        },
        {
          groupName: "Content Marketing",
          items: [
            { name: "Engagement Feed", path: "/admin-sre/engagement-feed", icon: FaInstagram },
            { name: "Account Insight", path: "/admin-sre/account-insight", icon: FaChartLine },
            { name: "AI Analisis", path: "/admin-sre/ai-analisis", icon: FaRobot },
          ]
        },
        {
          groupName: "Competition & Research Development",
          items: [
            { name: "Program Kerja CRD", path: "/admin-sre/program-kerja-crd", icon: FaTasks },
            { name: "Project & Research", path: "/admin-sre/project-research-development", icon: FaFlask },
            { name: "Competition Center", path: "/admin-sre/competition-center", icon: FaTrophy },
            { name: "Delegasi Lomba", path: "/admin-sre/delegasi-lomba", icon: FaGlobe },
            { name: "Medium Archive", path: "/admin-sre/idea-medium-archive", icon: FaLightbulb },
            { name: "Research Archive", path: "/admin-sre/research-archive", icon: FaArchive },
            { name: "Arsip Prestasi", path: "/admin-sre/prestasi-crd", icon: FaAward },
          ]
        },
        {
          groupName: "Pendaftaran (Open Recruitment)",
          items: [
            { name: "Data Pendaftar", path: "/admin-sre/pendaftar", icon: FaUserPlus },
          ]
        },
        {
          groupName: "Human Resources (HR)",
          items: [
            { name: "Monitoring Staff", path: "/admin-sre/monitoring-staff", icon: FaUsersCog },
            { name: "Administrasi Staff", path: "/admin-sre/administrasi", icon: FaRegListAlt },
          ]
        },
        {
          groupName: "Public Relations (PR)",
          items: [
            { name: "Tracker Program", path: "/admin-sre/tracker-program", icon: FaTasks },
            { name: "Sub Divisi Jobdesk", path: "/admin-sre/sub-divisi-jobdesk", icon: FaGlobe },
            { name: "Kontak Staff PR", path: "/admin-sre/kontak-sosmed-staff", icon: FaUsers },
          ]
        },
        {
          groupName: "Creative Design",
          items: [
            { name: "Brand Identity", path: "/admin-sre/graphic-assets", icon: FaPalette },
            { name: "Design Showcase", path: "/admin-sre/design-showcase", icon: FaAward },
          ]
        }
      ];
    }

    if (role === "staff") {
      return [
        {
          groupName: "Content Domains",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Academics", path: "/admin-sre/academics", icon: FaBook },
            { name: "Activities", path: "/admin-sre/activities", icon: FaCalendarAlt },
            { name: "Articles", path: "/admin-sre/articles", icon: FaNewspaper },
            { name: "Merchandise", path: "/admin-sre/merchandise", icon: FaTshirt },
            { name: "Divisions & Staff", path: "/admin-sre/staff", icon: FaUserTie },
            { name: "External Relations", path: "/admin-sre/external-relations", icon: FaGlobe },
            { name: "Semester Projects", path: "/admin-sre/projects", icon: FaTasks },
          ]
        }
      ];
    }

    if (role === "secretary" || role === "staff-secretary") {
      return [
        {
          groupName: "Secretary",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Laporan LPJ", path: "/admin-sre/lpj", icon: FaFileAlt },
            { name: "Agenda & Kalendar", path: "/admin-sre/agenda", icon: FaCalendarAlt },
            { name: "Pusat Informasi", path: "/admin-sre/pusat-informasi", icon: FaInfoCircle },
            { name: "Arsip Surat", path: "/admin-sre/arsip-surat", icon: FaFolderOpen },
            { name: "Database Anggota", path: "/admin-sre/database-anggota", icon: FaUsers },
          ]
        }
      ];
    }

    if (role === "treasurer" || role === "staff-treasurer") {
      return [
        {
          groupName: "Treasurer",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Laporan Keuangan", path: "/admin-sre/laporan-keuangan-publik", icon: FaFileInvoiceDollar },
            { name: "Donasi & Pendanaan", path: "/admin-sre/donasi-pendanaan", icon: FaHandHoldingHeart },
            { name: "Manajemen Anggaran", path: "/admin-sre/manajemen-anggaran", icon: FaTasks },
          ]
        }
      ];
    }

    if (role === "education" || role === "staff-education") {
      return [
        {
          groupName: "Education",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Articles", path: "/admin-sre/articles", icon: FaNewspaper },
            { name: "Academics", path: "/admin-sre/academics", icon: FaBook },
            { name: "Learning Center", path: "/admin-sre/learning-center", icon: FaGraduationCap },
            { name: "Green Energy Update", path: "/admin-sre/green-energy-update", icon: FaLeaf },
          ]
        }
      ];
    }

    if (role === "content-marketing" || role === "staff-content-marketing") {
      return [
        {
          groupName: "Content Marketing",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Engagement Feed", path: "/admin-sre/engagement-feed", icon: FaInstagram },
            { name: "Account Insight", path: "/admin-sre/account-insight", icon: FaChartLine },
            { name: "AI Analisis", path: "/admin-sre/ai-analisis", icon: FaRobot },
          ]
        }
      ];
    }

    if (role === "crd" || role === "staff-crd") {
      return [
        {
          groupName: "Competition & Research Development",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Program Kerja CRD", path: "/admin-sre/program-kerja-crd", icon: FaTasks },
            { name: "Project & Research", path: "/admin-sre/project-research-development", icon: FaFlask },
            { name: "Competition Center", path: "/admin-sre/competition-center", icon: FaTrophy },
            { name: "Delegasi Lomba", path: "/admin-sre/delegasi-lomba", icon: FaGlobe },
            { name: "Medium Archive", path: "/admin-sre/idea-medium-archive", icon: FaLightbulb },
            { name: "Research Archive", path: "/admin-sre/research-archive", icon: FaArchive },
            { name: "Arsip Prestasi", path: "/admin-sre/prestasi-crd", icon: FaAward },
          ]
        }
      ];
    }

    if (role === "hr" || role === "staff-hr") {
      return [
        {
          groupName: "Human Resources",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Divisions & Staff", path: "/admin-sre/staff", icon: FaUserTie },
            { name: "Monitoring Staff", path: "/admin-sre/monitoring-staff", icon: FaUsersCog },
            { name: "Administrasi Staff", path: "/admin-sre/administrasi", icon: FaRegListAlt },
          ]
        },
        {
          groupName: "Pendaftaran (Open Recruitment)",
          items: [
            { name: "Data Pendaftar", path: "/admin-sre/pendaftar", icon: FaUserPlus },
          ]
        }
      ];
    }

    if (role === "pr" || role === "staff-pr") {
      return [
        {
          groupName: "Public Relations",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Tracker Program", path: "/admin-sre/tracker-program", icon: FaTasks },
            { name: "Sub Divisi Jobdesk", path: "/admin-sre/sub-divisi-jobdesk", icon: FaGlobe },
            { name: "Kontak Staff PR", path: "/admin-sre/kontak-sosmed-staff", icon: FaUsers },
          ]
        }
      ];
    }

    if (role === "graphic-design" || role === "staff-graphic-design") {
      return [
        {
          groupName: "Creative Design",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Brand Identity", path: "/admin-sre/graphic-assets", icon: FaPalette },
            { name: "Design Showcase", path: "/admin-sre/design-showcase", icon: FaAward },
          ]
        }
      ];
    }

    if (role === "finance" || role === "staff-finance") {
      return [
        {
          groupName: "Finance",
          items: [
            { name: "Overview", path: "/admin-sre", icon: FaHome },
            { name: "Merchandise", path: "/admin-sre/merchandise", icon: FaTshirt },
          ]
        }
      ];
    }

    return [];
  };

  const navGroups = getNavItemsByRole(userRole);

  if (userRole) {
    navGroups.push({
      groupName: "Settings",
      items: [
        { name: "Profile Settings", path: "/admin-sre/profile", icon: FaUserCog }
      ]
    });
  }

  return (
    <div className="admin-viewport min-h-screen flex flex-col md:flex-row bg-[#011f16] text-white font-sans selection:bg-[#fff0aa] selection:text-[#011f16]">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#012e21] border-b border-white/10 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex-shrink-0 bg-white/10 p-1 border border-white/15">
            <Image src="/favicon.ico" alt="SRE PENS Logo" fill className="object-contain" sizes="32px" />
          </div>
          <span className="font-akira tracking-wider text-base uppercase text-white">SRE CMS</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[#fff0aa] transition-colors p-2"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
        />
      )}

      {/* Fixed Minimalist Sidebar */}
      <aside
        className={`w-72 bg-[#012e21] border-r border-white/10 flex flex-col flex-shrink-0 transition-transform duration-300 fixed top-0 left-0 z-40 h-screen shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-8 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 relative flex-shrink-0 bg-white/5 p-1.5 border border-white/15 shadow-md">
              <Image src="/favicon.ico" alt="SRE PENS Logo" fill className="object-contain" sizes="44px" />
            </div>
            <div>
              <h2 className="font-akira text-lg tracking-wider uppercase text-white leading-none">SRE PENS</h2>
              <span className="font-poppins text-[10px] font-semibold text-[#fff0aa] tracking-[0.2em] uppercase block mt-1.5">{userRole ? `${userRole.replace("-", " ")} console` : "CONSOLE"}</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 font-poppins text-xs font-medium text-white/70 hover:text-[#fff0aa] transition-all border border-white/15 rounded-full px-4 py-2 bg-white/5 hover:bg-white/10 shadow-sm"
          >
            <span>Visit Live Website</span> <FaExternalLinkAlt size={10} />
          </Link>
        </div>

        {/* User Status Card */}
        <div className="mx-6 my-6 p-4 bg-white/5 border border-white/10 flex items-center gap-3.5 shadow-sm flex-shrink-0">
          <FaUserCircle size={28} className="text-[#fff0aa] flex-shrink-0" />
          <div className="overflow-hidden font-poppins">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Logged in as</p>
            <p className="text-xs font-semibold truncate text-white tracking-wide">{user?.email || "admin@sre-pens.com"}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 space-y-4 mb-8 font-poppins overflow-y-auto scrollbar-hide">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <p className="px-4 text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase mb-2 mt-4">{group.groupName}</p>
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 font-medium text-xs tracking-wider uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-[#fff0aa] text-[#012e21] font-bold shadow-lg pl-6 border-l-4 border-[#011f16]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-[#012e21]" : "text-[#fff0aa]"} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Logout Footer */}
        <div className="p-6 border-t border-white/10 mt-auto flex-shrink-0">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-red-950/30 border border-red-500/30 text-red-300 hover:bg-red-500 hover:text-white transition-all font-poppins font-semibold text-xs tracking-wider uppercase shadow-sm"
          >
            <FaSignOutAlt size={15} />
            <span>SECURE LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-[999] p-4 font-poppins">
          <div className="bg-[#012e21] border border-white/15 w-full max-w-sm p-8 shadow-2xl relative animate-fade-in">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center">
                <FaExclamationTriangle size={26} className="text-red-400" />
              </div>
            </div>
            {/* Text */}
            <h3 className="font-akira text-center text-sm text-white uppercase tracking-wider mb-3">Konfirmasi Logout</h3>
            <p className="text-center text-white/60 text-xs leading-relaxed mb-8">
              Apakah Anda yakin ingin keluar dari sesi ini?<br />
              <span className="text-[#fff0aa] font-semibold">{user?.email}</span>
            </p>
            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={loggingOut}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaSignOutAlt size={12} />
                {loggingOut ? "Keluar..." : "Ya, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 md:ml-72 p-6 sm:p-8 md:p-14 overflow-y-auto min-h-screen">
        {children}
      </main>

      {/* Global Toast CSS Animations */}
      <ToastStyles />

      {/* Premium Toast Container (Top Right) */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-80 sm:w-96 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onClose={() => removeToast(t.id)} />
          </div>
        ))}
      </div>

      {/* Global Confirm Modal */}
      {confirmOptions && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 font-poppins">
          <div className="bg-[#012e21] border border-white/15 w-full max-w-md p-8 shadow-2xl relative animate-toast-in">
            <div className="flex justify-center mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                confirmOptions.title.toLowerCase().includes("hapus") || confirmOptions.title.toLowerCase().includes("delete")
                  ? "bg-red-950/40 border border-red-500/40"
                  : "bg-teal-950/40 border border-teal-500/40"
              }`}>
                <FaExclamationTriangle className={
                  confirmOptions.title.toLowerCase().includes("hapus") || confirmOptions.title.toLowerCase().includes("delete")
                    ? "text-red-400"
                    : "text-teal-400"
                } size={20} />
              </div>
            </div>
            <h3 className="font-akira text-center text-sm text-white uppercase tracking-wider mb-2">
              {confirmOptions.title}
            </h3>
            <p className="text-xs text-white/70 text-center leading-relaxed mb-6">
              {confirmOptions.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelAction}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmAction}
                className={`flex-1 py-3 font-bold text-xs tracking-wider uppercase transition-all ${
                  confirmOptions.title.toLowerCase().includes("hapus") || confirmOptions.title.toLowerCase().includes("delete")
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-[#fff0aa] hover:bg-white text-[#012e21]"
                }`}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


