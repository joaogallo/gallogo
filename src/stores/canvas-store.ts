import { create } from "zustand";
import type { DrawCommand, TurtleState } from "@/logo/types";
import { createInitialTurtleState } from "@/logo/types";

interface CanvasStore {
  /** All accumulated draw commands (lines, clears, etc.) */
  drawCommands: DrawCommand[];
  /** Current turtle state */
  turtle: TurtleState;
  /** Push new commands from an execution */
  addCommands: (commands: DrawCommand[], turtle: TurtleState) => void;
  /** Full reset (clearscreen) */
  reset: () => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  drawCommands: [],
  turtle: createInitialTurtleState(),

  addCommands: (commands, turtle) =>
    set((state) => {
      // If there's a "clear" command, discard everything before it
      const lastClearIdx = commands.findLastIndex((c) => c.type === "clear");
      if (lastClearIdx >= 0) {
        return {
          drawCommands: commands.slice(lastClearIdx + 1),
          turtle,
        };
      }
      return {
        drawCommands: [...state.drawCommands, ...commands],
        turtle,
      };
    }),

  reset: () =>
    set({ drawCommands: [], turtle: createInitialTurtleState() }),
}));
