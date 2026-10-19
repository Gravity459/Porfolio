import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function AvailabilityDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-1.5", className)}>
      <span className="soft-ping absolute inset-0 rounded-full bg-accent" />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

export function AvailabilityBadge({ className, compact }: { className?: string; compact?: boolean }) {
  if (!site.availability.open) return null;
  return (
    <span className={cn("meta inline-flex items-center gap-2 text-muted", className)}>
      <AvailabilityDot />
      <span className={cn(compact && "sr-only")}>{site.availability.label}</span>
    </span>
  );
}
