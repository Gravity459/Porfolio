import type { Transition, Variants } from "motion/react";

/** Shared easing + timing. Keep every animation on these tokens. */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  reveal: 0.5,
} as const;

export const transition = {
  base: { duration: duration.base, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.out },
  reveal: { duration: duration.reveal, ease: ease.out },
  layout: { type: "spring", stiffness: 380, damping: 40, mass: 0.9 },
  /** Card → modal morph. A tween, so it lands on time instead of a long spring tail. */
  morph: { duration: 0.42, ease: ease.out },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: transition.reveal },
};

export const stagger = (step = 0.05, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});
