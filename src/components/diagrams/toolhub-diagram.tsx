import type { FlowStep } from "@/data/types";
import { FlowNode, HConnector, VConnector } from "./primitives";

type ToolHubDiagramProps = { input: FlowStep; hub: FlowStep; tools: FlowStep[] };

function Tools({ tools }: { tools: FlowStep[] }) {
  return (
    <ul className="relative flex flex-col gap-2.5">
      <span aria-hidden className="absolute bottom-5 left-0 top-5 w-px bg-line-strong" />
      {tools.map((tool, i) => (
        <li key={tool.label} className="flex items-center">
          <HConnector step={i + 1} className="w-6 flex-none" />
          <FlowNode {...tool} className="ml-1" />
        </li>
      ))}
    </ul>
  );
}

/** One agent fanning out to the tools it can call. */
export function ToolHubDiagram({ input, hub, tools }: ToolHubDiagramProps) {
  return (
    <>
      <div className="hidden items-center @xl:flex">
        <FlowNode {...input} className="shrink-0" />
        <HConnector step={0} className="mx-1 max-w-16" />
        <FlowNode {...hub} emphasis className="shrink-0" />
        <span aria-hidden className="h-px w-6 shrink-0 bg-line-strong" />
        <Tools tools={tools} />
      </div>

      <div className="flex flex-col items-start @xl:hidden">
        <FlowNode {...input} />
        <VConnector step={0} className="ml-5" />
        <FlowNode {...hub} emphasis />
        <VConnector step={1} arrow={false} className="ml-5 h-4" />
        <div className="ml-[1.625rem]">
          <Tools tools={tools} />
        </div>
      </div>
    </>
  );
}
