import { execute, createInterpreterState } from "../index";
import type { InterpreterState } from "../interpreter";

function run(code: string, state?: InterpreterState) {
  return execute(code, state);
}

describe("Interpreter", () => {
  describe("movement", () => {
    it("moves forward", () => {
      const r = run("fd 100");
      expect(r.turtle.x).toBeCloseTo(0);
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("moves back", () => {
      const r = run("bk 50");
      expect(r.turtle.x).toBeCloseTo(0);
      expect(r.turtle.y).toBeCloseTo(-50);
    });

    it("turns right", () => {
      const r = run("rt 90");
      expect(r.turtle.heading).toBeCloseTo(90);
    });

    it("turns left", () => {
      const r = run("lt 90");
      expect(r.turtle.heading).toBeCloseTo(270);
    });

    it("fd after rt 90 moves along x", () => {
      const r = run("rt 90 fd 100");
      expect(r.turtle.x).toBeCloseTo(100);
      expect(r.turtle.y).toBeCloseTo(0);
    });

    it("heading wraps around 360", () => {
      const r = run("rt 450");
      expect(r.turtle.heading).toBeCloseTo(90);
    });
  });

  describe("PT movement commands", () => {
    it("pf moves forward", () => {
      const r = run("pf 100");
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("pt moves back", () => {
      const r = run("pt 50");
      expect(r.turtle.y).toBeCloseTo(-50);
    });

    it("pd turns right (paradireita)", () => {
      const r = run("pd 90");
      expect(r.turtle.heading).toBeCloseTo(90);
    });

    it("pe turns left (paraesquerda)", () => {
      const r = run("pe 45");
      expect(r.turtle.heading).toBeCloseTo(315);
    });
  });

  describe("draw commands", () => {
    it("generates line when pen is down", () => {
      const r = run("fd 100");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(1);
      expect(lines[0]).toMatchObject({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 100,
      });
    });

    it("does not generate line when pen is up", () => {
      const r = run("pu fd 100");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(0);
    });
  });

  describe("pen commands", () => {
    it("penup / pendown", () => {
      const r = run("pu fd 50 pd 90 pendown fd 50");
      // "pd 90" is right turn (paradireita), not pendown
      // pendown is the English word form
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(1); // only the last fd 50
    });

    it("un / ul (PT pen commands)", () => {
      const r = run("un pf 50 ul pf 50");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(1);
    });

    it("setpencolor changes color", () => {
      const r = run("setpc 4 fd 50");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines[0]).toMatchObject({ color: "#cc0000" }); // red
    });

    it("mudecl changes color (PT)", () => {
      const r = run("mudecl 1 pf 50");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines[0]).toMatchObject({ color: "#0000ff" }); // blue
    });

    it("setpensize changes size", () => {
      const r = run("setps 5 fd 50");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines[0]).toMatchObject({ size: 5 });
    });

    it("mudeel changes size (PT)", () => {
      const r = run("mudeel 3 pf 50");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines[0]).toMatchObject({ size: 3 });
    });
  });

  describe("turtle commands", () => {
    it("home returns to center", () => {
      const r = run("fd 100 rt 45 home");
      expect(r.turtle.x).toBeCloseTo(0);
      expect(r.turtle.y).toBeCloseTo(0);
      expect(r.turtle.heading).toBeCloseTo(0);
    });

    it("paracentro returns to center (PT)", () => {
      const r = run("pf 100 pd 45 paracentro");
      expect(r.turtle.x).toBeCloseTo(0);
      expect(r.turtle.y).toBeCloseTo(0);
    });

    it("clearscreen clears and resets", () => {
      const r = run("fd 100 cs");
      const clearCmds = r.commands.filter((c) => c.type === "clear");
      expect(clearCmds).toHaveLength(1);
      expect(r.turtle.x).toBeCloseTo(0);
      expect(r.turtle.y).toBeCloseTo(0);
    });

    it("limpe clears (PT)", () => {
      const r = run("pf 100 limpe");
      const clearCmds = r.commands.filter((c) => c.type === "clear");
      expect(clearCmds).toHaveLength(1);
    });

    it("hideturtle / showturtle", () => {
      let r = run("ht");
      expect(r.turtle.visible).toBe(false);
      r = run("ht st");
      expect(r.turtle.visible).toBe(true);
    });

    it("dt / mt (PT turtle visibility)", () => {
      let r = run("dt");
      expect(r.turtle.visible).toBe(false);
      r = run("dt mt");
      expect(r.turtle.visible).toBe(true);
    });

    it("setxy moves to coordinates", () => {
      const r = run("setxy 50 100");
      expect(r.turtle.x).toBeCloseTo(50);
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("mudexy moves to coordinates (PT)", () => {
      const r = run("mudexy 30 60");
      expect(r.turtle.x).toBeCloseTo(30);
      expect(r.turtle.y).toBeCloseTo(60);
    });

    it("setheading sets direction", () => {
      const r = run("seth 180");
      expect(r.turtle.heading).toBeCloseTo(180);
    });

    it("mudedirecao sets direction (PT)", () => {
      const r = run("mudedirecao 270");
      expect(r.turtle.heading).toBeCloseTo(270);
    });
  });

  describe("repeat", () => {
    it("draws a square", () => {
      const r = run("repeat 4 [fd 100 rt 90]");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(4);
      // Should end back at origin
      expect(r.turtle.x).toBeCloseTo(0);
      expect(r.turtle.y).toBeCloseTo(0);
    });

    it("repita draws a triangle (PT)", () => {
      const r = run("repita 3 [pf 100 pd 120]");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(3);
    });

    it("supports nested repeats", () => {
      const r = run("repeat 2 [repeat 2 [fd 10 rt 90]]");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(4);
    });

    it("provides repcount", () => {
      const r = run("repeat 3 [print repcount]");
      expect(r.output).toEqual(["1", "2", "3"]);
    });
  });

  describe("if / ifelse", () => {
    it("executes then-body when condition is true", () => {
      const state = createInterpreterState();
      run('make "x 5', state);
      const r = run("if :x > 0 [fd 100]", state);
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("skips then-body when condition is false", () => {
      const state = createInterpreterState();
      run('make "x 0', state);
      const r = run("if :x > 0 [fd 100]", state);
      expect(r.turtle.y).toBeCloseTo(0);
    });

    it("ifelse chooses correct branch", () => {
      const state = createInterpreterState();
      run('make "x 5', state);
      const r = run("ifelse :x > 3 [fd 100] [fd 50]", state);
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("se (PT if) works", () => {
      const state = createInterpreterState();
      run('faca "x 10', state);
      const r = run("se :x > 5 [pf 200]", state);
      expect(r.turtle.y).toBeCloseTo(200);
    });
  });

  describe("procedures", () => {
    it("defines and calls a procedure", () => {
      const state = createInterpreterState();
      run("to square :size\nrepeat 4 [fd :size rt 90]\nend", state);
      const r = run("square 50", state);
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(4);
    });

    it("aprenda / fim (PT) works", () => {
      const state = createInterpreterState();
      run("aprenda quadrado :lado\nrepita 4 [pf :lado pd 90]\nfim", state);
      const r = run("quadrado 80", state);
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(4);
    });

    it("supports recursion with stop", () => {
      const state = createInterpreterState();
      run(
        "to spiral :size\nif :size > 100 [stop]\nfd :size rt 90\nspiral :size + 10\nend",
        state
      );
      const r = run("spiral 10", state);
      expect(r.error).toBeUndefined();
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines.length).toBeGreaterThan(0);
    });

    it("stop / pare exits procedure", () => {
      const state = createInterpreterState();
      run("to test\nfd 50\npare\nfd 100\nend", state);
      const r = run("test", state);
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(1);
      expect(r.turtle.y).toBeCloseTo(50);
    });
  });

  describe("variables", () => {
    it("make and read variable", () => {
      const state = createInterpreterState();
      run('make "dist 75', state);
      const r = run("fd :dist", state);
      expect(r.turtle.y).toBeCloseTo(75);
    });

    it("faca (PT make) works", () => {
      const state = createInterpreterState();
      run('faca "d 120', state);
      const r = run("pf :d", state);
      expect(r.turtle.y).toBeCloseTo(120);
    });

    it("errors on undefined variable", () => {
      const r = run("fd :undefined_var");
      expect(r.error).toContain("nao definida");
    });
  });

  describe("print", () => {
    it("outputs a number", () => {
      const r = run("print 42");
      expect(r.output).toEqual(["42"]);
    });

    it("escreva (PT) outputs", () => {
      const r = run("escreva 99");
      expect(r.output).toEqual(["99"]);
    });

    it("outputs expression results", () => {
      const r = run("print 10 + 5");
      expect(r.output).toEqual(["15"]);
    });
  });

  describe("math reporters", () => {
    it("sum / soma", () => {
      const r = run("print sum 10 20");
      expect(r.output).toEqual(["30"]);
    });

    it("soma (PT)", () => {
      const r = run("escreva soma 3 7");
      expect(r.output).toEqual(["10"]);
    });

    it("difference / diferenca", () => {
      const r = run("print diferenca 100 30");
      expect(r.output).toEqual(["70"]);
    });

    it("product / produto", () => {
      const r = run("print produto 6 7");
      expect(r.output).toEqual(["42"]);
    });

    it("quotient / quociente", () => {
      const r = run("print quociente 100 4");
      expect(r.output).toEqual(["25"]);
    });

    it("remainder / resto", () => {
      const r = run("print resto 10 3");
      expect(r.output).toEqual(["1"]);
    });

    it("sqrt / raizq", () => {
      const r = run("print raizq 144");
      expect(r.output).toEqual(["12"]);
    });

    it("raizquadrada (PT long form)", () => {
      const r = run("print raizquadrada 81");
      expect(r.output).toEqual(["9"]);
    });

    it("abs / valorabsoluto", () => {
      const r = run("print valorabsoluto -5");
      expect(r.output).toEqual(["5"]);
    });

    it("minus / negativo", () => {
      const r = run("print negativo 42");
      expect(r.output).toEqual(["-42"]);
    });

    it("round / arredonde", () => {
      const r = run("print arredonde 3.7");
      expect(r.output).toEqual(["4"]);
    });

    it("int / inteiro", () => {
      const r = run("print inteiro 9.9");
      expect(r.output).toEqual(["9"]);
    });

    it("sin / seno (degrees)", () => {
      const r = run("print seno 90");
      expect(parseFloat(r.output[0])).toBeCloseTo(1);
    });

    it("cos / cosseno (degrees)", () => {
      const r = run("print cosseno 0");
      expect(parseFloat(r.output[0])).toBeCloseTo(1);
    });

    it("tan / tangente (degrees)", () => {
      const r = run("print tangente 45");
      expect(parseFloat(r.output[0])).toBeCloseTo(1);
    });

    it("power / potencia", () => {
      const r = run("print potencia 2 10");
      expect(r.output).toEqual(["1024"]);
    });

    it("random / aleatorio returns value in range", () => {
      const r = run("print aleatorio 100");
      const val = parseFloat(r.output[0]);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(100);
    });

    it("division by zero error", () => {
      const r = run("print quociente 10 0");
      expect(r.error).toContain("Divisao por zero");
    });

    it("sqrt of negative error", () => {
      const r = run("print raizq -4");
      expect(r.error).toContain("negativo");
    });
  });

  describe("persistent state", () => {
    it("turtle position persists between calls", () => {
      const state = createInterpreterState();
      run("fd 50", state);
      const r = run("fd 50", state);
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("variables persist between calls", () => {
      const state = createInterpreterState();
      run('make "x 10', state);
      const r = run("print :x", state);
      expect(r.output).toEqual(["10"]);
    });

    it("procedures persist between calls", () => {
      const state = createInterpreterState();
      run("to sq :s\nrepeat 4 [fd :s rt 90]\nend", state);
      const r = run("sq 30", state);
      expect(r.error).toBeUndefined();
    });
  });

  describe("step limit", () => {
    it("stops on infinite loop", () => {
      const r = run("repeat 99999 [fd 1]");
      expect(r.error).toContain("loop infinito");
    });
  });

  describe("edge cases", () => {
    it("empty input", () => {
      const r = run("");
      expect(r.error).toBeUndefined();
      expect(r.commands).toHaveLength(0);
    });

    it("comment-only input", () => {
      const r = run("; this is a comment");
      expect(r.error).toBeUndefined();
    });

    it("unknown command error", () => {
      const r = run("fdd 100");
      expect(r.error).toBeDefined();
    });

    it("case insensitive commands", () => {
      const r = run("FD 100");
      expect(r.turtle.y).toBeCloseTo(100);
    });

    it("mixed EN/PT commands", () => {
      const r = run("pf 100 rt 90 pf 50");
      const lines = r.commands.filter((c) => c.type === "line");
      expect(lines).toHaveLength(2);
    });
  });
});
