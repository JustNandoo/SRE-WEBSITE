"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  FaTimes,
  FaSpinner,
  FaFilePdf,
  FaImage,
  FaLink,
  FaExternalLinkAlt,
} from "react-icons/fa";
import type { RegistrationDivisionId, RegistrationEntity, RegistrationStatus } from "@sre-pens/shared-types";
import { fetchRegistrationFileUrl } from "@/services/api";
import {
  acceptanceChoiceOf,
  acceptanceDivisions,
  divisionLabel,
  registrationStatuses,
  type AcceptanceChoice,
} from "@/lib/registrationData";

type TabKind = "pdf" | "image" | "link";
interface FileTab {
  key: string;
  label: string;
  kind: TabKind;
  /** Untuk pdf/image: path storage. Untuk link: URL langsung. */
  value: string;
}

const statusClass: Record<RegistrationStatus, string> = {
  Menunggu: "text-[#fff0aa] border-[#fff0aa]/30 bg-[#fff0aa]/5",
  Diproses: "text-sky-300 border-sky-400/30 bg-sky-400/5",
  Lolos: "text-emerald-300 border-emerald-400/30 bg-emerald-400/5",
  "Tidak Lolos": "text-red-300 border-red-400/30 bg-red-400/5",
};

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function buildTabs(r: RegistrationEntity): FileTab[] {
  const tabs: FileTab[] = [
    { key: "cover", label: "Motivation Letter", kind: "pdf", value: r.cover_letter_path },
    { key: "cv", label: "Curriculum Vitae", kind: "pdf", value: r.cv_path },
    { key: "mbti", label: "Hasil MBTI", kind: "image", value: r.mbti_result_path },
  ];
  if (r.twibbon_proof) {
    tabs.push(
      r.twibbon_proof.startsWith("http")
        ? { key: "twibbon", label: "Twibbon", kind: "link", value: r.twibbon_proof }
        : { key: "twibbon", label: "Twibbon", kind: "image", value: r.twibbon_proof }
    );
  }
  if (r.portfolio_url) {
    tabs.push({ key: "porto", label: "Portofolio", kind: "link", value: r.portfolio_url });
  }
  return tabs;
}

const tabIcon = (kind: TabKind) =>
  kind === "pdf" ? <FaFilePdf size={11} /> : kind === "image" ? <FaImage size={11} /> : <FaLink size={11} />;

