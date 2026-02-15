import type { Metadata } from "next";
import "./style/globals.css";
import NavbarWrapper from "./components/NavbarWrapper"; // Sesuaikan import jika nama file Navbar.tsx
import CustomScrollbar from "@/app/components/CustomScrollbar";
import "locomotive-scroll/dist/locomotive-scroll.css";

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
          <CustomScrollbar />
          <NavbarWrapper />
          <main className="relative z-0">
            {children}
          </main>
      </body>
    </html>
  );
}