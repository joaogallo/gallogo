"use client";

import { useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useGamificationStore } from "@/stores/gamification-store";
import { getBadgeById } from "@/data/badges";
import { getLevelForPoints } from "@/data/levels";

/** Loads gamification stats from the API and keeps the store in sync */
export function useGamification() {
  const { data: session } = useSession();
  const store = useGamificationStore();

  // Load stats on mount (once per session)
  useEffect(() => {
    if (!session?.user?.id || store.loaded) return;

    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          store.setStats({
            totalPoints: data.totalPoints,
            level: data.level,
            streak: data.streak,
            lastActive: data.lastActive,
            earnedBadgeIds: data.earnedBadgeIds,
            completedLessonIds: data.completedLessonIds ?? [],
            completedChallengeIds: data.completedChallengeIds ?? [],
          });
        }
      })
      .catch(() => {
        // Silently fail — stats will stay at defaults
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  /** Call this after a lesson or challenge is completed */
  const recordProgress = useCallback(
    async (params: {
      lessonId: string;
      challengeId?: string;
      code?: string;
      points: number;
    }) => {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) return null;

      const data = await res.json();

      // Track completion in store regardless of first or repeat
      if (params.challengeId) {
        store.addCompletedChallenge(params.challengeId);
      } else {
        store.addCompletedLesson(params.lessonId);
      }

      if (data.isFirstCompletion) {
        // Update points in store
        const oldLevel = store.level;
        store.addPoints(params.points);

        // Check for level up
        const newLevelDef = getLevelForPoints(data.totalPoints);
        if (newLevelDef.level > oldLevel) {
          store.levelUp(newLevelDef.level, newLevelDef.namePt);
        }

        // Award new badges
        if (data.newBadges?.length) {
          for (const badgeId of data.newBadges) {
            const badge = getBadgeById(badgeId);
            if (badge) {
              store.addBadge(badgeId, badge.namePt, badge.icon);
            }
          }
        }

        // Points toast
        store.queueAchievement({
          id: crypto.randomUUID(),
          type: "points",
          title: `+${params.points} pontos`,
          description: data.isFirstCompletion
            ? "Primeira vez completando!"
            : "Progresso registrado",
          icon: "✨",
        });
      }

      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.level]
  );

  return {
    totalPoints: store.totalPoints,
    level: store.level,
    levelName: store.levelName,
    streak: store.streak,
    earnedBadgeIds: store.earnedBadgeIds,
    completedLessonIds: store.completedLessonIds,
    completedChallengeIds: store.completedChallengeIds,
    pendingAchievements: store.pendingAchievements,
    loaded: store.loaded,
    recordProgress,
    shiftAchievement: store.shiftAchievement,
  };
}
