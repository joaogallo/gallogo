import type { Lesson } from "@/types/curriculum";

/** Modulo 3: Referencia e Aprofundamento (7 licoes) */
export const MODULE_3_LESSONS: Lesson[] = [
  {
    id: "3.1",
    moduleId: 3,
    order: 1,
    title: "Introducao a Linguagem Logo",
    description: "Historia, filosofia e tipos de dados.",
    ageGroupMin: "8-12",
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
          "A filosofia de Papert: construtivismo — criancas aprendem melhor CONSTRUINDO coisas, nao apenas ouvindo explicacoes.",
      },
      {
        type: "text",
        content:
          "Logo e um dialeto simplificado de Lisp, uma das linguagens mais antigas da computacao. Tipos de dados: numeros (decimais), strings (texto) e booleanos (verdadeiro/falso).",
      },
      {
        type: "tip",
        content:
          "Logo e 'untyped': variaveis nao tem tipo fixo. Uma variavel pode guardar um numero agora e um texto depois.",
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
    ageGroupMin: "8-12",
    commandsIntroduced: ["setxy", "setheading"],
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
          "Estado da tartaruga: posicao (x, y) + direcao (heading em graus).\n0° = cima, 90° = direita, 180° = baixo, 270° = esquerda.",
      },
      {
        type: "text",
        content:
          "Posicionamento relativo vs. absoluto:\n- Relativo: fd, bk, rt, lt (a partir de onde esta)\n- Absoluto: setxy, setheading (posicao/direcao exata)",
      },
      {
        type: "example",
        content: "Desenhar um quadrado com setxy (sem fd/rt):",
        code: "pu\nsetxy 50 50\npendown\nsetxy 50 -50\nsetxy -50 -50\nsetxy -50 50\nsetxy 50 50",
      },
      {
        type: "try-it",
        content: "Faca a tartaruga pular entre 4 pontos formando um X:",
        code: "pu\nsetxy -50 50\npendown\nsetxy 50 -50\npu\nsetxy 50 50\npendown\nsetxy -50 -50",
      },
    ],
    challenges: [
      {
        id: "3.2.1",
        title: "Quadrado absoluto",
        description: "Desenhe um quadrado usando apenas setxy (sem fd/rt).",
        difficulty: 2,
        hints: [
          "Use 4 chamadas setxy para os 4 cantos.",
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
    title: "Construcoes de Programacao Essenciais",
    description:
      "Referencia completa de variaveis, aritmetica e repeticao.",
    ageGroupMin: "8-12",
    commandsIntroduced: ["sqrt", "power", "abs", "round", "remainder"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          'Variaveis:\nmake "nome valor — criar\n:nome — usar\nprint :nome — mostrar',
      },
      {
        type: "text",
        content:
          "Aritmetica: +, -, *, /\nFuncoes: sqrt (raiz), power (potencia), abs (absoluto), round (arredondar), int (inteiro), remainder (resto), random (aleatorio)",
      },
      {
        type: "example",
        content: "Funcoes matematicas em acao:",
        code: "print sqrt 144\nprint power 2 8\nprint abs -5\nprint round 3.7\nprint remainder 10 3",
      },
      {
        type: "example",
        content: "Poligono com variavel para os lados:",
        code: 'make "lados 6\nrepeat :lados [fd 50 rt 360 / :lados]',
      },
      {
        type: "try-it",
        content: "Calcule a hipotenusa de um triangulo 3-4-5:",
        code: "print sqrt (power 3 2) + (power 4 2)",
      },
    ],
    challenges: [
      {
        id: "3.3.1",
        title: "Poligono parametrico",
        description:
          "Use uma variavel 'lados' para desenhar qualquer poligono regular.",
        difficulty: 2,
        hints: [
          "Faca make com o numero de lados, depois use 360 / :lados para o angulo.",
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
    title: "Tecnicas Avancadas de Programacao",
    description:
      "Procedures completos, recursao e controle de fluxo.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          "Procedures podem ter multiplos parametros e chamar uns aos outros:",
      },
      {
        type: "example",
        content: "Procedure poligono generico:",
        code: "to poligono :lados :tamanho\n  repeat :lados [fd :tamanho rt 360 / :lados]\nend\npoligono 5 60\npoligono 8 40",
      },
      {
        type: "example",
        content: "Flor: procedure que usa poligono:",
        code: "to poligono :lados :tamanho\n  repeat :lados [fd :tamanho rt 360 / :lados]\nend\nto flor :petalas :tamanho\n  repeat :petalas [\n    poligono 4 :tamanho\n    rt 360 / :petalas\n  ]\nend\nflor 8 40",
      },
      {
        type: "text",
        content:
          "Recursao: um procedure que chama a si mesmo. SEMPRE precisa de condicao de parada!",
      },
      {
        type: "example",
        content: "Arvore fractal:",
        code: "to arvore :tamanho :nivel\n  if :nivel < 1 [stop]\n  fd :tamanho\n  lt 30\n  arvore :tamanho * 0.7 :nivel - 1\n  rt 60\n  arvore :tamanho * 0.7 :nivel - 1\n  lt 30\n  bk :tamanho\nend\narvore 80 5",
      },
      {
        type: "example",
        content: "Triangulo de Sierpinski:",
        code: "to sierpinski :tam :nivel\n  if :nivel = 0 [repeat 3 [fd :tam rt 120] stop]\n  sierpinski :tam / 2 :nivel - 1\n  fd :tam / 2\n  sierpinski :tam / 2 :nivel - 1\n  bk :tam / 2\n  lt 60\n  fd :tam / 2\n  rt 60\n  sierpinski :tam / 2 :nivel - 1\n  lt 60\n  bk :tam / 2\n  rt 60\nend\nsierpinski 200 3",
      },
    ],
    challenges: [
      {
        id: "3.4.1",
        title: "Flor geometrica",
        description:
          "Crie uma flor com petalas usando composicao de procedures.",
        difficulty: 3,
        hints: [
          "Crie um procedure para a petala (quadrado ou losango).",
          "Repita girando: repeat N [petala rt 360/N].",
        ],
        validation: { type: "contains-commands", commands: ["to", "repeat"] },
        points: 40,
      },
      {
        id: "3.4.2",
        title: "Arvore fractal",
        description:
          "Implemente uma arvore fractal com recursao.",
        difficulty: 3,
        hints: [
          "O procedure arvore chama a si mesmo com tamanho menor.",
          "Condicao de parada: if :nivel < 1 [stop].",
          "Gire esquerda, recursao, gire direita, recursao, volte.",
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
    title: "Manipulacao de Dados e Estetica",
    description: "Cores, preenchimento e personalizacao visual.",
    ageGroupMin: "8-12",
    commandsIntroduced: ["setpencolor"],
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
          "setpencolor N (setpc N) — mudar cor da caneta\nExemplo: setpc 4 muda para vermelho.",
      },
      {
        type: "example",
        content: "Quadrado colorido:",
        code: "setpc 4\nsetpensize 3\nrepeat 4 [fd 100 rt 90]",
      },
      {
        type: "example",
        content: "Estrela multicolorida:",
        code: "to estrela\n  repeat 5 [\n    setpc repcount\n    fd 100\n    rt 144\n  ]\nend\nestrela",
      },
      {
        type: "try-it",
        content: "Crie um arco-iris com linhas de cores diferentes!",
        code: "repeat 15 [\n  setpc repcount\n  fd 80\n  bk 80\n  rt 12\n]",
      },
    ],
    challenges: [
      {
        id: "3.5.1",
        title: "Arco-iris",
        description:
          "Desenhe um arco-iris usando setpc com cores diferentes.",
        difficulty: 2,
        hints: [
          "Use repcount dentro de um repeat para mudar a cor a cada iteracao.",
          "setpc repcount muda a cor para o numero da iteracao.",
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
    title: "Programacao Procedural Avancada",
    description:
      "Composicao hierarquica e padroes de design em Logo.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          "Decomposicao: quebre problemas grandes em sub-procedures pequenos e reutilizaveis.",
      },
      {
        type: "text",
        content:
          "Padroes de design comuns:\n- Padrao Flor: repetir uma forma girando a cada iteracao\n- Padrao Espiral: repetir reduzindo o tamanho\n- Padrao Fractal: recursao com reducao de escala",
      },
      {
        type: "example",
        content: "Padrao Flor — quadrados girados:",
        code: "to quadrado :t\n  repeat 4 [fd :t rt 90]\nend\nrepeat 12 [quadrado 60 rt 30]",
      },
      {
        type: "example",
        content: "Padrao Espiral — tamanho crescente:",
        code: "to espiral_quadrada :t :n\n  if :n < 1 [stop]\n  fd :t\n  rt 90\n  espiral_quadrada :t + 5 :n - 1\nend\nespiral_quadrada 10 40",
      },
      {
        type: "try-it",
        content: "Crie uma mandala com multiplos poligonos girados:",
        code: "to poli :l :t\n  repeat :l [fd :t rt 360 / :l]\nend\nrepeat 6 [\n  setpc repcount + 1\n  poli 6 50\n  rt 60\n]",
      },
    ],
    challenges: [
      {
        id: "3.6.1",
        title: "Mandala",
        description: "Crie uma mandala simetrica com procedures e repeat.",
        difficulty: 3,
        hints: [
          "Crie um procedure para uma forma basica.",
          "Repita-a girando: repeat N [forma rt 360/N].",
          "Use setpc para variar as cores.",
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
    title: "Sistema de Cores — Referencia Completa",
    description:
      "Paleta de 16 cores, uso avancado de setpencolor.",
    ageGroupMin: "8-12",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Referencia completa das 16 cores Logo:",
      },
      {
        type: "text",
        content:
          "0 preto    1 azul     2 verde    3 ciano\n4 vermelho 5 magenta  6 amarelo  7 branco\n8 marrom   9 bege     10 floresta 11 agua\n12 salmao  13 roxo    14 laranja  15 cinza",
      },
      {
        type: "example",
        content: "Mostruario de todas as cores:",
        code: "pu\nsetxy -200 0\npendown\nrepeat 16 [\n  setpc repcount - 1\n  setpensize 8\n  fd 25\n]",
      },
      {
        type: "tip",
        content:
          "Experimente combinar cores com formas! Cada cor tem um numero de 0 a 15.",
      },
    ],
    challenges: [
      {
        id: "3.7.1",
        title: "Paleta de cores",
        description:
          "Desenhe um mostruario mostrando todas as 16 cores.",
        difficulty: 2,
        hints: [
          "Use repeat 16 com setpc repcount - 1 dentro.",
          "Use setpensize grande para as linhas ficarem visiveis.",
        ],
        validation: { type: "contains-commands", commands: ["setpencolor", "repeat"] },
        points: 30,
      },
    ],
  },
];
