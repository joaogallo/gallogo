"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import { useCanvasStore } from "@/stores/canvas-store";
import type { DrawCommand, TurtleState } from "@/logo/types";

export function CanvasPanel() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawCommands = useCanvasStore((s) => s.drawCommands);
  const turtle = useCanvasStore((s) => s.turtle);

  const render = useCallback(
    (commands: DrawCommand[], turtleState: TurtleState) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Draw subtle grid
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = cx % gridSize; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = cy % gridSize; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw axes
      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      // Helper: Logo coords (origin center, y-up) → canvas coords (y-down)
      const toCanvas = (lx: number, ly: number): [number, number] => [
        cx + lx,
        cy - ly,
      ];

      // Draw all line commands
      for (const cmd of commands) {
        if (cmd.type === "line") {
          const [x1, y1] = toCanvas(cmd.x1, cmd.y1);
          const [x2, y2] = toCanvas(cmd.x2, cmd.y2);
          ctx.strokeStyle = cmd.color;
          ctx.lineWidth = cmd.size;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Draw turtle
      if (turtleState.visible) {
        const [tx, ty] = toCanvas(turtleState.x, turtleState.y);
        const size = theme.turtleSize;
        const angle = (-turtleState.heading * Math.PI) / 180; // negate because canvas y is down

        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(-angle); // heading 0 = up on canvas

        // Triangle pointing up
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.lineTo(-size * 0.4, size * 0.4);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.closePath();

        ctx.fillStyle = "var(--color-primary)";
        // Fallback: read computed style for the fill
        const computed = getComputedStyle(canvas);
        const primaryColor =
          computed.getPropertyValue("--color-primary").trim() || "#10b981";
        ctx.fillStyle = primaryColor;
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    },
    [theme.turtleSize]
  );

  // Re-render whenever commands or turtle change
  useEffect(() => {
    render(drawCommands, turtle);
  }, [drawCommands, turtle, render]);

  // Handle container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      render(drawCommands, turtle);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawCommands, turtle, render]);

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-content">Canvas</h2>
      </div>
      <div ref={containerRef} className="relative flex-1 overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
