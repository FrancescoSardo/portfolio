"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stagger, fadeUp } from "@/lib/motion";

const CERTS = [
  {
    title: "Building with the Claude API",
    issuer: "Anthropic",
    year: "2026",
    href: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
  },
  {
    title: "Claude in Action",
    issuer: "Anthropic",
    year: "2026",
    href: "https://anthropic.skilljar.com/claude-code-in-action",
  },
];

export function Certifications() {
  return (
    <section id="certs" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="CERTIFICATIONS" />
        <h2 className="font-mono text-2xl text-zinc-100 mb-12 mt-2">Credentials</h2>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          {CERTS.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              className="border border-zinc-800 bg-zinc-900/30 p-5 flex flex-col gap-3 min-w-[260px] hover:border-amber-400/30 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400">{cert.issuer}</span>
                <span className="font-mono text-xs text-zinc-600">{cert.year}</span>
              </div>
              <div className="font-mono text-sm text-zinc-200">{cert.title}</div>
              {cert.href && (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors"
                >
                  Course ↗
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
