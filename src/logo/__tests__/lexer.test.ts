import { tokenize } from "../lexer";
import { TokenType } from "../types";

describe("Lexer", () => {
  it("tokenizes a simple command", () => {
    const tokens = tokenize("fd 100");
    expect(tokens).toEqual([
      { type: TokenType.WORD, value: "fd", line: 1, col: 1 },
      { type: TokenType.NUMBER, value: "100", line: 1, col: 4 },
      { type: TokenType.EOF, value: "", line: 1, col: 7 },
    ]);
  });

  it("tokenizes variables", () => {
    const tokens = tokenize(":x");
    expect(tokens[0]).toMatchObject({
      type: TokenType.VARIABLE,
      value: "x",
    });
  });

  it("tokenizes string literals", () => {
    const tokens = tokenize('"hello');
    expect(tokens[0]).toMatchObject({
      type: TokenType.STRING,
      value: "hello",
    });
  });

  it("tokenizes brackets", () => {
    const tokens = tokenize("[fd 100]");
    expect(tokens.map((t) => t.type)).toEqual([
      TokenType.LBRACKET,
      TokenType.WORD,
      TokenType.NUMBER,
      TokenType.RBRACKET,
      TokenType.EOF,
    ]);
  });

  it("tokenizes parentheses", () => {
    const tokens = tokenize("(1 + 2)");
    expect(tokens.map((t) => t.type)).toEqual([
      TokenType.LPAREN,
      TokenType.NUMBER,
      TokenType.PLUS,
      TokenType.NUMBER,
      TokenType.RPAREN,
      TokenType.EOF,
    ]);
  });

  it("tokenizes all operators", () => {
    const tokens = tokenize("+ - * / < > = <> <= >=");
    const types = tokens.slice(0, -1).map((t) => t.type);
    expect(types).toEqual([
      TokenType.PLUS,
      TokenType.MINUS,
      TokenType.STAR,
      TokenType.SLASH,
      TokenType.LT,
      TokenType.GT,
      TokenType.EQ,
      TokenType.NEQ,
      TokenType.LTE,
      TokenType.GTE,
    ]);
  });

  it("tokenizes decimal numbers", () => {
    const tokens = tokenize("3.14");
    expect(tokens[0]).toMatchObject({
      type: TokenType.NUMBER,
      value: "3.14",
    });
  });

  it("skips comments", () => {
    const tokens = tokenize("fd 100 ; move forward\nrt 90");
    const words = tokens.filter((t) => t.type === TokenType.WORD);
    expect(words.map((w) => w.value)).toEqual(["fd", "rt"]);
  });

  it("tracks line and column numbers", () => {
    const tokens = tokenize("fd 100\nrt 90");
    expect(tokens[2]).toMatchObject({
      type: TokenType.WORD,
      value: "rt",
      line: 2,
      col: 1,
    });
  });

  it("handles multiline input", () => {
    const tokens = tokenize("repeat 4 [\n  fd 100\n  rt 90\n]");
    const words = tokens.filter((t) => t.type === TokenType.WORD);
    expect(words.map((w) => w.value)).toEqual(["repeat", "fd", "rt"]);
  });

  it("throws on unexpected character", () => {
    expect(() => tokenize("fd 100 @ rt 90")).toThrow("Caractere inesperado");
  });

  it("throws on empty variable name", () => {
    expect(() => tokenize(": + 1")).toThrow("Esperado nome de variavel");
  });

  it("tokenizes Portuguese commands as WORDs", () => {
    const tokens = tokenize("pf 100 vd 90");
    const words = tokens.filter((t) => t.type === TokenType.WORD);
    expect(words.map((w) => w.value)).toEqual(["pf", "vd"]);
  });
});
