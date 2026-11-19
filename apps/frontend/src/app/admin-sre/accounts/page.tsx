"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaSearch,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

interface AccountType {
  id: string;
  email: string;
  role: string;
  created_at?: string;
}

// Password hanya disimpan sebagai hash di auth.users (lihat migrasi
// 20261118000000_secure_user_roles.sql), jadi tidak bisa ditampilkan lagi.
const MIN_PASSWORD_LENGTH = 8;

const AVAILABLE_ROLES = [
  { value: "super-admin", label: "Super Admin" },
  { value: "p-level", label: "Project Level (P-Level)" },
  { value: "secretary", label: "Secretary" },
  { value: "treasurer", label: "Treasurer" },
  { value: "education", label: "Education & Research" },
  { value: "content-marketing", label: "Content Marketing" },
  { value: "crd", label: "CRD / Competition & Research" },
  { value: "hr", label: "Human Resources" },
  { value: "pr", label: "Public Relations" },
  { value: "graphic-design", label: "Creative Design" },
  { value: "finance", label: "Finance & Merchandise" },
  { value: "staff-secretary", label: "Staff Secretary" },
  { value: "staff-treasurer", label: "Staff Treasurer" },
  { value: "staff-education", label: "Staff Education & Research" },
  { value: "staff-content-marketing", label: "Staff Content Marketing" },
  { value: "staff-crd", label: "Staff CRD" },
  { value: "staff-hr", label: "Staff Human Resources" },
  { value: "staff-pr", label: "Staff Public Relations" },
  { value: "staff-graphic-design", label: "Staff Creative Design" },
  { value: "staff-finance", label: "Staff Finance & Merchandise" }
];

interface ToastType {
  id: string;
  type: "success" | "error";
  text: string;
}

