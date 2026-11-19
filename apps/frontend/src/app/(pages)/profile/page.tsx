import type { Metadata } from "next";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionProfile from "@/app/layouts/profile/SectionProfile";

export const metadata: Metadata = {
  title: "Profil — Open Recruitment SRE PENS",
  robots: "noindex, nofollow",
};

// Akses dijaga oleh middleware (src/lib/supabase/middleware.ts): wajib login.
export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionProfile />
      </SmoothScrollProvider>
    </div>
  );
}
