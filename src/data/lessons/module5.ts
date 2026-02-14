import type { Lesson } from "@/types/curriculum";

/** Modulo 5: Avaliacao e Projetos (3 licoes) */
export const MODULE_5_LESSONS: Lesson[] = [
  {
    id: "5.1",
    moduleId: 5,
    order: 1,
    title: "Quiz: Fundamentos de Logo",
    description:
      "Teste seus conhecimentos sobre todos os comandos e conceitos.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Hora de testar o que voce aprendeu! Responda os desafios abaixo usando o terminal.",
      },
      {
        type: "text",
        content:
          "Topicos: movimentos (pf, pt, vd, ve), caneta (sc, uc, tc), repeticao (repita), variaveis (faca), procedures (aprenda/fim), condicionais (se).",
      },
      {
        type: "tip",
        content:
          "Nao se preocupe em errar! Tente cada desafio e aprenda com os erros.",
      },
    ],
    challenges: [
      {
        id: "5.1.1",
        title: "Quiz: Quadrado",
        description: "Desenhe um quadrado de lado 80 usando repita.",
        difficulty: 1,
        hints: ["repita 4 [pf 80 vd 90]"],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 20,
      },
      {
        id: "5.1.2",
        title: "Quiz: Pentagono",
        description: "Desenhe um pentagono regular de lado 60.",
        difficulty: 2,
        hints: [
          "Pentagono = 5 lados. Angulo = 360/5 = 72 graus.",
          "repita 5 [pf 60 vd 72]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 25,
      },
      {
        id: "5.1.3",
        title: "Quiz: Procedure com parametro",
        description:
          "Crie um procedure 'triangulo' que recebe o tamanho como parametro.",
        difficulty: 2,
        hints: [
          "aprenda triangulo :tam ... fim",
          "repita 3 [pf :tam vd 120]",
        ],
        validation: { type: "contains-commands", commands: ["to"] },
        points: 30,
      },
    ],
  },

  {
    id: "5.2",
    moduleId: 5,
    order: 2,
    title: "Projetos Finais",
    description:
      "Projetos criativos por nivel de dificuldade.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          "Escolha um projeto de acordo com seu nivel! Cada projeto e uma oportunidade de usar tudo que voce aprendeu.",
      },
      {
        type: "text",
        content:
          "Nivel Explorador (6-8):\n1. Casa colorida com jardim\n2. Robo com formas geometricas\n3. Sua letra inicial estilizada",
      },
      {
        type: "text",
        content:
          "Nivel Aventureiro (8-12):\n1. Cidade (casa, predio, arvore, carro)\n2. Mandala simetrica\n3. Labirinto programado",
      },
      {
        type: "text",
        content:
          "Nivel Hacker (10-14):\n1. Arvore fractal com folhas coloridas\n2. Floco de neve de Koch (3 niveis)\n3. Paisagem procedural com aleatorio",
      },
    ],
    challenges: [
      {
        id: "5.2.1",
        title: "Projeto: Casa colorida",
        description:
          "Desenhe uma casa com paredes, teto e porta usando procedures e cores.",
        difficulty: 2,
        hints: [
          "Crie procedures separados: parede, teto, porta.",
          "Use mudecor para colorir cada parte.",
          "Use sc/uc para posicionar sem desenhar.",
        ],
        validation: { type: "free", description: "Casa com pelo menos parede e teto." },
        points: 40,
      },
      {
        id: "5.2.2",
        title: "Projeto: Mandala",
        description:
          "Crie uma mandala simetrica com pelo menos 6 repeticoes e cores variadas.",
        difficulty: 3,
        hints: [
          "Crie uma forma base (quadrado, hexagono).",
          "Repita-a com rotacao: repita N [forma vd 360/N].",
          "Varie cores com mudecor contagemrepita.",
        ],
        validation: { type: "free", description: "Mandala simetrica." },
        points: 50,
      },
      {
        id: "5.2.3",
        title: "Projeto: Fractal",
        description:
          "Implemente um desenho fractal (arvore, Koch ou Sierpinski).",
        difficulty: 3,
        hints: [
          "Comece pela arvore fractal — e o mais intuitivo.",
          "Lembre: condicao de parada + recursao com tamanho menor.",
          "Teste com niveis baixos (2-3) antes de aumentar.",
        ],
        validation: { type: "free", description: "Desenho fractal recursivo." },
        points: 60,
      },
    ],
  },

  {
    id: "5.3",
    moduleId: 5,
    order: 3,
    title: "Glossario e Referencia Rapida",
    description:
      "Referencia completa de todos os comandos Logo.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 10,
    steps: [
      {
        type: "text",
        content:
          "Referencia rapida dos principais comandos:",
      },
      {
        type: "text",
        content:
          "MOVIMENTO:\npf N — para frente N passos\npt N — para tras N passos\nvd N — girar N graus a direita\nve N — girar N graus a esquerda",
      },
      {
        type: "text",
        content:
          "POSICAO:\ncasa — voltar ao centro\nmudexy X Y — ir para (X, Y)\nmuded N — apontar para direcao N",
      },
      {
        type: "text",
        content:
          "CANETA:\nsc — levantar (nao desenha)\nuc — abaixar (desenha)\ntc N — espessura\nmudecor N — cor (0-15)",
      },
      {
        type: "text",
        content:
          "TARTARUGA:\net — esconder\nmt — mostrar\nlimpe — limpar tela",
      },
      {
        type: "text",
        content:
          'PROGRAMACAO:\nrepita N [cmds] — repetir\nfaca "nome valor — variavel\n:nome — usar variavel\nescreva valor — mostrar\naprenda nome :param ... fim — procedure\nse cond [cmds] — condicional\npare — sair do procedure',
      },
      {
        type: "text",
        content:
          "MATEMATICA:\n+, -, *, / — aritmetica\nraizq N — raiz quadrada\npotencia B E — potencia\naleatorio N — aleatorio 0 a N-1\nabsoluto N — valor absoluto",
      },
    ],
    challenges: [],
  },
];
