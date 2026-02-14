"use client";

import { useEffect, useState } from "react";

const CustomScrollbar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fungsi untuk menghitung progress scroll (0.0 sampai 1.0)
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      // Mencegah pembagian dengan nol
      const newProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;
      
      // Batasi nilai antara 0 dan 1
      setProgress(Math.min(Math.max(newProgress, 0), 1));
    };

    // Fungsi untuk cek apakah konten cukup panjang untuk di-scroll
    const updateScrollVisibility = () => {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    handleScroll();
    updateScrollVisibility();

    // Event Listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateScrollVisibility);

    // Observer untuk mendeteksi perubahan konten dinamis (sama seperti kode awal)
    const observer = new MutationObserver(() => {
      updateScrollVisibility();
      handleScroll(); // Recalculate progress jika tinggi halaman berubah
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollVisibility);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 right-0 bottom-0 z-[9999] bg-[#1b1b1b] origin-top mix-blend-difference pointer-events-none"
      style={{
        transform: `scaleY(${progress})`,
        width: "3px", // Ketebalan scrollbar
        // Transisi CSS untuk menggantikan efek 'spring' agar tetap smooth
        transition: "transform 0.1s ease-out" 
      }}
    />
  );
};

export default CustomScrollbar;