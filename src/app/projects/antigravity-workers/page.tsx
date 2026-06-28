import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antigravity Workers — Francesco Sardo",
  description:
    "Multi-agent orchestration: Claude Code as orchestrator delegating to a pool of four read-only Antigravity (AGY) CLI worker agents with capped outputs and full observability",
};

const METRICS = [
  { value: "4", label: "Worker Agents" },
  { value: "54/54", label: "Tests Passing" },
  { value: "400-600", label: "Word Output Cap" },
  { value: "AGY", label: "CLI Invoker" },
];

export default function GeminiWorkersPage() {
  return (
    <CaseStudyLayout
      title="Antigravity Workers"
      statusLabel="● PRIVATE — Daily Driver"
      statusColor="text-amber-400 border-amber-400/30"
      tagline="Production multi-agent system where Claude Code plans, routes, and synthesizes while four specialized Antigravity (AGY) CLI workers do the heavy reading — research, architecture review, code review, and whole-codebase analysis — each returning a hard-capped, structured report. Migrated from Gemini CLI to the AGY invoker."
      techStack={["Bash", "Claude Code", "Antigravity CLI", "Python", "JSONL"]}
      metrics={METRICS}
      images={[]}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Context</h2>
        <p>
          Claude Code&apos;s context window is the scarce resource in agentic coding sessions.
          Whole-repository analysis, large documentation synthesis, and second-opinion reviews burn
          tokens that the orchestrating agent needs for planning and synthesis. The worker pool
          started on Gemini CLI, then migrated to the Antigravity (AGY) CLI — a local, API-key-free
          binary with its own large context window and cross-session memory. The missing piece was a
          disciplined delegation layer that keeps Claude in charge and keeps worker output cheap.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// What I Built</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "Reusable worker wrapper",
              "Single Bash entrypoint (agy-worker.sh) that loads a role's system prompt, selects its model, runs agy headless in read-only plan mode, enforces a watchdog timeout (macOS has no timeout binary), and logs every run as JSONL — timestamp, worker, task, model, duration, exit code.",
            ],
            [
              "Four role-specialized workers",
              "agy-research (repo/docs analysis), agy-architect (design and migration review), agy-reviewer (severity-tagged findings with an APPROVE/WARN/BLOCK verdict), agy-longcontext (whole-codebase questions). Each role file defines a strict output contract capping responses at 400-600 words.",
            ],
            [
              "Thin Claude Code subagents + routing skill",
              "Four Haiku-powered relay subagents symlinked into ~/.claude/agents, plus the Antigravity-worker (gemini-delegate) skill with an explicit routing table, user-visible 'Delegating to agy-X...' status messages, and parallel dispatch rules. Idempotent installer with uninstall and settings.json backup.",
            ],
            [
              "Model fallback chain",
              "Roles target AGY's primary model with automatic single-retry fallback on 429 capacity errors or removed preview models. Priority: env override → role file fallback → default pairing heuristic.",
            ],
            [
              "Dual-side observability",
              "Worker-side JSONL log records every execution; a Claude Code PostToolUse hook adds orchestrator-side entries with session ID and working directory. A logs subcommand renders delegation history in one line per run.",
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
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Architecture</h2>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs">
          <div className="flex flex-wrap gap-2 items-center text-zinc-500">
            <span className="text-amber-400">Claude Code (orchestrator)</span>
            <span>→</span>
            <span className="text-zinc-300">Antigravity-worker routing</span>
            <span>→</span>
            <span className="text-purple-400">thin Haiku subagent</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-4">
            <span>→</span>
            <span className="text-emerald-400">agy-worker.sh role &quot;task&quot; --dir</span>
            <span>→</span>
            <span className="text-blue-400">agy (read-only plan mode)</span>
            <span>→</span>
            <span className="text-amber-400">capped report back</span>
          </div>
          <div className="mt-3 text-zinc-600">
            workers read a lot, return a little — the token budget is the contract
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "Workers are read-only by construction",
              "Every worker runs with --approval-mode plan: AGY can read the workspace but never edit or execute. Claude remains the only writer, which eliminates an entire class of multi-agent write conflicts without coordination machinery.",
            ],
            [
              "Pass pointers, not content",
              "Directories go to workers via include flags; file contents are never pasted into prompts. The worker reads sources itself inside its own large context window, so delegation cost on the Claude side stays near-constant regardless of input size.",
            ],
            [
              "Output contracts over post-processing",
              "Each role prompt hard-caps response length and prescribes structure (findings lists, severity scales, verdict lines). The relay subagents forward output instead of re-processing it — relays run on Haiku and stay nearly free.",
            ],
            [
              "Treat capacity errors as routine",
              "Free-tier models intermittently return 429 'no capacity'. The wrapper detects quota and unknown-model errors in stderr and retries once on the role's fallback model — production resilience for preview-model churn at zero config cost.",
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
        <h2 className="font-mono text-base text-zinc-200 mb-3">// War Story</h2>
        <p>
          During end-to-end validation, the review worker kept timing out while other workers
          succeeded. Root cause was two layers deep: a broken global Gemini CLI BeforeTool hook
          (calling <code className="text-amber-400 text-xs">python</code> on a macOS system that
          only ships <code className="text-amber-400 text-xs">python3</code>) was silently blocking
          every file read in headless mode — workers degraded to guessing from file names instead
          of failing loudly. Fixing the hook and adding the model fallback chain took the suite
          from intermittent failures to 54/54. The later migration from Gemini CLI to the AGY
          invoker reused the same wrapper contract, so the worker pool swapped engines without
          touching the routing or observability layers.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
