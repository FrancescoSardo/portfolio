import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentOps Dashboard — Francesco Sardo",
  description: "Case study: AgentOps Dashboard — local read-only dashboard for Claude Code internals",
};

const METRICS = [
  { value: "12", label: "Data Domains" },
  { value: "3", label: "Agents (Claude, Gemini, AGY)" },
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
  {
    src: "/img/agent-kg.png",
    alt: "AgentOps Dashboard — knowledge graph",
    caption: "Knowledge Graph — visual representation of agent memory and cross-references",
  },
  {
    src: "/img/agent-token.png",
    alt: "AgentOps Dashboard — token usage",
    caption: "Token usage — real-time monitoring across models and providers",
  },
];

export default function AgentOpsDashboardPage() {
  return (
    <CaseStudyLayout
      title="AgentOps Dashboard"
      statusLabel="● PRIVATE — Daily Driver"
      statusColor="text-amber-400 border-amber-400/30"
      tagline="Local read-only web dashboard that makes AI agent internals visible. Built for personal daily use — 12 data domains, expanding agent support (Claude, Gemini, and Google Antigravity CLI in progress), and a custom workflow integration with claude-mem for cross-session context."
      techStack={["Next.js", "React 19", "TypeScript", "FastAPI", "Python", "Tailwind CSS 4", "shadcn/ui", "SQLite", "Caddy", "Tailscale"]}
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
            ["Antigravity (AGY) Integration (In Progress)", "Expanding beyond Claude/Gemini to support Google Antigravity. Built a dedicated AGY mode featuring a real-time projects grid, custom URI handlers (antigravity-ide://) to launch the native IDE directly from the web, and a unified hooks visualizer to parse complex lifecycle events."],
            ["claude-mem × AGY Integration", "Wired the claude-mem MCP plugin into AGY's PreInvocation hook lifecycle so every new AGY session opens with the 50 most recent project observations injected as a system message. The hook reads the daemon port from ~/.claude-mem/worker.pid at runtime — bypassing the bun subprocess entirely — because worker-service.cjs computes port 37700+(uid%100)=37701 while the actual daemon runs on 37777. Calling the HTTP REST API directly (GET /api/observations?limit=50&project=<name>) returns 4k+ bytes of real cross-session context. A per-conversationId lockfile in /tmp/ ensures injection fires only on the first message, not every turn."],
            ["Resilient parallel fetch", "The dashboard landing page uses Promise.allSettled for dual-agent data fetches. One agent misconfiguration doesn't break the page — partial data renders, errors surface as status pills."],
            ["Read-only constraint", "No write endpoints. The dashboard never mutates config, memory, or any file. CORS locked to localhost:3000. This constraint removes an entire class of risk and lets me run it persistently without concern."],
            ["Security & Infrastructure", "Hardened security using a Caddy reverse proxy and enforced Tailscale-only access for sensitive API routes. Both backend and frontend run as PM2 processes managed by start.sh / stop.sh."],
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
        <h2 className="font-mono text-base text-zinc-200 mb-3">// claude-mem × AGY: Cross-Session Memory Integration</h2>
        <p className="mb-4">
          The highest-value integration in the stack: wiring the{" "}
          <code className="text-amber-400 text-xs">claude-mem</code> MCP plugin — a persistent
          SQLite observation store that records every Claude Code session — into the Antigravity CLI
          hook lifecycle, so AGY opens each new conversation with full cross-session context.
        </p>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs mb-4">
          <div className="text-zinc-500 mb-2 text-zinc-400">AGY hook tree</div>
          <div className="flex flex-col gap-1 text-zinc-500">
            <div><span className="text-amber-400">PreInvocation</span> — claude-mem-context.py → injects 50 obs as system message (first turn only)</div>
            <div><span className="text-amber-400">PreInvocation</span> — dev-mode-reminder → injects dev hint (first turn only)</div>
            <div><span className="text-blue-400">PostToolUse</span> — agy-observation-hook.sh → writes new observation to SQLite</div>
            <div><span className="text-purple-400">Stop</span> — agy-observation-hook.sh → writes final session observation</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {[
            [
              "Port discovery via worker.pid",
              "worker-service.cjs computes its port as 37700+(uid%100) — for uid=501 that's 37701. The running daemon is on 37777 (set in settings.json). Calling the worker via bun from inside a hook subprocess produces the wrong port, spawns a fresh empty worker, and returns no memory. Fix: read ~/.claude-mem/worker.pid at runtime to get the actual port, then call GET /api/observations?limit=50&project=<name> directly over HTTP. Returns 4k+ bytes of real cross-session context instead of zero.",
            ],
            [
              "First-turn lockfile pattern",
              "AGY's invocationNum is always 0 — it never increments between messages within a session. Cannot use it to detect first-turn. Instead: touch /tmp/agy-mem-seen-<conversationId> on the first hook fire; return {} immediately on all subsequent fires where the lockfile exists. conversationId is stable for the full session, so the lock correctly fires exactly once per conversation.",
            ],
            [
              "snake_case proto fields",
              "AGY's hook return format uses protobuf under the hood. All field names must be snake_case. inject_steps → system_message → system_message is correct. systemMessage (camelCase) is silently ignored — no error, no effect. This was a multi-session debugging blind spot caught via /tmp/agy-claudemem.log (msg_len=0 despite successful HTTP call).",
            ],
            [
              "Two-layer memory injection (important distinction)",
              "When using AGY as a CCR provider (cli://agy), the MEMORY INJECTED block that appears in CCR's output comes from AGY's PreInvocation hook — it's AGY printing its own injected context to stdout. This is separate from Claude Code's own MCP system-reminder injection. CCR strips the AGY layer by splitting on ━━━ delimiters; the Claude Code layer is handled by the MCP plugin independently.",
            ],
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
