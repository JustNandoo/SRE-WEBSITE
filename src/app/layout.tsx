import type { Metadata } from "next";
import "./style/globals.css";
import NavbarWrapper from "@/app/components/NavbarWrapper";

export const metadata: Metadata = {
  title: "SRE PENS",
  description:
    "Society of Renewable Energy, Electronic Engineering Polytechnic Institute of Surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="antialiased">
          <div className="antialiased">
            <NavbarWrapper />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
