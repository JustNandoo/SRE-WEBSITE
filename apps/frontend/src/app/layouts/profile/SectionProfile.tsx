"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import {
  FaSignOutAlt,
  FaClock,
  FaArrowRight,
  FaEnvelopeOpenText,
  FaRegEye,
  FaCheck,
} from "react-icons/fa";
import {
  fetchCurrentApplicant,
  fetchMyRegistration,
  fetchRecruitmentSettings,
  isRegistrationOpen,
  signOutApplicant,
  type ApplicantUser,
} from "@/services/api";
import { divisionLabel } from "@/lib/registrationData";
import type { RecruitmentSettingsEntity, RegistrationEntity } from "@sre-pens/shared-types";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const akira = localFont({ src: "../../fonts/Akira.otf", variable: "--font-akira", display: "swap" });

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function SectionProfile() {
  const router = useRouter();
  const [applicant, setApplicant] = useState<ApplicantUser | null>(null);
  const [registration, setRegistration] = useState<RegistrationEntity | null>(null);
  const [settings, setSettings] = useState<RecruitmentSettingsEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const user = await fetchCurrentApplicant();
      if (!active) return;
      if (!user) {
        router.replace("/login?next=/profile");
        return;
      }
      setApplicant(user);
      const [{ data: reg }, settingsRes] = await Promise.all([
        fetchMyRegistration(),
        fetchRecruitmentSettings(),
      ]);
      if (!active) return;
      setRegistration(reg);
      setSettings(settingsRes.data);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  const handleSignOut = async () => {
    await signOutApplicant();
    router.replace("/");
    router.refresh();
  };

  const announced = !!settings?.announcement_released;
  const accepted = registration?.status === "Lolos";
  const invitationUrl = settings?.invitation_url ?? null;
  const openNow = isRegistrationOpen(settings);

  return (
    <section
      className={`relative min-h-screen bg-[#012e21] text-white ${poppins.variable} ${akira.variable} font-poppins overflow-hidden selection:bg-[#fff0aa] selection:text-[#012e21]`}
      data-scroll-section
    >
      {/* grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 md:px-10 relative z-10 pt-28 md:pt-36 pb-24 max-w-4xl">
        {/* header */}
        <div className="border-b border-white/15 pb-8 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#fff0aa]">Akun Pendaftar</span>
          </div>
          <h1 className="font-akira text-4xl md:text-6xl uppercase tracking-tighter leading-none">Profil Saya</h1>
        </div>

        {loading ? (
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 py-20">Memuat profil...</p>
        ) : (
          <div className="space-y-6">
            {/* ===== Identitas ===== */}
            <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Identitas</p>
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="min-w-0">
                  <p className="text-2xl md:text-3xl font-bold truncate">{applicant?.fullName || "Pendaftar"}</p>
                  <p className="text-white/50 text-sm md:text-base truncate mt-1">{applicant?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#012e21] hover:bg-[#fff0aa] hover:border-[#fff0aa] transition"
                >
                  <FaSignOutAlt /> Keluar
                </button>
              </div>
            </div>

            {/* ===== Status Pendaftaran ===== */}
            <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-5">Status Pendaftaran</p>

              {!registration ? (
                // ---- Belum mendaftar ----
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Kamu belum mendaftar.</h2>
                  <p className="text-white/60 leading-relaxed mb-6 max-w-lg">
                    {openNow
                      ? "Pendaftaran Open Recruitment sedang dibuka. Lengkapi formulir untuk bergabung sebagai staf SRE PENS."
                      : "Pendaftaran untuk saat ini sedang ditutup. Nantikan informasi gelombang berikutnya melalui kanal resmi SRE PENS."}
                  </p>
                  {openNow && (
                    <Link
                      href="/pendaftaran"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
                    >
                      Daftar Sekarang <FaArrowRight />
                    </Link>
                  )}
                </div>
              ) : (
                // ---- Sudah mendaftar ----
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <FaCheck className="text-[#fff0aa]" />
                    <span className="text-sm md:text-base">
                      Kamu sudah terdaftar sebagai calon staf{" "}
                      <span className="text-[#fff0aa] font-semibold">
                        {registration.division_id_2
                          ? `${divisionLabel(registration.division_id)} / ${divisionLabel(registration.division_id_2)}`
                          : divisionLabel(registration.division_id)}
                      </span>
                      .
                    </span>
                  </div>
                  <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-8">
                    Dikirim {formatDate(registration.submitted_at)}
                  </p>

                  {/* ------- Alur Pengumuman ------- */}
                  {!announced ? (
                    // Pengumuman belum dirilis
                    <div className="border-t border-white/10 pt-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 mb-4">
                        <FaClock className="text-[#fff0aa]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Menunggu Pengumuman</span>
                      </div>
                      <p className="text-white/60 leading-relaxed max-w-lg">
                        Berkasmu sudah kami terima dan sedang dalam proses seleksi. Hasil akan diumumkan serentak —
                        pantau terus halaman ini dan kanal resmi SRE PENS ya.
                      </p>
                    </div>
                  ) : !revealed ? (
                    // Pengumuman dirilis, tapi hasil belum dibuka (jangan spoiler)
                    <div className="border-t border-white/10 pt-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff0aa]/15 border border-[#fff0aa]/40 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#fff0aa]">Pengumuman Telah Dirilis</span>
                      </div>
                      <p className="text-white/60 leading-relaxed max-w-lg mb-6">
                        Hasil seleksi sudah keluar. Tarik napas dulu, lalu buka hasilmu saat kamu siap.
                      </p>
                      <button
                        type="button"
                        onClick={() => setRevealed(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
                      >
                        <FaRegEye /> Lihat Hasil Seleksi
                      </button>
                    </div>
                  ) : accepted ? (
                    // Hasil dibuka: LOLOS
                    <div className="border-t border-white/10 pt-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 mb-4">
                        <FaCheck className="text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Selamat, Kamu Lolos!</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        Welcome to the <span className="text-[#fff0aa]">Society.</span>
                      </h3>
                      <p className="text-white/60 leading-relaxed max-w-lg mb-6">
                        Kamu dinyatakan diterima sebagai staf SRE PENS. Buka undangan di bawah untuk langkah
                        selanjutnya.
                      </p>
                      {invitationUrl ? (
                        <a
                          href={invitationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
                        >
                          <FaEnvelopeOpenText /> Buka Undangan
                        </a>
                      ) : (
                        <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                          Link undangan akan segera tersedia di sini.
                        </p>
                      )}
                    </div>
                  ) : (
                    // Hasil dibuka: BELUM LOLOS (atau masih diproses)
                    <div className="border-t border-white/10 pt-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/70">Hasil Seleksi</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">Belum berhasil kali ini.</h3>
                      <p className="text-white/60 leading-relaxed max-w-lg">
                        Terima kasih sudah berproses bersama kami. Perjalananmu tidak berhenti di sini — teruslah
                        berkembang, dan sampai jumpa di kesempatan berikutnya. 💛
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
