import { NextRequest, NextResponse } from "next/server";
import { divisionLabel } from "@/lib/registrationData";

// Selalu ambil data terbaru (jangan di-cache oleh Next).
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Row = {
  nama: string;
  email: string;
  nrp: string;
  prodi: string;
  divisi_1: string;
  divisi_2: string;
  status: string;
  portofolio: string;
  twibbon: string;
  dikirim: string | null;
};

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  // Bungkus dengan kutip bila mengandung koma / kutip / newline (format CSV).
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/**
 * GET /api/pendaftar-sheet?token=XXXX
 *
 * Mengembalikan seluruh data pendaftar sebagai CSV, HANYA bila token cocok
 * (divalidasi oleh fungsi SQL export_registrations). Dipakai Google Sheets
 * via =IMPORTDATA("...") sehingga sheet ter-update otomatis (live), bukan
 * export manual.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return new NextResponse("Server belum dikonfigurasi.", { status: 500 });
  }

  let rows: Row[];
  try {
    const res = await fetch(`${url}/rest/v1/rpc/export_registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ p_token: token }),
      cache: "no-store",
    });
    if (!res.ok) {
      // Token salah / fungsi belum ada -> 401 agar jelas di Google Sheets.
      return new NextResponse("Token tidak valid atau akses ditolak.", { status: 401 });
    }
    rows = (await res.json()) as Row[];
  } catch {
    return new NextResponse("Gagal mengambil data.", { status: 502 });
  }

  const header = [
    "Nama",
    "Email",
    "NRP",
    "Prodi",
    "Divisi 1",
    "Divisi 2",
    "Status",
    "Portofolio",
    "Bukti Twibbon",
    "Dikirim",
  ];

  const lines = [header.map(csvCell).join(",")];
  for (const r of rows ?? []) {
    lines.push(
      [
        r.nama,
        r.email,
        r.nrp,
        r.prodi,
        r.divisi_1 ? divisionLabel(r.divisi_1) : "",
        r.divisi_2 ? divisionLabel(r.divisi_2) : "",
        r.status,
        r.portofolio,
        r.twibbon,
        formatDate(r.dikirim),
      ]
        .map(csvCell)
        .join(",")
    );
  }

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
