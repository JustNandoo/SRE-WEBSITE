"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useEffect, useMemo, useState, ElementType } from "react";

interface MotionSwitchProps extends HTMLMotionProps<any> {
  as?: ElementType;
  children: React.ReactNode;
}

export default function MotionSwitch({
  as: Component = "div",
  children,
  ...motionProps
}: MotionSwitchProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  // Dibuat sekali per `Component`. Kalau dibuat di dalam render, tiap re-render
  // menghasilkan tipe komponen baru -> React me-mount ulang seluruh isinya
  // (form berkedip/menghilang saat diklik).
  const MotionComponent = useMemo(() => motion(Component as any), [Component]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024); // lg+
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) {
    return <Component className={motionProps.className}>{children}</Component>;
  }

  return <MotionComponent {...motionProps}>{children}</MotionComponent>;
}
