import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SRE PENS CMS - Admin Dashboard",
  description: "Administrative Content Management System for SRE PENS",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminSidebar>{children}</AdminSidebar>;
}
