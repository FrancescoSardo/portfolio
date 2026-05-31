import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  href,
  variant = "ghost",
  external = false,
  children,
  className,
}: ButtonProps) {
  const base =
    "font-mono text-xs tracking-wide px-4 py-2 border transition-colors duration-200 inline-flex items-center gap-1";
  const variants = {
    primary:
      "border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black",
    ghost:
      "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200",
  };

  const props = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Link {...props} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
