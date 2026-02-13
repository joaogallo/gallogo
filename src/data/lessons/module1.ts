import type { Lesson } from "@/types/curriculum";

/** Modulo 1: Primeiros Passos com a Tartaruga Logo (7 licoes) */
export const MODULE_1_LESSONS: Lesson[] = [
  {
    id: "1.1",
    moduleId: 1,
    order: 1,
    title: "Bem-vindo ao Mundo Logo!",
    description:
      "Apresentacao do ambiente e do conceito da tartaruga como agente programavel.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Bem-vindo ao GalloGo! Aqui voce vai aprender a programar controlando uma tartaruga que desenha na tela.",
      },
      {
        type: "text",
        content:
          "O que e programar? E dar instrucoes precisas para o computador seguir. No Logo, voce da instrucoes para uma tartaruga que se move e desenha!",
      },
      {
        type: "text",
        content:
          "Logo foi criada nos anos 1960 por Seymour Papert para ensinar criancas a programar. A ideia e simples: imagine que VOCE e a tartaruga.",
      },
      {
        type: "tip",
        content:
          "Olhe para os 3 paineis da tela: Instrucoes (aqui!), Terminal (onde voce digita comandos) e Canvas (onde a tartaruga desenha).",
      },
      {
        type: "text",
        content:
          "A tartaruga comeca no centro da tela, na posicao (0, 0), olhando para cima. Ela tem uma caneta que desenha por onde passa.",
      },
      {
        type: "text",
        content:
          "No Terminal, voce digita comandos e a tartaruga obedece. Vamos comecar na proxima licao!",
      },
    ],
    challenges: [
      {
        id: "1.1.1",
        title: "Explorador",
        description:
          "Digite 'ajuda' no terminal para ver os comandos disponiveis.",
        difficulty: 1,
        hints: ["Digite a palavra 'ajuda' e pressione Enter."],
        validation: { type: "contains-commands", commands: ["help"] },
        points: 10,
      },
    ],
  },

  {
    id: "1.2",
    moduleId: 1,
    order: 2,
    title: "Conheca Sua Tartaruga: A Artista",
    description:
      "Entenda a tartaruga como cursor grafico e o raciocinio corporal.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "A tartaruga e como uma artista que segue suas instrucoes. Ela tem tres propriedades importantes:",
      },
      {
        type: "text",
        content:
          "1. Posicao — onde ela esta (coordenadas x, y)\n2. Direcao — para onde ela esta olhando (angulo)\n3. Caneta — se esta abaixada (desenhando) ou levantada",
      },
      {
        type: "tip",
        content:
          'Dica: imagine que VOCE e a tartaruga! Se alguem disser "ande 100 passos para frente", voce andaria na direcao que esta olhando.',
      },
      {
        type: "text",
        content:
          "O centro da tela e a posicao (0, 0). X positivo e para a direita, Y positivo e para cima — como no plano cartesiano da matematica!",
      },
      {
        type: "text",
        content:
          "A caneta comeca abaixada, entao tudo que a tartaruga andar vai deixar um rastro. Na proxima licao vamos finalmente dar comandos!",
      },
    ],
    challenges: [],
  },

  {
    id: "1.3",
    moduleId: 1,
    order: 3,
    title: "Os Quatro Movimentos Basicos",
    description: "Aprenda pf, pt, vd e ve — os 4 comandos fundamentais.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["pf", "pt", "vd", "ve"],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Agora sim! Vamos aprender os 4 comandos de movimento da tartaruga:",
      },
      {
        type: "text",
        content:
          "pf N (para frente) — move N passos na direcao que esta olhando\nbk N (para tras) — move N passos para tras\nrt N (girar direita) — gira N graus no sentido horario\nlt N (girar esquerda) — gira N graus no sentido anti-horario",
      },
      {
        type: "example",
        content: "Mova a tartaruga 100 passos para frente:",
        code: "pf 100",
      },
      {
        type: "example",
        content: "Gire 90 graus para a direita e ande mais 50:",
        code: "rt 90\nfd 50",
      },
      {
        type: "try-it",
        content: "Tente voce! Faca um L: ande para frente, gire e ande de novo.",
        code: "fd 100\nrt 90\nfd 50",
      },
      {
        type: "tip",
        content:
          "Em inglês: fd (forward), bk (back), rt (right turn), lt (left turn). Ambos funcionam!",
      },
    ],
    challenges: [
      {
        id: "1.3.1",
        title: "Primeiro passo",
        description: "Mova a tartaruga 100 passos para frente.",
        difficulty: 1,
        hints: ["Use o comando 'pf' seguido de um numero.", "Digite: pf 100"],
        validation: { type: "contains-commands", commands: ["forward"] },
        points: 15,
      },
      {
        id: "1.3.2",
        title: "Desenhando um L",
        description:
          "Desenhe uma linha em forma de L (ande para frente, gire e ande de novo).",
        difficulty: 1,
        hints: [
          "Voce precisa de 3 comandos: pf, vd e pf.",
          "Gire 90 graus para fazer uma curva em angulo reto.",
        ],
        validation: { type: "min-lines", count: 2 },
        points: 20,
      },
      {
        id: "1.3.3",
        title: "Ida e volta",
        description:
          "Faca a tartaruga ir para frente e voltar ao ponto de partida.",
        difficulty: 1,
        hints: [
          "Use pf para ir e pt para voltar.",
          "Se andar 100 para frente, ande 100 para tras.",
        ],
        validation: { type: "contains-commands", commands: ["forward", "back"] },
        points: 20,
      },
    ],
  },

  {
    id: "1.4",
    moduleId: 1,
    order: 4,
    title: "Usando a Caneta da Tartaruga",
    description:
      "Controle quando a tartaruga desenha, espessura e visibilidade.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["pu", "pendown", "setpensize", "ht", "st", "home"],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "A tartaruga tem uma caneta que desenha por onde passa. Voce pode controlar quando ela desenha!",
      },
      {
        type: "text",
        content:
          "pu (pen up / caneta levantada) — mover sem desenhar\npendown (caneta abaixada) — voltar a desenhar\nsetpensize N — mudar espessura da caneta\nht (hide turtle) — esconder tartaruga\nst (show turtle) — mostrar tartaruga\nhome — voltar ao centro",
      },
      {
        type: "example",
        content: "Desenhe duas linhas com espaco no meio:",
        code: "fd 50\npu\nfd 30\npendown\nfd 50",
      },
      {
        type: "example",
        content: "Desenhe com caneta grossa:",
        code: "setpensize 5\nfd 100",
      },
      {
        type: "try-it",
        content:
          "Desenhe uma linha tracejada! Alterne entre desenhar e pular.",
        code: "fd 20\npu\nfd 10\npendown\nfd 20\npu\nfd 10\npendown\nfd 20",
      },
    ],
    challenges: [
      {
        id: "1.4.1",
        title: "Linha tracejada",
        description: "Desenhe uma linha tracejada usando pu e pendown.",
        difficulty: 1,
        hints: [
          "Alterne: fd (desenha), pu, fd (pula), pendown, fd (desenha)...",
          "Use pu para levantar e pendown para abaixar a caneta.",
        ],
        validation: { type: "contains-commands", commands: ["penup", "pendown"] },
        points: 20,
      },
      {
        id: "1.4.2",
        title: "Linhas paralelas",
        description:
          "Desenhe duas linhas paralelas (use pu para reposicionar).",
        difficulty: 2,
        hints: [
          "Desenhe uma linha, levante a caneta, mova para o lado, abaixe e desenhe outra.",
          "Apos a primeira linha, use pu, rt 90, fd 30, lt 90, pendown, fd para a segunda.",
        ],
        validation: { type: "min-lines", count: 2 },
        points: 25,
      },
      {
        id: "1.4.3",
        title: "Caneta grossa",
        description: "Desenhe qualquer forma com caneta de espessura 5.",
        difficulty: 1,
        hints: ["Use setpensize 5 antes de desenhar."],
        validation: { type: "contains-commands", commands: ["setpensize"] },
        points: 15,
      },
    ],
  },

  {
    id: "1.5",
    moduleId: 1,
    order: 5,
    title: "Desenhando Formas: O Quadrado Perfeito",
    description:
      "Combine comandos para criar formas fechadas e aprenda repeat.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["repeat", "cs"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          "Vamos desenhar um quadrado! Sao 4 lados iguais com giros de 90 graus:",
      },
      {
        type: "example",
        content: "Quadrado passo a passo (longo):",
        code: "fd 100 rt 90 fd 100 rt 90 fd 100 rt 90 fd 100 rt 90",
      },
      {
        type: "text",
        content:
          "Percebeu? Repetimos 'fd 100 rt 90' quatro vezes! Existe um comando magico para isso: repeat!",
      },
      {
        type: "example",
        content: "Quadrado com repeat — muito mais elegante:",
        code: "repeat 4 [fd 100 rt 90]",
      },
      {
        type: "text",
        content:
          "Formula magica: para um poligono regular de N lados, use repeat N [fd tamanho rt 360/N]",
      },
      {
        type: "example",
        content: "Triangulo equilatero (3 lados, giro de 120):",
        code: "repeat 3 [fd 100 rt 120]",
      },
      {
        type: "example",
        content: "Hexagono (6 lados, giro de 60):",
        code: "repeat 6 [fd 60 rt 60]",
      },
      {
        type: "tip",
        content:
          "Use 'cs' (clear screen) para limpar a tela e comecar de novo. Em PT: 'limpe'.",
      },
      {
        type: "try-it",
        content:
          "Tente fazer um circulo! Dica: repeat 360 [fd 1 rt 1]",
        code: "repeat 360 [fd 1 rt 1]",
      },
    ],
    challenges: [
      {
        id: "1.5.1",
        title: "Quadrado com repeat",
        description: "Desenhe um quadrado usando o comando repeat.",
        difficulty: 1,
        hints: [
          "Um quadrado tem 4 lados com giro de 90 graus.",
          "Use: repeat 4 [fd 100 rt 90]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 25,
      },
      {
        id: "1.5.2",
        title: "Triangulo equilatero",
        description: "Desenhe um triangulo equilatero usando repeat.",
        difficulty: 1,
        hints: [
          "Triangulo = 3 lados. Angulo externo = 360/3 = 120 graus.",
          "repeat 3 [fd 100 rt 120]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 25,
      },
      {
        id: "1.5.3",
        title: "Hexagono",
        description: "Desenhe um hexagono regular.",
        difficulty: 2,
        hints: [
          "Hexagono = 6 lados. 360/6 = 60 graus.",
          "repeat 6 [fd 60 rt 60]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 30,
      },
      {
        id: "1.5.4",
        title: "Circulo!",
        description: "Desenhe um circulo (ou quase!).",
        difficulty: 2,
        hints: [
          "Use muitos lados pequenos: repeat 360 [fd 1 rt 1].",
          "Quanto mais lados e menor o passo, mais redondo fica!",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 35,
      },
    ],
  },

  {
    id: "1.6",
    moduleId: 1,
    order: 6,
    title: "Mais Comandos Uteis",
    description: "Posicionamento absoluto, coordenadas e limpeza.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["setxy", "setheading"],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Ate agora movemos a tartaruga de forma relativa (a partir de onde esta). Agora vamos aprender posicionamento absoluto!",
      },
      {
        type: "text",
        content:
          "home — voltar ao centro (0, 0)\nsetxy X Y — ir para coordenadas especificas\nsetheading N (seth N) — apontar para uma direcao (0=cima, 90=direita, 180=baixo, 270=esquerda)",
      },
      {
        type: "example",
        content: "Mover para uma posicao especifica:",
        code: "setxy 100 100",
      },
      {
        type: "example",
        content: "Voltar ao centro e apontar para a direita:",
        code: "home\nseth 90",
      },
      {
        type: "try-it",
        content: "Desenhe um quadrado no canto superior direito!",
        code: "pu\nsetxy 50 50\npendown\nrepeat 4 [fd 80 rt 90]",
      },
    ],
    challenges: [
      {
        id: "1.6.1",
        title: "Quadrado posicionado",
        description:
          "Desenhe um quadrado no canto superior direito da tela usando setxy.",
        difficulty: 2,
        hints: [
          "Use pu para mover sem desenhar, depois pendown.",
          "Coordenadas positivas ficam no canto superior direito.",
        ],
        validation: { type: "contains-commands", commands: ["setxy"] },
        points: 25,
      },
    ],
  },

  {
    id: "1.7",
    moduleId: 1,
    order: 7,
    title: "O Que Vem Agora?",
    description: "Recapitulacao e desenho livre combinando tudo aprendido.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Parabens! Voce ja sabe o basico de Logo. Vamos recapitular:",
      },
      {
        type: "text",
        content:
          "Movimento: fd, bk, rt, lt\nCaneta: pu, pendown, setpensize\nFormas: repeat N [comandos]\nPosicao: home, setxy, setheading\nLimpeza: cs (clear screen)",
      },
      {
        type: "text",
        content:
          "Ate agora a tartaruga so faz o que mandamos diretamente. Nos proximos modulos ela vai ganhar superpoderes:",
      },
      {
        type: "text",
        content:
          "Memoria (variaveis) — lembrar valores\nHabilidades (procedures) — criar novos comandos\nInteligencia (logica) — tomar decisoes",
      },
      {
        type: "tip",
        content:
          "Hora do desenho livre! Use tudo que aprendeu para criar uma arte.",
      },
    ],
    challenges: [
      {
        id: "1.7.1",
        title: "Desenho Livre",
        description:
          "Crie um desenho usando todos os comandos que aprendeu! Seja criativo.",
        difficulty: 2,
        hints: [
          "Combine fd, rt, lt, repeat, pu, pendown, setpensize...",
          "Tente desenhar uma casa (quadrado + triangulo)!",
        ],
        validation: { type: "free", description: "Qualquer desenho vale!" },
        points: 40,
      },
    ],
  },
];
