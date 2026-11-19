import { Suspense } from "react";
import type { Metadata } from "next";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionRegister from "@/app/layouts/auth/SectionRegister";

export const metadata: Metadata = {
  title: "Buat Akun — Open Recruitment SRE PENS",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <Suspense fallback={null}>
          <SectionRegister />
        </Suspense>
      </SmoothScrollProvider>
    </div>
  );
}
