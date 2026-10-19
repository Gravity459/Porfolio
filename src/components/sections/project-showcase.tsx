"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { ProjectArchive } from "@/components/projects/project-archive";
import { ProjectFeature, ProjectPair } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProject, projects } from "@/data/projects";
import type { Project } from "@/data/types";

const HASH_PREFIX = "#work/";

const slugFromHash = () =>
  window.location.hash.startsWith(HASH_PREFIX) ? window.location.hash.slice(HASH_PREFIX.length) : null;

/** Group consecutive "pair" projects so they render side by side. */
function sequence(list: Project[]) {
  const blocks: ({ type: "single"; project: Project } | { type: "pair"; projects: Project[] })[] = [];
  for (const project of list) {
    if (project.layout === "row") continue;
    const last = blocks[blocks.length - 1];
    if (project.layout === "pair" && last?.type === "pair" && last.projects.length < 2) last.projects.push(project);
    else if (project.layout === "pair") blocks.push({ type: "pair", projects: [project] });
    else blocks.push({ type: "single", project });
  }
  return blocks;
}

const blocks = sequence(projects);
const archive = projects.filter((p) => p.layout === "row");

/**
 * The cards never depend on which case study is open. Memoised so opening or
 * closing the modal re-renders only the modal, not every card and diagram.
 */
const ProjectList = memo(function ProjectList({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
      {blocks.map((block) =>
        block.type === "pair" ? (
          <ProjectPair key={block.projects.map((p) => p.slug).join("-")} projects={block.projects} onOpen={onOpen} />
        ) : (
          <ProjectFeature key={block.project.slug} project={block.project} onOpen={onOpen} />
        ),
      )}
      {archive.length ? <ProjectArchive projects={archive} onOpen={onOpen} /> : null}
    </div>
  );
});

export function ProjectShowcase() {
  const [slug, setSlug] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);

  // URL hash is the source of truth so case studies are linkable and the
  // browser back button closes them.
  useEffect(() => {
    const sync = () => {
      const next = slugFromHash();
      const valid = next && getProject(next) ? next : null;
      // Opened from history or a shared link: no card to morph from.
      if (valid) setOrigin(null);
      setSlug(valid);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const open = useCallback((next: string) => {
    setOrigin(next);
    setSlug(next);
    history.pushState({ project: next }, "", `${HASH_PREFIX}${next}`);
  }, []);

  const navigate = useCallback((next: string) => {
    setSlug(next);
    history.replaceState(history.state, "", `${HASH_PREFIX}${next}`);
  }, []);

  const close = useCallback(() => {
    if (history.state?.project) {
      history.back();
    } else {
      history.replaceState(null, "", "#work");
      setSlug(null);
    }
  }, []);

  const project = slug ? (getProject(slug) ?? null) : null;
  const index = project ? projects.indexOf(project) : -1;

  return (
    <section id="work" aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          id="work-title"
          index="02"
          label="Selected work"
          title="Systems designed, built and shipped."
          aside={<p className="meta text-muted">{projects.length} projects</p>}
        />

        <ProjectList onOpen={open} />

        <ProjectModal
          project={project}
          origin={origin}
          prev={index > 0 ? projects[index - 1] : null}
          next={index >= 0 && index < projects.length - 1 ? projects[index + 1] : null}
          onNavigate={navigate}
          onClose={close}
        />
      </div>
    </section>
  );
}
