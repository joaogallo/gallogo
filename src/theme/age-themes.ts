export type AgeGroupId = "6-8" | "8-10" | "10-14";

export interface AgeTheme {
  id: AgeGroupId;
  label: string;
  labelPtBr: string;
  fontFamily: "sans" | "mono";
  turtleSize: number;
  animationSpeed: number;
  showIllustrations: boolean;
  darkMode: boolean;
}

export const AGE_THEMES: Record<AgeGroupId, AgeTheme> = {
  "6-8": {
    id: "6-8",
    label: "Explorer",
    labelPtBr: "Explorador",
    fontFamily: "sans",
    turtleSize: 32,
    animationSpeed: 0.5,
    showIllustrations: true,
    darkMode: false,
  },
  "8-10": {
    id: "8-10",
    label: "Adventurer",
    labelPtBr: "Aventureiro",
    fontFamily: "sans",
    turtleSize: 24,
    animationSpeed: 1,
    showIllustrations: false,
    darkMode: false,
  },
  "10-14": {
    id: "10-14",
    label: "Hacker",
    labelPtBr: "Hacker",
    fontFamily: "mono",
    turtleSize: 16,
    animationSpeed: 2,
    showIllustrations: false,
    darkMode: true,
  },
};

export function dbAgeGroupToThemeId(
  dbValue: "AGE_6_8" | "AGE_8_10" | "AGE_10_14"
): AgeGroupId {
  const map: Record<string, AgeGroupId> = {
    AGE_6_8: "6-8",
    AGE_8_10: "8-10",
    AGE_10_14: "10-14",
  };
  return map[dbValue] ?? "8-10";
}
