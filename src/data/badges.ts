export interface BadgeDefinition {
  id: string;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  icon: string;
  category: "milestone" | "streak" | "completion" | "fun";
}

export const BADGES: BadgeDefinition[] = [
  // ── Milestones ──
  {
    id: "first_step",
    name: "First Step",
    namePt: "Primeiro Passo",
    description: "Complete your first lesson",
    descriptionPt: "Complete sua primeira licao",
    icon: "👣",
    category: "milestone",
  },
  {
    id: "square_master",
    name: "Square Master",
    namePt: "Mestre do Quadrado",
    description: "Draw a perfect square",
    descriptionPt: "Desenhe um quadrado perfeito",
    icon: "⬜",
    category: "milestone",
  },
  {
    id: "triangle_master",
    name: "Triangle Master",
    namePt: "Mestre do Triangulo",
    description: "Draw a triangle",
    descriptionPt: "Desenhe um triangulo",
    icon: "🔺",
    category: "milestone",
  },
  {
    id: "circle_master",
    name: "Circle Master",
    namePt: "Mestre do Circulo",
    description: "Draw a circle using repeat",
    descriptionPt: "Desenhe um circulo usando repita",
    icon: "⭕",
    category: "milestone",
  },
  {
    id: "procedure_pro",
    name: "Procedure Pro",
    namePt: "Pro dos Procedimentos",
    description: "Create your first procedure",
    descriptionPt: "Crie seu primeiro procedimento",
    icon: "🔧",
    category: "milestone",
  },
  {
    id: "recursion_wizard",
    name: "Recursion Wizard",
    namePt: "Mago da Recursao",
    description: "Use recursion successfully",
    descriptionPt: "Use recursao com sucesso",
    icon: "🔄",
    category: "milestone",
  },
  {
    id: "variable_guru",
    name: "Variable Guru",
    namePt: "Guru das Variaveis",
    description: "Use variables in your code",
    descriptionPt: "Use variaveis no seu codigo",
    icon: "📦",
    category: "milestone",
  },
  {
    id: "colorful",
    name: "Colorful",
    namePt: "Colorido",
    description: "Use 5 different colors in one drawing",
    descriptionPt: "Use 5 cores diferentes em um desenho",
    icon: "🌈",
    category: "milestone",
  },

  // ── Streaks ──
  {
    id: "streak_3",
    name: "3-Day Streak",
    namePt: "3 Dias Seguidos",
    description: "Practice 3 days in a row",
    descriptionPt: "Pratique por 3 dias seguidos",
    icon: "🔥",
    category: "streak",
  },
  {
    id: "streak_7",
    name: "7-Day Streak",
    namePt: "7 Dias Seguidos",
    description: "Practice 7 days in a row",
    descriptionPt: "Pratique por 7 dias seguidos",
    icon: "💪",
    category: "streak",
  },
  {
    id: "streak_30",
    name: "30-Day Streak",
    namePt: "30 Dias Seguidos",
    description: "Practice 30 days in a row",
    descriptionPt: "Pratique por 30 dias seguidos",
    icon: "🏅",
    category: "streak",
  },

  // ── Completion ──
  {
    id: "basics_complete",
    name: "Basics Complete",
    namePt: "Basico Completo",
    description: "Complete all lessons in Module 1",
    descriptionPt: "Complete todas as licoes do Modulo 1",
    icon: "📗",
    category: "completion",
  },
  {
    id: "digital_artist",
    name: "Digital Artist",
    namePt: "Artista Digital",
    description: "Share 10 drawings in the gallery",
    descriptionPt: "Compartilhe 10 desenhos na galeria",
    icon: "🖼️",
    category: "completion",
  },
  {
    id: "challenge_hunter",
    name: "Challenge Hunter",
    namePt: "Cacador de Desafios",
    description: "Complete 20 challenges",
    descriptionPt: "Complete 20 desafios",
    icon: "🎯",
    category: "completion",
  },

  // ── Fun ──
  {
    id: "night_owl",
    name: "Night Owl",
    namePt: "Coruja Noturna",
    description: "Code after midnight",
    descriptionPt: "Programe depois da meia-noite",
    icon: "🦉",
    category: "fun",
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    namePt: "Velocidade Maxima",
    description: "Complete a challenge in under 30 seconds",
    descriptionPt: "Complete um desafio em menos de 30 segundos",
    icon: "⚡",
    category: "fun",
  },
];

export function getBadgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find((b) => b.id === id);
}
