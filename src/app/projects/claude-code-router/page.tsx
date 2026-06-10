import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code Router — Francesco Sardo",
  description: "OSS contribution: Gemini CLI provider support for claude-code-router — transformer, process pool, and provider test UI",
};

const METRICS = [
  { value: "GeminiCLI", label: "New Transformer" },
  { value: "cli://", label: "URL Scheme" },
  { value: "Process Pool", label: "Persistent Spawn" },
  { value: "Test UI", label: "Provider Health Check" },
];

export default function ClaudeCodeRouterPage() {
  return (
    <CaseStudyLayout
      title="Claude Code Router"
      statusLabel="● OSS CONTRIBUTION — Merged"
      statusColor="text-emerald-400 border-emerald-400/30"
      tagline="Open-source contribution to claude-code-router — added Gemini CLI as a local, API-key-free provider. Built a new transformer, a persistent process pool, and a live provider test button in the management UI."
      techStack={["TypeScript", "Fastify", "React", "Vite", "Node.js", "NDJSON"]}
      metrics={METRICS}
      images={[]}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Context</h2>
        <p>
          claude-code-router is an open-source proxy that intercepts{" "}
          <code className="text-amber-400 text-xs">ANTHROPIC_BASE_URL</code> and routes Claude Code
          requests to alternative LLM backends. The existing system supported HTTP providers
          (OpenRouter, LM Studio) but had no way to use local CLI-based models — meaning free-tier
          Gemini via the <code className="text-amber-400 text-xs">gemini</code> CLI binary was
          inaccessible.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// What I Built</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "GeminiCLITransformer",
              "New transformer that parses the Gemini CLI's NDJSON stream format — init / message / result events. Extracts assistant text, aggregates token usage across models, captures session IDs, and surfaces errors cleanly. Handles logs or stats that appear before the JSON response block.",
            ],
            [
              "GeminiCLIProcessManager",
              "Persistent process pool that spawns and reuses gemini child processes across requests. Pipes prompts via stdin, reads stdout as NDJSON, manages per-session cache. Avoids cold-start latency on every message by keeping processes alive.",
            ],
            [
              "cli:// URL scheme",
              "Extended routing and URL validation to recognise cli://command as a valid api_base_url. The router spawns the referenced binary instead of making an HTTP request — enabling any local CLI tool to act as an LLM provider with zero config overhead.",
            ],
            [
              "Provider test endpoint + UI",
              "New API route POST /providers/:id/test sends a minimal 'hi' probe to any configured provider using its first defined model. The React UI exposes this as a green Play button per provider — response or error appears in a dialog. Makes misconfiguration immediately visible before routing live traffic.",
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
            <span className="text-emerald-400">GeminiCLITransformer</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-4">
            <span>→</span>
            <span className="text-purple-400">ProcessManager (spawn / reuse)</span>
            <span>→</span>
            <span className="text-emerald-400">gemini CLI binary</span>
            <span>→</span>
            <span className="text-zinc-300">NDJSON stdout</span>
            <span>→</span>
            <span className="text-amber-400">Anthropic format back</span>
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
              "NDJSON stream parsing",
              "Gemini CLI outputs structured events line-by-line: init (session), message (content), result (stats/error). Parsing each line independently makes the transformer robust to partial output and to log noise appearing before the JSON block.",
            ],
            [
              "Persistent process pool over spawn-per-request",
              "Spawning a fresh gemini process per message adds ~1-2s cold-start latency. The ProcessManager reuses live processes across requests within a session window, trading memory for latency — the right tradeoff for an interactive coding assistant.",
            ],
            [
              "Test probe uses first model, not a hardcoded string",
              "POST /providers/:id/test picks provider.models[0] dynamically. This means the test always reflects the actual routing config — if a provider has no models defined, the test surfaces the misconfiguration rather than silently succeeding with a dummy value.",
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
