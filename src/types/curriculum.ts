import type { AgeGroupId } from "@/theme/age-themes";

// ---- Modules & Lessons ----

export interface LessonStep {
  type: "text" | "example" | "try-it" | "tip";
  /** Markdown-ish content (rendered as plain text with code blocks) */
  content: string;
  /** Logo code for "example" and "try-it" steps */
  code?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  hints: string[];
  validation: ChallengeValidation;
  /** Points awarded on completion */
  points: number;
}

export type ChallengeValidation =
  | { type: "contains-commands"; commands: string[] }
  | { type: "output-match"; expected: string }
  | { type: "min-lines"; count: number }
  | { type: "free"; description: string };

export interface Lesson {
  id: string;
  moduleId: number;
  order: number;
  title: string;
  description: string;
  /** Minimum age group required to see this lesson */
  ageGroupMin: AgeGroupId;
  /** Lesson content steps */
  steps: LessonStep[];
  /** Challenges at the end of the lesson */
  challenges: Challenge[];
  /** Commands introduced in this lesson */
  commandsIntroduced: string[];
  /** Points for completing the lesson (reading all steps) */
  points: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  ageGroupMin: AgeGroupId;
  lessonIds: string[];
}

// ---- Progress ----

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  /** Which step the user is currently on (0-indexed) */
  currentStep: number;
  completedChallenges: string[];
}
