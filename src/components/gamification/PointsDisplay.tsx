"use client";

import { useGamificationStore } from "@/stores/gamification-store";

/** Compact points + level display for the Header */
export function PointsDisplay() {
  const { totalPoints, level, levelName, loaded } = useGamificationStore();

  if (!loaded) return null;

  return (
    <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface-secondary px-2.5 py-1">
      <span className="text-xs font-bold text-primary">{totalPoints}</span>
      <span className="text-[10px] text-content-muted">pts</span>
      <span className="mx-0.5 h-3 w-px bg-border" />
      <span className="text-xs text-content-secondary" title={levelName}>
        Lv.{level}
      </span>
    </div>
  );
}
