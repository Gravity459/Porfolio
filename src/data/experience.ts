import type { Role } from "./types";

export const experience: Role[] = [
  {
    title: "Full Stack AI Engineer",
    company: "ZOD AI",
    period: "Sep 2026 – Present",
    current: true,
    summary:
      "Engineer on CR8 AI, a six-service AI design platform. Built its Gemini document pipeline, DINOv2 duplicate detection and resumable Rust uploads, and set up CI/CD on AWS.",
    focus: ["LangGraph", "Gemini", "FastAPI", "NestJS", "React", "TypeScript", "Rust (Tauri)", "DINOv2", "Azure", "AWS", "GitHub Actions"],
  },
  {
    title: "AI Backend Engineer",
    company: "Kodexo Labs",
    period: "May 2025 – Sep 2026",
    summary:
      "Built LLM agents and FastAPI APIs with tool calling, voice and audio features with ElevenLabs and Claude, and CI/CD with Docker and GitHub Actions for AWS deployments.",
    focus: ["LLM agents", "LangChain", "LangGraph", "LangSmith", "FastAPI", "RAG", "Guardrails AI", "ElevenLabs", "Claude", "AWS"],
  },
  {
    title: "Full Stack Engineer",
    company: "Bleed AI (remote)",
    period: "Sep 2023 – Apr 2025",
    summary:
      "Fully remote. Built FastAPI REST APIs with streaming responses and PostgreSQL data models, kept a cross-platform Electron desktop app running in production, and provisioned AWS and Cloudflare R2 infrastructure.",
    focus: ["FastAPI", "PostgreSQL", "SQLModel", "Streaming", "Electron", "Next.js", "AWS", "Cloudflare R2"],
  },
];
