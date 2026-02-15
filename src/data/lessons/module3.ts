import type { Lesson } from "@/types/curriculum";

/** Módulo 3: Referência e Aprofundamento (7 lições) */
export const MODULE_3_LESSONS: Lesson[] = [
  {
    id: "3.1",
    moduleId: 3,
    order: 1,
    title: "Introdução à Linguagem Logo",
    description: "História, filosofia e tipos de dados.",
    ageGroupMin: "8-10",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Logo foi criada nos anos 1960 por Wally Feurzeig, Daniel Bobrow e Seymour Papert na BBN (Cambridge, EUA).",
      },
      {
        type: "text",
        content:
          "A filosofia de Papert: construtivismo — crianças aprendem melhor CONSTRUINDO coisas, não apenas ouvindo explicações.",
      },
      {
        type: "text",
        content:
          "Logo é um dialeto simplificado de Lisp, uma das linguagens mais antigas da computação. Tipos de dados: números (decimais), strings (texto) e booleanos (verdadeiro/falso).",
      },
      {
        type: "tip",
        content:
          "Logo é 'untyped': variáveis não têm tipo fixo. Uma variável pode guardar um número agora e um texto depois.",
      },
    ],
    challenges: [],
  },

  {
    id: "3.2",
    moduleId: 3,
    order: 2,
    title: "Turtle Graphics e Coordenadas",
    description:
      "Dominar o sistema de coordenadas e posicionamento absoluto.",
    ageGroupMin: "8-10",
    commandsIntroduced: ["mudexy", "mudedirecao"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          "O canvas usa o plano cartesiano: origem (0,0) no centro, X positivo para direita, Y positivo para cima.",
      },
      {
        type: "text",
        content:
          "Estado da tartaruga: posição (x, y) + direção (heading em graus).\n0° = cima, 90° = direita, 180° = baixo, 270° = esquerda.",
      },
      {
        type: "text",
        content:
          "Posicionamento relativo vs. absoluto:\n- Relativo: pf, pt, vd, ve (a partir de onde está)\n- Absoluto: mudexy, mudedireção (posição/direção exata)",
      },
      {
        type: "example",
        content: "Desenhar um quadrado com mudexy (sem pf/vd):",
        code: "sc\nmudexy 50 50\nuc\nmudexy 50 -50\nmudexy -50 -50\nmudexy -50 50\nmudexy 50 50",
      },
      {
        type: "try-it",
        content: "Faça a tartaruga pular entre 4 pontos formando um X:",
        code: "sc\nmudexy -50 50\nuc\nmudexy 50 -50\nsc\nmudexy 50 50\nuc\nmudexy -50 -50",
      },
    ],
    challenges: [
      {
        id: "3.2.1",
        title: "Quadrado absoluto",
        description: "Desenhe um quadrado usando apenas mudexy (sem pf/vd).",
        difficulty: 2,
        hints: [
          "Use 4 chamadas mudexy para os 4 cantos.",
          "Volte ao primeiro ponto para fechar a forma.",
        ],
        validation: { type: "contains-commands", commands: ["setxy"] },
        points: 30,
      },
    ],
  },

  {
    id: "3.3",
    moduleId: 3,
    order: 3,
    title: "Construções de Programação Essenciais",
    description:
      "Referência completa de variáveis, aritmética e repetição.",
    ageGroupMin: "8-10",
    commandsIntroduced: ["raizq", "potencia", "absoluto", "arredonde", "resto"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          'Variáveis:\nfaça "nome valor — criar\n:nome — usar\nescreva :nome — mostrar',
      },
      {
        type: "text",
        content:
          "Aritmética: +, -, *, /\nFunções: raizq (raiz), potência, absoluto, arredonde (arredondar), inteiro, resto, aleatório",
      },
      {
        type: "example",
        content: "Funções matemáticas em ação:",
        code: "escreva raizq 144\nescreva potência 2 8\nescreva absoluto -5\nescreva arredonde 3.7\nescreva resto 10 3",
      },
      {
        type: "example",
        content: "Polígono com variável para os lados:",
        code: 'faça "lados 6\nrepita :lados [pf 50 vd 360 / :lados]',
      },
      {
        type: "try-it",
        content: "Calcule a hipotenusa de um triângulo 3-4-5:",
        code: "escreva raizq (potência 3 2) + (potência 4 2)",
      },
    ],
    challenges: [
      {
        id: "3.3.1",
        title: "Polígono paramétrico",
        description:
          "Use uma variável 'lados' para desenhar qualquer polígono regular.",
        difficulty: 2,
        hints: [
          "Use faça com o número de lados, depois use 360 / :lados para o ângulo.",
        ],
        validation: { type: "contains-commands", commands: ["make", "repeat"] },
        points: 30,
      },
    ],
  },

  {
    id: "3.4",
    moduleId: 3,
    order: 4,
    title: "Técnicas Avançadas de Programação",
    description:
      "Procedures completos, recursão e controle de fluxo.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          "Procedures podem ter múltiplos parâmetros e chamar uns aos outros:",
      },
      {
        type: "example",
        content: "Procedure polígono genérico:",
        code: "aprenda poligono :lados :tamanho\n  repita :lados [pf :tamanho vd 360 / :lados]\nfim\npoligono 5 60\npoligono 8 40",
      },
      {
        type: "example",
        content: "Flor: procedure que usa polígono:",
        code: "aprenda poligono :lados :tamanho\n  repita :lados [pf :tamanho vd 360 / :lados]\nfim\naprenda flor :petalas :tamanho\n  repita :petalas [\n    poligono 4 :tamanho\n    vd 360 / :petalas\n  ]\nfim\nflor 8 40",
      },
      {
        type: "text",
        content:
          "Recursão: um procedure que chama a si mesmo. SEMPRE precisa de condição de parada!",
      },
      {
        type: "example",
        content: "Árvore fractal:",
        code: "aprenda arvore :tamanho :nivel\n  se :nivel < 1 [pare]\n  pf :tamanho\n  ve 30\n  arvore :tamanho * 0.7 :nivel - 1\n  vd 60\n  arvore :tamanho * 0.7 :nivel - 1\n  ve 30\n  pt :tamanho\nfim\narvore 80 5",
      },
      {
        type: "example",
        content: "Triângulo de Sierpinski:",
        code: "aprenda sierpinski :tam :nivel\n  se :nivel = 0 [repita 3 [pf :tam vd 120] pare]\n  sierpinski :tam / 2 :nivel - 1\n  pf :tam / 2\n  sierpinski :tam / 2 :nivel - 1\n  pt :tam / 2\n  ve 60\n  pf :tam / 2\n  vd 60\n  sierpinski :tam / 2 :nivel - 1\n  ve 60\n  pt :tam / 2\n  vd 60\nfim\nsierpinski 200 3",
      },
    ],
    challenges: [
      {
        id: "3.4.1",
        title: "Flor geométrica",
        description:
          "Crie uma flor com pétalas usando composição de procedures.",
        difficulty: 3,
        hints: [
          "Crie um procedure para a pétala (quadrado ou losango).",
          "Repita girando: repita N [petala vd 360/N].",
        ],
        validation: { type: "contains-commands", commands: ["to", "repeat"] },
        points: 40,
      },
      {
        id: "3.4.2",
        title: "Árvore fractal",
        description:
          "Implemente uma árvore fractal com recursão.",
        difficulty: 3,
        hints: [
          "O procedure arvore chama a si mesmo com tamanho menor.",
          "Condição de parada: se :nivel < 1 [pare].",
          "Gire esquerda, recursão, gire direita, recursão, volte.",
        ],
        validation: { type: "contains-commands", commands: ["to", "if"] },
        points: 50,
      },
    ],
  },

  {
    id: "3.5",
    moduleId: 3,
    order: 5,
    title: "Manipulação de Dados e Estética",
    description: "Cores, preenchimento e personalização visual.",
    ageGroupMin: "8-10",
    commandsIntroduced: ["mudecor"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          "Vamos dar cor aos nossos desenhos! O Logo usa uma paleta de 16 cores numeradas (0-15):",
      },
      {
        type: "text",
        content:
          "0=preto, 1=azul, 2=verde, 3=ciano, 4=vermelho, 5=magenta, 6=amarelo, 7=branco, 14=laranja, 15=cinza",
      },
      {
        type: "text",
        content:
          "mudecor N — mudar cor da caneta\nExemplo: mudecor 4 muda para vermelho.",
      },
      {
        type: "example",
        content: "Quadrado colorido:",
        code: "mudecor 4\ntc 3\nrepita 4 [pf 100 vd 90]",
      },
      {
        type: "example",
        content: "Estrela multicolorida:",
        code: "aprenda estrela\n  repita 5 [\n    mudecor contagemrepita\n    pf 100\n    vd 144\n  ]\nfim\nestrela",
      },
      {
        type: "try-it",
        content: "Crie um arco-íris com linhas de cores diferentes!",
        code: "repita 15 [\n  mudecor contagemrepita\n  pf 80\n  pt 80\n  vd 12\n]",
      },
    ],
    challenges: [
      {
        id: "3.5.1",
        title: "Arco-íris",
        description:
          "Desenhe um arco-íris usando mudecor com cores diferentes.",
        difficulty: 2,
        hints: [
          "Use contagemrepita dentro de um repita para mudar a cor a cada iteração.",
          "mudecor contagemrepita muda a cor para o número da iteração.",
        ],
        validation: { type: "contains-commands", commands: ["setpencolor"] },
        points: 35,
      },
    ],
  },

  {
    id: "3.6",
    moduleId: 3,
    order: 6,
    title: "Programação Procedural Avançada",
    description:
      "Composição hierárquica e padrões de design em Logo.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          "Decomposição: quebre problemas grandes em sub-procedures pequenos e reutilizáveis.",
      },
      {
        type: "text",
        content:
          "Padrões de design comuns:\n- Padrão Flor: repetir uma forma girando a cada iteração\n- Padrão Espiral: repetir reduzindo o tamanho\n- Padrão Fractal: recursão com redução de escala",
      },
      {
        type: "example",
        content: "Padrão Flor — quadrados girados:",
        code: "aprenda quadrado :t\n  repita 4 [pf :t vd 90]\nfim\nrepita 12 [quadrado 60 vd 30]",
      },
      {
        type: "example",
        content: "Padrão Espiral — tamanho crescente:",
        code: "aprenda espiral_quadrada :t :n\n  se :n < 1 [pare]\n  pf :t\n  vd 90\n  espiral_quadrada :t + 5 :n - 1\nfim\nespiral_quadrada 10 40",
      },
      {
        type: "try-it",
        content: "Crie uma mandala com múltiplos polígonos girados:",
        code: "aprenda poli :l :t\n  repita :l [pf :t vd 360 / :l]\nfim\nrepita 6 [\n  mudecor contagemrepita + 1\n  poli 6 50\n  vd 60\n]",
      },
    ],
    challenges: [
      {
        id: "3.6.1",
        title: "Mandala",
        description: "Crie uma mandala simétrica com procedures e repita.",
        difficulty: 3,
        hints: [
          "Crie um procedure para uma forma básica.",
          "Repita-a girando: repita N [forma vd 360/N].",
          "Use mudecor para variar as cores.",
        ],
        validation: { type: "contains-commands", commands: ["to", "repeat"] },
        points: 45,
      },
    ],
  },

  {
    id: "3.7",
    moduleId: 3,
    order: 7,
    title: "Sistema de Cores — Referência Completa",
    description:
      "Paleta de 16 cores, uso avançado de mudecor.",
    ageGroupMin: "8-10",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Referência completa das 16 cores Logo:",
      },
      {
        type: "text",
        content:
          "0 preto    1 azul     2 verde    3 ciano\n4 vermelho 5 magenta  6 amarelo  7 branco\n8 marrom   9 bege     10 floresta 11 água\n12 salmão  13 roxo    14 laranja  15 cinza",
      },
      {
        type: "example",
        content: "Mostruário de todas as cores:",
        code: "sc\nmudexy -200 0\nuc\nrepita 16 [\n  mudecor contagemrepita - 1\n  tc 8\n  pf 25\n]",
      },
      {
        type: "tip",
        content:
          "Experimente combinar cores com formas! Cada cor tem um número de 0 a 15.",
      },
    ],
    challenges: [
      {
        id: "3.7.1",
        title: "Paleta de cores",
        description:
          "Desenhe um mostruário mostrando todas as 16 cores.",
        difficulty: 2,
        hints: [
          "Use repita 16 com mudecor contagemrepita - 1 dentro.",
          "Use tc grande para as linhas ficarem visíveis.",
        ],
        validation: { type: "contains-commands", commands: ["setpencolor", "repeat"] },
        points: 30,
      },
    ],
  },
];
