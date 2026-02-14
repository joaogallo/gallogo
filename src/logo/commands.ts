export interface CommandDef {
  canonicalName: string;
  arity: number;
  type: "command" | "reporter";
}

const REGISTRY: Map<string, CommandDef> = new Map();

function reg(
  aliases: string[],
  canonical: string,
  arity: number,
  type: "command" | "reporter" = "command"
) {
  const def: CommandDef = { canonicalName: canonical, arity, type };
  for (const alias of aliases) {
    REGISTRY.set(alias.toLowerCase(), def);
  }
}

// =========================================================
// Movimento / Movement
// =========================================================
reg(["forward", "fd", "parafrente", "pf"], "forward", 1);
reg(["back", "bk", "paratras", "pt"], "back", 1);
reg(["right", "rt", "paradireita", "vd", "virardireita"], "right", 1);
reg(["left", "lt", "paraesquerda", "ve", "viraresquerda"], "left", 1);

// =========================================================
// Caneta / Pen
// =========================================================
reg(
  ["penup", "pu", "levantecaneta", "lc", "semcaneta", "sc"],
  "penup",
  0
);
reg(
  ["pendown", "usecaneta", "abaixecaneta", "uc", "ac"],
  "pendown",
  0
);
reg(
  ["setpencolor", "setpc", "mudecor", "mudecorcaneta"],
  "setpencolor",
  1
);
reg(
  ["setpensize", "setps", "mudeespessura", "me", "espessuracaneta", "tamanhocaneta", "tc"],
  "setpensize",
  1
);

// =========================================================
// Tartaruga / Turtle
// =========================================================
reg(["home", "centro", "inicio", "casa"], "home", 0);
reg(["clearscreen", "cs", "limpe", "limpetela", "limpatela"], "clearscreen", 0);
reg(
  ["hideturtle", "ht", "esconda", "et", "escondatartaruga"],
  "hideturtle",
  0
);
reg(
  ["showturtle", "st", "apareca", "mt", "mostretartaruga"],
  "showturtle",
  0
);
reg(["setxy", "mudexy", "mudeposicao", "vaparaxy"], "setxy", 2);
reg(
  ["setheading", "seth", "mudedirecao", "muded", "mudead", "mudeangulo"],
  "setheading",
  1
);

// =========================================================
// Variaveis / Variables
// =========================================================
reg(["make", "faca", "atribua"], "make", 2);
reg(["print", "escreva", "mostre", "imprima"], "print", 1);

// =========================================================
// Controle / Control
// =========================================================
reg(["stop", "pare"], "stop", 0);

// =========================================================
// Matematica / Math  (reporters — retornam valor)
// =========================================================
reg(["sum", "soma"], "sum", 2, "reporter");
reg(["difference", "diferenca"], "difference", 2, "reporter");
reg(["product", "produto"], "product", 2, "reporter");
reg(["quotient", "quociente", "divisao"], "quotient", 2, "reporter");
reg(["remainder", "resto", "modulo"], "remainder", 2, "reporter");
reg(["random", "aleatorio", "sorteie"], "random", 1, "reporter");
reg(["sqrt", "raizq", "raizquadrada"], "sqrt", 1, "reporter");
reg(["abs", "valorabsoluto", "absoluto"], "abs", 1, "reporter");
reg(["minus", "negativo", "menosde", "invertasinal"], "minus", 1, "reporter");
reg(["round", "arredonde"], "round", 1, "reporter");
reg(["int", "inteiro", "parteinteira"], "int", 1, "reporter");
reg(["sin", "seno"], "sin", 1, "reporter");
reg(["cos", "cosseno"], "cos", 1, "reporter");
reg(["tan", "tangente"], "tan", 1, "reporter");
reg(["power", "potencia", "elevado"], "power", 2, "reporter");
reg(["repcount", "contagemrepita"], "repcount", 0, "reporter");

// =========================================================
// Special forms (handled by parser, not in registry)
// repeat/repita, if/se, ifelse/senao, to/aprenda, end/fim
// =========================================================

const SPECIAL_FORMS: Record<string, string> = {
  repeat: "repeat",
  repita: "repeat",
  if: "if",
  se: "if",
  ifelse: "ifelse",
  senao: "ifelse",
  sesenao: "ifelse",
  to: "to",
  aprenda: "to",
  end: "end",
  fim: "end",
};

// ---- Public API ----

export function lookupCommand(name: string): CommandDef | undefined {
  return REGISTRY.get(name.toLowerCase());
}

export function isSpecialForm(name: string): boolean {
  return name.toLowerCase() in SPECIAL_FORMS;
}

export function normalizeSpecial(name: string): string {
  return SPECIAL_FORMS[name.toLowerCase()] ?? name.toLowerCase();
}

export function isEndKeyword(name: string): boolean {
  const lower = name.toLowerCase();
  return lower === "end" || lower === "fim";
}

export function getAllCommandNames(): string[] {
  return [...Array.from(REGISTRY.keys()), ...Object.keys(SPECIAL_FORMS)];
}

// ---- Logo color palette ----

const LOGO_COLORS: Record<number, string> = {
  0: "#000000", // black / preto
  1: "#0000ff", // blue / azul
  2: "#00aa00", // green / verde
  3: "#00aaaa", // cyan / ciano
  4: "#cc0000", // red / vermelho
  5: "#cc00cc", // magenta
  6: "#cccc00", // yellow / amarelo
  7: "#ffffff", // white / branco
  8: "#8b4513", // brown / marrom
  9: "#d2b48c", // tan / bege
  10: "#228b22", // forest / floresta
  11: "#40e0d0", // aqua / agua
  12: "#fa8072", // salmon / salmao
  13: "#800080", // purple / roxo
  14: "#ff8c00", // orange / laranja
  15: "#808080", // gray / cinza
};

export function resolveColor(value: number | string): string {
  if (typeof value === "number") {
    return LOGO_COLORS[Math.round(value)] ?? LOGO_COLORS[0];
  }
  return value;
}
