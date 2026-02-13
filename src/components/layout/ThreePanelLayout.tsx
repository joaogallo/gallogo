"use client";

import { useCallback, useState, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { PanelResizer } from "./PanelResizer";

interface ThreePanelLayoutProps {
  instructions: ReactNode;
  cli: ReactNode;
  canvas: ReactNode;
}

const MIN_PANEL_PCT = 15;

function clampSizes(sizes: [number, number, number]): [number, number, number] {
  const clamped = sizes.map((s) => Math.max(MIN_PANEL_PCT, s)) as [
    number,
    number,
    number,
  ];
  const total = clamped[0] + clamped[1] + clamped[2];
  return clamped.map((s) => (s / total) * 100) as [number, number, number];
}

function getDefaultSizes(ageGroup: string): [number, number, number] {
  switch (ageGroup) {
    case "6-8":
      return [20, 30, 50];
    case "10-14":
      return [20, 45, 35];
    default:
      return [25, 35, 40];
  }
}

type ActiveTab = "instructions" | "cli" | "canvas";

export function ThreePanelLayout({
  instructions,
  cli,
  canvas,
}: ThreePanelLayoutProps) {
  const { ageGroup } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<[number, number, number]>(() =>
    getDefaultSizes(ageGroup)
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>("cli");

  const handleResize1 = useCallback(
    (delta: number) => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const deltaPct = (delta / containerWidth) * 100;
      setSizes((prev) => {
        const next: [number, number, number] = [
          prev[0] + deltaPct,
          prev[1] - deltaPct,
          prev[2],
        ];
        return clampSizes(next);
      });
    },
    []
  );

  const handleResize2 = useCallback(
    (delta: number) => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const deltaPct = (delta / containerWidth) * 100;
      setSizes((prev) => {
        const next: [number, number, number] = [
          prev[0],
          prev[1] + deltaPct,
          prev[2] - deltaPct,
        ];
        return clampSizes(next);
      });
    },
    []
  );

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "instructions", label: "Instrucoes" },
    { key: "cli", label: "Terminal" },
    { key: "canvas", label: "Canvas" },
  ];

  return (
    <>
      {/* Desktop: 3 columns side by side */}
      <div
        ref={containerRef}
        className="hidden h-full md:flex"
      >
        <div
          className="h-full min-w-0 overflow-hidden"
          style={{ width: `${sizes[0]}%` }}
        >
          {instructions}
        </div>

        <PanelResizer direction="horizontal" onResize={handleResize1} />

        <div
          className="h-full min-w-0 overflow-hidden"
          style={{ width: `${sizes[1]}%` }}
        >
          {cli}
        </div>

        <PanelResizer direction="horizontal" onResize={handleResize2} />

        <div
          className="h-full min-w-0 overflow-hidden"
          style={{ width: `${sizes[2]}%` }}
        >
          {canvas}
        </div>
      </div>

      {/* Mobile: tabs */}
      <div className="flex h-full flex-col md:hidden">
        <div className="flex border-b border-border bg-surface-secondary">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-content-muted hover:text-content-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className={cn("h-full", activeTab !== "instructions" && "hidden")}>
            {instructions}
          </div>
          <div className={cn("h-full", activeTab !== "cli" && "hidden")}>
            {cli}
          </div>
          <div className={cn("h-full", activeTab !== "canvas" && "hidden")}>
            {canvas}
          </div>
        </div>
      </div>
    </>
  );
}
