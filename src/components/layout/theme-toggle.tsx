"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Follow the OS setting until the visitor picks a theme explicitly.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMedia = (event: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    } catch {}
    document.documentElement.setAttribute("data-theme", event.matches ? "dark" : "light");
  };
  media.addEventListener("change", onMedia);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMedia);
  };
}

const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className={cn(
        "group relative grid size-8 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-surface hover:text-ink active:scale-95",
        className,
      )}
    >
      <Sun
        aria-hidden
        className="col-start-1 row-start-1 size-[15px] rotate-0 scale-100 transition-all duration-300 ease-out-expo dark:-rotate-90 dark:scale-0"
        strokeWidth={1.75}
      />
      <Moon
        aria-hidden
        className="col-start-1 row-start-1 size-[15px] rotate-90 scale-0 transition-all duration-300 ease-out-expo dark:rotate-0 dark:scale-100"
        strokeWidth={1.75}
      />
    </button>
  );
}
