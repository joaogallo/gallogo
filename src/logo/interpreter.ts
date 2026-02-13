import {
  Statement,
  Expression,
  TurtleState,
  DrawCommand,
  InterpreterResult,
  createInitialTurtleState,
} from "./types";
import { resolveColor } from "./commands";
import { LogoRuntimeError, StopSignal } from "./errors";

const MAX_STEPS = 10_000;

interface Procedure {
  params: string[];
  body: Statement[];
}

interface Scope {
  vars: Map<string, number | string>;
}

export interface InterpreterState {
  turtle: TurtleState;
  procedures: Map<string, Procedure>;
  globalVars: Map<string, number | string>;
}

export function createInterpreterState(): InterpreterState {
  return {
    turtle: createInitialTurtleState(),
    procedures: new Map(),
    globalVars: new Map(),
  };
}

export function interpret(
  statements: Statement[],
  state?: InterpreterState
): InterpreterResult {
  const s = state ?? createInterpreterState();
  const turtle: TurtleState = { ...s.turtle };
  const procedures = new Map(s.procedures);
  const commands: DrawCommand[] = [];
  const output: string[] = [];
  const scopeStack: Scope[] = [{ vars: new Map(s.globalVars) }];
  let steps = 0;
  let repcountStack: number[] = [];

  function step() {
    steps++;
    if (steps > MAX_STEPS) {
      throw new LogoRuntimeError(
        `Limite de ${MAX_STEPS} passos excedido. Possivel loop infinito.`
      );
    }
  }

  function currentScope(): Scope {
    return scopeStack[scopeStack.length - 1];
  }

  function getVar(name: string): number | string {
    const lower = name.toLowerCase();

    // Special: repcount
    if (lower === "repcount" || lower === "contagemrepita") {
      if (repcountStack.length > 0) {
        return repcountStack[repcountStack.length - 1];
      }
      return 0;
    }

    // Search scopes innermost → outermost
    for (let i = scopeStack.length - 1; i >= 0; i--) {
      const val = scopeStack[i].vars.get(lower);
      if (val !== undefined) return val;
    }
    throw new LogoRuntimeError(`Variavel ':${name}' nao definida`);
  }

  function setVar(name: string, value: number | string) {
    // make always sets in the global (bottom) scope
    scopeStack[0].vars.set(name.toLowerCase(), value);
  }

  function emitTurtleUpdate() {
    commands.push({ type: "turtle", state: { ...turtle } });
  }

  function toNumber(val: number | string): number {
    if (typeof val === "number") return val;
    const n = parseFloat(val);
    if (isNaN(n)) {
      throw new LogoRuntimeError(`Esperado numero, encontrado '${val}'`);
    }
    return n;
  }

  // ---- Expression evaluation ----

  function evalExpr(expr: Expression): number | string {
    switch (expr.kind) {
      case "number":
        return expr.value;
      case "string":
        return expr.value;
      case "variable":
        return getVar(expr.name);
      case "unary_minus":
        return -toNumber(evalExpr(expr.operand));
      case "binary": {
        const left = toNumber(evalExpr(expr.left));
        const right = toNumber(evalExpr(expr.right));
        switch (expr.op) {
          case "+":
            return left + right;
          case "-":
            return left - right;
          case "*":
            return left * right;
          case "/":
            if (right === 0)
              throw new LogoRuntimeError("Divisao por zero");
            return left / right;
          case "<":
            return left < right ? 1 : 0;
          case ">":
            return left > right ? 1 : 0;
          case "=":
            return left === right ? 1 : 0;
          case "<>":
            return left !== right ? 1 : 0;
          case "<=":
            return left <= right ? 1 : 0;
          case ">=":
            return left >= right ? 1 : 0;
        }
        break;
      }
      case "call":
        return evalReporter(expr.name, expr.args);
    }
    throw new LogoRuntimeError("Expressao invalida");
  }

  function evalReporter(
    name: string,
    argExprs: Expression[]
  ): number {
    const args = argExprs.map((a) => toNumber(evalExpr(a)));
    switch (name) {
      case "sum":
        return args[0] + args[1];
      case "difference":
        return args[0] - args[1];
      case "product":
        return args[0] * args[1];
      case "quotient":
        if (args[1] === 0)
          throw new LogoRuntimeError("Divisao por zero");
        return args[0] / args[1];
      case "remainder":
        if (args[1] === 0)
          throw new LogoRuntimeError("Divisao por zero");
        return args[0] % args[1];
      case "random":
        return Math.floor(Math.random() * args[0]);
      case "sqrt":
        if (args[0] < 0)
          throw new LogoRuntimeError(
            "Raiz quadrada de numero negativo"
          );
        return Math.sqrt(args[0]);
      case "abs":
        return Math.abs(args[0]);
      case "minus":
        return -args[0];
      case "round":
        return Math.round(args[0]);
      case "int":
        return Math.trunc(args[0]);
      case "sin":
        return Math.sin((args[0] * Math.PI) / 180);
      case "cos":
        return Math.cos((args[0] * Math.PI) / 180);
      case "tan":
        return Math.tan((args[0] * Math.PI) / 180);
      case "power":
        return Math.pow(args[0], args[1]);
      case "repcount":
        return repcountStack.length > 0
          ? repcountStack[repcountStack.length - 1]
          : 0;
      default:
        throw new LogoRuntimeError(
          `Reporter desconhecido: '${name}'`
        );
    }
  }

  // ---- Statement execution ----

  function execStatements(stmts: Statement[]) {
    for (const stmt of stmts) {
      execStatement(stmt);
    }
  }

  function execStatement(stmt: Statement) {
    step();
    switch (stmt.kind) {
      case "command":
        return execCommand(stmt.name, stmt.args);
      case "repeat":
        return execRepeat(stmt);
      case "if":
        return execIf(stmt);
      case "ifelse":
        return execIfElse(stmt);
      case "procedure_def":
        return execProcedureDef(stmt);
      case "make":
        return execMake(stmt);
      case "print":
        return execPrint(stmt);
      case "stop":
        throw new StopSignal();
    }
  }

  function execCommand(name: string, argExprs: Expression[]) {
    switch (name) {
      case "forward":
        return moveForward(toNumber(evalExpr(argExprs[0])));
      case "back":
        return moveForward(-toNumber(evalExpr(argExprs[0])));
      case "right":
        turtle.heading =
          ((turtle.heading + toNumber(evalExpr(argExprs[0]))) % 360 + 360) %
          360;
        emitTurtleUpdate();
        return;
      case "left":
        turtle.heading =
          ((turtle.heading - toNumber(evalExpr(argExprs[0]))) % 360 + 360) %
          360;
        emitTurtleUpdate();
        return;
      case "penup":
        turtle.penDown = false;
        return;
      case "pendown":
        turtle.penDown = true;
        return;
      case "setpencolor":
        turtle.penColor = resolveColor(
          evalExpr(argExprs[0]) as number | string
        );
        return;
      case "setpensize":
        turtle.penSize = toNumber(evalExpr(argExprs[0]));
        return;
      case "home":
        moveTo(0, 0);
        turtle.heading = 0;
        emitTurtleUpdate();
        return;
      case "clearscreen":
        commands.push({ type: "clear" });
        turtle.x = 0;
        turtle.y = 0;
        turtle.heading = 0;
        turtle.penDown = true;
        turtle.visible = true;
        emitTurtleUpdate();
        return;
      case "hideturtle":
        turtle.visible = false;
        emitTurtleUpdate();
        return;
      case "showturtle":
        turtle.visible = true;
        emitTurtleUpdate();
        return;
      case "setxy": {
        const nx = toNumber(evalExpr(argExprs[0]));
        const ny = toNumber(evalExpr(argExprs[1]));
        moveTo(nx, ny);
        return;
      }
      case "setheading":
        turtle.heading =
          ((toNumber(evalExpr(argExprs[0])) % 360) + 360) % 360;
        emitTurtleUpdate();
        return;
      default:
        return execUserProcedure(name, argExprs);
    }
  }

  function moveForward(dist: number) {
    const rad = (turtle.heading * Math.PI) / 180;
    const newX = turtle.x + dist * Math.sin(rad);
    const newY = turtle.y + dist * Math.cos(rad);
    if (turtle.penDown) {
      commands.push({
        type: "line",
        x1: turtle.x,
        y1: turtle.y,
        x2: newX,
        y2: newY,
        color: turtle.penColor,
        size: turtle.penSize,
      });
    }
    turtle.x = newX;
    turtle.y = newY;
    emitTurtleUpdate();
  }

  function moveTo(nx: number, ny: number) {
    if (turtle.penDown) {
      commands.push({
        type: "line",
        x1: turtle.x,
        y1: turtle.y,
        x2: nx,
        y2: ny,
        color: turtle.penColor,
        size: turtle.penSize,
      });
    }
    turtle.x = nx;
    turtle.y = ny;
    emitTurtleUpdate();
  }

  function execUserProcedure(name: string, argExprs: Expression[]) {
    const proc = procedures.get(name);
    if (!proc) {
      throw new LogoRuntimeError(
        `Comando desconhecido: '${name}'`
      );
    }

    const args = argExprs.map((a) => evalExpr(a));
    if (args.length !== proc.params.length) {
      throw new LogoRuntimeError(
        `'${name}' espera ${proc.params.length} argumento(s), recebeu ${args.length}`
      );
    }

    // New scope with parameters
    const scope: Scope = { vars: new Map() };
    proc.params.forEach((p, i) => {
      scope.vars.set(p.toLowerCase(), args[i]);
    });
    scopeStack.push(scope);

    try {
      execStatements(proc.body);
    } catch (e) {
      if (e instanceof StopSignal) {
        // stop exits the current procedure — ok
      } else {
        throw e;
      }
    } finally {
      scopeStack.pop();
    }
  }

  function execRepeat(stmt: {
    count: Expression;
    body: Statement[];
  }) {
    const n = Math.floor(toNumber(evalExpr(stmt.count)));
    for (let i = 0; i < n; i++) {
      step();
      repcountStack.push(i + 1);
      try {
        execStatements(stmt.body);
      } finally {
        repcountStack.pop();
      }
    }
  }

  function execIf(stmt: {
    condition: Expression;
    thenBody: Statement[];
  }) {
    const cond = toNumber(evalExpr(stmt.condition));
    if (cond !== 0) {
      execStatements(stmt.thenBody);
    }
  }

  function execIfElse(stmt: {
    condition: Expression;
    thenBody: Statement[];
    elseBody: Statement[];
  }) {
    const cond = toNumber(evalExpr(stmt.condition));
    if (cond !== 0) {
      execStatements(stmt.thenBody);
    } else {
      execStatements(stmt.elseBody);
    }
  }

  function execProcedureDef(stmt: {
    name: string;
    params: string[];
    body: Statement[];
  }) {
    procedures.set(stmt.name, {
      params: stmt.params,
      body: stmt.body,
    });
  }

  function execMake(stmt: { varName: string; value: Expression }) {
    const value = evalExpr(stmt.value);
    setVar(stmt.varName, value);
  }

  function execPrint(stmt: { value: Expression }) {
    const value = evalExpr(stmt.value);
    const text = String(value);
    output.push(text);
    commands.push({ type: "print", text });
  }

  // ---- Execute ----

  try {
    execStatements(statements);
  } catch (e) {
    if (e instanceof StopSignal) {
      // stop at top level — ignore
    } else if (e instanceof LogoRuntimeError) {
      return { commands, turtle: { ...turtle }, output, error: e.message };
    } else {
      throw e;
    }
  }

  // Persist state for next execution
  s.turtle = { ...turtle };
  s.procedures = procedures;
  s.globalVars = new Map(scopeStack[0].vars);

  return { commands, turtle: { ...turtle }, output };
}
