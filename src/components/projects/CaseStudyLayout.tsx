import Link from "next/link";
import Image from "next/image";
import { TechBadge } from "@/components/ui/TechBadge";

interface Metric {
  value: string;
  label: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

interface CaseStudyLayoutProps {
  title: string;
  statusLabel: string;
  statusColor: string;
  tagline: string;
  techStack: string[];
  metrics: Metric[];
  images?: ProjectImage[];
  children: React.ReactNode;
}

export function CaseStudyLayout({
  title,
  statusLabel,
  statusColor,
  tagline,
  techStack,
  metrics,
  images,
  children,
}: CaseStudyLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-14">
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Back */}
        <Link
          href="/#projects"
          className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors w-fit"
        >
          ← Back
        </Link>

        {/* Hero */}
        <div className="flex flex-col gap-4 border-b border-zinc-900 pb-10">
          <span className={`font-mono text-xs border px-2 py-0.5 w-fit ${statusColor}`}>
            {statusLabel}
          </span>
          <h1 className="font-mono text-3xl md:text-4xl font-semibold text-zinc-100">{title}</h1>
          <p className="font-mono text-sm text-zinc-500 max-w-2xl leading-relaxed">{tagline}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border border-zinc-800 bg-zinc-900/30 p-4 flex flex-col gap-1"
            >
              <span className="font-mono text-2xl font-semibold text-amber-400">{m.value}</span>
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-wide">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 text-sm text-zinc-400 font-mono leading-relaxed">
          {children}
        </div>

        {/* Screenshots / Figures */}
        {images && images.length > 0 && (
          <div className="flex flex-col gap-6">
            {images.map((img) => (
              <figure key={img.src} className="flex flex-col gap-2">
                <div className="border border-zinc-800 overflow-hidden bg-zinc-900/30">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
                {img.caption && (
                  <figcaption className="font-mono text-xs text-zinc-600 text-center">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
