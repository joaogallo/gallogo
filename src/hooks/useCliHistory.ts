"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const STORAGE_KEY = "gallogo-cli-history";
const MAX_HISTORY = 100;

export function useCliHistory() {
  const [entries, setEntries] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Index into history: -1 means "not browsing", 0 = most recent
  const indexRef = useRef(-1);
  // Save the current input when user starts browsing
  const draftRef = useRef("");

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore quota errors
    }
  }, [entries]);

  const push = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;
    setEntries((prev) => {
      // Deduplicate consecutive
      const filtered = prev[0] === trimmed ? prev : [trimmed, ...prev];
      return filtered.slice(0, MAX_HISTORY);
    });
    indexRef.current = -1;
    draftRef.current = "";
  }, []);

  const navigateUp = useCallback(
    (currentInput: string): string => {
      if (entries.length === 0) return currentInput;

      if (indexRef.current === -1) {
        // Starting to browse — save current input as draft
        draftRef.current = currentInput;
        indexRef.current = 0;
        return entries[0];
      }

      if (indexRef.current < entries.length - 1) {
        indexRef.current++;
        return entries[indexRef.current];
      }

      // Already at oldest
      return entries[indexRef.current];
    },
    [entries]
  );

  const navigateDown = useCallback(
    (): string => {
      if (indexRef.current <= -1) return draftRef.current;

      if (indexRef.current > 0) {
        indexRef.current--;
        return entries[indexRef.current];
      }

      // Back to draft
      indexRef.current = -1;
      return draftRef.current;
    },
    [entries]
  );

  const resetNavigation = useCallback(() => {
    indexRef.current = -1;
    draftRef.current = "";
  }, []);

  return { entries, push, navigateUp, navigateDown, resetNavigation };
}
