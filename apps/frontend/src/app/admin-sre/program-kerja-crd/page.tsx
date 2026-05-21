"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaSearch,
  FaTimes,
  FaSave,
  FaCheckCircle,
  FaExclamationCircle,
  FaLock,
  FaTasks
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

interface ItemType {
  id: string;
  [key: string]: any;
}

export default function AdminPage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemType | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Record<string, any>>({"program_name": "", "pj": "", "status": "Direncanakan", "budget": ""});

  const supabase = createClient();

    const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("program_kerja_crd")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setNotice({ type: "error", text: error.message });
    } else if (data) {
      setItems(data as ItemType[]);
    }
    setLoading(false);
  };

const fetchUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("user_roles").select("role").eq("id", user.id).single();
      if (data) {
        setUserRole(data.role);
      }
    }
  };

    useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (userRole) {
      fetchData();
    }
  }, [userRole]);

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({"program_name": "", "pj": "", "status": "Direncanakan", "budget": ""});
    setIsModalOpen(true);
  };

  const openEditModal = (item: ItemType) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    setLoading(true);
    const { error } = await supabase.from("program_kerja_crd").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setNotice({ type: "success", text: "Data berhasil dihapus dari database." });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingItem) {
      const { id, created_at, updated_at, ...payload } = formData;
      const { data, error } = await supabase
        .from("program_kerja_crd")
        .update(payload)
        .eq("id", editingItem.id)
        .select()
        .single();
      if (error) {
        setNotice({ type: "error", text: error.message });
      } else if (data) {
        setItems((prev) =>
          prev.map((item) => (item.id === editingItem.id ? (data as ItemType) : item))
        );
        setNotice({ type: "success", text: "Data berhasil diperbarui di database." });
        setIsModalOpen(false);
      }
    } else {
      const { id, created_at, updated_at, ...payload } = formData;
      const { data, error } = await supabase
        .from("program_kerja_crd")
        .insert([payload])
        .select()
        .single();
      if (error) {
        setNotice({ type: "error", text: error.message });
      } else if (data) {
        setItems((prev) => [data as ItemType, ...prev]);
        setNotice({ type: "success", text: "Data baru berhasil ditambahkan ke database." });
        setIsModalOpen(false);
      }
    }

    setSaving(false);
  };

  const filteredItems = items.filter((item) => {
    const searchVal = search.toLowerCase();
    return Object.values(item).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(searchVal)
    );
  });

  const isWritable = userRole === "super-admin" || userRole === "p-level" || userRole === "crd";

  const isAllowedToAccess = userRole === "super-admin" || userRole === "p-level" || userRole === "staff" || userRole === "crd";

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

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#012e21] border border-white/15 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#fff0aa]/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">PROGRAM KERJA CRD</h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">Manajemen program kerja divisi Competition & Research Development (CRD) SRE PENS.</p>
        </div>
        {isWritable && (
          <button
            onClick={openNewModal}
            className="relative z-10 flex items-center gap-3 px-7 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaPlus size={14} /> TAMBAH DATA
          </button>
        )}
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-[#012e21] border border-white/10 flex flex-col justify-between shadow-md">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Total Proker</span>
          <span className="text-2xl font-akira tracking-tight mt-2 text-[#fff0aa]">6</span>
        </div>
        <div className="p-6 bg-[#012e21] border border-white/10 flex flex-col justify-between shadow-md">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Ongoing</span>
          <span className="text-2xl font-akira tracking-tight mt-2 text-sky-400">2</span>
        </div>
        <div className="p-6 bg-[#012e21] border border-white/10 flex flex-col justify-between shadow-md">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Completed</span>
          <span className="text-2xl font-akira tracking-tight mt-2 text-emerald-400">4</span>
        </div>

      </div>

      {/* Notices */}
      {notice && (
        <div className={`p-4 border font-poppins text-xs flex items-center justify-between font-medium transition-all ${notice.type === "success" ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-red-950/40 border-red-500/40 text-red-300"}`}>
          <div className="flex items-center gap-3">
            {notice.type === "success" ? <FaCheckCircle size={16} className="text-emerald-400 flex-shrink-0" /> : <FaExclamationCircle size={16} className="text-red-400 flex-shrink-0" />}
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
          placeholder="Cari data..."
          className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-xs sm:text-sm tracking-wide transition-all"
        />
      </div>

      {/* Main Table */}
      <div className="bg-[#011f16] border border-white/10 p-6 md:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-poppins text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[#fff0aa] uppercase text-[10px] tracking-wider">
                                <th className="py-4 px-4 font-semibold">Nama Program Kerja</th>
                <th className="py-4 px-4 font-semibold">Penanggung Jawab (PJ)</th>
                <th className="py-4 px-4 font-semibold">Status Progres</th>
                <th className="py-4 px-4 font-semibold">Anggaran Dialokasikan (IDR)</th>

                {isWritable && <th className="py-4 px-4 font-semibold text-right">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 font-medium text-white/80">{item.program_name}</td>
                  <td className="py-4 px-4 font-medium text-white/80">{item.pj}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.status === "Approved" || item.status === "Success" || item.status === "Selesai" || item.status === "Active / Valid"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                        : item.status === "Pending" || item.status === "Menunggu Review" || item.status === "Dalam Penyuntingan" || item.status === "Pending Approval"
                        ? "bg-amber-955/40 text-amber-300 border border-amber-500/30"
                        : "bg-white/5 text-white/70 border border-white/10"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#fff0aa]">IDR {Number(item.budget).toLocaleString("id-ID")}</td>

                  {isWritable && (
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 bg-white/5 hover:bg-[#fff0aa] hover:text-[#011f16] border border-white/10 transition-all text-white hover:text-black"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all text-red-300"
                        title="Hapus"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-white/40">Data tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#012e21] border border-[#fff0aa]/20 w-full max-w-lg p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white/50 hover:text-white p-2"
            >
              <FaTimes size={18} />
            </button>
            <h3 className="font-akira text-sm uppercase tracking-wider text-[#fff0aa] mb-6">
              {editingItem ? "Edit Data" : "Tambah Data Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5 font-poppins text-xs sm:text-sm">
                            <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold">Nama Program Kerja</label>
                <input
                  type="text"
                  value={formData.program_name ?? ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, program_name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold">Penanggung Jawab (PJ)</label>
                <input
                  type="text"
                  value={formData.pj ?? ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pj: e.target.value }))}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold">Status Progres</label>
                <select
                  value={formData.status || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white focus:outline-none transition-all"
                  required
                >
                  <option value="Direncanakan" className="bg-[#012e21]">Direncanakan</option>
                  <option value="Sedang Berjalan" className="bg-[#012e21]">Sedang Berjalan</option>
                  <option value="Selesai" className="bg-[#012e21]">Selesai</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold">Anggaran Dialokasikan (IDR)</label>
                <input
                  type="text"
                  value={formData.budget ?? ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold uppercase tracking-wider disabled:opacity-50 transition-all"
                >
                  {saving ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
