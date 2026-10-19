"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  return <m.div aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent" style={{ scaleX }} />;
}
