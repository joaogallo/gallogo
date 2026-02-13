import { tokenize } from "../lexer";
import { parse } from "../parser";

function parseCode(code: string) {
  return parse(tokenize(code));
}

describe("Parser", () => {
  describe("simple commands", () => {
    it("parses fd 100", () => {
      const ast = parseCode("fd 100");
      expect(ast).toHaveLength(1);
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "forward",
        args: [{ kind: "number", value: 100 }],
      });
    });

    it("parses multiple commands", () => {
      const ast = parseCode("fd 100 rt 90");
      expect(ast).toHaveLength(2);
      expect(ast[0]).toMatchObject({ kind: "command", name: "forward" });
      expect(ast[1]).toMatchObject({ kind: "command", name: "right" });
    });

    it("parses zero-arg commands", () => {
      const ast = parseCode("pu");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "penup",
        args: [],
      });
    });

    it("parses two-arg commands", () => {
      const ast = parseCode("setxy 100 200");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "setxy",
        args: [
          { kind: "number", value: 100 },
          { kind: "number", value: 200 },
        ],
      });
    });
  });

  describe("Portuguese aliases", () => {
    it("parses pf as forward", () => {
      const ast = parseCode("pf 50");
      expect(ast[0]).toMatchObject({ kind: "command", name: "forward" });
    });

    it("parses pt as back", () => {
      const ast = parseCode("pt 30");
      expect(ast[0]).toMatchObject({ kind: "command", name: "back" });
    });

    it("parses vd as right (virar direita)", () => {
      const ast = parseCode("vd 90");
      expect(ast[0]).toMatchObject({ kind: "command", name: "right" });
    });

    it("parses ve as left (virar esquerda)", () => {
      const ast = parseCode("ve 45");
      expect(ast[0]).toMatchObject({ kind: "command", name: "left" });
    });

    it("parses un as penup (usenada)", () => {
      const ast = parseCode("un");
      expect(ast[0]).toMatchObject({ kind: "command", name: "penup" });
    });

    it("parses ul as pendown (uselapis)", () => {
      const ast = parseCode("ul");
      expect(ast[0]).toMatchObject({ kind: "command", name: "pendown" });
    });

    it("parses mudecl as setpencolor", () => {
      const ast = parseCode("mudecl 4");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "setpencolor",
      });
    });

    it("parses mudeel as setpensize", () => {
      const ast = parseCode("mudeel 3");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "setpensize",
      });
    });

    it("parses limpe as clearscreen", () => {
      const ast = parseCode("limpe");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "clearscreen",
      });
    });

    it("parses dt as hideturtle", () => {
      const ast = parseCode("dt");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "hideturtle",
      });
    });

    it("parses mt as showturtle", () => {
      const ast = parseCode("mt");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "showturtle",
      });
    });

    it("parses paracentro as home", () => {
      const ast = parseCode("paracentro");
      expect(ast[0]).toMatchObject({ kind: "command", name: "home" });
    });

    it("parses mudexy as setxy", () => {
      const ast = parseCode("mudexy 10 20");
      expect(ast[0]).toMatchObject({ kind: "command", name: "setxy" });
    });

    it("parses mudedirecao as setheading", () => {
      const ast = parseCode("mudedirecao 90");
      expect(ast[0]).toMatchObject({
        kind: "command",
        name: "setheading",
      });
    });

    it("parses escreva as print", () => {
      const ast = parseCode('escreva 42');
      expect(ast[0]).toMatchObject({ kind: "print" });
    });

    it("parses faca as make", () => {
      const ast = parseCode('faca "x 10');
      expect(ast[0]).toMatchObject({ kind: "make", varName: "x" });
    });
  });

  describe("repeat", () => {
    it("parses repeat with block", () => {
      const ast = parseCode("repeat 4 [fd 100 rt 90]");
      expect(ast[0]).toMatchObject({
        kind: "repeat",
        count: { kind: "number", value: 4 },
      });
      const body = (ast[0] as { body: unknown[] }).body;
      expect(body).toHaveLength(2);
    });

    it("parses repita (PT)", () => {
      const ast = parseCode("repita 3 [pf 50]");
      expect(ast[0]).toMatchObject({ kind: "repeat" });
    });

    it("parses nested repeats", () => {
      const ast = parseCode("repeat 4 [repeat 2 [fd 50] rt 90]");
      const outer = ast[0] as { body: unknown[] };
      expect(outer.body).toHaveLength(2);
      expect(outer.body[0]).toMatchObject({ kind: "repeat" });
    });
  });

  describe("if / ifelse", () => {
    it("parses if", () => {
      const ast = parseCode("if :x > 0 [fd 100]");
      expect(ast[0]).toMatchObject({ kind: "if" });
    });

    it("parses se (PT)", () => {
      const ast = parseCode("se :x > 0 [pf 100]");
      expect(ast[0]).toMatchObject({ kind: "if" });
    });

    it("parses ifelse", () => {
      const ast = parseCode("ifelse :x > 0 [fd 100] [bk 50]");
      const stmt = ast[0] as { kind: string; thenBody: unknown[]; elseBody: unknown[] };
      expect(stmt.kind).toBe("ifelse");
      expect(stmt.thenBody).toHaveLength(1);
      expect(stmt.elseBody).toHaveLength(1);
    });
  });

  describe("procedures", () => {
    it("parses to ... end", () => {
      const ast = parseCode("to square :size\nrepeat 4 [fd :size rt 90]\nend");
      expect(ast[0]).toMatchObject({
        kind: "procedure_def",
        name: "square",
        params: ["size"],
      });
    });

    it("parses aprenda ... fim (PT)", () => {
      const ast = parseCode("aprenda quadrado :lado\nrepita 4 [pf :lado vd 90]\nfim");
      expect(ast[0]).toMatchObject({
        kind: "procedure_def",
        name: "quadrado",
        params: ["lado"],
      });
    });

    it("allows recursive calls", () => {
      const code = "to spiral :size\nif :size > 200 [stop]\nfd :size rt 90\nspiral :size + 5\nend";
      const ast = parseCode(code);
      expect(ast[0]).toMatchObject({ kind: "procedure_def", name: "spiral" });
    });

    it("throws on end without to", () => {
      expect(() => parseCode("end")).toThrow("'end'/'fim'");
    });

    it("throws on to without end", () => {
      expect(() => parseCode("to myproc\nfd 100")).toThrow("sem 'end'/'fim'");
    });
  });

  describe("make / print", () => {
    it("parses make", () => {
      const ast = parseCode('make "x 42');
      expect(ast[0]).toMatchObject({
        kind: "make",
        varName: "x",
        value: { kind: "number", value: 42 },
      });
    });

    it("parses print", () => {
      const ast = parseCode("print 42");
      expect(ast[0]).toMatchObject({
        kind: "print",
        value: { kind: "number", value: 42 },
      });
    });
  });

  describe("expressions", () => {
    it("parses arithmetic", () => {
      const ast = parseCode("fd 100 + 50");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({
        kind: "binary",
        op: "+",
        left: { kind: "number", value: 100 },
        right: { kind: "number", value: 50 },
      });
    });

    it("parses operator precedence (* before +)", () => {
      const ast = parseCode("fd 2 + 3 * 4");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      // Should be 2 + (3 * 4), not (2 + 3) * 4
      expect(arg).toMatchObject({
        kind: "binary",
        op: "+",
        right: { kind: "binary", op: "*" },
      });
    });

    it("parses unary minus", () => {
      const ast = parseCode("fd -50");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({
        kind: "unary_minus",
        operand: { kind: "number", value: 50 },
      });
    });

    it("parses parenthesized expressions", () => {
      const ast = parseCode("fd (2 + 3) * 4");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({
        kind: "binary",
        op: "*",
        left: { kind: "binary", op: "+" },
      });
    });

    it("parses variable references in expressions", () => {
      const ast = parseCode("fd :size + 10");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({
        kind: "binary",
        op: "+",
        left: { kind: "variable", name: "size" },
      });
    });

    it("parses reporter calls (sum)", () => {
      const ast = parseCode("fd sum 100 50");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({
        kind: "call",
        name: "sum",
        args: [
          { kind: "number", value: 100 },
          { kind: "number", value: 50 },
        ],
      });
    });

    it("parses PT math reporters (soma)", () => {
      const ast = parseCode("pf soma 10 20");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({ kind: "call", name: "sum" });
    });

    it("parses raizq (sqrt PT)", () => {
      const ast = parseCode("pf raizq 144");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({ kind: "call", name: "sqrt" });
    });

    it("parses aleatorio (random PT)", () => {
      const ast = parseCode("pf aleatorio 100");
      const arg = (ast[0] as { args: unknown[] }).args[0];
      expect(arg).toMatchObject({ kind: "call", name: "random" });
    });

    it("parses comparison operators", () => {
      const ast = parseCode("if :x >= 10 [fd 100]");
      const stmt = ast[0] as { condition: unknown };
      expect(stmt.condition).toMatchObject({
        kind: "binary",
        op: ">=",
      });
    });
  });

  describe("error messages", () => {
    it("gives error for unclosed block", () => {
      expect(() => parseCode("repeat 4 [fd 100")).toThrow(
        "bloco nao foi fechado"
      );
    });

    it("gives error for unexpected token as statement", () => {
      expect(() => parseCode("100")).toThrow("Esperado um comando");
    });
  });
});
