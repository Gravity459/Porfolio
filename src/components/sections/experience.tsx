import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading id="experience-title" index="03" label="Experience" title="Where the work happened." />

        <ol className="mt-16 md:mt-20">
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company} delay={i * 0.06} className="group grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line py-8 md:py-10 last:border-b">
              <div className="col-span-12 flex items-center gap-3 self-start md:col-span-3 md:pt-2.5">
                <span
                  aria-hidden
                  className={cn("relative inline-flex size-1.5 rounded-full", role.current ? "bg-accent" : "bg-line-strong")}
                >
                  {role.current ? <span className="soft-ping absolute inset-0 rounded-full bg-accent" /> : null}
                </span>
                <span className="meta text-muted">{role.period}</span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{role.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{role.company}</p>
              </div>
              <div className="col-span-12 flex flex-col gap-4 md:col-span-5">
                <p className="text-[15.5px] leading-relaxed text-ink/90">{role.summary}</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5" aria-label={`Focus at ${role.company}`}>
                  {role.focus.map((f, j) => (
                    <li key={f} className="font-mono text-[11.5px] text-muted">
                      {f}
                      {j < role.focus.length - 1 ? <span aria-hidden className="ml-3 text-faint">/</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
