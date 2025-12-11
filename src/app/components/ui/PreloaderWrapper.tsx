"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SubPreloader from "./SubPreloader";

export default function PreloaderWrapper() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const excludedRoutes = ["/login", "/dashboard"];
    const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

    if (!isExcluded) {
      setIsActive(true);

      // TIME ADJUSTMENT:
      // Animasi Masuk: 1.2s
      // Baca Teks: 0.5s
      // Animasi Keluar: 1.2s
      // Total aman: 2500ms - 3000ms
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 2500); // Diperlama jadi 2.5 detik agar animasi selesai sempurna

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <SubPreloader isActive={isActive} />;
}