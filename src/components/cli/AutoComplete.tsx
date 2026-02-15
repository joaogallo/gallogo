"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { getAllCommandNames, lookupCommand, isSpecialForm } from "@/logo/commands";
import type { InterpreterState } from "@/logo";

interface AutoCompleteProps {
  input: string;
  visible: boolean;
  selectedIndex: number;
  interpreter: InterpreterState | null;
  onSelect: (value: string) => void;
}

export interface Suggestion {
  name: string;
  kind: "command" | "special" | "reporter" | "procedure" | "variable";
  hint: string;
}

function buildSuggestionList(interpreter: InterpreterState | null): Suggestion[] {
  const seen = new Set<string>();
  const suggestions: Suggestion[] = [];

  // Built-in commands (use canonical names only to avoid duplicates)
  const allNames = getAllCommandNames();
  for (const name of allNames) {
    const lower = name.toLowerCase();
    if (seen.has(lower)) continue;

    if (isSpecialForm(lower)) {
      // Special forms: repeat, if, ifelse, to, end + PT aliases
      const canonical = lower;
      if (seen.has(canonical)) continue;
      seen.add(lower);
      const hints: Record<string, string> = {
        repeat: "repeat N [...]",
        repita: "repita N [...]",
        if: "if cond [...]",
        se: "se cond [...]",
        ifelse: "ifelse cond [...] [...]",
        senao: "senao cond [...] [...]",
        senão: "senão cond [...] [...]",
        sesenao: "sesenao cond [...] [...]",
        sesenão: "sesenão cond [...] [...]",
        to: "to nome :arg ... end",
        aprenda: "aprenda nome :arg ... fim",
        end: "",
        fim: "",
      };
      suggestions.push({
        name: lower,
        kind: "special",
        hint: hints[lower] ?? "",
      });
    } else {
      const def = lookupCommand(lower);
      if (!def) continue;
      // Only show this alias, not all
      seen.add(lower);
      const argHint =
        def.arity > 0
          ? " " + Array.from({ length: def.arity }, (_, i) => `arg${i + 1}`).join(" ")
          : "";
      suggestions.push({
        name: lower,
        kind: def.type === "reporter" ? "reporter" : "command",
        hint: `${lower}${argHint}`,
      });
    }
  }

  // User-defined procedures
  if (interpreter) {
    for (const [name, proc] of interpreter.procedures) {
      if (seen.has(name)) continue;
      seen.add(name);
      const params = proc.params.map((p) => `:${p}`).join(" ");
      suggestions.push({
        name,
        kind: "procedure",
        hint: params ? `${name} ${params}` : name,
      });
    }

    // User-defined variables
    for (const [name] of interpreter.globalVars) {
      suggestions.push({
        name: `:${name}`,
        kind: "variable",
        hint: `:${name}`,
      });
    }
  }

  return suggestions;
}

/** Extract the last word fragment being typed */
function getLastWord(input: string): string {
  const match = input.match(/([a-zA-Z_?:][a-zA-Z0-9_?]*)$/);
  return match ? match[1] : "";
}

export function useAutoCompleteSuggestions(
  input: string,
  interpreter: InterpreterState | null
): Suggestion[] {
  return useMemo(() => {
    const fragment = getLastWord(input).toLowerCase();
    if (!fragment || fragment.length < 1) return [];

    const all = buildSuggestionList(interpreter);
    return all
      .filter((s) => s.name.startsWith(fragment) && s.name !== fragment)
      .slice(0, 8);
  }, [input, interpreter]);
}

const KIND_COLORS: Record<Suggestion["kind"], string> = {
  command: "text-primary",
  special: "text-accent",
  reporter: "text-[color:var(--color-primary-light)]",
  procedure: "text-[color:var(--color-accent-light)]",
  variable: "text-[color:var(--color-primary-light)]",
};

export function AutoComplete({
  input,
  visible,
  selectedIndex,
  interpreter,
  onSelect,
}: AutoCompleteProps) {
  const suggestions = useAutoCompleteSuggestions(input, interpreter);

  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 z-10 mb-0.5 max-h-48 overflow-y-auto border border-border bg-surface rounded-[var(--radius-sm)] shadow-md">
      {suggestions.map((s, i) => (
        <button
          key={s.name}
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-3 py-1.5 text-left text-[length:var(--font-size-cli)] transition-colors",
            i === selectedIndex
              ? "bg-primary/10"
              : "hover:bg-surface-secondary"
          )}
          onMouseDown={(e) => {
            e.preventDefault(); // Don't blur the input
            onSelect(s.name);
          }}
        >
          <span className={cn("font-medium", KIND_COLORS[s.kind])}>
            {s.name}
          </span>
          {s.hint && s.hint !== s.name && (
            <span className="text-content-muted text-[10px] ml-auto truncate">
              {s.hint}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
