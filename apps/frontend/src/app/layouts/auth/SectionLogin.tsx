"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthShell, { AuthField, AuthNotice, AuthSubmitButton } from "@/app/components/auth/AuthShell";
import { signInApplicant, resendApplicantConfirmation, fetchIsCmsUser } from "@/services/api";

const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/admin-sre") ? value : "/pendaftaran";

export default function SectionLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "confirmation"
      ? "Tautan konfirmasi tidak valid atau sudah kedaluwarsa. Silakan masuk atau kirim ulang email konfirmasi."
      : null
  );
  const [success, setSuccess] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCanResend(false);

    if (!email || !password) {
      setError("Isi email dan password terlebih dahulu.");
      return;
    }

    setLoading(true);
    const { data, error: loginError } = await signInApplicant(email, password);
    setLoading(false);

    if (loginError || !data) {
      setError(loginError);
      setCanResend(loginError?.startsWith("Email belum dikonfirmasi") ?? false);
      return;
    }

    // Akun staf CMS (punya baris di user_roles) diarahkan ke dashboard admin,
    // bukan ke alur pendaftar.
    const isCms = await fetchIsCmsUser(data.id);
    setSuccess("Berhasil masuk. Mengalihkan...");
    router.replace(isCms ? "/admin-sre" : next);
    router.refresh();
  };

  const handleResend = async () => {
    setLoading(true);
    const { error: resendError } = await resendApplicantConfirmation(email);
    setLoading(false);
    if (resendError) {
      setError(resendError);
      return;
    }
    setError(null);
    setCanResend(false);
    setSuccess(`Email konfirmasi dikirim ulang ke ${email}.`);
  };

  return (
    <AuthShell
      eyebrow="APPLICANT ACCESS"
      title="SIGN IN."
      description="Masuk dengan akun pendaftarmu untuk mengisi atau melihat status formulir Open Recruitment SRE PENS."
      footerNote="OPEN RECRUITMENT PORTAL"
    >
      {error && <AuthNotice tone="error">{error}</AuthNotice>}
      {success && <AuthNotice tone="success">{success}</AuthNotice>}

      <form onSubmit={handleLogin} className="space-y-6" noValidate>
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

        <AuthField
          id="password"
          label="PASSWORD"
          icon={<FaLock size={14} />}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          }
        />

        {canResend && (
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="font-poppins text-xs text-white/60 hover:text-[#fff0aa] tracking-wide underline underline-offset-4 transition-colors font-medium disabled:opacity-50"
          >
            Kirim ulang email konfirmasi
          </button>
        )}

        <AuthSubmitButton disabled={loading || success !== null}>
          {loading ? "MEMERIKSA..." : success ? "BERHASIL" : "MASUK"}
        </AuthSubmitButton>
      </form>

      <p className="mt-8 font-poppins text-xs text-white/60 tracking-wide text-center">
        Belum punya akun?{" "}
        <Link
          href={next === "/pendaftaran" ? "/register" : `/register?next=${encodeURIComponent(next)}`}
          className="text-[#fff0aa] font-semibold underline underline-offset-4 hover:text-white transition-colors"
        >
          Buat akun pendaftar
        </Link>
      </p>
    </AuthShell>
  );
}
