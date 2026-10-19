"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * Tracks whether an element is on screen so CSS-driven ambient animation
 * (diagram signals, hero comets) only runs while visible.
 */
export function useLive<T extends Element = HTMLDivElement>(amount = 0.25) {
  const ref = useRef<T>(null);
  const live = useInView(ref, { amount });
  return [ref, live] as const;
}
