import type { Lesson } from "@/types/curriculum";
import type { AgeGroupId } from "@/theme/age-themes";
import { MODULES } from "@/data/modules";
import { MODULE_1_LESSONS } from "./module1";
import { MODULE_2_LESSONS } from "./module2";
import { MODULE_3_LESSONS } from "./module3";
import { MODULE_4_LESSONS } from "./module4";
import { MODULE_5_LESSONS } from "./module5";

/** All lessons across all modules */
export const ALL_LESSONS: Lesson[] = [
  ...MODULE_1_LESSONS,
  ...MODULE_2_LESSONS,
  ...MODULE_3_LESSONS,
  ...MODULE_4_LESSONS,
  ...MODULE_5_LESSONS,
];

const LESSON_MAP = new Map<string, Lesson>(
  ALL_LESSONS.map((l) => [l.id, l])
);

/** Get a lesson by ID */
export function getLesson(id: string): Lesson | undefined {
  return LESSON_MAP.get(id);
}

/** Age group ordering for filtering */
const AGE_ORDER: Record<AgeGroupId, number> = {
  "6-8": 0,
  "8-10": 1,
  "10-14": 2,
};

/** Get lessons visible to a given age group */
export function getLessonsForAge(ageGroup: AgeGroupId): Lesson[] {
  const userLevel = AGE_ORDER[ageGroup];
  return ALL_LESSONS.filter(
    (l) => AGE_ORDER[l.ageGroupMin] <= userLevel
  );
}

/** Get modules visible to a given age group */
export function getModulesForAge(ageGroup: AgeGroupId) {
  const userLevel = AGE_ORDER[ageGroup];
  return MODULES.filter(
    (m) => AGE_ORDER[m.ageGroupMin] <= userLevel
  );
}

/** Get lessons for a specific module, filtered by age */
export function getModuleLessons(
  moduleId: number,
  ageGroup: AgeGroupId
): Lesson[] {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return [];
  const userLevel = AGE_ORDER[ageGroup];
  return mod.lessonIds
    .map((id) => LESSON_MAP.get(id))
    .filter((l): l is Lesson => l != null && AGE_ORDER[l.ageGroupMin] <= userLevel);
}

export { MODULES };
