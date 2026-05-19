"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { createClient } from "@/lib/supabase/client";
import { fetchExternalRelations, ExternalRelation } from "@/services/api";
import {
  FaBuilding,
  FaGlobe,
  FaGraduationCap,
  FaEnvelope,
  FaWhatsapp,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

// ================= FONTS =================
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

export default function ExternalDelegationPage() {
  const [partners, setPartners] = useState<ExternalRelation[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // CTA Form State
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_person: "",
    email: "",
    whatsapp: "",
    proposal_subject: "",
    message: "",
  });

  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchExternalRelations();
        if (data) {
          setPartners(data);
        }
      } catch (err) {
        console.error("Error loading partners:", err);
      } finally {
        setLoadingPartners(false);
      }
    }
    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const { error } = await supabase.from("collaboration_requests").insert([
        {
          organization_name: formData.organization_name,
          contact_person: formData.contact_person,
          email: formData.email,
          whatsapp: formData.whatsapp,
          proposal_subject: formData.proposal_subject,
          message: formData.message,
          status: "Pending",
        },
      ]);

      if (error) throw error;

      setSubmitStatus({
        type: "success",
        message:
          "Proposal submitted successfully! Our External Relations representative will contact you shortly.",
      });
      setFormData({
        organization_name: "",
        contact_person: "",
        email: "",
        whatsapp: "",
        proposal_subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting request:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit proposal. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#012e21] text-[#fff0aa] ${poppins.variable} ${akira.variable} font-sans`}>
      <SmoothScrollProvider>
        {/* ================= HERO / HEADER SECTION ================= */}
        <section className="relative w-full py-32 md:py-48 px-4 md:px-10 overflow-hidden" data-scroll-section>
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-10 flex justify-between px-4 md:px-10">
            <div className="w-px h-full bg-[#fff0aa]" />
            <div className="w-px h-full bg-[#fff0aa] hidden md:block" />
            <div className="w-px h-full bg-[#fff0aa] hidden md:block" />
            <div className="w-px h-full bg-[#fff0aa]" />
          </div>

          <div className="container mx-auto z-10 relative flex flex-col justify-center">
            {/* Tech Header */}
            <div className="w-full border-b border-[#fff0aa]/20 pb-6 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#fff0aa]/60 uppercase tracking-[0.2em]">EXTERNAL AFFAIRS</span>
                <span className="text-sm font-bold font-mono">GLOBAL NETWORK & COOPERATION</span>
              </div>
              <div className="hidden md:block text-xs font-mono text-[#fff0aa]/60 uppercase tracking-widest text-right">
                BUILDING CONNECTIONS BEYOND BOUNDARIES
              </div>
            </div>

            {/* Main Title */}
            <div className="flex flex-col font-black tracking-tighter leading-none uppercase select-none">
              <div className="overflow-hidden">
                <h1 className="font-akira text-[10vw] md:text-[8vw] mb-4 text-[#fff0aa]">
                  EXTERNAL
                </h1>
              </div>
              <div className="overflow-hidden text-right">
                <h1 className="font-akira text-[10vw] md:text-[8vw] text-stroke text-transparent stroke-2">
                  RELATIONS.
                </h1>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 md:mt-24 pt-10 border-t border-[#fff0aa]/20">
              <div className="md:col-span-4 flex flex-col justify-between">
                <span className="block w-3 h-3 bg-[#fff0aa] rounded-full mb-4 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#fff0aa]/60">
                  Mission Statement
                </span>
              </div>
              <div className="md:col-span-8">
                <p className="font-poppins text-lg md:text-2xl leading-snug font-light text-white/90">
                  <span className="text-[#fff0aa] font-bold">Menghubungkan SRE PENS dengan Dunia:</span> Membina kolaborasi dan jaringan global untuk mempercepat transisi energi ramah lingkungan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTIONS / CARDS OF INTEREST ================= */}
        <section className="relative w-full py-20 px-4 md:px-10 bg-[#011f16]" data-scroll-section>
          <div className="container mx-auto">
            <h2 className="font-akira text-xl md:text-2xl uppercase tracking-tighter text-[#fff0aa] mb-12 border-b border-[#fff0aa]/10 pb-4">
              Fields of Activity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Company Visit */}
              <div className="bg-[#012e21]/40 border border-[#fff0aa]/10 hover:border-[#fff0aa]/40 p-8 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#fff0aa]/5 flex items-center justify-center border border-[#fff0aa]/20 text-[#fff0aa] mb-6 group-hover:bg-[#fff0aa] group-hover:text-[#011f16] transition-all">
                  <FaBuilding size={20} />
                </div>
                <h3 className="font-akira text-sm md:text-base uppercase tracking-wider mb-3 text-white">Company Visit</h3>
                <p className="font-poppins text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  Bridging student innovators with industry giants. We conduct structured site visits to geothermal fields, wind farms, solar grids, and clean technology development laboratories.
                </p>
              </div>

              {/* Card 2: External Forum/Delegation */}
              <div className="bg-[#012e21]/40 border border-[#fff0aa]/10 hover:border-[#fff0aa]/40 p-8 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#fff0aa]/5 flex items-center justify-center border border-[#fff0aa]/20 text-[#fff0aa] mb-6 group-hover:bg-[#fff0aa] group-hover:text-[#011f16] transition-all">
                  <FaGlobe size={20} />
                </div>
                <h3 className="font-akira text-sm md:text-base uppercase tracking-wider mb-3 text-white">Forum & Delegation</h3>
                <p className="font-poppins text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  Representing SRE PENS at national and international energy summits. We engage in roundtables, publish research briefs, and advocate for student empowerment in policy-making.
                </p>
              </div>

              {/* Card 3: Alumni Network */}
              <div className="bg-[#012e21]/40 border border-[#fff0aa]/10 hover:border-[#fff0aa]/40 p-8 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#fff0aa]/5 flex items-center justify-center border border-[#fff0aa]/20 text-[#fff0aa] mb-6 group-hover:bg-[#fff0aa] group-hover:text-[#011f16] transition-all">
                  <FaGraduationCap size={20} />
                </div>
                <h3 className="font-akira text-sm md:text-base uppercase tracking-wider mb-3 text-white">Alumni Network</h3>
                <p className="font-poppins text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  Fostering strong relationships with our graduates. SRE PENS alumni working in top energy companies provide vital mentorship, masterclass sessions, and career pipeline updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PORTFOLIO / TRACK RECORD TABLE ================= */}
        <section className="relative w-full py-20 px-4 md:px-10 bg-[#012e21]" data-scroll-section>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#fff0aa]/10 pb-4 gap-4">
              <div>
                <h2 className="font-akira text-xl md:text-2xl uppercase tracking-tighter text-[#fff0aa]">
                  Collaboration Portfolio
                </h2>
                <p className="font-poppins text-xs text-white/60 mt-1 uppercase tracking-widest">A record of our institutional partners and engagements</p>
              </div>
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">UPDATED REAL-TIME</span>
            </div>

            {loadingPartners ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/50">
                <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
                <span className="font-mono text-xs uppercase tracking-wider">Retrieving Portfolio Logs...</span>
              </div>
            ) : partners.length === 0 ? (
              <div className="text-center py-20 border border-white/10 bg-white/5">
                <p className="font-poppins text-sm text-white/50">No collaboration records registered yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-[#fff0aa]/10">
                <table className="w-full text-left border-collapse font-poppins text-sm">
                  <thead>
                    <tr className="bg-[#011f16] border-b border-[#fff0aa]/10 text-[#fff0aa] uppercase text-xs tracking-wider">
                      <th className="py-5 px-6 font-semibold">Partner / Organization</th>
                      <th className="py-5 px-6 font-semibold">Category</th>
                      <th className="py-5 px-6 font-semibold">Description</th>
                      <th className="py-5 px-6 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#fff0aa]/10">
                    {partners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-5 px-6 font-semibold text-white flex items-center gap-3">
                          {partner.logo_url && (
                            <div className="w-8 h-8 relative bg-white/5 p-1 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={partner.logo_url} alt={partner.partner_name} className="object-contain max-w-full max-h-full" />
                            </div>
                          )}
                          <span>{partner.partner_name}</span>
                        </td>
                        <td className="py-5 px-6 text-xs font-mono uppercase text-[#fff0aa]/80">
                          {partner.category}
                        </td>
                        <td className="py-5 px-6 text-white/70 max-w-xs md:max-w-md font-light leading-relaxed">
                          {partner.description}
                        </td>
                        <td className="py-5 px-6 text-xs text-white/50 font-mono">
                          {new Date(partner.collaboration_date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ================= CALL TO ACTION & FORM SECTION ================= */}
        <section className="relative w-full py-20 px-4 md:px-10 bg-[#011f16]" data-scroll-section>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="font-akira text-xl md:text-2xl uppercase tracking-tighter text-[#fff0aa]">
                  Connect With Us.
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  We welcome universities, corporate partners, and research institutions globally to join our mission. Submit your project brief or partnership proposal using the official portal, or connect directly through our administrative channels below.
                </p>

                {/* Direct Contacts */}
                <div className="space-y-4 pt-6">
                  <a
                    href="mailto:external@sre-pens.com"
                    className="flex items-center gap-4 p-4 bg-[#012e21] border border-[#fff0aa]/10 hover:border-[#fff0aa] transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#fff0aa]/5 flex items-center justify-center text-[#fff0aa] group-hover:bg-[#fff0aa] group-hover:text-[#011f16] transition-all">
                      <FaEnvelope size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">SEND AN EMAIL</span>
                      <span className="block text-xs font-semibold text-white tracking-wide">external@sre-pens.com</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 bg-[#012e21] border border-[#fff0aa]/10 hover:border-[#fff0aa] transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#fff0aa]/5 flex items-center justify-center text-[#fff0aa] group-hover:bg-[#fff0aa] group-hover:text-[#011f16] transition-all">
                      <FaWhatsapp size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">WHATSAPP DIRECT</span>
                      <span className="block text-xs font-semibold text-white tracking-wide">+62 812-3456-7890</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7 bg-[#012e21] border border-[#fff0aa]/10 p-8 md:p-10 shadow-2xl relative">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
                  <span className="font-poppins text-[10px] text-[#fff0aa] font-semibold tracking-widest uppercase">PROPOSAL SUBMISSION PORTAL</span>
                </div>

                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 border font-poppins text-xs flex items-center gap-3 font-medium ${
                      submitStatus.type === "success"
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/40 border-red-500/40 text-red-300"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <FaCheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <FaTimesCircle size={16} className="text-red-400 flex-shrink-0" />
                    )}
                    <p>{submitStatus.message}</p>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6 font-poppins">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">
                        ORGANIZATION / UNIVERSITY
                      </label>
                      <input
                        type="text"
                        name="organization_name"
                        required
                        value={formData.organization_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Institut Teknologi Sepuluh Nopember"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-3.5 px-4 text-white placeholder-white/20 focus:outline-none text-xs sm:text-sm tracking-wide transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">
                        CONTACT PERSON NAME
                      </label>
                      <input
                        type="text"
                        name="contact_person"
                        required
                        value={formData.contact_person}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah Nadila"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-3.5 px-4 text-white placeholder-white/20 focus:outline-none text-xs sm:text-sm tracking-wide transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. sarah@its.ac.id"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-3.5 px-4 text-white placeholder-white/20 focus:outline-none text-xs sm:text-sm tracking-wide transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">
                        WHATSAPP / MOBILE NUMBER
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="e.g. 081234567890"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-3.5 px-4 text-white placeholder-white/20 focus:outline-none text-xs sm:text-sm tracking-wide transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">
                      PROPOSAL SUBJECT
                    </label>
                    <input
                      type="text"
                      name="proposal_subject"
                      required
                      value={formData.proposal_subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Seminar invitation or joint research plan"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-3.5 px-4 text-white placeholder-white/20 focus:outline-none text-xs sm:text-sm tracking-wide transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#fff0aa] uppercase tracking-wider">
                      MESSAGE / COLLABORATION DESCRIPTION
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detail your collaborative objectives, target dates, or requirements..."
                      className="w-full bg-white/5 border border-white/10 focus:border-[#fff0aa] py-3.5 px-4 text-white placeholder-white/20 focus:outline-none text-xs sm:text-sm tracking-wide transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#fff0aa] text-[#012e21] hover:bg-white hover:text-black py-4 font-akira text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 flex items-center justify-center gap-3 font-bold shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>SUBMITTING PORTAL...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={12} />
                        <span>SUBMIT COLLABORATION PROPOSAL</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </SmoothScrollProvider>
    </div>
  );
}
