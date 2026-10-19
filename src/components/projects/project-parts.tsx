"use client";

import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { m } from "motion/react";
import type { Project, ProjectStatus } from "@/data/types";
import { cn } from "@/lib/utils";

/** Morph target shared with the project modal (layoutId). Doubles as the hover surface. */
export function CardFrame({ slug, className }: { slug: string; className?: string }) {
  return (
    <m.div
      aria-hidden
      layoutId={`project-frame-${slug}`}
      className={cn(
        "pointer-events-none absolute -inset-3 rounded-lg border border-transparent bg-transparent transition-colors duration-300 group-hover:border-line group-hover:bg-surface/60 md:-inset-6",
        className,
      )}
      style={{ borderRadius: 10 }}
    />
  );
}

const statusLabel: Record<ProjectStatus, string> = { live: "Live", offline: "Previously live", prototype: "Prototype" };

/** Deployment state — an accent dot only when the project is live. */
export function StatusTag({ status, className }: { status?: ProjectStatus; className?: string }) {
  if (!status) return null;
  return (
    <span className={cn("inline-flex items-center gap-1.5", status === "live" ? "text-ink" : "text-faint", className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", status === "live" ? "bg-accent" : "bg-line-strong")} />
      {statusLabel[status]}
    </span>
  );
}

type ProjectHeaderProps = {
  project: Project;
  size?: "lg" | "md";
  label?: string;
  className?: string;
};

export function ProjectHeader({ project, size = "md", label, className }: ProjectHeaderProps) {
  return (
    <div className={cn("relative flex flex-col", className)}>
      <p className="meta flex items-center gap-3 text-muted">
        <span className="text-ink">{project.index}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong transition-[width,background-color] duration-500 ease-out-expo group-hover:w-10 group-hover:bg-accent" />
        {label ? <span>{label}</span> : null}
        {label && project.role ? (
          <span aria-hidden className="hidden text-faint sm:inline">
            /
          </span>
        ) : null}
        {project.role ? <span className={cn(label && "hidden sm:inline")}>{project.role}</span> : null}
        <StatusTag status={project.status} className="ml-auto" />
      </p>
      <h3
        className={cn(
          "mt-4 text-balance transition-transform duration-500 ease-out-expo group-hover:translate-x-1",
          size === "lg" ? "type-h2" : "type-h3",
        )}
      >
        {project.name}
      </h3>
      <p className={cn("mt-4 max-w-[48ch] text-pretty text-muted", size === "lg" ? "type-lede" : "text-[15.5px] leading-relaxed")}>
        {project.tagline}
      </p>
    </div>
  );
}

export function Highlights({ items, columns, className }: { items: readonly string[]; columns?: boolean; className?: string }) {
  return (
    <ol className={cn(columns ? "grid gap-x-6 gap-y-4 md:grid-cols-3" : "flex flex-col", className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className={cn(
            "flex gap-4 border-t border-line text-[14.5px] leading-snug",
            columns ? "flex-col gap-3 pt-4" : "py-3",
          )}
        >
          <span className="font-mono text-[11px] leading-5 text-faint">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-ink/90">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/**
 * The card's single interactive control. Its ::after stretches over the
 * whole card so the entire project is clickable.
 */
export function OpenProjectButton({ project, onOpen, className }: { project: Project; onOpen: (slug: string) => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project.slug)}
      aria-haspopup="dialog"
      aria-label={`Open case study: ${project.name}`}
      className={cn(
        "meta inline-flex items-center gap-2 self-start text-ink outline-none after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-8 focus-visible:after:outline-accent",
        className,
      )}
    >
      <span className="link-underline group-hover:bg-[length:100%_1px]">View case study</span>
      <span className="grid size-6 place-items-center rounded-full border border-line-strong transition-[transform,border-color,background-color,color] duration-300 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
        <ArrowUpRight className="size-3" strokeWidth={2} />
      </span>
    </button>
  );
}

/** Ambient "continuous audio" strip used by the audio pipeline case study. */
export function AudioWave({ bars = 64, className }: { bars?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-8 items-center justify-between gap-[3px] overflow-hidden", className)}>
      {Array.from({ length: bars }, (_, i) => {
        const height = 30 + Math.round(Math.abs(Math.sin(i * 1.7) * 55 + Math.cos(i * 0.6) * 15));
        return (
          <span
            key={i}
            className="wave-bar w-[1.5px] shrink-0 rounded-full bg-line-strong"
            style={
              {
                height: `${Math.min(height, 100)}%`,
                "--wave-delay": `${((i * 37) % 23) * -0.07}s`,
                "--wave-duration": `${1.1 + ((i * 13) % 7) * 0.12}s`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
