import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { RevealText } from "@/components/ui/reveal-text";
import { site } from "@/data/site";

const links = [
  { ...site.socials.linkedin, Icon: LinkedInIcon },
  { ...site.socials.github, Icon: GitHubIcon },
  { label: "Résumé", handle: "PDF", href: site.resume, Icon: FileText },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden pb-16 pt-20 md:pb-24 md:pt-28">
      <div className="shell">
        <div className="grid grid-cols-12 gap-x-6 border-t border-line pt-5">
          <p className="meta col-span-12 flex items-center gap-3 self-start text-muted md:col-span-3 md:pt-3">
            <span className="text-ink">06</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>Contact</span>
          </p>
        </div>

        <h2 id="contact-title" className="type-display mt-12 max-w-[14ch] text-balance md:mt-20">
          <RevealText text="Have something worth building?" />
          <span className="mt-2 block text-muted md:mt-3">
            <RevealText text="Let's build it" accentStop delay={0.25} />
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-24">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="meta mb-4 text-faint">Email</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-3 text-[clamp(1.5rem,3.6vw,2.75rem)] font-semibold leading-none tracking-[-0.035em]"
              >
                <Mail aria-hidden className="size-[0.7em] text-muted transition-colors duration-300 group-hover:text-accent" strokeWidth={1.5} />
                <span className="link-underline pb-1">{site.email}</span>
              </a>
              <CopyButton value={site.email} label="Copy" />
            </div>
            <p className="meta mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span className="text-ink">{site.location}</span>
              <span aria-hidden className="h-px w-4 bg-line-strong" />
              <span>{site.remote}</span>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="meta mb-4 text-faint">Elsewhere</p>
            <ul className="border-b border-line">
              {links.map(({ label, handle, href, Icon }) => (
                <li key={label} className="border-t border-line">
                  <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-4">
                    <Icon className="size-4 text-muted transition-colors duration-300 group-hover:text-ink" />
                    <span className="text-[16px] font-medium tracking-[-0.015em]">{label}</span>
                    <span className="font-mono text-[12px] text-faint">{handle}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="ml-auto size-4 text-muted transition-[transform,color] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      strokeWidth={1.75}
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
