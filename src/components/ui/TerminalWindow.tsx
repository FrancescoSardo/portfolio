import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div className={cn("border border-zinc-800 bg-zinc-900/50", className)}>
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="font-mono text-xs text-zinc-600 ml-2">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
