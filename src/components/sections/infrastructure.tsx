"use client";

import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TechBadge } from "@/components/ui/tech-badge";
import { environments, infraGroups, infraTiers } from "@/data/infrastructure";
import type { InfraTier } from "@/data/types";

function Tier({ tier, index, total, progress }: { tier: InfraTier; index: number; total: number; progress: MotionValue<number> }) {
  // Each tier lights up as the scroll-linked line reaches it.
  const at = index / (total - 1);
  const lit = useTransform(progress, [Math.max(at - 0.04, 0), at + 0.02], [0, 1]);
  const color = useTransform(lit, (v) => (v > 0.5 ? "var(--accent)" : "var(--line-strong)"));

  return (
    <li className="relative grid grid-cols-[2rem_1fr] gap-x-4 py-5 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-x-8">
      <span className="relative flex h-full items-start justify-center pt-1.5 md:items-center md:pt-0">
        <m.span className="relative z-10 size-2.5 rotate-45 border bg-canvas" style={{ borderColor: color }} />
        <m.span className="absolute z-10 size-1 rotate-45 bg-accent top-[0.6875rem] md:top-auto" style={{ opacity: lit }} />
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10.5px] text-faint">L{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-[1.125rem] font-semibold leading-tight tracking-[-0.02em] md:text-[1.375rem]">{tier.name}</h3>
        {tier.where ? <span className="font-mono text-[11px] text-faint">↳ {tier.where}</span> : null}
      </div>
      <ul className="col-start-2 mt-3 flex flex-wrap gap-1.5 md:col-start-3 md:mt-0 md:justify-end">
        {tier.items.map((item) => (
          <li key={item}>
            <TechBadge className="bg-canvas">{item}</TechBadge>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Infrastructure() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section id="infrastructure" aria-labelledby="infrastructure-title" className="relative isolate overflow-hidden py-20 md:py-28">
      <div aria-hidden className="texture-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="shell">
        <SectionHeading
          id="infrastructure-title"
          index="04"
          label="Infrastructure"
          title="AWS services I've deployed with."
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-8">
            <p className="meta mb-6 flex items-center gap-2 text-faint">
              <span aria-hidden className="size-1 rounded-full bg-accent" />
              fig. 04 — services by layer, across projects
            </p>
            <div className="relative">
              {/* Track + scroll-linked fill */}
              <span aria-hidden className="absolute bottom-8 left-4 top-8 w-px -translate-x-1/2 bg-line-strong md:left-6" />
              <m.span
                aria-hidden
                className="absolute bottom-8 left-4 top-8 w-px -translate-x-1/2 origin-top bg-accent md:left-6"
                style={{ scaleY: progress }}
              />
              <ol ref={ref} aria-label="Services I have deployed with, by layer, from frontend to AI services" className="relative">
                {infraTiers.map((tier, i) => (
                  <Tier key={tier.name} tier={tier} index={i} total={infraTiers.length} progress={progress} />
                ))}
              </ol>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="flex flex-col gap-10 lg:sticky lg:top-28">
              <Reveal>
                <p className="meta mb-4 text-faint">Around the request path</p>
                <dl className="flex flex-col">
                  {infraGroups.map((group) => (
                    <div key={group.name} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-line py-4">
                      <dt className="text-[14px] font-medium">{group.name}</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <TechBadge key={item} className="bg-canvas">
                            {item}
                          </TechBadge>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="meta mb-4 text-faint">Environments</p>
                <ol className="flex items-center gap-2">
                  {environments.map((env, i) => (
                    <li key={env} className="flex items-center gap-2">
                      <span className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-line bg-canvas px-2.5 font-mono text-[11px] text-ink">
                        <span aria-hidden className={i === environments.length - 1 ? "size-1.5 rounded-full bg-accent" : "size-1.5 rounded-full bg-line-strong"} />
                        {env.toLowerCase()}
                      </span>
                      {i < environments.length - 1 ? (
                        <span aria-hidden className="text-faint">
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
