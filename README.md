# Talha Rana — Portfolio

Single-page portfolio for an AI Backend Engineer.

**Live:** [talha-rana.vercel.app](https://talha-rana.vercel.app/)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Base UI · Motion · Lucide. Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

> This project uses Next.js 16, which has breaking changes from earlier versions. Check the guides in `node_modules/next/dist/docs/` before changing framework-level code.

## Site settings

[`src/data/site.ts`](src/data/site.ts) holds the global values:

- `url` — production URL (`https://talha-rana.vercel.app`), used for metadata, canonical and Open Graph URLs, sitemap, robots and JSON-LD. Keep it without a trailing slash.
- `email`, `socials.github`, `socials.linkedin`
- `availability`, `location`, `remote`, `current`, `education`
- `resume` — path to the PDF in `public/`

## Editing content

All copy lives in `src/data/` — components contain no content.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, title, URL, contact links, availability badge, nav, hero tags, lifecycle line |
| `projects.ts` | Projects, their layout in the showcase, case-study content and diagrams |
| `expertise.ts` | Engineering domains and skills |
| `experience.ts` | Roles timeline |
| `infrastructure.ts` | Architecture tiers and supporting AWS services |
| `types.ts` | Types for all of the above |

Only real facts and numbers go into the content — no invented metrics, clients or results.

### Adding a project

Append an object to `projects` in `src/data/projects.ts`. Key fields:

- `layout` — `feature` · `wide` · `split-left` · `split-right` · `pair` (two consecutive `pair` projects render side by side) · `row` (compact index at the end)
- `status` — `live` · `offline` (shown as "Previously live") · `prototype`
- `role`, `team` — shown in the case-study meta rail. `TEAM` and `THREE_PERSON_TEAM` cover the common setups; pass a string for anything else, or leave `team` out to hide it.
- `outcomes` — measured results only
- `architecture` — a diagram description, rendered by `src/components/diagrams/diagram-renderer.tsx`:
  - `pipeline` — linear steps (`variant: "io" | "human"` styles boundaries and manual checkpoints)
  - `rag` — query path plus an ingestion branch feeding one step
  - `supervisor` — supervisor, agents and output
  - `toolhub` — one agent and the tools it calls
  - `stack` — layered architecture
  - `environments` — parallel environments under a shared band
- `architectureLabel` — plain-language summary of the diagram for screen readers
- `media` — screenshots from `public/projects/`. Blur any personal or client data first.
- `challenges`, `links` — optional, hidden when absent

Case studies are linkable at `/#work/<slug>` (for example [`/#work/angel`](https://talha-rana.vercel.app/#work/angel)).

## Resume

`public/Talha_Rana_Resume.pdf` is generated from [`resume/resume.html`](resume/resume.html). After editing the HTML, rebuild the PDF:

```bash
chrome --headless --no-pdf-header-footer --print-to-pdf=public/Talha_Rana_Resume.pdf resume/resume.html
```

## Structure

```
public/           resume PDF, project screenshots
resume/           resume source (HTML)
src/
  app/            layout, page, globals.css (design tokens), icon, OG image, sitemap, robots
  components/
    layout/       navbar, mobile menu, theme toggle, availability badge, scroll progress, footer
    sections/     hero, project showcase, expertise, experience, infrastructure, about, contact
    projects/     card layouts, archive index, case-study modal
    diagrams/     diagram primitives + one component per diagram kind, hero network
    providers/    motion provider
    ui/           button, tech badge, brand icons, reveal helpers, section heading, copy button
  data/           all content
  hooks/          active section, in-view "live" state
  lib/            motion tokens, scroll helper, theme script, utils
```

## Design system

Tokens are CSS variables in `src/app/globals.css` (`--canvas`, `--ink`, `--muted`, `--faint`, `--line`, `--surface`, `--accent`), redefined under `[data-theme="dark"]`. The theme follows the OS until the visitor toggles it; the choice is stored in `localStorage` and applied by an inline script before first paint.

Motion timing lives in `src/lib/motion.ts`. Ambient animation (diagram signals, hero network, audio wave) is CSS-only, runs only while on screen, and is disabled under `prefers-reduced-motion`.

## Deployment

Hosted on Vercel at [talha-rana.vercel.app](https://talha-rana.vercel.app/). If the domain changes, update `url` in `src/data/site.ts`.

## License

See [LICENSE](LICENSE).
