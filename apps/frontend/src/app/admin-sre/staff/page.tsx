"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaSave, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaInstagram, FaUserTie, FaLock } from "react-icons/fa";
import { MemberEntity, DivisionEntity } from "@sre-pens/shared-types";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";

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

export default function AdminStaffPage() {
  const [members, setMembers] = useState<MemberEntity[]>([]);
  const [divisions, setDivisions] = useState<DivisionEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberEntity | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (notice) {
      if (typeof window !== "undefined" && (window as any).showToast) {
        (window as any).showToast(notice.type === "success" ? "success" : "error", (notice as any).text || (notice as any).message || "");
      }
    }
  }, [notice]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "Staff",
    major: "D4 Teknik Mekatronika",
    division_id: "exec",
    img_url: "",
    linkedin_url: "",
    instagram_handle: "",
    order_index: 1,
  });

  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    const [divRes, memRes] = await Promise.all([
      supabase.from("divisions").select("*").order("order_index", { ascending: true }),
      supabase.from("members").select("*").order("order_index", { ascending: true }),
    ]);

    if (divRes.error) setNotice({ type: "error", text: divRes.error.message });
    else if (divRes.data) setDivisions(divRes.data as DivisionEntity[]);

    if (memRes.error) setNotice({ type: "error", text: memRes.error.message });
    else if (memRes.data) setMembers(memRes.data as MemberEntity[]);

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
    fetchData();
    fetchUserRole();
  }, []);

  const openNewModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "Staff",
      major: "D4 Teknik Mekatronika",
      division_id: divisions[0]?.id || "exec",
      img_url: "",
      linkedin_url: "",
      instagram_handle: "",
      order_index: members.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MemberEntity) => {
    setEditingMember(item);
    setFormData({
      name: item.name,
      role: item.role,
      major: item.major,
      division_id: item.division_id,
      img_url: item.img_url || "",
      linkedin_url: item.linkedin_url || "",
      instagram_handle: item.instagram_handle || "",
      order_index: item.order_index,
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
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setNotice({ type: "success", text: "Staff member successfully removed." });
      fetchData();
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
      ...formData,
      order_index: Number(formData.order_index),
    };

    if (editingMember) {
      const { error } = await supabase
        .from("members")
        .update(payload)
        .eq("id", editingMember.id);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Staff profile successfully updated." });
        setIsModalOpen(false);
        fetchData();
      }
    } else {
      const { error } = await supabase.from("members").insert([payload]);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "New staff profile successfully registered." });
        setIsModalOpen(false);
        fetchData();
      }
    }
    setSaving(false);
  };

  const filteredMembers = members.filter(
    (m) =>
      (activeTab === "all" || m.division_id === activeTab) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.major.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const getDivisionName = (divId: string) => {
    return divisions.find((d) => d.id === divId)?.name || divId;
  };

  const isWritable = userRole === "super-admin" || userRole === "p-level" || userRole === "hr";

  if (userRole && userRole !== "super-admin" && userRole !== "p-level" && userRole !== "staff" && userRole !== "hr") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 font-poppins text-white">
        <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center rounded-full">
          <FaLock size={24} />
        </div>
        <h2 className="font-akira text-lg text-red-400 uppercase tracking-wider">Access Denied</h2>
        <p className="text-sm text-white/70 leading-relaxed font-light">
          Your account role (<strong className="text-[#fff0aa]">{userRole}</strong>) is unauthorized to access this panel. Only <strong className="text-white">super-admin</strong>, <strong className="text-white">p-level</strong>, <strong className="text-white">staff</strong>, and <strong className="text-white">hr</strong> roles are permitted.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Minimalist Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#012e21] border border-white/15 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#fff0aa]/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">DIVISIONS & STAFF</h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">Organize SRE PENS executive board, supervisors, and departmental staff.</p>
        </div>
        {isWritable && (
          <button
            onClick={openNewModal}
            className="relative z-10 flex items-center gap-3 px-7 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaPlus size={14} /> ADD NEW STAFF PROFILE
          </button>
        )}
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

      {/* Navigation Tabs for Divisions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide font-poppins">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-3 font-semibold text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${activeTab === "all" ? "bg-[#fff0aa] text-[#012e21] border-[#fff0aa] shadow-lg font-bold" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"}`}
        >
          ALL DIVISIONS ({members.length})
        </button>
        {divisions.map((div) => {
          const count = members.filter((m) => m.division_id === div.id).length;
          return (
            <button
              key={div.id}
              onClick={() => setActiveTab(div.id)}
              className={`px-6 py-3 font-semibold text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${activeTab === div.id ? "bg-[#fff0aa] text-[#012e21] border-[#fff0aa] shadow-lg font-bold" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              {div.name} ({count})
            </button>
          );
        })}
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
          placeholder="Search staff by name, role, or major..."
          className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-xs sm:text-sm tracking-wide transition-all"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/50 font-poppins tracking-wide">
          <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
          <span>Fetching database records...</span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-20 border border-white/10 bg-white/5 font-poppins text-sm text-white/50">
          <p>No staff profiles found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-poppins">
            {paginatedMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white/5 border border-white/10 hover:border-[#fff0aa] overflow-hidden transition-all duration-300 flex flex-col group p-6 shadow-lg"
              >
                <div className="flex flex-col items-center text-center space-y-4 mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border border-white/20 group-hover:border-[#fff0aa] transition-colors shadow-2xl bg-[#011f16]">
                    {member.img_url ? (
                      member.img_url.startsWith("http") ? (
                        <Image src={member.img_url} alt={member.name} fill sizes="128px" className="object-cover" />
                      ) : (
                        <Image src={`https://drive.google.com/uc?export=view&id=${member.img_url}`} alt={member.name} fill sizes="128px" className="object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <FaUserTie size={44} />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-[#fff0aa] transition-colors mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#fff0aa] uppercase tracking-wider mb-2">{member.role}</p>
                    <span className="inline-block px-3.5 py-1 bg-[#011f16] font-medium text-[11px] text-white/80 border border-white/15 mb-2 uppercase tracking-wider">
                      {getDivisionName(member.division_id)}
                    </span>
                    <p className="text-xs text-white/60 font-light">{member.major}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto text-xs">
                  <div className="flex items-center gap-3.5 text-white/60">
                    {member.instagram_handle && (
                      <a href={`https://instagram.com/${member.instagram_handle.replace("@", "")}`} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors" title="Instagram">
                        <FaInstagram size={16} />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors" title="LinkedIn">
                        <FaLinkedin size={16} />
                      </a>
                    )}
                  </div>

                  {isWritable && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(member)}
                        className="p-2.5 bg-white/5 hover:bg-blue-600 hover:text-white border border-white/15 transition-all text-blue-300"
                        title="Edit Profile"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2.5 bg-white/5 hover:bg-red-600 hover:text-white border border-white/15 transition-all text-red-300"
                        title="Delete Profile"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 mt-8 font-poppins text-xs gap-4">
              <div className="text-white/60">
                Showing <span className="font-semibold text-[#fff0aa]">{startIndex + 1}</span> to{" "}
                <span className="font-semibold text-[#fff0aa]">
                  {Math.min(startIndex + itemsPerPage, filteredMembers.length)}
                </span>{" "}
                of <span className="font-semibold text-[#fff0aa]">{filteredMembers.length}</span> staff members
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

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-[#012e21] border border-white/15 max-w-2xl w-full p-8 md:p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10"
            >
              <FaTimes size={16} />
            </button>

            <h2 className="font-akira text-2xl uppercase tracking-tighter text-white mb-6 leading-tight">
              {editingMember ? "EDIT STAFF PROFILE" : "REGISTER STAFF PROFILE"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 font-poppins">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tegar Aprilian"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Organizational Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Head of Web Development"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Division / Department</label>
                  <select
                    value={formData.division_id}
                    onChange={(e) => setFormData({ ...formData, division_id: e.target.value })}
                    className="w-full bg-[#011f16] border border-white/15 p-4 text-white focus:outline-none focus:border-[#fff0aa] text-sm transition-all"
                  >
                    {divisions.map((div) => (
                      <option key={div.id} value={div.id}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Major / Study Program</label>
                  <input
                    type="text"
                    required
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    placeholder="e.g. D3 Teknik Informatika"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Display Order (Index)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm font-mono transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Photo Link / Google Drive ID</label>
                <input
                  type="text"
                  value={formData.img_url}
                  onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
                  placeholder="Drive ID (e.g. 1AuDzQUVL...) or https://..."
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-xs font-mono transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Instagram Handle</label>
                  <input
                    type="text"
                    value={formData.instagram_handle}
                    onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                    placeholder="e.g. himdeunn (without @)"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-xs font-mono transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest transition-all border border-white/15"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-3 px-8 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold text-xs uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
                >
                  {saving ? <FaSpinner className="animate-spin" size={14} /> : <FaSave size={14} />}
                  <span>{saving ? "SAVING..." : "SAVE PROFILE"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
