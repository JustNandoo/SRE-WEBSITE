"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaSave, FaCheckCircle, FaExclamationCircle, FaTag, FaShoppingCart, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { MerchandiseEntity } from "@sre-pens/shared-types";
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

export default function AdminMerchandisePage() {
  const [merchandise, setMerchandise] = useState<MerchandiseEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMerch, setEditingMerch] = useState<MerchandiseEntity | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Apparel",
    price: "IDR 65.000",
    image: "",
    tag: "Best Recommended",
    order_link: "https://www.instagram.com/greenspark.pens/",
    is_available: true,
  });

  const supabase = createClient();

  const fetchMerchandise = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("merchandise")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setNotice({ type: "error", text: error.message });
    } else if (data) {
      setMerchandise(data as MerchandiseEntity[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchandise();
  }, []);

  const openNewModal = () => {
    setEditingMerch(null);
    setFormData({
      name: "",
      category: "Apparel",
      price: "IDR 65.000",
      image: "",
      tag: "Best Recommended",
      order_link: "https://www.instagram.com/greenspark.pens/",
      is_available: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MerchandiseEntity) => {
    setEditingMerch(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      tag: item.tag || "",
      order_link: item.order_link,
      is_available: item.is_available ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this merchandise item?")) return;

    setLoading(true);
    const { error } = await supabase.from("merchandise").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setNotice({ type: "success", text: "Merchandise successfully deleted." });
      fetchMerchandise();
    }
  };

  const toggleAvailability = async (item: MerchandiseEntity) => {
    const { error } = await supabase
      .from("merchandise")
      .update({ is_available: !item.is_available })
      .eq("id", item.id);

    if (error) {
      setNotice({ type: "error", text: error.message });
    } else {
      setNotice({ type: "success", text: `Updated status for ${item.name}` });
      fetchMerchandise();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    if (editingMerch) {
      const { error } = await supabase
        .from("merchandise")
        .update({
          name: formData.name,
          category: formData.category,
          price: formData.price,
          image: formData.image,
          tag: formData.tag,
          order_link: formData.order_link,
          is_available: formData.is_available,
        })
        .eq("id", editingMerch.id);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Merchandise successfully updated." });
        setIsModalOpen(false);
        fetchMerchandise();
      }
    } else {
      const { error } = await supabase.from("merchandise").insert([formData]);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "New merchandise successfully added." });
        setIsModalOpen(false);
        fetchMerchandise();
      }
    }
    setSaving(false);
  };

  const filteredMerchandise = merchandise.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
        <div>
          <h1 className="font-akira text-3xl uppercase tracking-tighter text-white mb-2">Merchandise Catalog</h1>
          <p className="text-sm font-sans text-white/60">Manage SRE store catalog, pricing, availability tags, and order links.</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-3 px-6 py-3.5 bg-[#F2C601] hover:bg-[#fff0aa] text-[#012e21] font-bold font-mono text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
        >
          <FaPlus size={14} /> Add New Merch
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

      {/* Search */}
      <div className="relative group max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#F2C601]">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items by name or category..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] focus:bg-white/10 transition-all font-mono text-sm"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/40 font-mono text-sm">
          <FaSpinner className="animate-spin text-[#F2C601] mb-4" size={32} />
          <span>Fetching database records...</span>
        </div>
      ) : filteredMerchandise.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
          <p className="font-mono text-sm text-white/40">No merchandise items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchandise.map((item) => (
            <div
              key={item.id}
              className={`bg-white/5 border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col group ${item.is_available ? "border-white/10 hover:border-white/20 hover:shadow-2xl" : "border-red-500/20 opacity-75"}`}
            >
              <div className="relative h-56 w-full bg-black/40 overflow-hidden">
                <Image
                  src={item.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black font-bold rounded-full font-mono text-[10px] uppercase tracking-wider shadow">
                  {item.category}
                </div>
                {item.tag && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full font-mono text-[10px] text-[#F2C601] border border-[#F2C601]/30">
                    {item.tag}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#F2C601] transition-colors">{item.name}</h3>
                    <span className="font-akira text-sm text-[#F2C601] whitespace-nowrap">{item.price}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => toggleAvailability(item)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors ${item.is_available ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black" : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"}`}
                  >
                    {item.is_available ? <FaToggleOn size={16} /> : <FaToggleOff size={16} />}
                    <span>{item.is_available ? "In Stock" : "Sold Out"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-500 hover:text-white border border-white/10 transition-colors text-blue-400 shadow"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white border border-white/10 transition-colors text-red-400 shadow"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
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
              {editingMerch ? "Edit Merch Item" : "Add Merch Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. SRE Official Hoodie"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Apparel / Accessories"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Price Tag</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="IDR 150.000"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Highlight Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="Best Seller / Limited Edition"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F2C601] font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Stock Status</label>
                  <select
                    value={formData.is_available ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.value === "true" })}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#F2C601] font-mono text-sm"
                  >
                    <option value="true">In Stock (Available)</option>
                    <option value="false">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Image URL</label>
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
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider pl-1">Order Link (Instagram / Shopee / WhatsApp)</label>
                <input
                  type="url"
                  required
                  value={formData.order_link}
                  onChange={(e) => setFormData({ ...formData, order_link: e.target.value })}
                  placeholder="https://instagram.com/greenspark.pens"
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
                  <span>{saving ? "Saving..." : "Save Item"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
