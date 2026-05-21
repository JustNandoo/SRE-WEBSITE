"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { fetchExternalRelations, fetchCollaborationRequests, ExternalRelation, CollaborationRequest } from "@/services/api";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaHandshake,
  FaLink,
  FaLock,
  FaExclamationTriangle,
  FaBuilding,
  FaEnvelope,
  FaWhatsapp,
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

export default function AdminExternalRelationsPage() {
  const [partners, setPartners] = useState<ExternalRelation[]>([]);
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Modals & Forms State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<ExternalRelation | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    partner_name: "",
    category: "Company Visit",
    description: "",
    logo_url: "",
    collaboration_date: new Date().toISOString().split("T")[0],
  });

  const supabase = createClient();

  const checkAuthorization = async () => {
    setCheckingAuth(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserEmail(user.email || "");
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
    const [pRes, rRes] = await Promise.all([
      fetchExternalRelations(),
      fetchCollaborationRequests(),
    ]);
    if (pRes) setPartners(pRes);
    if (rRes) setRequests(rRes);
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
    setEditingPartner(null);
    setFormData({
      partner_name: "",
      category: "Company Visit",
      description: "",
      logo_url: "",
      collaboration_date: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ExternalRelation) => {
    setEditingPartner(item);
    setFormData({
      partner_name: item.partner_name,
      category: item.category,
      description: item.description,
      logo_url: item.logo_url,
      collaboration_date: item.collaboration_date,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently remove this partner?")) return;
    setLoading(true);
    const { error } = await supabase.from("external_relations").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setNotice({ type: "success", text: "Partner deleted successfully." });
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    const payload = {
      partner_name: formData.partner_name,
      category: formData.category,
      description: formData.description,
      logo_url: formData.logo_url,
      collaboration_date: formData.collaboration_date,
    };

    if (editingPartner) {
      const { error } = await supabase
        .from("external_relations")
        .update(payload)
        .eq("id", editingPartner.id);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Partner successfully updated." });
        setIsModalOpen(false);
        loadData();
      }
    } else {
      const { error } = await supabase.from("external_relations").insert([payload]);

      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Partner successfully registered." });
        setIsModalOpen(false);
        loadData();
      }
    }
    setSaving(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: "Approved" | "Rejected") => {
    const { error } = await supabase
      .from("collaboration_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      setNotice({ type: "error", text: error.message });
    } else {
      setNotice({ type: "success", text: `Proposal marked as ${newStatus}.` });
      loadData();
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-white/50 font-poppins">
        <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
        <span>Authenticating administrative credentials...</span>
      </div>
    );
  }

  const isWritable = userRole === "super-admin" || userRole === "p-level";

  if (userRole && userRole !== "super-admin" && userRole !== "p-level" && userRole !== "staff") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 font-poppins text-white">
        <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center rounded-full">
          <FaLock size={24} />
        </div>
        <h2 className="font-akira text-lg text-red-400 uppercase tracking-wider">Access Denied</h2>
        <p className="text-sm text-white/70 leading-relaxed font-light">
          Your account role (<strong className="text-[#fff0aa]">{userRole}</strong>) is unauthorized to access this panel. Only <strong className="text-white">super-admin</strong>, <strong className="text-white">p-level</strong>, and <strong className="text-white">staff</strong> roles are permitted.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-12 ${poppins.variable} ${akira.variable} font-sans text-white`}>
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#012e21] border border-white/15 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#fff0aa]/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">EXTERNAL RELATIONS</h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">Manage corporate partners, alumni, and track proposal requests in real-time.</p>
        </div>
        {isWritable && (
          <button
            onClick={openNewModal}
            className="relative z-10 flex items-center gap-3 px-7 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaPlus size={14} /> ADD NEW PARTNER
          </button>
        )}
      </div>

      {/* Notices */}
      {notice && (
        <div className={`p-4 border font-poppins text-xs flex items-center justify-between font-medium transition-all ${notice.type === "success" ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-red-950/40 border-red-500/40 text-red-300"}`}>
          <div className="flex items-center gap-3">
            <FaCheck size={16} className={notice.type === "success" ? "text-emerald-400" : "text-red-400"} />
            <span>{notice.text}</span>
          </div>
          <button onClick={() => setNotice(null)} className="opacity-60 hover:opacity-100 p-1">
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/50 font-poppins">
          <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
          <span>Fetching database records...</span>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Partners Table */}
          <div className="bg-[#011f16] border border-white/10 p-6 md:p-8">
            <h2 className="font-akira text-base uppercase tracking-wider text-[#fff0aa] mb-6 flex items-center gap-3">
              <FaHandshake /> Active Partners
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-poppins text-xs sm:text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[#fff0aa] uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-4 font-semibold">Partner</th>
                    <th className="py-4 px-4 font-semibold">Category</th>
                    <th className="py-4 px-4 font-semibold">Description</th>
                    <th className="py-4 px-4 font-semibold">Date</th>
                    <th className="py-4 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {partners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-semibold text-white flex items-center gap-2">
                        {partner.logo_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={partner.logo_url} alt="" className="w-6 h-6 object-contain" />
                        )}
                        <span>{partner.partner_name}</span>
                      </td>
                      <td className="py-4 px-4 text-[#fff0aa] text-xs font-mono">{partner.category}</td>
                      <td className="py-4 px-4 text-white/70 max-w-xs truncate">{partner.description}</td>
                      <td className="py-4 px-4 text-white/50 text-xs font-mono">{partner.collaboration_date}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        {isWritable && (
                          <>
                            <button
                              onClick={() => openEditModal(partner)}
                              className="p-2 bg-white/5 hover:bg-[#fff0aa] hover:text-[#011f16] border border-white/10 transition-all"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(partner.id)}
                              className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all"
                              title="Delete"
                            >
                              <FaTrash size={12} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {partners.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/40">No partner records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Collaboration Proposals Table */}
          <div className="bg-[#011f16] border border-white/10 p-6 md:p-8">
            <h2 className="font-akira text-base uppercase tracking-wider text-[#fff0aa] mb-6 flex items-center gap-3">
              <FaEnvelope /> Collaboration Proposals (CTA Requests)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-poppins text-xs sm:text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[#fff0aa] uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-4 font-semibold">Sender / Organization</th>
                    <th className="py-4 px-4 font-semibold">Subject & Message</th>
                    <th className="py-4 px-4 font-semibold">Contact Info</th>
                    <th className="py-4 px-4 font-semibold">Status</th>
                    <th className="py-4 px-4 font-semibold text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <strong className="text-white block">{req.organization_name}</strong>
                        <span className="text-white/50 text-[10px] uppercase font-mono">{req.contact_person}</span>
                      </td>
                      <td className="py-4 px-4 max-w-sm">
                        <strong className="text-[#fff0aa] block text-xs tracking-wider uppercase mb-1">{req.proposal_subject}</strong>
                        <p className="text-white/80 leading-relaxed font-light text-xs">{req.message}</p>
                      </td>
                      <td className="py-4 px-4 space-y-1 font-mono text-xs">
                        <span className="flex items-center gap-1.5 text-white/70">
                          <FaEnvelope size={10} className="text-[#fff0aa]" /> {req.email}
                        </span>
                        <span className="flex items-center gap-1.5 text-white/70">
                          <FaWhatsapp size={10} className="text-emerald-400" /> {req.whatsapp}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          req.status === "Approved"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                            : req.status === "Rejected"
                            ? "bg-red-950 text-red-400 border border-red-500/30"
                            : "bg-amber-950 text-amber-400 border border-amber-500/30"
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        {isWritable && req.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(req.id, "Approved")}
                              className="p-2 bg-emerald-950/20 hover:bg-emerald-600 hover:text-white border border-emerald-500/20 text-emerald-400 transition-all"
                              title="Approve Proposal"
                            >
                              <FaCheck size={12} />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(req.id, "Rejected")}
                              className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white border border-red-500/20 text-red-400 transition-all"
                              title="Reject Proposal"
                            >
                              <FaTimes size={12} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/40">No collaboration requests received yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* modal block */}
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
              {editingPartner ? "Edit Partner Record" : "Add New Partner"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 font-poppins">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Partner Name</label>
                <input
                  type="text"
                  required
                  value={formData.partner_name}
                  onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
                  placeholder="e.g. Pertamina NRE"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white appearance-none cursor-pointer"
                >
                  <option value="Company Visit" className="bg-[#012e21]">Company Visit</option>
                  <option value="External Forum/Delegation" className="bg-[#012e21]">External Forum/Delegation</option>
                  <option value="Alumni Network" className="bg-[#012e21]">Alumni Network</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Logo URL (Icon)</label>
                <input
                  type="text"
                  required
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  placeholder="e.g. https://upload.wikimedia.org/..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Collaboration Date</label>
                <input
                  type="date"
                  required
                  value={formData.collaboration_date}
                  onChange={(e) => setFormData({ ...formData, collaboration_date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white cursor-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of partnership, activities, or scope..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-2.5 px-3 text-sm focus:outline-none text-white placeholder-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#fff0aa] text-[#012e21] hover:bg-white hover:text-black py-3.5 font-akira text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-bold"
              >
                {saving ? <FaSpinner className="animate-spin" /> : <FaLink size={12} />}
                <span>{editingPartner ? "SAVE CHANGES" : "REGISTER PARTNER"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
