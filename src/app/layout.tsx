import type { Metadata } from "next";
import "./style/globals.css";
import NavbarWrapper from "@/app/components/NavbarWrapper";
import CustomScrollbar from "./components/CustomScrollbar";

// IMPORT KEDUANYA (Initial & Transition)
// import Preloader from "@/app/components/ui/Preloader";
// import PreloaderWrapper from "@/app/components/ui/PreloaderWrapper";

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
          {/* <Preloader /> */}
          {/* <PreloaderWrapper /> */}
          <CustomScrollbar />
          <div className="antialiased">
            <NavbarWrapper />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
