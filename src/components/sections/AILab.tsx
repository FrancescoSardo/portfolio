"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import type { Pipeline, ModelEntry } from "@/types";

const TOOL_FEED = [
  { time: "09:14", tool: "claude-code", task: "refactoring session", project: "bloomticket-api" },
  { time: "09:47", tool: "gemini-cli", task: "summarize PR diff", project: "3 files" },
  { time: "10:12", tool: "claude-code", task: "scaffold component", project: "cwl-editor" },
  { time: "11:03", tool: "graphify", task: "knowledge graph query", project: "claude-obsidian" },
  { time: "11:30", tool: "lm-studio", task: "local model test", project: "ccr routing" },
  { time: "13:22", tool: "gemini-cli", task: "research K8s ingress patterns", project: "devops" },
  { time: "14:10", tool: "claude-code", task: "TDD session", project: "bloomticket-mobile" },
  { time: "15:45", tool: "obsidian-sync", task: "wiki ingest + save", project: "claude-obsidian" },
  { time: "16:20", tool: "agentops", task: "inspect memory + tokens", project: "agentops-dashboard" },
];

const TOOL_COLORS: Record<string, string> = {
  "claude-code": "text-amber-400",
  "gemini-cli": "text-blue-400",
  "python-script": "text-green-400",
  "lm-studio": "text-purple-400",
  "openrouter": "text-orange-400",
  "obsidian-sync": "text-violet-400",
  "graphify": "text-cyan-400",
  "agentops": "text-orange-300",
};

const PIPELINES: Pipeline[] = [
  {
    name: "Job Research Automation",
    flow: ["fetch-jobs", "llm-score", "rank-output"],
    language: "Python",
    llm: "Claude API",
    status: "active",
  },
  {
    name: "Second Brain (claude-obsidian)",
    flow: ["source-ingest", "wiki-save", "graphify-index"],
    language: "MCP Plugin",
    llm: "Claude + Gemini",
    status: "active",
  },
  {
    name: "CV Variant Generator",
    flow: ["profile-md", "claude-prompt", "cv-output"],
    language: "Python",
    llm: "Claude API",
    status: "active",
  },
];

interface MainTool {
  name: string;
  description: string;
  github?: string;
  tag: string;
  color: string;
}

const MAIN_TOOLS: MainTool[] = [
  {
    name: "claude-obsidian",
    description: "Persistent wiki vault — 11 agent skills for ingest, search, and compaction. Builds a compounding second brain across sessions.",
    github: "https://github.com/AgriciDaniel/claude-obsidian",
    tag: "second-brain",
    color: "text-violet-400",
  },
  {
    name: "graphify",
    description: "Turns any folder into a knowledge graph (6,291 nodes · 15,018 edges). Powers sub-300-token wiki queries via graphify query/explain/path.",
    github: "https://github.com/safishamsi/graphify",
    tag: "graph-rag",
    color: "text-cyan-400",
  },
  {
    name: "agentops-dashboard",
    description: "Local read-only dashboard for Claude Code internals — 12 data domains: config, skills, memory, tokens, agents, commands, tooling.",
    tag: "observability",
    color: "text-orange-300",
  },
  {
    name: "cli-printing-press",
    description: "Spec-driven code generator: one OpenAPI spec → production-ready Go CLI + MCP server with SQLite layer. Agent-native output by default.",
    github: "https://github.com/mvanhorn/cli-printing-press",
    tag: "code-gen",
    color: "text-amber-300",
  },
  {
    name: "indeed-pp-cli",
    description: "Go CLI for multi-country Indeed job search (NL, DE, SE, IE, CH…). Fit scoring, salary heatmap, seniority drift detection. Generated via printing-press.",
    tag: "job-search · Go · MCP",
    color: "text-blue-400",
  },
  {
    name: "linkedin-jobs-pp-cli",
    description: "Go CLI for LinkedIn jobs — 19 commands, application pipeline tracking, ghosting report, skills-gap analysis. No auth required. Generated via printing-press.",
    tag: "job-search · Go · MCP",
    color: "text-sky-400",
  },
];

const MODELS: ModelEntry[] = [
  { model: "claude-sonnet", provider: "Anthropic", use: "code + agent orchestration" },
  { model: "gemini-flash", provider: "Google", use: "research + summarization" },
  { model: "[latest local]", provider: "LM Studio", use: "CCR / claude-mem testing" },
  { model: "[frontier]", provider: "OpenRouter", use: "heavy inference / exploration" },
];

