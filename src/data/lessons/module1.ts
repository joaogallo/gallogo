import type { Lesson } from "@/types/curriculum";

/** Módulo 1: Primeiros Passos com a Tartaruga Logo (7 lições) */
export const MODULE_1_LESSONS: Lesson[] = [
  {
    id: "1.1",
    moduleId: 1,
    order: 1,
    title: "Bem-vindo ao Mundo Logo!",
    description:
      "Apresentação do ambiente e do conceito da tartaruga como agente programável.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Bem-vindo ao GalloGo! Aqui você vai aprender a programar controlando uma tartaruga que desenha na tela.",
      },
      {
        type: "text",
        content:
          "O que é programar? É dar instruções precisas para o computador seguir. No Logo, você dá instruções para uma tartaruga que se move e desenha!",
      },
      {
        type: "text",
        content:
          "Logo foi criada nos anos 1960 por Seymour Papert para ensinar crianças a programar. A ideia é simples: imagine que VOCÊ é a tartaruga.",
      },
      {
        type: "tip",
        content:
          "Olhe para os 3 painéis da tela: Instruções (aqui!), Terminal (onde você digita comandos) e Canvas (onde a tartaruga desenha).",
      },
      {
        type: "text",
        content:
          "A tartaruga começa no centro da tela, na posição (0, 0), olhando para cima. Ela tem uma caneta que desenha por onde passa.",
      },
      {
        type: "text",
        content:
          "No Terminal, você digita comandos e a tartaruga obedece. Vamos começar na próxima lição!",
      },
    ],
    challenges: [
      {
        id: "1.1.1",
        title: "Explorador",
        description:
          "Digite 'ajuda' no terminal para ver os comandos disponíveis.",
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
    title: "Conheça Sua Tartaruga: A Artista",
    description:
      "Entenda a tartaruga como cursor gráfico e o raciocínio corporal.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "A tartaruga é como uma artista que segue suas instruções. Ela tem três propriedades importantes:",
      },
      {
        type: "text",
        content:
          "1. Posição — onde ela está (coordenadas x, y)\n2. Direção — para onde ela está olhando (ângulo)\n3. Caneta — se está abaixada (desenhando) ou levantada",
      },
      {
        type: "tip",
        content:
          'Dica: imagine que VOCÊ é a tartaruga! Se alguém disser "ande 100 passos para frente", você andaria na direção que está olhando.',
      },
      {
        type: "text",
        content:
          "O centro da tela é a posição (0, 0). X positivo é para a direita, Y positivo é para cima — como no plano cartesiano da matemática!",
      },
      {
        type: "text",
        content:
          "A caneta começa abaixada, então tudo que a tartaruga andar vai deixar um rastro. Na próxima lição vamos finalmente dar comandos!",
      },
    ],
    challenges: [],
  },

  {
    id: "1.3",
    moduleId: 1,
    order: 3,
    title: "Os Quatro Movimentos Básicos",
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
          "pf N (para frente) — move N passos na direção que está olhando\npt N (para trás) — move N passos para trás\nvd N (girar direita) — gira N graus no sentido horário\nve N (girar esquerda) — gira N graus no sentido anti-horário",
      },
      {
        type: "example",
        content: "Mova a tartaruga 100 passos para frente:",
        code: "pf 100",
      },
      {
        type: "example",
        content: "Gire 90 graus para a direita e ande mais 50:",
        code: "vd 90\npf 50",
      },
      {
        type: "try-it",
        content: "Tente você! Faça um L: ande para frente, gire e ande de novo.",
        code: "pf 100\nvd 90\npf 50",
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
        hints: ["Use o comando 'pf' seguido de um número.", "Digite: pf 100"],
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
          "Você precisa de 3 comandos: pf, vd e pf.",
          "Gire 90 graus para fazer uma curva em ângulo reto.",
        ],
        validation: { type: "min-lines", count: 2 },
        points: 20,
      },
      {
        id: "1.3.3",
        title: "Ida e volta",
        description:
          "Faça a tartaruga ir para frente e voltar ao ponto de partida.",
        difficulty: 1,
        hints: [
          "Use pf para ir e pt para voltar.",
          "Se andar 100 para frente, ande 100 para trás.",
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
    commandsIntroduced: ["sc", "uc", "tc", "et", "mt", "casa"],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "A tartaruga tem uma caneta que desenha por onde passa. Você pode controlar quando ela desenha!",
      },
      {
        type: "text",
        content:
          "sc/semcaneta (sem caneta) — mover sem desenhar\nuc/usecaneta (caneta abaixada) — voltar a desenhar\ntc/tamanhocaneta N — mudar espessura da caneta\net/escondatartaruga — esconder tartaruga\nmt/mostretartaruga — mostrar tartaruga\ncasa — voltar ao centro",
      },
      {
        type: "example",
        content: "Desenhe duas linhas com espaço no meio:",
        code: "pf 50\nsc\npf 30\nuc\npf 50",
      },
      {
        type: "example",
        content: "Desenhe com caneta grossa:",
        code: "tc 5\npf 100",
      },
      {
        type: "try-it",
        content:
          "Desenhe uma linha tracejada! Alterne entre desenhar e pular.",
        code: "pf 20\nsc\npf 10\nuc\npf 20\nsc\npf 10\nuc\npf 20",
      },
    ],
    challenges: [
      {
        id: "1.4.1",
        title: "Linha tracejada",
        description: "Desenhe uma linha tracejada usando sc e uc.",
        difficulty: 1,
        hints: [
          "Alterne: pf (desenha), sc, pf (pula), uc, pf (desenha)...",
          "Use sc para levantar e uc para abaixar a caneta.",
        ],
        validation: { type: "contains-commands", commands: ["penup", "pendown"] },
        points: 20,
      },
      {
        id: "1.4.2",
        title: "Linhas paralelas",
        description:
          "Desenhe duas linhas paralelas (use sc para reposicionar).",
        difficulty: 2,
        hints: [
          "Desenhe uma linha, levante a caneta, mova para o lado, abaixe e desenhe outra.",
          "Após a primeira linha, use sc, vd 90, pf 30, ve 90, uc, pf para a segunda.",
        ],
        validation: { type: "min-lines", count: 2 },
        points: 25,
      },
      {
        id: "1.4.3",
        title: "Caneta grossa",
        description: "Desenhe qualquer forma com caneta de espessura 5.",
        difficulty: 1,
        hints: ["Use tc 5 antes de desenhar."],
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
      "Combine comandos para criar formas fechadas e aprenda o repita.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["repita", "limpe"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          "Vamos desenhar um quadrado! São 4 lados iguais com giros de 90 graus:",
      },
      {
        type: "example",
        content: "Quadrado passo a passo (longo):",
        code: "pf 100 vd 90 pf 100 vd 90 pf 100 vd 90 pf 100 vd 90",
      },
      {
        type: "text",
        content:
          "Percebeu? Repetimos 'pf 100 vd 90' quatro vezes! Existe um comando mágico para isso: repita!",
      },
      {
        type: "example",
        content: "Quadrado com repeat — muito mais elegante:",
        code: "repita 4 [pf 100 vd 90]",
      },
      {
        type: "text",
        content:
          "Fórmula mágica: para um polígono regular de N lados, use repita N [pf tamanho vd 360/N]",
      },
      {
        type: "example",
        content: "Triângulo equilátero (3 lados, giro de 120):",
        code: "repita 3 [pf 100 vd 120]",
      },
      {
        type: "example",
        content: "Hexágono (6 lados, giro de 60):",
        code: "repita 6 [pf 60 vd 60]",
      },
      {
        type: "tip",
        content:
          "Use 'limpe' para limpar a tela e começar de novo.",
      },
      {
        type: "try-it",
        content:
          "Tente fazer um círculo! Dica: repita 360 [pf 1 vd 1]",
        code: "repita 360 [pf 1 vd 1]",
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
          "Use: repita 4 [pf 100 vd 90]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 25,
      },
      {
        id: "1.5.2",
        title: "Triângulo equilátero",
        description: "Desenhe um triângulo equilátero usando repeat.",
        difficulty: 1,
        hints: [
          "Triângulo = 3 lados. Ângulo externo = 360/3 = 120 graus.",
          "repita 3 [pf 100 vd 120]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 25,
      },
      {
        id: "1.5.3",
        title: "Hexágono",
        description: "Desenhe um hexágono regular.",
        difficulty: 2,
        hints: [
          "Hexágono = 6 lados. 360/6 = 60 graus.",
          "repita 6 [pf 60 vd 60]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 30,
      },
      {
        id: "1.5.4",
        title: "Círculo!",
        description: "Desenhe um círculo (ou quase!).",
        difficulty: 2,
        hints: [
          "Use muitos lados pequenos: repita 360 [pf 1 vd 1].",
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
    title: "Mais Comandos Úteis",
    description: "Posicionamento absoluto, coordenadas e limpeza.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["mudexy", "mudedirecao"],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Até agora movemos a tartaruga de forma relativa (a partir de onde está). Agora vamos aprender posicionamento absoluto!",
      },
      {
        type: "text",
        content:
          "casa — voltar ao centro (0, 0)\nmudexy X Y — ir para coordenadas específicas\nmudedireção N (muded N) — apontar para uma direção (0=cima, 90=direita, 180=baixo, 270=esquerda)",
      },
      {
        type: "example",
        content: "Mover para uma posição específica:",
        code: "mudexy 100 100",
      },
      {
        type: "example",
        content: "Voltar ao centro e apontar para a direita:",
        code: "casa\nmuded 90",
      },
      {
        type: "try-it",
        content: "Desenhe um quadrado no canto superior direito!",
        code: "sc\nmudexy 50 50\nuc\nrepita 4 [pf 80 vd 90]",
      },
    ],
    challenges: [
      {
        id: "1.6.1",
        title: "Quadrado posicionado",
        description:
          "Desenhe um quadrado no canto superior direito da tela usando mudexy.",
        difficulty: 2,
        hints: [
          "Use sc para mover sem desenhar, depois uc.",
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
    description: "Recapitulação e desenho livre combinando tudo aprendido.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Parabéns! Você já sabe o básico de Logo. Vamos recapitular:",
      },
      {
        type: "text",
        content:
          "Movimento: pf, pt, vd, ve\nCaneta: sc, uc, tc\nFormas: repita N [comandos]\nPosição: casa, mudexy, mudedireção\nLimpeza: limpe",
      },
      {
        type: "text",
        content:
          "Até agora a tartaruga só faz o que mandamos diretamente. Nos próximos módulos ela vai ganhar superpoderes:",
      },
      {
        type: "text",
        content:
          "Memória (variáveis) — lembrar valores\nHabilidades (procedures) — criar novos comandos\nInteligência (lógica) — tomar decisões",
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
          "Combine pf, vd, ve, repita, sc, uc, tc...",
          "Tente desenhar uma casa (quadrado + triângulo)!",
        ],
        validation: { type: "free", description: "Qualquer desenho vale!" },
        points: 40,
      },
    ],
  },
];
