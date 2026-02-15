import type { Lesson } from "@/types/curriculum";

/** Módulo 5: Avaliação e Projetos (3 lições) */
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
          "Hora de testar o que você aprendeu! Responda os desafios abaixo usando o terminal.",
      },
      {
        type: "text",
        content:
          "Tópicos: movimentos (pf, pt, vd, ve), caneta (sc, uc, tc), repetição (repita), variáveis (faça), procedures (aprenda/fim), condicionais (se).",
      },
      {
        type: "tip",
        content:
          "Não se preocupe em errar! Tente cada desafio e aprenda com os erros.",
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
        title: "Quiz: Pentágono",
        description: "Desenhe um pentágono regular de lado 60.",
        difficulty: 2,
        hints: [
          "Pentágono = 5 lados. Ângulo = 360/5 = 72 graus.",
          "repita 5 [pf 60 vd 72]",
        ],
        validation: { type: "contains-commands", commands: ["repeat"] },
        points: 25,
      },
      {
        id: "5.1.3",
        title: "Quiz: Procedure com parâmetro",
        description:
          "Crie um procedure 'triangulo' que recebe o tamanho como parâmetro.",
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
      "Projetos criativos por nível de dificuldade.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          "Escolha um projeto de acordo com seu nível! Cada projeto é uma oportunidade de usar tudo que você aprendeu.",
      },
      {
        type: "text",
        content:
          "Nível Explorador (6-8):\n1. Casa colorida com jardim\n2. Robô com formas geométricas\n3. Sua letra inicial estilizada",
      },
      {
        type: "text",
        content:
          "Nível Aventureiro (8-10):\n1. Cidade (casa, prédio, árvore, carro)\n2. Mandala simétrica\n3. Labirinto programado",
      },
      {
        type: "text",
        content:
          "Nível Hacker (10-14):\n1. Árvore fractal com folhas coloridas\n2. Floco de neve de Koch (3 níveis)\n3. Paisagem procedural com aleatório",
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
          "Crie uma mandala simétrica com pelo menos 6 repetições e cores variadas.",
        difficulty: 3,
        hints: [
          "Crie uma forma base (quadrado, hexágono).",
          "Repita-a com rotação: repita N [forma vd 360/N].",
          "Varie cores com mudecor contagemrepita.",
        ],
        validation: { type: "free", description: "Mandala simétrica." },
        points: 50,
      },
      {
        id: "5.2.3",
        title: "Projeto: Fractal",
        description:
          "Implemente um desenho fractal (árvore, Koch ou Sierpinski).",
        difficulty: 3,
        hints: [
          "Comece pela árvore fractal — é o mais intuitivo.",
          "Lembre: condição de parada + recursão com tamanho menor.",
          "Teste com níveis baixos (2-3) antes de aumentar.",
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
    title: "Glossário e Referência Rápida",
    description:
      "Referência completa de todos os comandos Logo.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 10,
    steps: [
      {
        type: "text",
        content:
          "Referência rápida dos principais comandos:",
      },
      {
        type: "text",
        content:
          "MOVIMENTO:\npf N — para frente N passos\npt N — para trás N passos\nvd N — girar N graus à direita\nve N — girar N graus à esquerda",
      },
      {
        type: "text",
        content:
          "POSIÇÃO:\ncasa — voltar ao centro\nmudexy X Y — ir para (X, Y)\nmuded N — apontar para direção N",
      },
      {
        type: "text",
        content:
          "CANETA:\nsc — levantar (não desenha)\nuc — abaixar (desenha)\ntc N — espessura\nmudecor N — cor (0-15)",
      },
      {
        type: "text",
        content:
          "TARTARUGA:\net — esconder\nmt — mostrar\nlimpe — limpar tela",
      },
      {
        type: "text",
        content:
          'PROGRAMAÇÃO:\nrepita N [cmds] — repetir\nfaça "nome valor — variável\n:nome — usar variável\nescreva valor — mostrar\naprenda nome :param ... fim — procedure\nse cond [cmds] — condicional\npare — sair do procedure',
      },
      {
        type: "text",
        content:
          "MATEMÁTICA:\n+, -, *, / — aritmética\nraizq N — raiz quadrada\npotência B E — potência\naleatório N — aleatório 0 a N-1\nabsoluto N — valor absoluto",
      },
    ],
    challenges: [],
  },
];
