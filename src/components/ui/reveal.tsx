"use client";

import { m } from "motion/react";
import type { CSSProperties } from "react";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "p";
  /**
   * Above-the-fold content: animate with CSS on first paint instead of
   * waiting for hydration, so it is never hidden while JS loads.
   */
  immediate?: boolean;
};

/** Fades content up once as it enters the viewport. */
export function Reveal({ children, className, delay = 0, as = "div", immediate }: RevealProps) {
  if (immediate) {
    const Tag = as;
    return (
      <Tag className={cn("anim-fade-up", className)} style={{ "--delay": `${delay}s` } as CSSProperties}>
        {children}
      </Tag>
    );
  }

  const Component = m[as];
  return (
    <Component
      data-reveal
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/** Staggers direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  step = 0.05,
  delay = 0,
  as = "div",
}: Omit<RevealProps, "immediate"> & { step?: number }) {
  const Component = m[as === "li" ? "ul" : as];
  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger(step, delay)}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay" | "immediate">) {
  const Component = m[as];
  return (
    <Component data-reveal className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
