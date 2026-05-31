import { cn } from "@/lib/utils";

type StatusType = "live" | "thesis" | "experimental" | "open" | "private";

interface StatusDotProps {
  status: StatusType;
  label: string;
  className?: string;
}

const colorMap: Record<StatusType, string> = {
  live: "text-green-400 border-green-400/30",
  thesis: "text-amber-400 border-amber-400/30",
  experimental: "text-orange-400 border-orange-400/30",
  open: "text-green-400 border-green-400/30",
  private: "text-amber-400 border-amber-400/30",
};

export function StatusDot({ status, label, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs border px-2 py-0.5 rounded-sm",
        colorMap[status],
        className
      )}
    >
      {label}
    </span>
  );
}
