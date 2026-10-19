"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { DiagramFrame } from "@/components/diagrams/diagram-frame";
import { DiagramRenderer } from "@/components/diagrams/diagram-renderer";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatusTag } from "./project-parts";
import type { Project } from "@/data/types";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectArchiveProps = { projects: Project[]; onOpen: (slug: string) => void };

/** Editorial index of smaller projects with a sticky diagram preview. */
export function ProjectArchive({ projects, onOpen }: ProjectArchiveProps) {
  const [previewSlug, setPreviewSlug] = useState(projects[0]?.slug);
  const preview = projects.find((p) => p.slug === previewSlug) ?? projects[0];

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-10">
      <div className="col-span-12 flex items-end justify-between border-b border-line pb-4 lg:col-span-8">
        <h3 className="type-h3">More systems</h3>
        <p className="meta text-muted">
          {projects[0]?.index} — {projects[projects.length - 1]?.index}
        </p>
      </div>

      <RevealGroup as="li" step={0.06} className="col-span-12 lg:col-span-8 lg:row-start-2">
        {projects.map((project) => (
          <RevealItem key={project.slug} as="li" className="border-b border-line">
            <button
              type="button"
              onClick={() => onOpen(project.slug)}
              onPointerEnter={() => setPreviewSlug(project.slug)}
              onFocus={() => setPreviewSlug(project.slug)}
              aria-haspopup="dialog"
              className={cn(
                "group relative grid w-full grid-cols-[2rem_1fr_auto] items-start gap-x-3 py-6 text-left outline-none md:grid-cols-[2.5rem_minmax(0,13rem)_1fr_auto] md:gap-x-6",
                "focus-visible:bg-surface",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-3 -right-3 origin-left scale-x-[0.98] rounded-md bg-surface opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover:scale-x-100 group-hover:opacity-100"
              />
              <span className="relative pt-1 font-mono text-[11px] text-faint transition-colors group-hover:text-accent">{project.index}</span>
              <span className="relative flex flex-col gap-1.5">
                <span className="text-[1.1875rem] font-semibold leading-tight tracking-[-0.025em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  {project.name}
                </span>
                <StatusTag status={project.status} className="meta" />
                <span className="text-[14.5px] leading-snug text-muted md:hidden">{project.tagline}</span>
                <span className="font-mono text-[11px] leading-relaxed text-faint md:hidden">{project.stack.join(" · ")}</span>
              </span>
              <span className="relative hidden flex-col gap-2 md:flex">
                <span className="text-[14.5px] leading-snug text-muted">{project.tagline}</span>
                <span className="font-mono text-[11px] leading-relaxed text-faint">{project.stack.join(" · ")}</span>
              </span>
              <span className="relative grid size-7 place-items-center rounded-full border border-line-strong text-muted transition-[transform,border-color,background-color,color] duration-300 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="relative hidden lg:col-span-4 lg:row-span-2 lg:row-start-1 lg:block">
        <div className="sticky top-28">
          <DiagramFrame label={preview.architectureLabel} caption={`fig. ${preview.index} — preview`} className="min-h-[24rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={preview.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: ease.out }}
              >
                <DiagramRenderer diagram={preview.architecture} vertical />
              </m.div>
            </AnimatePresence>
          </DiagramFrame>
          <p className="meta mt-3 text-faint">
            <span className="text-muted">{preview.name}</span> — hover a row to preview
          </p>
        </div>
      </div>
    </div>
  );
}
