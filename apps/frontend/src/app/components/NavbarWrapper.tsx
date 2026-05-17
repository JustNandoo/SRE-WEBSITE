"use client";

import { usePathname } from "next/navigation";
import Navbar from "../layouts/Navbar"; // Sesuaikan dengan path

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname === "/dashboard";

  if (hideNavbar) return null;

  return <Navbar />;
}
