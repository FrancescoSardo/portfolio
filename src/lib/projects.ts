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
    statusLabel: "● PRIVATE — Daily Driver",
    hook: "Local read-only dashboard that makes Claude Code internals visible — 12 data domains across config, skills, memory, tokens, agents, and tooling, with dual Claude + Gemini agent support.",
    techStack: ["Next.js", "React 19", "TypeScript", "FastAPI", "Python", "Tailwind CSS 4", "shadcn/ui", "SQLite"],
    metrics: "12 Data Domains · Claude + Gemini · Daily Use · Read-only",
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
    hook: "Open-source contribution to claude-code-router — added Gemini CLI provider support via a new transformer, persistent process pool, and a provider health-check UI with live test button.",
    techStack: ["TypeScript", "Fastify", "React", "Vite", "Node.js", "NDJSON"],
    metrics: "1 transformer · 1 process manager · 1 API route · cli:// URL scheme",
    links: {
      caseStudy: "/projects/claude-code-router",
      github: "https://github.com/musistudio/claude-code-router",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
