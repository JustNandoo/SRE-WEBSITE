import type { Metadata } from "next";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionResetPassword from "@/app/layouts/auth/SectionResetPassword";

export const metadata: Metadata = {
  title: "Password Baru — Open Recruitment SRE PENS",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionResetPassword />
      </SmoothScrollProvider>
    </div>
  );
}
