"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Tabs } from "@base-ui/react/tabs";
import { Plus } from "lucide-react";
import { m } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import { expertise } from "@/data/expertise";
import { projects } from "@/data/projects";
import type { SkillDomain } from "@/data/types";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Which projects list this skill in their stack (derived, never hand-written). */
function usedIn(skill: string) {
  const key = normalize(skill);
  return projects.filter((p) => p.stack.some((t) => normalize(t) === key));
}

function SkillList({ domain }: { domain: SkillDomain }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {domain.items.map((item, i) => {
        const where = usedIn(item);
        return (
          <m.li
            key={item}
            data-reveal
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.022, duration: 0.35, ease: ease.out }}
            className="group/skill flex flex-col gap-1 border-t border-line py-3.5 pr-4"
          >
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-[10.5px] text-faint transition-colors group-hover/skill:text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15.5px] font-medium tracking-[-0.015em]">{item}</span>
            </span>
            {where.length ? (
              <span className="pl-8 font-mono text-[10.5px] leading-relaxed text-faint">
                ↳{" "}
                {where.slice(0, 3).map((p, j) => (
                  <span key={p.slug}>
                    {j > 0 ? ", " : null}
                    {/* Hash opens the case study via ProjectShowcase's popstate sync. */}
                    <a href={`#work/${p.slug}`} className="underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent hover:decoration-accent">
                      {p.name}
                    </a>
                  </span>
                ))}
                {where.length > 3 ? ` +${where.length - 3}` : ""}
              </span>
            ) : null}
          </m.li>
        );
      })}
    </ul>
  );
}

export function Expertise() {
  const [active, setActive] = useState(expertise[0].id);
  const domain = expertise.find((d) => d.id === active) ?? expertise[0];

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="pb-20 pt-12 md:pb-28 md:pt-20">
      <div className="shell">
        <SectionHeading id="expertise-title" index="01" label="Expertise" title="Engineering across the whole AI product." />

        {/* Desktop: domain index + panel */}
        <Tabs.Root
          value={active}
          onValueChange={(value) => setActive(String(value))}
          orientation="vertical"
          className="mt-16 hidden grid-cols-12 gap-x-10 md:mt-24 lg:grid"
        >
          <Tabs.List aria-label="Engineering domains" className="relative col-span-5 flex flex-col self-start border-b border-line" activateOnFocus>
            {expertise.map((d) => (
              <Tabs.Tab
                key={d.id}
                value={d.id}
                onPointerEnter={() => setActive(d.id)}
                className="group relative flex items-baseline gap-5 border-t border-line py-5 pl-5 text-left outline-none focus-visible:bg-surface"
              >
                <span className="font-mono text-[11px] text-faint transition-colors group-data-active:text-accent">{d.index}</span>
                <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.035em] text-muted/70 transition-colors duration-300 group-hover:text-ink/80 group-data-active:text-ink">
                  {d.name}
                </span>
                <span className="meta ml-auto text-faint">{String(d.items.length).padStart(2, "0")}</span>
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="absolute left-0 top-0 h-[var(--active-tab-height)] w-px translate-y-[var(--active-tab-top)] bg-accent transition-[translate,height] duration-500 ease-out-expo" />
          </Tabs.List>

          <div className="col-span-7 min-h-[30rem]">
            {expertise.map((d) => (
              <Tabs.Panel key={d.id} value={d.id} className="outline-none">
                {d.id === domain.id ? (
                  <m.div data-reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <p className="meta mb-2 text-faint">
                      {d.index} / {String(expertise.length).padStart(2, "0")}
                    </p>
                    <p className="mb-8 max-w-[44ch] text-[17px] leading-relaxed text-muted">{d.summary}</p>
                    <SkillList domain={d} />
                  </m.div>
                ) : null}
              </Tabs.Panel>
            ))}
          </div>
        </Tabs.Root>

        {/* Mobile / tablet: accordion */}
        <Accordion.Root defaultValue={[expertise[0].id]} className="mt-14 border-b border-line lg:hidden">
          {expertise.map((d) => (
            <Accordion.Item key={d.id} value={d.id} className="border-t border-line">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-baseline gap-4 py-5 text-left outline-none">
                  <span className="font-mono text-[11px] text-faint group-data-panel-open:text-accent">{d.index}</span>
                  <span className="text-[1.5rem] font-semibold leading-none tracking-[-0.03em]">{d.name}</span>
                  <span className="meta ml-auto text-faint">{String(d.items.length).padStart(2, "0")}</span>
                  <Plus
                    aria-hidden
                    className="size-4 shrink-0 self-center text-muted transition-transform duration-300 ease-out-expo group-data-panel-open:rotate-45"
                    strokeWidth={1.75}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-300 ease-out-expo data-ending-style:h-0 data-starting-style:h-0">
                <div className="pb-6">
                  <p className="mb-4 text-[15px] leading-relaxed text-muted">{d.summary}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {d.items.map((item) => (
                      <li key={item}>
                        <TechBadge className={cn("h-7 px-2.5 text-[12px] text-ink")}>{item}</TechBadge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
