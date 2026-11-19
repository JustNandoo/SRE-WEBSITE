"use client";

import React, { useEffect, useState } from "react";
import { FaSpinner, FaBullhorn, FaLockOpen, FaLock } from "react-icons/fa";
import {
  fetchRecruitmentSettings,
  updateRecruitmentSettings,
  isRegistrationOpen,
} from "@/services/api";
import type { RecruitmentSettingsEntity } from "@sre-pens/shared-types";

const showToast = (type: "success" | "error", text: string) => {
  const w = window as unknown as { showToast?: (type: "success" | "error", text: string) => void };
  if (w.showToast) w.showToast(type, text);
};

/** ISO -> nilai untuk <input type="datetime-local"> dalam zona waktu lokal. */
function isoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function RecruitmentControlPanel({ writable }: { writable: boolean }) {
  const [settings, setSettings] = useState<RecruitmentSettingsEntity | null>(null);
  const [open, setOpen] = useState(false);
  const [closesAt, setClosesAt] = useState("");
  const [invitationUrl, setInvitationUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [releasing, setReleasing] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await fetchRecruitmentSettings();
      if (!active || !data) return;
      setSettings(data);
      setOpen(data.registration_open);
      setClosesAt(isoToLocalInput(data.registration_closes_at));
      setInvitationUrl(data.invitation_url ?? "");
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const effectiveOpen = settings
    ? isRegistrationOpen({ ...settings, registration_open: open, registration_closes_at: closesAt ? new Date(closesAt).toISOString() : null })
    : false;

  const handleSave = async () => {
    if (!writable) return;
    setSaving(true);
    const { data, error } = await updateRecruitmentSettings({
      registration_open: open,
      registration_closes_at: closesAt ? new Date(closesAt).toISOString() : null,
      invitation_url: invitationUrl.trim() === "" ? null : invitationUrl.trim(),
    });
    setSaving(false);
    if (error || !data) {
      showToast("error", error ?? "Gagal menyimpan pengaturan.");
      return;
    }
    setSettings(data);
    showToast("success", "Pengaturan rekrutmen disimpan.");
  };

  const handleToggleAnnouncement = async () => {
    if (!writable || !settings) return;
    const next = !settings.announcement_released;
    if (next && !window.confirm("Rilis pengumuman ke semua pelamar? Mereka akan bisa melihat hasil seleksinya.")) return;
    if (!next && !window.confirm("Tarik kembali pengumuman? Pelamar kembali melihat status 'Menunggu Pengumuman'.")) return;
    setReleasing(true);
    const { data, error } = await updateRecruitmentSettings({ announcement_released: next });
    setReleasing(false);
    if (error || !data) {
      showToast("error", error ?? "Gagal mengubah status pengumuman.");
      return;
    }
    setSettings(data);
    showToast("success", next ? "Pengumuman dirilis." : "Pengumuman ditarik kembali.");
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#012e21] border border-white/15 text-white/40 font-poppins text-xs uppercase tracking-widest">
        <FaSpinner className="inline animate-spin mr-2" /> Memuat pengaturan rekrutmen...
      </div>
    );
  }

  const announced = !!settings?.announcement_released;
  const inputClass =
    "w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3 px-4 text-white placeholder-white/30 focus:outline-none font-poppins text-sm tracking-wide transition-all disabled:opacity-50";
  const labelClass = "block text-[10px] text-[#fff0aa] uppercase tracking-widest font-semibold mb-2";

  return (
    <div className="p-6 md:p-8 bg-[#012e21] border border-white/15 shadow-xl font-poppins text-white">
      <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div>
          <h2 className="font-akira text-lg sm:text-xl uppercase tracking-tighter">Kontrol Rekrutmen</h2>
          <p className="text-xs text-white/60 mt-1">Atur periode pendaftaran, link undangan, dan rilis pengumuman.</p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 border text-[11px] font-semibold uppercase tracking-widest ${
            effectiveOpen ? "text-emerald-300 border-emerald-400/40 bg-emerald-400/10" : "text-red-300 border-red-400/40 bg-red-400/10"
          }`}
        >
          {effectiveOpen ? <FaLockOpen size={11} /> : <FaLock size={11} />}
          {effectiveOpen ? "Pendaftaran Dibuka" : "Pendaftaran Ditutup"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buka / tutup manual */}
        <div>
          <span className={labelClass}>Saklar Pendaftaran</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => writable && setOpen((v) => !v)}
              disabled={!writable}
              role="switch"
              aria-checked={open}
              className={`relative w-14 h-7 rounded-full transition-colors disabled:opacity-50 ${open ? "bg-[#fff0aa]" : "bg-white/15"}`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-[#012e21] transition-transform ${open ? "translate-x-7" : ""}`}
              />
            </button>
            <span className="text-sm text-white/80">{open ? "Dibuka" : "Ditutup"}</span>
          </div>
          <p className="text-[11px] text-white/40 mt-2 leading-relaxed">
            Saklar utama. Jika dimatikan, pendaftaran tertutup walau tanggal belum lewat.
          </p>
        </div>

        {/* Tanggal tutup otomatis */}
        <div>
          <label htmlFor="closesAt" className={labelClass}>Tutup Otomatis Pada</label>
          <input
            id="closesAt"
            type="datetime-local"
            value={closesAt}
            disabled={!writable}
            onChange={(e) => setClosesAt(e.target.value)}
            className={`${inputClass} [color-scheme:dark]`}
          />
          <p className="text-[11px] text-white/40 mt-2 leading-relaxed">
            Kosongkan untuk tanpa batas tanggal. Lewat tanggal ini pendaftaran tertutup otomatis.
          </p>
        </div>

        {/* Link undangan */}
        <div className="md:col-span-2">
          <label htmlFor="invitationUrl" className={labelClass}>Link Undangan (untuk pelamar yang Lolos)</label>
          <input
            id="invitationUrl"
            type="url"
            value={invitationUrl}
            disabled={!writable}
            onChange={(e) => setInvitationUrl(e.target.value)}
            placeholder="https://chat.whatsapp.com/..."
            className={inputClass}
          />
          <p className="text-[11px] text-white/40 mt-2 leading-relaxed">
            Satu link untuk semua yang Lolos (mis. grup WhatsApp). Muncul di tombol &quot;Buka Undangan&quot; di halaman profil.
          </p>
        </div>
      </div>

      {writable && (
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fff0aa] hover:bg-white text-[#012e21] font-semibold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin" /> : null} Simpan Pengaturan
          </button>

          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-semibold uppercase tracking-widest ${announced ? "text-emerald-300" : "text-white/50"}`}>
              Pengumuman: {announced ? "Dirilis" : "Belum"}
            </span>
            <button
              onClick={handleToggleAnnouncement}
              disabled={releasing}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs uppercase tracking-widest transition-all disabled:opacity-50 border ${
                announced
                  ? "border-white/20 text-white/70 hover:bg-white/10"
                  : "border-[#fff0aa] bg-[#fff0aa]/10 text-[#fff0aa] hover:bg-[#fff0aa] hover:text-[#012e21]"
              }`}
            >
              {releasing ? <FaSpinner className="animate-spin" /> : <FaBullhorn />}
              {announced ? "Tarik Pengumuman" : "Rilis Pengumuman"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
