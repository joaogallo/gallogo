import { create } from "zustand";
import { getLevelForPoints } from "@/data/levels";

export interface Achievement {
  id: string;
  type: "badge" | "level_up" | "points";
  title: string;
  description: string;
  icon: string;
}

interface GamificationState {
  // Points & level
  totalPoints: number;
  level: number;
  levelName: string;
  streak: number;
  lastActive: string; // ISO date

  // Badges
  earnedBadgeIds: string[];

  // Progress tracking
  completedLessonIds: string[];
  completedChallengeIds: string[];

  // Achievement toast queue
  pendingAchievements: Achievement[];

  // Loading
  loaded: boolean;

  // Actions
  setStats: (stats: {
    totalPoints: number;
    level: number;
    streak: number;
    lastActive: string;
    earnedBadgeIds: string[];
    completedLessonIds: string[];
    completedChallengeIds: string[];
  }) => void;
  addPoints: (amount: number) => void;
  addBadge: (badgeId: string, title: string, icon: string) => void;
  addCompletedLesson: (lessonId: string) => void;
  addCompletedChallenge: (challengeId: string) => void;
  levelUp: (newLevel: number, levelName: string) => void;
  shiftAchievement: () => void;
  queueAchievement: (achievement: Achievement) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  totalPoints: 0,
  level: 1,
  levelName: "Tartaruga Iniciante",
  streak: 0,
  lastActive: new Date().toISOString(),
  earnedBadgeIds: [],
  completedLessonIds: [],
  completedChallengeIds: [],
  pendingAchievements: [],
  loaded: false,

  setStats: (stats) => {
    const levelDef = getLevelForPoints(stats.totalPoints);
    set({
      totalPoints: stats.totalPoints,
      level: levelDef.level,
      levelName: levelDef.namePt,
      streak: stats.streak,
      lastActive: stats.lastActive,
      earnedBadgeIds: stats.earnedBadgeIds,
      completedLessonIds: stats.completedLessonIds,
      completedChallengeIds: stats.completedChallengeIds,
      loaded: true,
    });
  },

  addPoints: (amount) =>
    set((state) => {
      const newTotal = state.totalPoints + amount;
      const levelDef = getLevelForPoints(newTotal);
      return {
        totalPoints: newTotal,
        level: levelDef.level,
        levelName: levelDef.namePt,
      };
    }),

  addCompletedLesson: (lessonId) =>
    set((state) =>
      state.completedLessonIds.includes(lessonId)
        ? state
        : { completedLessonIds: [...state.completedLessonIds, lessonId] }
    ),

  addCompletedChallenge: (challengeId) =>
    set((state) =>
      state.completedChallengeIds.includes(challengeId)
        ? state
        : { completedChallengeIds: [...state.completedChallengeIds, challengeId] }
    ),

  addBadge: (badgeId, title, icon) =>
    set((state) => ({
      earnedBadgeIds: [...state.earnedBadgeIds, badgeId],
      pendingAchievements: [
        ...state.pendingAchievements,
        {
          id: crypto.randomUUID(),
          type: "badge",
          title,
          description: "Nova conquista desbloqueada!",
          icon,
        },
      ],
    })),

  levelUp: (newLevel, levelName) =>
    set((state) => ({
      level: newLevel,
      levelName,
      pendingAchievements: [
        ...state.pendingAchievements,
        {
          id: crypto.randomUUID(),
          type: "level_up",
          title: `Nivel ${newLevel}: ${levelName}`,
          description: "Voce subiu de nivel!",
          icon: "🎉",
        },
      ],
    })),

  shiftAchievement: () =>
    set((state) => ({
      pendingAchievements: state.pendingAchievements.slice(1),
    })),

  queueAchievement: (achievement) =>
    set((state) => ({
      pendingAchievements: [...state.pendingAchievements, achievement],
    })),
}));
