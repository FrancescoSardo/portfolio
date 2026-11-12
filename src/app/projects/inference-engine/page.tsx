import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qwen3 Inference Engine — Francesco Sardo",
  description:
    "From-scratch GGUF inference engine in C for Qwen3 dense and MoE models on macOS — mmap loading, BPE tokenizer, CPU forward pass, MoE routing, and an OpenAI-compatible HTTP server, with a Metal backend in progress.",
};

const METRICS = [
  { value: "2", label: "Model Architectures" },
  { value: "~8.7k", label: "Lines of C" },
  { value: "151,936", label: "Vocabulary Size" },
  { value: "0", label: "Runtime Dependencies" },
];

const CPU_BENCH = [
  { suite: "prefill", name: "cold prefill", p: 8, g: 0, prefill: "27.444", tps: "0.29", ttft: "27.44", decode: "0.00" },
  { suite: "prefill", name: "cold prefill", p: 32, g: 0, prefill: "78.812", tps: "0.41", ttft: "78.81", decode: "0.00" },
  { suite: "prefill", name: "cold prefill", p: 128, g: 0, prefill: "234.847", tps: "0.55", ttft: "234.85", decode: "0.00" },
  { suite: "sampling", name: "greedy", p: 26, g: 3, prefill: "80.086", tps: "0.32", ttft: "80.09", decode: "0.48" },
  { suite: "sampling", name: "balanced", p: 26, g: 3, prefill: "1.400", tps: "18.57", ttft: "1.40", decode: "0.75" },
  { suite: "sampling", name: "creative", p: 26, g: 3, prefill: "1.338", tps: "19.43", ttft: "1.34", decode: "0.75" },
  { suite: "sampling", name: "top-k 40", p: 26, g: 3, prefill: "1.326", tps: "19.61", ttft: "1.34", decode: "0.73" },
  { suite: "sampling", name: "min-p 0.10", p: 26, g: 3, prefill: "1.334", tps: "19.49", ttft: "1.33", decode: "0.75" },
  { suite: "sampling", name: "hot t=1.50", p: 26, g: 3, prefill: "1.329", tps: "19.56", ttft: "1.34", decode: "0.73" },
];

