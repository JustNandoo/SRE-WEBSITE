"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { FaArrowDown, FaPaperPlane, FaFilePdf, FaImage, FaArrowRight, FaSignOutAlt, FaCheck } from "react-icons/fa";
import MotionSwitch from "@/app/components/MotionSwitch";
import type { RegistrationDivisionId, RegistrationEntity } from "@sre-pens/shared-types";
import {
  fetchCurrentApplicant,
  fetchMyRegistration,
  fetchRecruitmentSettings,
  isRegistrationOpen,
  signOutApplicant,
  submitRegistration,
  type ApplicantUser,
} from "@/services/api";
import {
  MAX_FILE_SIZE_LABEL,
  MBTI_TEST_URL,
  NRP_PATTERN,
  divisionLabel,
  divisionRequiresPortfolio,
  registrationDivisions,
  registrationFileRules,
  registrationStatusCopy,
  studyProgramSuggestions,
  validateRegistrationFile,
  type RegistrationFileKind,
} from "@/lib/registrationData";

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

// ================= NOISE OVERLAY =================
const NoiseOverlay = () => (
  // Tekstur noise dirender sebagai background (dirasterisasi sekali oleh browser)
  // bukan filter SVG hidup, agar tidak di-repaint tiap frame saat smooth-scroll.
  <div
    className="fixed inset-0 pointer-events-none z-40 opacity-[0.04]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundSize: "200px 200px",
    }}
  />
);

// ================= FORM STATE =================
interface FormState {
  fullName: string;
  nrp: string;
  studyProgram: string;
  divisionId: RegistrationDivisionId | "";
  divisionId2: RegistrationDivisionId | "";
  portfolioUrl: string;
  agreed: boolean;
}

interface FileState {
  "cover-letter": File | null;
  cv: File | null;
  mbti: File | null;
}

type FieldErrors = Partial<Record<keyof FormState | RegistrationFileKind, string>>;

const labelClass = "block text-[#fff0aa] font-mono text-xs uppercase tracking-widest mb-3 opacity-70";
const inputClass =
  "w-full py-4 bg-transparent border-b border-white/20 text-xl md:text-2xl text-white placeholder-white/20 focus:outline-none focus:border-[#fff0aa] transition-colors";
const errorClass = "mt-3 font-poppins text-xs text-red-300";

const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

