import { Fragment } from "react";
import type { FlowStep } from "@/data/types";
import { FlowNode, HConnector, VConnector } from "./primitives";

type RagDiagramProps = { steps: FlowStep[]; branchAt: number; branch: FlowStep[] };

/**
 * Query path runs left → right; the ingestion branch sits underneath the
 * retrieval step and feeds it from below.
 */
export function RagDiagram({ steps, branchAt, branch }: RagDiagramProps) {
  const store = branch[branch.length - 1];
  const sources = branch.slice(0, -1);
  const column = branchAt * 2 + 1;

  return (
    <>
      {/* Wide: grid of nodes and connectors */}
      <div
        className="hidden items-center @2xl:grid"
        style={{ gridTemplateColumns: steps.map((_, i) => (i === 0 ? "auto" : "minmax(1rem,1fr) auto")).join(" ") }}
      >
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            {i > 0 ? <HConnector step={i - 1} className="mx-1" /> : null}
            <FlowNode {...step} index={i} className="max-w-[8.5rem]" />
          </Fragment>
        ))}
        <div className="flex justify-start pl-5" style={{ gridColumn: column, gridRow: 2 }}>
          <VConnector step={0} reverse />
        </div>
        <div className="flex items-center" style={{ gridColumn: `${column} / -1`, gridRow: 3 }}>
          <FlowNode {...store} className="shrink-0" />
          {sources.map((source, i) => (
            <Fragment key={source.label}>
              <HConnector reverse dashed step={i} className="mx-1 max-w-20" />
              <FlowNode {...source} className="shrink-0" />
            </Fragment>
          ))}
        </div>
      </div>

      {/* Narrow: vertical path with an indented branch */}
      <ol className="flex flex-col items-start @2xl:hidden">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <li className="w-full max-w-[16rem]">
              <FlowNode {...step} index={i} />
            </li>
            {i === branchAt ? (
              <li className="my-2 ml-5 flex flex-col gap-2 border-l border-dashed border-line-strong pl-4">
                <span className="meta text-faint">&uarr; feeds retrieval</span>
                <FlowNode {...store} />
                {sources.map((source) => (
                  <FlowNode key={source.label} {...source} />
                ))}
              </li>
            ) : null}
            {i < steps.length - 1 ? (
              <li aria-hidden className="pl-5">
                <VConnector step={i} />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </>
  );
}
