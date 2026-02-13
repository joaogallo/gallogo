"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  image: string | null;
  ageGroup: string;
  totalPoints: number;
  level: number;
  levelName: string;
  levelIcon: string;
  streak: number;
  isCurrentUser: boolean;
}

type AgeFilter = "all" | "AGE_6_8" | "AGE_8_12" | "AGE_10_14";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] =
    useState<LeaderboardEntry | null>(null);
  const [filter, setFilter] = useState<AgeFilter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = filter !== "all" ? `?ageGroup=${filter}` : "";
    fetch(`/api/leaderboard${params}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setEntries(data.leaderboard);
          setCurrentUserRank(data.currentUserRank);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  const AGE_OPTIONS: { value: AgeFilter; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "AGE_6_8", label: "6-8" },
    { value: "AGE_8_12", label: "8-12" },
    { value: "AGE_10_14", label: "10-14" },
  ];

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-content">Ranking</h1>
        <div className="flex gap-1 rounded-[var(--radius-md)] border border-border p-0.5">
          {AGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium transition-colors",
                filter === opt.value
                  ? "bg-primary text-white"
                  : "text-content-muted hover:text-content-secondary"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-content-muted">Carregando ranking...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-8 text-center">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-content-secondary font-medium">
            Nenhum participante ainda
          </p>
          <p className="text-sm text-content-muted mt-1">
            Complete licoes e desafios para aparecer no ranking!
          </p>
          <Link
            href="/playground"
            className="mt-4 inline-block rounded-[var(--radius-md)] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Comecar agora
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <LeaderboardRow key={entry.userId} entry={entry} />
          ))}

          {/* Current user outside top 50 */}
          {currentUserRank && (
            <>
              <div className="flex items-center gap-2 py-2">
                <div className="flex-1 border-t border-border border-dashed" />
                <span className="text-xs text-content-muted">sua posicao</span>
                <div className="flex-1 border-t border-border border-dashed" />
              </div>
              <LeaderboardRow entry={currentUserRank} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const initials = entry.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const rankDisplay =
    entry.rank === 1
      ? "🥇"
      : entry.rank === 2
        ? "🥈"
        : entry.rank === 3
          ? "🥉"
          : `#${entry.rank}`;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[var(--radius-md)] border p-3 transition-colors",
        entry.isCurrentUser
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-surface"
      )}
    >
      {/* Rank */}
      <div className="w-10 text-center text-sm font-bold text-content-secondary">
        {rankDisplay}
      </div>

      {/* Avatar */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-content truncate">
            {entry.name}
          </span>
          {entry.isCurrentUser && (
            <span className="text-[10px] text-primary font-medium">(voce)</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-content-muted">
          <span>
            {entry.levelIcon} {entry.levelName}
          </span>
          {entry.streak > 0 && <span>🔥{entry.streak}</span>}
        </div>
      </div>

      {/* Points */}
      <div className="text-right">
        <div className="text-sm font-bold text-primary">
          {entry.totalPoints.toLocaleString()}
        </div>
        <div className="text-[10px] text-content-muted">pts</div>
      </div>
    </div>
  );
}
