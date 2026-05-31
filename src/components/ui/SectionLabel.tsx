"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-widest text-amber-400 uppercase mb-2",
        className
      )}
    >
      // {label}
    </p>
  );
}
