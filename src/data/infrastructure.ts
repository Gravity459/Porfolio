import type { InfraGroup, InfraTier } from "./types";

/** AWS and adjacent services grouped by layer, with the projects they were used on. */
export const infraTiers: InfraTier[] = [
  { name: "Frontend", items: ["Next.js", "React"], where: "Fanbai" },
  { name: "CloudFront / Amplify", items: ["CloudFront", "Amplify", "Route 53"], where: "Angel · Settle Wing" },
  { name: "Load Balancer / API", items: ["Load Balancer", "FastAPI", "NestJS"], where: "Angel · Settle Wing · CR8 AI" },
  { name: "Elastic Beanstalk / EC2", items: ["Elastic Beanstalk", "EC2", "Nginx"], where: "Angel · Settle Wing · CR8 AI" },
  {
    name: "RDS / PostgreSQL / MongoDB",
    items: ["RDS", "PostgreSQL", "MongoDB"],
    where: "Diesel Repair · Angel · Settle Wing · Fanbai · CR8 AI",
  },
  { name: "S3 / R2 / Azure Blob", items: ["S3", "Cloudflare R2", "Azure Blob Storage"], where: "Angel · Hooked AI · Fanbai · CR8 AI" },
  {
    name: "AI Services / LLM APIs",
    items: ["Claude", "Gemini", "OpenAI", "LLaMA", "ElevenLabs"],
    where: "Angel · Diesel Repair · CR8 AI",
  },
];

export const infraGroups: InfraGroup[] = [
  { name: "Delivery", items: ["Docker", "GitHub Actions", "CI/CD"] },
  { name: "Messaging", items: ["SQS", "Azure queues"] },
  { name: "Observability", items: ["Sentry", "LangSmith", "Langfuse"] },
  { name: "Security", items: ["WAF", "KMS", "Secrets Manager"] },
];

export const environments = ["Development", "Staging", "Production"] as const;
