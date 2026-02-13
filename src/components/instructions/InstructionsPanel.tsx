"use client";

import { useTheme } from "@/theme/ThemeProvider";

export function InstructionsPanel() {
  const { theme } = useTheme();

  return (
    <div className="flex h-full flex-col bg-surface-secondary">
      <div className="border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-content">Instrucoes</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          <h3 className="text-[length:var(--font-size-lg)] font-bold text-content">
            Bem-vindo ao GalloGo!
          </h3>
          <p className="text-[length:var(--font-size-base)] leading-relaxed text-content-secondary">
            {theme.id === "6-8"
              ? "Ola! Aqui voce vai conhecer a tartaruga e aprender a fazer ela desenhar coisas incriveis!"
              : theme.id === "10-14"
                ? "Ambiente de programacao Logo. Digite comandos no terminal para controlar a tartaruga."
                : "Aprenda a programar controlando uma tartaruga que desenha no canvas!"}
          </p>
          <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
            <p className="text-sm font-medium text-content">
              Experimente digitar:
            </p>
            <code className="mt-1 block font-mono text-[length:var(--font-size-cli)] text-primary">
              fd 100
            </code>
            <p className="mt-1 text-sm text-content-muted">
              Move a tartaruga 100 passos para frente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
