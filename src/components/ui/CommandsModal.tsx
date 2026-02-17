"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  COMMAND_REFERENCE,
  COMMAND_CATEGORIES,
  type CommandReference,
} from "@/data/command-reference";

interface CommandsModalProps {
  open: boolean;
  onClose: () => void;
}

const TYPE_LABELS: Record<CommandReference["type"], string> = {
  command: "Comando",
  reporter: "Função",
  special: "Especial",
};

const TYPE_COLORS: Record<CommandReference["type"], string> = {
  command: "bg-blue-100 text-blue-700",
  reporter: "bg-purple-100 text-purple-700",
  special: "bg-amber-100 text-amber-700",
};

export function CommandsModal({ open, onClose }: CommandsModalProps) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (!filter.trim()) return COMMAND_REFERENCE;
    const q = filter.toLowerCase().trim();
    return COMMAND_REFERENCE.filter(
      (cmd) =>
        cmd.canonical.includes(q) ||
        cmd.ptAlias.includes(q) ||
        cmd.aliases.some((a) => a.includes(q)) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [filter]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, CommandReference[]> = {};
    for (const cat of COMMAND_CATEGORIES) {
      const cmds = filtered.filter((c) => c.category === cat);
      if (cmds.length > 0) {
        groups[cat] = cmds.sort((a, b) =>
          a.ptAlias.localeCompare(b.ptAlias, "pt-BR")
        );
      }
    }
    return groups;
  }, [filtered]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md hover:bg-white hover:text-gray-900 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header + Filter */}
        <div className="shrink-0 border-b border-gray-200 px-6 pt-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Comandos Logo
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Todos os comandos disponíveis com aliases em português e inglês
          </p>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrar comandos..."
              autoFocus
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Command list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {Object.keys(groupedByCategory).length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              Nenhum comando encontrado para &ldquo;{filter}&rdquo;
            </p>
          ) : (
            Object.entries(groupedByCategory).map(([category, cmds]) => (
              <div key={category} className="mb-5 last:mb-0">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {category}
                </h3>
                <div className="space-y-1">
                  {cmds.map((cmd) => (
                    <CommandRow key={cmd.canonical} cmd={cmd} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-200 px-6 py-3">
          <p className="text-xs text-gray-400 text-center">
            {filtered.length} comando{filtered.length !== 1 ? "s" : ""}
            {filter ? " encontrado" + (filtered.length !== 1 ? "s" : "") : " disponíveis"}
          </p>
        </div>
      </div>
    </div>
  );
}

function CommandRow({ cmd }: { cmd: CommandReference }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "w-full text-left rounded-lg border px-3 py-2 transition-colors",
        expanded
          ? "border-blue-200 bg-blue-50/50"
          : "border-transparent hover:bg-gray-50"
      )}
    >
      <div className="flex items-center gap-2">
        <code className="text-sm font-bold text-gray-900 font-mono">
          {cmd.ptAlias}
        </code>
        <span className="text-xs text-gray-400">/</span>
        <code className="text-sm text-gray-500 font-mono">
          {cmd.canonical}
        </code>
        <span
          className={cn(
            "ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
            TYPE_COLORS[cmd.type]
          )}
        >
          {TYPE_LABELS[cmd.type]}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">{cmd.description}</p>

      {expanded && (
        <div className="mt-2 space-y-1.5 border-t border-gray-200 pt-2">
          <div>
            <span className="text-[10px] font-semibold uppercase text-gray-400">
              Exemplo
            </span>
            <pre className="mt-0.5 rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700 whitespace-pre-wrap">
              {cmd.syntax}
            </pre>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase text-gray-400">
              Aliases
            </span>
            <div className="mt-0.5 flex flex-wrap gap-1">
              {cmd.aliases.map((alias) => (
                <span
                  key={alias}
                  className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] text-gray-600"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
