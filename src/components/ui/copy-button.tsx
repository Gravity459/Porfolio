"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (permissions / insecure context); the mailto link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "meta inline-flex h-9 items-center gap-2 rounded-md border border-line-strong px-3 text-muted transition-[color,border-color,background-color,transform] duration-200 hover:border-ink hover:text-ink active:scale-[0.97]",
        copied && "border-accent text-accent hover:border-accent hover:text-accent",
        className,
      )}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy aria-hidden className={cn("absolute size-3.5 transition-all duration-300 ease-out-expo", copied ? "scale-50 opacity-0" : "scale-100 opacity-100")} />
        <Check aria-hidden className={cn("absolute size-3.5 transition-all duration-300 ease-out-expo", copied ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
      </span>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
