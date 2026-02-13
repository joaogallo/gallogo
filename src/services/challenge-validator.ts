import type { Challenge, ChallengeValidation } from "@/types/curriculum";
import type { InterpreterResult } from "@/logo/types";
import { tokenize } from "@/logo/lexer";
import { lookupCommand, normalizeSpecial, isSpecialForm } from "@/logo/commands";

export interface ValidationResult {
  passed: boolean;
  message: string;
}

/**
 * Validate whether user code satisfies a challenge's requirements.
 */
export function validateChallenge(
  challenge: Challenge,
  code: string,
  result: InterpreterResult
): ValidationResult {
  return validateRule(challenge.validation, code, result);
}

function validateRule(
  validation: ChallengeValidation,
  code: string,
  result: InterpreterResult
): ValidationResult {
  switch (validation.type) {
    case "contains-commands":
      return validateContainsCommands(validation.commands, code);

    case "output-match":
      return validateOutputMatch(validation.expected, result);

    case "min-lines": {
      const lineCount = result.commands.filter(
        (c) => c.type === "line"
      ).length;
      if (lineCount >= validation.count) {
        return { passed: true, message: "Correto!" };
      }
      return {
        passed: false,
        message: `Precisa de pelo menos ${validation.count} linhas desenhadas (voce tem ${lineCount}).`,
      };
    }

    case "free":
      // Free challenges always pass if there's any code
      if (code.trim().length > 0) {
        return { passed: true, message: "Otimo trabalho!" };
      }
      return { passed: false, message: "Digite algum codigo para completar." };
  }
}

/**
 * Check if the user's code contains specific commands (by canonical name).
 */
function validateContainsCommands(
  requiredCanonical: string[],
  code: string
): ValidationResult {
  // Tokenize the code and extract used commands
  const usedCanonical = new Set<string>();
  try {
    const tokens = tokenize(code);
    for (const tok of tokens) {
      if (tok.type === "WORD") {
        const lower = tok.value.toLowerCase();
        // Check if it's a help/ajuda command
        if (lower === "help" || lower === "ajuda") {
          usedCanonical.add("help");
          continue;
        }
        const cmd = lookupCommand(lower);
        if (cmd) {
          usedCanonical.add(cmd.canonicalName);
        }
        if (isSpecialForm(lower)) {
          usedCanonical.add(normalizeSpecial(lower));
        }
      }
    }
  } catch {
    // If tokenization fails, try simple word matching
    const words = code.toLowerCase().split(/\s+/);
    for (const w of words) {
      const cmd = lookupCommand(w);
      if (cmd) usedCanonical.add(cmd.canonicalName);
      if (isSpecialForm(w)) usedCanonical.add(normalizeSpecial(w));
      if (w === "help" || w === "ajuda") usedCanonical.add("help");
    }
  }

  const missing = requiredCanonical.filter((c) => !usedCanonical.has(c));

  if (missing.length === 0) {
    return { passed: true, message: "Correto!" };
  }

  return {
    passed: false,
    message: `Faltam os comandos: ${missing.join(", ")}`,
  };
}

/**
 * Check if the interpreter output matches expected text.
 */
function validateOutputMatch(
  expected: string,
  result: InterpreterResult
): ValidationResult {
  const output = result.output.join("\n").trim();
  const exp = expected.trim();

  if (output === exp) {
    return { passed: true, message: "Correto!" };
  }

  return {
    passed: false,
    message: `Saida esperada: "${exp}"\nSaida obtida: "${output}"`,
  };
}
