"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaSave, FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";
import { ActivityEntity } from "@sre-pens/shared-types";
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

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<ActivityEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityEntity | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "09:00 - 15:00 WIB",
    category: "Seminar",
    description: "",
    content: "",
    image: "",
  });

  const supabase = createClient();

  const fetchActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      setNotice({ type: "error", text: error.message });
    } else if (data) {
      setActivities(data as ActivityEntity[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const openNewModal = () => {
    setEditingActivity(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00 - 15:00 WIB",
      category: "Seminar",
      description: "",
      content: "### Jadwal Kegiatan\n- 09:00 Pembukaan\n- 10:00 Sesi Materi",
      image: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (act: ActivityEntity) => {
    setEditingActivity(act);
    setFormData({
      title: act.title,
      date: act.date,
      time: act.time,
      category: act.category,
      description: act.description,
      content: act.content,
      image: act.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this activity/event?")) return;

    setLoading(true);
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setNotice({ type: "success", text: "Activity successfully deleted." });
      fetchActivities();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    if (editingActivity) {
      const { error } = await supabase
        .from("activities")
        .update({
          title: formData.title,
          date: formData.date,
          time: formData.time,
          category: formData.category,
          description: formData.description,
          content: formData.content,
          image: formData.image,
        })
        .eq("id", editingActivity.id);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Activity successfully updated." });
        setIsModalOpen(false);
        fetchActivities();
      }
    } else {
      const { error } = await supabase.from("activities").insert([formData]);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "New activity successfully scheduled." });
        setIsModalOpen(false);
        fetchActivities();
      }
    }
    setSaving(false);
  };

  const filteredActivities = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
        <div>
          <h1 className="font-akira text-3xl uppercase tracking-tighter text-white mb-2">Activities & Events</h1>
          <p className="text-sm font-sans text-white/60">Schedule upcoming seminars, workshops, and student competitions.</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-3 px-6 py-3.5 bg-[#F2C601] hover:bg-[#fff0aa] text-[#012e21] font-bold font-mono text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
        >
          <FaPlus size={14} /> Schedule New Event
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

      {/* Search & Filter */}
      <div className="relative group max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#F2C601]">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events by title or category..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-white/10 transition-all font-mono text-sm"
        />
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/40 font-mono text-sm">
          <FaSpinner className="animate-spin text-[#F2C601] mb-4" size={32} />
          <span>Fetching database records...</span>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
          <p className="font-mono text-sm text-white/40">No activities found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                <Image
                  src={act.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
                  alt={act.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-emerald-500 text-black font-bold rounded-full font-mono text-[10px] uppercase tracking-wider shadow">
                  {act.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-3 group-hover:text-[#F2C601] transition-colors">{act.title}</h3>
                  <div className="space-y-1.5 font-mono text-xs text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#F2C601]" /> <span>{act.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#F2C601]" /> <span className="truncate">{act.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 font-sans line-clamp-3 leading-relaxed">{act.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(act)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-500 hover:text-white border border-white/10 transition-colors text-blue-400 shadow"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(act.id)}
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
              {editingActivity ? "Edit Event" : "Schedule Event"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Seminar Nasional Smart Grid 2026"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Time Range</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="08:00 - 16:00 WIB"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Seminar / Workshop"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Image Banner URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Short Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of the event objectives..."
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Full Event Details (Markdown)</label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="### Speaker & Rundown..."
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-xs"
                />
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
                  <span>{saving ? "Saving..." : "Save Event"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
