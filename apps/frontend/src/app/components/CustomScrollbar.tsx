"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CustomScrollbar = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    // Jangan jalankan logic ini di mobile
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const newProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;
      setProgress(Math.min(Math.max(newProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dicek setelah semua hook agar urutan hook tetap sama saat pindah dari/ke /admin-sre.
  if (pathname.startsWith("/admin-sre")) return null;

  // Class 'hidden lg:block' memastikan ini tidak dirender di mobile
  return (
    <div
      className="hidden lg:block fixed top-0 right-0 bottom-0 z-[9999] bg-[#1b1b1b] origin-top mix-blend-difference pointer-events-none"
      style={{
        transform: `scaleY(${progress})`,
        width: "3px",
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

export default CustomScrollbar;