const TAGS = [
  "#agentic-workflows",
  "#prompt-engineering",
  "#rag-patterns",
  "#tool-use",
  "#structured-output",
  "#local-llm",
];

export function AILab() {
  const [visibleFeed, setVisibleFeed] = useState<typeof TOOL_FEED>([]);

  useEffect(() => {
    let i = 0;
    const add = () => {
      setVisibleFeed(TOOL_FEED.slice(0, i + 1));
      i++;
      if (i < TOOL_FEED.length) setTimeout(add, 600);
      else setTimeout(() => { i = 0; setVisibleFeed([]); setTimeout(add, 800); }, 3000);
    };
    const t = setTimeout(add, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="ai-lab" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div>
          <SectionLabel label="AI WORKFLOW LAB" />
          <h2 className="font-mono text-2xl text-zinc-100 mt-2">Daily AI Stack</h2>
          <p className="font-mono text-xs text-zinc-600 mt-1">
            This is not a skills list. This is a live workflow.
          </p>
        </div>

        {/* Main Tools row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAIN_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="border border-zinc-800 bg-zinc-900/30 p-4 flex flex-col gap-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`font-mono text-sm font-semibold ${tool.color}`}>{tool.name}</span>
                <span className="font-mono text-xs text-zinc-700 border border-zinc-800 px-1.5 py-0.5">
                  #{tool.tag}
                </span>
              </div>
              <p className="font-mono text-xs text-zinc-500 leading-relaxed flex-1">
                {tool.description}
              </p>
              {tool.github ? (
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors w-fit"
                >
                  GitHub ↗
                </a>
              ) : (
                <span className="font-mono text-xs text-zinc-700">private</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Panel A — Tools Feed */}
          <div className="lg:col-span-5">
            <TerminalWindow title="daily_toolchain.sh">
              <div className="flex flex-col gap-1.5 min-h-[280px]">
                <AnimatePresence>
                  {visibleFeed.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-mono text-xs flex gap-2 flex-wrap"
                    >
                      <span className="text-zinc-600">[{entry.time}]</span>
                      <span className={TOOL_COLORS[entry.tool] ?? "text-zinc-400"}>
                        {entry.tool}
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-400">{entry.task}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-600">{entry.project}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-amber-400 w-28">claude-code</span>
                  <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-amber-400 rounded-full" />
                  </div>
                  <span className="font-mono text-xs text-zinc-600">70%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-blue-400 w-28">gemini-cli</span>
                  <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-blue-400 rounded-full" />
                  </div>
                  <span className="font-mono text-xs text-zinc-600">30%</span>
                </div>
              </div>
            </TerminalWindow>
          </div>

          {/* Panel B — Agent Pipelines */}
          <div className="lg:col-span-4">
            <TerminalWindow title="agent_pipelines">
              <div className="flex flex-col gap-4">
                {PIPELINES.map((p) => (
                  <div
                    key={p.name}
                    className="border border-zinc-800 p-3 hover:border-amber-400/30 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`font-mono text-xs ${
                          p.status === "active" ? "text-green-400" : "text-orange-400"
                        }`}
                      >
                        ●
                      </span>
                      <span className="font-mono text-xs text-zinc-300">{p.name}</span>
                    </div>
                    <div className="font-mono text-xs text-zinc-600 mb-2">
                      {p.flow.join(" → ")}
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono text-xs text-zinc-700">{p.language}</span>
                      <span className="font-mono text-xs text-zinc-700">·</span>
                      <span className="font-mono text-xs text-amber-400/60">{p.llm}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>

          {/* Panel C — Model Catalog */}
          <div className="lg:col-span-3">
            <TerminalWindow title="model_catalog">
              <div className="flex flex-col gap-1 mb-4">
                <div className="font-mono text-xs text-zinc-700 grid grid-cols-1 gap-0.5 pb-1 border-b border-zinc-800">
                  <span>MODEL / PROVIDER / USE</span>
                </div>
                {MODELS.map((m) => (
                  <div key={m.model} className="font-mono text-xs flex flex-col gap-0.5 py-1.5 border-b border-zinc-900">
                    <span className="text-amber-400">{m.model}</span>
                    <span className="text-zinc-600">{m.provider} · {m.use}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-zinc-600 border border-zinc-800 px-1.5 py-0.5 hover:text-amber-400 hover:border-amber-400/30 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
