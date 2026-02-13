"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface PanelResizerProps {
  direction: "horizontal" | "vertical";
  onResize: (delta: number) => void;
  className?: string;
}

export function PanelResizer({
  direction,
  onResize,
  className,
}: PanelResizerProps) {
  const startPos = useRef(0);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);
      startPos.current =
        direction === "horizontal" ? e.clientX : e.clientY;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const currentPos =
          direction === "horizontal"
            ? moveEvent.clientX
            : moveEvent.clientY;
        const delta = currentPos - startPos.current;
        startPos.current = currentPos;
        onResize(delta);
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [direction, onResize]
  );

  return (
    <div
      onPointerDown={handlePointerDown}
      className={cn(
        "group flex-shrink-0 select-none touch-none",
        direction === "horizontal"
          ? "w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
          : "h-1.5 cursor-row-resize hover:bg-primary/30 active:bg-primary/50",
        "transition-colors",
        className
      )}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center",
          direction === "horizontal" ? "flex-col gap-0.5" : "flex-row gap-0.5"
        )}
      >
        <div className="h-1 w-1 rounded-full bg-content-muted opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="h-1 w-1 rounded-full bg-content-muted opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="h-1 w-1 rounded-full bg-content-muted opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}
