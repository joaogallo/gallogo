"use client";

import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/canvas-store";

export function CanvasToolbar() {
  const zoom = useCanvasStore((s) => s.zoom);
  const showGrid = useCanvasStore((s) => s.showGrid);
  const animationSpeed = useCanvasStore((s) => s.animationSpeed);
  const isAnimating = useCanvasStore((s) => s.isAnimating);
  const zoomIn = useCanvasStore((s) => s.zoomIn);
  const zoomOut = useCanvasStore((s) => s.zoomOut);
  const resetView = useCanvasStore((s) => s.resetView);
  const setShowGrid = useCanvasStore((s) => s.setShowGrid);
  const setAnimationSpeed = useCanvasStore((s) => s.setAnimationSpeed);
  const finishAnimation = useCanvasStore((s) => s.finishAnimation);

  const handleExport = () => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      "[data-canvas-export]"
    );
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `gallogo-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const speedLabels: Record<number, string> = {
    0: "Instant",
    0.5: "Lenta",
    1: "Normal",
    2: "Rapida",
  };

  const cycleSpeed = () => {
    const speeds = [0, 0.5, 1, 2];
    const currentIdx = speeds.indexOf(animationSpeed);
    const nextIdx = (currentIdx + 1) % speeds.length;
    setAnimationSpeed(speeds[nextIdx]);
  };

  return (
    <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
      <span className="text-xs font-semibold text-content mr-1">Canvas</span>

      <div className="ml-auto flex items-center gap-1">
        {/* Skip animation button */}
        {isAnimating && (
          <ToolbarButton
            onClick={finishAnimation}
            title="Pular animacao"
            aria-label="Pular animacao"
          >
            <SkipIcon />
          </ToolbarButton>
        )}

        {/* Speed toggle */}
        <ToolbarButton
          onClick={cycleSpeed}
          title={`Velocidade: ${speedLabels[animationSpeed] ?? animationSpeed}`}
          aria-label="Alterar velocidade"
        >
          <SpeedIcon />
          <span className="text-[10px] ml-0.5">
            {animationSpeed === 0 ? "⚡" : `${animationSpeed}x`}
          </span>
        </ToolbarButton>

        {/* Grid toggle */}
        <ToolbarButton
          onClick={() => setShowGrid(!showGrid)}
          active={showGrid}
          title={showGrid ? "Esconder grade" : "Mostrar grade"}
          aria-label="Alternar grade"
        >
          <GridIcon />
        </ToolbarButton>

        <Separator />

        {/* Zoom controls */}
        <ToolbarButton
          onClick={zoomOut}
          disabled={zoom <= 0.25}
          title="Diminuir zoom"
          aria-label="Diminuir zoom"
        >
          <MinusIcon />
        </ToolbarButton>

        <span className="text-[10px] text-content-secondary min-w-[3ch] text-center tabular-nums">
          {Math.round(zoom * 100)}%
        </span>

        <ToolbarButton
          onClick={zoomIn}
          disabled={zoom >= 4}
          title="Aumentar zoom"
          aria-label="Aumentar zoom"
        >
          <PlusIcon />
        </ToolbarButton>

        <ToolbarButton
          onClick={resetView}
          title="Resetar visualizacao"
          aria-label="Resetar visualizacao"
        >
          <ResetViewIcon />
        </ToolbarButton>

        <Separator />

        {/* Export */}
        <ToolbarButton
          onClick={handleExport}
          title="Exportar como PNG"
          aria-label="Exportar desenho"
        >
          <ExportIcon />
        </ToolbarButton>
      </div>
    </div>
  );
}

// -- Small helper components --

function ToolbarButton({
  children,
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center h-6 min-w-6 px-1 rounded text-content-secondary transition-colors",
        "hover:bg-surface-secondary hover:text-content",
        "disabled:opacity-30 disabled:pointer-events-none",
        active && "bg-surface-secondary text-primary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <div className="w-px h-4 bg-border mx-0.5" />;
}

// -- Inline SVG icons (14x14) --

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="7" y1="3" x2="7" y2="11" />
      <line x1="3" y1="7" x2="11" y2="7" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="7" x2="11" y2="7" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="5" y1="1" x2="5" y2="13" />
      <line x1="9" y1="1" x2="9" y2="13" />
      <line x1="1" y1="5" x2="13" y2="5" />
      <line x1="1" y1="9" x2="13" y2="9" />
    </svg>
  );
}

function ResetViewIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="10" height="10" rx="1" />
      <line x1="7" y1="4" x2="7" y2="10" />
      <line x1="4" y1="7" x2="10" y2="7" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v2.5a1 1 0 01-1 1H3a1 1 0 01-1-1V9" />
      <polyline points="4 5 7 2 10 5" />
      <line x1="7" y1="2" x2="7" y2="10" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5,2 12,7 5,12" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="2,2 9,7 2,12" fill="currentColor" stroke="none" />
      <line x1="11" y1="2" x2="11" y2="12" />
    </svg>
  );
}
