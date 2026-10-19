import type { CSSProperties } from "react";
import type { FlowStep } from "@/data/types";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   FlowNode — one box in a diagram
   ------------------------------------------------------------------------ */

type FlowNodeProps = FlowStep & {
  index?: number;
  emphasis?: boolean;
  className?: string;
};

export function FlowNode({ label, sub, variant = "default", index, emphasis, className }: FlowNodeProps) {
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col gap-0.5 rounded-md border px-3 py-2 text-left transition-colors duration-300",
        variant === "default" && "border-line-strong bg-canvas",
        variant === "io" && "border-dashed border-line-strong bg-transparent",
        variant === "human" && "border-accent/50 bg-accent-soft",
        emphasis && "border-ink bg-canvas",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        {index !== undefined ? (
          <span className="font-mono text-[10px] leading-none text-faint">{String(index + 1).padStart(2, "0")}</span>
        ) : null}
        {variant === "human" ? <span aria-hidden className="size-1.5 rotate-45 bg-accent" /> : null}
        <span className={cn("text-[13px] font-medium leading-tight tracking-[-0.01em]", variant === "human" ? "text-accent" : "text-ink")}>
          {label}
        </span>
      </span>
      {sub ? (
        <span className={cn("font-mono text-[10.5px] leading-tight lowercase", variant === "human" ? "text-accent/80" : "text-muted")}>
          {sub}
        </span>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Connectors — hairlines with a travelling accent signal
   ------------------------------------------------------------------------ */

type ConnectorProps = {
  /** Position in the flow, used to stagger the signal. */
  step?: number;
  reverse?: boolean;
  dashed?: boolean;
  arrow?: boolean;
  className?: string;
};

const signalStyle = (step = 0) => ({ "--signal-delay": `${step * 0.38}s` }) as CSSProperties;

export function HConnector({ step, reverse, dashed, arrow = true, className }: ConnectorProps) {
  return (
    <span aria-hidden className={cn("relative flex h-3 min-w-5 flex-1 items-center", reverse && "rotate-180", className)}>
      <span className="relative h-[3px] w-full overflow-hidden">
        <span
          className={cn(
            "absolute inset-x-0 top-1/2 -translate-y-1/2",
            dashed ? "h-0 border-t border-dashed border-line-strong" : "h-px bg-line-strong",
          )}
        />
        <span className="signal-x absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-accent to-transparent" style={signalStyle(step)} />
      </span>
      {arrow ? <span className="absolute right-0 top-1/2 size-[5px] -translate-y-1/2 rotate-45 border-r border-t border-line-strong" /> : null}
    </span>
  );
}

export function VConnector({ step, reverse, dashed, arrow = true, className }: ConnectorProps) {
  return (
    <span aria-hidden className={cn("relative flex h-6 w-3 flex-col items-center", reverse && "rotate-180", className)}>
      <span className="relative h-full w-[3px] overflow-hidden">
        <span
          className={cn(
            "absolute inset-y-0 left-1/2 -translate-x-1/2",
            dashed ? "w-0 border-l border-dashed border-line-strong" : "w-px bg-line-strong",
          )}
        />
        <span className="signal-y absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-transparent via-accent to-transparent" style={signalStyle(step)} />
      </span>
      {arrow ? <span className="absolute bottom-0 left-1/2 size-[5px] -translate-x-1/2 rotate-135 border-r border-t border-line-strong" /> : null}
    </span>
  );
}
