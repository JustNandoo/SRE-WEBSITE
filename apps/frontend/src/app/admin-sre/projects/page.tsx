"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { fetchProjects, Project } from "@/services/api";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaCheckCircle,
  FaTimes,
  FaLock,
  FaTasks,
  FaDollarSign,
  FaUser,
  FaCalendarAlt,
  FaExchangeAlt,
  FaSearch,
} from "react-icons/fa";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Period management
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Januari - Juni 2026");
  const availablePeriods = [
    "Januari - Juni 2025",
    "Juli - Desember 2025",
    "Januari - Juni 2026",
    "Juli - Desember 2026",
    "Januari - Juni 2027",
    "Juli - Desember 2027",
  ];

  // Search & Pagination states
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when period or search queries mutate
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPeriod, search]);

  // Modals & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (notice) {
      if (typeof window !== "undefined" && (window as any).showToast) {
        (window as any).showToast(notice.type === "success" ? "success" : "error", (notice as any).text || (notice as any).message || "");
      }
    }
  }, [notice]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pj: "",
    period: "Januari - Juni 2026",
    target_time: "",
    budget: 0,
    status: "Direncanakan" as Project["status"],
  });

  const supabase = createClient();

  const checkAuthorization = async () => {
    setCheckingAuth(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (roleData) {
        setUserRole(roleData.role);
      }
    }
    setCheckingAuth(false);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await fetchProjects();
    if (res) {
      setProjects(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  useEffect(() => {
    if (userRole === "super-admin" || userRole === "p-level" || userRole === "staff") {
      loadData();
    }
  }, [userRole]);

  const openNewModal = () => {
    setEditingProject(null);
    setFormData({
      name: "",
      description: "",
      pj: "",
      period: selectedPeriod,
      target_time: "",
      budget: 0,
      status: "Direncanakan",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Project) => {
    setEditingProject(item);
    setFormData({
      name: item.name,
      description: item.description,
      pj: item.pj,
      period: item.period,
      target_time: item.target_time,
      budget: Number(item.budget),
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!(await new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).showConfirmModal) {
        (window as any).showConfirmModal({
          title: "Konfirmasi Hapus",
          message: "Apakah Anda yakin ingin menghapus data ini secara permanen?",
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        });
      } else {
        resolve(confirm("Apakah Anda yakin ingin menghapus data ini secara permanen?"));
      }
    }))) return;
    setLoading(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setNotice({ type: "success", text: "Project deleted successfully." });
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).showConfirmModal) {
        (window as any).showConfirmModal({
          title: "Konfirmasi Simpan",
          message: "Apakah Anda yakin data yang dimasukkan sudah benar?",
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        });
      } else {
        resolve(true);
      }
    }))) return;
    setSaving(true);
    setNotice(null);

    const payload = {
      name: formData.name,
      description: formData.description,
      pj: formData.pj,
      period: formData.period,
      target_time: formData.target_time,
      budget: Number(formData.budget),
      status: formData.status,
    };

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingProject.id);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Project details successfully updated." });
        setIsModalOpen(false);
        loadData();
      }
    } else {
      const { error } = await supabase.from("projects").insert([payload]);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "New project successfully registered." });
        setIsModalOpen(false);
        loadData();
      }
    }
    setSaving(false);
  };

  const handleQuickStatusChange = async (id: string, newStatus: Project["status"]) => {
    const { error } = await supabase
      .from("projects")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      setNotice({ type: "error", text: error.message });
    } else {
      setNotice({ type: "success", text: `Status updated to ${newStatus}.` });
      loadData();
    }
  };

  // Filter projects by period
  const periodProjects = projects.filter((p) => p.period === selectedPeriod);

  // Filter projects by period and search query
  const filteredProjects = periodProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.pj.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats based on period program
  const totalBudget = periodProjects.reduce((sum, p) => sum + Number(p.budget), 0);
  const statusCounts = {
    Direncanakan: periodProjects.filter((p) => p.status === "Direncanakan").length,
    "Sedang Berjalan": periodProjects.filter((p) => p.status === "Sedang Berjalan").length,
    Selesai: periodProjects.filter((p) => p.status === "Selesai").length,
    Dibatalkan: periodProjects.filter((p) => p.status === "Dibatalkan").length,
  };

  if (checkingAuth) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-white/50 font-poppins">
        <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
        <span>Authenticating administrative credentials...</span>
      </div>
    );
  }

  // Strictly enforce super-admin, p-level, or staff
  if (userRole !== "super-admin" && userRole !== "p-level" && userRole !== "staff") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 font-poppins text-white">
        <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center rounded-full">
          <FaLock size={24} />
        </div>
        <h2 className="font-akira text-lg text-red-400 uppercase tracking-wider">Access Denied</h2>
        <p className="text-sm text-white/70 leading-relaxed font-light">
          Your account role (<strong className="text-[#fff0aa]">{userRole || "unknown"}</strong>) is unauthorized to access this panel. Only <strong className="text-white">super-admin</strong>, <strong className="text-white">p-level</strong>, and <strong className="text-white">staff</strong> roles are permitted.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-12 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#012e21] border border-white/15 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#fff0aa]/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">
            {userRole === "staff" ? "STAFF PROJECT CENTER" : "SEMESTER PROJECTS"}
          </h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">
            {userRole === "staff"
              ? "Read-only viewport for SRE PENS periodic work programs and target milestones."
              : "Periodic 6-month work programs and target milestones track sheet."}
          </p>
        </div>
        {userRole !== "staff" ? (
          <button
            onClick={openNewModal}
            className="relative z-10 flex items-center gap-3 px-7 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaPlus size={14} /> NEW WORK PROGRAM
          </button>
        ) : (
          <div className="relative z-10 px-5 py-3 border border-[#fff0aa]/30 bg-[#fff0aa]/5 font-poppins text-[10px] font-bold uppercase tracking-widest text-[#fff0aa]">
            READ-ONLY VIEWPORT
          </div>
        )}
      </div>

      {userRole === "staff" && (
        <div className="p-4 border border-blue-500/30 bg-blue-950/20 font-poppins text-xs text-blue-300 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
          <span>You are viewing SRE PENS Semester Projects under the read-only Staff console. Administrative mutations are restricted.</span>
        </div>
      )}

      {/* Notices */}
      {notice && (
        <div className={`p-4 border font-poppins text-xs flex items-center justify-between font-medium transition-all ${notice.type === "success" ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-red-950/40 border-red-500/40 text-red-300"}`}>
          <div className="flex items-center gap-3">
            <FaCheckCircle size={16} className={notice.type === "success" ? "text-emerald-400" : "text-red-400"} />
            <span>{notice.text}</span>
          </div>
          <button onClick={() => setNotice(null)} className="opacity-60 hover:opacity-100 p-1">
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects by name, description, or PJ..."
          className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-xs sm:text-sm tracking-wide transition-all"
        />
      </div>

      {/* Control Panel: Filters & Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-poppins">
        {/* Dropdown Filter */}
        <div className="lg:col-span-4 bg-[#011f16] border border-white/10 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">SELECT WORK PERIOD</label>
            <p className="text-xs text-white/50 leading-relaxed font-light">View and manage programs specifically scheduled for this 6-month interval.</p>
          </div>
          <div className="relative mt-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-[#012e21] border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white font-semibold text-sm appearance-none cursor-pointer focus:outline-none"
            >
              {availablePeriods.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget & Stats */}
        <div className="lg:col-span-8 bg-[#011f16] border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
          {/* Total Budget Card */}
          <div className="space-y-1">
            <span className="block text-[10px] text-white/50 uppercase tracking-widest font-mono">TOTAL ESTIMATED BUDGET</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#fff0aa] font-semibold">Rp</span>
              <span className="text-2xl font-bold text-white font-mono">{totalBudget.toLocaleString("id-ID")}</span>
            </div>
            <span className="block text-[9px] text-[#fff0aa]/70 font-mono font-medium">Selected Period Total</span>
          </div>

          {/* Status breakdown */}
          <div className="space-y-2 col-span-1 md:col-span-2 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-white/60">Direncanakan</span>
              <span className="font-bold text-[#fff0aa]">{statusCounts.Direncanakan}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-white/60">Sedang Berjalan</span>
              <span className="font-bold text-sky-400">{statusCounts["Sedang Berjalan"]}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-white/60">Selesai</span>
              <span className="font-bold text-emerald-400">{statusCounts.Selesai}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-white/60">Dibatalkan</span>
              <span className="font-bold text-red-400">{statusCounts.Dibatalkan}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/50 font-poppins">
          <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
          <span>Fetching periodic work programs...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-white/10 bg-white/5 font-poppins text-sm text-white/50">
          <p>No work programs found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-8 font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedProjects.map((project) => {
              const isCompleted = project.status === "Selesai";
              const isInProgress = project.status === "Sedang Berjalan";
              const isCancelled = project.status === "Dibatalkan";
              const isPlanned = project.status === "Direncanakan";

              let percent = 15;
              let barColor = "bg-amber-500";
              if (isCompleted) {
                percent = 100;
                barColor = "bg-emerald-500";
              } else if (isInProgress) {
                percent = 55;
                barColor = "bg-sky-500";
              } else if (isCancelled) {
                percent = 0;
                barColor = "bg-red-500";
              }

              return (
                <div
                  key={project.id}
                  className="bg-[#011f16] border border-white/10 hover:border-[#fff0aa]/40 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative group"
                >
                  <div>
                    {/* Top Bar inside Card */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        isCompleted
                          ? "bg-emerald-955/50 text-emerald-400 border border-emerald-500/30"
                          : isInProgress
                          ? "bg-sky-955/50 text-sky-400 border border-sky-500/30"
                          : isCancelled
                          ? "bg-red-955/50 text-red-400 border border-red-500/30"
                          : "bg-amber-955/40 text-amber-300 border border-amber-500/30"
                      }`}>
                        {project.status}
                      </span>
                      
                      {/* Action buttons - Hidden for staff */}
                      {userRole !== "staff" && (
                        <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-1.5 bg-white/5 hover:bg-[#fff0aa] hover:text-[#011f16] border border-white/10 transition-all text-xs"
                            title="Edit details"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-1.5 bg-red-955/20 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all text-xs"
                            title="Delete program"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Title & Desc */}
                    <h3 className="font-akira text-sm uppercase tracking-wider text-white mb-2 leading-snug">{project.name}</h3>
                    <p className="text-white/70 text-xs leading-relaxed font-light mb-6">{project.description}</p>
                  </div>

                  {/* Specs Grid */}
                  <div className="border-t border-white/5 pt-4 space-y-3 font-mono text-[11px] text-white/60">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><FaUser size={10} className="text-[#fff0aa]" /> PIC (PJ)</span>
                      <span className="font-semibold text-white font-sans">{project.pj}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} className="text-[#fff0aa]" /> TIMEFRAME</span>
                      <span className="text-white">{project.target_time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><FaDollarSign size={10} className="text-[#fff0aa]" /> BUDGET</span>
                      <span className="font-bold text-white font-mono">Rp {Number(project.budget).toLocaleString("id-ID")}</span>
                    </div>

                    {/* Dynamic Status / Actions footer */}
                    {userRole !== "staff" ? (
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/40"><FaExchangeAlt size={9} /> QUICK STATUS</span>
                        <div className="flex gap-1">
                          {(["Direncanakan", "Sedang Berjalan", "Selesai", "Dibatalkan"] as Project["status"][]).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleQuickStatusChange(project.id, st)}
                              className={`px-1.5 py-0.5 text-[8px] font-bold uppercase transition-all ${
                                project.status === st
                                  ? "bg-[#fff0aa] text-[#012e21] cursor-default"
                                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                              }`}
                              disabled={project.status === st}
                            >
                              {st.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-3 border-t border-white/5 space-y-1.5">
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/40">
                          <span>PROJECT PROGRESS</span>
                          <span className="text-[#fff0aa]">{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                          <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 mt-8 font-poppins text-xs gap-4">
              <div className="text-white/60">
                Showing <span className="font-semibold text-[#fff0aa]">{startIndex + 1}</span> to{" "}
                <span className="font-semibold text-[#fff0aa]">
                  {Math.min(startIndex + itemsPerPage, filteredProjects.length)}
                </span>{" "}
                of <span className="font-semibold text-[#fff0aa]">{filteredProjects.length}</span> work programs
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#fff0aa] disabled:opacity-30 disabled:hover:border-white/10 transition-all font-semibold uppercase tracking-wider text-[10px]"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center border font-bold ${
                      currentPage === page
                        ? "bg-[#fff0aa] text-[#012e21] border-[#fff0aa]"
                        : "bg-white/5 border-white/10 text-white hover:border-[#fff0aa]"
                    } transition-all`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#fff0aa] disabled:opacity-30 disabled:hover:border-white/10 transition-all font-semibold uppercase tracking-wider text-[10px]"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal block */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#012e21] border border-[#fff0aa]/20 w-full max-w-lg p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white/50 hover:text-white p-2"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="font-akira text-sm uppercase tracking-wider text-white mb-6">
              {editingProject ? "Edit Work Program" : "Register New Work Program"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Program Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. SRE Camp 2026"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Semester Period</label>
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white appearance-none cursor-pointer"
                  >
                    {availablePeriods.map((p) => (
                      <option key={p} value={p} className="bg-[#012e21]">{p}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">PIC / Person in Charge</label>
                  <input
                    type="text"
                    required
                    value={formData.pj}
                    onChange={(e) => setFormData({ ...formData, pj: e.target.value })}
                    placeholder="e.g. Sarah Amelia"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Target Exec Month / Range</label>
                  <input
                    type="text"
                    required
                    value={formData.target_time}
                    onChange={(e) => setFormData({ ...formData, target_time: e.target.value })}
                    placeholder="e.g. April 2026"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Estimated Budget (IDR)</label>
                  <input
                    type="number"
                    required
                    value={formData.budget || ""}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    placeholder="e.g. 5000000"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Program Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Project["status"] })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white appearance-none cursor-pointer"
                >
                  <option value="Direncanakan" className="bg-[#012e21]">Direncanakan</option>
                  <option value="Sedang Berjalan" className="bg-[#012e21]">Sedang Berjalan</option>
                  <option value="Selesai" className="bg-[#012e21]">Selesai</option>
                  <option value="Dibatalkan" className="bg-[#012e21]">Dibatalkan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Description & Objectives</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail program objectives, execution timeline, and resource allocation requirements..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20 resize-none text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#fff0aa] text-[#012e21] hover:bg-white hover:text-black py-3.5 font-akira text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-bold"
              >
                {saving ? <FaSpinner className="animate-spin" /> : <FaTasks size={12} />}
                <span>{editingProject ? "SAVE CHANGES" : "REGISTER PROJECT"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
