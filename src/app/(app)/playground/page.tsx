"use client";

import { useRef, useCallback, useState } from "react";
import { ThreePanelLayout } from "@/components/layout/ThreePanelLayout";
import { InstructionsPanel } from "@/components/instructions/InstructionsPanel";
import { CliPanel } from "@/components/cli/CliPanel";
import { CanvasPanel } from "@/components/canvas/CanvasPanel";
import type { InterpreterState } from "@/logo";

export default function PlaygroundPage() {
  const interpreterRef = useRef<InterpreterState | null>(null);
  const [pendingCode, setPendingCode] = useState<string | null>(null);

  const handleCopyToTerminal = useCallback((code: string) => {
    setPendingCode(code);
  }, []);

  const consumePendingCode = useCallback(() => {
    const code = pendingCode;
    setPendingCode(null);
    return code;
  }, [pendingCode]);

  return (
    <ThreePanelLayout
      instructions={
        <InstructionsPanel
          interpreterRef={interpreterRef}
          onCopyToTerminal={handleCopyToTerminal}
        />
      }
      cli={
        <CliPanel
          interpreterRef={interpreterRef}
          consumePendingCode={consumePendingCode}
        />
      }
      canvas={<CanvasPanel />}
    />
  );
}
