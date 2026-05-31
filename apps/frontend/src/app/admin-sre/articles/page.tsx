"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaSave, FaCheckCircle, FaExclamationCircle, FaLock } from "react-icons/fa";
import { ArticleEntity } from "@sre-pens/shared-types";
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

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleEntity | null>(null);
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
  const itemsPerPage = 6;

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    author: "SRE PENS",
    created_by: "",
    image: "",
    description: "",
    content: "",
    published_date: "",
  });

  const supabase = createClient();

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setNotice({ type: "error", text: error.message });
    } else if (data) {
      setArticles(data as ArticleEntity[]);
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
    fetchArticles();
    fetchUserRole();
  }, []);

  const openNewModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      author: "SRE PENS",
      created_by: "Kementerian Komunikasi",
      image: "",
      description: "",
      content: "",
      published_date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article: ArticleEntity) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      author: article.author,
      created_by: article.created_by,
      image: article.image,
      description: article.description,
      content: article.content,
      published_date: article.published_date,
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
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setNotice({ type: "success", text: "Article successfully deleted." });
      fetchArticles();
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

    if (editingArticle) {
      const { error } = await supabase
        .from("articles")
        .update({
          title: formData.title,
          author: formData.author,
          created_by: formData.created_by,
          image: formData.image,
          description: formData.description,
          content: formData.content,
          published_date: formData.published_date,
        })
        .eq("id", editingArticle.id);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Article successfully updated." });
        setIsModalOpen(false);
        fetchArticles();
      }
    } else {
      const { error } = await supabase.from("articles").insert([formData]);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "New article successfully published." });
        setIsModalOpen(false);
        fetchArticles();
      }
    }
    setSaving(false);
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.created_by.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const isWritable = userRole === "super-admin" || userRole === "p-level" || userRole === "education";

  if (userRole && userRole !== "super-admin" && userRole !== "p-level" && userRole !== "staff" && userRole !== "education") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 font-poppins text-white">
        <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center rounded-full">
          <FaLock size={24} />
        </div>
        <h2 className="font-akira text-lg text-red-400 uppercase tracking-wider">Access Denied</h2>
        <p className="text-sm text-white/70 leading-relaxed font-light">
          Your account role (<strong className="text-[#fff0aa]">{userRole}</strong>) is unauthorized to access this panel. Only <strong className="text-white">super-admin</strong>, <strong className="text-white">p-level</strong>, <strong className="text-white">staff</strong>, and <strong className="text-white">education</strong> roles are permitted.
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
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">ARTICLE MANAGEMENT</h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">Create, edit, and organize news publications & research articles.</p>
        </div>
        {isWritable && (
          <button
            onClick={openNewModal}
            className="relative z-10 flex items-center gap-3 px-7 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaPlus size={14} /> PUBLISH NEW ARTICLE
          </button>
        )}
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
          placeholder="Search articles by title or publisher..."
          className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-xs sm:text-sm tracking-wide transition-all"
        />
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/50 font-poppins tracking-wide">
          <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
          <span>Fetching database records...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 border border-white/10 bg-white/5 font-poppins text-sm text-white/50">
          <p>No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white/5 border border-white/10 hover:border-[#fff0aa] overflow-hidden transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="relative h-52 w-full bg-black/40 overflow-hidden">
                  <Image
                    src={article.image || "https://images.unsplash.com/photo-1518770660439-4636190af475"}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#012e21]/90 backdrop-blur-sm font-poppins font-semibold text-[10px] text-[#fff0aa] uppercase tracking-widest border border-white/20">
                    {article.published_date}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-poppins font-semibold text-lg line-clamp-2 mb-2 group-hover:text-[#fff0aa] transition-colors">{article.title}</h3>
                    <p className="text-xs text-white/70 font-poppins font-light line-clamp-3 leading-relaxed mb-4">{article.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-poppins">
                    <span className="text-white/50 truncate max-w-[150px] font-medium">By {article.created_by}</span>
                    {isWritable && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(article)}
                          className="p-2.5 bg-white/5 hover:bg-blue-600 hover:text-white border border-white/15 transition-all text-blue-300"
                          title="Edit Article"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2.5 bg-white/5 hover:bg-red-600 hover:text-white border border-white/15 transition-all text-red-300"
                          title="Delete Article"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 mt-8 font-poppins text-xs gap-4">
              <div className="text-white/60">
                Showing <span className="font-semibold text-[#fff0aa]">{startIndex + 1}</span> to{" "}
                <span className="font-semibold text-[#fff0aa]">
                  {Math.min(startIndex + itemsPerPage, filteredArticles.length)}
                </span>{" "}
                of <span className="font-semibold text-[#fff0aa]">{filteredArticles.length}</span> articles
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
              {editingArticle ? "EDIT ARTICLE" : "PUBLISH ARTICLE"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 font-poppins">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Transisi Menuju Energi Bersih 2045"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Publisher / Source</label>
                  <input
                    type="text"
                    required
                    value={formData.created_by}
                    onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
                    placeholder="e.g. Kementerian ESDM / BBC News"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Published Date</label>
                  <input
                    type="text"
                    required
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                    placeholder="e.g. 17 May 2026"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Image Thumbnail URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-xs font-mono transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Short Description (Summary)</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief 2-3 sentence overview..."
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-sm transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#fff0aa] tracking-wider uppercase">Full Article Markdown Content</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="### Latar Belakang..."
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] p-4 text-white placeholder-white/30 focus:outline-none text-xs font-mono transition-all leading-relaxed"
                />
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
                  <span>{saving ? "SAVING..." : "SAVE ARTICLE"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
