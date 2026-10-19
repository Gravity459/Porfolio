import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid grid-cols-12 gap-y-6 py-10">
        <div className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
          <p className="text-[14px] font-medium tracking-[-0.01em]">
            {site.name} <span className="text-muted">— {site.title}</span>
          </p>
          <p className="font-mono text-[12px] text-faint">Built with curiosity, caffeine &amp; code.</p>
        </div>
        <div className="col-span-12 flex items-center gap-1 md:col-span-6 md:justify-end">
          <a
            href={site.socials.github.href}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={site.socials.linkedin.href}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <span aria-hidden className="mx-2 h-4 w-px bg-line" />
          <a href="#top" className="meta group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink">
            Back to top
            <ArrowUp className="size-3 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="meta col-span-12 text-faint">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
