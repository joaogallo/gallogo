# GalloGo — Aprenda a Programar com Logo!

Plataforma web educacional onde criancas aprendem a programar controlando uma tartaruga que desenha na tela, usando a linguagem Logo — em portugues!

Inspirado na filosofia de Seymour Papert: **criancas aprendem melhor construindo**.

## Screenshots

A interface se adapta automaticamente a faixa etaria escolhida:

| Explorador (6-8) | Aventureiro (8-10) | Hacker (10-14) |
|---|---|---|
| Cores vibrantes, elementos grandes | Visual equilibrado, estetica game | Tema escuro, estetica terminal |

## Funcionalidades

- **Terminal Interativo** — Digite comandos e veja a tartaruga executar em tempo real. Historico, autocomplete e syntax highlighting inclusos.
- **Licoes Guiadas** — 5 modulos com mais de 25 licoes progressivas, desde os primeiros passos ate fractais e recursao.
- **Canvas Animado** — Veja seus desenhos ganharem vida com animacoes suaves. Exporte como PNG e compartilhe na galeria.
- **100% em Portugues** — Todos os comandos funcionam em portugues: `pf`, `vd`, `repita`, `aprenda`, `faça` e muito mais. Aceita formas acentuadas e sem acento.
- **Gamificacao** — Ganhe pontos, suba de nivel, conquiste badges e dispute o ranking com outros programadores. Progresso salvo automaticamente.
- **Adaptativo por Idade** — Escolha seu perfil (Explorador, Aventureiro ou Hacker) no modal de boas-vindas. A interface se adapta automaticamente: cores, tamanhos e complexidade mudam conforme a faixa etaria.

## Tech Stack

