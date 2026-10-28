import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM Gateway — Francesco Sardo",
  description: "Single-file, zero-dependency Node server exposing local AI CLIs (Claude Code, Antigravity, Gemini) through the OpenAI API — chat completions, Responses API, model discovery, SSE streaming, and emulated tool calling",
};

const METRICS = [
  { value: "~220 lines", label: "Single File" },
  { value: "0 deps", label: "Node 20 Only" },
  { value: "SSE Stream", label: "Real-time Output" },
  { value: "tool_calls", label: "Emulated in Prompt" },
];

export default function LlmGatewayPage() {
  return (
    <CaseStudyLayout
      title="LLM Gateway"
      statusLabel="● EXPERIMENTAL — Local OpenAI-compatible server"
      statusColor="text-amber-400 border-amber-400/30"
      tagline="A single-file, zero-dependency Node server that exposes local AI CLIs (Claude Code, Antigravity, Gemini) through the standard OpenAI API, so any OpenAI-compatible app or agent can use them without API keys. Covers chat completions, the Responses API, model discovery, real SSE streaming, and tool calling emulated on top of CLIs that have no native tool API."
      techStack={["Node.js", "JavaScript", "SSE", "OpenAI API", "ngrok"]}
      metrics={METRICS}
      images={[]}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Context</h2>
        <p>
          Claude Code, Antigravity (<code className="text-amber-400 text-xs">agy</code>) and Gemini
          CLI are logged-in local tools with no HTTP API, while most other apps and agents expect
          the OpenAI API. The gateway is a thin server in between: a{" "}
          <code className="text-amber-400 text-xs">node:http</code> process that spawns the CLI per
          request, using an argv array and never a shell string, and translates the result into
          OpenAI-shaped responses.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// What I Built</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "OpenAI-compatible endpoints",
              "POST /v1/chat/completions, POST /v1/responses, GET /v1/models and /v1/models/{id}. Paths are also accepted without the /v1 prefix — found when a client configured without /v1 got a 404 on /models.",
            ],
            [
              "Model routing and discovery",
              "Model ids are backend or backend/model (claude/sonnet, agy/gemini-3.8-flash-low). /v1/models uses static lists for claude and gemini, whose CLIs have no list command, and a dynamic list for agy via agy models with a 5-minute cache.",
            ],
            [
              "Real SSE streaming",
              "Child stdout is piped to chat.completion.chunk events as it arrives — several chunks about 130ms apart measured on agy. A client disconnect kills the child process; a 120s timeout bounds every request.",
            ],
            [
              "Emulated tool calling",
              "Tool schemas are injected into the prompt with a JSON-only reply protocol. The output is parsed and returned as OpenAI tool_calls with finish_reason tool_calls; role:tool results are folded back into the next prompt.",
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
            <span className="text-amber-400">OpenAI-compatible client</span>
            <span>→</span>
            <span className="text-blue-400">POST /v1/chat/completions</span>
            <span>→</span>
            <span className="text-zinc-300">gateway (node:http)</span>
            <span>→</span>
            <span className="text-purple-400">spawn(argv[])</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-4">
            <span>→</span>
            <span className="text-emerald-400">claude / agy / gemini CLI</span>
            <span>→</span>
            <span className="text-zinc-300">stdout</span>
            <span>→</span>
            <span className="text-amber-400">SSE chunks / tool_calls</span>
          </div>
          <div className="mt-3 text-zinc-600">
            binds 127.0.0.1 by default — optional bearer API_KEY, ngrok tunnel when used from other apps
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "Emulate tools in the prompt, validate on the way out",
              "The CLIs have no client-defined tool API. Output is parsed defensively — fences stripped, balanced JSON extracted, tool names checked against the declared tools. Measured 3/3 on agy/gemini-3.8-flash-low and 3/3 on claude/sonnet for a get_weather call; forced tool_choice was less reliable (2/4 on gemini-3.8-flash-low). It is emulation and can fail on weaker models; /v1/responses ignores tools.",
            ],
            [
              "Buffer when tools are present",
              "A tool call is only valid once the full JSON is parsed, so with tools declared the output is buffered and then emitted as tool_call chunks instead of streaming raw text.",
            ],
            [
              "Local-first security defaults",
              "Binds 127.0.0.1, optional bearer API_KEY, 1MB body cap, prompts never logged, errors in the OpenAI error shape. For use from other apps it is exposed through an ngrok tunnel with the key enabled.",
            ],
            [
              "Measure before optimising",
              "About 5s per request on agy with Gemini 3.8 Flash, almost all CLI startup: the CLI run directly takes about 5.0s, so the gateway adds close to nothing. 5 concurrent requests slowed to about 25s (cause not identified), so serialising requests is the known next step.",
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
