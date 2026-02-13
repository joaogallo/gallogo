import { Token, TokenType } from "./types";
import { LogoError } from "./errors";

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  let line = 1;
  let col = 1;

  function peek(): string {
    return pos < input.length ? input[pos] : "\0";
  }

  function advance(): string {
    const ch = input[pos];
    pos++;
    if (ch === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
    return ch;
  }

  function add(type: TokenType, value: string, l: number, c: number) {
    tokens.push({ type, value, line: l, col: c });
  }

  while (pos < input.length) {
    const ch = peek();

    // Skip whitespace
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") {
      advance();
      continue;
    }

    // Comment: ; until end of line
    if (ch === ";") {
      while (pos < input.length && peek() !== "\n") {
        advance();
      }
      continue;
    }

    const tl = line;
    const tc = col;

    // Number
    if (isDigit(ch)) {
      let num = "";
      while (pos < input.length && (isDigit(peek()) || peek() === ".")) {
        num += advance();
      }
      add(TokenType.NUMBER, num, tl, tc);
      continue;
    }

    // Variable :name
    if (ch === ":") {
      advance(); // consume :
      let name = "";
      while (pos < input.length && isWordChar(peek())) {
        name += advance();
      }
      if (name.length === 0) {
        throw new LogoError(
          "Esperado nome de variavel apos ':'",
          tl,
          tc
        );
      }
      add(TokenType.VARIABLE, name, tl, tc);
      continue;
    }

    // String literal "text (Logo convention: " prefix, no closing quote)
    if (ch === '"') {
      advance(); // consume "
      let str = "";
      while (
        pos < input.length &&
        !isWhitespace(peek()) &&
        peek() !== "[" &&
        peek() !== "]" &&
        peek() !== "(" &&
        peek() !== ")"
      ) {
        str += advance();
      }
      add(TokenType.STRING, str, tl, tc);
      continue;
    }

    // Brackets
    if (ch === "[") {
      advance();
      add(TokenType.LBRACKET, "[", tl, tc);
      continue;
    }
    if (ch === "]") {
      advance();
      add(TokenType.RBRACKET, "]", tl, tc);
      continue;
    }

    // Parentheses
    if (ch === "(") {
      advance();
      add(TokenType.LPAREN, "(", tl, tc);
      continue;
    }
    if (ch === ")") {
      advance();
      add(TokenType.RPAREN, ")", tl, tc);
      continue;
    }

    // Operators
    if (ch === "+") {
      advance();
      add(TokenType.PLUS, "+", tl, tc);
      continue;
    }
    if (ch === "-") {
      advance();
      add(TokenType.MINUS, "-", tl, tc);
      continue;
    }
    if (ch === "*") {
      advance();
      add(TokenType.STAR, "*", tl, tc);
      continue;
    }
    if (ch === "/") {
      advance();
      add(TokenType.SLASH, "/", tl, tc);
      continue;
    }
    if (ch === "=") {
      advance();
      add(TokenType.EQ, "=", tl, tc);
      continue;
    }

    if (ch === "<") {
      advance();
      if (peek() === "=") {
        advance();
        add(TokenType.LTE, "<=", tl, tc);
      } else if (peek() === ">") {
        advance();
        add(TokenType.NEQ, "<>", tl, tc);
      } else {
        add(TokenType.LT, "<", tl, tc);
      }
      continue;
    }

    if (ch === ">") {
      advance();
      if (peek() === "=") {
        advance();
        add(TokenType.GTE, ">=", tl, tc);
      } else {
        add(TokenType.GT, ">", tl, tc);
      }
      continue;
    }

    // Word (command name, keyword, identifier)
    if (isWordStart(ch)) {
      let word = "";
      while (pos < input.length && isWordChar(peek())) {
        word += advance();
      }
      add(TokenType.WORD, word, tl, tc);
      continue;
    }

    throw new LogoError(`Caractere inesperado: '${ch}'`, tl, tc);
  }

  add(TokenType.EOF, "", line, col);
  return tokens;
}

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function isWhitespace(ch: string): boolean {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

function isWordStart(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
}

function isWordChar(ch: string): boolean {
  return isWordStart(ch) || isDigit(ch) || ch === "?";
}