export default function ManageAccountsPage() {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountType | null>(null);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff-pr");

  // Premium Custom Toast Notifications
  const [toasts, setToasts] = useState<ToastType[]>([]);

  // Confirmation Modals State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<AccountType | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewingAccount, setViewingAccount] = useState<AccountType | null>(null);

  const supabase = createClient();

  const addToast = (type: "success" | "error", text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("user_roles").select("role").eq("id", user.id).single();
      if (data) {
        setUserRole(data.role);
      }
    }
  };

  const fetchAccounts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select("id, email, role, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      addToast("error", error.message);
    } else if (data) {
      setAccounts(data as AccountType[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (userRole === "super-admin" || userRole === "p-level") {
      fetchAccounts();
    }
  }, [userRole]);

  const openNewModal = () => {
    setEditingAccount(null);
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setRole("staff-pr");
    setIsModalOpen(true);
  };

  const openEditModal = (account: AccountType) => {
    setEditingAccount(account);
    setEmail(account.email);
    setPassword(""); // kosong = password tidak diganti
    setShowPassword(false);
    setRole(account.role);
    setIsModalOpen(true);
  };

  // Open delete confirm modal
  const confirmDelete = (account: AccountType) => {
    if (userRole !== "super-admin") {
      addToast("error", "Hanya Super Admin yang berwenang menghapus akun.");
      return;
    }
    if (account.role === "super-admin") {
      addToast("error", "Untuk keamanan, akun Super Admin tidak dapat dihapus.");
      return;
    }
    setAccountToDelete(account);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!accountToDelete) return;
    setShowDeleteConfirm(false);
    setLoading(true);

    const { data, error } = await supabase.rpc("manage_cms_user", {
      action_type: "DELETE",
      user_id: accountToDelete.id,
      user_email: accountToDelete.email,
      user_password: "",
      user_role: accountToDelete.role
    });

    if (error) {
      addToast("error", error.message);
      setLoading(false);
    } else {
      addToast("success", `Akun ${accountToDelete.email} berhasil dihapus.`);
      fetchAccounts();
    }
    setAccountToDelete(null);
  };

  // Open save confirm modal
  const handleFormSubmitAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== "super-admin") {
      addToast("error", "Hanya Super Admin yang berwenang menambah atau memperbarui akun.");
      return;
    }
    const passwordRequired = !editingAccount;
    if ((passwordRequired || password) && password.length < MIN_PASSWORD_LENGTH) {
      addToast("error", `Password minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }
    setShowSaveConfirm(true);
  };

  const handleFormSubmitConfirmed = async () => {
    setShowSaveConfirm(false);
    setSaving(true);

    try {
      if (editingAccount) {
        // UPDATE ACTION
        const { data, error } = await supabase.rpc("manage_cms_user", {
          action_type: "UPDATE",
          user_id: editingAccount.id,
          user_email: email,
          user_password: password,
          user_role: role
        });

        if (error) {
          addToast("error", error.message);
        } else {
          addToast("success", `Akun ${email} berhasil diperbarui.`);
          setIsModalOpen(false);
          fetchAccounts();
        }
      } else {
        // CREATE ACTION
        const newUserId = crypto.randomUUID();
        const { data, error } = await supabase.rpc("manage_cms_user", {
          action_type: "CREATE",
          user_id: newUserId,
          user_email: email,
          user_password: password,
          user_role: role
        });

        if (error) {
          addToast("error", error.message);
        } else {
          addToast("success", `Akun ${email} berhasil dibuat.`);
          setIsModalOpen(false);
          fetchAccounts();
        }
      }
    } catch (err: any) {
      addToast("error", err.message || "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleViewDetail = (account: AccountType) => {
    setViewingAccount(account);
    setShowDetailModal(true);
  };

  const filteredAccounts = accounts.filter((acc) => {
    const searchVal = search.toLowerCase();
    return (
      acc.email.toLowerCase().includes(searchVal) ||
      acc.role.toLowerCase().includes(searchVal)
    );
  });

  const isAllowedToAccess = userRole === "super-admin" || userRole === "p-level";

  if (loading && !userRole) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-white/50 font-poppins">
        <FaSpinner className="animate-spin text-[#fff0aa] mb-4" size={32} />
        <span>Authenticating admin credentials...</span>
      </div>
    );
  }

  if (userRole && !isAllowedToAccess) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 font-poppins text-white">
        <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center rounded-full">
          <FaLock size={24} />
        </div>
        <h2 className="font-akira text-lg text-red-400 uppercase tracking-wider">Access Denied</h2>
        <p className="text-sm text-white/70 leading-relaxed font-light">
          Akun Anda dengan role (<strong className="text-[#fff0aa]">{userRole}</strong>) tidak diizinkan mengakses panel manajemen akun ini. Hanya peran <strong className="text-white">super-admin</strong> dan <strong className="text-white">p-level</strong> yang berhak melakukan tindakan manajemen kredensial.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${poppins.variable} ${akira.variable} font-sans text-white relative`}>
      {/* Toast CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes toast-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes toast-slide-in {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-toast-in {
          animation: toast-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-toast-progress {
          animation: toast-shrink 4000ms linear forwards;
        }
      `}} />

      {/* Premium Toast Container (Top Right) */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-80 sm:w-96 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#012e21] border border-white/15 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#fff0aa]/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-akira text-2xl sm:text-3xl uppercase tracking-tighter text-white mb-2">CMS ACCOUNTS MANAGEMENT</h1>
          <p className="text-xs sm:text-sm font-poppins font-light text-white/70">Kelola kredensial login, peran (role), dan sandi dari seluruh akun staff, koordinator, p-level, dan administrator SRE PENS.</p>
        </div>
        {userRole === "super-admin" && (
          <button
            onClick={openNewModal}
            className="relative z-10 flex items-center gap-3 px-7 py-4 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold font-poppins font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <FaPlus size={14} /> BUAT AKUN BARU
          </button>
        )}
      </div>

      {/* Info Alert */}
      <div className="p-4 border border-[#fff0aa]/20 bg-[#fff0aa]/5 font-poppins text-xs text-[#fff0aa]/90 flex items-start gap-3">
        <FaUserShield size={16} className="mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold uppercase tracking-wider text-[10px] mb-1">Pemberitahuan Sistem Keamanan & Hak Akses</p>
          <p className="font-light leading-relaxed">
            {userRole === "super-admin" 
              ? "Anda memiliki wewenang penuh (Super Admin) untuk membuat, mengubah, menghapus akun, dan mengatur ulang password. Password disimpan terenkripsi sehingga tidak dapat ditampilkan; untuk akun yang lupa password, buat password baru lewat tombol ubah."
              : "Anda memiliki hak akses terbatas (P-Level). Halaman ini bersifat Read-Only untuk Anda. Anda hanya diizinkan melihat daftar akun yang terdaftar tanpa hak mengubah data."}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari akun berdasarkan email atau role..."
          className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none font-poppins text-xs sm:text-sm tracking-wide transition-all"
        />
      </div>

      {/* Accounts List Table */}
      <div className="bg-[#011f16] border border-white/10 p-6 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-white/40 font-poppins text-xs">
            <FaSpinner className="animate-spin text-[#fff0aa] mr-3" /> Memuat daftar akun...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-poppins text-xs sm:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[#fff0aa] uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-4 font-semibold">Email Pengguna</th>
                  <th className="py-4 px-4 font-semibold">Peran (Role)</th>
                  <th className="py-4 px-4 font-semibold text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAccounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-medium text-white/80">{acc.email}</td>
                    <td className="py-4 px-4 font-medium">
                      <span className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase border ${
                        acc.role === "super-admin"
                          ? "bg-amber-950/30 border-amber-500/40 text-amber-300"
                          : acc.role === "p-level"
                          ? "bg-rose-950/30 border-rose-500/40 text-rose-300"
                          : acc.role.startsWith("staff-")
                          ? "bg-blue-950/30 border-blue-500/40 text-blue-300"
                          : "bg-teal-950/30 border-teal-500/40 text-teal-300"
                      }`}>
                        {acc.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleViewDetail(acc)}
                        className="p-2 bg-white/5 hover:bg-[#fff0aa] hover:text-[#011f16] border border-white/10 transition-all text-white"
                        title="Detail Akun"
                      >
                        <FaInfoCircle size={12} />
                      </button>
                      {userRole === "super-admin" && (
                        <>
                          <button
                            onClick={() => openEditModal(acc)}
                            className="p-2 bg-white/5 hover:bg-[#fff0aa] hover:text-[#011f16] border border-white/10 transition-all text-white"
                            title="Ubah Data Akun"
                          >
                            <FaEdit size={12} />
                          </button>
                          {acc.role !== "super-admin" && (
                            <button
                              onClick={() => confirmDelete(acc)}
                              className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all text-red-300"
                              title="Hapus Akun"
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredAccounts.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-white/40">Data akun tidak ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Account Management Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#012e21] border border-[#fff0aa]/20 w-full max-w-lg p-8 relative shadow-2xl animate-toast-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white/50 hover:text-white p-2"
            >
              <FaTimes size={18} />
            </button>
            <h3 className="font-akira text-sm uppercase tracking-wider text-[#fff0aa] mb-6">
              {editingAccount ? "Edit Akun Kredensial" : "Registrasi Akun Baru"}
            </h3>
            <form onSubmit={handleFormSubmitAttempt} className="space-y-5 font-poppins text-sm">
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold text-xs tracking-wider uppercase">Email Akun</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@sre-pens.com"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white focus:outline-none transition-all rounded-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold text-xs tracking-wider uppercase">
                  {editingAccount ? "Password Baru" : "Sandi Akses (Password)"}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={editingAccount ? "Kosongkan jika tidak diganti" : `Minimal ${MIN_PASSWORD_LENGTH} karakter`}
                    autoComplete="new-password"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 pl-4 pr-12 text-white focus:outline-none transition-all rounded-none font-mono"
                    required={!editingAccount}
                    minLength={MIN_PASSWORD_LENGTH}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                {editingAccount && (
                  <span className="text-[11px] text-white/40">Password lama tidak dapat ditampilkan karena tersimpan terenkripsi.</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-semibold text-xs tracking-wider uppercase">Peran / Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#fff0aa] py-3.5 px-4 text-white focus:outline-none transition-all rounded-none"
                  required
                >
                  {AVAILABLE_ROLES.map((roleOpt) => (
                    <option key={roleOpt.value} value={roleOpt.value} className="bg-[#012e21] text-white">
                      {roleOpt.label} ({roleOpt.value})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold uppercase tracking-wider disabled:opacity-50 transition-all"
                >
                  {saving ? "Menyimpan..." : "Simpan Akun"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && accountToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#012e21] border border-red-500/30 w-full max-w-md p-8 shadow-2xl relative animate-toast-in font-poppins">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-400" size={20} />
              </div>
            </div>
            <h3 className="font-akira text-center text-sm text-white uppercase tracking-wider mb-2">Konfirmasi Hapus</h3>
            <p className="text-xs text-white/70 text-center leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus akun <span className="text-[#fff0aa] font-semibold">{accountToDelete.email}</span>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAccountToDelete(null);
                }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save/Update Confirmation Modal */}
      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#012e21] border border-[#fff0aa]/30 w-full max-w-md p-8 shadow-2xl relative animate-toast-in font-poppins">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-950/40 border border-teal-500/40 flex items-center justify-center">
                <FaExclamationCircle className="text-teal-400" size={20} />
              </div>
            </div>
            <h3 className="font-akira text-center text-sm text-white uppercase tracking-wider mb-2">Konfirmasi Simpan</h3>
            <p className="text-xs text-white/70 text-center leading-relaxed mb-6">
              Apakah Anda yakin data akun yang dimasukkan sudah benar?
              <br />
              <span className="text-white/50">Email:</span> <span className="text-[#fff0aa] font-semibold">{email}</span>
              <br />
              <span className="text-white/50">Role:</span> <span className="text-[#fff0aa] font-semibold">{role}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveConfirm(false)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleFormSubmitConfirmed}
                className="flex-1 py-3 bg-[#fff0aa] hover:bg-white text-[#012e21] font-bold text-xs tracking-wider uppercase transition-all"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Account Modal */}
      {showDetailModal && viewingAccount && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#012e21] border border-white/15 w-full max-w-md p-8 shadow-2xl relative animate-toast-in font-poppins">
            <button
              onClick={() => {
                setShowDetailModal(false);
                setViewingAccount(null);
              }}
              className="absolute right-4 top-4 text-white/50 hover:text-white p-2"
            >
              <FaTimes size={18} />
            </button>
            <h3 className="font-akira text-xs uppercase tracking-wider text-[#fff0aa] mb-6">Detail Informasi Akun</h3>
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-white/40 block uppercase tracking-wider text-[9px] mb-1">ID Pengguna (UUID)</span>
                <span className="font-mono text-white/90 select-all block break-all">{viewingAccount.id}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-white/40 block uppercase tracking-wider text-[9px] mb-1">Email Kredensial</span>
                <span className="text-white/90 block font-semibold">{viewingAccount.email}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-white/40 block uppercase tracking-wider text-[9px] mb-1">Peran / Role</span>
                <span className="text-white/90 block font-semibold uppercase">{viewingAccount.role}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setViewingAccount(null);
                }}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Toast Item Component for Self-Dismissal & Animation
function ToastItem({ toast, onClose }: { toast: ToastType; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`relative flex items-center justify-between p-4 border shadow-2xl font-poppins text-xs pointer-events-auto overflow-hidden animate-toast-in ${
      toast.type === "success" 
        ? "bg-emerald-950/95 border-emerald-500/40 text-emerald-300" 
        : "bg-red-950/95 border-red-500/40 text-red-300"
    }`}>
      <div className="flex items-center gap-3">
        {toast.type === "success" 
          ? <FaCheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
          : <FaExclamationCircle size={16} className="text-red-400 flex-shrink-0" />
        }
        <span className="font-medium tracking-wide leading-relaxed">{toast.text}</span>
      </div>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 p-1 flex-shrink-0 ml-3">
        <FaTimes size={12} />
      </button>
      
      {/* Toast Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 animate-toast-progress ${
          toast.type === "success" ? "bg-emerald-400" : "bg-red-400"
        }`}
        style={{ width: "100%" }}
      />
    </div>
  );
}
