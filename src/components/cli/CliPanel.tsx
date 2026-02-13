"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import {
  execute,
  createInterpreterState,
  formatError,
  LogoError,
  LogoRuntimeError,
} from "@/logo";
import type { InterpreterState } from "@/logo";
import type { AgeGroup } from "@/logo/errors";
import { useCanvasStore } from "@/stores/canvas-store";

interface CliEntry {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
}

function getPrompt(ageGroup: string): string {
  switch (ageGroup) {
    case "6-8":
      return "tartaruga> ";
    case "10-14":
      return "gallogo> ";
    default:
      return "logo> ";
  }
}

const HELP_TEXT =
  "Comandos: fd N, bk N, rt N, lt N, pu, pendown, repeat N [...], cs, home\n" +
  "PT: pf N, pt N, pd N, pe N, un, ul, repita N [...], limpe, paracentro\n" +
  "Mais: setpc C, setps N, setxy X Y, seth A, make \"var V, print V\n" +
  "Math: sum, difference, product, quotient, sqrt, random, power\n" +
  "Proc: to nome :arg ... end  |  aprenda nome :arg ... fim";

export function CliPanel() {
  const { ageGroup } = useTheme();
  const prompt = getPrompt(ageGroup);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CliEntry[]>([
    {
      id: "welcome",
      type: "system",
      content:
        "GalloGo v0.1.0 — Digite comandos Logo para controlar a tartaruga. Use 'help' para ajuda.",
    },
  ]);
  const outputRef = useRef<HTMLDivElement>(null);
  const interpreterRef = useRef<InterpreterState | null>(null);
  const startAnimation = useCanvasStore((s) => s.startAnimation);
  const resetCanvas = useCanvasStore((s) => s.reset);

  // Lazy-init persistent interpreter state
  function getInterpreter(): InterpreterState {
    if (!interpreterRef.current) {
      interpreterRef.current = createInterpreterState();
    }
    return interpreterRef.current;
  }

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newEntries: CliEntry[] = [
      { id: crypto.randomUUID(), type: "input", content: trimmed },
    ];

    const lower = trimmed.toLowerCase();

    if (lower === "help" || lower === "ajuda") {
      newEntries.push({
        id: crypto.randomUUID(),
        type: "output",
        content: HELP_TEXT,
      });
    } else {
      try {
        const state = getInterpreter();
        const result = execute(trimmed, state);

        // Send draw commands to canvas store (with animation)
        if (result.commands.length > 0) {
          startAnimation(result.commands, result.turtle);
        }

        if (result.error) {
          // Format error for age group
          let errorMsg: string;
          try {
            const err = new LogoRuntimeError(result.error);
            errorMsg = formatError(err, ageGroup as AgeGroup);
          } catch {
            errorMsg = result.error;
          }
          newEntries.push({
            id: crypto.randomUUID(),
            type: "error",
            content: errorMsg,
          });
        }

        // Show print output
        for (const line of result.output) {
          newEntries.push({
            id: crypto.randomUUID(),
            type: "output",
            content: line,
          });
        }

        // If no error and no output, confirm silently for non-print commands
        if (!result.error && result.output.length === 0) {
          const drawCmds = result.commands.filter(
            (c) => c.type === "line" || c.type === "clear" || c.type === "moveTo"
          );
          if (drawCmds.length > 0) {
            newEntries.push({
              id: crypto.randomUUID(),
              type: "system",
              content: `OK (${drawCmds.length} comando${drawCmds.length > 1 ? "s" : ""} de desenho)`,
            });
          }
        }
      } catch (err) {
        const errorMsg =
          err instanceof LogoError || err instanceof LogoRuntimeError
            ? formatError(err, ageGroup as AgeGroup)
            : String(err);
        newEntries.push({
          id: crypto.randomUUID(),
          type: "error",
          content: errorMsg,
        });
      }
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col bg-surface font-mono">
      <div className="border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-content">Terminal</h2>
      </div>

      {/* Output area */}
      <div ref={outputRef} className="flex-1 overflow-y-auto p-3 space-y-1">
        {history.map((entry) => (
          <div
            key={entry.id}
            className={cn("text-[length:var(--font-size-cli)] leading-relaxed", {
              "text-content-muted": entry.type === "system",
              "text-content": entry.type === "input",
              "text-primary": entry.type === "output",
              "text-error": entry.type === "error",
            })}
          >
            {entry.type === "input" && (
              <span className="text-accent">{prompt}</span>
            )}
            {entry.content}
          </div>
        ))}
      </div>

      {/* Input line */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-border px-3 py-2"
      >
        <span className="text-[length:var(--font-size-cli)] text-accent">
          {prompt}
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-[length:var(--font-size-cli)] text-content outline-none placeholder:text-content-muted"
          placeholder="Digite um comando..."
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
