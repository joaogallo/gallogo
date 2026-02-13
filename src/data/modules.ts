import type { Module } from "@/types/curriculum";

export const MODULES: Module[] = [
  {
    id: 1,
    title: "Primeiros Passos com a Tartaruga",
    description:
      "Conheca o ambiente, mova a tartaruga e desenhe suas primeiras formas.",
    ageGroupMin: "6-8",
    lessonIds: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7"],
  },
  {
    id: 2,
    title: "Alem do Basico — Liberando a Criatividade",
    description:
      "Variaveis, procedures, logica e recursao transformam a tartaruga em agente programavel.",
    ageGroupMin: "6-8",
    lessonIds: ["2.1", "2.2", "2.3", "2.4", "2.5"],
  },
  {
    id: 3,
    title: "Referencia e Aprofundamento",
    description:
      "Referencia tecnica completa: coordenadas, aritmetica, procedures avancados e cores.",
    ageGroupMin: "8-12",
    lessonIds: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7"],
  },
  {
    id: 4,
    title: "Guia do Educador — Pedagogia Logo",
    description:
      "Planos de aula e atividades para educadores ensinarem Logo.",
    ageGroupMin: "10-14",
    lessonIds: ["4.1", "4.2", "4.3", "4.4", "4.5"],
  },
  {
    id: 5,
    title: "Avaliacao e Projetos",
    description:
      "Quiz de revisao, projetos finais por faixa etaria e glossario.",
    ageGroupMin: "6-8",
    lessonIds: ["5.1", "5.2", "5.3"],
  },
];
