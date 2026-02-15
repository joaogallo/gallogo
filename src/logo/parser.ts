import {
  Token,
  TokenType,
  Expression,
  Statement,
  BinaryOp,
} from "./types";
import {
  lookupCommand,
  isSpecialForm,
  normalizeSpecial,
  isEndKeyword,
} from "./commands";
import { LogoError } from "./errors";

export interface ParserOptions {
  /** Known user procedures from previous executions: name -> arity */
  knownProcedures?: Map<string, number>;
}

export function parse(
  tokens: Token[],
  options: ParserOptions = {}
): Statement[] {
  let pos = 0;
  const procedures = new Map<string, number>(options.knownProcedures ?? []);

  function current(): Token {
    return tokens[pos];
  }

  function advance(): Token {
    return tokens[pos++];
  }

  function expect(type: TokenType, message: string): Token {
    const tok = current();
    if (tok.type !== type) {
      throw new LogoError(message, tok.line, tok.col);
    }
    return advance();
  }

  function atEnd(): boolean {
    return current().type === TokenType.EOF;
  }

  /** Check if the current token can begin an expression (for optional arg parsing) */
  function canStartExpression(): boolean {
    const tok = current();
    if (
      tok.type === TokenType.NUMBER ||
      tok.type === TokenType.VARIABLE ||
      tok.type === TokenType.STRING ||
      tok.type === TokenType.LPAREN ||
      tok.type === TokenType.MINUS
    ) {
      return true;
    }
    // A WORD that is a reporter can start an expression
    if (tok.type === TokenType.WORD) {
      const cmd = lookupCommand(tok.value);
      if (cmd && cmd.type === "reporter") return true;
    }
    return false;
  }

  // ---- Top-level ----

  function parseProgram(): Statement[] {
    const stmts: Statement[] = [];
    while (!atEnd()) {
      stmts.push(parseStatement());
    }
    return stmts;
  }

  function parseBlock(): Statement[] {
    expect(TokenType.LBRACKET, "Esperado '['");
    const stmts: Statement[] = [];
    while (current().type !== TokenType.RBRACKET) {
      if (atEnd()) {
        throw new LogoError(
          "Esperado ']' — bloco nao foi fechado",
          current().line,
          current().col
        );
      }
      stmts.push(parseStatement());
    }
    advance(); // consume ]
    return stmts;
  }

  // ---- Statements ----

  function parseStatement(): Statement {
    const tok = current();

    if (tok.type !== TokenType.WORD) {
      throw new LogoError(
        `Esperado um comando, encontrado '${tok.value || tok.type}'`,
        tok.line,
        tok.col
      );
    }

    const name = tok.value.toLowerCase();

    // Special forms
    if (isSpecialForm(name)) {
      const normalized = normalizeSpecial(name);
      switch (normalized) {
        case "repeat":
          return parseRepeat();
        case "if":
          return parseIf();
        case "ifelse":
          return parseIfElse();
        case "to":
          return parseProcedureDef();
      }
    }

    // Stray end/fim
    if (isEndKeyword(name)) {
      throw new LogoError(
        "'end'/'fim' sem 'to'/'aprenda' correspondente",
        tok.line,
        tok.col
      );
    }

    // Built-in command
    const cmdDef = lookupCommand(name);
    if (cmdDef) {
      advance();

      if (cmdDef.canonicalName === "make") return parseMake(tok);
      if (cmdDef.canonicalName === "print") return parsePrint(tok);
      if (cmdDef.canonicalName === "stop") {
        return { kind: "stop", line: tok.line, col: tok.col };
      }

      const args: Expression[] = [];
      // Parse required args
      for (let i = 0; i < cmdDef.minArity; i++) {
        args.push(parseExpression());
      }
      // Parse optional args (up to arity) if the next token can start an expression
      for (let i = cmdDef.minArity; i < cmdDef.arity; i++) {
        if (!canStartExpression()) break;
        args.push(parseExpression());
      }
      return {
        kind: "command",
        name: cmdDef.canonicalName,
        args,
        line: tok.line,
        col: tok.col,
      };
    }

    // User-defined procedure (known arity)
    const procArity = procedures.get(name);
    if (procArity !== undefined) {
      advance();
      const args: Expression[] = [];
      for (let i = 0; i < procArity; i++) {
        args.push(parseExpression());
      }
      return {
        kind: "command",
        name,
        args,
        line: tok.line,
        col: tok.col,
      };
    }

    // Unknown word — treat as 0-arg command, interpreter will resolve
    advance();
    return { kind: "command", name, args: [], line: tok.line, col: tok.col };
  }

  function parseRepeat(): Statement {
    const tok = advance(); // consume repeat/repita
    const count = parseExpression();
    const body = parseBlock();
    return {
      kind: "repeat",
      count,
      body,
      line: tok.line,
      col: tok.col,
    };
  }

  function parseIf(): Statement {
    const tok = advance(); // consume if/se
    const condition = parseExpression();
    const thenBody = parseBlock();
    return {
      kind: "if",
      condition,
      thenBody,
      line: tok.line,
      col: tok.col,
    };
  }

  function parseIfElse(): Statement {
    const tok = advance(); // consume ifelse/senao
    const condition = parseExpression();
    const thenBody = parseBlock();
    const elseBody = parseBlock();
    return {
      kind: "ifelse",
      condition,
      thenBody,
      elseBody,
      line: tok.line,
      col: tok.col,
    };
  }

  function parseProcedureDef(): Statement {
    const tok = advance(); // consume to/aprenda
    const nameToken = expect(TokenType.WORD, "Esperado nome do procedimento");
    const name = nameToken.value.toLowerCase();

    // Parse parameters :param1 :param2 ...
    const params: string[] = [];
    while (current().type === TokenType.VARIABLE) {
      params.push(advance().value);
    }

    // Register for recursive / forward calls in this parse
    procedures.set(name, params.length);

    // Parse body until end/fim
    const body: Statement[] = [];
    while (!atEnd()) {
      if (
        current().type === TokenType.WORD &&
        isEndKeyword(current().value)
      ) {
        advance(); // consume end/fim
        return {
          kind: "procedure_def",
          name,
          params,
          body,
          line: tok.line,
          col: tok.col,
        };
      }
      body.push(parseStatement());
    }

    throw new LogoError(
      "Procedimento sem 'end'/'fim'",
      tok.line,
      tok.col
    );
  }

  function parseMake(cmdToken: Token): Statement {
    const nameToken = current();
    let varName: string;
    if (nameToken.type === TokenType.STRING) {
      varName = advance().value;
    } else {
      throw new LogoError(
        'Esperado nome da variavel com " (ex: make "x 10)',
        nameToken.line,
        nameToken.col
      );
    }
    const value = parseExpression();
    return {
      kind: "make",
      varName,
      value,
      line: cmdToken.line,
      col: cmdToken.col,
    };
  }

  function parsePrint(cmdToken: Token): Statement {
    const value = parseExpression();
    return {
      kind: "print",
      value,
      line: cmdToken.line,
      col: cmdToken.col,
    };
  }

  // ---- Expression parsing (precedence climbing) ----
  // Low → high: comparison, additive, multiplicative, unary, primary

  function parseExpression(): Expression {
    return parseComparison();
  }

  function parseComparison(): Expression {
    let left = parseAdditive();
    while (isComparisonOp(current().type)) {
      const op = advance().value as BinaryOp["op"];
      const right = parseAdditive();
      left = { kind: "binary", op, left, right };
    }
    return left;
  }

  function parseAdditive(): Expression {
    let left = parseMultiplicative();
    while (
      current().type === TokenType.PLUS ||
      current().type === TokenType.MINUS
    ) {
      const op = advance().value as BinaryOp["op"];
      const right = parseMultiplicative();
      left = { kind: "binary", op, left, right };
    }
    return left;
  }

  function parseMultiplicative(): Expression {
    let left = parseUnary();
    while (
      current().type === TokenType.STAR ||
      current().type === TokenType.SLASH
    ) {
      const op = advance().value as BinaryOp["op"];
      const right = parseUnary();
      left = { kind: "binary", op, left, right };
    }
    return left;
  }

  function parseUnary(): Expression {
    if (current().type === TokenType.MINUS) {
      advance();
      const operand = parseUnary();
      return { kind: "unary_minus", operand };
    }
    return parsePrimary();
  }

  function parsePrimary(): Expression {
    const tok = current();

    // Number
    if (tok.type === TokenType.NUMBER) {
      advance();
      return { kind: "number", value: parseFloat(tok.value) };
    }

    // Variable :name
    if (tok.type === TokenType.VARIABLE) {
      advance();
      return { kind: "variable", name: tok.value };
    }

    // String "text
    if (tok.type === TokenType.STRING) {
      advance();
      return { kind: "string", value: tok.value };
    }

    // Parenthesized expression
    if (tok.type === TokenType.LPAREN) {
      advance(); // (
      const expr = parseExpression();
      expect(TokenType.RPAREN, "Esperado ')'");
      return expr;
    }

    // Reporter function call (e.g. sum, random, sqrt)
    if (tok.type === TokenType.WORD) {
      const cmd = lookupCommand(tok.value);
      if (cmd && cmd.type === "reporter") {
        advance();
        const args: Expression[] = [];
        for (let i = 0; i < cmd.arity; i++) {
          args.push(parseExpression());
        }
        return { kind: "call", name: cmd.canonicalName, args };
      }
    }

    throw new LogoError(
      `Esperado um valor (numero, variavel ou expressao), encontrado '${tok.value || tok.type}'`,
      tok.line,
      tok.col
    );
  }

  function isComparisonOp(type: TokenType): boolean {
    return (
      type === TokenType.LT ||
      type === TokenType.GT ||
      type === TokenType.EQ ||
      type === TokenType.NEQ ||
      type === TokenType.LTE ||
      type === TokenType.GTE
    );
  }

  return parseProgram();
}
