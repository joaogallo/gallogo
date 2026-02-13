"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import { useCanvasStore } from "@/stores/canvas-store";
import { CanvasToolbar } from "./CanvasToolbar";
import type { DrawCommand, TurtleState } from "@/logo/types";

export function CanvasPanel() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Render state: during animation use animated* slices, otherwise use full commands
  const drawCommands = useCanvasStore((s) => s.drawCommands);
  const turtle = useCanvasStore((s) => s.turtle);
  const isAnimating = useCanvasStore((s) => s.isAnimating);
  const animatedCommands = useCanvasStore((s) => s.animatedCommands);
  const animatedTurtle = useCanvasStore((s) => s.animatedTurtle);
  const animationSpeed = useCanvasStore((s) => s.animationSpeed);
  const advanceAnimation = useCanvasStore((s) => s.advanceAnimation);

  const zoom = useCanvasStore((s) => s.zoom);
  const panX = useCanvasStore((s) => s.panX);
  const panY = useCanvasStore((s) => s.panY);
  const showGrid = useCanvasStore((s) => s.showGrid);
  const setZoom = useCanvasStore((s) => s.setZoom);
  const setPan = useCanvasStore((s) => s.setPan);

  // Which commands/turtle to actually render
  const visibleCommands = isAnimating ? animatedCommands : drawCommands;
  const visibleTurtle = isAnimating ? animatedTurtle : turtle;

  // -- Panning via mouse drag --
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        // Middle-click or Alt+left-click to pan
        isPanningRef.current = true;
        panStartRef.current = { x: e.clientX, y: e.clientY, panX, panY };
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    },
    [panX, panY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanningRef.current) return;
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan(panStartRef.current.panX + dx, panStartRef.current.panY + dy);
    },
    [setPan]
  );

  const handlePointerUp = useCallback(() => {
    isPanningRef.current = false;
  }, []);

  // -- Zoom via scroll wheel --
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(zoom + delta);
    },
    [zoom, setZoom]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // -- Render function --
  const render = useCallback(
    (
      commands: DrawCommand[],
      turtleState: TurtleState,
      zoomLevel: number,
      offsetX: number,
      offsetY: number,
      grid: boolean
    ) => {
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
      const cx = w / 2 + offsetX;
      const cy = h / 2 + offsetY;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Draw subtle grid
      if (grid) {
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 0.5;
        const gridSize = 50 * zoomLevel;
        if (gridSize > 5) {
          const gxOff = cx % gridSize;
          const gyOff = cy % gridSize;
          for (let x = gxOff; x < w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
          }
          for (let y = gyOff; y < h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
          }
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
      }

      // Helper: Logo coords → canvas coords with zoom + pan
      const toCanvas = (lx: number, ly: number): [number, number] => [
        cx + lx * zoomLevel,
        cy - ly * zoomLevel,
      ];

      // Draw all line commands
      for (const cmd of commands) {
        if (cmd.type === "line") {
          const [x1, y1] = toCanvas(cmd.x1, cmd.y1);
          const [x2, y2] = toCanvas(cmd.x2, cmd.y2);
          ctx.strokeStyle = cmd.color;
          ctx.lineWidth = cmd.size * zoomLevel;
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
        const size = theme.turtleSize * Math.min(zoomLevel, 2); // cap turtle size growth
        const angle = (-turtleState.heading * Math.PI) / 180;

        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(-angle);

        // Triangle pointing up
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.lineTo(-size * 0.4, size * 0.4);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.closePath();

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

  // Re-render whenever visible state changes
  useEffect(() => {
    render(visibleCommands, visibleTurtle, zoom, panX, panY, showGrid);
  }, [visibleCommands, visibleTurtle, zoom, panX, panY, showGrid, render]);

  // Handle container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      render(visibleCommands, visibleTurtle, zoom, panX, panY, showGrid);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [visibleCommands, visibleTurtle, zoom, panX, panY, showGrid, render]);

  // -- Animation loop --
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!isAnimating) return;

    // Time between animation steps (ms)
    // speed: 0.5 → 120ms, 1 → 60ms, 2 → 20ms
    const interval = animationSpeed > 0 ? 80 / animationSpeed : 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!useCanvasStore.getState().isAnimating) return;

      if (time - lastTime >= interval) {
        advanceAnimation();
        lastTime = time;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isAnimating, animationSpeed, advanceAnimation]);

  return (
    <div className="flex h-full flex-col bg-surface">
      <CanvasToolbar />
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-white cursor-crosshair"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          data-canvas-export
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
