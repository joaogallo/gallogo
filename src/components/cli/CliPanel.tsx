"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
import { useCliHistory } from "@/hooks/useCliHistory";
import { SyntaxHighlighter } from "./SyntaxHighlighter";
import { AutoComplete, useAutoCompleteSuggestions } from "./AutoComplete";

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
  'Mais: setpc C, setps N, setxy X Y, seth A, make "var V, print V\n' +
  "Math: sum, difference, product, quotient, sqrt, random, power\n" +
  "Proc: to nome :arg ... end  |  aprenda nome :arg ... fim";

interface CliPanelProps {
  /** Shared interpreter ref (owned by playground page) */
  interpreterRef?: React.RefObject<InterpreterState | null>;
  /** Consume code pasted from the instructions panel */
  consumePendingCode?: () => string | null;
}

export function CliPanel({ interpreterRef: sharedRef, consumePendingCode }: CliPanelProps) {
  const { ageGroup } = useTheme();
  const prompt = getPrompt(ageGroup);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<CliEntry[]>([
    {
      id: "welcome",
      type: "system",
      content:
        "GalloGo v0.1.0 — Digite comandos Logo para controlar a tartaruga. Use 'help' para ajuda.",
    },
  ]);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const localRef = useRef<InterpreterState | null>(null);
  const interpreterRef = sharedRef ?? localRef;
  const startAnimation = useCanvasStore((s) => s.startAnimation);
  const history = useCliHistory();

  // Autocomplete state
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [acSelectedIndex, setAcSelectedIndex] = useState(0);
  const suggestions = useAutoCompleteSuggestions(
    input,
    interpreterRef.current
  );

  // Lazy-init persistent interpreter state
  function getInterpreter(): InterpreterState {
    if (!interpreterRef.current) {
      interpreterRef.current = createInterpreterState();
    }
    return interpreterRef.current;
  }

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [entries]);

  // Consume code pasted from instructions panel
  useEffect(() => {
    if (!consumePendingCode) return;
    const code = consumePendingCode();
    if (code) {
      setInput(code);
      inputRef.current?.focus();
    }
  });

  const executeCommand = useCallback(
    (code: string) => {
      const trimmed = code.trim();
      if (!trimmed) return;

      history.push(trimmed);

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

          // If no error and no output, confirm silently for draw commands
          if (!result.error && result.output.length === 0) {
            const drawCmds = result.commands.filter(
              (c) =>
                c.type === "line" || c.type === "clear" || c.type === "moveTo"
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

      setEntries((prev) => [...prev, ...newEntries]);
    },
    [ageGroup, history, startAnimation]
  );

  const handleSubmit = () => {
    if (!input.trim()) return;
    executeCommand(input);
    setInput("");
    setShowAutoComplete(false);
    history.resetNavigation();
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  /** Apply an autocomplete suggestion */
  const applyAutoComplete = useCallback(
    (name: string) => {
      // Replace the last word fragment with the suggestion
      const match = input.match(/^(.*?)([a-zA-Z_?:][a-zA-Z0-9_?]*)$/);
      if (match) {
        setInput(match[1] + name + " ");
      } else {
        setInput(input + name + " ");
      }
      setShowAutoComplete(false);
      setAcSelectedIndex(0);
      inputRef.current?.focus();
    },
    [input]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Autocomplete navigation
    if (showAutoComplete && suggestions.length > 0) {
      if (e.key === "Tab" || (e.key === "ArrowDown" && e.altKey)) {
        e.preventDefault();
        if (e.shiftKey) {
          setAcSelectedIndex((i) =>
            i <= 0 ? suggestions.length - 1 : i - 1
          );
        } else {
          setAcSelectedIndex((i) =>
            i >= suggestions.length - 1 ? 0 : i + 1
          );
        }
        return;
      }
      if (e.key === "Enter" && !e.shiftKey && acSelectedIndex >= 0 && acSelectedIndex < suggestions.length) {
        e.preventDefault();
        applyAutoComplete(suggestions[acSelectedIndex].name);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowAutoComplete(false);
        return;
      }
    }

    // Tab without autocomplete visible — trigger it
    if (e.key === "Tab" && !showAutoComplete) {
      e.preventDefault();
      if (input.trim()) {
        setShowAutoComplete(true);
        setAcSelectedIndex(0);
      }
      return;
    }

    // Enter = submit (unless Shift+Enter for multiline)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      return;
    }

    // Up/Down for history navigation (only when not multiline and autocomplete is hidden)
    if (!showAutoComplete) {
      if (e.key === "ArrowUp" && !input.includes("\n")) {
        e.preventDefault();
        const prev = history.navigateUp(input);
        setInput(prev);
        return;
      }
      if (e.key === "ArrowDown" && !input.includes("\n")) {
        e.preventDefault();
        const next = history.navigateDown();
        setInput(next);
        return;
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);

    // Auto-resize textarea
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";

    // Show autocomplete as user types
    if (val.trim()) {
      setShowAutoComplete(true);
      setAcSelectedIndex(0);
    } else {
      setShowAutoComplete(false);
    }
  };

  return (
    <div data-panel="cli" className="flex h-full flex-col bg-surface font-mono">
      <div className="border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-content">Terminal</h2>
      </div>

      {/* Output area */}
      <div ref={outputRef} className="flex-1 overflow-y-auto p-3 space-y-1">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={cn(
              "text-[length:var(--font-size-cli)] leading-relaxed whitespace-pre-wrap",
              {
                "text-content-muted": entry.type === "system",
                "text-content": entry.type === "input",
                "text-primary": entry.type === "output",
                "text-error": entry.type === "error",
              }
            )}
          >
            {entry.type === "input" ? (
              <>
                <span className="text-accent">{prompt}</span>
                <SyntaxHighlighter code={entry.content} />
              </>
            ) : (
              entry.content
            )}
          </div>
        ))}
      </div>

      {/* Input line */}
      <div className="relative border-t border-border px-3 py-2">
        <AutoComplete
          input={input}
          visible={showAutoComplete}
          selectedIndex={acSelectedIndex}
          interpreter={interpreterRef.current}
          onSelect={applyAutoComplete}
        />
        <div className="flex items-start">
          <span className="text-[length:var(--font-size-cli)] text-accent leading-relaxed shrink-0">
            {prompt}
          </span>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              // Delay hiding to allow click events on autocomplete
              setTimeout(() => setShowAutoComplete(false), 150);
            }}
            onFocus={() => {
              if (input.trim()) setShowAutoComplete(true);
            }}
            className="flex-1 bg-transparent text-[length:var(--font-size-cli)] text-content outline-none placeholder:text-content-muted leading-relaxed resize-none overflow-hidden"
            placeholder="Digite um comando..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
            rows={1}
          />
        </div>
      </div>
    </div>
  );
}
