"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AGE_THEMES, type AgeGroupId, type AgeTheme } from "./age-themes";

interface ThemeContextValue {
  ageGroup: AgeGroupId;
  theme: AgeTheme;
  setAgeGroup: (id: AgeGroupId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  ageGroup: "8-12",
  theme: AGE_THEMES["8-12"],
  setAgeGroup: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  defaultAgeGroup = "8-12",
  children,
}: {
  defaultAgeGroup?: AgeGroupId;
  children: ReactNode;
}) {
  const [ageGroup, setAgeGroup] = useState<AgeGroupId>(defaultAgeGroup);

  useEffect(() => {
    document.documentElement.setAttribute("data-age-group", ageGroup);
  }, [ageGroup]);

  return (
    <ThemeContext.Provider
      value={{
        ageGroup,
        theme: AGE_THEMES[ageGroup],
        setAgeGroup,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
