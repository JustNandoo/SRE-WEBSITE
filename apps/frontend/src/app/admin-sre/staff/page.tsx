"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaSave, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaInstagram, FaUserTie } from "react-icons/fa";
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

  useEffect(() => {
    fetchData();
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
    if (!confirm("Are you sure you want to permanently remove this staff member?")) return;

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

  const getDivisionName = (divId: string) => {
    return divisions.find((d) => d.id === divId)?.name || divId;
  };

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
        <div>
          <h1 className="font-akira text-3xl uppercase tracking-tighter text-white mb-2">Staff & Divisions</h1>
          <p className="text-sm font-sans text-white/60">Organize SRE PENS executive board, supervisors, and departmental staff.</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-3 px-6 py-3.5 bg-[#F2C601] hover:bg-[#fff0aa] text-[#012e21] font-bold font-mono text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
        >
          <FaPlus size={14} /> Add New Staff Profile
        </button>
      </div>

      {/* Notices */}
      {notice && (
        <div className={`p-4 rounded-2xl border font-mono text-xs flex items-center justify-between transition-all ${notice.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}>
          <div className="flex items-center gap-3">
            {notice.type === "success" ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
            <span>{notice.text}</span>
          </div>
          <button onClick={() => setNotice(null)} className="opacity-50 hover:opacity-100 p-1">
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Navigation Tabs for Divisions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-5 py-2.5 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "all" ? "bg-[#F2C601] text-[#012e21] font-bold shadow-lg" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}
        >
          All Divisions ({members.length})
        </button>
        {divisions.map((div) => {
          const count = members.filter((m) => m.division_id === div.id).length;
          return (
            <button
              key={div.id}
              onClick={() => setActiveTab(div.id)}
              className={`px-5 py-2.5 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === div.id ? "bg-[#F2C601] text-[#012e21] font-bold shadow-lg" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              {div.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative group max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#F2C601]">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search staff by name, role, or major..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-white/10 transition-all font-mono text-sm"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/40 font-mono text-sm">
          <FaSpinner className="animate-spin text-[#F2C601] mb-4" size={32} />
          <span>Fetching database records...</span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
          <p className="font-mono text-sm text-white/40">No staff members found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 hover:shadow-2xl transition-all duration-300 flex flex-col group p-6"
            >
              <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#F2C601]/40 group-hover:border-[#F2C601] transition-colors shadow-lg bg-[#012e21]">
                  {member.img_url ? (
                    member.img_url.startsWith("http") ? (
                      <Image src={member.img_url} alt={member.name} fill sizes="112px" className="object-cover" />
                    ) : (
                      <Image src={`https://drive.google.com/uc?export=view&id=${member.img_url}`} alt={member.name} fill sizes="112px" className="object-cover" />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <FaUserTie size={40} />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-[#F2C601] transition-colors mb-1">{member.name}</h3>
                  <p className="font-mono text-xs text-[#F2C601] uppercase tracking-wider mb-2">{member.role}</p>
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full font-sans text-[11px] text-white/80 border border-white/10 mb-2">
                    {getDivisionName(member.division_id)}
                  </span>
                  <p className="text-xs text-white/50">{member.major}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto text-xs font-mono">
                <div className="flex items-center gap-3 text-white/60">
                  {member.instagram_handle && (
                    <a href={`https://instagram.com/${member.instagram_handle.replace("@", "")}`} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">
                      <FaInstagram size={16} />
                    </a>
                  )}
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                      <FaLinkedin size={16} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-500 hover:text-white border border-white/10 transition-colors text-blue-400 shadow"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white border border-white/10 transition-colors text-red-400 shadow"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto animate-fade-in">
          <div className="bg-[#012e21] border border-white/10 rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="font-akira text-2xl uppercase tracking-tighter text-white mb-6">
              {editingMember ? "Edit Staff Profile" : "Register Staff Profile"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tegar Aprilian"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Organizational Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Head of Web Development"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Division / Department</label>
                  <select
                    value={formData.division_id}
                    onChange={(e) => setFormData({ ...formData, division_id: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#F2C601] font-mono text-sm"
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
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Major / Study Program</label>
                  <input
                    type="text"
                    required
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    placeholder="e.g. D3 Teknik Informatika"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Display Order (Index)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Photo Link / Google Drive ID</label>
                <input
                  type="text"
                  value={formData.img_url}
                  onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
                  placeholder="Drive ID (e.g. 1AuDzQUVL...) or https://..."
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={formData.instagram_handle}
                    onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                    placeholder="e.g. himdeunn (without @)"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-mono text-sm uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#F2C601] hover:bg-[#fff0aa] text-[#012e21] font-bold font-mono text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50"
                >
                  {saving ? <FaSpinner className="animate-spin" size={16} /> : <FaSave size={16} />}
                  <span>{saving ? "Saving..." : "Save Profile"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
