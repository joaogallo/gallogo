"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import type { InterpreterState } from "@/logo";
import { getModulesForAge, getModuleLessons, getLesson } from "@/data/lessons";
import { LessonContent } from "./LessonContent";
import { useGamification } from "@/hooks/useGamification";

type PanelMode = "browse" | "lesson" | "free";

interface InstructionsPanelProps {
  interpreterRef?: React.RefObject<InterpreterState | null>;
  onCopyToTerminal?: (code: string) => void;
}

export function InstructionsPanel({
  interpreterRef,
  onCopyToTerminal,
}: InstructionsPanelProps) {
  const { ageGroup, theme } = useTheme();
  const { recordProgress } = useGamification();
  const [mode, setMode] = useState<PanelMode>("browse");
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(
    new Set()
  );

  const modules = getModulesForAge(ageGroup);

  const openLesson = useCallback((lessonId: string) => {
    setActiveLessonId(lessonId);
    setMode("lesson");
  }, []);

  const handleLessonComplete = useCallback(() => {
    if (activeLessonId) {
      setCompletedLessons((prev) => new Set(prev).add(activeLessonId));

      // Find next lesson
      const lesson = getLesson(activeLessonId);
      if (lesson) {
        // Award lesson points
        recordProgress({ lessonId: activeLessonId, points: lesson.points });

        const moduleLessons = getModuleLessons(lesson.moduleId, ageGroup);
        const idx = moduleLessons.findIndex((l) => l.id === activeLessonId);
        if (idx >= 0 && idx < moduleLessons.length - 1) {
          setActiveLessonId(moduleLessons[idx + 1].id);
          return;
        }
        // Try next module
        const nextModuleIdx = modules.findIndex(
          (m) => m.id === lesson.moduleId
        );
        if (nextModuleIdx >= 0 && nextModuleIdx < modules.length - 1) {
          const nextModLessons = getModuleLessons(
            modules[nextModuleIdx + 1].id,
            ageGroup
          );
          if (nextModLessons.length > 0) {
            setActiveLessonId(nextModLessons[0].id);
            return;
          }
        }
      }
      // No more lessons
      setMode("browse");
    }
  }, [activeLessonId, ageGroup, modules, recordProgress]);

  const handleChallengeComplete = useCallback(
    (challengeId: string) => {
      setCompletedChallenges((prev) => new Set(prev).add(challengeId));

      // Award challenge points
      if (activeLessonId) {
        const lesson = getLesson(activeLessonId);
        const challenge = lesson?.challenges.find((c) => c.id === challengeId);
        if (challenge) {
          recordProgress({
            lessonId: activeLessonId,
            challengeId,
            points: challenge.points,
          });
        }
      }
    },
    [activeLessonId, recordProgress]
  );

  const activeLesson = activeLessonId ? getLesson(activeLessonId) : null;

  // Lesson mode
  if (mode === "lesson" && activeLesson) {
    return (
      <div className="flex h-full flex-col bg-surface-secondary">
        <LessonContent
          key={activeLesson.id}
          lesson={activeLesson}
          interpreter={interpreterRef?.current ?? null}
          completedChallenges={completedChallenges}
          onChallengeComplete={handleChallengeComplete}
          onLessonComplete={handleLessonComplete}
          onCopyToTerminal={onCopyToTerminal}
        />
        <div className="border-t border-border px-4 py-1.5">
          <button
            onClick={() => setMode("browse")}
            className="text-xs text-content-muted hover:text-content transition-colors"
          >
            &larr; Voltar ao catálogo
          </button>
        </div>
      </div>
    );
  }

  // Free mode
  if (mode === "free") {
    return (
      <div className="flex h-full flex-col bg-surface-secondary">
        <div className="border-b border-border px-4 py-2.5 flex items-center gap-2">
          <h2 className="text-sm font-semibold text-content">Modo Livre</h2>
          <button
            onClick={() => setMode("browse")}
            className="ml-auto text-xs text-content-muted hover:text-content transition-colors"
          >
            Catálogo
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-[length:var(--font-size-base)] text-content-secondary">
            {theme.id === "6-8"
              ? "Hora de soltar a criatividade! Use o terminal para desenhar o que quiser."
              : theme.id === "10-14"
                ? "Modo sandbox. Todos os comandos disponíveis. Digite 'help' para referência."
                : "Desenhe livremente! Use todos os comandos que aprendeu. 'help' para ajuda."}
          </p>
          <ReferenceCard />
        </div>
      </div>
    );
  }

  // Browse mode (default)
  return (
    <div className="flex h-full flex-col bg-surface-secondary">
      <div className="border-b border-border px-4 py-2.5 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-content">Lições</h2>
        <button
          onClick={() => setMode("free")}
          className="ml-auto rounded-[var(--radius-sm)] bg-surface px-2.5 py-1 text-xs text-content-secondary border border-border hover:bg-surface-secondary transition-colors"
        >
          Modo Livre
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {modules.map((mod) => {
          const lessons = getModuleLessons(mod.id, ageGroup);
          if (lessons.length === 0) return null;

          return (
            <div key={mod.id} className="space-y-1.5">
              <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wide">
                {mod.title}
              </h3>
              {lessons.map((lesson) => {
                const done = completedLessons.has(lesson.id);
                const challengesDone = lesson.challenges.filter((c) =>
                  completedChallenges.has(c.id)
                ).length;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => openLesson(lesson.id)}
                    className={cn(
                      "w-full text-left rounded-[var(--radius-sm)] border px-3 py-2 transition-colors",
                      done
                        ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
                        : "border-border bg-surface hover:bg-surface-secondary"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {done && (
                        <span className="text-primary text-xs font-bold">
                          &#10003;
                        </span>
                      )}
                      <span className="text-sm font-medium text-content">
                        {lesson.id} {lesson.title}
                      </span>
                      <span className="ml-auto text-[10px] text-content-muted">
                        {lesson.points}pts
                      </span>
                    </div>
                    <p className="text-xs text-content-muted mt-0.5 line-clamp-1">
                      {lesson.description}
                    </p>
                    {lesson.challenges.length > 0 && (
                      <div className="mt-1 text-[10px] text-content-muted">
                        {challengesDone}/{lesson.challenges.length} desafios
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReferenceCard() {
  return (
    <div className="space-y-2">
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
        <p className="text-xs font-semibold text-content mb-1">
          Referência Rápida
        </p>
        <pre className="font-mono text-[10px] text-content-secondary whitespace-pre-wrap leading-relaxed">
{`pf N   - para frente     pt N   - para trás
vd N   - virar direita   ve N   - virar esquerda
lc     - levantar caneta uc     - usar caneta
repita N [cmds]          limpe  - limpar tela
mudecor N - cor (0-15)   me N   - espessura
faça "nome valor         :nome  - usar variável
aprenda nome :arg ... fim  escreva valor
centro - voltar ao centro mudexy X Y - ir para X,Y`}
        </pre>
      </div>
    </div>
  );
}
