# GalloGo - Instrucoes para Claude Code

## Sobre o Projeto

GalloGo e uma plataforma web educacional que ensina criancas a programar usando Logo (turtle graphics). A interface simula um CLI dividido em 3 paineis: Instrucoes, CLI e Canvas. Suporta 3 faixas etarias (6-8, 8-12, 10-14) com interface adaptativa e gamificacao completa.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack) com TypeScript
- **Estilizacao**: Tailwind CSS v4 com CSS variables para temas por faixa etaria
- **Banco de dados**: PostgreSQL 16 (Docker) com Prisma v5 ORM
- **Autenticacao**: Auth.js (NextAuth v5 beta) com Credentials provider + OAuth (Google, Microsoft)
- **Estado client-side**: Zustand
- **Testes**: Jest + ts-jest
- **Deploy**: Vercel

## Estrutura do Projeto

```text
src/
├── app/              # Rotas Next.js App Router
│   ├── (auth)/       # Login, registro
│   ├── (app)/        # Rotas protegidas (playground, lessons, challenges, profile, leaderboard, gallery)
│   └── api/          # API routes (auth, progress, drawings, leaderboard)
├── components/       # Componentes React
│   ├── ui/           # Primitivos (Button, Card, Badge, Modal, ProgressBar)
│   ├── layout/       # ThreePanelLayout, Header, PanelResizer
│   ├── cli/          # CliPanel, CliInput, CliOutput, SyntaxHighlighter, AutoComplete
│   ├── canvas/       # CanvasPanel, TurtleCanvas, CanvasToolbar
│   ├── instructions/ # InstructionsPanel, LessonContent, ChallengePrompt
│   ├── gamification/ # PointsDisplay, BadgeGrid, AchievementToast, LeaderboardTable, GamificationLoader
│   └── auth/         # LoginForm, RegisterForm, AgeGroupSelector
├── logo/             # Interpretador Logo (TypeScript puro, zero deps UI)
│   ├── types.ts      # Tokens, AST nodes, TurtleState, DrawCommand
│   ├── lexer.ts      # Tokenizador
│   ├── parser.ts     # Gerador de AST
│   ├── interpreter.ts # Avaliador de AST -> DrawCommands
│   ├── commands.ts   # Comandos built-in (EN + PT aliases) + paleta de 16 cores
│   ├── errors.ts     # Erros kid-friendly com fuzzy matching (Levenshtein)
│   └── __tests__/    # 132 testes unitarios
├── hooks/            # React hooks customizados
│   ├── useLogoInterpreter.ts  # Conecta CLI ao interpretador e canvas
│   ├── useTurtleCanvas.ts     # Setup Canvas 2D com DPI scaling e animacao
│   ├── useCliHistory.ts       # Historico de comandos com localStorage
│   ├── useAutoComplete.ts     # Autocomplete de comandos/procedures/variaveis
│   └── useGamification.ts     # Hook que conecta UI ao store de gamificacao via API
├── stores/           # Zustand stores
│   ├── interpreter-store.ts   # Estado do interpretador (procedures, variaveis)
│   ├── canvas-store.ts        # zoom, pan, animationSpeed, drawCommands, turtleState
│   └── gamification-store.ts  # points, level, badges, streak, pendingAchievements
├── data/             # Conteudo estatico
│   ├── lessons/      # 5 modulos (module1-5.ts) + index.ts com helpers
│   ├── badges.ts     # 21 badges em 4 categorias
│   ├── levels.ts     # 10 niveis (0 a 10.000 pts)
│   └── modules.ts    # Metadata dos 5 modulos
├── services/         # Logica de negocio
│   ├── challenge-validator.ts # Validacao por comandos, drawing, estado
│   └── progress-service.ts    # Save/load progresso
├── theme/            # Sistema de temas adaptativos
│   ├── ThemeProvider.tsx       # Context que seta data-age-group no HTML
│   └── age-themes.ts          # Configs: fonte, turtleSize, animSpeed, darkMode
├── media/            # Assets estaticos
│   └── avatar/       # gallo-logo.png, gallo-mascot.png, gallo-explorer.png, gallo-adventurer.png, gallo-hacker.png, gallo-icon.png
├── lib/              # Utilitarios (db.ts, auth.ts, utils.ts)
└── types/            # Tipos TypeScript compartilhados (user, lesson, challenge, gamification, drawing)
```

## Convencoes de Codigo

### Geral

- Idioma do codigo: **ingles** (nomes de variaveis, funcoes, componentes)
- Idioma do conteudo usuario: **portugues brasileiro** (UI text, licoes, erros, badges)
- Importacoes com alias `@/` mapeado para `./src/*`
- Componentes client-side devem ter `'use client'` no topo
- Usar `cn()` de `@/lib/utils` para classes condicionais (clsx + tailwind-merge)

### Componentes

- Um componente por arquivo
- Props interfaces definidas no mesmo arquivo
- Componentes UI primitivos em `src/components/ui/`
- Componentes de feature em subdiretorios tematicos

### Interpretador Logo (`src/logo/`)

- **Zero dependencias de UI** — logica pura TypeScript
- Pipeline: input string -> Lexer (tokens) -> Parser (AST) -> Interpreter (DrawCommands)
- Todos os comandos suportam aliases em ingles E portugues
- Limite de 10.000 passos contra loops infinitos
- Erros devem incluir linha/coluna e sugestoes via fuzzy matching
- Testes: 132 testes em `src/logo/__tests__/`

