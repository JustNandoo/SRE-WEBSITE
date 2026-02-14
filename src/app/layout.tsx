import type { Metadata } from "next";
import "./style/globals.css";
import NavbarWrapper from "./components/NavbarWrapper"; // Sesuaikan import jika nama file Navbar.tsx
import CustomScrollbar from "@/app/components/CustomScrollbar";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "SRE PENS",
  description: "Society of Renewable Energy, Electronic Engineering Polytechnic Institute of Surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#012e21]">
        <SmoothScrollProvider>
          <CustomScrollbar />
          <NavbarWrapper />
          <main className="relative z-0">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}