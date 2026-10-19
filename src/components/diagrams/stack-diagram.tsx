import { Fragment } from "react";
import type { FlowStep } from "@/data/types";
import { FlowNode, VConnector } from "./primitives";

type StackDiagramProps = { layers: { label: string; items: FlowStep[] }[] };

/** Layered architecture, top (client) to bottom (services). */
export function StackDiagram({ layers }: StackDiagramProps) {
  return (
    <ol className="flex flex-col @2xl:mx-auto @2xl:w-fit @2xl:min-w-[26rem]">
      {layers.map((layer, i) => (
        <Fragment key={layer.label}>
          <li className="grid grid-cols-[4.5rem_1fr] items-center gap-3 @md:grid-cols-[6.5rem_1fr] @md:gap-5">
            <span className="meta flex items-center gap-2 text-faint">
              <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
              {layer.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <FlowNode key={item.label} {...item} />
              ))}
            </div>
          </li>
          {i < layers.length - 1 ? (
            <li aria-hidden className="grid grid-cols-[4.5rem_1fr] gap-3 @md:grid-cols-[6.5rem_1fr] @md:gap-5">
              <span />
              <VConnector step={i} className="ml-5" />
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