### Comandos Logo — Aliases

Todo o conteudo das licoes (code, hints, examples) usa aliases em **portugues**:

- Movimento: `pf` (forward), `pt` (back), `vd` (right), `ve` (left)
- Caneta: `sc` (penup), `uc` (pendown), `tc` (setpensize), `mudecor` (setpencolor)
- Tartaruga: `et` (hideturtle), `mt` (showturtle), `casa` (home), `limpe` (clearscreen)
- Posicao: `mudexy` (setxy), `muded` (setheading)
- Programacao: `repita` (repeat), `faca` (make), `escreva` (print), `aprenda/fim` (to/end), `se` (if), `sesenao` (ifelse), `pare` (stop)
- Matematica: `aleatorio` (random), `raizq` (sqrt), `potencia` (power), `absoluto` (abs), `arredonde` (round), `resto` (remainder), `divisao` (quotient), `contagemrepita` (repcount)

**IMPORTANTE**: Os objetos `validation` das licoes usam os nomes canonicos em **ingles** (ex: `commands: ["repeat"]`, nao `["repita"]`), pois o validador resolve aliases internamente.

### Temas por Faixa Etaria

- Temas sao controlados via atributo `data-age-group` no `<html>`
- 3 temas: `6-8` (Explorador), `8-12` (Aventureiro), `10-14` (Hacker)
- CSS variables em `globals.css` definem cores, radius, font-size por tema
- Componentes adaptam visual/comportamento lendo o tema atual via `useTheme()`
- `6-8`: cores vibrantes, radius grande, fonte 1.25rem, ilustracoes, animacao lenta
- `8-12`: teal/purple/orange, radius medio, fonte 1rem, game-like
- `10-14`: terminal green/cyan/magenta, dark mode, monospace, radius pequeno, animacao rapida

### Banco de Dados

- Prisma v5 como ORM, schema em `prisma/schema.prisma`
- Singleton do client em `src/lib/db.ts`
- PostgreSQL via Docker Compose (porta 5433)
- Models: User, Account, Session, UserProgress, UserPoints, UserBadge, Drawing
- Enum `AgeGroup`: AGE_6_8, AGE_8_12, AGE_10_14

### Gamificacao

- **Store**: `gamification-store.ts` (Zustand) — points, level, badges, streak, achievements queue
- **Loader**: `GamificationLoader.tsx` — componente invisivel em Providers que hidrata o store via GET /api/progress
- **Hook**: `useGamification.ts` — fornece `recordProgress()` para registrar completude de licoes/desafios
- **Fluxo**: InstructionsPanel chama `recordProgress()` -> POST /api/progress -> store.addPoints() -> PointsDisplay re-renderiza -> AchievementToast exibe
- **API**: GET/POST `/api/progress` — leitura de stats e registro de completude com award de pontos, badges, streaks
- 10 niveis (0 a 10.000 pts), 21 badges, streak diario

### Testes

- Testes do interpretador Logo: `src/logo/__tests__/` (132 testes)
- Rodar: `npm test`
- Rodar especificos: `npm test -- --testPathPattern=logo`

## Comandos Uteis

```bash
npm run dev          # Servidor de desenvolvimento (Turbopack)
npm run build        # Build de producao
npm run lint         # Linting (ESLint)
npm test             # Rodar testes (Jest)
npx prisma studio    # UI do banco de dados
npx prisma db push   # Sync schema com banco
npx prisma generate  # Regenerar client
npx prisma db seed   # Popular banco com dados iniciais
npx tsc --noEmit     # Type-check sem emitir
```

## Decisoes Arquiteturais

1. **CLI custom vs xterm.js**: CLI customizado para controle total de estilizacao por idade, bundle menor, e porque Logo e line-based
2. **HTML5 Canvas vs SVG**: Canvas para performance com muitas linhas e animacao suave da tartaruga
3. **Zustand vs Context**: Zustand para estado complexo (interpretador, canvas, gamificacao) que precisa de performance
4. **Licoes em TypeScript**: Conteudo estatico em `.ts` por modulo, nao no banco — facilita versionamento e tipagem forte
5. **Auth com Credentials**: Simplicidade para MVP, publico infantil, sem dependencia exclusiva de OAuth
6. **Aliases PT nos dados de licoes**: Todo conteudo educacional (code, hints, examples) usa comandos em portugues; apenas `validation.commands` usa ingles canonico

## APIs

- `GET /api/progress` — Stats do usuario (totalPoints, level, streak, badges, completedCount)
- `POST /api/progress` — Registrar completude (lessonId, challengeId?, code?, points) — retorna isFirstCompletion, totalPoints, level, newBadges
- `GET/POST /api/drawings` — Galeria de desenhos
- `GET /api/leaderboard` — Ranking por pontos

## Observacoes Importantes

- **Publico infantil**: Todo texto voltado ao usuario deve ser em portugues, amigavel, e adaptado a faixa etaria
- **Animacao da tartaruga e essencial**: A tartaruga deve se mover visivelmente no canvas — isso e o core do valor educacional
- **Seguranca**: Nunca commitar `.env`, credenciais, ou secrets. Usar `.env.example` como referencia
- **Performance**: O interpretador Logo roda no client-side. Manter rapido com limite de passos e otimizacao do Canvas rendering
- **Roadmap**: Ver `ROADMAP.md` para o plano completo em 9 fases. Fases 1-8 concluidas, Fase 9 (Polish/Deploy) em andamento.
