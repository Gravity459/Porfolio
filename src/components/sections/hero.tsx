import { ArrowDown, ArrowRight } from "lucide-react";
import { HeroNetwork } from "@/components/diagrams/hero-network";
import { Reveal } from "@/components/ui/reveal";
import { RevealText } from "@/components/ui/reveal-text";
import { heroTags, lifecycle, site } from "@/data/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_35%,black,transparent)]"
      />
      <HeroNetwork className="absolute -right-24 top-16 -z-10 h-[55%] w-[120%] opacity-30 sm:right-0 sm:w-full md:top-10 md:h-[78%] md:w-[58%] md:opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]" />

      <div className="shell flex min-h-[88svh] flex-col justify-end pb-12 pt-32 md:pb-16 md:pt-40">
        <Reveal immediate>
          <p className="meta flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted">
            {lifecycle.map((stage, i) => (
              <span key={stage} className="flex items-center gap-2.5">
                {i > 0 ? (
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                ) : null}
                <span className={i === 0 ? "text-ink" : undefined}>{stage}</span>
              </span>
            ))}
          </p>
        </Reveal>

        <h1 id="hero-title" className="type-display mt-6 max-w-[11ch] text-balance md:mt-8">
          <RevealText text="I build AI systems that actually ship" immediate delay={0.1} accentStop />
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-14">
          <Reveal immediate delay={0.45} className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="type-lede max-w-[46ch] text-pretty text-muted">
              <span className="text-ink">AI Backend Engineer</span> specializing in production LLM applications, intelligent agents, RAG
              systems, backend APIs, and cloud infrastructure.
            </p>
            <p className="meta mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span className="text-faint">Currently</span>
              <span aria-hidden className="h-px w-4 bg-line-strong" />
              <span className="text-ink">{site.current.title}</span>
              <span className="text-faint">@</span>
              <span>{site.current.company}</span>
            </p>
            <p className="meta mt-1.5 text-faint">
              {site.location} · Remote worldwide · Shipping AI products since {site.careerStart}
            </p>
          </Reveal>
          <Reveal immediate delay={0.55} className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end lg:col-span-6">
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium tracking-[-0.01em] text-canvas transition-[background-color,transform] duration-200 hover:bg-ink/85 active:scale-[0.98]"
            >
              View Projects
              <ArrowDown className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5" strokeWidth={1.75} />
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-md border border-line-strong px-5 text-[15px] font-medium tracking-[-0.01em] transition-[border-color,background-color,transform] duration-200 hover:border-ink active:scale-[0.98]"
            >
              Get in Touch
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" strokeWidth={1.75} />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 md:mt-20 md:gap-x-0">
          {heroTags.map((tag, i) => (
            <Reveal key={tag} as="li" immediate delay={0.7 + i * 0.04} className="meta flex items-center normal-case text-muted">
              {i > 0 ? <span aria-hidden className="mx-5 hidden h-3 w-px bg-line-strong md:block" /> : null}
              {tag}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
