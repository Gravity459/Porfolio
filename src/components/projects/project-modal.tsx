"use client";

import { Dialog } from "@base-ui/react/dialog";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DiagramFrame } from "@/components/diagrams/diagram-frame";
import { DiagramRenderer } from "@/components/diagrams/diagram-renderer";
import { TechBadge } from "@/components/ui/tech-badge";
import type { Project } from "@/data/types";
import { StatusTag } from "./project-parts";
import { ease, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectModalProps = {
  project: Project | null;
  /** Slug of the card the modal opened from — the morph origin. Null for deep links. */
  origin: string | null;
  prev: Project | null;
  next: Project | null;
  onNavigate: (slug: string) => void;
  onClose: () => void;
};

type Section = { id: string; label: string };

/** ~half of transition.morph: the ease-out has covered nearly all the distance by then. */
const BODY_DELAY_MS = 220;

export function ProjectModal({ project, origin, prev, next, onNavigate, onClose }: ProjectModalProps) {
  const open = project !== null;
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable=true]")) return;
      if (event.key === "ArrowLeft" && prev) onNavigate(prev.slug);
      if (event.key === "ArrowRight" && next) onNavigate(next.slug);
    };
    // Capture phase: the dialog stops keydown propagation before it bubbles to window.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, prev, next, onNavigate]);

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {project ? (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              // No backdrop-filter: blurring the whole page behind a morphing full-screen
              // layer costs a large GPU task on the first open.
              className="fixed inset-0 z-[70] bg-canvas/80"
              render={<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition.slow} />}
            />
            <Dialog.Popup
              initialFocus={scroller}
              className="fixed inset-0 z-[71] flex flex-col outline-none md:inset-3 lg:inset-4"
              render={
                <m.div
                  initial={origin ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={origin ? undefined : { opacity: 0, y: 24, transition: transition.base }}
                  transition={transition.base}
                />
              }
            >
              {/*
                The morph runs on an empty surface. Morphing the content itself
                re-rasterises every diagram and image each frame (the border radius
                is scale-corrected per frame), which dropped the first frames.
              */}
              <m.div
                aria-hidden
                layoutId={origin ? `project-frame-${origin}` : undefined}
                className="absolute inset-0 border-line bg-canvas shadow-modal md:rounded-lg md:border"
                exit={origin ? { opacity: 0, transition: { duration: 0.25, delay: 0.1 } } : undefined}
                transition={transition.morph}
                style={{ borderRadius: 10 }}
              />
              <m.div
                className="relative flex min-h-0 flex-1 flex-col overflow-hidden md:rounded-lg"
                exit={origin ? { opacity: 0, transition: { duration: 0.12 } } : undefined}
              >
                <ProjectDetail
                  project={project}
                  prev={prev}
                  next={next}
                  onNavigate={onNavigate}
                  scroller={scroller}
                  defer={origin !== null}
                />
              </m.div>
            </Dialog.Popup>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function ProjectDetail({
  project,
  prev,
  next,
  onNavigate,
  scroller,
  defer,
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
  onNavigate: (slug: string) => void;
  scroller: React.RefObject<HTMLDivElement | null>;
  /** Hold the heavy body back until the morph has mostly landed, so mounting it can't stall the motion. */
  defer: boolean;
}) {
  const [ready, setReady] = useState(!defer);
  useEffect(() => {
    if (ready) return;
    const id = window.setTimeout(() => setReady(true), BODY_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [ready]);

  // New project → back to the top of the panel.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.slug, scroller]);

  const sections: Section[] = [
    { id: "overview", label: "Overview" },
    ...(project.outcomes?.length ? [{ id: "results", label: "Results" }] : []),
    ...(project.media?.length ? [{ id: "product", label: "In production" }] : []),
    { id: "contribution", label: "My contribution" },
    { id: "architecture", label: "Technical architecture" },
    { id: "technologies", label: "Technologies" },
    ...(project.challenges?.length ? [{ id: "challenges", label: "Key engineering challenges" }] : []),
  ];

  const number = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  const jump = (id: string) => {
    const el = scroller.current?.querySelector<HTMLElement>(`[data-section="${id}"]`);
    if (!el || !scroller.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.current.scrollTo({ top: el.offsetTop - 88, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Top bar */}
      <m.div
        className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <p className="meta flex min-w-0 items-center gap-3 text-muted">
          <span className="text-ink">{project.index}</span>
          <span aria-hidden className="h-px w-5 bg-line-strong" />
          <span className="truncate">Case study</span>
        </p>
        <div className="flex items-center gap-1">
          <NavButton project={prev} direction="prev" onNavigate={onNavigate} />
          <NavButton project={next} direction="next" onNavigate={onNavigate} />
          <span aria-hidden className="mx-1.5 h-4 w-px bg-line" />
          <Dialog.Close
            aria-label="Close case study"
            className="meta inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-ink transition-colors hover:bg-surface"
          >
            <span className="hidden sm:inline">Close</span>
            <X className="size-3.5" strokeWidth={2} />
            <kbd className="hidden rounded-sm border border-line px-1 font-mono text-[10px] text-faint md:inline">esc</kbd>
          </Dialog.Close>
        </div>
      </m.div>

      <div ref={scroller} tabIndex={-1} className="relative flex-1 overflow-y-auto overscroll-contain outline-none">
        <AnimatePresence mode="wait" initial={true}>
          {ready ? (
            <m.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
              transition={{ delay: defer ? 0 : 0.12, duration: 0.4, ease: ease.out }}
              className="mx-auto grid w-full max-w-[76rem] grid-cols-12 gap-x-6 gap-y-12 px-4 pb-20 pt-10 md:px-8 md:pt-14 lg:gap-x-12"
            >
              {/* Meta rail */}
              <aside className="@container col-span-12 min-w-0 lg:col-span-4">
                <div className="flex flex-col gap-6 lg:sticky lg:top-10">
                  <div>
                    {/* Cap the size by the rail width so long single words (e.g. "Conversational") never overflow */}
                    <Dialog.Title
                      className="type-h2 text-balance"
                      style={{ fontSize: "min(clamp(2.125rem, 4.6vw, 4.25rem), 13cqi)" }}
                    >
                      {project.name}
                    </Dialog.Title>
                    <Dialog.Description className="type-lede mt-4 text-pretty text-muted">{project.tagline}</Dialog.Description>
                  </div>
                  {project.role || project.status || project.team ? (
                    <dl className="grid grid-cols-[6rem_1fr] gap-y-2 border-t border-line pt-4 text-[14px]">
                      {project.status ? (
                        <>
                          <dt className="meta pt-0.5 text-faint">Status</dt>
                          <dd>
                            <StatusTag status={project.status} />
                          </dd>
                        </>
                    ) : null}
                    {project.role ? (
                      <>
                        <dt className="meta pt-0.5 text-faint">Role</dt>
                        <dd>{project.role}</dd>
                      </>
                    ) : null}
                    {project.team ? (
                      <>
                        <dt className="meta pt-0.5 text-faint">Team</dt>
                        <dd className="text-muted">{project.team}</dd>
                      </>
                    ) : null}
                  </dl>
                ) : null}
                <nav aria-label="Case study sections" className="hidden border-t border-line pt-4 lg:block">
                  <ul className="flex flex-col">
                    {sections.map((s, i) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => jump(s.id)}
                          className="group flex w-full items-center gap-3 py-1.5 text-left text-[14px] text-muted transition-colors hover:text-ink"
                        >
                          <span className="font-mono text-[10.5px] text-faint group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                {project.links?.length ? (
                  <ul className="flex flex-col gap-2 border-t border-line pt-4">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1 text-[14px]">
                          {link.label}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </aside>

            {/* Content */}
            <div className="col-span-12 flex flex-col gap-16 lg:col-span-8">
              <DetailSection id="overview" index={number("overview")} title="Overview">
                <p className="type-lede text-pretty text-ink/90">{project.overview}</p>
              </DetailSection>

              {project.outcomes?.length ? (
                <DetailSection id="results" index={number("results")} title="Results">
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {project.outcomes.map((item) => (
                      <li key={item} className="flex gap-4 border-t border-line py-3 text-[15.5px] font-medium leading-snug">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              ) : null}

              {project.media?.length ? (
                <DetailSection id="product" index={number("product")} title="In production">
                  <div className="flex flex-col gap-6">
                    {project.media.map((shot) => (
                      <figure key={shot.src}>
                        <div className="overflow-hidden rounded-md border border-line bg-surface">
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            width={shot.width}
                            height={shot.height}
                            sizes="(min-width: 1024px) 48rem, 100vw"
                            className="h-auto w-full"
                          />
                        </div>
                        {shot.caption ? <figcaption className="meta mt-3 text-faint">{shot.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                </DetailSection>
              ) : null}

              <DetailSection id="contribution" index={number("contribution")} title="My contribution">
                <ol className="grid gap-x-8 sm:grid-cols-2">
                  {project.contribution.map((item, i) => (
                    <li key={item} className="flex gap-4 border-t border-line py-3 text-[15px] leading-snug">
                      <span className="font-mono text-[11px] leading-5 text-faint">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </DetailSection>

              <DetailSection id="architecture" index={number("architecture")} title="Technical architecture">
                <DiagramFrame label={project.architectureLabel} caption={`fig. ${project.index} — architecture`} className="min-h-[22rem]">
                  <DiagramRenderer diagram={project.architecture} />
                </DiagramFrame>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{project.architectureLabel}</p>
              </DetailSection>

              <DetailSection id="technologies" index={number("technologies")} title="Technologies">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <li key={t}>
                      <TechBadge className="h-7 px-2.5 text-[12px] text-ink">{t}</TechBadge>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              {project.challenges?.length ? (
                <DetailSection id="challenges" index={number("challenges")} title="Key engineering challenges">
                  <ul className="flex flex-col">
                    {project.challenges.map((c) => (
                      <li key={c} className="flex gap-4 border-t border-line py-4 text-[15.5px] leading-snug">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              ) : null}

              {next ? (
                <button
                  type="button"
                  onClick={() => onNavigate(next.slug)}
                  className="group flex flex-col gap-3 border-t border-line pt-6 text-left"
                >
                  <span className="meta text-faint">Next case study — {next.index}</span>
                  <span className="type-h3 flex items-center gap-3 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                    {next.name}
                    <ArrowRight className="size-6 text-muted transition-colors group-hover:text-accent" strokeWidth={1.5} />
                  </span>
                </button>
              ) : null}
            </div>
          </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

function DetailSection({ id, index, title, children }: { id: string; index: number; title: string; children: React.ReactNode }) {
  return (
    <section data-section={id} aria-labelledby={`detail-${id}`}>
      <h3 id={`detail-${id}`} className="meta mb-5 flex items-center gap-3 text-muted">
        <span className="text-ink">{String(index).padStart(2, "0")}</span>
        <span aria-hidden className="h-px w-5 bg-line-strong" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function NavButton({ project, direction, onNavigate }: { project: Project | null; direction: "prev" | "next"; onNavigate: (slug: string) => void }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      disabled={!project}
      onClick={() => project && onNavigate(project.slug)}
      aria-label={project ? `${direction === "prev" ? "Previous" : "Next"}: ${project.name}` : undefined}
      className={cn("grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent")}
    >
      <Icon className="size-3.5" strokeWidth={2} />
    </button>
  );
}