| Tecnologia | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework (App Router + Turbopack) |
| [TypeScript](https://www.typescriptlang.org/) | Linguagem |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilizacao com CSS variables para temas |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados |
| [Prisma v5](https://www.prisma.io/) | ORM |
| [Auth.js v5](https://authjs.dev/) | Autenticacao (Credentials + OAuth) |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado client-side |
| [Jest](https://jestjs.io/) | Testes |

## Primeiros Passos

### Pre-requisitos

- Node.js 18+
- PostgreSQL (ou Docker)

### Instalacao

```bash
# Clonar repositorio
git clone https://github.com/joaogallo/gallogo.git
cd gallogo

# Instalar dependencias
npm install

# Configurar variaveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Subir banco de dados (Docker)
docker compose up -d

# Criar tabelas
npx prisma db push

# Popular banco com dados iniciais (opcional)
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variaveis de Ambiente

| Variavel | Descricao |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `AUTH_SECRET` | Secret para Auth.js (`openssl rand -hex 32`) |
| `NEXTAUTH_URL` | URL base da aplicacao |
| `GOOGLE_CLIENT_ID` | OAuth Google (opcional) |
| `GOOGLE_CLIENT_SECRET` | OAuth Google (opcional) |
| `MICROSOFT_CLIENT_ID` | OAuth Microsoft (opcional) |
| `MICROSOFT_CLIENT_SECRET` | OAuth Microsoft (opcional) |
| `MICROSOFT_ISSUER` | Issuer URL Microsoft (opcional) |

## Estrutura do Projeto

```
src/
├── app/              # Rotas Next.js (App Router)
│   ├── (auth)/       # Login, registro
│   ├── (app)/        # Rotas protegidas (playground, lessons, challenges, profile, leaderboard, gallery)
│   └── api/          # API routes (auth, progress, drawings, leaderboard)
├── components/       # Componentes React
│   ├── ui/           # Primitivos (Button, Card, Badge, Modal, ProgressBar, AgeGroupModal, AgeGroupPicker)
│   ├── layout/       # ThreePanelLayout, Header, PanelResizer
│   ├── cli/          # CliPanel, CliInput, CliOutput, SyntaxHighlighter, AutoComplete
│   ├── canvas/       # CanvasPanel, TurtleCanvas, CanvasToolbar
│   ├── instructions/ # InstructionsPanel, LessonContent, ChallengePrompt
│   ├── gamification/ # PointsDisplay, BadgeGrid, AchievementToast, LeaderboardTable, GamificationLoader
│   └── auth/         # LoginForm, RegisterForm, AgeGroupSelector
├── logo/             # Interpretador Logo (TypeScript puro, zero deps UI)
│   ├── lexer.ts      # Tokenizador
│   ├── parser.ts     # Gerador de AST
│   ├── interpreter.ts # Avaliador AST -> DrawCommands
│   ├── commands.ts   # Comandos built-in (EN + PT aliases)
│   └── errors.ts     # Erros kid-friendly com fuzzy matching
├── hooks/            # React hooks customizados
├── stores/           # Zustand stores (interpreter, canvas, gamification)
├── data/             # Conteudo estatico (lessons, challenges, badges, levels)
├── services/         # Logica de negocio (progress, validation, drawing)
├── theme/            # ThemeProvider, configs de tema por idade
├── lib/              # Utilitarios (db.ts, auth.ts, utils.ts)
└── types/            # Tipos TypeScript compartilhados
```

## Interpretador Logo

O interpretador e 100% TypeScript, sem dependencias de UI, com suporte a Unicode (caracteres acentuados), e pipeline:

```
Input string -> Lexer (tokens) -> Parser (AST) -> Interpreter (DrawCommands)
```

### Comandos Suportados

#### Movimento
| Comando | Alias PT | Descricao |
|---|---|---|
| `forward N` / `fd N` | `pf N` / `parafrente N` | Mover para frente N passos |
| `back N` / `bk N` | `pt N` / `paratrás N` | Mover para tras N passos |
| `right [N]` / `rt [N]` | `vd [N]` / `paradireita [N]` | Girar N graus a direita (default 90°) |
| `left [N]` / `lt [N]` | `ve [N]` / `paraesquerda [N]` | Girar N graus a esquerda (default 90°) |

#### Caneta
| Comando | Alias PT | Descricao |
|---|---|---|
| `penup` / `pu` | `sc` / `semcaneta` | Levantar caneta (nao desenha) |
| `pendown` | `uc` / `usecaneta` | Abaixar caneta (desenha) |
| `setpencolor N` / `setpc N` | `mudecor N` | Mudar cor da caneta (0-15) |
| `setpensize N` / `setps N` | `tc N` / `tamanhocaneta N` | Mudar espessura |

#### Tartaruga
| Comando | Alias PT | Descricao |
|---|---|---|
| `home` | `casa` / `centro` / `início` | Voltar ao centro |
| `clearscreen` / `cs` | `limpe` / `limpetela` | Limpar tela |
| `hideturtle` / `ht` | `et` / `escondatartaruga` | Esconder tartaruga |
| `showturtle` / `st` | `mt` / `apareça` / `mostretartaruga` | Mostrar tartaruga |
| `setxy X Y` | `mudexy X Y` / `mudeposição X Y` | Ir para coordenadas (X, Y) |
| `setheading N` / `seth N` | `muded N` / `mudedireção N` / `mudeângulo N` | Apontar para direcao N |

#### Programacao
| Comando | Alias PT | Descricao |
|---|---|---|
| `repeat N [cmds]` | `repita N [cmds]` | Repetir N vezes |
| `make "nome valor` | `faça "nome valor` | Criar/alterar variavel |
| `print valor` | `escreva valor` | Mostrar valor no terminal |
| `to nome :param ... end` | `aprenda nome :param ... fim` | Definir procedure |
| `if cond [cmds]` | `se cond [cmds]` | Condicional |
| `ifelse cond [v] [f]` | `sesenão cond [v] [f]` | Condicional com else |
| `stop` | `pare` | Sair do procedure |

#### Matematica
| Comando | Alias PT | Descricao |
|---|---|---|
| `random N` | `aleatório N` | Numero aleatorio 0 a N-1 |
| `sqrt N` | `raizq N` | Raiz quadrada |
| `power B E` | `potência B E` | Potencia |
| `abs N` | `absoluto N` | Valor absoluto |
| `round N` | `arredonde N` | Arredondar |
| `remainder A B` | `resto A B` / `módulo A B` | Resto da divisao |
| `repcount` | `contagemrepita` | Contador do repeat atual |
| `difference A B` | `diferença A B` | Diferenca |
| `quotient A B` | `divisão A B` | Quociente |

> **Nota**: Todos os aliases PT aceitam tanto a forma acentuada quanto sem acento (ex: `faça`/`faca`, `aleatório`/`aleatorio`, `potência`/`potencia`, `sesenão`/`sesenao`).

### Paleta de Cores (0-15)

| # | Cor | # | Cor | # | Cor | # | Cor |
|---|---|---|---|---|---|---|---|
| 0 | Preto | 4 | Vermelho | 8 | Marrom | 12 | Salmao |
| 1 | Azul | 5 | Magenta | 9 | Bege | 13 | Roxo |
| 2 | Verde | 6 | Amarelo | 10 | Floresta | 14 | Laranja |
| 3 | Ciano | 7 | Branco | 11 | Agua | 15 | Cinza |

## Gamificacao

### 10 Niveis

| Nivel | Nome | Pontos |
|---|---|---|
| 1 | Tartaruga Iniciante | 0 |
| 2 | Explorador | 100 |
| 3 | Artista | 300 |
| 4 | Programador | 600 |
| 5 | Mestre | 1.000 |
| 6 | Ninja | 1.500 |
| 7 | Lendario | 2.500 |
| 8 | Mestre Logo | 4.000 |
| 9 | Guru | 6.000 |
| 10 | Arquiteto Digital | 10.000 |

### 21 Badges

- **Marcos**: Primeiro Passo, Mestre do Quadrado, Triangulo, Circulo, Procedure Pro, Mago da Recursao, Guru das Variaveis, Colorido
- **Streaks**: 3 dias, 7 dias, 30 dias
- **Completude**: Basico Completo, Artista Digital, Cacador de Desafios
- **Diversao**: Coruja Noturna, Velocista

### Pontuacao

- Licao completa: 20-50 pts (varia por licao)
- Desafio facil/medio/dificil: 15-50 pts
- Bonus streak diario: +10 pts
- Primeira completude: bonus extra

## Curriculo

| Modulo | Titulo | Licoes | Faixa Etaria Min |
|---|---|---|---|
| 1 | Primeiros Passos com a Tartaruga | 7 | 6-8 |
| 2 | Alem do Basico — Liberando a Criatividade | 5 | 6-8 |
| 3 | Referencia e Aprofundamento | 7 | 8-10 |
| 4 | Pedagogia e Projetos | 5 | 6-8 |
| 5 | Revisao e Projetos Finais | 3 | 6-8 |

## Banco de Dados

Modelos Prisma: User, Account, Session, UserProgress, UserPoints, UserBadge, Drawing.

```bash
npx prisma studio    # UI visual do banco
npx prisma db push   # Sincronizar schema
npx prisma generate  # Regenerar client
```

## Scripts

```bash
npm run dev          # Servidor de desenvolvimento (Turbopack)
npm run build        # Build de producao
npm run start        # Servidor de producao
npm run lint         # Linting (ESLint)
npm test             # Rodar testes (Jest)
```

## Deploy

O projeto esta configurado para deploy na [Vercel](https://vercel.com):

```bash
npm run build        # Verificar que o build passa
vercel               # Deploy preview
vercel --prod        # Deploy producao
```

## Licenca

Projeto educacional. Todos os direitos reservados.
