"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#projects", label: "PROJECTS" },
  { href: "#ai-lab", label: "AI LAB" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#education", label: "EDUCATION" },
  { href: "#contact", label: "CONTACT" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm font-semibold text-amber-400 tracking-widest">
          FS
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden font-mono text-zinc-500 hover:text-zinc-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-black/95 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs tracking-widest text-zinc-400 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
