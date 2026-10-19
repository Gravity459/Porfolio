"use client";

import { DiagramFrame } from "@/components/diagrams/diagram-frame";
import { DiagramRenderer } from "@/components/diagrams/diagram-renderer";
import { Reveal } from "@/components/ui/reveal";
import { TechList } from "@/components/ui/tech-badge";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";
import { AudioWave, CardFrame, Highlights, OpenProjectButton, ProjectHeader, StatusTag } from "./project-parts";

type CardProps = { project: Project; onOpen: (slug: string) => void };

const caption = (p: Project) => `fig. ${p.index} — ${p.architecture.kind === "stack" ? "system architecture" : p.architecture.kind === "environments" ? "environments" : "flow"}`;

function Figure({ project, className, vertical }: { project: Project; className?: string; vertical?: boolean }) {
  return (
    <DiagramFrame label={project.architectureLabel} caption={caption(project)} className={className}>
      <DiagramRenderer diagram={project.architecture} vertical={vertical} />
    </DiagramFrame>
  );
}

/** Large featured case study: copy on one side, architecture on the other. */
function FeatureCard({ project, onOpen, flip, featured }: CardProps & { flip?: boolean; featured?: boolean }) {
  return (
    <article className="group relative grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-10">
      <CardFrame slug={project.slug} />
      <ProjectHeader
        project={project}
        size={featured ? "lg" : "md"}
        label={featured ? "Featured" : undefined}
        className={cn("col-span-12 lg:col-span-5 lg:row-start-1", flip && "lg:col-start-8")}
      />
      <div className={cn("relative col-span-12 lg:col-span-7 lg:row-span-2 lg:row-start-1", flip ? "lg:col-start-1" : "lg:col-start-6")}>
        <Figure project={project} className={cn(featured ? "min-h-[26rem] lg:min-h-[34rem]" : "min-h-[22rem] lg:min-h-[28rem]")} />
      </div>
      <div className={cn("relative col-span-12 flex flex-col gap-8 self-end lg:col-span-5 lg:row-start-2", flip && "lg:col-start-8")}>
        <Highlights items={project.highlights} />
        <TechList items={project.stack} />
        <OpenProjectButton project={project} onOpen={onOpen} />
      </div>
    </article>
  );
}

/** Full-width band — used for pipelines that read best horizontally. */
function WideCard({ project, onOpen }: CardProps) {
  return (
    <article className="group relative flex flex-col gap-8">
      <CardFrame slug={project.slug} />
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 lg:col-span-6">
          <p className="meta flex items-center gap-3 text-muted">
            <span className="text-ink">{project.index}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong transition-[width,background-color] duration-500 ease-out-expo group-hover:w-10 group-hover:bg-accent" />
            {project.role}
            <StatusTag status={project.status} className="ml-auto lg:ml-0" />
          </p>
          <h3 className="type-h2 mt-4 max-w-[14ch] text-balance transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
            {project.name}
          </h3>
        </div>
        <p className="type-lede col-span-12 max-w-[40ch] self-end text-pretty text-muted lg:col-span-5 lg:col-start-8">{project.tagline}</p>
      </div>

      <DiagramFrame label={project.architectureLabel} caption={caption(project)} className="relative">
        <div className="flex flex-col gap-8 @2xl:gap-10 @2xl:py-6">
          <DiagramRenderer diagram={project.architecture} />
          <div className="hidden items-center gap-4 @2xl:flex">
            <span className="meta shrink-0 text-faint">audio in</span>
            <AudioWave className="flex-1" />
            <span className="meta shrink-0 text-faint">audio out</span>
          </div>
        </div>
      </DiagramFrame>

      <div className="relative flex flex-col gap-8">
        <Highlights items={project.highlights} columns />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <TechList items={project.stack} />
          <OpenProjectButton project={project} onOpen={onOpen} className="shrink-0" />
        </div>
      </div>
    </article>
  );
}

/** Compact case study used side-by-side in pairs. */
function PairCard({ project, onOpen, className }: CardProps & { className?: string }) {
  return (
    <article className={cn("group relative flex flex-col gap-8", className)}>
      <CardFrame slug={project.slug} />
      <Figure project={project} className="min-h-[24rem] lg:min-h-[34rem]" />
      <ProjectHeader project={project} />
      <div className="relative flex flex-col gap-7">
        <Highlights items={project.highlights} />
        <TechList items={project.stack} />
        <OpenProjectButton project={project} onOpen={onOpen} />
      </div>
    </article>
  );
}

export function ProjectFeature({ project, onOpen }: CardProps) {
  switch (project.layout) {
    case "feature":
      return (
        <Reveal>
          <FeatureCard project={project} onOpen={onOpen} featured />
        </Reveal>
      );
    case "wide":
      return (
        <Reveal>
          <WideCard project={project} onOpen={onOpen} />
        </Reveal>
      );
    case "split-left":
      return (
        <Reveal>
          <FeatureCard project={project} onOpen={onOpen} flip />
        </Reveal>
      );
    case "split-right":
      return (
        <Reveal>
          <FeatureCard project={project} onOpen={onOpen} />
        </Reveal>
      );
    default:
      return null;
  }
}

export function ProjectPair({ projects, onOpen }: { projects: Project[]; onOpen: (slug: string) => void }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-24 lg:gap-x-14">
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 0.08} className={cn("col-span-12", i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5")}>
          <PairCard project={project} onOpen={onOpen} />
        </Reveal>
      ))}
    </div>
  );
}
