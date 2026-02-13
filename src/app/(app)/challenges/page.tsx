"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { getLessonsForAge } from "@/data/lessons";
import Link from "next/link";

export default function ChallengesPage() {
  const { ageGroup } = useTheme();
  const lessons = getLessonsForAge(ageGroup);
  const allChallenges = lessons.flatMap((l) =>
    l.challenges.map((c) => ({ ...c, lessonId: l.id, lessonTitle: l.title }))
  );

  const difficultyLabel = ["", "Facil", "Medio", "Dificil"];
  const difficultyColor = [
    "",
    "text-primary",
    "text-accent",
    "text-error",
  ];

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-content">Desafios</h1>
        <span className="text-sm text-content-muted">
          {allChallenges.length} desafios disponiveis
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {allChallenges.map((ch) => (
          <Link
            key={ch.id}
            href="/playground"
            className="rounded-[var(--radius-md)] border border-border bg-surface p-4 hover:bg-surface-secondary transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-content">
                {ch.title}
              </span>
              <span
                className={cn(
                  "ml-auto text-[10px]",
                  difficultyColor[ch.difficulty]
                )}
              >
                {difficultyLabel[ch.difficulty]}
              </span>
              <span className="text-[10px] text-content-muted">
                {ch.points}pts
              </span>
            </div>
            <p className="mt-1 text-xs text-content-secondary line-clamp-2">
              {ch.description}
            </p>
            <div className="mt-2 text-[10px] text-content-muted">
              Licao {ch.lessonId} — {ch.lessonTitle}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
