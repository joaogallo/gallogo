"use client";

import { useEffect, useRef } from "react";
import { useGamificationStore } from "@/stores/gamification-store";

/** Floating toast that shows achievements one at a time */
export function AchievementToast() {
  const { pendingAchievements, shiftAchievement } = useGamificationStore();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const confettiFired = useRef(false);

  const current = pendingAchievements[0];

  useEffect(() => {
    if (!current) {
      confettiFired.current = false;
      return;
    }

    // Fire confetti for level_up and badge achievements
    if (
      (current.type === "level_up" || current.type === "badge") &&
      !confettiFired.current
    ) {
      confettiFired.current = true;
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({
          particleCount: current.type === "level_up" ? 150 : 80,
          spread: 70,
          origin: { y: 0.3 },
        });
      });
    }

    // Auto-dismiss after 3 seconds
    timerRef.current = setTimeout(() => {
      shiftAchievement();
      confettiFired.current = false;
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [current, shiftAchievement]);

  if (!current) return null;

  const bgClass =
    current.type === "level_up"
      ? "bg-primary text-white"
      : current.type === "badge"
        ? "bg-surface border border-primary/40"
        : "bg-surface border border-border";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div
        className={`pointer-events-auto flex items-center gap-3 rounded-[var(--radius-lg)] px-5 py-3 shadow-lg animate-bounce-in ${bgClass}`}
        onClick={() => shiftAchievement()}
      >
        <span className="text-2xl">{current.icon}</span>
        <div>
          <p
            className={`text-sm font-bold ${
              current.type === "level_up" ? "text-white" : "text-content"
            }`}
          >
            {current.title}
          </p>
          <p
            className={`text-xs ${
              current.type === "level_up"
                ? "text-white/80"
                : "text-content-muted"
            }`}
          >
            {current.description}
          </p>
        </div>
      </div>
    </div>
  );
}
