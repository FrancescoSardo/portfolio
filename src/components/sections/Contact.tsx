"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const CONTACT_LINES = [
  { key: "email", value: "it@bloomticket.com", href: "mailto:it@bloomticket.com", copyable: true },
  { key: "github", value: "github.com/FrancescoSardo", href: "https://github.com/FrancescoSardo", copyable: false },
  { key: "linkedin", value: "linkedin.com/in/francescosardo", href: "https://linkedin.com/in/francescosardo", copyable: false },
  { key: "location", value: "Italy → relocation ready", href: null, copyable: false },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — copy */}
        <div className="flex flex-col gap-4">
          <SectionLabel label="CONTACT" />
          <h2 className="font-mono text-2xl text-zinc-100">Get in touch</h2>
          <p className="font-mono text-sm text-zinc-500 leading-relaxed max-w-sm">
            Open to full-stack and AI engineering roles. Currently applying for relocation to NL, CH, DE, SE, DK, IE.
            EU citizen — no work permit required.
          </p>
          <div className="font-mono text-xs text-green-400 border border-green-400/20 px-3 py-2 w-fit mt-2">
            ● STATUS: OPEN TO OPPORTUNITIES
          </div>
        </div>

        {/* Right — terminal contact block */}
        <div className="border border-zinc-800 bg-zinc-900/40 p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="text-zinc-600 ml-1 text-xs">contact.sh</span>
          </div>

          <div className="flex flex-col gap-3">
            {CONTACT_LINES.map(({ key, value, href, copyable }) => {
              const inner = (
                <div className="flex gap-3 items-center group">
                  <span className="text-amber-400 text-xs w-16 shrink-0">&gt; {key}</span>
                  <span
                    className={`text-xs text-zinc-300 ${
                      (href || copyable) ? "hover:text-amber-400 cursor-pointer transition-colors" : ""
                    }`}
                    onClick={copyable ? () => handleCopy(value) : undefined}
                  >
                    {value}
                  </span>
                  {copyable && (
                    <span className="text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied ? "copied!" : "click to copy"}
                    </span>
                  )}
                </div>
              );

              if (href && !copyable) {
                return (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                );
              }
              return <div key={key}>{inner}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
