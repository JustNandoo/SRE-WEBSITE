"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaTable, FaCopy, FaCheck, FaSpinner, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { fetchSheetExportToken } from "@/services/api";

/** Spreadsheet data pendaftar (live, auto-update tiap 5 menit via Apps Script). */
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1k9oBPzR8VVvoUnRrUIj4CWcYrPEhkW2bgmVzly_K4jw/edit";

/** Ambil ID spreadsheet dari URL Google Sheets (.../d/<ID>/edit...). */
function extractSheetId(url: string): string {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  return m?.[1] ?? "";
}

/**
 * Panel spreadsheet data pendaftar. Tampilan utama hanya tombol "Buka
 * Spreadsheet" yang mengarah ke sheet live. Pengaturan Apps Script (untuk
 * setup ulang / menyambungkan sheet baru) disembunyikan di bagian lipat.
 * Hanya tampil untuk super-admin (lihat pemakaian di halaman pendaftar).
 */
export default function SpreadsheetSyncPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState(SHEET_URL);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    fetchSheetExportToken().then(({ data }) => {
      if (active && data) setToken(data);
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

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
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
          <h2 className="font-akira text-lg sm:text-xl uppercase tracking-tighter">Spreadsheet Data Pendaftar</h2>
          <p className="text-xs text-white/60 mt-1">
            Seluruh data pendaftar — ter-update otomatis tiap 5 menit.
          </p>
        </div>
      </div>

      {/* Tombol utama: buka spreadsheet */}
      <a
        href={SHEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-7 py-4 bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:bg-white transition"
      >
        <FaExternalLinkAlt size={13} /> Buka Spreadsheet
      </a>
      <p className="text-[11px] text-white/45 mt-3">
        Dibuka di Google Sheets. Bagikan link ke pengurus lain lewat tombol Share di Sheets.
      </p>

      {/* Pengaturan lanjutan (disembunyikan) */}
      <details className="mt-6 border-t border-white/10 pt-4 group">
        <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-[#fff0aa] transition list-none flex items-center gap-2">
          <FaLock size={10} /> Pengaturan Apps Script (jika perlu setup ulang / ganti sheet)
        </summary>

        <div className="mt-4">
          <label className="block text-[10px] text-[#fff0aa] uppercase tracking-widest font-semibold mb-2">
            1. URL Google Sheet tujuan
          </label>
          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/.../edit"
            className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3 px-4 text-white placeholder-white/30 focus:outline-none text-sm mb-1"
          />
          <p className={`text-[11px] mb-5 ${sheetId ? "text-emerald-300" : "text-white/40"}`}>
            {sheetId ? `✓ ID sheet terdeteksi: ${sheetId}` : "Tempel URL sheet untuk membuat kode."}
          </p>

          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="block text-[10px] text-[#fff0aa] uppercase tracking-widest font-semibold">
              2. Kode Apps Script (token sudah terisi otomatis)
            </label>
            <button
              type="button"
              disabled={!sheetId || !token}
              onClick={copyScript}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#fff0aa] text-[#012e21] text-[11px] font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? <FaCheck /> : <FaCopy />} {copied ? "Tersalin" : "Salin kode"}
            </button>
          </div>
          {token ? (
            <pre className="w-full overflow-x-auto bg-black/30 border border-white/15 px-4 py-3 text-[11px] leading-relaxed text-emerald-200 whitespace-pre mb-4">
              {script}
            </pre>
          ) : (
            <p className="text-white/40 text-xs flex items-center gap-2 py-3">
              <FaSpinner className="animate-spin" /> Menyiapkan kode...
            </p>
          )}

          <ol className="space-y-1.5 text-[13px] text-white/70 list-decimal list-inside">
            <li>Di sheet: <span className="text-[#fff0aa]">Extensions → Apps Script</span>.</li>
            <li>Hapus kode bawaan → tempel kode di atas → <span className="text-[#fff0aa]">Save</span>.</li>
            <li>Pilih fungsi <span className="font-mono text-[#fff0aa]">setup</span> → <span className="text-[#fff0aa]">Run</span> → izinkan.</li>
          </ol>
        </div>
      </details>
    </div>
  );
}
