export class LogoError extends Error {
  line: number;
  col: number;

  constructor(message: string, line: number, col: number) {
    super(message);
    this.name = "LogoError";
    this.line = line;
    this.col = col;
  }
}

export class LogoRuntimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LogoRuntimeError";
  }
}

export class StopSignal extends Error {
  constructor() {
    super("stop");
    this.name = "StopSignal";
  }
}

// Levenshtein distance for typo suggestions
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }

  return dp[m][n];
}

let _getAllNames: (() => string[]) | null = null;

/** Must be called once with a function that returns all known command names. */
export function initSuggestions(getAllNames: () => string[]) {
  _getAllNames = getAllNames;
}

export function suggestCommand(input: string): string | null {
  if (!_getAllNames) return null;

  const all = _getAllNames();
  let best = "";
  let bestDist = Infinity;

  for (const name of all) {
    const dist = levenshtein(input.toLowerCase(), name.toLowerCase());
    if (dist < bestDist) {
      bestDist = dist;
      best = name;
    }
  }

  if (bestDist <= 2 && bestDist < input.length) {
    return best;
  }

  return null;
}

export type AgeGroup = "6-8" | "8-12" | "10-14";

export function formatError(
  error: Error,
  ageGroup: AgeGroup = "8-12"
): string {
  const msg = error.message;

  // Try to extract an unknown command name for suggestion
  const unknownMatch = msg.match(/desconhecido: '(\w+)'/);
  const suggestion = unknownMatch ? suggestCommand(unknownMatch[1]) : null;

  if (error instanceof LogoError) {
    const loc = `linha ${error.line}:${error.col}`;

    switch (ageGroup) {
      case "6-8":
        if (suggestion) {
          return `Oops! A tartaruga nao entendeu '${unknownMatch![1]}'. Voce quis dizer '${suggestion}'?`;
        }
        return `Oops! A tartaruga ficou confusa: ${msg}`;

      case "10-14":
        if (suggestion) {
          return `Erro na ${loc}: '${unknownMatch![1]}' nao definido. Sugestao: '${suggestion}'`;
        }
        return `Erro na ${loc}: ${msg}`;

      default:
        if (suggestion) {
          return `'${unknownMatch![1]}' nao encontrado. Tente '${suggestion}'.`;
        }
        return `Erro: ${msg}`;
    }
  }

  // Runtime error
  switch (ageGroup) {
    case "6-8":
      if (suggestion) {
        return `Oops! A tartaruga nao conhece '${unknownMatch![1]}'. Voce quis dizer '${suggestion}'?`;
      }
      return `Oops! Algo deu errado: ${msg}`;

    case "10-14":
      if (suggestion) {
        return `Erro: '${unknownMatch![1]}' nao definido. Sugestao: '${suggestion}'`;
      }
      return `Erro: ${msg}`;

    default:
      if (suggestion) {
        return `Comando '${unknownMatch![1]}' nao encontrado. Tente '${suggestion}'.`;
      }
      return `Erro: ${msg}`;
  }
}
