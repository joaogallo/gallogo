"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { getModulesForAge, getModuleLessons } from "@/data/lessons";
import Link from "next/link";

export default function LessonsPage() {
  const { ageGroup } = useTheme();
  const modules = getModulesForAge(ageGroup);

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-content">Licoes</h1>
        <Link
          href="/playground"
          className="rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Abrir Playground
        </Link>
      </div>

      {modules.map((mod) => {
        const lessons = getModuleLessons(mod.id, ageGroup);
        if (lessons.length === 0) return null;

        return (
          <div key={mod.id} className="space-y-2">
            <h2 className="text-sm font-semibold text-content-muted uppercase tracking-wide">
              {mod.title}
            </h2>
            <p className="text-sm text-content-secondary">{mod.description}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/playground`}
                  className={cn(
                    "rounded-[var(--radius-md)] border border-border bg-surface p-4 hover:bg-surface-secondary transition-colors"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">
                      {lesson.id}
                    </span>
                    <span className="text-sm font-medium text-content">
                      {lesson.title}
                    </span>
                    <span className="ml-auto text-[10px] text-content-muted">
                      {lesson.points}pts
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-content-muted line-clamp-2">
                    {lesson.description}
                  </p>
                  {lesson.challenges.length > 0 && (
                    <div className="mt-2 text-[10px] text-content-muted">
                      {lesson.challenges.length} desafio
                      {lesson.challenges.length > 1 ? "s" : ""}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
