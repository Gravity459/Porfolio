"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { navItems, site } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { AvailabilityBadge, AvailabilityDot } from "./availability-badge";
import { MobileMenu } from "./mobile-menu";
import { ScrollProgress } from "./scroll-progress";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = navItems.flatMap((item) => item.sections);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const active = useActiveSection(sectionIds);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="meta absolute left-4 top-3 z-10 -translate-y-16 rounded-sm bg-ink px-3 py-2 text-canvas transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b bg-canvas/80 backdrop-blur-md transition-[opacity,border-color] duration-300",
          scrolled ? "border-line opacity-100" : "border-transparent opacity-0",
        )}
      />

      <div className={cn("shell relative flex items-center justify-between transition-[height] duration-300 ease-out-expo", scrolled ? "h-14" : "h-16 md:h-[4.5rem]")}>
        <a href="#top" className="group flex items-baseline gap-2.5" aria-label={`${site.name} — back to top`}>
          <span className="text-[15px] font-semibold tracking-[-0.025em]">{site.name}</span>
          <span className="meta hidden text-faint transition-colors group-hover:text-muted lg:inline">/ {site.title}</span>
        </a>

        <div className="flex items-center gap-2 md:gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active !== null && (item.sections as readonly string[]).includes(active);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex h-8 items-center px-2.5 text-[13.5px] tracking-[-0.01em] transition-colors duration-200",
                        isActive ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <m.span
                          layoutId="nav-active"
                          className="absolute inset-x-2.5 -bottom-px h-px bg-accent"
                          transition={{ type: "spring", stiffness: 420, damping: 38 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <span aria-hidden className="hidden h-4 w-px bg-line md:block" />
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden h-8 items-center rounded-md border border-line-strong px-3 text-[13px] tracking-[-0.01em] transition-colors hover:border-ink md:inline-flex"
          >
            Résumé
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <AvailabilityBadge className="hidden lg:inline-flex" />
          <AvailabilityDot className="md:hidden" />
          <ThemeToggle className="hidden md:grid" />
          <MobileMenu />
        </div>
      </div>

      <ScrollProgress />
    </header>
  );
}
