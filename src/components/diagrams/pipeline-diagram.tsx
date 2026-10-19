import { Fragment } from "react";
import type { FlowStep } from "@/data/types";
import { cn } from "@/lib/utils";
import { FlowNode, HConnector, VConnector } from "./primitives";

/**
 * Container-query breakpoints at which a pipeline switches from vertical to
 * horizontal. Longer pipelines need more room. Class strings stay static so
 * Tailwind can see them.
 */
const layouts = {
  xl: {
    list: "@xl:flex-row @xl:items-center",
    node: "@xl:w-auto @xl:max-w-[10rem]",
    h: "hidden @xl:flex",
    v: "@xl:hidden",
    gap: "@xl:pl-0 @xl:flex-1",
  },
  "2xl": {
    list: "@2xl:flex-row @2xl:items-center",
    node: "@2xl:w-auto @2xl:max-w-[10rem]",
    h: "hidden @2xl:flex",
    v: "@2xl:hidden",
    gap: "@2xl:pl-0 @2xl:flex-1",
  },
  "4xl": {
    list: "@4xl:flex-row @4xl:items-center",
    node: "@4xl:w-auto @4xl:max-w-[10rem]",
    h: "hidden @4xl:flex",
    v: "@4xl:hidden",
    gap: "@4xl:pl-0 @4xl:flex-1",
  },
} as const;

type PipelineDiagramProps = {
  steps: FlowStep[];
  /** Force a vertical layout regardless of available width. */
  vertical?: boolean;
  numbered?: boolean;
};

export function PipelineDiagram({ steps, vertical, numbered = true }: PipelineDiagramProps) {
  const size = steps.length <= 4 ? "xl" : steps.length === 5 ? "2xl" : "4xl";
  const l = vertical ? null : layouts[size];

  return (
    <ol className={cn("flex flex-col items-start", l?.list)}>
      {steps.map((step, i) => (
        <Fragment key={`${step.label}-${i}`}>
          <li className={cn("w-full max-w-[16rem] shrink-0", l?.node)}>
            <FlowNode {...step} index={numbered ? i : undefined} />
          </li>
          {i < steps.length - 1 ? (
            <li aria-hidden className={cn("flex pl-5", l?.gap)}>
              <VConnector step={i} className={l?.v} />
              {l ? <HConnector step={i} className={cn("mx-1", l.h)} /> : null}
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
