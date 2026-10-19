"use client";

import type { CSSProperties } from "react";
import { useLive } from "@/hooks/use-live";
import { cn } from "@/lib/utils";

type Node = { id: string; x: number; y: number; label: string; accent?: boolean };

const nodes: Node[] = [
  { id: "client", x: 40, y: 120, label: "client" },
  { id: "edge", x: 180, y: 120, label: "edge" },
  { id: "api", x: 320, y: 120, label: "api" },
  { id: "llm", x: 600, y: 120, label: "llm", accent: true },
  { id: "db", x: 180, y: 260, label: "db" },
  { id: "queue", x: 320, y: 260, label: "queue" },
  { id: "worker", x: 460, y: 260, label: "worker" },
  { id: "stt", x: 600, y: 260, label: "stt" },
  { id: "store", x: 40, y: 400, label: "s3" },
  { id: "cache", x: 180, y: 400, label: "cache" },
  { id: "embed", x: 320, y: 400, label: "embed" },
  { id: "vector", x: 460, y: 400, label: "vector" },
  { id: "tts", x: 600, y: 400, label: "tts" },
];

const edges = [
  "M40 120 H600",
  "M320 120 V260 H600",
  "M460 260 H540 V120",
  "M460 260 V400",
  "M320 400 H460",
  "M320 120 V190 H180 V400 H40",
  "M600 260 V400",
];

/** Signals travel along these routes, staggered so at most one or two are visible. */
const comets = [
  { d: "M40 120 H600", duration: 8, delay: 0.6 },
  { d: "M320 120 V260 H460 V400", duration: 10, delay: 3.4 },
  { d: "M460 260 H600 V400", duration: 12, delay: 6.2 },
];

/** Decorative, low-cost service-graph backdrop for the hero. */
export function HeroNetwork({ className }: { className?: string }) {
  const [ref, live] = useLive<HTMLDivElement>(0.1);

  return (
    <div ref={ref} aria-hidden data-live={live ? "true" : "false"} className={cn("pointer-events-none select-none", className)}>
      <svg viewBox="0 0 690 520" className="h-full w-full" preserveAspectRatio="xMidYMid meet" fill="none">
        <g className="stroke-line-strong" strokeWidth={1}>
          {edges.map((d) => (
            <path key={d} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>

        <g className="stroke-accent" strokeWidth={1.5} strokeLinecap="round">
          {comets.map((c) => (
            <path
              key={c.d}
              d={c.d}
              pathLength={100}
              strokeDasharray="8 200"
              className="comet"
              style={{ "--comet-duration": `${c.duration}s`, "--comet-delay": `${c.delay}s` } as CSSProperties}
            />
          ))}
        </g>

        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {n.accent ? <circle r={9} className="fill-accent-soft stroke-accent/40" strokeWidth={1} /> : null}
            <rect x={-3.5} y={-3.5} width={7} height={7} className={n.accent ? "fill-accent" : "fill-canvas stroke-ink/50"} strokeWidth={1} />
            <text x={10} y={-8} className="fill-faint font-mono text-[10px] tracking-[0.06em]">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
