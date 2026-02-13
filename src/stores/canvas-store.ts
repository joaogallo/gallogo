import { create } from "zustand";
import type { DrawCommand, TurtleState } from "@/logo/types";
import { createInitialTurtleState } from "@/logo/types";

interface CanvasStore {
  /** All accumulated draw commands (lines, clears, etc.) */
  drawCommands: DrawCommand[];
  /** Current turtle state */
  turtle: TurtleState;

  /** Zoom level (1 = 100%) */
  zoom: number;
  /** Pan offset in canvas pixels */
  panX: number;
  panY: number;
  /** Whether to show the background grid */
  showGrid: boolean;
  /** Animation speed multiplier (0 = instant, 0.5 = slow, 1 = normal, 2 = fast) */
  animationSpeed: number;
  /** Whether turtle animation is currently running */
  isAnimating: boolean;

  /** Queue of commands waiting to be animated */
  animationQueue: DrawCommand[];
  /** Commands that have already been animated (rendered) */
  animatedCommands: DrawCommand[];
  /** Animated turtle position (intermediate during animation) */
  animatedTurtle: TurtleState;

  // Actions
  addCommands: (commands: DrawCommand[], turtle: TurtleState) => void;
  reset: () => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  setPan: (x: number, y: number) => void;
  setShowGrid: (show: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setIsAnimating: (animating: boolean) => void;

  // Animation actions
  startAnimation: (commands: DrawCommand[], finalTurtle: TurtleState) => void;
  advanceAnimation: () => DrawCommand | null;
  finishAnimation: () => void;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  drawCommands: [],
  turtle: createInitialTurtleState(),

  zoom: 1,
  panX: 0,
  panY: 0,
  showGrid: true,
  animationSpeed: 1,
  isAnimating: false,

  animationQueue: [],
  animatedCommands: [],
  animatedTurtle: createInitialTurtleState(),

  addCommands: (commands, turtle) =>
    set((state) => {
      // If there's a "clear" command, discard everything before it
      const lastClearIdx = commands.findLastIndex((c) => c.type === "clear");
      if (lastClearIdx >= 0) {
        return {
          drawCommands: commands.slice(lastClearIdx + 1),
          turtle,
          animatedCommands: commands.slice(lastClearIdx + 1),
          animatedTurtle: turtle,
        };
      }
      return {
        drawCommands: [...state.drawCommands, ...commands],
        turtle,
        animatedCommands: [...state.drawCommands, ...commands],
        animatedTurtle: turtle,
      };
    }),

  reset: () =>
    set({
      drawCommands: [],
      turtle: createInitialTurtleState(),
      animatedCommands: [],
      animatedTurtle: createInitialTurtleState(),
      animationQueue: [],
      isAnimating: false,
    }),

  setZoom: (zoom) =>
    set({ zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom)) }),

  zoomIn: () =>
    set((s) => ({ zoom: Math.min(MAX_ZOOM, s.zoom + ZOOM_STEP) })),

  zoomOut: () =>
    set((s) => ({ zoom: Math.max(MIN_ZOOM, s.zoom - ZOOM_STEP) })),

  resetView: () => set({ zoom: 1, panX: 0, panY: 0 }),

  setPan: (x, y) => set({ panX: x, panY: y }),

  setShowGrid: (show) => set({ showGrid: show }),

  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

  setIsAnimating: (animating) => set({ isAnimating: animating }),

  startAnimation: (commands, finalTurtle) => {
    const state = get();
    // Filter to animatable commands (lines and moveTos)
    const animatable = commands.filter(
      (c) => c.type === "line" || c.type === "moveTo"
    );

    if (animatable.length === 0 || state.animationSpeed === 0) {
      // Instant mode — skip animation
      set((s) => {
        const lastClearIdx = commands.findLastIndex((c) => c.type === "clear");
        if (lastClearIdx >= 0) {
          return {
            drawCommands: commands.slice(lastClearIdx + 1),
            turtle: finalTurtle,
            animatedCommands: commands.slice(lastClearIdx + 1),
            animatedTurtle: finalTurtle,
            isAnimating: false,
          };
        }
        return {
          drawCommands: [...s.drawCommands, ...commands],
          turtle: finalTurtle,
          animatedCommands: [...s.drawCommands, ...commands],
          animatedTurtle: finalTurtle,
          isAnimating: false,
        };
      });
      return;
    }

    // Set up animation queue
    const lastClearIdx = commands.findLastIndex((c) => c.type === "clear");
    const baseCommands =
      lastClearIdx >= 0 ? [] : [...state.drawCommands];

    set({
      drawCommands:
        lastClearIdx >= 0
          ? commands.slice(lastClearIdx + 1)
          : [...state.drawCommands, ...commands],
      turtle: finalTurtle,
      animationQueue: animatable,
      animatedCommands: baseCommands,
      animatedTurtle: state.turtle,
      isAnimating: true,
    });
  },

  advanceAnimation: () => {
    const state = get();
    if (state.animationQueue.length === 0) return null;

    const [next, ...rest] = state.animationQueue;

    // Update animated turtle position based on the command
    let newTurtle = { ...state.animatedTurtle };
    if (next.type === "line") {
      newTurtle.x = next.x2;
      newTurtle.y = next.y2;
    } else if (next.type === "moveTo") {
      newTurtle.x = next.x;
      newTurtle.y = next.y;
    }

    set({
      animationQueue: rest,
      animatedCommands: [...state.animatedCommands, next],
      animatedTurtle: newTurtle,
      isAnimating: rest.length > 0,
    });

    return next;
  },

  finishAnimation: () => {
    const state = get();
    set({
      animationQueue: [],
      animatedCommands: state.drawCommands,
      animatedTurtle: state.turtle,
      isAnimating: false,
    });
  },
}));
