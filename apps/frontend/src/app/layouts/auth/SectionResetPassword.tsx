"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthShell, { AuthField, AuthNotice, AuthSubmitButton } from "@/app/components/auth/AuthShell";
import { createClient } from "@/lib/supabase/client";
import { updateApplicantPassword } from "@/services/api";

export default function SectionResetPassword() {
  const router = useRouter();
  // null = masih cek sesi; true = ada sesi recovery; false = tidak ada (tautan invalid).
  const [ready, setReady] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setReady((prev) => (prev === true ? prev : !!data.session));
    });
    // Tautan reset men-set sesi recovery; event ini menandainya siap.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });
    // Jaring pengaman: jika dalam 6 dtk belum ada sesi, anggap tautan tidak valid.
    const timer = window.setTimeout(() => setReady((prev) => (prev === null ? false : prev)), 6000);
    return () => {
      window.clearTimeout(timer);
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setLoading(true);
    const { error: updErr } = await updateApplicantPassword(password);
    setLoading(false);
    if (updErr) {
      setError(updErr);
      return;
    }
    setDone(true);
    window.setTimeout(() => {
      router.replace("/login");
      router.refresh();
    }, 2000);
  };

  const toggle = (
    <button
      type="button"
      onClick={() => setShow((v) => !v)}
      aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
    >
      {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
    </button>
  );

  return (
    <AuthShell
      eyebrow="RESET PASSWORD"
      title="PASSWORD BARU."
      description="Buat password baru untuk akun pendaftar SRE PENS-mu."
      footerNote="OPEN RECRUITMENT PORTAL"
    >
      {ready === false ? (
        <AuthNotice tone="error">
          Tautan reset tidak valid atau sudah kedaluwarsa. Minta tautan baru di halaman{" "}
          <Link href="/lupa-password" className="underline underline-offset-4 font-semibold">
            Lupa Password
          </Link>
          .
        </AuthNotice>
      ) : done ? (
        <AuthNotice tone="success">Password berhasil diubah. Mengalihkan ke halaman masuk...</AuthNotice>
      ) : (
        <>
          {error && <AuthNotice tone="error">{error}</AuthNotice>}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <AuthField
              id="password"
              label="PASSWORD BARU"
              icon={<FaLock size={14} />}
              type={show ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              trailing={toggle}
            />
            <AuthField
              id="confirm"
              label="ULANGI PASSWORD BARU"
              icon={<FaLock size={14} />}
              type={show ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Ulangi password baru"
            />
            <AuthSubmitButton disabled={loading || ready === null}>
              {loading ? "MENYIMPAN..." : ready === null ? "MEMERIKSA TAUTAN..." : "SIMPAN PASSWORD"}
            </AuthSubmitButton>
          </form>
        </>
      )}
    </AuthShell>
  );
}
