import type { FlowStep } from "@/data/types";
import { FlowNode, HConnector, VConnector } from "./primitives";

type SupervisorDiagramProps = { supervisor: FlowStep; agents: FlowStep[]; output: FlowStep };

/** Supervisor delegates down to agents; agents report back up. */
export function SupervisorDiagram({ supervisor, agents, output }: SupervisorDiagramProps) {
  const inset = `${50 / agents.length}%`;

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center">
        <div className="flex flex-col items-center">
          <FlowNode {...supervisor} emphasis />
          <VConnector arrow={false} step={0} className="h-5" />
        </div>
        <div className="flex h-[3.25rem] items-center">
          <HConnector step={1} className="w-8 flex-none @md:w-14" />
          <FlowNode {...output} />
        </div>
      </div>

      <div className="relative">
        <span aria-hidden className="absolute top-0 h-px bg-line-strong" style={{ left: inset, right: inset }} />
        <ul className="grid" style={{ gridTemplateColumns: `repeat(${agents.length}, minmax(0, 1fr))` }}>
          {agents.map((agent, i) => (
            <li key={i} className="flex flex-col items-center px-1">
              <div className="flex gap-1">
                <VConnector step={i + 1} />
                <VConnector step={i + 3} reverse className="opacity-70" />
              </div>
              <FlowNode {...agent} className="w-full max-w-[8rem] items-center text-center" />
            </li>
          ))}
        </ul>
      </div>

      <p aria-hidden className="meta mt-4 flex justify-center gap-4 text-faint">
        <span>&darr; delegate</span>
        <span>&uarr; report</span>
      </p>
    </div>
  );
}
