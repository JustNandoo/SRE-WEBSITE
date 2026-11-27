"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaSearch, FaLock, FaFilePdf, FaImage, FaLink, FaSpinner, FaSyncAlt } from "react-icons/fa";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import type { RegistrationDivisionId, RegistrationEntity, RegistrationStatus } from "@sre-pens/shared-types";
import {
  fetchRegistrations,
  fetchRegistrationStats,
  subscribeToRegistrations,
  updateRegistrationStatus,
  type RegistrationChange,
  type RegistrationDivisionFilter,
} from "@/services/api";
import {
  REGISTRATION_EDITOR_ROLES,
  REGISTRATION_VIEWER_ROLES,
  divisionLabel,
  registrationDivisions,
  registrationStatuses,
} from "@/lib/registrationData";
import RecruitmentControlPanel from "@/app/components/admin/RecruitmentControlPanel";
import RegistrantDetailModal from "@/app/components/admin/RegistrantDetailModal";
import SpreadsheetSyncPanel from "@/app/components/admin/SpreadsheetSyncPanel";

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

type Stats = { total: number; byDivision: Record<string, number>; byStatus: Record<string, number> };

const statusClass: Record<RegistrationStatus, string> = {
  Menunggu: "text-[#fff0aa] border-[#fff0aa]/30 bg-[#fff0aa]/5",
  Diproses: "text-sky-300 border-sky-400/30 bg-sky-400/5",
  Lolos: "text-emerald-300 border-emerald-400/30 bg-emerald-400/5",
  "Tidak Lolos": "text-red-300 border-red-400/30 bg-red-400/5",
};

