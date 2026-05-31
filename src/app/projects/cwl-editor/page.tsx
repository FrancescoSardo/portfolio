import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CWL Visual Editor — Francesco Sardo",
  description: "Case study: Visual IDE for CWL scientific workflows, MSc thesis UniTO",
};

const METRICS = [
  { value: "~3,100", label: "Parser Lines of Code" },
  { value: "100%", label: "Round-trip Fidelity" },
  { value: "5.02/7", label: "TAM Score" },
  { value: "0", label: "Structural Runtime Errors" },
];

const IMAGES = [
  {
    src: "/img/fig1_1_overview_sistemae.png",
    alt: "CWL Visual Editor — System Overview",
    caption: "Fig 1.1 — System overview: YAML import, visual editing, and export pipeline",
  },
  {
    src: "/img/fig3_2_layout_ui.png",
    alt: "CWL Visual Editor — UI Layout",
    caption: "Fig 3.2 — Editor UI layout: canvas, sidebar, and toolbar",
  },
  {
    src: "/img/fig4_1_cwlnode_anatomy.png",
    alt: "CWL Visual Editor — CWL Node Anatomy",
    caption: "Fig 4.1 — CWL node anatomy: ports, types, and edge validation",
  },
];

export default function CWLEditorPage() {
  return (
    <CaseStudyLayout
      title="CWL Visual Workflow Editor"
      statusLabel="● MSc THESIS · Apr 2026"
      statusColor="text-amber-400 border-amber-400/30"
      tagline="Low-code visual IDE for building, editing, and deploying CWL scientific pipelines — entirely web-based, no YAML required. Built as MSc thesis at University of Turin."
      techStack={["React 19", "TypeScript", "ReactFlow", "Redux Toolkit", "Jest", "YAML"]}
      metrics={METRICS}
      images={IMAGES}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Problem</h2>
        <p>
          Bioinformaticians and scientific researchers build reproducible computational pipelines using Common Workflow Language (CWL).
          But authoring CWL requires hand-writing verbose YAML — a painful, error-prone process that blocks non-engineers from
          contributing to pipeline design and makes structural errors invisible until runtime.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Solution</h2>
        <p>
          A visual node-graph editor where each CWL step, tool, and connection is a draggable node on a canvas.
          The editor maintains full bidirectional fidelity: import any valid CWL YAML into the visual graph, edit visually,
          and export back to semantically equivalent YAML. Real-time type checking prevents structural errors before execution.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Parser Pipeline</h2>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs">
          <div className="flex flex-wrap gap-2 items-center text-zinc-500">
            <span className="text-amber-400">CWL YAML</span>
            <span>→</span>
            <span className="text-blue-400">AST Parser (~3,100 lines)</span>
            <span>→</span>
            <span className="text-green-400">Redux State</span>
            <span>→</span>
            <span className="text-purple-400">ReactFlow Canvas</span>
            <span>→</span>
            <span className="text-orange-400">YAML Generator</span>
            <span>→</span>
            <span className="text-amber-400">CWL YAML</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            ["Bidirectional parser", "~3,100 lines of TypeScript parser and generator. Handles the full CWL v1.2 spec including scatter, multi-tool workflows, embedded tools, and secondary files. 100% semantic fidelity on round-trip."],
            ["Real-time type checking", "Port-to-port connections are validated against CWL type compatibility rules before the edge is drawn. Prevents entire classes of structural errors from ever reaching execution."],
            ["ReactFlow + Redux integration", "All graph state (nodes, edges, selections) lives in Redux. ReactFlow canvas reads from store. This makes undo/redo, import/export, and real-time sync trivial to implement."],
            ["StreamFlow deployment targets", "One-click config generation for Docker, Kubernetes, HPC, and Slurm via StreamFlow integration. Users go from visual design to deployment config without writing a line."],
          ].map(([title, desc]) => (
            <div key={title as string} className="flex gap-3">
              <span className="text-amber-400/50 shrink-0 mt-0.5">▪</span>
              <div>
                <span className="text-zinc-300">{title}: </span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// User Study</h2>
        <p>
          Conducted a formal Technology Acceptance Model (TAM) evaluation with domain experts — bioinformaticians
          and researchers who use CWL daily. The Behavioral Intention to Use score (5.02/7) indicates strong
          acceptance and willingness to adopt the tool in real workflows. Perceived Usefulness and Ease of Use
          both rated above the TAM acceptance threshold.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Deployment Targets</h2>
        <div className="flex flex-wrap gap-2">
          {["Docker", "Kubernetes", "HPC", "Slurm", "StreamFlow"].map((t) => (
            <span
              key={t}
              className="font-mono text-xs border border-zinc-700 text-zinc-500 px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}
