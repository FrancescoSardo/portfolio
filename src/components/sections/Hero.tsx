"use client";

import { TypewriterText } from "@/components/ui/TypewriterText";

const TYPEWRITER_PHRASES = [
  "Full Stack Developer",
  "AI Engineering",
  "React · Spring Boot · TypeScript",
  "Available → NL · CH · DE · SE · DK · IE",
];

const NEOFETCH_LINES = [
  { key: "name", value: "Francesco Sardo" },
  { key: "role", value: "Software Engineer" },
  { key: "education", value: "MSc CS (AI) · UniTO · 98/110" },
  { key: "stack", value: "TypeScript · Java · Python · React" },
  { key: "mobile", value: "React Native" },
  { key: "devops", value: "Docker · K8s · AWS" },
  { key: "ai", value: "Claude · Gemini · LM Studio · OpenRouter" },
  { key: "location", value: "Italy → relocation ready" },
  { key: "status", value: "OPEN TO OFFERS" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-14 px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
        {/* Left — Identity */}
        <div className="flex flex-col gap-6">
          <div className="font-mono text-sm text-zinc-600">
            <span className="text-amber-400">francesco@portfolio</span>
            <span className="text-zinc-600">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-zinc-600">$</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-mono text-4xl md:text-5xl font-semibold text-zinc-100 leading-tight">
              Francesco Sardo
            </h1>
            <div className="font-mono text-lg text-zinc-400 h-7">
              <TypewriterText phrases={TYPEWRITER_PHRASES} />
            </div>
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-md font-mono">
            MSc CS (AI), UniTO, 98/110. Co-founder &amp; Mobile Lead at BloomTicket (live iOS/Android).
            Daily Claude Code CLI + custom agent pipelines. Relocating to NL · CH · DE · SE · DK · IE.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="font-mono text-xs border border-amber-400 text-amber-400 px-4 py-2 hover:bg-amber-400 hover:text-black transition-colors duration-200"
            >
              [View Projects]
            </a>
            <a
              href="/pdf/Francesco_sardo_CV.pdf"
              download
              className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            >
              [Download CV]
            </a>
            <a
              href="https://github.com/FrancescoSardo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/francescosardo-devops"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Right — Neofetch block */}
        <div className="hidden lg:block border border-zinc-800 bg-zinc-900/40 p-6 font-mono text-xs">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="text-zinc-600 ml-1">neofetch</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {NEOFETCH_LINES.map(({ key, value }) => (
              <div key={key} className="flex gap-2">
                <span className="text-amber-400 w-24 shrink-0">{key}</span>
                <span className="text-zinc-600">:</span>
                <span className={key === "status" ? "text-green-400" : "text-zinc-300"}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
