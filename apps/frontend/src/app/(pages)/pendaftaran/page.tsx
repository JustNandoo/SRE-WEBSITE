import type { Metadata } from "next";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import Contact from "@/app/layouts/SectionContact";
import SectionHome from "@/app/layouts/pendaftaran/SectionHome";

export const metadata: Metadata = {
  title: "Pendaftaran — Open Recruitment SRE PENS",
  robots: "noindex, nofollow",
};

// Akses dijaga oleh middleware (src/lib/supabase/middleware.ts): wajib login.
export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionHome />
        <Contact />
      </SmoothScrollProvider>
    </div>
  );
}
