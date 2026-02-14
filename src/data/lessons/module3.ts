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
          "Estado da tartaruga: posicao (x, y) + direcao (heading em graus).\n0° = cima, 90° = direita, 180° = baixo, 270° = esquerda.",
      },
      {
        type: "text",
        content:
          "Posicionamento relativo vs. absoluto:\n- Relativo: pf, pt, vd, ve (a partir de onde esta)\n- Absoluto: mudexy, mudedirecao (posicao/direcao exata)",
      },
      {
        type: "example",
        content: "Desenhar um quadrado com mudexy (sem pf/vd):",
        code: "sc\nmudexy 50 50\nuc\nmudexy 50 -50\nmudexy -50 -50\nmudexy -50 50\nmudexy 50 50",
      },
      {
        type: "try-it",
        content: "Faca a tartaruga pular entre 4 pontos formando um X:",
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
    title: "Construcoes de Programacao Essenciais",
    description:
      "Referencia completa de variaveis, aritmetica e repeticao.",
    ageGroupMin: "8-12",
    commandsIntroduced: ["raizq", "potencia", "absoluto", "arredonde", "resto"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          'Variaveis:\nfaca "nome valor — criar\n:nome — usar\nescreva :nome — mostrar',
      },
      {
        type: "text",
        content:
          "Aritmetica: +, -, *, /\nFuncoes: raizq (raiz), potencia, absoluto, arredonde (arredondar), inteiro, resto, aleatorio",
      },
      {
        type: "example",
        content: "Funcoes matematicas em acao:",
        code: "escreva raizq 144\nescreva potencia 2 8\nescreva absoluto -5\nescreva arredonde 3.7\nescreva resto 10 3",
      },
      {
        type: "example",
        content: "Poligono com variavel para os lados:",
        code: 'faca "lados 6\nrepita :lados [pf 50 vd 360 / :lados]',
      },
      {
        type: "try-it",
        content: "Calcule a hipotenusa de um triangulo 3-4-5:",
        code: "escreva raizq (potencia 3 2) + (potencia 4 2)",
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
          "Use faca com o numero de lados, depois use 360 / :lados para o angulo.",
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
        code: "aprenda poligono :lados :tamanho\n  repita :lados [pf :tamanho vd 360 / :lados]\nfim\npoligono 5 60\npoligono 8 40",
      },
      {
        type: "example",
        content: "Flor: procedure que usa poligono:",
        code: "aprenda poligono :lados :tamanho\n  repita :lados [pf :tamanho vd 360 / :lados]\nfim\naprenda flor :petalas :tamanho\n  repita :petalas [\n    poligono 4 :tamanho\n    vd 360 / :petalas\n  ]\nfim\nflor 8 40",
      },
      {
        type: "text",
        content:
          "Recursao: um procedure que chama a si mesmo. SEMPRE precisa de condicao de parada!",
      },
      {
        type: "example",
        content: "Arvore fractal:",
        code: "aprenda arvore :tamanho :nivel\n  se :nivel < 1 [pare]\n  pf :tamanho\n  ve 30\n  arvore :tamanho * 0.7 :nivel - 1\n  vd 60\n  arvore :tamanho * 0.7 :nivel - 1\n  ve 30\n  pt :tamanho\nfim\narvore 80 5",
      },
      {
        type: "example",
        content: "Triangulo de Sierpinski:",
        code: "aprenda sierpinski :tam :nivel\n  se :nivel = 0 [repita 3 [pf :tam vd 120] pare]\n  sierpinski :tam / 2 :nivel - 1\n  pf :tam / 2\n  sierpinski :tam / 2 :nivel - 1\n  pt :tam / 2\n  ve 60\n  pf :tam / 2\n  vd 60\n  sierpinski :tam / 2 :nivel - 1\n  ve 60\n  pt :tam / 2\n  vd 60\nfim\nsierpinski 200 3",
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
          "Repita girando: repita N [petala vd 360/N].",
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
          "Condicao de parada: se :nivel < 1 [pare].",
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
        content: "Crie um arco-iris com linhas de cores diferentes!",
        code: "repita 15 [\n  mudecor contagemrepita\n  pf 80\n  pt 80\n  vd 12\n]",
      },
    ],
    challenges: [
      {
        id: "3.5.1",
        title: "Arco-iris",
        description:
          "Desenhe um arco-iris usando mudecor com cores diferentes.",
        difficulty: 2,
        hints: [
          "Use contagemrepita dentro de um repita para mudar a cor a cada iteracao.",
          "mudecor contagemrepita muda a cor para o numero da iteracao.",
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
        code: "aprenda quadrado :t\n  repita 4 [pf :t vd 90]\nfim\nrepita 12 [quadrado 60 vd 30]",
      },
      {
        type: "example",
        content: "Padrao Espiral — tamanho crescente:",
        code: "aprenda espiral_quadrada :t :n\n  se :n < 1 [pare]\n  pf :t\n  vd 90\n  espiral_quadrada :t + 5 :n - 1\nfim\nespiral_quadrada 10 40",
      },
      {
        type: "try-it",
        content: "Crie uma mandala com multiplos poligonos girados:",
        code: "aprenda poli :l :t\n  repita :l [pf :t vd 360 / :l]\nfim\nrepita 6 [\n  mudecor contagemrepita + 1\n  poli 6 50\n  vd 60\n]",
      },
    ],
    challenges: [
      {
        id: "3.6.1",
        title: "Mandala",
        description: "Crie uma mandala simetrica com procedures e repita.",
        difficulty: 3,
        hints: [
          "Crie um procedure para uma forma basica.",
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
    title: "Sistema de Cores — Referencia Completa",
    description:
      "Paleta de 16 cores, uso avancado de mudecor.",
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
        code: "sc\nmudexy -200 0\nuc\nrepita 16 [\n  mudecor contagemrepita - 1\n  tc 8\n  pf 25\n]",
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
          "Use repita 16 com mudecor contagemrepita - 1 dentro.",
          "Use tc grande para as linhas ficarem visiveis.",
        ],
        validation: { type: "contains-commands", commands: ["setpencolor", "repeat"] },
        points: 30,
      },
    ],
  },
];
