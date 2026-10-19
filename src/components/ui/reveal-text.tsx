"use client";

import { m } from "motion/react";
import type { CSSProperties } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  text: string;
  className?: string;
  /** Animate on first paint with CSS (hero) instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  /** Words (by index) to render in the muted tone. */
  mutedFrom?: number;
  /** Render a trailing accent full stop. */
  accentStop?: boolean;
};

const STAGGER = 0.045;

/** Word-by-word masked reveal. Screen readers get the plain string. */
export function RevealText({ text, className, immediate, delay = 0, mutedFrom, accentStop }: RevealTextProps) {
  const words = text.split(" ");

  const renderWord = (word: string, i: number) => {
    const isLast = i === words.length - 1;
    const content = (
      <>
        {accentStop && isLast ? (
          <>
            {word}
            <span className="text-accent">.</span>
          </>
        ) : (
          word
        )}
        {!isLast && " "}
      </>
    );
    const tone = mutedFrom !== undefined && i >= mutedFrom && "text-muted";

    return (
      <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
        {immediate ? (
          // CSS keyframes: visible as soon as the stylesheet paints, no JS required.
          <span className={cn("anim-rise inline-block", tone)} style={{ "--delay": `${delay + i * STAGGER}s` } as CSSProperties}>
            {content}
          </span>
        ) : (
          <m.span
            data-reveal
            className={cn("inline-block", tone)}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 0.7, ease: ease.out } },
            }}
          >
            {content}
          </m.span>
        )}
      </span>
    );
  };

  if (immediate) {
    return (
      <span className={cn("inline", className)}>
        <span className="sr-only">{text}</span>
        <span aria-hidden>{words.map(renderWord)}</span>
      </span>
    );
  }

  return (
    <m.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>{words.map(renderWord)}</span>
    </m.span>
  );
}
