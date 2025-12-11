"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomScrollbar = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Settingan physics: Sedikit lebih 'kaku' (stiffness tinggi)
  // supaya responsif tapi tetap ada smooth-nya sedikit.
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateScrollVisibility = () => {
      // Logic sama: sembunyikan jika konten pendek
      if (document.documentElement.scrollHeight > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    updateScrollVisibility();
    window.addEventListener("resize", updateScrollVisibility);
    // Observer untuk mendeteksi perubahan konten dinamis
    const observer = new MutationObserver(updateScrollVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", updateScrollVisibility);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-9999 bg-[#1b1b1b] origin-top mix-blend-difference pointer-events-none"
      style={{
        scaleY,
        width: "3px", // Atur ketebalan di sini (2px - 4px ideal)
      }}
    />
  );
};

export default CustomScrollbar;