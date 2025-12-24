"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useEffect, useState, ElementType } from "react";

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

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024); // lg+
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) {
    return <Component className={motionProps.className}>{children}</Component>;
  }

  const MotionComponent = motion(Component as any);
  return <MotionComponent {...motionProps}>{children}</MotionComponent>;
}
