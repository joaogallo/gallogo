import type { Lesson } from "@/types/curriculum";

/** Modulo 4: Guia do Educador — Pedagogia Logo (5 licoes, referencia) */
export const MODULE_4_LESSONS: Lesson[] = [
  {
    id: "4.1",
    moduleId: 4,
    order: 1,
    title: "O Poder Pedagogico do Logo",
    description:
      "Filosofia de Seymour Papert e por que Logo e ideal para ensinar programacao.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Seymour Papert acreditava no construtivismo: criancas aprendem melhor CONSTRUINDO, nao ouvindo.",
      },
      {
        type: "text",
        content:
          '"Raciocinio corporal" (body-syntonic reasoning): a crianca se imagina como a tartaruga. "Se EU quiser virar a direita, quanto preciso girar?"',
      },
      {
        type: "text",
        content:
          "Por que Logo funciona:\n- Feedback visual imediato\n- Conexao com matematica (geometria, angulos)\n- Progressao natural: concreto → abstrato\n- Baixa barreira de entrada, alto teto de complexidade",
      },
      {
        type: "tip",
        content:
          'Atividade: "Seja a tartaruga" — levante-se e siga instrucoes verbais (ande 5 passos, gire 90 graus).',
      },
    ],
    challenges: [],
  },

  {
    id: "4.2",
    moduleId: 4,
    order: 2,
    title: "Plano de Aula: Turtle Graphics",
    description:
      "Atividades praticas para ensinar comandos basicos.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Atividades sugeridas para aula de comandos basicos:",
      },
      {
        type: "text",
        content:
          '1. "Seja a tartaruga": alunos caminham pela sala seguindo instrucoes\n2. Desenhar letras do alfabeto (L, T, F, E — so linhas retas)\n3. Desenhar uma casa (quadrado + triangulo)\n4. Desafio do labirinto: navegar um caminho especifico\n5. Erro comum: angulos de GIRO vs. angulos INTERNOS de formas',
      },
      {
        type: "tip",
        content:
          "Concepcao errada mais comum: para desenhar um triangulo equilatero, o giro e 120° (angulo externo), nao 60° (angulo interno)!",
      },
    ],
    challenges: [],
  },

  {
    id: "4.3",
    moduleId: 4,
    order: 3,
    title: "Plano de Aula: Logica de Programacao",
    description:
      "Atividades para ensinar variaveis, procedures e condicionais.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Atividades sugeridas para variaveis e procedures:",
      },
      {
        type: "text",
        content:
          '1. "Receita de bolo": procedures sao receitas reutilizaveis\n2. "Caixa de ferramentas": cada procedure e uma nova ferramenta\n3. Depuracao guiada: encontrar erros em codigo dado\n4. Progressao: concreto (comandos diretos) → abstrato (variaveis + procedures)',
      },
      {
        type: "example",
        content: "Exercicio de depuracao — encontre o erro:",
        code: "; Este quadrado tem um erro. Qual?\nrepita 4 [pf 100 vd 80]",
      },
      {
        type: "tip",
        content:
          "O erro: vd 80 deveria ser vd 90! A forma nao fecha porque 4 × 80 = 320, nao 360.",
      },
    ],
    challenges: [],
  },

  {
    id: "4.4",
    moduleId: 4,
    order: 4,
    title: "Plano de Aula: Pensamento Computacional",
    description:
      "Decomposicao, padroes e recursao na pratica.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Pensamento computacional tem 4 pilares:\n1. Decomposicao — dividir problemas grandes em menores\n2. Reconhecimento de padroes — encontrar repeticoes\n3. Abstracao — ignorar detalhes irrelevantes\n4. Algoritmo — descrever passo-a-passo",
      },
      {
        type: "text",
        content:
          'Atividade: "Como desenhar uma cidade?"\nDecomposicao: casa, predio, arvore, nuvem, sol\nCada um vira um procedure separado!',
      },
      {
        type: "text",
        content:
          "Recursao visual: arvores fractais e flocos de neve sao recursivos na natureza. Cada galho e uma versao menor da arvore inteira!",
      },
    ],
    challenges: [],
  },

  {
    id: "4.5",
    moduleId: 4,
    order: 5,
    title: "Plano de Aula: Criacoes Visuais",
    description:
      "Projetos criativos combinando tudo aprendido.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Projetos visuais sugeridos:",
      },
      {
        type: "text",
        content:
          "1. Caleidoscopio: repeat com cores variadas\n2. Mandala: simetria com procedures\n3. Paisagem: composicao de multiplos procedures\n4. Portfolio digital: salvar e exportar desenhos",
      },
      {
        type: "example",
        content: "Caleidoscopio simples:",
        code: "repita 36 [\n  mudecor contagemrepita\n  repita 4 [pf 80 vd 90]\n  vd 10\n]",
      },
      {
        type: "try-it",
        content: "Crie seu proprio caleidoscopio variando formas e cores!",
        code: "repita 18 [\n  mudecor contagemrepita\n  repita 3 [pf 60 vd 120]\n  vd 20\n]",
      },
    ],
    challenges: [
      {
        id: "4.5.1",
        title: "Caleidoscopio",
        description:
          "Crie um caleidoscopio unico com pelo menos 3 cores diferentes.",
        difficulty: 2,
        hints: [
          "Use mudecor contagemrepita dentro de um repita.",
          "Gire a forma a cada iteracao.",
        ],
        validation: { type: "contains-commands", commands: ["setpencolor", "repeat"] },
        points: 35,
      },
    ],
  },
];
