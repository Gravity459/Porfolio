import { Fragment } from "react";
import { ShieldCheck } from "lucide-react";
import type { FlowStep } from "@/data/types";
import { cn } from "@/lib/utils";
import { FlowNode, HConnector, VConnector } from "./primitives";

type EnvironmentsDiagramProps = { environments: string[]; services: FlowStep[]; band: string };

/** Parallel environments running the same services, under one compliance band. */
export function EnvironmentsDiagram({ environments, services, band }: EnvironmentsDiagramProps) {
  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col items-stretch @xl:flex-row">
        {environments.map((env, i) => {
          const last = i === environments.length - 1;
          return (
            <Fragment key={env}>
              <li className={cn("flex-1 rounded-md border p-3", last ? "border-line-strong bg-canvas" : "border-line bg-canvas/60")}>
                <p className="meta mb-3 flex items-center gap-2 text-muted">
                  <span aria-hidden className={cn("size-1.5 rounded-full", last ? "bg-accent" : "bg-line-strong")} />
                  {env}
                </p>
                <div className="flex flex-wrap gap-1.5 @xl:flex-col">
                  {services.map((service) => (
                    <FlowNode key={service.label} {...service} className="py-1.5" />
                  ))}
                </div>
              </li>
              {!last ? (
                <li aria-hidden className="flex items-center justify-center">
                  <VConnector step={i} className="@xl:hidden" />
                  <HConnector step={i} className="mx-1.5 hidden w-6 flex-none @xl:flex" />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
      <div className="flex items-center gap-2 rounded-md border border-dashed border-accent/50 bg-accent-soft px-3 py-2 text-accent">
        <ShieldCheck aria-hidden className="size-3.5" strokeWidth={1.75} />
        <span className="meta">{band}</span>
        <span className="meta ml-auto hidden text-accent/70 @md:inline">across environments</span>
      </div>
    </div>
  );
}
