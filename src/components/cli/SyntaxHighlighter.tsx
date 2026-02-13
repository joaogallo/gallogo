"use client";

import { lookupCommand, isSpecialForm } from "@/logo/commands";

interface SyntaxHighlighterProps {
  code: string;
}

type TokenKind =
  | "command"
  | "special"
  | "number"
  | "variable"
  | "string"
  | "bracket"
  | "operator"
  | "comment"
  | "text";

interface HighlightToken {
  kind: TokenKind;
  text: string;
}

const OPERATORS = new Set(["+", "-", "*", "/", "<", ">", "=", "<=", ">=", "<>"]);

function tokenizeForHighlight(code: string): HighlightToken[] {
  const tokens: HighlightToken[] = [];
  let i = 0;

  while (i < code.length) {
    const ch = code[i];

    // Comment
    if (ch === ";") {
      tokens.push({ kind: "comment", text: code.slice(i) });
      break;
    }

    // Whitespace
    if (/\s/.test(ch)) {
      let j = i;
      while (j < code.length && /\s/.test(code[j])) j++;
      tokens.push({ kind: "text", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Brackets
    if (ch === "[" || ch === "]") {
      tokens.push({ kind: "bracket", text: ch });
      i++;
      continue;
    }

    // Parentheses
    if (ch === "(" || ch === ")") {
      tokens.push({ kind: "bracket", text: ch });
      i++;
      continue;
    }

    // Variable :name
    if (ch === ":") {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9_?]/.test(code[j])) j++;
      tokens.push({ kind: "variable", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // String "word (Logo strings start with " and have no closing quote)
    if (ch === '"') {
      let j = i + 1;
      while (j < code.length && /\S/.test(code[j])) j++;
      tokens.push({ kind: "string", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Number
    if (/\d/.test(ch) || (ch === "." && i + 1 < code.length && /\d/.test(code[i + 1]))) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      tokens.push({ kind: "number", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Multi-char operators
    if (i + 1 < code.length) {
      const two = code.slice(i, i + 2);
      if (OPERATORS.has(two)) {
        tokens.push({ kind: "operator", text: two });
        i += 2;
        continue;
      }
    }

    // Single-char operators
    if (OPERATORS.has(ch)) {
      tokens.push({ kind: "operator", text: ch });
      i++;
      continue;
    }

    // Word
    if (/[a-zA-Z_?]/.test(ch)) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_?]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const lower = word.toLowerCase();

      if (isSpecialForm(lower)) {
        tokens.push({ kind: "special", text: word });
      } else if (lookupCommand(lower)) {
        tokens.push({ kind: "command", text: word });
      } else {
        tokens.push({ kind: "text", text: word });
      }
      i = j;
      continue;
    }

    // Fallback
    tokens.push({ kind: "text", text: ch });
    i++;
  }

  return tokens;
}

const STYLES: Record<TokenKind, string> = {
  command: "text-primary",
  special: "text-accent font-bold",
  number: "text-[color:var(--color-accent-light)]",
  variable: "text-[color:var(--color-primary-light)]",
  string: "text-[color:var(--color-accent)]",
  bracket: "text-content-secondary font-bold",
  operator: "text-content-secondary",
  comment: "text-content-muted italic",
  text: "text-content",
};

export function SyntaxHighlighter({ code }: SyntaxHighlighterProps) {
  const tokens = tokenizeForHighlight(code);

  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={STYLES[tok.kind]}>
          {tok.text}
        </span>
      ))}
    </>
  );
}
