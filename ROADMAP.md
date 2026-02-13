# GalloGo - Roadmap Completo

## Contexto

GalloGo e uma plataforma web educacional que simula um CLI para ensinar criancas a programar usando a linguagem Logo (turtle graphics). A tela e dividida em 3 paineis: Instrucoes/Desafios, CLI e Canvas de saida. O app adapta a interface conforme a faixa etaria escolhida no cadastro (6-8, 8-12, 10-14 anos) e inclui gamificacao completa.

**Tech Stack**: Next.js 16 (App Router + Turbopack) + TypeScript + Tailwind CSS v4 + PostgreSQL + Prisma 5 + Auth.js + Zustand

---

## Estrutura de Diretorios

```
gallogo/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── images/badges/
│   ├── images/turtle/
│   └── sounds/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                      # Landing page
│   │   ├── globals.css                   # Temas por faixa etaria (CSS vars)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (app)/
│   │   │   ├── layout.tsx                # App shell (header, nav)
│   │   │   ├── playground/page.tsx       # Workspace 3 paineis
│   │   │   ├── lessons/page.tsx
│   │   │   ├── lessons/[lessonId]/page.tsx
│   │   │   ├── challenges/page.tsx
│   │   │   ├── challenges/[challengeId]/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── leaderboard/page.tsx
│   │   │   └── gallery/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── progress/route.ts
│   │       ├── drawings/route.ts
│   │       └── leaderboard/route.ts
│   ├── components/
│   │   ├── ui/          (Button, Card, Badge, Modal, ProgressBar, Avatar)
│   │   ├── layout/      (Header, Sidebar, ThreePanelLayout, PanelResizer)
│   │   ├── cli/         (CliPanel, CliInput, CliOutput, SyntaxHighlighter, AutoComplete)
│   │   ├── canvas/      (CanvasPanel, TurtleCanvas, CanvasToolbar, DrawingExport)
│   │   ├── instructions/(InstructionsPanel, LessonContent, ChallengePrompt, HintSystem)
│   │   ├── gamification/(PointsDisplay, BadgeGrid, LevelIndicator, AchievementToast, LeaderboardTable)
│   │   └── auth/        (LoginForm, RegisterForm, AgeGroupSelector)
│   ├── logo/            # Interpretador Logo (puro TS, sem deps UI)
│   │   ├── types.ts
│   │   ├── lexer.ts
│   │   ├── parser.ts
│   │   ├── interpreter.ts
│   │   ├── commands.ts
│   │   ├── errors.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   ├── hooks/
│   │   ├── useLogoInterpreter.ts
│   │   ├── useTurtleCanvas.ts
│   │   ├── useCliHistory.ts
│   │   ├── useAutoComplete.ts
│   │   ├── useAgeTheme.ts
│   │   ├── useProgress.ts
│   │   ├── useGamification.ts
│   │   └── useSoundEffects.ts
│   ├── stores/          (canvas-store, gamification-store)
│   ├── data/
│   │   ├── lessons/     (age-6-8/, age-8-12/, age-10-14/ — JSON)
│   │   ├── challenges/  (age-6-8/, age-8-12/, age-10-14/ — JSON)
│   │   ├── badges.ts
│   │   └── levels.ts
│   ├── services/        (progress, gamification, challenge-validator, drawing)
│   ├── theme/           (ThemeProvider, age-themes.ts)
│   ├── lib/             (db.ts, auth.ts, utils.ts)
│   ├── i18n/            (config.ts, dictionaries/)
│   └── types/           (user, lesson, challenge, gamification, drawing)
└── middleware.ts
```

---

## Fase 1: Setup e Fundacao ✅ CONCLUIDA

