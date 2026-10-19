export type FlowStep = {
  label: string;
  sub?: string;
  /** Visual role of the step. `io` = system boundary, `human` = manual checkpoint. */
  variant?: "default" | "io" | "human";
};

export type Diagram =
  | { kind: "pipeline"; steps: FlowStep[] }
  | { kind: "rag"; steps: FlowStep[]; branchAt: number; branch: FlowStep[] }
  | { kind: "supervisor"; supervisor: FlowStep; agents: FlowStep[]; output: FlowStep }
  | { kind: "toolhub"; input: FlowStep; hub: FlowStep; tools: FlowStep[] }
  | { kind: "stack"; layers: { label: string; items: FlowStep[] }[] }
  | {
      kind: "environments";
      environments: string[];
      services: FlowStep[];
      band: string;
    };

export type ProjectLayout = "feature" | "wide" | "split-left" | "split-right" | "pair" | "row";

/** Deployment state shown on cards and in the case study. */
export type ProjectStatus = "live" | "offline" | "prototype";

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  layout: ProjectLayout;
  /** Only when the role is explicitly known. */
  role?: string;
  status?: ProjectStatus;
  /** Who else was on the project. */
  team?: string;
  overview: string;
  /** Measured or observed results. Only real numbers — never estimates dressed as facts. */
  outcomes?: string[];
  contribution: string[];
  stack: string[];
  highlights: [string, string, string];
  architecture: Diagram;
  /** Plain-language summary of the diagram for screen readers. */
  architectureLabel: string;
  challenges?: string[];
  links?: { label: string; href: string }[];
  /** Screenshots from /public. Blur any personal or client data before adding. */
  media?: { src: string; alt: string; width: number; height: number; caption?: string }[];
};

export type SkillDomain = {
  id: string;
  index: string;
  name: string;
  summary: string;
  items: string[];
};

export type Role = {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  focus: string[];
};

export type InfraTier = {
  name: string;
  items: string[];
  /** Where these services were used. */
  where?: string;
};

export type InfraGroup = {
  name: string;
  items: string[];
};