const showToast = (type: "success" | "error", text: string) => {
  const w = window as unknown as { showToast?: (type: "success" | "error", text: string) => void };
  if (w.showToast) w.showToast(type, text);
};

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function PendaftarAdminPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [items, setItems] = useState<RegistrationEntity[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, byDivision: {}, byStatus: {} });
  const [division, setDivision] = useState<RegistrationDivisionFilter>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const [realtimeTimedOut, setRealtimeTimedOut] = useState(false);
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  // Detail pendaftar yang sedang dibuka (modal). key = tab berkas awal (opsional).
  const [detail, setDetail] = useState<{ id: string; key?: string } | null>(null);
  const openDetail = (id: string, key?: string) => setDetail({ id, key });

  // Filter terbaru dibaca handler realtime tanpa harus subscribe ulang.
  const divisionRef = useRef<RegistrationDivisionFilter>("all");
  useEffect(() => {
    divisionRef.current = division;
  }, [division]);

  // --- Role ---
  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("id", user.id).single();
      if (data) setUserRole(data.role);
    })();
  }, []);

  const isAllowedToAccess = !!userRole && REGISTRATION_VIEWER_ROLES.includes(userRole);
  const isWritable = !!userRole && REGISTRATION_EDITOR_ROLES.includes(userRole);

  // --- Fetch ---
  const loadStats = useCallback(async () => {
    const { data } = await fetchRegistrationStats();
    if (data) setStats(data);
  }, []);

  const loadList = useCallback(async (filter: RegistrationDivisionFilter) => {
    setLoading(true);
    const { data, error } = await fetchRegistrations(filter);
    if (error) {
      setLoadError(error);
      showToast("error", error);
    } else {
      setLoadError(null);
      setItems(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAllowedToAccess) loadList(division);
  }, [isAllowedToAccess, division, loadList]);

  useEffect(() => {
    if (isAllowedToAccess) loadStats();
  }, [isAllowedToAccess, loadStats]);

  // --- Realtime: pendaftar baru langsung masuk ---
  useEffect(() => {
    if (!isAllowedToAccess) return;

    const handleChange = (change: RegistrationChange) => {
      const filter = divisionRef.current;
      const matches = (r: RegistrationEntity) =>
        filter === "all" || r.division_id === filter || r.division_id_2 === filter;

      if (change.type === "INSERT") {
        const record = change.record;
        if (matches(record)) {
          setItems((prev) => (prev.some((r) => r.id === record.id) ? prev : [record, ...prev]));
          setFreshIds((prev) => new Set(prev).add(record.id));
          setTimeout(() => {
            setFreshIds((prev) => {
              const next = new Set(prev);
              next.delete(record.id);
              return next;
            });
          }, 8000);
        }
        showToast("success", `Pendaftar baru: ${record.full_name} (${divisionLabel(record.division_id)})`);
      } else if (change.type === "UPDATE") {
        const record = change.record;
        setItems((prev) =>
          matches(record) ? prev.map((r) => (r.id === record.id ? record : r)) : prev.filter((r) => r.id !== record.id)
        );
      } else {
        setItems((prev) => prev.filter((r) => r.id !== change.id));
      }
      loadStats();
    };

    // Jika Realtime tak tersambung dalam 12 dtk (mis. tabel belum di-publish ke
    // realtime), berhenti menampilkan "Menghubungkan..." dan tandai nonaktif.
    setRealtimeTimedOut(false);
    const timeout = window.setTimeout(() => setRealtimeTimedOut(true), 12000);
    const handleStatus = (connected: boolean) => {
      setLive(connected);
      if (connected) {
        window.clearTimeout(timeout);
        setRealtimeTimedOut(false);
      }
    };

    const unsubscribe = subscribeToRegistrations(handleChange, handleStatus);
    return () => {
      window.clearTimeout(timeout);
      unsubscribe();
    };
  }, [isAllowedToAccess, loadStats]);

  // --- Actions ---
  const handleStatusChange = async (
    item: RegistrationEntity,
    status: RegistrationStatus,
    acceptedDivision?: RegistrationDivisionId | null
  ) => {
    // Saat Lolos, divisi diterima default ke pilihan pertama bila belum dipilih.
    const div =
      status === "Lolos" ? acceptedDivision ?? item.accepted_division ?? item.division_id : null;
    // Lewati bila status & divisi tidak berubah.
    if (status === item.status && (div ?? null) === (item.accepted_division ?? null)) return;
    setUpdatingId(item.id);
    const { data, error } = await updateRegistrationStatus(item.id, status, div);
    setUpdatingId(null);
    if (error || !data) {
      showToast("error", error ?? "Gagal mengubah status.");
      return;
    }
    setItems((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    showToast("success", `Status ${data.full_name} diubah menjadi ${data.status}.`);
    loadStats();
  };

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((r) =>
      [r.full_name, r.nrp, r.email, r.study_program].some((v) => v?.toLowerCase().includes(q))
    );
  }, [items, search]);

  if (userRole && !isAllowedToAccess) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 font-poppins text-white">
        <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center rounded-full">
          <FaLock size={24} />
        </div>
        <h2 className="font-akira text-lg text-red-400 uppercase tracking-wider">Access Denied</h2>
        <p className="text-sm text-white/70 leading-relaxed font-light">
          Akun Anda dengan role (<strong className="text-[#fff0aa]">{userRole}</strong>) tidak diizinkan mengakses panel ini.
        </p>
      </div>
    );
  }

  const fileButton = "inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-[#fff0aa] hover:text-[#011f16] border border-white/10 transition-all text-white/80 text-[11px] font-semibold uppercase tracking-wider";

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#012e21] border border-white/15 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#fff0aa]/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">DATA PENDAFTAR OPEN RECRUITMENT</h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">
            Seluruh pendaftar dari formulir /pendaftaran. Data baru masuk otomatis tanpa refresh.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-3 border border-white/15 bg-white/5 font-poppins text-[10px] font-semibold uppercase tracking-widest">
            <span
              className={`w-2 h-2 rounded-full ${
                live ? "bg-emerald-400 animate-pulse" : realtimeTimedOut ? "bg-white/25" : "bg-amber-400 animate-pulse"
              }`}
            />
            {live ? "Live" : realtimeTimedOut ? "Realtime nonaktif" : "Menghubungkan..."}
          </span>
          <button
            onClick={() => {
              loadList(division);
              loadStats();
            }}
            className="flex items-center gap-3 px-5 py-3 bg-[#fff0aa] hover:bg-white text-[#012e21] font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaSyncAlt size={12} /> MUAT ULANG
          </button>
        </div>
      </div>

      {/* Kontrol Rekrutmen: periode pendaftaran + pengumuman */}
      <RecruitmentControlPanel writable={isWritable} />

      {/* Spreadsheet live — khusus super-admin */}
      {userRole === "super-admin" && <SpreadsheetSyncPanel />}

      {/* Stats Counter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Pendaftar", value: stats.total, color: "text-[#fff0aa]" },
          { label: "Menunggu", value: stats.byStatus["Menunggu"] ?? 0, color: "text-white" },
          { label: "Lolos", value: stats.byStatus["Lolos"] ?? 0, color: "text-emerald-400" },
          { label: "Tidak Lolos", value: stats.byStatus["Tidak Lolos"] ?? 0, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="p-6 bg-[#012e21] border border-white/10 flex flex-col justify-between shadow-md">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">{s.label}</span>
            <span className={`text-2xl font-akira tracking-tight mt-2 ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Division Filter */}
      <div className="space-y-3">
        <span className="block text-[10px] text-white/50 uppercase tracking-widest font-semibold font-poppins">Filter Divisi</span>
        <div className="flex flex-wrap gap-2 font-poppins">
          {[{ id: "all" as const, label: "Semua Divisi", count: stats.total }, ...registrationDivisions.map((d) => ({ id: d.id, label: d.label, count: stats.byDivision[d.id] ?? 0 }))].map((d) => {
            const active = division === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setDivision(d.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 px-4 py-2.5 border text-xs font-semibold uppercase tracking-wider transition-all ${
                  active
                    ? "bg-[#fff0aa] text-[#012e21] border-[#fff0aa]"
                    : "bg-white/5 text-white/70 border-white/15 hover:border-[#fff0aa] hover:text-white"
                }`}
              >
                {d.label}
                <span className={`px-1.5 py-0.5 text-[10px] ${active ? "bg-[#012e21]/10" : "bg-white/10"}`}>{d.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, NRP, email, atau prodi..."
          className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-xs sm:text-sm tracking-wide transition-all"
        />
      </div>

      {/* Main Table */}
      <div className="bg-[#011f16] border border-white/10 p-6 md:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-poppins text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[#fff0aa] uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">Pendaftar</th>
                <th className="py-4 px-4 font-semibold">Prodi</th>
                <th className="py-4 px-4 font-semibold">Divisi</th>
                <th className="py-4 px-4 font-semibold">Berkas</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold text-right">Dikirim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading && items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-white/40">
                    <FaSpinner className="inline animate-spin mr-2" /> Memuat data pendaftar...
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => openDetail(item.id)}
                    title="Klik untuk lihat detail & berkas"
                    className={`cursor-pointer transition-colors ${freshIds.has(item.id) ? "bg-[#fff0aa]/10" : "hover:bg-white/5"}`}
                  >
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{item.full_name}</span>
                        {freshIds.has(item.id) && (
                          <span className="px-1.5 py-0.5 bg-[#fff0aa] text-[#012e21] text-[9px] font-bold uppercase tracking-widest">Baru</span>
                        )}
                      </div>
                      <div className="text-white/50 text-xs mt-1">{item.nrp} · {item.email}</div>
                    </td>
                    <td className="py-4 px-4 align-top font-medium text-white/80">{item.study_program}</td>
                    <td className="py-4 px-4 align-top font-medium text-white/80 whitespace-nowrap">
                      <div>{divisionLabel(item.division_id)}</div>
                      {item.division_id_2 && (
                        <div className="text-white/45 text-xs mt-1">+ {divisionLabel(item.division_id_2)}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); openDetail(item.id, "cover"); }} className={fileButton} title="Motivation letter">
                          <FaFilePdf size={11} /> Motlet
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); openDetail(item.id, "cv"); }} className={fileButton} title="Curriculum vitae">
                          <FaFilePdf size={11} /> CV
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); openDetail(item.id, "mbti"); }} className={fileButton} title="Hasil tes MBTI">
                          <FaImage size={11} /> MBTI
                        </button>
                        {item.portfolio_url && (
                          <a href={item.portfolio_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={fileButton} title={item.portfolio_url}>
                            <FaLink size={11} /> Porto
                          </a>
                        )}
                        {item.twibbon_proof &&
                          (item.twibbon_proof.startsWith("http") ? (
                            <a href={item.twibbon_proof} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={fileButton} title="Bukti twibbon (tautan)">
                              <FaLink size={11} /> Twibbon
                            </a>
                          ) : (
                            <button onClick={(e) => { e.stopPropagation(); openDetail(item.id, "twibbon"); }} className={fileButton} title="Bukti twibbon (screenshot)">
                              <FaImage size={11} /> Twibbon
                            </button>
                          ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top" onClick={(e) => e.stopPropagation()}>
                      {isWritable ? (
                        <div className="flex flex-col gap-2 min-w-[150px]">
                          <div className="flex items-center gap-2">
                            <select
                              value={item.status}
                              disabled={updatingId === item.id}
                              onChange={(e) => handleStatusChange(item, e.target.value as RegistrationStatus)}
                              className={`border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider focus:outline-none focus:border-[#fff0aa] disabled:opacity-50 ${statusClass[item.status]}`}
                            >
                              {registrationStatuses.map((s) => (
                                <option key={s} value={s} className="bg-[#012e21] text-white">
                                  {s}
                                </option>
                              ))}
                            </select>
                            {updatingId === item.id && <FaSpinner className="animate-spin text-white/50" size={12} />}
                          </div>

                          {/* Divisi penerimaan — muncul saat Lolos (lolos berkas -> wawancara) */}
                          {item.status === "Lolos" &&
                            (item.division_id_2 ? (
                              <select
                                value={item.accepted_division ?? item.division_id}
                                disabled={updatingId === item.id}
                                title="Diterima di divisi"
                                onChange={(e) => handleStatusChange(item, "Lolos", e.target.value as RegistrationDivisionId)}
                                className="border border-emerald-400/40 bg-emerald-400/10 text-emerald-200 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider focus:outline-none focus:border-[#fff0aa] disabled:opacity-50"
                              >
                                <option value={item.division_id} className="bg-[#012e21] text-white">
                                  {divisionLabel(item.division_id)}
                                </option>
                                <option value={item.division_id_2} className="bg-[#012e21] text-white">
                                  {divisionLabel(item.division_id_2)}
                                </option>
                              </select>
                            ) : (
                              <span className="inline-block border border-emerald-400/40 bg-emerald-400/10 text-emerald-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                                ✓ {divisionLabel(item.accepted_division ?? item.division_id)}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <span className={`inline-block border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${statusClass[item.status]}`}>
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top text-right text-white/60 whitespace-nowrap">{formatDateTime(item.submitted_at)}</td>
                  </tr>
                ))
              )}
              {!loading && filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/40">
                    {loadError ?? (search ? "Tidak ada pendaftar yang cocok dengan pencarian." : "Belum ada pendaftar di divisi ini.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {detail &&
        (() => {
          const item = items.find((i) => i.id === detail.id);
          if (!item) return null;
          return (
            <RegistrantDetailModal
              registration={item}
              isWritable={isWritable}
              updating={updatingId === item.id}
              initialKey={detail.key}
              onStatusChange={handleStatusChange}
              onClose={() => setDetail(null)}
            />
          );
        })()}
    </div>
  );
}
