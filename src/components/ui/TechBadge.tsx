import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
}

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded-sm",
        "hover:border-amber-400 hover:text-amber-400 transition-colors duration-200",
        className
      )}
    >
      {label}
    </span>
  );
}
