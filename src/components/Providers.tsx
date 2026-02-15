"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { AchievementToast } from "@/components/gamification/AchievementToast";
import { GamificationLoader } from "@/components/gamification/GamificationLoader";
import { AgeGroupPicker } from "@/components/ui/AgeGroupPicker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <GamificationLoader />
        {children}
        <AchievementToast />
        <AgeGroupPicker />
      </ThemeProvider>
    </SessionProvider>
  );
}
