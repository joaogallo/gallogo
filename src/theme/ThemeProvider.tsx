"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import {
  AGE_THEMES,
  dbAgeGroupToThemeId,
  type AgeGroupId,
  type AgeTheme,
} from "./age-themes";

const STORAGE_KEY = "gallogo-age-group";

function isValidAgeGroup(value: string | null): value is AgeGroupId {
  return value === "6-8" || value === "8-10" || value === "10-14";
}

interface ThemeContextValue {
  ageGroup: AgeGroupId;
  theme: AgeTheme;
  setAgeGroup: (id: AgeGroupId) => void;
  showAgeModal: boolean;
  ageModalDismissable: boolean;
  openAgeModal: () => void;
  closeAgeModal: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  ageGroup: "8-10",
  theme: AGE_THEMES["8-10"],
  setAgeGroup: () => {},
  showAgeModal: false,
  ageModalDismissable: false,
  openAgeModal: () => {},
  closeAgeModal: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [ageGroup, setAgeGroupState] = useState<AgeGroupId>("8-10");
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageModalDismissable, setAgeModalDismissable] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize from localStorage or session on mount
  useEffect(() => {
    if (initialized) return;

    const stored = localStorage.getItem(STORAGE_KEY);

    // If user is logged in, use their DB ageGroup
    if (session?.user?.ageGroup) {
      const sessionAge = dbAgeGroupToThemeId(
        session.user.ageGroup as "AGE_6_8" | "AGE_8_10" | "AGE_10_14"
      );
      setAgeGroupState(sessionAge);
      localStorage.setItem(STORAGE_KEY, sessionAge);
      document.documentElement.setAttribute("data-age-group", sessionAge);
      setInitialized(true);
      return;
    }

    // If localStorage has a valid value, use it
    if (isValidAgeGroup(stored)) {
      setAgeGroupState(stored);
      document.documentElement.setAttribute("data-age-group", stored);
      setInitialized(true);
      return;
    }

    // No preference found — show modal
    setShowAgeModal(true);
    setInitialized(true);
  }, [session, initialized]);

  // Sync data-age-group attribute on changes
  useEffect(() => {
    document.documentElement.setAttribute("data-age-group", ageGroup);
  }, [ageGroup]);

  const setAgeGroup = useCallback((id: AgeGroupId) => {
    setAgeGroupState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const openAgeModal = useCallback(() => {
    setAgeModalDismissable(true);
    setShowAgeModal(true);
  }, []);

  const closeAgeModal = useCallback(() => {
    setShowAgeModal(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ageGroup,
        theme: AGE_THEMES[ageGroup],
        setAgeGroup,
        showAgeModal,
        ageModalDismissable,
        openAgeModal,
        closeAgeModal,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
