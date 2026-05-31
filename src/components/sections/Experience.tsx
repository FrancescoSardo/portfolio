"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechBadge } from "@/components/ui/TechBadge";
import { slideLeft, stagger } from "@/lib/motion";
import { experience } from "@/lib/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="EXPERIENCE" />
        <h2 className="font-mono text-2xl text-zinc-100 mb-12 mt-2">Work History</h2>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative flex flex-col gap-0"
        >
          {/* Timeline bar */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

          {experience.map((job, i) => (
            <motion.div
              key={i}
              variants={slideLeft}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline marker */}
              <div className="absolute left-[-4px] top-1.5 w-2 h-2 bg-amber-400 rotate-45" />

              <div className="border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-700 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <span className="font-mono text-sm font-semibold text-zinc-100">{job.role}</span>
                    <span className="font-mono text-sm text-zinc-500"> — {job.company}</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-600 shrink-0">
                    {job.start} – {job.end}
                  </span>
                </div>

                <ul className="flex flex-col gap-1 mb-4">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="font-mono text-xs text-zinc-500 flex gap-2">
                      <span className="text-amber-400/50 shrink-0">▪</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
