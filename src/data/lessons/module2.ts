import type { Lesson } from "@/types/curriculum";

/** Módulo 2: Além do Básico — Liberando a Criatividade (5 lições) */
export const MODULE_2_LESSONS: Lesson[] = [
  {
    id: "2.1",
    moduleId: 2,
    order: 1,
    title: "Superpoderes para Sua Tartaruga",
    description:
      "Visão geral dos conceitos avançados: variáveis, procedures e lógica.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Até agora você deu comandos diretos para a tartaruga. Agora ela vai ganhar superpoderes!",
      },
      {
        type: "text",
        content:
          "Memória (variáveis) — a tartaruga vai lembrar números e valores\nHabilidades (procedures) — você vai inventar novos comandos\nInteligência (lógica) — a tartaruga vai tomar decisões sozinha",
      },
      {
        type: "text",
        content:
          "Com esses poderes, você vai criar desenhos que se adaptam, padrões que se repetem e arte que muda sozinha!",
      },
    ],
    challenges: [],
  },

  {
    id: "2.2",
    moduleId: 2,
    order: 2,
    title: "Dando Memória à Tartaruga: Variáveis",
    description:
      "Caixas de memória nomeadas para guardar valores e reutilizar.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["faca", "escreva", "aleatorio"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          'Uma variável é como uma "caixa" com nome onde guardamos um valor. Assim a tartaruga lembra de coisas!',
      },
      {
        type: "text",
        content:
          'faca "nome valor — criar ou mudar uma variável\n:nome — usar o valor guardado (dois pontos antes do nome)\nescreva :nome — mostrar o valor no terminal',
      },
      {
        type: "example",
        content: "Guardar um tamanho e usar no desenho:",
        code: 'faca "tamanho 100\npf :tamanho\nvd 90\npf :tamanho',
      },
      {
        type: "example",
        content: "Mudar o valor e desenhar de novo:",
        code: 'faca "tamanho 50\nrepita 4 [pf :tamanho vd 90]',
      },
      {
        type: "text",
        content:
          "Você também pode fazer contas! Operadores: +, -, *, /",
      },
      {
        type: "example",
        content: "Calcular e mostrar o perímetro de um quadrado:",
        code: 'faca "lado 80\nrepita 4 [pf :lado vd 90]\nescreva :lado * 4',
      },
      {
        type: "text",
        content:
          "random N gera um número aleatório de 0 a N-1. Ótimo para surpresas!",
      },
      {
        type: "try-it",
        content: "Mova a tartaruga um tamanho aleatório:",
        code: "pf aleatorio 200\nvd aleatorio 360",
      },
    ],
    challenges: [
      {
        id: "2.2.1",
        title: "Quadrado variável",
        description:
          'Crie uma variável "lado" e desenhe um quadrado com ela.',
        difficulty: 1,
        hints: [
          'Use faca "lado 100 para criar a variável.',
          "Depois: repita 4 [pf :lado vd 90]",
        ],
        validation: { type: "contains-commands", commands: ["make"] },
        points: 25,
      },
      {
        id: "2.2.2",
        title: "Dois quadrados",
        description:
          "Mude o valor da variável e desenhe outro quadrado diferente.",
        difficulty: 2,
        hints: [
          "Desenhe o primeiro quadrado, depois use faca com um valor diferente.",
          "Dica: mova a tartaruga entre os quadrados com sc e uc.",
        ],
        validation: { type: "contains-commands", commands: ["make"] },
        points: 30,
      },
      {
        id: "2.2.3",
        title: "Linha aleatória",
        description: "Use random para desenhar uma linha de tamanho surpresa.",
        difficulty: 1,
        hints: [
          "random 200 gera um número de 0 a 199.",
          "pf aleatorio 200",
        ],
        validation: { type: "contains-commands", commands: ["random"] },
        points: 20,
      },
    ],
  },

  {
    id: "2.3",
    moduleId: 2,
    order: 3,
    title: "Clonando Habilidades: Criando Procedures",
    description:
      "Crie comandos personalizados reutilizáveis com to...end.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["aprenda", "fim"],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          'Um procedure é um "novo comando" que você inventa. Em vez de repetir os mesmos comandos, você dá um nome para eles!',
      },
      {
        type: "example",
        content: "Criando o comando 'quadrado':",
        code: "aprenda quadrado\n  repita 4 [pf 100 vd 90]\nfim",
      },
      {
        type: "text",
        content:
          "Agora basta digitar 'quadrado' para desenhar! E você pode adicionar parâmetros:",
      },
      {
        type: "example",
        content: "Procedure com parâmetro de tamanho:",
        code: "aprenda quadrado :tamanho\n  repita 4 [pf :tamanho vd 90]\nfim\nquadrado 100\nquadrado 50",
      },
      {
        type: "text",
        content:
          "Procedures podem chamar outros procedures! Isso se chama composição.",
      },
      {
        type: "example",
        content: "Em português (aprenda...fim):",
        code: "aprenda triangulo :tam\n  repita 3 [pf :tam vd 120]\nfim\ntriangulo 80",
      },
      {
        type: "tip",
        content:
          "Recursão: um procedure que chama a si mesmo! Precisa de uma condição de parada.",
      },
      {
        type: "example",
        content: "Espiral recursiva (avançado):",
        code: "aprenda espiral :tamanho\n  se :tamanho < 1 [pare]\n  pf :tamanho\n  vd 20\n  espiral :tamanho * 0.95\nfim\nespiral 200",
      },
    ],
    challenges: [
      {
        id: "2.3.1",
        title: "Meu primeiro procedure",
        description:
          "Crie um procedure 'quadrado' com parâmetro de tamanho.",
        difficulty: 2,
        hints: [
          "Comece com: aprenda quadrado :tamanho",
          "Dentro: repita 4 [pf :tamanho vd 90]",
          "Termine com: fim",
        ],
        validation: { type: "contains-commands", commands: ["to"] },
        points: 30,
      },
      {
        id: "2.3.2",
        title: "Casa Logo",
        description:
          "Crie um procedure 'casa' que desenha um quadrado com um triângulo em cima.",
        difficulty: 2,
        hints: [
          "Desenhe o quadrado primeiro, depois o triângulo.",
          "O triângulo fica em cima: fd para subir, depois repeat 3 [fd :tam rt 120].",
        ],
        validation: { type: "contains-commands", commands: ["to"] },
        points: 35,
      },
      {
        id: "2.3.3",
        title: "Fileira de quadrados",
        description:
          "Crie um procedure que desenha 5 quadrados lado a lado.",
        difficulty: 3,
        hints: [
          "Use o procedure quadrado dentro de um repeat.",
          "Após cada quadrado, mova a tartaruga para o lado com sc.",
        ],
        validation: { type: "contains-commands", commands: ["to", "repeat"] },
        points: 40,
      },
    ],
  },

  {
    id: "2.4",
    moduleId: 2,
    order: 4,
    title: "Dando Inteligência: Lógica e Decisões",
    description:
      "Faça a tartaruga tomar decisões com if e comparações.",
    ageGroupMin: "8-12",
    commandsIntroduced: ["se", "sesenao", "pare"],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          "Agora a tartaruga vai pensar! Com 'if', ela executa comandos apenas se uma condição for verdadeira.",
      },
      {
        type: "text",
        content:
          "se condição [comandos] — executa se verdadeiro\nComparações: < (menor), > (maior), = (igual)",
      },
      {
        type: "example",
        content: "Se o tamanho for grande, usar caneta grossa:",
        code: 'faca "tamanho 150\nse :tamanho > 100 [tc 5]\nrepita 4 [pf :tamanho vd 90]',
      },
      {
        type: "text",
        content:
          "sesenao condição [se-verdadeiro] [se-falso] — escolhe entre duas opções.",
      },
      {
        type: "example",
        content: "Caminhada aleatória com parada condicional:",
        code: "aprenda caminhar :passos\n  se :passos < 1 [pare]\n  pf 10 + aleatorio 20\n  vd -45 + aleatorio 90\n  caminhar :passos - 1\nfim\ncaminhar 30",
      },
      {
        type: "try-it",
        content:
          "Desenhe polígonos diferentes baseado em uma variável 'lados':",
        code: 'faca "lados 5\nrepita :lados [pf 60 vd 360 / :lados]',
      },
    ],
    challenges: [
      {
        id: "2.4.1",
        title: "Condicional simples",
        description:
          "Use if para desenhar um quadrado só se a variável 'tamanho' for maior que 50.",
        difficulty: 2,
        hints: [
          "Crie a variável com faca, depois use se :tamanho > 50 [...].",
        ],
        validation: { type: "contains-commands", commands: ["if"] },
        points: 30,
      },
      {
        id: "2.4.2",
        title: "Caminhada aleatória",
        description:
          "Crie uma caminhada aleatória com random e parada condicional.",
        difficulty: 3,
        hints: [
          "Use recursão: o procedure chama a si mesmo com passos - 1.",
          "Condição de parada: se :passos < 1 [pare].",
        ],
        validation: { type: "contains-commands", commands: ["random", "if"] },
        points: 40,
      },
    ],
  },

  {
    id: "2.5",
    moduleId: 2,
    order: 5,
    title: "Sua Jornada como Programador",
    description:
      "Consolidação: movimentos, caneta, repeat, variáveis, procedures e lógica.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Parabéns! Você agora sabe os fundamentos de QUALQUER linguagem de programação!",
      },
      {
        type: "text",
        content:
          "O que você aprendeu é universal:\n- Variáveis -> existem em Python, JavaScript, etc.\n- Procedures -> funções em Python, métodos em Java\n- Repeat -> loops em qualquer linguagem\n- If -> condicionais em qualquer linguagem",
      },
      {
        type: "text",
        content:
          "No próximo módulo: referência completa de comandos, cores, e projetos criativos avançados!",
      },
      {
        type: "tip",
        content:
          "Projeto final: crie uma cena completa (casa + sol + grama) usando procedures!",
      },
    ],
    challenges: [
      {
        id: "2.5.1",
        title: "Projeto: Cena completa",
        description:
          "Crie uma cena com pelo menos 3 procedures diferentes (ex: casa, sol, grama).",
        difficulty: 3,
        hints: [
          "Crie procedures separados: aprenda casa, aprenda sol, aprenda grama.",
          "Use mudexy e sc para posicionar cada elemento.",
          "Combine tudo no final chamando cada procedure.",
        ],
        validation: { type: "free", description: "Cena com múltiplos procedures." },
        points: 50,
      },
    ],
  },
];
