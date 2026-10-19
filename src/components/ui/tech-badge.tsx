import { cn } from "@/lib/utils";

/** Small monospace label for a technology. */
export function TechBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-sm border border-line px-2 font-mono text-[11px] leading-none tracking-[0.02em] text-muted transition-colors duration-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TechList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>
          <TechBadge>{item}</TechBadge>
        </li>
      ))}
    </ul>
  );
}
