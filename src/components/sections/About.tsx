"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCard } from "@/components/ui/StatCard";
import { fadeUp, stagger } from "@/lib/motion";

const SKILLS: Array<{ label: string; items: string[] }> = [
  { label: "LANGUAGES", items: ["TypeScript", "JavaScript", "Java", "Python", "SQL", "C#"] },
  { label: "FRONTEND", items: ["React", "React Native", "Next.js", "Redux Toolkit", "Tailwind CSS"] },
  { label: "BACKEND", items: ["Spring Boot", "Node.js", "Laravel", "REST API", "GraphQL"] },
  { label: "DEVOPS", items: ["Docker", "Kubernetes", "AWS", "Firebase", "GitHub Actions"] },
  { label: "AI/ML", items: ["Machine Learning", "Deep Learning", "Computer Vision", "Claude API", "Gemini API"] },
];

const STATS = [
  { value: "98/110", label: "MSc Grade (AI)" },
  { value: "2+", label: "Years Professional Exp" },
  { value: "2", label: "Live Production Apps" },
  { value: "5.02/7", label: "TAM Score — CWL Study" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col gap-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bio */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <SectionLabel label="ABOUT" />
              <h2 className="font-mono text-2xl text-zinc-100">Who I am</h2>
              <div className="flex flex-col gap-3 text-sm text-zinc-400 leading-relaxed">
                <p>
                  I build full-stack systems and AI-augmented tooling. My MSc thesis produced a production-grade visual IDE
                  used in a formal domain expert study, scoring 5.02/7 on the TAM behavioral intention scale.
                </p>
                <p>
                  I co-founded BloomTicket — a live event ticketing app on iOS and Android — where I led all mobile development
                  independently: architecture, state management, Stripe payments, Firebase, QR check-in.
                </p>
                <p>
                  Daily workflow runs through Claude Code CLI, Gemini CLI, custom Python agent pipelines, LM Studio (local models),
                  and OpenRouter for frontier inference. I&apos;m relocating to NL, CH, DE, SE, DK, or IE for junior full-stack or
                  AI engineering roles.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <SectionLabel label="NUMBERS" />
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <StatCard key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skill tags */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <SectionLabel label="SKILLS" />
            <div className="flex flex-col gap-4">
              {SKILLS.map(({ label, items }) => (
                <div key={label} className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-zinc-600 tracking-widest w-24 shrink-0">
                    {label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs border border-zinc-800 text-zinc-500 px-2 py-0.5 hover:border-amber-400/50 hover:text-amber-400 transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
