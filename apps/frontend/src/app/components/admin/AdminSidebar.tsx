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
  FaExternalLinkAlt,
} from "react-icons/fa";
import Image from "next/image";

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
    return <div className="admin-viewport min-h-screen w-full bg-[#012e21]">{children}</div>;
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
        className={`w-72 bg-[#012e21] border-r border-white/10 flex flex-col flex-shrink-0 transition-transform duration-300 fixed top-0 left-0 z-40 h-screen overflow-y-auto scrollbar-hide shadow-2xl ${
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
              <span className="font-poppins text-[10px] font-semibold text-[#fff0aa] tracking-[0.2em] uppercase block mt-1.5">STAFF CONSOLE</span>
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
        <nav className="flex-1 px-6 space-y-2 mb-8 font-poppins">
          <p className="px-4 text-[10px] font-semibold text-white/40 tracking-[0.2em] uppercase mb-4">CONTENT DOMAINS</p>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#fff0aa] text-[#012e21] font-bold shadow-lg pl-6 border-l-4 border-[#011f16]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#012e21]" : "text-[#fff0aa]"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div className="p-6 border-t border-white/10 mt-auto flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-red-950/30 border border-red-500/30 text-red-300 hover:bg-red-500 hover:text-white transition-all font-poppins font-semibold text-xs tracking-wider uppercase shadow-sm"
          >
            <FaSignOutAlt size={15} />
            <span>SECURE LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 md:ml-72 p-6 sm:p-8 md:p-14 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
