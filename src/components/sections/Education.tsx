"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const MSC_COURSES = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Intelligent Agents",
  "Advanced Software Architectures",
  "Concurrent & Distributed Systems",
  "Multimedia Databases",
  "Semantic Web Modelling",
];

export function Education() {
  const [mscExpanded, setMscExpanded] = useState(false);
  const [bscExpanded, setBscExpanded] = useState(false);

  return (
    <section id="education" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="EDUCATION" />
        <h2 className="font-mono text-2xl text-zinc-100 mb-12 mt-2">Academic Background</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MSc */}
          <div className="border border-zinc-800 bg-zinc-900/30 p-6 hover:border-zinc-700 transition-colors duration-300">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="font-mono text-xs text-zinc-600 mb-1">Sep 2022 – Apr 2026</div>
                <h3 className="font-mono text-sm font-semibold text-zinc-100">
                  MSc Computer Science
                </h3>
                <div className="font-mono text-xs text-zinc-500 mt-0.5">
                  AI & Advanced Software Architectures
                </div>
                <div className="font-mono text-xs text-zinc-600 mt-0.5">
                  Università degli Studi di Torino
                </div>
              </div>
              <span className="font-mono text-2xl font-semibold text-amber-400 shrink-0">98/110</span>
            </div>

            <div className="font-mono text-xs text-zinc-600 border border-zinc-800 p-2 mb-4">
              &quot;Design and Implementation of a Visual Editor for CWL Scientific Workflows using
              Reactive Web Technologies&quot;
            </div>

            <button
              onClick={() => setMscExpanded((v) => !v)}
              className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              {mscExpanded ? "▲" : "▼"} {mscExpanded ? "Hide" : "Show"} courses
            </button>

            <AnimatePresence>
              {mscExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 grid grid-cols-2 gap-1">
                    {MSC_COURSES.map((c) => (
                      <div key={c} className="font-mono text-xs text-zinc-600 flex gap-1">
                        <span className="text-amber-400/40">▪</span> {c}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BSc */}
          <div className="border border-zinc-800 bg-zinc-900/30 p-6 hover:border-zinc-700 transition-colors duration-300">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="font-mono text-xs text-zinc-600 mb-1">Sep 2019 – Nov 2022</div>
                <h3 className="font-mono text-sm font-semibold text-zinc-100">
                  BSc Computer Science
                </h3>
                <div className="font-mono text-xs text-zinc-500 mt-0.5">
                  Computer Science
                </div>
                <div className="font-mono text-xs text-zinc-600 mt-0.5">
                  Università degli Studi di Torino
                </div>
              </div>
              <span className="font-mono text-2xl font-semibold text-amber-400 shrink-0">99/110</span>
            </div>

            <div className="font-mono text-xs text-zinc-600 border border-zinc-800 p-2 mb-4">
              &quot;Data visualization monitoring tool for business processes&quot;
            </div>

            <button
              onClick={() => setBscExpanded((v) => !v)}
              className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              {bscExpanded ? "▲" : "▼"} {bscExpanded ? "Hide" : "Show"} details
            </button>

            <AnimatePresence>
              {bscExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 font-mono text-xs text-zinc-600">
                    Foundation in algorithms, data structures, databases, operating systems, networks,
                    and software engineering. Thesis focused on data visualization for operational
                    business process analytics.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
