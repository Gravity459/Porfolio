"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { ease } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { AvailabilityBadge } from "./availability-badge";
import { ThemeToggle } from "./theme-toggle";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pending = useRef<string | null>(null);

  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    pending.current = href;
    setOpen(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen && pending.current) {
          scrollToSection(pending.current);
          pending.current = null;
        }
      }}
    >
      <Dialog.Trigger
        className="meta inline-flex h-8 items-center gap-2 rounded-md px-2 text-ink transition-colors hover:bg-surface md:hidden"
        aria-label="Open menu"
      >
        Menu
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-px w-3.5 bg-current" />
          <span className="block h-px w-3.5 bg-current" />
        </span>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal keepMounted>
            <Dialog.Popup
              className="fixed inset-0 z-[60] flex flex-col bg-canvas outline-none md:hidden"
              render={
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: ease.out }}
                />
              }
            >
              <div className="shell flex h-16 items-center justify-between">
                <Dialog.Title className="text-[15px] font-semibold tracking-[-0.02em]">{site.name}</Dialog.Title>
                <div className="flex items-center gap-1">
                  <ThemeToggle />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="grid size-8 place-items-center rounded-md text-ink transition-colors hover:bg-surface"
                  >
                    <X className="size-4" strokeWidth={1.75} />
                  </Dialog.Close>
                </div>
              </div>

              <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
                <ul className="flex flex-col">
                  {navItems.map((item, i) => (
                    <m.li
                      key={item.href}
                      className="border-t border-line last:border-b"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.45, ease: ease.out }}
                    >
                      <a
                        href={item.href}
                        onClick={go(item.href)}
                        className="group flex items-baseline justify-between py-5 text-[2.5rem] font-semibold leading-none tracking-[-0.04em]"
                      >
                        {item.label}
                        <span className="meta text-faint transition-colors group-hover:text-accent">0{i + 1}</span>
                      </a>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <m.div
                className="shell flex flex-col gap-4 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <AvailabilityBadge />
                <div className="flex gap-5">
                  {[site.socials.github, site.socials.linkedin].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="meta inline-flex items-center gap-1 text-muted hover:text-ink">
                      {s.label}
                      <ArrowUpRight className="size-3" />
                    </a>
                  ))}
                  <a href={`mailto:${site.email}`} className="meta text-muted hover:text-ink">
                    Email
                  </a>
                  <a href={site.resume} target="_blank" rel="noreferrer" className="meta inline-flex items-center gap-1 text-muted hover:text-ink">
                    Résumé
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </m.div>
            </Dialog.Popup>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
