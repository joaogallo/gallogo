# GalloGo - Instrucoes para Claude Code

## Sobre o Projeto

GalloGo e uma plataforma web educacional que ensina criancas a programar usando Logo (turtle graphics). A interface simula um CLI dividido em 3 paineis: Instrucoes, CLI e Canvas. Suporta 3 faixas etarias (6-8, 8-12, 10-14) com interface adaptativa e gamificacao completa.

## Tech Stack

- **Framework**: Next.js 16 (App Router) com TypeScript
- **Estilizacao**: Tailwind CSS v4 com CSS variables para temas por faixa etaria
- **Banco de dados**: PostgreSQL 16 (Docker) com Prisma v5 ORM
- **Autenticacao**: Auth.js (NextAuth v5 beta) com Credentials provider
- **Estado client-side**: Zustand
- **Testes**: Jest + Testing Library
- **i18n**: next-intl (pt-BR primario, en secundario)
- **Deploy**: Vercel

## Estrutura do Projeto

```
src/
├── app/           # Rotas Next.js App Router
│   ├── (auth)/    # Login, registro
│   ├── (app)/     # Rotas protegidas (playground, lessons, challenges, profile, leaderboard, gallery)
│   └── api/       # API routes (auth, progress, drawings, leaderboard)
├── components/    # Componentes React
│   ├── ui/        # Primitivos (Button, Card, Badge, Modal, ProgressBar)
│   ├── layout/    # ThreePanelLayout, Header, Sidebar, PanelResizer
│   ├── cli/       # CliPanel, CliInput, CliOutput, SyntaxHighlighter, AutoComplete
│   ├── canvas/    # CanvasPanel, TurtleCanvas, CanvasToolbar, DrawingExport
│   ├── instructions/ # InstructionsPanel, LessonContent, ChallengePrompt, HintSystem
│   ├── gamification/ # PointsDisplay, BadgeGrid, LevelIndicator, AchievementToast
│   └── auth/      # LoginForm, RegisterForm, AgeGroupSelector
├── logo/          # Interpretador Logo (TypeScript puro, zero deps UI)
│   ├── types.ts   # Tokens, AST nodes, TurtleState, DrawCommand
│   ├── lexer.ts   # Tokenizador
│   ├── parser.ts  # Gerador de AST
│   ├── interpreter.ts # Avaliador de AST -> DrawCommands
│   ├── commands.ts    # Comandos built-in (EN + PT aliases)
│   └── errors.ts      # Erros kid-friendly com fuzzy matching
├── hooks/         # React hooks customizados
├── stores/        # Zustand stores (interpreter, canvas, gamification)
├── data/          # Conteudo estatico (lessons, challenges, badges, levels)
├── services/      # Logica de negocio (progress, gamification, validation, drawing)
├── theme/         # ThemeProvider, configs de tema por idade
├── lib/           # Utilitarios (db.ts, auth.ts, utils.ts)
├── i18n/          # Internacionalizacao
└── types/         # Tipos TypeScript compartilhados
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

### Temas por Faixa Etaria
- Temas sao controlados via atributo `data-age-group` no `<html>`
- 3 temas: `6-8` (Explorador), `8-12` (Aventureiro), `10-14` (Hacker)
- CSS variables em `globals.css` definem cores, radius, font-size por tema
- Componentes adaptam visual/comportamento lendo o tema atual via `useAgeTheme()`

### Banco de Dados
- Prisma v5 como ORM, schema em `prisma/schema.prisma`
- Singleton do client em `src/lib/db.ts`, importar de `@prisma/client`
- PostgreSQL via Docker Compose (`docker compose up -d`, porta 5433)
- Enum `AgeGroup`: AGE_6_8, AGE_8_12, AGE_10_14

### Testes
- Testes do interpretador Logo sao prioritarios: `src/logo/__tests__/`
- Rodar com: `npm test`
- Rodar especificos: `npm test -- --testPathPattern=logo`

## Comandos Uteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de producao
npm run lint         # Linting
npm test             # Rodar testes
npx prisma studio    # UI do banco de dados
npx prisma db push   # Sync schema com banco
npx prisma generate  # Regenerar client
npx prisma db seed   # Popular banco com dados iniciais
```

## Decisoes Arquiteturais

1. **CLI custom vs xterm.js**: CLI customizado para controle total de estilizacao por idade, bundle menor, e porque Logo e line-based
2. **HTML5 Canvas vs SVG**: Canvas para performance com muitas linhas e animacao suave da tartaruga
3. **Zustand vs Context**: Zustand para estado complexo (interpretador, canvas, gamificacao) que precisa de performance
4. **Licoes em JSON**: Conteudo estatico em JSON files por faixa etaria, nao no banco — facilita versionamento e nao precisa de CMS
5. **Auth com Credentials**: Simplicidade para MVP, publico infantil, sem dependencia de OAuth providers

## Roadmap

Ver `ROADMAP.md` para o plano completo de desenvolvimento em 9 fases.

## Observacoes Importantes

- **Publico infantil**: Todo texto voltado ao usuario deve ser em portugues, amigavel, e adaptado a faixa etaria
- **Animacao da tartaruga e essencial**: A tartaruga deve se mover visivelmente no canvas — isso e o core do valor educacional
- **Seguranca**: Nunca commitar `.env`, credenciais, ou secrets. Usar `.env.example` como referencia
- **Performance**: O interpretador Logo roda no client-side. Manter rapido com limite de passos e otimizacao do Canvas rendering