### 1.1 Inicializar projeto Next.js ✅
- Next.js 16 com TypeScript, Tailwind v4, App Router, Turbopack, src/, alias @/*

### 1.2 Instalar dependencias ✅
```
# Producao
prisma@5 @prisma/client@5 next-auth@beta @auth/prisma-adapter
zustand clsx tailwind-merge bcryptjs

# Dev
jest ts-jest @types/jest @types/bcryptjs
```

### 1.3 Configurar Tailwind com sistema de temas por idade ✅
- `globals.css` com `@theme inline` (Tailwind v4): CSS variables via `[data-age-group="6-8|8-12|10-14"]`
  - **6-8 "Explorador"**: cores vibrantes, border-radius grande (1rem), fonte 1.25rem
  - **8-12 "Aventureiro"**: teal/purple/orange, radius medio (0.5rem), fonte 1rem
  - **10-14 "Hacker"**: dark mode (#0f172a), terminal green/cyan/magenta, radius pequeno (0.25rem)

### 1.4 Schema do banco (Prisma 5 + PostgreSQL via Docker) ✅
- Docker Compose com PostgreSQL 16 (porta 5433)
- Models: User (com AgeGroup enum), Account, Session, UserProgress, UserPoints, UserBadge, Drawing
- Generator: `prisma-client-js`

### 1.5 Configuracoes base ✅
- `src/lib/db.ts` — Prisma client singleton
- `src/lib/auth.ts` — Auth.js com Credentials, JWT, ageGroup nos callbacks
- `src/lib/utils.ts` — Funcao `cn()` (clsx + tailwind-merge)
- `src/types/auth.d.ts` — Module augmentation para ageGroup na session
- `.env` — DATABASE_URL (porta 5433), AUTH_SECRET, NEXTAUTH_URL

---

## Fase 2: Layout Core e UI ✅ CONCLUIDA

### 2.1 Sistema de temas adaptativo ✅
- `src/theme/ThemeProvider.tsx` — Context provider que seta `data-age-group` no `<html>`
- `src/theme/age-themes.ts` — AgeTheme interface com fontFamily, turtleSize, animationSpeed, etc.

### 2.2 Root layout ✅
- `src/app/layout.tsx` — ThemeProvider wrapper, Nunito + JetBrains Mono (next/font), lang pt-BR

### 2.3 ThreePanelLayout ✅
- `src/components/layout/ThreePanelLayout.tsx` — 3 colunas resizaveis (desktop) com tabs (mobile)
- `src/components/layout/PanelResizer.tsx` — drag handles com pointer events no document
- Proporcoes adaptadas por idade: 6-8 = canvas 50%, 10-14 = CLI 45%
- MIN_PANEL_PCT = 15, clampSizes para limites

### 2.4 App Shell ✅
- `src/app/(app)/layout.tsx` — Header + area de conteudo flex
- `src/components/layout/Header.tsx` — Logo SVG, nav (Playground, Licoes, Desafios, Galeria), ThemeSwitcher

### 2.5 Componentes UI primitivos ✅
- `src/components/ui/Button.tsx` — primary/secondary/ghost, sm/md/lg
- `src/components/ui/Card.tsx` — borda, radius adaptativo, padding opcional
- `src/components/ui/ProgressBar.tsx` — animada com variantes de cor

### 2.6 Playground page ✅
- `src/app/(app)/playground/page.tsx` — Monta ThreePanelLayout com InstructionsPanel, CliPanel, CanvasPanel

---

## Fase 3: Interpretador Logo ✅ CONCLUIDA

132 testes unitarios passando.

### 3.1 Tipos (`src/logo/types.ts`) ✅
- `TokenType` enum: NUMBER, WORD, STRING, VARIABLE, LBRACKET, RBRACKET, LPAREN, RPAREN, operadores, EOF
- `Token`: type, value, line, col
- `Expression` union: NumberLiteral, StringLiteral, VariableRef, BinaryOp, UnaryMinus, FunctionCall
- `Statement` union: CommandStatement, RepeatStatement, IfStatement, IfElseStatement, ProcedureDef, MakeStatement, PrintStatement, StopStatement
- `TurtleState`: x, y, heading, penDown, penColor, penSize, visible
- `DrawCommand` union: LineCommand, MoveToCommand, ClearCommand, TurtleUpdateCommand, PrintOutput

### 3.2 Lexer (`src/logo/lexer.ts`) ✅
- Tokeniza: numeros (int/decimal), palavras, `:variavel`, `"string`, `[ ]`, `( )`, operadores `+ - * / < > = <> <= >=`
- Ignora: whitespace, `;` comentarios
- Tracking de linha/coluna para erros

### 3.3 Parser (`src/logo/parser.ts`) ✅
- Gera AST com precedencia de operadores (comparison < additive < multiplicative < unary < primary)
- Suporta: `repeat N [body]`, `to nome :param1 ... end`, `if cond [body]`, `ifelse cond [true] [false]`
- Recebe `knownProcedures` para suportar procedures de sessoes anteriores
- Registra procedures durante o parse para suportar recursao

### 3.4 Interpreter (`src/logo/interpreter.ts`) ✅
- Caminha o AST, mantem TurtleState mutavel, produz DrawCommand[]
- Escopo de variaveis (stack), `make` sempre no escopo global
- Registro de procedures, suporte a recursao com StopSignal
- `repcount` / `contagemrepita` dentro de repeats (stack)
- Limite de 10.000 passos contra loops infinitos
- Estado persistente entre execucoes (InterpreterState)

### 3.5 Comandos built-in (`src/logo/commands.ts`) ✅
| Categoria | EN | PT |
|-----------|-----|-----|
| **Movimento** | forward/fd, back/bk, right/rt, left/lt | parafrente/pf, paratras/pt, paradireita/pd, paraesquerda/pe |
| **Caneta** | penup/pu, pendown, setpencolor/setpc, setpensize/setps | usenada/un/levante, uselapis/ul, mudecl/mudecor/mudecordolapis, mudeel/mudeespessura |
| **Tartaruga** | home, clearscreen/cs, hideturtle/ht, showturtle/st, setxy, setheading/seth | paracentro/centro, limpe/limpetela, dt/escondetartaruga/desaparecatartaruga, mt/mostretartaruga/aparecatartaruga, mudexy/mudeposicao, mudedirecao/muded |
| **Controle** | repeat, if, ifelse, stop | repita, se, senao, pare |
| **Procedures** | to ... end | aprenda ... fim |
| **Variaveis** | make, print | faca/atribua, escreva/mostre/imprima |
| **Matematica** | sum, difference, product, quotient, remainder, random, sqrt, abs, minus, round, int, sin, cos, tan, power | soma, diferenca, produto, quociente, resto, aleatorio/sorteie, raizq/raizquadrada, valorabsoluto, negativo, arredonde, inteiro/parteinteira, seno, cosseno, tangente, potencia/elevado |
| **Especial** | repcount | contagemrepita |

Paleta de 16 cores Logo (0-15) com `resolveColor()`.

### 3.6 Erros kid-friendly (`src/logo/errors.ts`) ✅
- `LogoError` (parse) com line/col, `LogoRuntimeError` (execucao), `StopSignal`
- `formatError(error, ageGroup)` com mensagens adaptadas:
  - 6-8: "Oops! A tartaruga nao entendeu 'fdd'. Voce quis dizer 'fd'?"
  - 8-12: "'fdd' nao encontrado. Tente 'fd'."
  - 10-14: "Erro na linha 1:1: 'fdd' nao definido. Sugestao: 'fd'"
- Fuzzy matching via distancia de Levenshtein com `suggestCommand()`

### 3.7 Testes unitarios ✅
- `src/logo/__tests__/lexer.test.ts` — 13 testes: tokenizacao de todos os tipos, comments, multiline, erros
- `src/logo/__tests__/parser.test.ts` — 31 testes: comandos EN/PT, repeat, if/ifelse, procedures, make/print, expressoes, precedencia, reporters
- `src/logo/__tests__/interpreter.test.ts` — 88 testes: movimento, pen, turtle, repeat, if/ifelse, procedures, recursao, variaveis, print, math reporters PT, estado persistente, step limit, edge cases

### 3.8 API publica (`src/logo/index.ts`) ✅
- `execute(code, state?)` — pipeline completo: tokenize → parse → interpret
- `executeForAge(code, ageGroup, state?)` — igual mas com erros formatados por idade
- `createInterpreterState()` — estado persistente para modo interativo

---

## Integracao CLI ↔ Canvas ✅ CONCLUIDA (adiantamento das Fases 4-5)

Implementada a conexao funcional entre o terminal CLI e o canvas antes de completar as fases 4 e 5 formalmente.

### Canvas Store (`src/stores/canvas-store.ts`) ✅
- Zustand store com `drawCommands`, `turtle`, `addCommands()`, `reset()`
- Tratamento de `clear`: descarta comandos anteriores ao ultimo clear

### CliPanel integrado ao interpretador ✅
- `src/components/cli/CliPanel.tsx` — usa `execute()` do interpretador real
- Estado persistente via `useRef<InterpreterState>`
- Envia draw commands via `startAnimation()` para animacao progressiva
- Help text com comandos EN/PT
- Erros formatados por faixa etaria

### CanvasPanel com renderizacao real ✅
- `src/components/canvas/CanvasPanel.tsx` — Canvas HTML5 com DPI scaling
- Grid sutil + eixos centrais
- Renderiza LineCommands com cores e espessuras
- Tartaruga como triangulo (tamanho adaptado por tema) com rotacao
- ResizeObserver para redimensionamento responsivo
- Coordenadas Logo (origem centro, y-up) → canvas (y-down)

---

## Fase 4: Canvas / Turtle Graphics ✅ CONCLUIDA

### 4.1 Renderizacao com zoom e pan ✅
- Canvas 2D com DPI scaling e transformacao de coordenadas (origem centro, y-up)
- Zoom 25%-400% via scroll wheel e botoes da toolbar
- Pan via Alt+click ou middle-click drag
- Grid e eixos escalam corretamente com zoom
- Tartaruga como triangulo (tamanho adaptado por idade, capped em zoom alto)

### 4.2 Animacao progressiva ✅
- `requestAnimationFrame` loop com fila de comandos animaveis
- Tartaruga move visivelmente de comando em comando
- Velocidade ajustavel: Instant (0x), Lenta (0.5x), Normal (1x), Rapida (2x)
- Botao "pular" para finalizar animacao instantaneamente
- Durante animacao, renderiza apenas comandos ja processados

### 4.3 CanvasToolbar ✅
- `src/components/canvas/CanvasToolbar.tsx` — barra compacta com icones SVG inline
- Zoom +/- com display de percentual, reset de visualizacao (zoom + pan)
- Toggle de grade (liga/desliga grid e eixos)
- Ciclo de velocidade de animacao com indicador visual
- Botao de export PNG
- Botao "pular" visivel apenas durante animacao

### 4.4 Export de desenhos ✅
- Captura canvas como PNG via `toDataURL("image/png")`
- Download local automatico com nome `gallogo-{timestamp}.png`
- Canvas marcado com `data-canvas-export` para acesso pela toolbar

### 4.5 Canvas store completo ✅
- `src/stores/canvas-store.ts` — Zustand store expandido
- Estado: `zoom`, `panX`, `panY`, `showGrid`, `animationSpeed`, `isAnimating`
- Animacao: `animationQueue`, `animatedCommands`, `animatedTurtle`
- Actions de zoom: `setZoom`, `zoomIn`, `zoomOut`, `resetView` (range 0.25-4.0)
- Actions de animacao: `startAnimation`, `advanceAnimation`, `finishAnimation`
- Modo instant (speed=0) pula animacao completamente

---

## Fase 5: Emulador CLI ✅ CONCLUIDA

### 5.1 CliPanel completo ✅
- CLI custom com output scrollavel + input fixo (textarea auto-resize)
- Integrado ao interpretador Logo real com animacao progressiva
- Prompt adaptado por idade: `tartaruga>` (6-8), `logo>` (8-12), `gallogo>` (10-14)

### 5.2 CliOutput ✅
- Entries tipadas: input, output, error, system com cores distintas
- Inputs no historico exibidos com syntax highlighting
- `whitespace-pre-wrap` para preservar formatacao multiline

### 5.3 Syntax Highlighting ✅
- `src/components/cli/SyntaxHighlighter.tsx` — tokenizador proprio para colorir
- Comandos (primary), special forms (accent bold), numeros (accent-light)
- Variaveis `:nome` (primary-light), strings `"texto` (accent), brackets (bold)
- Operadores, comentarios (italic muted)
- Reconhece automaticamente comandos EN/PT e special forms via registro do interpretador

### 5.4 AutoComplete ✅
- `src/components/cli/AutoComplete.tsx` — dropdown posicionado acima do input
- Sugere comandos built-in, special forms, reporters, procedures do usuario e variaveis
- Filtragem por prefixo com limite de 8 sugestoes
- Tab para abrir/navegar, Enter para selecionar, Escape para fechar
- Shift+Tab navega para cima, click seleciona sem perder foco
- Mostra hint com assinatura dos argumentos e tipo com cor distinta

### 5.5 useCliHistory ✅
- `src/hooks/useCliHistory.ts` — historico com persistencia em localStorage
- Up/Down para navegar (apenas em modo single-line)
- Salva draft do input atual ao comecar a navegar
- Deduplica entradas consecutivas, limite de 100 comandos

### 5.6 Multiline (Shift+Enter) ✅
- Textarea com auto-resize (max 120px) para input multiline
- Shift+Enter insere nova linha, Enter submete
- Historico Up/Down desativado quando input contem `\n`

---

## Fase 6: Sistema de Licoes e Desafios (5-7 dias) — PENDENTE

### 6.1 Formato de dados (JSON)
```
Lesson: id, title, titlePtBr, description, ageGroup, order, category, content[], challenges[], prerequisites[], pointsReward
LessonStep: type (text|example|try-it|explanation), content (markdown), code?, expectedOutput?, illustration?
Challenge: id, title, description, difficulty (1-3), hints[], validation, pointsReward, badgeId?, timeLimit?
ChallengeValidation: type (exact-drawing|contains-commands|output-match|custom), expectedCommands?, expectedDrawing?, tolerance?, customValidator?
```

### 6.2 Curriculo Age 6-8 (10 licoes)
1. Conheca a Tartaruga — introducao visual, sem comandos
2. Primeiros Passos — comando `fd` apenas
3. Girando! — `rt` e `lt`
4. Desenhando um Quadrado — combinar fd + rt
5. A Magia do Repeat — introduzir `repeat`
6. Triangulos — `repeat 3 [fd 100 rt 120]`
7. Cores! — `setpencolor`
8. Desenhando uma Casa — combinar formas
9. Estrelas — padroes com repeat
10. Desenho Livre — exploracao

### 6.3 Curriculo Age 8-12
- Variaveis com `make`, procedures com `to/end`, repeats aninhados
- Padroes geometricos, espirais, uso de coordenadas (`setxy`), condicionais

### 6.4 Curriculo Age 10-14
- Recursao, procedures com parametros multiplos, funcoes matematicas
- Fractais: arvores, Koch snowflake, triangulo de Sierpinski
- Pensamento algoritmico e desafios de otimizacao

### 6.5 InstructionsPanel
- Alterna entre: modo licao, modo desafio, modo livre
- LessonContent, ChallengePrompt

### 6.6 Challenge Validator
- Validacao por comandos, drawing, estado da tartaruga, composta

### 6.7 Hint System
- Revelacao progressiva: 1o hint gratis, 2o custa pontos, 3o = quase-solucao

### 6.8 Paginas de licoes e desafios

---

## Fase 7: Sistema de Usuarios e Auth (3-4 dias) — PARCIALMENTE CONCLUIDA

> Auth.js configurado. Faltam paginas de login/registro, middleware e perfil.

### 7.1 Auth.js config ✅
- Credentials provider com bcrypt
- JWT strategy com ageGroup nos callbacks
- PrismaAdapter

### 7.2 Registro com selecao de faixa etaria — PENDENTE
### 7.3 Login — PENDENTE
### 7.4 Middleware — PENDENTE
### 7.5 Tema baseado na sessao — PENDENTE (ThemeProvider usa localStorage, falta sessao)
### 7.6 Pagina de perfil — PENDENTE

---

## Fase 8: Gamificacao (4-5 dias) — PENDENTE

### 8.1 Sistema de pontos
### 8.2 Sistema de niveis (10 niveis)
### 8.3 Badges (15+)
### 8.4 UI de gamificacao
### 8.5 Leaderboard
### 8.6 Persistencia de progresso
### 8.7 Gamification store (Zustand)

---

## Fase 9: Polish e Deploy (4-5 dias) — PENDENTE

### 9.1 Animacoes
### 9.2 Efeitos sonoros
### 9.3 Acessibilidade
### 9.4 Internacionalizacao (next-intl)
### 9.5 Landing page publica
### 9.6 Deploy (Vercel + Neon/Vercel Postgres)
### 9.7 SEO e Metadata

---

## Grafo de Dependencias entre Fases

```
Fase 1 (Setup) ✅ ──> Fase 2 (Layout/UI) ✅ ──> Fase 5 (CLI) ✅ ──> Fase 6 (Licoes)
     │                                                │                      │
     ├──────────> Fase 3 (Interpretador) ✅ ─────────┘                      v
     │                                                │             Fase 8 (Gamificacao)
     ├──────────> Fase 4 (Canvas) ✅ ───────────────┘                      │
     │                                                              Fase 9 (Polish)
     └──────────> Fase 7 (Auth) ~~ ────────────────────────────────────────┘

✅ = concluida   ~~ = parcialmente concluida
```

---

## Timeline Estimada

| Fase | Duracao | Status |
|------|---------|--------|
| 1. Setup e Fundacao | 2-3 dias | ✅ Concluida |
| 2. Layout Core e UI | 3-4 dias | ✅ Concluida |
| 3. Interpretador Logo | 5-7 dias | ✅ Concluida (132 testes) |
| 4. Canvas / Turtle Graphics | 3-4 dias | ✅ Concluida |
| 5. Emulador CLI | 3-4 dias | ✅ Concluida |
| 6. Licoes e Desafios | 5-7 dias | Pendente |
| 7. Auth e Usuarios | 3-4 dias | ~~ Auth.js config OK |
| 8. Gamificacao | 4-5 dias | Pendente |
| 9. Polish e Deploy | 4-5 dias | Pendente |

---

## Dependencias Instaladas

### Producao
| Pacote | Versao | Uso |
|--------|--------|-----|
| `next` | 16.1.6 | Framework (Turbopack) |
| `react`, `react-dom` | 19.x | UI |
| `typescript` | 5.x | Tipagem |
| `tailwindcss` | 4.x | Estilos (inline theme) |
| `prisma` | 5.x | CLI do banco |
| `@prisma/client` | 5.x | ORM |
| `next-auth@beta` | 5.x | Autenticacao |
| `@auth/prisma-adapter` | - | Adapter Auth.js |
| `bcryptjs` | - | Hash de senha |
| `zustand` | - | Estado client-side |
| `clsx` | - | Classnames condicionais |
| `tailwind-merge` | - | Merge de classes Tailwind |

### Desenvolvimento
| Pacote | Uso |
|--------|-----|
| `jest` | Test runner |
| `ts-jest` | Jest + TypeScript |
| `@types/jest` | Tipos Jest |
| `@types/bcryptjs` | Tipos bcrypt |

### A instalar (fases futuras)
| Pacote | Uso | Fase |
|--------|-----|------|
| `next-intl` | Internacionalizacao | 9 |
| `react-markdown` | Conteudo de licoes | 6 |
| `canvas-confetti` | Celebracoes | 8 |
| `@testing-library/react` | Testes React | 6+ |

---

## Verificacao (Criterios de Aceite por Fase)

1. **Fase 1** ✅: `npm run dev` sobe sem erros, `npx prisma db push` cria 7 tabelas
2. **Fase 2** ✅: Layout de 3 paineis com resize, temas alternam via `data-age-group`, build OK
3. **Fase 3** ✅: 132 testes passam (`npx jest`), `fd 100 rt 90` gera DrawCommands corretos, aliases PT funcionam
4. **Fase 4** ✅: Canvas com zoom/pan, animacao progressiva, toolbar completa, export PNG
5. **Fase 5** ✅: CLI completo com syntax highlighting, autocomplete, historico Up/Down, multiline
6. **Fase 6**: Licao carrega no painel de instrucoes, desafio valida corretamente, hints funcionam
7. **Fase 7** ~~: Auth.js configurado com JWT + ageGroup. **Falta**: paginas login/registro, middleware
8. **Fase 8**: Pontos incrementam, badges aparecem, toast de achievement dispara, leaderboard carrega
9. **Fase 9**: `npm run build` sem erros, deploy na Vercel funciona, Lighthouse score > 90

---

## Notas Tecnicas

- **Prisma 5** usado ao inves de v7 (API do v7 incompativel com Turbopack/build atual)
- **PostgreSQL via Docker** em porta 5433 (5432 ocupada no host)
- **Tailwind v4** usa `@theme inline` ao inves de `tailwind.config.ts` para mapear CSS vars
- **Jest** configurado com `ts-jest` e path alias `@/*` via `moduleNameMapper`
