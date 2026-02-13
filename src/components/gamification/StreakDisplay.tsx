"use client";

interface StreakDisplayProps {
  streak: number;
}

/** Shows the current daily streak */
export function StreakDisplay({ streak }: StreakDisplayProps) {
  if (streak <= 0) return null;

  return (
    <div className="flex items-center gap-1 text-xs" title={`${streak} dias seguidos`}>
      <span className="text-sm">🔥</span>
      <span className="font-bold text-content">{streak}</span>
    </div>
  );
}
