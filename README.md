# Talha Rana — Portfolio

Single-page portfolio for an AI Backend Engineer. Next.js (App Router) · TypeScript · Tailwind CSS v4 · Base UI · Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm run lint
```

## Before deploying

Replace the placeholders in [`src/data/site.ts`](src/data/site.ts):

- `url` — production URL (used for metadata, sitemap, robots, JSON-LD)
- `email`
- `socials.github` / `socials.linkedin` (`href` + `handle`)

Optional: add `links` to any project in `src/data/projects.ts` to show external links in its case study.

## Editing content

All copy lives in `src/data/` — components contain no content.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, title, contact links, availability badge, nav, hero tags |
| `projects.ts` | Projects, their layout in the showcase, case-study content and diagrams |
| `expertise.ts` | Engineering domains and skills |
| `experience.ts` | Roles timeline |
| `infrastructure.ts` | Architecture tiers and supporting AWS services |

### Adding a project

Append an object to `projects` in `src/data/projects.ts`. Key fields:

- `layout` — `feature` · `wide` · `split-left` · `split-right` · `pair` (two consecutive `pair` projects render side by side) · `row` (compact index at the end)
- `architecture` — a diagram description, rendered by `src/components/diagrams/diagram-renderer.tsx`:
  - `pipeline` — linear steps (`variant: "io" | "human"` styles boundaries and manual checkpoints)
  - `rag` — query path plus an ingestion branch feeding one step
  - `supervisor` — supervisor, agents and output
  - `toolhub` — one agent and the tools it calls
  - `stack` — layered architecture
  - `environments` — parallel environments under a shared band
- `challenges` / `role` / `links` are optional and are hidden when absent.

Case studies are linkable at `/#work/<slug>`.

## Structure

```
src/
  app/            layout, page, globals.css (design tokens), OG image, sitemap, robots
  components/
    layout/       navbar, mobile menu, theme toggle, scroll progress, footer
    sections/     hero, project showcase, expertise, experience, infrastructure, about, contact
    projects/     card layouts, archive index, case-study modal
    diagrams/     diagram primitives + one component per diagram kind, hero network
    ui/           button, tech badge, reveal helpers, section heading, copy button
  data/           all content
  hooks/          active section, in-view "live" state
  lib/            motion tokens, theme script, utils
```

## Design system

Tokens are CSS variables in `src/app/globals.css` (`--canvas`, `--ink`, `--muted`, `--faint`, `--line`, `--surface`, `--accent`), redefined under `[data-theme="dark"]`. The theme follows the OS until the visitor toggles it; the choice is stored in `localStorage` and applied by an inline script before first paint.

Motion timing lives in `src/lib/motion.ts`. Ambient animation (diagram signals, hero network, audio wave) is CSS-only, runs only while on screen, and is disabled under `prefers-reduced-motion`.
