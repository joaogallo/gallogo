"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/types/curriculum";
import type { InterpreterState } from "@/logo";
import { ChallengePrompt } from "./ChallengePrompt";

interface LessonContentProps {
  lesson: Lesson;
  interpreter: InterpreterState | null;
  completedChallenges: Set<string>;
  onChallengeComplete: (challengeId: string) => void;
  onLessonComplete: () => void;
  onCopyToTerminal?: (code: string) => void;
}

export function LessonContent({
  lesson,
  interpreter,
  completedChallenges,
  onChallengeComplete,
  onLessonComplete,
  onCopyToTerminal,
}: LessonContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const isLastStep = currentStep >= lesson.steps.length - 1;
  const showChallenges = currentStep >= lesson.steps.length - 1;

  const handleNext = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep((s) => s + 1);
      contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onLessonComplete();
    }
  }, [isLastStep, onLessonComplete]);

  const handlePrev = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-content">
          {lesson.moduleId}.{lesson.order} — {lesson.title}
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${((currentStep + 1) / lesson.steps.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-[10px] text-content-muted">
            {currentStep + 1}/{lesson.steps.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Show current step + all previous */}
        {lesson.steps.slice(0, currentStep + 1).map((step, i) => (
          <StepBlock
            key={i}
            step={step}
            onCopy={onCopyToTerminal}
          />
        ))}

        {/* Challenges (shown on last step) */}
        {showChallenges && lesson.challenges.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-border">
            <h3 className="text-sm font-semibold text-content">Desafios</h3>
            {lesson.challenges.map((ch) => (
              <ChallengePrompt
                key={ch.id}
                challenge={ch}
                interpreter={interpreter}
                completed={completedChallenges.has(ch.id)}
                onComplete={onChallengeComplete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-2">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="rounded-[var(--radius-sm)] px-3 py-1.5 text-sm text-content-secondary hover:text-content disabled:opacity-30 transition-colors"
        >
          Anterior
        </button>
        <div className="flex-1" />
        <button
          onClick={handleNext}
          className="rounded-[var(--radius-sm)] bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          {isLastStep
            ? lesson.challenges.length > 0
              ? "Completar"
              : "Proxima licao"
            : "Proximo"}
        </button>
      </div>
    </div>
  );
}

// ---- Step block renderer ----

function StepBlock({
  step,
  onCopy,
}: {
  step: Lesson["steps"][number];
  onCopy?: (code: string) => void;
}) {
  const baseClass = "text-[length:var(--font-size-base)] leading-relaxed";

  switch (step.type) {
    case "text":
      return (
        <p className={cn(baseClass, "text-content-secondary whitespace-pre-line")}>
          {step.content}
        </p>
      );

    case "tip":
      return (
        <div className="rounded-[var(--radius-sm)] bg-accent/10 border border-accent/20 px-3 py-2">
          <p className={cn(baseClass, "text-content-secondary")}>
            <span className="font-medium text-accent">Dica: </span>
            {step.content}
          </p>
        </div>
      );

    case "example":
    case "try-it":
      return (
        <div className="space-y-1">
          <p className={cn(baseClass, "text-content-secondary")}>
            {step.type === "try-it" && (
              <span className="font-medium text-primary">Tente! </span>
            )}
            {step.content}
          </p>
          {step.code && (
            <div className="group relative rounded-[var(--radius-sm)] bg-surface border border-border p-3">
              <pre className="font-mono text-[length:var(--font-size-cli)] text-primary whitespace-pre-wrap">
                {step.code}
              </pre>
              {onCopy && (
                <button
                  onClick={() => onCopy(step.code!)}
                  className="absolute top-1.5 right-1.5 rounded bg-surface-secondary px-2 py-0.5 text-[10px] text-content-muted opacity-0 group-hover:opacity-100 hover:text-content transition-all"
                >
                  Copiar
                </button>
              )}
            </div>
          )}
        </div>
      );
  }
}
