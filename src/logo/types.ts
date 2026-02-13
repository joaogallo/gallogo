// ---- Token Types ----

export enum TokenType {
  NUMBER = "NUMBER",
  WORD = "WORD",
  STRING = "STRING",
  VARIABLE = "VARIABLE",
  LBRACKET = "LBRACKET",
  RBRACKET = "RBRACKET",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  PLUS = "PLUS",
  MINUS = "MINUS",
  STAR = "STAR",
  SLASH = "SLASH",
  LT = "LT",
  GT = "GT",
  EQ = "EQ",
  NEQ = "NEQ",
  LTE = "LTE",
  GTE = "GTE",
  EOF = "EOF",
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  col: number;
}

// ---- Expressions ----

export interface NumberLiteral {
  kind: "number";
  value: number;
}

export interface StringLiteral {
  kind: "string";
  value: string;
}

export interface VariableRef {
  kind: "variable";
  name: string;
}

export interface BinaryOp {
  kind: "binary";
  op: "+" | "-" | "*" | "/" | "<" | ">" | "=" | "<>" | "<=" | ">=";
  left: Expression;
  right: Expression;
}

export interface UnaryMinus {
  kind: "unary_minus";
  operand: Expression;
}

export interface FunctionCall {
  kind: "call";
  name: string;
  args: Expression[];
}

export type Expression =
  | NumberLiteral
  | StringLiteral
  | VariableRef
  | BinaryOp
  | UnaryMinus
  | FunctionCall;

// ---- Statements ----

export interface CommandStatement {
  kind: "command";
  name: string;
  args: Expression[];
  line: number;
  col: number;
}

export interface RepeatStatement {
  kind: "repeat";
  count: Expression;
  body: Statement[];
  line: number;
  col: number;
}

export interface IfStatement {
  kind: "if";
  condition: Expression;
  thenBody: Statement[];
  line: number;
  col: number;
}

export interface IfElseStatement {
  kind: "ifelse";
  condition: Expression;
  thenBody: Statement[];
  elseBody: Statement[];
  line: number;
  col: number;
}

export interface ProcedureDef {
  kind: "procedure_def";
  name: string;
  params: string[];
  body: Statement[];
  line: number;
  col: number;
}

export interface MakeStatement {
  kind: "make";
  varName: string;
  value: Expression;
  line: number;
  col: number;
}

export interface PrintStatement {
  kind: "print";
  value: Expression;
  line: number;
  col: number;
}

export interface StopStatement {
  kind: "stop";
  line: number;
  col: number;
}

export type Statement =
  | CommandStatement
  | RepeatStatement
  | IfStatement
  | IfElseStatement
  | ProcedureDef
  | MakeStatement
  | PrintStatement
  | StopStatement;

// ---- Turtle State ----

export interface TurtleState {
  x: number;
  y: number;
  heading: number; // degrees, 0 = north/up, clockwise
  penDown: boolean;
  penColor: string;
  penSize: number;
  visible: boolean;
}

export function createInitialTurtleState(): TurtleState {
  return {
    x: 0,
    y: 0,
    heading: 0,
    penDown: true,
    penColor: "#000000",
    penSize: 1,
    visible: true,
  };
}

// ---- Draw Commands (interpreter output) ----

export interface LineCommand {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  size: number;
}

export interface MoveToCommand {
  type: "moveTo";
  x: number;
  y: number;
}

export interface ClearCommand {
  type: "clear";
}

export interface TurtleUpdateCommand {
  type: "turtle";
  state: TurtleState;
}

export interface PrintOutput {
  type: "print";
  text: string;
}

export type DrawCommand =
  | LineCommand
  | MoveToCommand
  | ClearCommand
  | TurtleUpdateCommand
  | PrintOutput;

// ---- Interpreter Result ----

export interface InterpreterResult {
  commands: DrawCommand[];
  turtle: TurtleState;
  output: string[];
  error?: string;
}