export default function RegistrantDetailModal({
  registration,
  isWritable,
  updating,
  initialKey,
  onStatusChange,
  onClose,
}: {
  registration: RegistrationEntity;
  isWritable: boolean;
  updating: boolean;
  initialKey?: string;
  onStatusChange: (
    item: RegistrationEntity,
    status: RegistrationStatus,
    acceptedDivision?: RegistrationDivisionId | null,
    acceptedDivision2?: RegistrationDivisionId | null
  ) => void;
  onClose: () => void;
}) {
  const tabs = useMemo(() => buildTabs(registration), [registration]);
  const [activeKey, setActiveKey] = useState(
    initialKey && tabs.some((t) => t.key === initialKey) ? initialKey : tabs[0]?.key ?? ""
  );
  // Cache signed-URL per tab + status muat / error.
  const [urlCache, setUrlCache] = useState<Record<string, string>>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});

  const active = tabs.find((t) => t.key === activeKey) ?? null;

  // Tutup dengan tombol Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Muat signed-URL berkas (lazy, hanya tab aktif) dengan satu kali retry.
  useEffect(() => {
    if (!active || active.kind === "link") return;
    if (urlCache[active.key] || errorByKey[active.key]) return;
    let cancelled = false;
    setLoadingKey(active.key);
    (async () => {
      let res = await fetchRegistrationFileUrl(active.value, 3600);
      if (res.error || !res.data) res = await fetchRegistrationFileUrl(active.value, 3600);
      if (cancelled) return;
      setLoadingKey(null);
      if (res.error || !res.data) {
        setErrorByKey((p) => ({ ...p, [active.key]: res.error ?? "Gagal memuat berkas." }));
      } else {
        setUrlCache((p) => ({ ...p, [active.key]: res.data as string }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [active, urlCache, errorByKey]);

  const retry = (key: string) => {
    setErrorByKey((p) => {
      const next = { ...p };
      delete next[key];
      return next;
    });
  };

  const divisi = registration.division_id_2
    ? `${divisionLabel(registration.division_id)} & ${divisionLabel(registration.division_id_2)}`
    : divisionLabel(registration.division_id);

  const info: [string, string][] = [
    ["NRP", registration.nrp],
    ["Program Studi", registration.study_program],
    ["Pilihan Divisi", divisi],
    ["Dikirim", formatDateTime(registration.submitted_at)],
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full sm:max-w-5xl bg-[#011f16] border border-white/15 shadow-2xl flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-white/10 bg-[#012e21]">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#fff0aa]/70 mb-1">Detail Pendaftar</p>
            <h2 className="font-akira text-xl md:text-2xl uppercase tracking-tighter text-white truncate">
              {registration.full_name}
            </h2>
            <p className="text-white/50 text-xs md:text-sm truncate mt-1">{registration.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-9 h-9 flex items-center justify-center border border-white/15 text-white/70 hover:text-[#012e21] hover:bg-[#fff0aa] hover:border-[#fff0aa] transition"
            aria-label="Tutup"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body: grid info + viewer */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 overflow-y-auto">
          {/* Info + status */}
          <div className="lg:col-span-2 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10 space-y-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Status Seleksi</p>
              {isWritable ? (
                <select
                  value={registration.status}
                  disabled={updating}
                  onChange={(e) => onStatusChange(registration, e.target.value as RegistrationStatus)}
                  className={`w-full border px-3 py-2.5 text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-[#fff0aa] disabled:opacity-50 ${statusClass[registration.status]}`}
                >
                  {registrationStatuses.map((s) => (
                    <option key={s} value={s} className="bg-[#012e21] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={`inline-block border px-3 py-2 text-sm font-semibold uppercase tracking-wider ${statusClass[registration.status]}`}>
                  {registration.status}
                </span>
              )}
              {updating && (
                <p className="mt-2 text-xs text-white/50 flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Menyimpan...
                </p>
              )}
            </div>

            {/* Divisi penerimaan — hanya saat Lolos (lolos berkas -> wawancara) */}
            {registration.status === "Lolos" && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Diterima di Divisi</p>
                {isWritable && registration.division_id_2 ? (
                  <select
                    value={acceptanceChoiceOf(registration)}
                    disabled={updating}
                    onChange={(e) => {
                      const { primary, secondary } = acceptanceDivisions(
                        e.target.value as AcceptanceChoice,
                        registration.division_id,
                        registration.division_id_2 ?? null
                      );
                      onStatusChange(
                        registration,
                        "Lolos",
                        primary as RegistrationDivisionId,
                        secondary as RegistrationDivisionId | null
                      );
                    }}
                    className="w-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-200 px-3 py-2.5 text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-[#fff0aa] disabled:opacity-50"
                  >
                    <option value="first" className="bg-[#012e21] text-white">
                      {divisionLabel(registration.division_id)}
                    </option>
                    <option value="second" className="bg-[#012e21] text-white">
                      {divisionLabel(registration.division_id_2)}
                    </option>
                    <option value="both" className="bg-[#012e21] text-white">
                      Keduanya (utama: {divisionLabel(registration.division_id)})
                    </option>
                  </select>
                ) : (
                  <span className="inline-block border border-emerald-400/40 bg-emerald-400/10 text-emerald-200 px-3 py-2 text-sm font-semibold uppercase tracking-wider">
                    {divisionLabel(registration.accepted_division ?? registration.division_id)}
                    {registration.accepted_division_2
                      ? ` & ${divisionLabel(registration.accepted_division_2)}`
                      : ""}
                  </span>
                )}
                <p className="mt-2 text-[11px] text-white/40 leading-relaxed">
                  Lolos berkas &amp; lanjut ke tahap wawancara. Jika &quot;Keduanya&quot;, prioritas utama tetap Pilihan 1.
                </p>
              </div>
            )}

            <dl className="divide-y divide-white/10 border-t border-white/10">
              {info.map(([label, value]) => (
                <div key={label} className="py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-[#fff0aa]/70">{label}</dt>
                  <dd className="text-sm text-white mt-1 break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Viewer */}
          <div className="lg:col-span-3 p-5 md:p-6 flex flex-col min-h-[50vh]">
            {/* Tabs berkas */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map((t) => {
                const on = t.key === activeKey;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveKey(t.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider border transition ${
                      on
                        ? "bg-[#fff0aa] text-[#012e21] border-[#fff0aa]"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-[#fff0aa]/50 hover:text-white"
                    }`}
                  >
                    {tabIcon(t.kind)} {t.label}
                  </button>
                );
              })}
            </div>

            {/* Konten berkas */}
            <div className="flex-1 min-h-[40vh] bg-[#012e21] border border-white/10 flex items-center justify-center overflow-hidden">
              {!active ? (
                <p className="text-white/40 text-sm">Tidak ada berkas.</p>
              ) : active.kind === "link" ? (
                <div className="text-center p-8">
                  <FaLink className="mx-auto text-[#fff0aa] mb-4" size={28} />
                  <p className="text-white/70 text-sm mb-5 break-all max-w-md mx-auto">{active.value}</p>
                  <a
                    href={active.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
                  >
                    <FaExternalLinkAlt size={12} /> Buka Tautan
                  </a>
                </div>
              ) : errorByKey[active.key] ? (
                <div className="text-center p-8">
                  <p className="text-red-300 text-sm mb-4">{errorByKey[active.key]}</p>
                  <button
                    type="button"
                    onClick={() => retry(active.key)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition"
                  >
                    Coba Lagi
                  </button>
                </div>
              ) : loadingKey === active.key || !urlCache[active.key] ? (
                <p className="text-white/40 text-sm flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Memuat berkas...
                </p>
              ) : active.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={urlCache[active.key]} alt={active.label} className="max-w-full max-h-[62vh] object-contain" />
              ) : (
                <iframe src={urlCache[active.key]} title={active.label} className="w-full h-full min-h-[55vh] bg-white" />
              )}
            </div>

            {/* Buka di tab baru (untuk pdf/gambar) */}
            {active && active.kind !== "link" && urlCache[active.key] && (
              <div className="mt-3 text-right">
                <a
                  href={urlCache[active.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-[#fff0aa] transition"
                >
                  <FaExternalLinkAlt size={10} /> Buka di tab baru
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
