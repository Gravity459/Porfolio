"use client";

import { useLive } from "@/hooks/use-live";
import { cn } from "@/lib/utils";

type DiagramFrameProps = {
  children: React.ReactNode;
  label: string;
  caption?: string;
  className?: string;
  /** Force ambient signals on (e.g. while the card is hovered). */
  active?: boolean;
};

/**
 * Bordered "figure" that hosts a diagram. It is a size container, so diagrams
 * adapt to the space they are given rather than the viewport.
 */
export function DiagramFrame({ children, label, caption, className, active }: DiagramFrameProps) {
  const [ref, inView] = useLive<HTMLElement>(0.35);

  return (
    <figure
      ref={ref}
      data-live={inView || active ? "true" : "false"}
      className={cn("@container relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface/50", className)}
    >
      <div
        aria-hidden
        className="texture-grid-fine pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]"
      />
      {caption ? (
        <figcaption className="meta absolute left-4 top-3.5 z-10 flex items-center gap-2 text-faint">
          <span aria-hidden className="size-1 rounded-full bg-accent" />
          {caption}
        </figcaption>
      ) : null}
      <div role="img" aria-label={label} className="relative flex w-full flex-1 items-center px-4 pb-6 pt-12 @md:px-8 @md:pb-8 @md:pt-14">
        <div className="w-full">{children}</div>
      </div>
    </figure>
  );
}
