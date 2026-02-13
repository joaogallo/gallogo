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
          "Topicos: movimentos (fd, bk, rt, lt), caneta (pu, pendown, setpensize), repeticao (repeat), variaveis (make), procedures (to/end), condicionais (if).",
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
        description: "Desenhe um quadrado de lado 80 usando repeat.",
        difficulty: 1,
        hints: ["repeat 4 [fd 80 rt 90]"],
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
          "repeat 5 [fd 60 rt 72]",
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
          "to triangulo :tam ... end",
          "repeat 3 [fd :tam rt 120]",
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
          "Nivel Hacker (10-14):\n1. Arvore fractal com folhas coloridas\n2. Floco de neve de Koch (3 niveis)\n3. Paisagem procedural com random",
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
          "Use setpc para colorir cada parte.",
          "Use pu/pendown para posicionar sem desenhar.",
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
          "Repita-a com rotacao: repeat N [forma rt 360/N].",
          "Varie cores com setpc repcount.",
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
          "MOVIMENTO:\nfd N — para frente N passos\nbk N — para tras N passos\nrt N — girar N graus a direita\nlt N — girar N graus a esquerda",
      },
      {
        type: "text",
        content:
          "POSICAO:\nhome — voltar ao centro\nsetxy X Y — ir para (X, Y)\nseth N — apontar para direcao N",
      },
      {
        type: "text",
        content:
          "CANETA:\npu — levantar (nao desenha)\npendown — abaixar (desenha)\nsetpensize N — espessura\nsetpc N — cor (0-15)",
      },
      {
        type: "text",
        content:
          "TARTARUGA:\nht — esconder\nst — mostrar\ncs — limpar tela",
      },
      {
        type: "text",
        content:
          'PROGRAMACAO:\nrepeat N [cmds] — repetir\nmake "nome valor — variavel\n:nome — usar variavel\nprint valor — mostrar\nto nome :param ... end — procedure\nif cond [cmds] — condicional\nstop — sair do procedure',
      },
      {
        type: "text",
        content:
          "MATEMATICA:\n+, -, *, / — aritmetica\nsqrt N — raiz quadrada\npower B E — potencia\nrandom N — aleatorio 0 a N-1\nabs N — valor absoluto",
      },
    ],
    challenges: [],
  },
];
