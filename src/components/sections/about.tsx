import { Reveal } from "@/components/ui/reveal";
import { RevealText } from "@/components/ui/reveal-text";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="shell">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-line pt-5">
          <p className="meta col-span-12 flex items-center gap-3 self-start text-muted md:col-span-3 md:pt-3">
            <span className="text-ink">05</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>About</span>
          </p>

          <div className="col-span-12 md:col-span-9">
            <h2 id="about-title" className="type-h3 max-w-[26ch] text-balance md:text-[clamp(1.875rem,3.4vw,3rem)]">
              <RevealText
                text="I turn ideas into reliable production systems — where AI meets real software engineering."
                mutedFrom={7}
              />
            </h2>

            <div className="mt-12 grid gap-x-10 gap-y-6 md:mt-16 md:grid-cols-2">
              <Reveal>
                <p className="text-[16.5px] leading-relaxed text-ink/90">
                  I&apos;m an AI Backend Engineer focused on turning ideas into reliable production systems. I work across backend
                  architecture, LLM applications, AI agents, RAG pipelines and cloud infrastructure.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[16.5px] leading-relaxed text-muted">
                  The systems I enjoy most are the ones where AI meets real software engineering — where a model is only one part
                  of a product that also needs clean APIs, data, payments, infrastructure and a path to production.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="meta mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-muted">
                <span className="text-faint">Currently</span>
                <span aria-hidden className="h-px w-4 bg-line-strong" />
                <span className="text-ink">{site.current.title}</span>
                <span className="text-faint">@</span>
                <span>{site.current.company}</span>
              </p>
              <p className="meta mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                <span className="text-faint">Education</span>
                <span aria-hidden className="h-px w-4 bg-line-strong" />
                <span>{site.education}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
