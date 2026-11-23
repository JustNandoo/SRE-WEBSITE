"use client";

import React, { useEffect, useState } from "react";
import { FaTable, FaCopy, FaCheck, FaSpinner, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { fetchSheetExportToken } from "@/services/api";

/**
 * Panel sinkron data pendaftar ke Google Sheets (live, auto-update).
 * Menampilkan formula =IMPORTDATA(...) berisi link CSV ber-token, sehingga
 * spreadsheet menarik data terbaru otomatis — bukan export sekali jalan.
 * Hanya ditampilkan untuk super-admin (lihat pemakaian di halaman pendaftar).
 */
export default function SpreadsheetSyncPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchSheetExportToken().then(({ data, error }) => {
      if (!active) return;
      if (error || !data) setError(error ?? "Token tidak tersedia.");
      else setToken(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "https://sre-pens.com";
  const csvUrl = token ? `${origin}/api/pendaftar-sheet?token=${token}` : "";
  const formula = token ? `=IMPORTDATA("${csvUrl}")` : "";

  const copy = async (text: string, which: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied((c) => (c === which ? null : c)), 2000);
    } catch {
      /* abaikan */
    }
  };

  const copyBtn = (text: string, which: string) => (
    <button
      type="button"
      onClick={() => copy(text, which)}
      className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#fff0aa] text-[#012e21] text-[11px] font-bold uppercase tracking-widest hover:bg-white transition"
    >
      {copied === which ? <FaCheck /> : <FaCopy />} {copied === which ? "Tersalin" : "Salin"}
    </button>
  );

  return (
    <div className="p-6 md:p-8 bg-[#012e21] border border-white/15 shadow-xl font-poppins text-white">
      <div className="flex items-start gap-4 mb-5 pb-5 border-b border-white/10">
        <div className="shrink-0 w-11 h-11 rounded-lg bg-emerald-400/15 text-emerald-300 flex items-center justify-center">
          <FaTable size={18} />
        </div>
        <div>
          <h2 className="font-akira text-lg sm:text-xl uppercase tracking-tighter">Spreadsheet Live</h2>
          <p className="text-xs text-white/60 mt-1">
            Lihat seluruh data pendaftar di Google Sheets yang ter-update otomatis — tanpa export manual.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-white/50 text-xs flex items-center gap-2 py-4">
          <FaSpinner className="animate-spin" /> Menyiapkan tautan...
        </p>
      ) : error ? (
        <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-300 text-xs">{error}</div>
      ) : (
        <>
          {/* Formula IMPORTDATA */}
          <label className="block text-[10px] text-[#fff0aa] uppercase tracking-widest font-semibold mb-2">
            Formula Google Sheets
          </label>
          <div className="flex flex-col sm:flex-row gap-2 mb-5">
            <code className="flex-1 min-w-0 bg-white/5 border border-white/15 px-4 py-3 text-xs text-emerald-200 break-all">
              {formula}
            </code>
            {copyBtn(formula, "formula")}
          </div>

          {/* Langkah-langkah */}
          <ol className="space-y-2 text-sm text-white/75 list-decimal list-inside mb-5">
            <li>Buka <span className="text-[#fff0aa]">sheets.new</span> (Google Sheets kosong).</li>
            <li>Klik sel <span className="font-mono text-[#fff0aa]">A1</span>.</li>
            <li>Tempel formula di atas, lalu tekan <span className="text-[#fff0aa]">Enter</span>.</li>
            <li>Seluruh data pendaftar langsung muncul dan akan ter-refresh otomatis.</li>
          </ol>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <a
              href="https://sheets.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/80 text-[11px] font-semibold uppercase tracking-widest hover:bg-white/10 transition"
            >
              <FaExternalLinkAlt size={11} /> Buka Google Sheets
            </a>
            <a
              href={csvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/80 text-[11px] font-semibold uppercase tracking-widest hover:bg-white/10 transition"
            >
              Lihat data mentah (CSV)
            </a>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-white/[0.03] border border-white/10 text-[11px] text-white/55 leading-relaxed">
            <FaLock className="shrink-0 mt-0.5 text-[#fff0aa]/70" />
            <span>
              Link ini berisi <b className="text-white/70">token rahasia</b> dan seluruh data pribadi pendaftar.
              Bagikan hanya ke pengurus inti. Google Sheets me-refresh data otomatis (±1 jam, dan saat
              sheet dibuka/diedit). Kalau token bocor, jalankan ulang migrasi untuk membuat token baru.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
