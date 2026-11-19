"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import AuthShell, { AuthField, AuthNotice, AuthSubmitButton } from "@/app/components/auth/AuthShell";
import { signUpApplicant, resendApplicantConfirmation } from "@/services/api";

const MIN_PASSWORD_LENGTH = 8;

const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/admin-sre") ? value : "/pendaftaran";

export default function SectionRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setError("Lengkapi nama, email, dan password.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Format email tidak valid.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await signUpApplicant({ fullName, email, password, redirectPath: next });
    setLoading(false);

    if (signUpError || !data) {
      setError(signUpError);
      return;
    }

    if (data.needsEmailConfirmation) {
      setAwaitingConfirmation(true);
      setSuccess(`Akun dibuat. Kami mengirim tautan konfirmasi ke ${data.user.email}.`);
      return;
    }

    setSuccess("Akun dibuat. Mengalihkan ke formulir pendaftaran...");
    router.replace(next);
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
    setSuccess(`Email konfirmasi dikirim ulang ke ${email}.`);
  };

  if (awaitingConfirmation) {
    return (
      <AuthShell
        eyebrow="CHECK YOUR INBOX"
        title="VERIFY EMAIL."
        description="Buka email dari SRE PENS lalu klik tautan konfirmasi. Setelah itu kamu langsung diarahkan ke formulir pendaftaran."
        footerNote="OPEN RECRUITMENT PORTAL"
      >
        {error && <AuthNotice tone="error">{error}</AuthNotice>}
        {success && <AuthNotice tone="success">{success}</AuthNotice>}

        <div className="border border-white/15 bg-white/5 p-5 font-poppins text-xs text-white/70 leading-relaxed space-y-2">
          <p>Tidak menemukan emailnya? Periksa folder spam atau promosi.</p>
          <p>Tautan hanya berlaku untuk perangkat dan browser yang sama.</p>
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="w-full mt-8 border border-white/15 hover:border-[#fff0aa] text-white/80 hover:text-[#fff0aa] py-4 font-akira text-xs tracking-[0.2em] uppercase transition-all disabled:opacity-50"
        >
          {loading ? "MENGIRIM..." : "KIRIM ULANG EMAIL"}
        </button>

        <p className="mt-8 font-poppins text-xs text-white/60 tracking-wide text-center">
          Sudah konfirmasi?{" "}
          <Link href="/login" className="text-[#fff0aa] font-semibold underline underline-offset-4 hover:text-white transition-colors">
            Masuk sekarang
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="NEW APPLICANT"
      title="CREATE ACCOUNT."
      description="Buat akun untuk mengakses formulir pendaftaran Open Recruitment SRE PENS. Satu akun untuk satu pendaftar."
      footerNote="OPEN RECRUITMENT PORTAL"
    >
      {error && <AuthNotice tone="error">{error}</AuthNotice>}
      {success && <AuthNotice tone="success">{success}</AuthNotice>}

      <form onSubmit={handleRegister} className="space-y-6" noValidate>
        <AuthField
          id="full-name"
          label="NAMA LENGKAP"
          icon={<FaUser size={13} />}
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama sesuai KTM"
        />

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
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`Minimal ${MIN_PASSWORD_LENGTH} karakter`}
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

        <AuthField
          id="confirm-password"
          label="ULANGI PASSWORD"
          icon={<FaLock size={14} />}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••"
        />

        <AuthSubmitButton disabled={loading || success !== null}>
          {loading ? "MEMBUAT AKUN..." : success ? "BERHASIL" : "BUAT AKUN"}
        </AuthSubmitButton>
      </form>

      <p className="mt-8 font-poppins text-xs text-white/60 tracking-wide text-center">
        Sudah punya akun?{" "}
        <Link
          href={next === "/pendaftaran" ? "/login" : `/login?next=${encodeURIComponent(next)}`}
          className="text-[#fff0aa] font-semibold underline underline-offset-4 hover:text-white transition-colors"
        >
          Masuk
        </Link>
      </p>
    </AuthShell>
  );
}
