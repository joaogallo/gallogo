"use client";

import { pointsToNextLevel } from "@/data/levels";

interface LevelIndicatorProps {
  totalPoints: number;
  /** Show full label or compact */
  compact?: boolean;
}

/** Progress bar showing advancement toward the next level */
export function LevelIndicator({ totalPoints, compact }: LevelIndicatorProps) {
  const { current, next, progress, remaining } = pointsToNextLevel(totalPoints);

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-content">
          {current.icon} {compact ? `Lv.${current.level}` : current.namePt}
        </span>
        {next ? (
          <span className="text-content-muted">
            {remaining} pts p/ {compact ? `Lv.${next.level}` : next.namePt}
          </span>
        ) : (
          <span className="text-primary font-medium">Nivel maximo!</span>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${Math.max(progress * 100, 2)}%` }}
        />
      </div>
    </div>
  );
}
