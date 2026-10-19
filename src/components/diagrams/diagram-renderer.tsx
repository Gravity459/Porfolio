import type { Diagram } from "@/data/types";
import { EnvironmentsDiagram } from "./environments-diagram";
import { PipelineDiagram } from "./pipeline-diagram";
import { RagDiagram } from "./rag-diagram";
import { StackDiagram } from "./stack-diagram";
import { SupervisorDiagram } from "./supervisor-diagram";
import { ToolHubDiagram } from "./toolhub-diagram";

export function DiagramRenderer({ diagram, vertical }: { diagram: Diagram; vertical?: boolean }) {
  switch (diagram.kind) {
    case "pipeline":
      return <PipelineDiagram steps={diagram.steps} vertical={vertical} />;
    case "rag":
      return <RagDiagram {...diagram} />;
    case "supervisor":
      return <SupervisorDiagram {...diagram} />;
    case "toolhub":
      return <ToolHubDiagram {...diagram} />;
    case "stack":
      return <StackDiagram layers={diagram.layers} />;
    case "environments":
      return <EnvironmentsDiagram {...diagram} />;
  }
}
