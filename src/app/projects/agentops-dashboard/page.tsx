import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentOps Dashboard — Francesco Sardo",
  description: "Case study: AgentOps Dashboard — local read-only dashboard for Claude Code internals",
};

const METRICS = [
  { value: "12", label: "Data Domains" },
  { value: "2", label: "Agents (Claude + Gemini)" },
  { value: "Daily", label: "Usage" },
  { value: "Read-only", label: "Design Constraint" },
];

const IMAGES = [
  {
    src: "/img/agent-dash1.png",
    alt: "AgentOps Dashboard — main overview",
    caption: "Dashboard overview — unified snapshot of the agent environment",
  },
  {
    src: "/img/agent-dash2.png",
    alt: "AgentOps Dashboard — memory hub",
    caption: "Memory Hub — filterable timeline of observations across projects",
  },
  {
    src: "/img/agent-dash3.png",
    alt: "AgentOps Dashboard — tooling page",
    caption: "Tooling page — all installed tools across Homebrew, npm, pip, Cargo, and more",
  },
];

export default function AgentOpsDashboardPage() {
  return (
    <CaseStudyLayout
      title="AgentOps Dashboard"
      statusLabel="● PRIVATE — Daily Driver"
      statusColor="text-amber-400 border-amber-400/30"
      tagline="Local read-only web dashboard that makes Claude Code internals visible. Built for personal daily use — 12 data domains, dual agent support (Claude + Gemini), zero write access to the filesystem."
      techStack={["Next.js", "React 19", "TypeScript", "FastAPI", "Python", "Tailwind CSS 4", "shadcn/ui", "SQLite", "PM2"]}
      metrics={METRICS}
      images={IMAGES}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Problem</h2>
        <p>
          Claude Code operates as a black box. Config, skills, rules, memory observations, agent definitions,
          token usage, installed commands — all scattered across the filesystem with no unified view.
          Debugging agent behavior or auditing what Claude actually has access to meant manual file reads
          across dozens of directories.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// My Role</h2>
        <p>
          Sole developer. Designed and built from scratch as a personal tool — no external users, no
          feature requests, no product requirements. Iterated daily based on real usage. The constraint
          of building for yourself is a useful forcing function: every feature has to justify its existence
          in the first 30 seconds of opening the app.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Architecture</h2>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs">
          <div className="flex flex-wrap gap-2 items-center text-zinc-500">
            <span className="text-amber-400">Next.js :3000</span>
            <span>→</span>
            <span className="text-blue-400">FastAPI :8000</span>
            <span>→</span>
            <span className="text-green-400">Filesystem readers</span>
            <span>+</span>
            <span className="text-purple-400">SQLite (claude-mem)</span>
          </div>
          <div className="mt-3 text-zinc-600">
            PM2 manages both processes via start.sh / stop.sh
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            ["WAL proxy for SQLite", "The claude-mem worker holds an exclusive write lock on its WAL file. A second connection returns 0 frames — the worker won't release. Solution: proxy through the worker's own HTTP API at :37777, paginating 100 rows at a time, with direct SQLite fallback if the worker is unreachable."],
            ["Dual-agent architecture", "Every API endpoint accepts ?agent=claude|gemini. Readers branch on this param to select the correct directories (~/.claude/ vs ~/.gemini/). The frontend AgentContext drives all page re-fetches on toggle. Agent-agnostic endpoints (tokens, Obsidian) accept but ignore the param."],
            ["Resilient parallel fetch", "The dashboard landing page uses Promise.allSettled for dual-agent data fetches. One agent misconfiguration doesn't break the page — partial data renders, errors surface as status pills."],
            ["Read-only constraint", "No write endpoints. The dashboard never mutates Claude config, memory, or any file. CORS locked to localhost:3000. This constraint removes an entire class of risk and lets me run it persistently without concern."],
            ["Process management with PM2", "Both backend and frontend run as PM2 processes. start.sh / stop.sh wrap the lifecycle. Logs, restarts, and crash recovery handled by PM2 rather than manual terminal sessions."],
          ].map(([title, desc]) => (
            <div key={title as string} className="flex gap-3">
              <span className="text-amber-400/50 shrink-0 mt-0.5">▪</span>
              <div>
                <span className="text-zinc-300">{title}: </span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Data Domains</h2>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-zinc-500">
            {[
              ["Config", "~/.claude/settings.json — global + project merged"],
              ["Skills", "~/.claude/skills/ — frontmatter: name, description, tools"],
              ["Plugins", "~/.claude/plugins/cache/ — manifests + GitHub READMEs"],
              ["Rules", "~/.claude/rules/ — full Markdown content"],
              ["Memory", "CLAUDE.md + claude-mem worker HTTP API"],
              ["Agents", "~/.claude/agents/*.md — model, tools, color"],
              ["Commands", "~/.claude/commands/*.md — all 68 commands"],
              ["Plans", "~/.claude/plans/*.md — content + slide-over preview"],
              ["Scripts", "~/.claude/scripts/"],
              ["Tokens", "codeburn CLI — 5-min /tmp cache, mock fallback"],
              ["Obsidian", "Fixed vault — agent-agnostic"],
              ["Tooling", "Homebrew + npm + pip + Cargo + Go + RubyGems"],
            ].map(([domain, source]) => (
              <div key={domain as string} className="flex gap-2">
                <span className="text-amber-400 shrink-0">{domain}</span>
                <span className="text-zinc-600">— {source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
