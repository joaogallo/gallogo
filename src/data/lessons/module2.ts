import type { Lesson } from "@/types/curriculum";

/** Modulo 2: Alem do Basico — Liberando a Criatividade (5 licoes) */
export const MODULE_2_LESSONS: Lesson[] = [
  {
    id: "2.1",
    moduleId: 2,
    order: 1,
    title: "Superpoderes para Sua Tartaruga",
    description:
      "Visao geral dos conceitos avancados: variaveis, procedures e logica.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Ate agora voce deu comandos diretos para a tartaruga. Agora ela vai ganhar superpoderes!",
      },
      {
        type: "text",
        content:
          "Memoria (variaveis) — a tartaruga vai lembrar numeros e valores\nHabilidades (procedures) — voce vai inventar novos comandos\nInteligencia (logica) — a tartaruga vai tomar decisoes sozinha",
      },
      {
        type: "text",
        content:
          "Com esses poderes, voce vai criar desenhos que se adaptam, padroes que se repetem e arte que muda sozinha!",
      },
    ],
    challenges: [],
  },

  {
    id: "2.2",
    moduleId: 2,
    order: 2,
    title: "Dando Memoria a Tartaruga: Variaveis",
    description:
      "Caixas de memoria nomeadas para guardar valores e reutilizar.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["faca", "escreva", "aleatorio"],
    points: 40,
    steps: [
      {
        type: "text",
        content:
          'Uma variavel e como uma "caixa" com nome onde guardamos um valor. Assim a tartaruga lembra de coisas!',
      },
      {
        type: "text",
        content:
          'faca "nome valor — criar ou mudar uma variavel\n:nome — usar o valor guardado (dois pontos antes do nome)\nescreva :nome — mostrar o valor no terminal',
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
          "Voce tambem pode fazer contas! Operadores: +, -, *, /",
      },
      {
        type: "example",
        content: "Calcular e mostrar o perimetro de um quadrado:",
        code: 'faca "lado 80\nrepita 4 [pf :lado vd 90]\nescreva :lado * 4',
      },
      {
        type: "text",
        content:
          "random N gera um numero aleatorio de 0 a N-1. Otimo para surpresas!",
      },
      {
        type: "try-it",
        content: "Mova a tartaruga um tamanho aleatorio:",
        code: "pf aleatorio 200\nvd aleatorio 360",
      },
    ],
    challenges: [
      {
        id: "2.2.1",
        title: "Quadrado variavel",
        description:
          'Crie uma variavel "lado" e desenhe um quadrado com ela.',
        difficulty: 1,
        hints: [
          'Use faca "lado 100 para criar a variavel.',
          "Depois: repita 4 [pf :lado vd 90]",
        ],
        validation: { type: "contains-commands", commands: ["make"] },
        points: 25,
      },
      {
        id: "2.2.2",
        title: "Dois quadrados",
        description:
          "Mude o valor da variavel e desenhe outro quadrado diferente.",
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
        title: "Linha aleatoria",
        description: "Use random para desenhar uma linha de tamanho surpresa.",
        difficulty: 1,
        hints: [
          "random 200 gera um numero de 0 a 199.",
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
      "Crie comandos personalizados reutilizaveis com to...end.",
    ageGroupMin: "6-8",
    commandsIntroduced: ["aprenda", "fim"],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          'Um procedure e um "novo comando" que voce inventa. Em vez de repetir os mesmos comandos, voce da um nome para eles!',
      },
      {
        type: "example",
        content: "Criando o comando 'quadrado':",
        code: "aprenda quadrado\n  repita 4 [pf 100 vd 90]\nfim",
      },
      {
        type: "text",
        content:
          "Agora basta digitar 'quadrado' para desenhar! E voce pode adicionar parametros:",
      },
      {
        type: "example",
        content: "Procedure com parametro de tamanho:",
        code: "aprenda quadrado :tamanho\n  repita 4 [pf :tamanho vd 90]\nfim\nquadrado 100\nquadrado 50",
      },
      {
        type: "text",
        content:
          "Procedures podem chamar outros procedures! Isso se chama composicao.",
      },
      {
        type: "example",
        content: "Em portugues (aprenda...fim):",
        code: "aprenda triangulo :tam\n  repita 3 [pf :tam vd 120]\nfim\ntriangulo 80",
      },
      {
        type: "tip",
        content:
          "Recursao: um procedure que chama a si mesmo! Precisa de uma condicao de parada.",
      },
      {
        type: "example",
        content: "Espiral recursiva (avancado):",
        code: "aprenda espiral :tamanho\n  se :tamanho < 1 [pare]\n  pf :tamanho\n  vd 20\n  espiral :tamanho * 0.95\nfim\nespiral 200",
      },
    ],
    challenges: [
      {
        id: "2.3.1",
        title: "Meu primeiro procedure",
        description:
          "Crie um procedure 'quadrado' com parametro de tamanho.",
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
          "Crie um procedure 'casa' que desenha um quadrado com um triangulo em cima.",
        difficulty: 2,
        hints: [
          "Desenhe o quadrado primeiro, depois o triangulo.",
          "O triangulo fica em cima: fd para subir, depois repeat 3 [fd :tam rt 120].",
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
          "Apos cada quadrado, mova a tartaruga para o lado com sc.",
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
    title: "Dando Inteligencia: Logica e Decisoes",
    description:
      "Faca a tartaruga tomar decisoes com if e comparacoes.",
    ageGroupMin: "8-12",
    commandsIntroduced: ["se", "sesenao", "pare"],
    points: 50,
    steps: [
      {
        type: "text",
        content:
          "Agora a tartaruga vai pensar! Com 'if', ela executa comandos apenas se uma condicao for verdadeira.",
      },
      {
        type: "text",
        content:
          "se condicao [comandos] — executa se verdadeiro\nComparacoes: < (menor), > (maior), = (igual)",
      },
      {
        type: "example",
        content: "Se o tamanho for grande, usar caneta grossa:",
        code: 'faca "tamanho 150\nse :tamanho > 100 [tc 5]\nrepita 4 [pf :tamanho vd 90]',
      },
      {
        type: "text",
        content:
          "sesenao condicao [se-verdadeiro] [se-falso] — escolhe entre duas opcoes.",
      },
      {
        type: "example",
        content: "Caminhada aleatoria com parada condicional:",
        code: "aprenda caminhar :passos\n  se :passos < 1 [pare]\n  pf 10 + aleatorio 20\n  vd -45 + aleatorio 90\n  caminhar :passos - 1\nfim\ncaminhar 30",
      },
      {
        type: "try-it",
        content:
          "Desenhe poligonos diferentes baseado em uma variavel 'lados':",
        code: 'faca "lados 5\nrepita :lados [pf 60 vd 360 / :lados]',
      },
    ],
    challenges: [
      {
        id: "2.4.1",
        title: "Condicional simples",
        description:
          "Use if para desenhar um quadrado so se a variavel 'tamanho' for maior que 50.",
        difficulty: 2,
        hints: [
          "Crie a variavel com faca, depois use se :tamanho > 50 [...].",
        ],
        validation: { type: "contains-commands", commands: ["if"] },
        points: 30,
      },
      {
        id: "2.4.2",
        title: "Caminhada aleatoria",
        description:
          "Crie uma caminhada aleatoria com random e parada condicional.",
        difficulty: 3,
        hints: [
          "Use recursao: o procedure chama a si mesmo com passos - 1.",
          "Condicao de parada: se :passos < 1 [pare].",
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
      "Consolidacao: movimentos, caneta, repeat, variaveis, procedures e logica.",
    ageGroupMin: "6-8",
    commandsIntroduced: [],
    points: 30,
    steps: [
      {
        type: "text",
        content:
          "Parabens! Voce agora sabe os fundamentos de QUALQUER linguagem de programacao!",
      },
      {
        type: "text",
        content:
          "O que voce aprendeu e universal:\n- Variaveis -> existem em Python, JavaScript, etc.\n- Procedures -> funcoes em Python, metodos em Java\n- Repeat -> loops em qualquer linguagem\n- If -> condicionais em qualquer linguagem",
      },
      {
        type: "text",
        content:
          "No proximo modulo: referencia completa de comandos, cores, e projetos criativos avancados!",
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
        validation: { type: "free", description: "Cena com multiplos procedures." },
        points: 50,
      },
    ],
  },
];
