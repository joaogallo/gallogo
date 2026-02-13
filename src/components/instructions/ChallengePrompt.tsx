"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Challenge } from "@/types/curriculum";
import { validateChallenge } from "@/services/challenge-validator";
import { execute } from "@/logo";
import type { InterpreterState } from "@/logo";
import { HintSystem } from "./HintSystem";

interface ChallengePromptProps {
  challenge: Challenge;
  interpreter: InterpreterState | null;
  onComplete: (challengeId: string) => void;
  completed: boolean;
}

export function ChallengePrompt({
  challenge,
  interpreter,
  onComplete,
  completed,
}: ChallengePromptProps) {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<{
    passed: boolean;
    message: string;
  } | null>(null);

  const handleValidate = useCallback(() => {
    const trimmed = code.trim();
    if (!trimmed) {
      setFeedback({ passed: false, message: "Digite algum codigo primeiro." });
      return;
    }

    const result = execute(trimmed, interpreter ?? undefined);
    const validation = validateChallenge(challenge, trimmed, result);
    setFeedback(validation);

    if (validation.passed) {
      onComplete(challenge.id);
    }
  }, [code, challenge, interpreter, onComplete]);

  const difficultyLabel = ["", "Facil", "Medio", "Dificil"][
    challenge.difficulty
  ];
  const difficultyColor = ["", "text-primary", "text-accent", "text-error"][
    challenge.difficulty
  ];

  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border p-3 space-y-2",
        completed ? "border-primary/30 bg-primary/5" : "border-border bg-surface"
      )}
    >
      <div className="flex items-center gap-2">
        {completed && (
          <span className="text-primary text-sm font-bold">&#10003;</span>
        )}
        <h4 className="text-sm font-semibold text-content">
          {challenge.title}
        </h4>
        <span className={cn("text-[10px] ml-auto", difficultyColor)}>
          {difficultyLabel}
        </span>
        <span className="text-[10px] text-content-muted">
          {challenge.points}pts
        </span>
      </div>

      <p className="text-sm text-content-secondary">{challenge.description}</p>

      {!completed && (
        <>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setFeedback(null);
            }}
            className="w-full rounded-[var(--radius-sm)] border border-border bg-surface-secondary px-3 py-2 font-mono text-sm text-content outline-none focus:border-primary resize-none"
            rows={3}
            placeholder="Digite seu codigo aqui..."
            spellCheck={false}
          />

          <div className="flex items-center gap-2">
            <button
              onClick={handleValidate}
              className="rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Verificar
            </button>

            {feedback && (
              <span
                className={cn(
                  "text-sm",
                  feedback.passed ? "text-primary" : "text-error"
                )}
              >
                {feedback.message}
              </span>
            )}
          </div>

          <HintSystem hints={challenge.hints} />
        </>
      )}
    </div>
  );
}
