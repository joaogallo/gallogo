"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface HintSystemProps {
  hints: string[];
}

export function HintSystem({ hints }: HintSystemProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  if (hints.length === 0) return null;

  return (
    <div className="space-y-2">
      {hints.slice(0, revealedCount).map((hint, i) => (
        <div
          key={i}
          className="rounded-[var(--radius-sm)] bg-[color:var(--color-accent)]/10 border border-[color:var(--color-accent)]/20 px-3 py-2 text-sm text-content-secondary"
        >
          <span className="font-medium text-accent">Dica {i + 1}:</span>{" "}
          {hint}
        </div>
      ))}

      {revealedCount < hints.length && (
        <button
          onClick={() => setRevealedCount((c) => c + 1)}
          className={cn(
            "text-sm font-medium transition-colors",
            revealedCount === 0
              ? "text-accent hover:text-accent-light"
              : "text-content-muted hover:text-content-secondary"
          )}
        >
          {revealedCount === 0
            ? "Precisa de ajuda? Clique para uma dica"
            : `Mais ${hints.length - revealedCount} dica${hints.length - revealedCount > 1 ? "s" : ""}`}
        </button>
      )}
    </div>
  );
}
