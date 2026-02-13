"use client";

import { ThreePanelLayout } from "@/components/layout/ThreePanelLayout";
import { InstructionsPanel } from "@/components/instructions/InstructionsPanel";
import { CliPanel } from "@/components/cli/CliPanel";
import { CanvasPanel } from "@/components/canvas/CanvasPanel";

export default function PlaygroundPage() {
  return (
    <ThreePanelLayout
      instructions={<InstructionsPanel />}
      cli={<CliPanel />}
      canvas={<CanvasPanel />}
    />
  );
}
