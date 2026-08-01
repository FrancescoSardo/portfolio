import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopi Pulse — Francesco Sardo",
  description:
    "Shopify store optimization platform with an AI agent orchestrator that reads store data, proposes actions, and executes changes under human approval guardrails.",
};

const METRICS = [
  { value: "31", label: "AI Agent Tools" },
  { value: "SSE", label: "Streaming Agent Loop" },
  { value: "0", label: "Login Screens — Embedded Auth" },
  { value: "3", label: "Billing Tiers (Shopify Native)" },
];

const IMAGES = [
  {
    src: "/img/shopi-pulse-main-dashboard.png",
    alt: "Shopi Pulse — Main Dashboard & Analytics",
    caption: "Store Analytics — Product performance, inventory pricing gaps, and action recommendations",
  },
  {
    src: "/img/shopi-pulse-chat-interaction.png",
    alt: "Shopi Pulse — Agent Chat Interface",
    caption: "Agent Chat & Streaming Tool Execution — AI agent inspecting products and proposing store changes",
  },
  {
    src: "/img/shopi-pulse-pending-actions.png",
    alt: "Shopi Pulse — Pending Actions Approval Queue",
    caption: "Pending Actions Queue — Human-in-the-loop approval gate for Shopify store modifications",
  },
  {
    src: "/img/shopi-pulse-ai-models.png",
    alt: "Shopi Pulse — Multi-LLM Provider & Model Tracking",
    caption: "LLM Orchestrator Config — Multi-provider support (Anthropic / OpenRouter) and model identity tracking",
  },
];

