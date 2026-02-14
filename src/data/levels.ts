export interface LevelDefinition {
  level: number;
  name: string;
  namePt: string;
  minPoints: number;
  icon: string; // emoji for display
}

export const LEVELS: LevelDefinition[] = [
  { level: 1, name: "Beginner Turtle", namePt: "Tartaruga Iniciante", minPoints: 0, icon: "🐢" },
  { level: 2, name: "Explorer", namePt: "Explorador", minPoints: 100, icon: "🧭" },
  { level: 3, name: "Artist", namePt: "Artista", minPoints: 300, icon: "🎨" },
  { level: 4, name: "Programmer", namePt: "Programador", minPoints: 600, icon: "💻" },
  { level: 5, name: "Master", namePt: "Mestre", minPoints: 1000, icon: "⭐" },
  { level: 6, name: "Ninja", namePt: "Ninja", minPoints: 1500, icon: "🥷" },
  { level: 7, name: "Legend", namePt: "Lendário", minPoints: 2500, icon: "🏆" },
  { level: 8, name: "Logo Master", namePt: "Mestre Logo", minPoints: 4000, icon: "👑" },
  { level: 9, name: "Guru", namePt: "Guru", minPoints: 6000, icon: "🧙" },
  { level: 10, name: "Digital Architect", namePt: "Arquiteto Digital", minPoints: 10000, icon: "🏛️" },
];

/** Given a point total, return the current level definition */
export function getLevelForPoints(points: number): LevelDefinition {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) return LEVELS[i];
  }
  return LEVELS[0];
}

/** Points needed to reach the next level (0 if max level) */
export function pointsToNextLevel(points: number): {
  current: LevelDefinition;
  next: LevelDefinition | null;
  progress: number; // 0-1
  remaining: number;
} {
  const current = getLevelForPoints(points);
  const nextIdx = LEVELS.findIndex((l) => l.level === current.level) + 1;
  const next = nextIdx < LEVELS.length ? LEVELS[nextIdx] : null;

  if (!next) return { current, next: null, progress: 1, remaining: 0 };

  const rangeStart = current.minPoints;
  const rangeEnd = next.minPoints;
  const progress = (points - rangeStart) / (rangeEnd - rangeStart);
  const remaining = rangeEnd - points;

  return { current, next, progress: Math.min(progress, 1), remaining };
}
