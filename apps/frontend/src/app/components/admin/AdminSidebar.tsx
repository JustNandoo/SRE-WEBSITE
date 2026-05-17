"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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
  FaShieldAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin-sre/login");
  };

  if (pathname === "/admin-sre/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", path: "/admin-sre", icon: FaHome },
    { name: "Academics", path: "/admin-sre/academics", icon: FaBook },
    { name: "Activities", path: "/admin-sre/activities", icon: FaCalendarAlt },
    { name: "Articles", path: "/admin-sre/articles", icon: FaNewspaper },
    { name: "Merchandise", path: "/admin-sre/merchandise", icon: FaTshirt },
    { name: "Divisions & Staff", path: "/admin-sre/staff", icon: FaUserTie },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#011a12] text-white font-sans selection:bg-[#F2C601] selection:text-[#012e21]">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#012e21] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F2C601] text-[#012e21] rounded-xl flex items-center justify-center font-bold">
            <FaShieldAlt size={16} />
          </div>
          <span className="font-akira tracking-wider text-lg uppercase">SRE CMS</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[#F2C601] transition-colors p-2"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-72 bg-[#012e21]/80 backdrop-blur-3xl border-r border-white/10 flex flex-col flex-shrink-0 transition-all duration-300 fixed md:sticky top-0 z-40 h-screen overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#F2C601] text-[#012e21] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(242,198,1,0.4)]">
              <FaShieldAlt size={24} />
            </div>
            <div>
              <h2 className="font-akira text-xl tracking-tighter uppercase text-white">SRE PENS</h2>
              <span className="font-mono text-[10px] text-[#F2C601] tracking-[0.2em] uppercase">CMS System</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#F2C601] transition-colors border border-white/10 rounded-full px-4 py-1.5 bg-white/5"
          >
            <span>Visit Live Site</span> <FaExternalLinkAlt size={10} />
          </Link>
        </div>

        {/* User Card */}
        <div className="mx-6 my-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <FaUserCircle size={32} className="text-[#F2C601] flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-semibold truncate text-white">{user?.email || "admin@sre-pens.com"}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2 mb-8">
          <p className="px-4 font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-4">Database Modules</p>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-mono text-sm tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#F2C601] text-[#012e21] font-bold shadow-[0_0_20px_rgba(242,198,1,0.3)]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#012e21]" : "text-[#F2C601]"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div className="p-6 border-t border-white/10 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-mono text-sm tracking-wider uppercase shadow-inner"
          >
            <FaSignOutAlt size={16} />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