// ================= FILE FIELD =================
function FileField({
  id,
  number,
  label,
  hint,
  kind,
  file,
  error,
  onChange,
  extra,
}: {
  id: string;
  number: string;
  label: string;
  hint: string;
  kind: RegistrationFileKind;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
  extra?: React.ReactNode;
}) {
  const Icon = kind === "mbti" ? FaImage : FaFilePdf;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-3">
        <label htmlFor={id} className={`${labelClass} mb-0`}>
          {`${number} / ${label}`}
        </label>
        {extra}
      </div>
      <label
        htmlFor={id}
        className={`group flex items-center justify-between gap-4 py-5 border-b cursor-pointer transition-colors ${
          error ? "border-red-400/60" : file ? "border-[#fff0aa]/60" : "border-white/20 hover:border-[#fff0aa]"
        }`}
      >
        <span className="flex items-center gap-4 min-w-0">
          <Icon className={`shrink-0 text-xl ${file ? "text-[#fff0aa]" : "text-white/30 group-hover:text-[#fff0aa]"} transition-colors`} />
          <span className="min-w-0">
            <span className={`block truncate text-lg md:text-xl ${file ? "text-white" : "text-white/30"}`}>
              {file ? file.name : "Pilih berkas"}
            </span>
            <span className="block font-poppins text-xs text-white/40 mt-1">
              {file ? formatBytes(file.size) : hint}
            </span>
          </span>
        </span>
        <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-white/50 group-hover:text-[#fff0aa] transition-colors">
          {file ? "Ganti" : "Unggah"}
        </span>
      </label>
      <input
        id={id}
        type="file"
        accept={registrationFileRules[kind].accept}
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

// ================= DIVISION GRID =================
function DivisionGrid({
  name,
  value,
  onSelect,
  disabledId,
  allowClear,
}: {
  name: string;
  value: RegistrationDivisionId | "";
  onSelect: (id: RegistrationDivisionId | "") => void;
  disabledId?: RegistrationDivisionId | "";
  allowClear?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {registrationDivisions.map((division) => {
        const selected = value === division.id;
        const disabled = disabledId === division.id;
        return (
          <label
            key={division.id}
            className={`group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border transition-[border-color,box-shadow] duration-200 ${
              disabled
                ? "border-white/10 bg-white/[0.02] opacity-40 cursor-not-allowed"
                : selected
                ? "border-[#fff0aa] bg-[#fff0aa] text-[#012e21] shadow-lg shadow-[#fff0aa]/10 cursor-pointer"
                : "border-white/15 bg-white/[0.03] text-white/80 hover:border-[#fff0aa]/50 hover:bg-white/[0.06] hover:text-white cursor-pointer"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={division.id}
              checked={selected}
              disabled={disabled}
              onChange={() => onSelect(division.id)}
              onClick={() => {
                if (allowClear && selected) onSelect("");
              }}
              className="sr-only"
            />
            <span className="font-medium leading-snug">{division.label}</span>
            {selected ? (
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#012e21] text-[#fff0aa] flex items-center justify-center">
                <FaCheck className="text-[10px]" />
              </span>
            ) : division.requiresPortfolio ? (
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/35 group-hover:text-white/55 transition-colors">
                + Portofolio
              </span>
            ) : null}
          </label>
        );
      })}
    </div>
  );
}

// ================= STATUS VIEW (setelah submit) =================
function RegistrationSummary({ registration }: { registration: RegistrationEntity }) {
  const copy = registrationStatusCopy[registration.status];
  const rows: [string, string][] = [
    ["Nama Lengkap", registration.full_name],
    ["NRP", registration.nrp],
    ["Prodi", registration.study_program],
    [
      "Pilihan Divisi",
      registration.division_id_2
        ? `${divisionLabel(registration.division_id)} & ${divisionLabel(registration.division_id_2)}`
        : divisionLabel(registration.division_id),
    ],
    ["Motivation Letter", "Terunggah (.pdf)"],
    ["CV", "Terunggah (.pdf)"],
    ["Portofolio", registration.portfolio_url || "—"],
    ["Hasil Tes MBTI", "Terunggah"],
    ["Dikirim", formatDate(registration.submitted_at)],
  ];

  return (
    <div className="py-12 px-4 md:px-16 lg:px-20">
      <div className="flex items-center gap-3 mb-6 text-[#fff0aa]">
        <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest">Status / {registration.status}</span>
      </div>
      <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{copy.title}</h3>
      <p className="text-white/60 text-base md:text-lg leading-relaxed mb-12 max-w-xl">{copy.body}</p>

      <dl className="border-t border-white/20">
        {rows.map(([label, value], i) => (
          <div key={label} className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 py-5 border-b border-white/20">
            <dt className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#fff0aa] opacity-70">
              {`${String(i + 1).padStart(2, "0")} / ${label}`}
            </dt>
            <dd className="md:col-span-8 text-lg text-white break-words">
              {label === "Portofolio" && registration.portfolio_url ? (
                <a href={registration.portfolio_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#fff0aa]">
                  {registration.portfolio_url}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ================= PENDAFTARAN DITUTUP =================
function RegistrationClosed() {
  return (
    <div className="py-20 md:py-28 px-4 md:px-16 lg:px-20">
      <div className="flex items-center gap-3 mb-6 text-[#fff0aa]">
        <span className="w-2 h-2 rounded-full bg-[#fff0aa]/60" />
        <span className="font-mono text-xs uppercase tracking-widest">Status / Tutup</span>
      </div>
      <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
        Pendaftaran untuk saat ini <span className="text-[#fff0aa]">telah ditutup.</span>
      </h3>
      <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
        Periode Open Recruitment sedang tidak dibuka. Terima kasih atas antusiasmemu — nantikan
        informasi gelombang berikutnya dan pengumuman selanjutnya melalui kanal resmi SRE PENS.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="https://www.instagram.com/sre_pens"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
        >
          Instagram SRE PENS
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-bold uppercase tracking-widest text-white/70 hover:text-[#012e21] hover:bg-[#fff0aa] hover:border-[#fff0aa] transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}

// ================= MAIN SECTION =================
export default function SectionHome() {
  const router = useRouter();
  const [applicant, setApplicant] = useState<ApplicantUser | null>(null);
  const [registration, setRegistration] = useState<RegistrationEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  // Periode pendaftaran (diatur admin). null = belum termuat.
  const [regOpen, setRegOpen] = useState<boolean | null>(null);
  const [closesAt, setClosesAt] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    nrp: "",
    studyProgram: "",
    divisionId: "",
    divisionId2: "",
    portfolioUrl: "",
    agreed: false,
  });
  const [files, setFiles] = useState<FileState>({ "cover-letter": null, cv: null, mbti: null });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const portfolioRequired =
    (form.divisionId !== "" && divisionRequiresPortfolio(form.divisionId)) ||
    (form.divisionId2 !== "" && divisionRequiresPortfolio(form.divisionId2));

  // --- Load sesi & pendaftaran yang sudah ada ---
  useEffect(() => {
    let active = true;
    (async () => {
      const user = await fetchCurrentApplicant();
      if (!active) return;
      if (!user) {
        router.replace("/login?next=/pendaftaran");
        return;
      }
      setApplicant(user);
      setForm((prev) => ({ ...prev, fullName: prev.fullName || user.fullName }));

      const [{ data, error }, settingsRes] = await Promise.all([
        fetchMyRegistration(),
        fetchRecruitmentSettings(),
      ]);
      if (!active) return;
      if (error) setLoadError(error);
      setRegistration(data);
      setRegOpen(isRegistrationOpen(settingsRes.data));
      setClosesAt(settingsRes.data?.registration_closes_at ?? null);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateFile = (kind: RegistrationFileKind, file: File | null) => {
    setFiles((prev) => ({ ...prev, [kind]: file }));
    setErrors((prev) => ({ ...prev, [kind]: file ? validateRegistrationFile(kind, file) ?? undefined : undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.fullName.trim()) next.fullName = "Nama lengkap wajib diisi.";
    if (!NRP_PATTERN.test(form.nrp.trim())) next.nrp = "NRP hanya berisi angka (6–15 digit).";
    if (!form.studyProgram.trim()) next.studyProgram = "Prodi wajib diisi.";
    if (!form.divisionId) next.divisionId = "Pilih minimal satu divisi (Pilihan 1).";
    if (form.divisionId2 && form.divisionId2 === form.divisionId)
      next.divisionId2 = "Pilihan 2 tidak boleh sama dengan Pilihan 1.";
    (["cover-letter", "cv", "mbti"] as RegistrationFileKind[]).forEach((kind) => {
      const message = validateRegistrationFile(kind, files[kind]);
      if (message) next[kind] = message;
    });
    const url = form.portfolioUrl.trim();
    if (portfolioRequired && !url) next.portfolioUrl = "Portofolio wajib untuk divisi ini.";
    else if (url && !/^https?:\/\/\S+\.\S+/i.test(url)) next.portfolioUrl = "Masukkan tautan lengkap, diawali https://";
    if (!form.agreed) next.agreed = "Centang pernyataan ini sebelum mengirim.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const found = validate();
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      setSubmitError("Masih ada isian yang perlu diperbaiki.");
      return;
    }

    setIsSubmitting(true);
    const { data, error } = await submitRegistration(
      {
        fullName: form.fullName,
        nrp: form.nrp,
        studyProgram: form.studyProgram,
        divisionId: form.divisionId as RegistrationDivisionId,
        divisionId2: form.divisionId2 === "" ? null : (form.divisionId2 as RegistrationDivisionId),
        coverLetter: files["cover-letter"]!,
        cv: files.cv!,
        portfolioUrl: form.portfolioUrl,
        mbtiResult: files.mbti!,
      },
      setProgress
    );
    setIsSubmitting(false);
    setProgress(null);

    if (error || !data) {
      setSubmitError(error);
      return;
    }
    setRegistration(data);
  };

  const handleSignOut = async () => {
    await signOutApplicant();
    router.replace("/login");
    router.refresh();
  };

  return (
    <section
      className={`relative min-h-screen bg-[#022E21] text-white ${poppins.variable} ${akira.variable} font-poppins overflow-hidden`}
      data-scroll-section
    >
      <NoiseOverlay />

      {/* ================= GRID BACKGROUND ================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 md:px-10 relative z-10 pt-24 md:pt-32 pb-20">
        {/* ================= HEADER ================= */}
        <div className="border-b border-white/20 pb-8 mb-12 md:mb-20">
          <h1
            className="text-5xl md:text-8xl lg:text-[10vw] leading-[0.8] font-black tracking-tighter opacity-50 select-none"
            data-scroll
            data-scroll-speed="-0.1"
          >
            PENDAFTARAN
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/20">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/20">
            <div className="relative lg:sticky lg:top-20 py-10 md:py-16 px-2 md:px-10">
              <MotionSwitch
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
              >
                <div className="flex items-center gap-3 mb-6 text-[#fff0aa]">
                  <FaArrowDown className="animate-bounce text-sm" />
                  <span className="font-mono text-xs uppercase tracking-widest">Open Recruitment 2026</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                  Join the <br />
                  <span className="text-[#fff0aa]">Society.</span>
                </h2>

                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
                  Lengkapi formulir ini untuk bergabung sebagai staf SRE PENS. Pendaftaran hanya bisa dikirim satu kali, jadi
                  periksa kembali sebelum menekan kirim.
                </p>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">Siapkan Berkas</p>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex gap-3"><span className="font-mono text-[#fff0aa]/70">—</span>Motivation letter & CV dalam format .pdf</li>
                    <li className="flex gap-3"><span className="font-mono text-[#fff0aa]/70">—</span>Tautan portofolio untuk Content Marketing, Design Graphic, Web Development</li>
                    <li className="flex gap-3"><span className="font-mono text-[#fff0aa]/70">—</span>Screenshot hasil tes MBTI (.jpg / .png)</li>
                    <li className="flex gap-3"><span className="font-mono text-[#fff0aa]/70">—</span>Ukuran setiap berkas maksimal {MAX_FILE_SIZE_LABEL}</li>
                  </ul>
                </div>

                {applicant && (
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Masuk Sebagai</p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{applicant.fullName || "Pendaftar"}</p>
                        <p className="text-white/50 text-sm truncate">{applicant.email}</p>
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
                )}
              </MotionSwitch>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:col-span-7">
            <div className="border-b border-white/20 p-2 mb-6">
              <h2
                className="text-4xl md:text-6xl lg:text-[5.5vw] text-center leading-[0.8] font-black tracking-tighter opacity-50 select-none"
                data-scroll
                data-scroll-speed="-0.1"
              >
                {registration ? "TERIMA KASIH" : regOpen === false ? "DITUTUP" : "FORMULIR SRE PENS"}
              </h2>
            </div>

            <div className="bg-[#022E21]/40">
              {loading ? (
                <div className="py-24 px-4 md:px-16 lg:px-20 font-mono text-xs uppercase tracking-widest text-white/40">
                  Memuat data pendaftaran...
                </div>
              ) : loadError ? (
                <div className="py-24 px-4 md:px-16 lg:px-20">
                  <p className="font-mono text-xs uppercase tracking-widest text-red-300 mb-4">Gagal memuat</p>
                  <p className="text-white/60">{loadError}</p>
                </div>
              ) : registration ? (
                <RegistrationSummary registration={registration} />
              ) : regOpen === false ? (
                <RegistrationClosed />
              ) : (
                <div className="py-12 px-4 md:px-16 lg:px-20">
                  {/* <form> biasa: MotionSwitch versi mobile hanya meneruskan className (onSubmit akan hilang). */}
                  <form onSubmit={handleSubmit} noValidate>
                    <MotionSwitch
                      className="space-y-12 md:space-y-16"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } },
                      }}
                    >
                      {/* 01 — Nama */}
                      <div>
                        <label htmlFor="fullName" className={labelClass}>01 / Nama Lengkap</label>
                        <input
                          id="fullName"
                          type="text"
                          autoComplete="name"
                          value={form.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          placeholder="Nama sesuai KTM"
                          className={inputClass}
                        />
                        {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                      </div>

                      {/* 02 — NRP */}
                      <div>
                        <label htmlFor="nrp" className={labelClass}>02 / NRP</label>
                        <input
                          id="nrp"
                          type="text"
                          inputMode="numeric"
                          maxLength={15}
                          value={form.nrp}
                          onChange={(e) => updateField("nrp", e.target.value.replace(/\D/g, ""))}
                          placeholder="3125600001"
                          className={inputClass}
                        />
                        {errors.nrp && <p className={errorClass}>{errors.nrp}</p>}
                      </div>

                      {/* 03 — Prodi */}
                      <div>
                        <label htmlFor="studyProgram" className={labelClass}>03 / Program Studi</label>
                        <input
                          id="studyProgram"
                          type="text"
                          list="study-program-options"
                          value={form.studyProgram}
                          onChange={(e) => updateField("studyProgram", e.target.value)}
                          placeholder="D4 Teknik Elektronika"
                          className={inputClass}
                        />
                        <datalist id="study-program-options">
                          {studyProgramSuggestions.map((p) => (
                            <option key={p} value={p} />
                          ))}
                        </datalist>
                        {errors.studyProgram && <p className={errorClass}>{errors.studyProgram}</p>}
                      </div>

                      {/* 04 — Divisi (Pilihan 1 wajib, Pilihan 2 opsional & tidak boleh sama) */}
                      <fieldset>
                        <legend className={labelClass}>04 / Pilihan Divisi</legend>
                        <p className="font-poppins text-xs text-white/40 mb-5 -mt-1">
                          Pilih satu atau dua divisi. Pilihan 2 bersifat opsional dan tidak boleh sama dengan Pilihan 1.
                        </p>

                        <div className="mb-8">
                          <p className="font-mono text-[11px] uppercase tracking-widest text-[#fff0aa]/70 mb-3">
                            Pilihan 1 — Wajib
                          </p>
                          <DivisionGrid
                            name="division1"
                            value={form.divisionId}
                            disabledId={form.divisionId2}
                            onSelect={(id) => updateField("divisionId", id)}
                          />
                          {errors.divisionId && <p className={errorClass}>{errors.divisionId}</p>}
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <p className="font-mono text-[11px] uppercase tracking-widest text-[#fff0aa]/70">
                              Pilihan 2 — Opsional
                            </p>
                            {form.divisionId2 && (
                              <button
                                type="button"
                                onClick={() => updateField("divisionId2", "")}
                                className="font-mono text-[11px] uppercase tracking-widest text-white/50 hover:text-[#fff0aa] transition-colors"
                              >
                                Hapus
                              </button>
                            )}
                          </div>
                          <DivisionGrid
                            name="division2"
                            value={form.divisionId2}
                            disabledId={form.divisionId}
                            allowClear
                            onSelect={(id) => updateField("divisionId2", id)}
                          />
                          {errors.divisionId2 && <p className={errorClass}>{errors.divisionId2}</p>}
                        </div>
                      </fieldset>

                      {/* 05 — Motlet */}
                      <FileField
                        id="coverLetter"
                        number="05"
                        label="Motivation Letter (.pdf)"
                        hint={`PDF, maksimal ${MAX_FILE_SIZE_LABEL}`}
                        kind="cover-letter"
                        file={files["cover-letter"]}
                        error={errors["cover-letter"]}
                        onChange={(f) => updateFile("cover-letter", f)}
                      />

                      {/* 06 — CV */}
                      <FileField
                        id="cv"
                        number="06"
                        label="Curriculum Vitae (.pdf)"
                        hint={`PDF, maksimal ${MAX_FILE_SIZE_LABEL}`}
                        kind="cv"
                        file={files.cv}
                        error={errors.cv}
                        onChange={(f) => updateFile("cv", f)}
                      />

                      {/* 07 — Portofolio */}
                      <div>
                        <label htmlFor="portfolioUrl" className={labelClass}>
                          {`07 / Portofolio ${portfolioRequired ? "(wajib)" : "(khusus Design, Konten, Web Dev)"}`}
                        </label>
                        <input
                          id="portfolioUrl"
                          type="url"
                          inputMode="url"
                          value={form.portfolioUrl}
                          onChange={(e) => updateField("portfolioUrl", e.target.value)}
                          placeholder="https://behance.net/... atau Google Drive / GitHub"
                          className={inputClass}
                        />
                        <p className="mt-3 font-poppins text-xs text-white/40">
                          Pastikan tautan bisa dibuka tanpa meminta akses.
                        </p>
                        {errors.portfolioUrl && <p className={errorClass}>{errors.portfolioUrl}</p>}
                      </div>

                      {/* 08 — MBTI */}
                      <FileField
                        id="mbtiResult"
                        number="08"
                        label="Hasil Tes MBTI (.jpg / .png)"
                        hint={`Screenshot hasil tes, maksimal ${MAX_FILE_SIZE_LABEL}`}
                        kind="mbti"
                        file={files.mbti}
                        error={errors.mbti}
                        onChange={(f) => updateFile("mbti", f)}
                        extra={
                          <a
                            href={MBTI_TEST_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#fff0aa] transition-colors"
                          >
                            Kerjakan tes MBTI <FaArrowRight className="-rotate-45" />
                          </a>
                        }
                      />

                      {/* Pernyataan */}
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer text-white/70 hover:text-white">
                          <input
                            type="checkbox"
                            checked={form.agreed}
                            onChange={(e) => updateField("agreed", e.target.checked)}
                            className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent cursor-pointer accent-[#fff0aa] shrink-0"
                          />
                          <span className="text-sm leading-relaxed">
                            Saya menyatakan data dan berkas yang saya kirim benar, dan memahami pendaftaran hanya dapat dikirim satu kali.
                          </span>
                        </label>
                        {errors.agreed && <p className={errorClass}>{errors.agreed}</p>}
                      </div>

                      {submitError && (
                        <div role="alert" className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                          <p>{submitError}</p>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6">
                        <p className="font-mono text-xs uppercase tracking-widest text-white/40 min-h-4">{progress}</p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#022E21] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#fff0aa] transition disabled:opacity-60"
                        >
                          {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                          <FaPaperPlane />
                        </button>
                      </div>
                    </MotionSwitch>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
