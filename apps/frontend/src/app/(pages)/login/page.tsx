import { Suspense } from "react";
import type { Metadata } from "next";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionLogin from "@/app/layouts/auth/SectionLogin";

export const metadata: Metadata = {
  title: "Masuk — Open Recruitment SRE PENS",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <Suspense fallback={null}>
          <SectionLogin />
        </Suspense>
      </SmoothScrollProvider>
    </div>
  );
}
