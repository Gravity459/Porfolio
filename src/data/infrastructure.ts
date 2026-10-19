import type { InfraGroup, InfraTier } from "./types";

/** AWS and adjacent services grouped by layer, with the projects they were used on. */
export const infraTiers: InfraTier[] = [
  { name: "Frontend", items: ["Next.js", "React"], where: "Fanbai" },
  { name: "CloudFront / Amplify", items: ["CloudFront", "Amplify", "Route 53"], where: "Angel · Settle Wing" },
  { name: "Load Balancer / API", items: ["Load Balancer", "FastAPI"], where: "Every project" },
  { name: "ECS / Fargate / Elastic Beanstalk", items: ["ECS", "Fargate", "Elastic Beanstalk"], where: "Angel · Settle Wing · undisclosed current project" },
  {
    name: "RDS / MongoDB / ElastiCache",
    items: ["RDS", "PostgreSQL", "MongoDB", "ElastiCache", "Redis"],
    where: "Diesel Repair · Angel · Fanbai · undisclosed current project",
  },
  { name: "S3 / R2", items: ["S3", "Cloudflare R2"], where: "Angel · Hooked AI · Fanbai" },
  {
    name: "AI Services / Bedrock / LLM APIs",
    items: ["Bedrock", "OpenAI", "Claude", "Gemini", "ElevenLabs"],
    where: "Angel · Diesel Repair · undisclosed current project",
  },
];

export const infraGroups: InfraGroup[] = [
  { name: "Delivery", items: ["Docker", "ECR", "GitHub Actions", "CI/CD"] },
  { name: "Messaging", items: ["SQS"] },
  { name: "Observability", items: ["CloudWatch", "Sentry"] },
  { name: "Security", items: ["WAF", "KMS", "Secrets Manager"] },
];

export const environments = ["Development", "Staging", "Production"] as const;