export default function ShopiPulsePage() {
  return (
    <CaseStudyLayout
      title="Shopi Pulse"
      statusLabel="● LIVE — Embedded Shopify App (Production + Staging)"
      statusColor="text-emerald-400 border-emerald-400/30"
      tagline="Shopify store optimization platform embedded directly in the Shopify admin: an AI agent reads live store data through the Admin API, reasons over multi-step tool calls, and executes changes (pricing, inventory, product content) behind tier-gated human-in-the-loop approvals. No login screen — the store itself is the identity."
      techStack={["NestJS", "Next.js", "App Bridge", "Prisma", "PostgreSQL", "Redis", "Turborepo", "Shopify API", "Claude / OpenRouter"]}
      metrics={METRICS}
      images={IMAGES}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Context</h2>
        <p>
          Shopify merchants sit on data they don&apos;t act on — pricing gaps, thin product
          descriptions, stale inventory. Shopi Pulse connects to a store via the Shopify Admin API
          and gives an AI agent a tool belt to inspect that data and propose concrete edits,
          instead of another static analytics dashboard.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// What I Built</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "pnpm/Turborepo monorepo",
              "NestJS backend API and Next.js (App Router) dashboard as separate apps, sharing packages for AI tooling, Shopify client, Prisma schema, and workflow/automation types.",
            ],
            [
              "Streaming agent loop with tool use",
              "Multi-turn agent service drives read tools (products, orders, inventory) and write tools (price/content updates) against the Shopify Admin API, streaming progress to the frontend over SSE with anti-buffering headers through the Cloudflare + reverse-proxy chain.",
            ],
            [
              "Embedded-only auth, no login",
              "The app lives inside the Shopify admin iframe (App Bridge v4). Install is cookieless: the frontend's signed session token is exchanged server-side for an expiring offline Admin API token — no OAuth redirect, no user table, no passwords. Shop identity comes only from HMAC-verified session tokens, never from query params.",
            ],
            [
              "Tier-gated approval guardrails",
              "Write actions land in a PendingAction queue for explicit approval, or auto-execute on paid tiers with a per-store toggle — tier limits enforced server-side on every request, independent of stored toggle state.",
            ],
            [
              "Native Shopify billing",
              "Subscription flow through Shopify's Billing API (appSubscriptionCreate) with FREE/PRO/CUSTOM tiers, deduplicated billing webhooks, synchronous downgrade on cancel, and per-store daily usage limits.",
            ],
            [
              "Multi-provider LLM abstraction",
              "Format-normalizing client layer supports Anthropic directly and OpenRouter as an Anthropic-compatible gateway, so model choice (Claude, GPT-4o, free-tier alternatives) is a config swap, not a rewrite.",
            ],
            [
              "Persistent chat with full event history",
              "Tool calls, tool results, and model identity are persisted per message (not just final text), so a reloaded chat shows exactly what the agent did, not a collapsed summary.",
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
            <span className="text-blue-400">Shopify admin iframe</span>
            <span>→</span>
            <span className="text-zinc-300">App Bridge session token</span>
            <span>→</span>
            <span className="text-emerald-400">Next.js dashboard</span>
            <span>→</span>
            <span className="text-zinc-300">SSE chat stream</span>
            <span>→</span>
            <span className="text-purple-400">NestJS agent service</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-4">
            <span>→</span>
            <span className="text-amber-400">tool-use loop (read/write tools)</span>
            <span>→</span>
            <span className="text-blue-400">Shopify Admin API</span>
            <span>→</span>
            <span className="text-emerald-400">PendingAction approval gate</span>
          </div>
          <div className="mt-3 text-zinc-600">
            Postgres + Prisma for persistence, Redis + BullMQ for store sync, native Shopify billing for subscriptions
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "Model identity surfaced, not hidden",
              "Free-tier models fail multi-step tool use in distinct, confusing ways — hallucinated IDs, silent truncation, dead-end turns with no action taken. Rather than paper over every failure shape server-side, the model that generated each response is persisted and shown, turning 'the app is broken' into 'this model isn't strong enough for this task.'",
            ],
            [
              "Dead-end turns surfaced, not swallowed",
              "The agent loop detects when a turn produces no tool call and no real answer (a stall) and raises it as an explicit error event instead of silently saving stale text as the final response.",
            ],
            [
              "SSE through a proxy chain, done properly",
              "Real-time streaming was silently buffered by the Cloudflare + reverse-proxy path. Fixed with explicit X-Accel-Buffering headers and forced header flush rather than switching transport.",
            ],
            [
              "Reads are free, writes are tier-gated",
              "Read tools execute immediately; write tools stage a PendingAction or auto-execute only when the store's billing tier allows it — enforcement lives in the per-request limit resolution, so a stale toggle left on after a downgrade can't bypass the gate.",
            ],
            [
              "The store is the identity",
              "No merchant accounts, sessions, or refresh tokens to manage. Every request's shop comes from a short-lived HMAC-signed session token; expiring offline Admin API tokens are refreshed through a single choke-point service every caller (sync, billing, AI tools) must go through.",
            ],
            [
              "Live tests over mocks",
              "An env-gated Jest suite runs all 31 agent tools against a real staging store. It caught two production GraphQL bugs that mocked unit tests masked — the mocks had encoded the broken schema. Write tools carry undo handlers so test mutations roll back.",
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
        <h2 className="font-mono text-base text-zinc-200 mb-3">// War Story</h2>
        <p>
          A production conversation looked frozen mid-task: the agent correctly diagnosed a
          conversion-optimization request, then went silent — no streaming, no tool calls, no
          error. Root cause turned out to be layered: SSE responses were buffered by the proxy
          chain (fixed with anti-buffering headers), and separately the tool-use loop could hit a
          turn with no tool call and no content, which the code was treating as a normal
          completion. Fixing both surfaced a further issue — a free-tier model truncating a
          response mid-table at 528 characters, invisible without knowing which model produced it.
          Model tracking closed that loop: every assistant message now carries the model that wrote
          it, so future failures are diagnosable from the chat itself.
        </p>
      </section>

      <section className="flex flex-wrap gap-3 pt-4 border-t border-zinc-900">
        <a
          href="https://app.pulse-ai.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          app.pulse-ai.uk ↗
        </a>
      </section>
    </CaseStudyLayout>
  );
}
