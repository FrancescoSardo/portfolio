"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (!images) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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

        {/* Screenshots / Figures Carousel */}
        {images && images.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <div className="border border-zinc-800 overflow-hidden bg-zinc-900/30 relative aspect-video flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={images[currentIndex].src}
                      alt={images[currentIndex].alt}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Previous image"
                    >
                      <span className="font-mono text-sm">{"<"}</span>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Next image"
                    >
                      <span className="font-mono text-sm">{">"}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Indicators */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1 transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-amber-400" : "w-2 bg-zinc-800 hover:bg-zinc-600"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Caption */}
            {images[currentIndex].caption && (
              <p className="font-mono text-xs text-zinc-600 text-center">
                [{String(currentIndex + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}] — {images[currentIndex].caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
