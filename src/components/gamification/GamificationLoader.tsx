"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGamificationStore } from "@/stores/gamification-store";

/**
 * Invisible component that loads gamification stats when a user session exists.
 * Placed in Providers so it runs once globally.
 */
export function GamificationLoader() {
  const { data: session } = useSession();
  const { loaded, setStats } = useGamificationStore();

  useEffect(() => {
    if (!session?.user?.id || loaded) return;

    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setStats({
            totalPoints: data.totalPoints,
            level: data.level,
            streak: data.streak,
            lastActive: data.lastActive,
            earnedBadgeIds: data.earnedBadgeIds,
          });
        }
      })
      .catch(() => {});
  }, [session?.user?.id, loaded, setStats]);

  return null;
}
