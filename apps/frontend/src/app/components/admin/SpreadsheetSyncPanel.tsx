"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaTable, FaCopy, FaCheck, FaSpinner, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { fetchSheetExportToken } from "@/services/api";

/** Ambil ID spreadsheet dari URL Google Sheets (.../d/<ID>/edit...). */
function extractSheetId(url: string): string {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  return m?.[1] ?? "";
}

/**
 * Panel sinkron data pendaftar ke Google Sheets (live, auto-update tiap 5 menit).
 *
 * Menghasilkan SELURUH kode Google Apps Script dengan token yang benar sudah
 * terisi otomatis + ID sheet dari URL yang ditempel admin, jadi tidak ada lagi
 * salah ketik/salin token (penyebab umum "data tidak masuk").
 * Hanya tampil untuk super-admin (lihat pemakaian di halaman pendaftar).
 */
export default function SpreadsheetSyncPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState("");
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
  const sheetId = extractSheetId(sheetUrl);

  const script = useMemo(() => {
    if (!token) return "";
    return `const CSV_URL  = "${csvUrl}";
const SHEET_ID = "${sheetId || "TEMPEL_URL_SHEET_DI_ATAS"}";

function updateSheet() {
  const res = UrlFetchApp.fetch(CSV_URL, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) return;
  const rows = Utilities.parseCsv(res.getContentText());
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  sheet.clearContents();
  if (rows.length) sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}

function setup() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("updateSheet").timeBased().everyMinutes(5).create();
  updateSheet();
}`;
  }, [token, csvUrl, sheetId]);

  const copy = async (text: string, which: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied((c) => (c === which ? null : c)), 2000);
    } catch {
      /* abaikan */
    }
  };

  return (
    <div className="p-6 md:p-8 bg-[#012e21] border border-white/15 shadow-xl font-poppins text-white">
      <div className="flex items-start gap-4 mb-5 pb-5 border-b border-white/10">
        <div className="shrink-0 w-11 h-11 rounded-lg bg-emerald-400/15 text-emerald-300 flex items-center justify-center">
          <FaTable size={18} />
        </div>
        <div>
          <h2 className="font-akira text-lg sm:text-xl uppercase tracking-tighter">Spreadsheet Live</h2>
          <p className="text-xs text-white/60 mt-1">
            Alirkan semua data pendaftar ke Google Sheets (auto-update tiap 5 menit) — mirip Google Form.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-white/50 text-xs flex items-center gap-2 py-4">
          <FaSpinner className="animate-spin" /> Menyiapkan...
        </p>
      ) : error ? (
        <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-300 text-xs">{error}</div>
      ) : (
        <>
          {/* Step 1: URL sheet */}
          <label className="block text-[10px] text-[#fff0aa] uppercase tracking-widest font-semibold mb-2">
            1. Tempel URL Google Sheet tujuan
          </label>
          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/.../edit"
            className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3 px-4 text-white placeholder-white/30 focus:outline-none text-sm mb-1"
          />
          <p className={`text-[11px] mb-5 ${sheetId ? "text-emerald-300" : "text-white/40"}`}>
            {sheetId ? `✓ ID sheet terdeteksi: ${sheetId}` : "Buat/ buka 1 sheet, lalu tempel URL-nya di sini."}
          </p>

          {/* Step 2: script */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="block text-[10px] text-[#fff0aa] uppercase tracking-widest font-semibold">
              2. Kode Apps Script (token sudah terisi otomatis)
            </label>
            <button
              type="button"
              disabled={!sheetId}
              onClick={() => copy(script, "script")}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#fff0aa] text-[#012e21] text-[11px] font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied === "script" ? <FaCheck /> : <FaCopy />} {copied === "script" ? "Tersalin" : "Salin kode"}
            </button>
          </div>
          <pre className="w-full overflow-x-auto bg-black/30 border border-white/15 px-4 py-3 text-[11px] leading-relaxed text-emerald-200 whitespace-pre mb-5">
            {script}
          </pre>

          {/* Step 3: langkah */}
          <ol className="space-y-1.5 text-sm text-white/75 list-decimal list-inside mb-5">
            <li>Di sheet itu: menu <span className="text-[#fff0aa]">Extensions → Apps Script</span>.</li>
            <li>Hapus kode bawaan → tempel kode di atas → <span className="text-[#fff0aa]">Save</span>.</li>
            <li>Pilih fungsi <span className="font-mono text-[#fff0aa]">setup</span> → <span className="text-[#fff0aa]">Run</span> → izinkan akses.</li>
            <li>Data langsung masuk & auto-update tiap 5 menit. Share sheet-nya ke pengurus lain.</li>
          </ol>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <a
              href={csvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/80 text-[11px] font-semibold uppercase tracking-widest hover:bg-white/10 transition"
            >
              <FaExternalLinkAlt size={11} /> Tes data mentah (CSV)
            </a>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-white/[0.03] border border-white/10 text-[11px] text-white/55 leading-relaxed">
            <FaLock className="shrink-0 mt-0.5 text-[#fff0aa]/70" />
            <span>
              Kode ini berisi <b className="text-white/70">token rahasia</b> + data pribadi pendaftar. Simpan
              hanya di sheet/akun pengurus inti. Kalau belum ada pendaftar, sheet hanya berisi baris header —
              itu normal. Setup cukup <b className="text-white/70">sekali</b>; pengurus lain tinggal buka sheet
              yang sudah di-share.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
