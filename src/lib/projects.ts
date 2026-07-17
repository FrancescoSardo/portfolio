import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "bloomticket",
    number: "01",
    title: "BLOOMTICKET",
    status: "live",
    statusLabel: "● LIVE — App Store + Google Play",
    hook: "Co-founded and led mobile development of a production event ticketing platform serving real customers across iOS and Android.",
    techStack: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "Stripe", "NativeWind"],
    metrics: "iOS ✓ · Android ✓ · Live in Production · App Store + Google Play",
    links: {
      caseStudy: "/projects/bloomticket",
      appStore: "https://apps.apple.com/it/app/bloomticket/id6744039750",
      live: "https://bloomticket.com",
    },
  },
  {
    slug: "agentops-dashboard",
    number: "03",
    title: "AGENTOPS DASHBOARD",
    status: "private",
    statusLabel: "● PRIVATE — Daily Driver (AGY in progress)",
    hook: "Local read-only dashboard that makes agent internals visible across config, skills, memory, tokens, agents, hooks, and a Network session inspector for browsing conversation history and tool usage. Expanding dual-mode support to Google Antigravity (AGY) CLI (in progress) and orchestrating a custom seamless workflow integration between claude-mem and Antigravity CLI for cross-session context injection.",
    techStack: ["Next.js", "React 19", "TypeScript", "FastAPI", "Python", "Tailwind CSS 4", "shadcn/ui", "SQLite"],
    metrics: "13 Data Domains · Claude + AGY · Network Inspector · claude-mem Integration · Read-only",
    links: {
      caseStudy: "/projects/agentops-dashboard",
    },
  },
  {
    slug: "claude-code-router",
    number: "04",
    title: "CLAUDE CODE ROUTER",
    status: "contribution",
    statusLabel: "● OSS CONTRIBUTION — Merged",
    hook: "Open-source contribution to claude-code-router — integrated AGY CLI as a local, API-key-free provider via a new transformer, subprocess runner with SSE streaming, and cross-session conversation continuity.",
    techStack: ["TypeScript", "Fastify", "Node.js", "SSE", "NDJSON", "SQLite"],
    metrics: "1 transformer · SSE streaming · session map · cli:// URL scheme",
    links: {
      caseStudy: "/projects/claude-code-router",
      github: "https://github.com/musistudio/claude-code-router",
    },
  },
  {
    slug: "antigravity-workers",
    number: "05",
    title: "ANTIGRAVITY WORKERS",
    status: "private",
    statusLabel: "● PRIVATE — Daily Driver",
    hook: "Multi-agent orchestration system where Claude Code delegates research, architecture review, code review, and long-context analysis to a pool of four read-only Antigravity (AGY) CLI workers with hard-capped outputs. Migrated from Gemini CLI to the AGY invoker.",
    techStack: ["Bash", "Claude Code", "Antigravity CLI", "Python", "JSONL"],
    metrics: "4 Workers · 54/54 Tests · Read-only Execution · Model Fallback Chain",
    links: {
      caseStudy: "/projects/antigravity-workers",
    },
  },
  {
    slug: "cwl-editor",
    number: "02",
    title: "CWL VISUAL EDITOR",
    status: "thesis",
    statusLabel: "● MSc THESIS · Apr 2026",
    hook: "Visual low-code IDE for scientific pipelines — bidirectional CWL parser, real-time type checking, TAM score 5.02/7 in domain expert user study.",
    techStack: ["React 19", "TypeScript", "ReactFlow", "Redux Toolkit", "Jest", "YAML"],
    metrics: "~3,100 lines parser · TAM 5.02/7 · 100% round-trip fidelity · 0 structural runtime errors",
    links: {
      caseStudy: "/projects/cwl-editor",
    },
  },
  {
    slug: "shopi-pulse",
    number: "06",
    title: "SHOPI PULSE",
    isNew: true,
    status: "live",
    statusLabel: "● LIVE — Shopify App (Production + Staging)",
    hook: "Shopify store optimization platform — an AI agent orchestrator reads live store data through the Shopify Admin API and executes approved changes (pricing, inventory, product content) under a human-approval guardrail.",
    techStack: ["NestJS", "Next.js", "Prisma", "PostgreSQL", "Redis", "Turborepo", "Shopify API", "Claude / OpenRouter"],
    metrics: "pnpm/Turborepo monorepo · SSE streaming agent loop · multi-provider LLM · human-approval writes",
    links: {
      caseStudy: "/projects/shopi-pulse",
      live: "https://app.pulse-ai.uk",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
