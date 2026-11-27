"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import AuthShell, { AuthField, AuthNotice, AuthSubmitButton } from "@/app/components/auth/AuthShell";
import { requestPasswordReset } from "@/services/api";

export default function SectionForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Masukkan email akun pendaftarmu.");
      return;
    }
    setLoading(true);
    const { error: resetError } = await requestPasswordReset(email);
    setLoading(false);
    if (resetError) {
      setError(resetError);
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      eyebrow="RESET PASSWORD"
      title="LUPA PASSWORD?"
      description="Masukkan email akun pendaftarmu. Kami kirim tautan untuk mengatur ulang password-mu."
      footerNote="OPEN RECRUITMENT PORTAL"
    >
      {sent ? (
        <div className="space-y-6">
          <AuthNotice tone="success">
            Jika <b>{email}</b> terdaftar, tautan reset sudah dikirim. Cek <b>inbox</b> (dan folder{" "}
            <b>spam</b>) email tersebut, lalu buka tautannya untuk membuat password baru.
          </AuthNotice>
          <p className="font-poppins text-xs text-white/60 tracking-wide text-center">
            <Link
              href="/login"
              className="text-[#fff0aa] font-semibold underline underline-offset-4 hover:text-white transition-colors"
            >
              Kembali ke halaman masuk
            </Link>
          </p>
        </div>
      ) : (
        <>
          {error && <AuthNotice tone="error">{error}</AuthNotice>}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <AuthField
              id="email"
              label="EMAIL"
              icon={<FaEnvelope size={14} />}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@student.pens.ac.id"
            />
            <AuthSubmitButton disabled={loading}>
              {loading ? "MENGIRIM..." : "KIRIM TAUTAN RESET"}
            </AuthSubmitButton>
          </form>
          <p className="mt-8 font-poppins text-xs text-white/60 tracking-wide text-center">
            Ingat password-mu?{" "}
            <Link
              href="/login"
              className="text-[#fff0aa] font-semibold underline underline-offset-4 hover:text-white transition-colors"
            >
              Masuk
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
