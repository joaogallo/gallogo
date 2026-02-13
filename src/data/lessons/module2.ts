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
    commandsIntroduced: ["make", "print", "random"],
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
          'make "nome valor — criar ou mudar uma variavel\n:nome — usar o valor guardado (dois pontos antes do nome)\nprint :nome — mostrar o valor no terminal',
      },
      {
        type: "example",
        content: "Guardar um tamanho e usar no desenho:",
        code: 'make "tamanho 100\nfd :tamanho\nrt 90\nfd :tamanho',
      },
      {
        type: "example",
        content: "Mudar o valor e desenhar de novo:",
        code: 'make "tamanho 50\nrepeat 4 [fd :tamanho rt 90]',
      },
      {
        type: "text",
        content:
          "Voce tambem pode fazer contas! Operadores: +, -, *, /",
      },
      {
        type: "example",
        content: "Calcular e mostrar o perimetro de um quadrado:",
        code: 'make "lado 80\nrepeat 4 [fd :lado rt 90]\nprint :lado * 4',
      },
      {
        type: "text",
        content:
          "random N gera um numero aleatorio de 0 a N-1. Otimo para surpresas!",
      },
      {
        type: "try-it",
        content: "Mova a tartaruga um tamanho aleatorio:",
        code: "fd random 200\nrt random 360",
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
          'Use make "lado 100 para criar a variavel.',
          "Depois: repeat 4 [fd :lado rt 90]",
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
          "Desenhe o primeiro quadrado, depois faca make com um valor diferente.",
          "Dica: mova a tartaruga entre os quadrados com pu e pendown.",
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
          "fd random 200",
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
    commandsIntroduced: ["to", "end"],
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
        code: "to quadrado\n  repeat 4 [fd 100 rt 90]\nend",
      },
      {
        type: "text",
        content:
          "Agora basta digitar 'quadrado' para desenhar! E voce pode adicionar parametros:",
      },
      {
        type: "example",
        content: "Procedure com parametro de tamanho:",
        code: "to quadrado :tamanho\n  repeat 4 [fd :tamanho rt 90]\nend\nquadrado 100\nquadrado 50",
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
        code: "to espiral :tamanho\n  if :tamanho < 1 [stop]\n  fd :tamanho\n  rt 20\n  espiral :tamanho * 0.95\nend\nespiral 200",
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
          "Comece com: to quadrado :tamanho",
          "Dentro: repeat 4 [fd :tamanho rt 90]",
          "Termine com: end",
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
          "Apos cada quadrado, mova a tartaruga para o lado com pu.",
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
    commandsIntroduced: ["if", "ifelse", "stop"],
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
          "if condicao [comandos] — executa se verdadeiro\nComparacoes: < (menor), > (maior), = (igual)",
      },
      {
        type: "example",
        content: "Se o tamanho for grande, usar caneta grossa:",
        code: 'make "tamanho 150\nif :tamanho > 100 [setpensize 5]\nrepeat 4 [fd :tamanho rt 90]',
      },
      {
        type: "text",
        content:
          "ifelse condicao [se-verdadeiro] [se-falso] — escolhe entre duas opcoes.",
      },
      {
        type: "example",
        content: "Caminhada aleatoria com parada condicional:",
        code: "to caminhar :passos\n  if :passos < 1 [stop]\n  fd 10 + random 20\n  rt -45 + random 90\n  caminhar :passos - 1\nend\ncaminhar 30",
      },
      {
        type: "try-it",
        content:
          "Desenhe poligonos diferentes baseado em uma variavel 'lados':",
        code: 'make "lados 5\nrepeat :lados [fd 60 rt 360 / :lados]',
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
          "Crie a variavel com make, depois use if :tamanho > 50 [...].",
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
          "Condicao de parada: if :passos < 1 [stop].",
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
          "Crie procedures separados: to casa, to sol, to grama.",
          "Use setxy e pu para posicionar cada elemento.",
          "Combine tudo no final chamando cada procedure.",
        ],
        validation: { type: "free", description: "Cena com multiplos procedures." },
        points: 50,
      },
    ],
  },
];
