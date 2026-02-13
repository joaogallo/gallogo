export { tokenize } from "./lexer";
export { parse } from "./parser";
export type { ParserOptions } from "./parser";
export { interpret, createInterpreterState } from "./interpreter";
export type { InterpreterState } from "./interpreter";
export { formatError, LogoError, LogoRuntimeError } from "./errors";
export type { AgeGroup } from "./errors";
export { getAllCommandNames, lookupCommand } from "./commands";
export type { CommandDef } from "./commands";
export type {
  Token,
  TokenType,
  Expression,
  Statement,
  TurtleState,
  DrawCommand,
  InterpreterResult,
} from "./types";

import { tokenize } from "./lexer";
import { parse } from "./parser";
import { interpret, createInterpreterState } from "./interpreter";
import type { InterpreterState } from "./interpreter";
import type { InterpreterResult } from "./types";
import { getAllCommandNames } from "./commands";
import { initSuggestions, LogoError, LogoRuntimeError, formatError } from "./errors";
import type { AgeGroup } from "./errors";

// Wire up fuzzy-matching suggestions
initSuggestions(getAllCommandNames);

/**
 * Execute Logo code. Pass a persistent `state` to keep turtle position,
 * variables and procedures between calls (interactive mode).
 */
export function execute(
  code: string,
  state?: InterpreterState
): InterpreterResult {
  try {
    const tokens = tokenize(code);

    // Tell the parser about procedures defined in previous runs
    const knownProcedures = new Map<string, number>();
    if (state) {
      for (const [name, proc] of state.procedures) {
        knownProcedures.set(name, proc.params.length);
      }
    }

    const ast = parse(tokens, { knownProcedures });
    return interpret(ast, state);
  } catch (e) {
    if (e instanceof LogoError || e instanceof LogoRuntimeError) {
      return {
        commands: [],
        turtle: state?.turtle ?? createInterpreterState().turtle,
        output: [],
        error: e.message,
      };
    }
    throw e;
  }
}

/**
 * Execute and format errors for a specific age group.
 */
export function executeForAge(
  code: string,
  ageGroup: AgeGroup,
  state?: InterpreterState
): InterpreterResult {
  try {
    const tokens = tokenize(code);
    const knownProcedures = new Map<string, number>();
    if (state) {
      for (const [name, proc] of state.procedures) {
        knownProcedures.set(name, proc.params.length);
      }
    }
    const ast = parse(tokens, { knownProcedures });
    return interpret(ast, state);
  } catch (e) {
    if (e instanceof LogoError || e instanceof LogoRuntimeError) {
      return {
        commands: [],
        turtle: state?.turtle ?? createInterpreterState().turtle,
        output: [],
        error: formatError(e, ageGroup),
      };
    }
    throw e;
  }
}
