"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEnvelope, FaCheck, FaEnvelopeOpenText, FaRegHeart } from "react-icons/fa";

type Stage = "idle" | "checking" | "result";

/**
 * Alur pembukaan hasil pengumuman sebagai "surprise reveal":
 *  idle    -> tombol "Cek Hasil Pengumuman"
 *  checking-> animasi suspense (amplod tersegel, berkas dibuka) ~2.8 dtk
 *  result  -> hasil + animasi (Lolos: confetti + selamat / Gagal: pesan lembut)
 *
 * Semua animasi dibuat dengan framer-motion (tanpa dependency tambahan).
 */
export default function AnnouncementReveal({
  accepted,
  invitationUrl,
  acceptedDivisionLabel,
  acceptedDivision2Label,
}: {
  accepted: boolean;
  invitationUrl: string | null;
  acceptedDivisionLabel: string | null;
  acceptedDivision2Label: string | null;
}) {
  const [stage, setStage] = useState<Stage>("idle");

  const startCheck = () => {
    setStage("checking");
    window.setTimeout(() => setStage("result"), 2800);
  };

  return (
    <div className="border-t border-white/10 pt-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff0aa]/15 border border-[#fff0aa]/40 mb-5">
        <span className="w-2 h-2 rounded-full bg-[#fff0aa] animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#fff0aa]">Pengumuman Telah Dirilis</span>
      </div>

      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <p className="text-white/60 leading-relaxed max-w-lg mb-6">
              Hasil seleksi sudah keluar. Tarik napas dulu, lalu buka hasilmu saat kamu benar-benar siap. 🤍
            </p>
            <button
              type="button"
              onClick={startCheck}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
            >
              <FaRegEnvelope className="group-hover:-rotate-12 transition-transform" />
              Cek Hasil Pengumuman
            </button>
          </motion.div>
        )}

        {stage === "checking" && <SuspenseScene key="checking" />}

        {stage === "result" &&
          (accepted ? (
            <AcceptedScene
              key="accepted"
              invitationUrl={invitationUrl}
              divisionLabel={acceptedDivisionLabel}
              divisionLabel2={acceptedDivision2Label}
            />
          ) : (
            <RejectedScene key="rejected" />
          ))}
      </AnimatePresence>
    </div>
  );
}

// ================= SUSPENSE =================
function SuspenseScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="relative flex flex-col items-center justify-center py-14 text-center overflow-hidden"
    >
      {/* sinar berputar di belakang */}
      <motion.div
        aria-hidden
        className="absolute w-64 h-64 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,240,170,0.18) 40deg, transparent 80deg, rgba(255,240,170,0.18) 160deg, transparent 220deg, rgba(255,240,170,0.18) 300deg, transparent 340deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {/* amplop berdenyut */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-2xl bg-[#fff0aa] text-[#012e21] flex items-center justify-center shadow-2xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaRegEnvelope size={38} />
        {/* denyut cincin */}
        <motion.span
          className="absolute inset-0 rounded-2xl border-2 border-[#fff0aa]"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      <motion.p
        className="relative z-10 mt-8 font-mono text-xs uppercase tracking-[0.3em] text-[#fff0aa]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        Membuka hasil pengumuman
      </motion.p>
      <p className="relative z-10 mt-2 text-white/40 text-sm">Tahan sebentar, ya...</p>
    </motion.div>
  );
}

// ================= HASIL: LOLOS BERKAS =================
function AcceptedScene({
  invitationUrl,
  divisionLabel,
  divisionLabel2,
}: {
  invitationUrl: string | null;
  divisionLabel: string | null;
  divisionLabel2: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative text-center py-8 overflow-hidden"
    >
      <Confetti />

      {/* lencana centang */}
      <motion.div
        className="relative z-10 mx-auto w-24 h-24 rounded-full bg-emerald-400 text-[#012e21] flex items-center justify-center shadow-[0_0_60px_rgba(52,211,153,0.5)]"
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 300 }}
        >
          <FaCheck size={40} />
        </motion.span>
      </motion.div>

      <motion.p
        className="relative z-10 mt-6 font-mono text-xs uppercase tracking-[0.3em] text-emerald-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Selamat!
      </motion.p>
      <motion.h3
        className="relative z-10 mt-2 text-3xl md:text-5xl font-black tracking-tight"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 14 }}
      >
        Lolos <span className="text-[#fff0aa]">Berkas!</span>
      </motion.h3>

      {/* Divisi penerimaan — ditonjolkan */}
      {divisionLabel && (
        <motion.div
          className="relative z-10 mt-5 inline-flex flex-col items-center gap-1 px-6 py-3 rounded-2xl bg-emerald-400/15 border border-emerald-400/40"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 14 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300">
            {divisionLabel2 ? "Diterima di Dua Divisi" : "Diterima di Divisi"}
          </span>
          <span className="text-xl md:text-2xl font-black tracking-tight text-[#fff0aa]">
            {divisionLabel}
            {divisionLabel2 ? ` & ${divisionLabel2}` : ""}
          </span>
          {divisionLabel2 && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/80 mt-0.5">
              Prioritas utama: {divisionLabel}
            </span>
          )}
        </motion.div>
      )}

      <motion.p
        className="relative z-10 mt-5 text-white/70 leading-relaxed max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Selamat! Kamu lolos seleksi berkas dan lanjut ke{" "}
        <span className="text-[#fff0aa] font-semibold">tahap wawancara</span>. Ini belum hasil final —
        buka undangan di bawah untuk langkah berikutnya.
      </motion.p>

      <motion.div
        className="relative z-10 mt-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {invitationUrl ? (
          <a
            href={invitationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#fff0aa] text-[#012e21] text-sm font-bold uppercase tracking-widest hover:opacity-90 transition"
          >
            <FaEnvelopeOpenText /> Buka Undangan
          </a>
        ) : (
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Link undangan akan segera tersedia di sini.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ================= HASIL: BELUM LOLOS =================
function RejectedScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-8"
    >
      <motion.div
        className="mx-auto w-20 h-20 rounded-full bg-white/5 border border-white/15 text-white/60 flex items-center justify-center"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <FaRegHeart size={30} />
      </motion.div>
      <h3 className="mt-6 text-2xl md:text-3xl font-bold">Mohon maaf, belum berhasil.</h3>
      <p className="mt-4 text-white/60 leading-relaxed max-w-md mx-auto">
        Terima kasih sudah berproses bersama kami. Hasil ini bukan akhir — setiap langkahmu berharga.
        Teruslah bertumbuh, dan sampai jumpa di kesempatan berikutnya. 🤍
      </p>
    </motion.div>
  );
}

// ================= CONFETTI (framer-motion) =================
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => ({
        id: i,
        x: (Math.random() * 2 - 1) * 260,
        rotate: Math.random() * 720 - 360,
        delay: Math.random() * 0.35,
        duration: 1.6 + Math.random() * 1.3,
        color: ["#fff0aa", "#34d399", "#ffffff", "#fbbf24", "#6ee7b7"][i % 5],
        size: 6 + Math.random() * 8,
        rounded: Math.random() > 0.5,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 flex justify-center">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0"
          style={{
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: p.rounded ? "9999px" : "2px",
          }}
          initial={{ y: -10, x: 0, opacity: 0, scale: 0 }}
          animate={{ y: [-10, 360], x: [0, p.x], rotate: p.rotate, opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
