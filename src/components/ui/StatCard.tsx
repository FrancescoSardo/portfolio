"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
}

function parseNumeric(value: string): { num: number | null; prefix: string; suffix: string } {
  const match = value.match(/^([~]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: null, prefix: "", suffix: value };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}

export function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");
  const { num, prefix, suffix } = parseNumeric(value);

  useEffect(() => {
    if (!isInView || num === null) {
      setDisplayed(value);
      return;
    }
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      const formatted = Number.isInteger(num)
        ? Math.round(current).toString()
        : current.toFixed(2);
      setDisplayed(`${prefix}${formatted}${suffix}`);
      if (step >= steps) {
        setDisplayed(value);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, num, value, prefix, suffix]);

  return (
    <div
      ref={ref}
      className="border border-zinc-800 bg-zinc-900/50 p-5 flex flex-col gap-1 hover:border-amber-400/30 transition-colors duration-300"
    >
      <span className="font-mono text-3xl font-semibold text-amber-400">{displayed}</span>
      <span className="font-mono text-xs text-zinc-500 tracking-wide uppercase">{label}</span>
    </div>
  );
}
