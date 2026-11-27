import type { Metadata } from "next";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionForgotPassword from "@/app/layouts/auth/SectionForgotPassword";

export const metadata: Metadata = {
  title: "Lupa Password — Open Recruitment SRE PENS",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionForgotPassword />
      </SmoothScrollProvider>
    </div>
  );
}
