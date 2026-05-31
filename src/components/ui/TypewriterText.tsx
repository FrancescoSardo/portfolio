"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterText({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 2500,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      const timer = setTimeout(() => {
        setDisplayText((t) => t.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timer);
    }

    if (displayText === current) {
      setIsPaused(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(current.slice(0, displayText.length + 1));
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="font-mono text-zinc-200">
      {displayText}
      <span className="animate-blink text-amber-400">█</span>
    </span>
  );
}