export default function InferenceEnginePage() {
  return (
    <CaseStudyLayout
      title="Qwen3 Inference Engine"
      statusLabel="● EXPERIMENTAL — Local C + Metal inference engine"
      statusColor="text-amber-400 border-amber-400/30"
      tagline="A from-scratch GGUF inference engine in C for Qwen3 dense and MoE models on macOS. It loads quantized weights with mmap, tokenizes with the model's own BPE vocab, runs the full transformer forward pass on the CPU, routes MoE tokens through 128 experts, and exposes an OpenAI-compatible HTTP API. The Metal backend is being built from the context layer upward."
      techStack={["C", "Metal", "GGUF", "Qwen3", "GQA / MoE", "POSIX HTTP"]}
      metrics={METRICS}
      images={[]}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">{"// Context"}</h2>
        <p>
          Local inference stacks usually hide the interesting parts behind a framework. This project
          asks what it actually takes to load a GGUF file and run Qwen3 end to end with nothing but
          C, <code className="text-amber-400 text-xs">mmap</code>, Metal, and the model format
          itself. The targets are deliberately different shapes: Qwen3-14B (dense, GQA 40q/8kv) and
          Qwen3-30B-A3B (MoE, 128 experts, top-8 routing, 3B active parameters). Same engine, shape
          detected from the file.
        </p>
        <p className="mt-4">
          The project is mainly inspired by{" "}
          <a
            href="https://github.com/antirez/ds4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline"
          >
            antirez&apos;s DS4 (DwarfStar)
          </a>
          , a self-contained inference engine built for a deliberately narrow set of models. This
          engine follows the same philosophy for Qwen3: small, readable C, GGUF as the source of
          truth, and no framework between the model file and the kernel.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">{"// What I Built"}</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "GGUF loader with mmap",
              "Parses the header, metadata table, and tensor directory directly from a read-only mmap. Tensor pointers are resolved into the mapping, so the full model is never copied into RAM. Model shape — dense vs MoE, head dim, vocab size, FFN width — is inferred from metadata and the tensor directory rather than hardcoded.",
            ],
            [
              "BPE tokenizer from the model file",
              "Loads vocabulary, scores, and merge ranks from GGUF metadata, implements GPT-2 byte-level encoding with byte fallback, and applies iterative BPE merges. Also emits ChatML prompts (<|im_start|> / <|im_end|>) with optional Qwen3 thinking mode.",
            ],
            [
              "CPU forward pass",
              "RMSNorm, per-head QK-Norm, half-split RoPE (θ = 1e6 / 1e7), grouped-query attention, and SwiGLU — implemented directly against the model parameters, with a KV cache laid out as [layer][position][kv_head][head_dim].",
            ],
            [
              "Quantized matvec, dequantized on demand",
              "GGUF weights stay in their original Q8_0, Q4_K, F16, or F32 form. The matvec path dequantizes one weight row at a time into a scratch buffer, computes the dot product, and discards it — trading a little compute for a much smaller resident set.",
            ],
            [
              "MoE routing and expert FFN",
              "Qwen3-30B-A3B's router produces 128 expert logits per token, selects top-8, normalizes the selected weights, runs each expert's SwiGLU FFN, and accumulates the weighted outputs. The dense and MoE paths share the same layer loop and attention code.",
            ],
            [
              "Sessions, KV cache and sampling",
              "Prompt sync reuses the longest common token prefix, then decodes one token at a time. Sampling supports argmax, temperature, top-k, top-p, and min-p, with a deterministic RNG for reproducible runs.",
            ],
            [
              "OpenAI-compatible HTTP server",
              "A dependency-free POSIX socket server with GET /health and POST /v1/chat/completions, a small bounded JSON parser, request limits, and Server-Sent Events for streaming tokens. It accepts both OpenAI-style messages and a plain {\"prompt\": \"...\"} body.",
            ],
            [
              "Metal backend context",
              "Creates the device and command queue, compiles the .metal sources into one library, caches compute pipelines, wraps the GGUF mmap as no-copy MTLBuffers, and allocates KV-cache and activation buffers. Kernel dispatch is the next layer: RMSNorm, RoPE, attention, quantized matmul, SwiGLU, and MoE.",
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
        <h2 className="font-mono text-base text-zinc-200 mb-3">{"// Architecture"}</h2>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs">
          <div className="flex flex-wrap gap-2 items-center text-zinc-500">
            <span className="text-amber-400">GGUF file</span>
            <span>→</span>
            <span className="text-zinc-300">mmap + tensor directory</span>
            <span>→</span>
            <span className="text-blue-400">shape detection</span>
            <span>→</span>
            <span className="text-emerald-400">tokenizer / ChatML</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-4">
            <span>→</span>
            <span className="text-zinc-300">layer loop × N</span>
            <span>→</span>
            <span className="text-purple-400">RMSNorm / QK-Norm / RoPE</span>
            <span>→</span>
            <span className="text-blue-400">GQA + KV cache</span>
            <span>→</span>
            <span className="text-amber-400">SwiGLU / top-8 MoE</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-zinc-500 mt-2 ml-8">
            <span>→</span>
            <span className="text-emerald-400">final norm + LM head</span>
            <span>→</span>
            <span className="text-zinc-300">sampler</span>
            <span>→</span>
            <span className="text-blue-400">HTTP / SSE</span>
          </div>
          <div className="mt-3 text-zinc-600">
            CPU path implemented end to end; Metal path currently covers device, shader library,
            pipeline cache, no-copy weight buffers, KV cache and activation buffers
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">{"// CPU Benchmark"}</h2>
        <p>
          Measured with Qwen3-30B-A3B Q8_0 (30.25 GiB), CPU backend, 4 threads, and a 1024-token
          context. The test covers cold prefill at 8, 32, and 128 prompt tokens plus a sampling
          sweep over six decoding configurations.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            ["30.25 GiB", "Model File"],
            ["11.8 GiB", "Peak RSS"],
            ["8.73 s", "Weight Warm-up"],
            ["0.68 tok/s", "Weighted Decode"],
          ].map(([value, label]) => (
            <div key={label} className="border border-zinc-800 bg-zinc-900/30 p-3">
              <div className="font-mono text-sm text-amber-400">{value}</div>
              <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto border border-zinc-800">
          <table className="w-full border-collapse font-mono text-xs whitespace-nowrap">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left font-normal py-2 px-3">Suite</th>
                <th className="text-left font-normal py-2 px-3">Scenario</th>
                <th className="text-right font-normal py-2 px-3">P</th>
                <th className="text-right font-normal py-2 px-3">G</th>
                <th className="text-right font-normal py-2 px-3">Prefill s</th>
                <th className="text-right font-normal py-2 px-3">Prefill tok/s</th>
                <th className="text-right font-normal py-2 px-3">TTFT s</th>
                <th className="text-right font-normal py-2 px-3">Decode tok/s</th>
              </tr>
            </thead>
            <tbody>
              {CPU_BENCH.map((r) => (
                <tr
                  key={`${r.suite}-${r.name}-${r.p}`}
                  className="border-b border-zinc-900/80 last:border-0 text-zinc-500"
                >
                  <td className="py-2 px-3 text-zinc-600">{r.suite}</td>
                  <td className="py-2 px-3 text-zinc-300">{r.name}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.p}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.g}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.prefill}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.tps}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.ttft}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.decode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-zinc-600">
          Cold prefill is the first-touch path. The later sampling rows benefit from warm weights
          and prefix reuse, so their 18–19 tok/s prefill numbers are not directly comparable. Peak
          RSS stayed at 11.8 GiB despite the 30.25 GiB file because weights remain mmap&apos;d and
          are dequantized one row at a time. These are CPU-only results; Metal kernels are not
          dispatched yet.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">{"// Key Engineering Decisions"}</h2>
        <div className="flex flex-col gap-3">
          {[
            [
              "Keep weights quantized until the dot product",
              "Dequantizing the whole model to FP32 would be simple, but it would multiply memory use and copy time. Rows are decoded on the fly instead, so the mmap stays authoritative and the process can run a 30B-parameter file on a laptop.",
            ],
            [
              "Infer the architecture, don't assume it",
              "Head dimension, vocabulary size, and FFN width are read from metadata and tensor shapes, with sane fallbacks for minimal test files. That made it possible to build synthetic GGUFs for dense and MoE shapes and test the loader without downloading a model.",
            ],
            [
              "One layer loop, two FFN paths",
              "Dense and MoE models share attention, norms, RoPE, and the residual structure. The only branch is the FFN: a normal SwiGLU block or router → top-8 experts → weighted combine. Keeping that seam narrow made the MoE addition a focused change instead of a fork.",
            ],
            [
              "Metal needs page-aligned no-copy buffers",
              "GGUF tensor offsets are aligned to 32 bytes, not to a page, while newBufferWithBytesNoCopy requires page alignment. The wrapper aligns the base address down, rounds the length up, and carries the real tensor offset in a small buffer descriptor — so model weights are genuinely aliased, not copied.",
            ],
            [
              "Build the GPU context before the kernels",
              "Pipelines, buffer lifetimes, and weight aliasing are easy to get wrong once five kernels are already in flight. The context layer landed first, with a pipeline cache and explicit ownership rules, so each kernel can be added and tested against real buffers.",
            ],
            [
              "Tests build models, not mocks",
              "The test harness writes synthetic GGUF files with real metadata, tokenizer tables, and tensor directories, then exercises parsing, tokenization, ChatML encoding, and shape detection for both architectures. A real 30B-A3B GGUF smoke test validates the same path at full scale.",
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
        <h2 className="font-mono text-base text-zinc-200 mb-3">{"// Current Limits & Next"}</h2>
        <p>
          Generation currently runs on the CPU; the Metal path is a complete context and buffer
          layer with kernels still to come. The next milestones are the GPU kernels (RMSNorm,
          QK-Norm, RoPE, GQA flash attention, quantized matmul, SwiGLU, MoE routing), followed by
          graph execution for decode and chunked prefill, and a CPU-vs-GPU logits parity suite. The
          CLI frontend is also intentionally thin while the engine API settles.
        </p>
      </section>

      <section className="flex flex-wrap gap-3 pt-4 border-t border-zinc-900">
        <a
          href="https://github.com/antirez/ds4"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          Inspiration: antirez/ds4 — DwarfStar ↗
        </a>
      </section>
    </CaseStudyLayout>
  );
}
