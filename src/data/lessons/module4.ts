import type { Lesson } from "@/types/curriculum";

/** Módulo 4: Guia do Educador — Pedagogia Logo (5 lições, referência) */
export const MODULE_4_LESSONS: Lesson[] = [
  {
    id: "4.1",
    moduleId: 4,
    order: 1,
    title: "O Poder Pedagógico do Logo",
    description:
      "Filosofia de Seymour Papert e por que Logo é ideal para ensinar programação.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Seymour Papert acreditava no construtivismo: crianças aprendem melhor CONSTRUINDO, não ouvindo.",
      },
      {
        type: "text",
        content:
          '"Raciocínio corporal" (body-syntonic reasoning): a criança se imagina como a tartaruga. "Se EU quiser virar a direita, quanto preciso girar?"',
      },
      {
        type: "text",
        content:
          "Por que Logo funciona:\n- Feedback visual imediato\n- Conexão com matemática (geometria, ângulos)\n- Progressão natural: concreto → abstrato\n- Baixa barreira de entrada, alto teto de complexidade",
      },
      {
        type: "tip",
        content:
          'Atividade: "Seja a tartaruga" — levante-se e siga instruções verbais (ande 5 passos, gire 90 graus).',
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
      "Atividades práticas para ensinar comandos básicos.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Atividades sugeridas para aula de comandos básicos:",
      },
      {
        type: "text",
        content:
          '1. "Seja a tartaruga": alunos caminham pela sala seguindo instruções\n2. Desenhar letras do alfabeto (L, T, F, E — só linhas retas)\n3. Desenhar uma casa (quadrado + triângulo)\n4. Desafio do labirinto: navegar um caminho específico\n5. Erro comum: ângulos de GIRO vs. ângulos INTERNOS de formas',
      },
      {
        type: "tip",
        content:
          "Concepção errada mais comum: para desenhar um triângulo equilátero, o giro é 120° (ângulo externo), não 60° (ângulo interno)!",
      },
    ],
    challenges: [],
  },

  {
    id: "4.3",
    moduleId: 4,
    order: 3,
    title: "Plano de Aula: Lógica de Programação",
    description:
      "Atividades para ensinar variáveis, procedures e condicionais.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Atividades sugeridas para variáveis e procedures:",
      },
      {
        type: "text",
        content:
          '1. "Receita de bolo": procedures são receitas reutilizáveis\n2. "Caixa de ferramentas": cada procedure é uma nova ferramenta\n3. Depuração guiada: encontrar erros em código dado\n4. Progressão: concreto (comandos diretos) → abstrato (variáveis + procedures)',
      },
      {
        type: "example",
        content: "Exercício de depuração — encontre o erro:",
        code: "; Este quadrado tem um erro. Qual?\nrepita 4 [pf 100 vd 80]",
      },
      {
        type: "tip",
        content:
          "O erro: vd 80 deveria ser vd 90! A forma não fecha porque 4 × 80 = 320, não 360.",
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
      "Decomposição, padrões e recursão na prática.",
    ageGroupMin: "10-14",
    commandsIntroduced: [],
    points: 20,
    steps: [
      {
        type: "text",
        content:
          "Pensamento computacional tem 4 pilares:\n1. Decomposição — dividir problemas grandes em menores\n2. Reconhecimento de padrões — encontrar repetições\n3. Abstração — ignorar detalhes irrelevantes\n4. Algoritmo — descrever passo-a-passo",
      },
      {
        type: "text",
        content:
          'Atividade: "Como desenhar uma cidade?"\nDecomposição: casa, prédio, árvore, nuvem, sol\nCada um vira um procedure separado!',
      },
      {
        type: "text",
        content:
          "Recursão visual: árvores fractais e flocos de neve são recursivos na natureza. Cada galho é uma versão menor da árvore inteira!",
      },
    ],
    challenges: [],
  },

  {
    id: "4.5",
    moduleId: 4,
    order: 5,
    title: "Plano de Aula: Criações Visuais",
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
          "1. Caleidoscópio: repeat com cores variadas\n2. Mandala: simetria com procedures\n3. Paisagem: composição de múltiplos procedures\n4. Portfolio digital: salvar e exportar desenhos",
      },
      {
        type: "example",
        content: "Caleidoscópio simples:",
        code: "repita 36 [\n  mudecor contagemrepita\n  repita 4 [pf 80 vd 90]\n  vd 10\n]",
      },
      {
        type: "try-it",
        content: "Crie seu próprio caleidoscópio variando formas e cores!",
        code: "repita 18 [\n  mudecor contagemrepita\n  repita 3 [pf 60 vd 120]\n  vd 20\n]",
      },
    ],
    challenges: [
      {
        id: "4.5.1",
        title: "Caleidoscópio",
        description:
          "Crie um caleidoscópio único com pelo menos 3 cores diferentes.",
        difficulty: 2,
        hints: [
          "Use mudecor contagemrepita dentro de um repita.",
          "Gire a forma a cada iteração.",
        ],
        validation: { type: "contains-commands", commands: ["setpencolor", "repeat"] },
        points: 35,
      },
    ],
  },
];
