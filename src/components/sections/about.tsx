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
                text="I own the backend, the AI layer and the path to production."
                mutedFrom={4}
              />
            </h2>

            <div className="mt-12 grid gap-x-10 gap-y-6 md:mt-16 md:grid-cols-2">
              <Reveal>
                <p className="text-[16.5px] leading-relaxed text-ink/90">
                  I usually own a product&apos;s backend and its deployment together. On Settle Wing that meant the FastAPI API, Stripe
                  payments and the AWS setup across development, staging and production. At ZOD AI it means features across NestJS,
                  FastAPI, a LangGraph agent and a Rust desktop app.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[16.5px] leading-relaxed text-muted">
                  Next, I want a product team where AI is part of the core product. I&apos;m open to relocating with visa sponsorship, or
                  to remote work. I&apos;m in Karachi (PKT, UTC+5): a full working day of overlap with Europe, and mornings with the US.
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
