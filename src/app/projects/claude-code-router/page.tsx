import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code Router — Francesco Sardo",
  description: "OSS contribution + personal extension: AGY CLI provider for claude-code-router — transformer, subprocess runner, SSE streaming, and session continuity",
};

const METRICS = [
  { value: "AGY CLI", label: "New Transformer" },
  { value: "cli://", label: "URL Scheme" },
  { value: "SSE Stream", label: "Real-time Output" },
  { value: "Session Map", label: "Conversation Continuity" },
];

export default function ClaudeCodeRouterPage() {
  return (
    <CaseStudyLayout
      title="Claude Code Router"
      statusLabel="● OSS CONTRIBUTION — Active"
      statusColor="text-emerald-400 border-emerald-400/30"
      tagline="Open-source contribution to claude-code-router — extended the cli:// provider system to support Antigravity (AGY) CLI as a local, API-key-free backend. Built a new transformer, subprocess runner with SSE streaming, and cross-session conversation continuity."
      techStack={["TypeScript", "Fastify", "Node.js", "SSE", "NDJSON", "SQLite"]}
      metrics={METRICS}
      images={[]}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Context</h2>
        <p>
          claude-code-router is an open-source proxy that intercepts{" "}
          <code className="text-amber-400 text-xs">ANTHROPIC_BASE_URL</code> and routes Claude Code
          requests to alternative LLM backends. The existing{" "}
          <code className="text-amber-400 text-xs">cli://</code> URL scheme supported spawning local
          CLI tools as providers. I extended this to integrate{" "}
          <code className="text-amber-400 text-xs">agy</code> — the Antigravity CLI — as a fully
          functional provider with streaming output and persistent sessions.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// What I Built</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "AgyCLITransformer",
              "New transformer that adapts AGY CLI output to Anthropic's message format. Handles both SSE streaming (text_delta events) and non-streaming paths. Strips the MEMORY INJECTED header block that AGY prepends to every response — split on the ━━━ delimiter, discarding the first two segments so only assistant text reaches Claude Code.",
            ],
            [
              "runAgyCLI subprocess runner",
              "Spawns agy as a child process per request, pipes the prompt via stdin, then closes stdin to signal completion. Deletes ANTHROPIC_BASE_URL from the subprocess env to prevent recursive routing back through CCR. Reads stdout as a line-by-line SSE stream and forwards events in real time.",
            ],
            [
              "Session continuity via .db mtime scan",
              "AGY writes a SQLite conversation file to ~/.gemini/antigravity-cli/conversations/ after each turn. The runner scans for the most recently modified .db, maps the CCR sessionId to that AGY UUID, and passes --conversation=<uuid> on subsequent turns — keeping multi-message exchanges in a single AGY conversation.",
            ],
            [
              "cli:// URL scheme (upstream contribution)",
              "Extended routing and URL validation to recognise cli://command as a valid api_base_url. The router spawns the referenced binary instead of making an HTTP request — enabling any local CLI tool to act as an LLM provider with zero config overhead.",
            ],
          ].map(([title, desc]) => (
            <div key={title as string} className="flex gap-3">
              <span className="text-emerald-400/50 shrink-0 mt-0.5">▪</span>
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
            <span className="text-amber-400">Claude Code</span>
            <span>→</span>
            <span className="text-blue-400">POST /v1/messages</span>
            <span>→</span>
            <span className="text-zinc-300">router middleware</span>
            <span>→</span>
            <span className="text-emerald-400">AgyCLITransformer</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-4">
            <span>→</span>
            <span className="text-purple-400">runAgyCLI (spawn + stdin close)</span>
            <span>→</span>
            <span className="text-emerald-400">agy binary</span>
            <span>→</span>
            <span className="text-zinc-300">SSE stdout</span>
            <span>→</span>
            <span className="text-amber-400">Anthropic format back</span>
          </div>
          <div className="mt-2 ml-4 flex flex-wrap gap-2 items-center text-zinc-500">
            <span className="text-zinc-600">session map:</span>
            <span className="text-purple-400">CCR sessionId</span>
            <span>→</span>
            <span className="text-zinc-300">.db mtime scan</span>
            <span>→</span>
            <span className="text-emerald-400">--conversation=&lt;uuid&gt;</span>
          </div>
          <div className="mt-3 text-zinc-600">
            cli:// prefix bypasses HTTP entirely — no API key, no network call
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "Strip MEMORY INJECTED via delimiter split, not line filter",
              "AGY prepends a MEMORY INJECTED block separated by ━━━ lines. A line-by-line filter broke on multi-line memory entries. Splitting the full output on ━━━ and taking parts.slice(2) handles the block atomically regardless of its internal structure.",
            ],
            [
              "Delete ANTHROPIC_BASE_URL from subprocess env",
              "Without removing this variable, agy inherits it from the CCR process and routes its own requests back through CCR — an infinite loop. Stripping the key before spawn breaks the cycle while leaving all other env vars intact.",
            ],
            [
              "Close stdin to signal end-of-input",
              "AGY reads the prompt from stdin and waits for EOF before responding. Not closing stdin causes the process to hang indefinitely. Calling subprocess.stdin.end() immediately after writing the prompt is the minimal fix.",
            ],
            [
              "mtime scan over process-level session tracking",
              "AGY does not expose the conversation UUID synchronously. Scanning ~/.gemini/antigravity-cli/conversations/ for the most recently modified .db after each response ties the CCR session to the correct AGY conversation without requiring changes to AGY internals.",
            ],
          ].map(([title, desc]) => (
            <div key={title as string} className="flex gap-3">
              <span className="text-emerald-400/50 shrink-0 mt-0.5">▪</span>
              <div>
                <span className="text-zinc-300">{title}: </span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}
