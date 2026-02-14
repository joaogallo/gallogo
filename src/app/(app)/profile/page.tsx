"use client";

import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import type { AgeGroupId } from "@/theme/age-themes";
import { useGamificationStore } from "@/stores/gamification-store";
import { LevelIndicator } from "@/components/gamification/LevelIndicator";
import { BadgeGrid } from "@/components/gamification/BadgeGrid";
import Link from "next/link";

const AGE_MAP: Record<string, AgeGroupId> = {
  AGE_6_8: "6-8",
  AGE_8_12: "8-12",
  AGE_10_14: "10-14",
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const { ageGroup, setAgeGroup } = useTheme();
  const {
    totalPoints,
    level,
    levelName,
    streak,
    earnedBadgeIds,
    loaded,
  } = useGamificationStore();

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-content-muted">Carregando...</p>
      </div>
    );
  }

  const user = session.user;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userAgeGroup = AGE_MAP[(user as any).ageGroup] || ageGroup;
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
          {initials}
        </div>
        <div>
          <h1 className="text-xl font-bold text-content">
            {user.name || "Usuário"}
          </h1>
          <p className="text-sm text-content-muted">{user.email}</p>
          <p className="text-xs text-content-muted mt-0.5">
            Perfil: {userAgeGroup} anos
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {loaded ? level : "-"}
          </div>
          <div className="text-xs text-content-muted">Nível</div>
          <div className="text-[10px] text-content-secondary">
            {loaded ? levelName : "..."}
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {loaded ? totalPoints.toLocaleString() : "-"}
          </div>
          <div className="text-xs text-content-muted">Pontos</div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {loaded ? earnedBadgeIds.length : "-"}
          </div>
          <div className="text-xs text-content-muted">Conquistas</div>
        </div>
      </div>

      {/* Level progress */}
      {loaded && (
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
          <LevelIndicator totalPoints={totalPoints} />
        </div>
      )}

      {/* Streak */}
      {loaded && streak > 0 && (
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-sm font-medium text-content">
              {streak} {streak === 1 ? "dia" : "dias"} seguidos
            </p>
            <p className="text-xs text-content-muted">
              Continue praticando para manter seu streak!
            </p>
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-content">Conquistas</h2>
          <Link
            href="/leaderboard"
            className="text-xs text-primary hover:underline"
          >
            Ver ranking
          </Link>
        </div>
        {loaded ? (
          <BadgeGrid earnedBadgeIds={earnedBadgeIds} />
        ) : (
          <p className="text-sm text-content-muted">Carregando conquistas...</p>
        )}
      </div>

      {/* Theme switcher */}
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 space-y-3">
        <h2 className="text-sm font-semibold text-content">
          Perfil de idade (tema visual)
        </h2>
        <div className="flex gap-2">
          {(["6-8", "8-12", "10-14"] as AgeGroupId[]).map((ag) => (
            <button
              key={ag}
              onClick={() => setAgeGroup(ag)}
              className={cn(
                "flex-1 rounded-[var(--radius-sm)] border py-2 text-sm font-medium transition-colors",
                ageGroup === ag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-content-secondary hover:bg-surface-secondary"
              )}
            >
              {ag}
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="w-full rounded-[var(--radius-md)] border border-error/30 py-3 text-sm font-medium text-error hover:bg-error/5 transition-colors"
      >
        Sair da conta
      </button>
    </div>
  );
}
