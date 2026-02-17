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

  let hadWhitespace = true; // treat start-of-input as "after whitespace"

  while (pos < input.length) {
    const ch = peek();

    // Skip whitespace
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") {
      advance();
      hadWhitespace = true;
      continue;
    }

    // Comment: ; until end of line
    if (ch === ";") {
      while (pos < input.length && peek() !== "\n") {
        advance();
      }
      hadWhitespace = true;
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
      hadWhitespace = false;
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
      hadWhitespace = false;
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
      hadWhitespace = false;
      continue;
    }

    // Brackets
    if (ch === "[") {
      advance();
      add(TokenType.LBRACKET, "[", tl, tc);
      hadWhitespace = false;
      continue;
    }
    if (ch === "]") {
      advance();
      add(TokenType.RBRACKET, "]", tl, tc);
      hadWhitespace = false;
      continue;
    }

    // Parentheses
    if (ch === "(") {
      advance();
      add(TokenType.LPAREN, "(", tl, tc);
      hadWhitespace = false;
      continue;
    }
    if (ch === ")") {
      advance();
      add(TokenType.RPAREN, ")", tl, tc);
      hadWhitespace = false;
      continue;
    }

    // Operators
    if (ch === "+") {
      advance();
      add(TokenType.PLUS, "+", tl, tc);
      hadWhitespace = false;
      continue;
    }
    // Minus: if preceded by whitespace and immediately followed by a digit,
    // tokenize as a negative number literal (UCBLogo convention).
    // This allows "setxy 0 -150" to parse as two separate args.
    if (ch === "-") {
      if (hadWhitespace && pos + 1 < input.length && isDigit(input[pos + 1])) {
        advance(); // consume -
        let num = "-";
        while (pos < input.length && (isDigit(peek()) || peek() === ".")) {
          num += advance();
        }
        add(TokenType.NUMBER, num, tl, tc);
        hadWhitespace = false;
        continue;
      }
      advance();
      add(TokenType.MINUS, "-", tl, tc);
      hadWhitespace = false;
      continue;
    }
    if (ch === "*") {
      advance();
      add(TokenType.STAR, "*", tl, tc);
      hadWhitespace = false;
      continue;
    }
    if (ch === "/") {
      advance();
      add(TokenType.SLASH, "/", tl, tc);
      hadWhitespace = false;
      continue;
    }
    if (ch === "=") {
      advance();
      add(TokenType.EQ, "=", tl, tc);
      hadWhitespace = false;
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
      hadWhitespace = false;
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
      hadWhitespace = false;
      continue;
    }

    // Word (command name, keyword, identifier)
    if (isWordStart(ch)) {
      let word = "";
      while (pos < input.length && isWordChar(peek())) {
        word += advance();
      }
      add(TokenType.WORD, word, tl, tc);
      hadWhitespace = false;
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
  return /^[\p{L}_]$/u.test(ch);
}

function isWordChar(ch: string): boolean {
  return isWordStart(ch) || isDigit(ch) || ch === "?";
}
