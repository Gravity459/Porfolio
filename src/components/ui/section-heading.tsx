import { cn } from "@/lib/utils";
import { RevealText } from "./reveal-text";

type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
};

/** Editorial section opener: mono index + label, hairline, large heading. */
export function SectionHeading({ id, index, label, title, aside, className }: SectionHeadingProps) {
  return (
    <header className={cn("grid grid-cols-12 gap-x-6 gap-y-5 border-t border-line pt-5", className)}>
      <p className="meta col-span-12 flex items-center gap-3 self-start text-muted md:col-span-3 md:pt-3">
        <span className="text-ink">{index}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="type-h2 col-span-12 max-w-[18ch] text-balance md:col-span-9 lg:col-span-7">
        <RevealText text={title} />
      </h2>
      {aside ? <div className="col-span-12 self-end md:col-span-9 md:col-start-4 lg:col-span-2 lg:col-start-11 lg:text-right">{aside}</div> : null}
    </header>
  );
}
