"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { useEffect } from "react";
import { transition } from "@/lib/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Turns off the CSS reveal failsafe (globals.css) once Motion is in control.
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={transition.slow}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
