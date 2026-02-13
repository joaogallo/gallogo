"use client";

import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-content">Galeria</h1>
        <Link
          href="/playground"
          className="rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Criar Desenho
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 text-content-muted"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-content">
          Nenhum desenho ainda
        </h2>
        <p className="mt-1 text-sm text-content-muted max-w-xs">
          Va ao Playground, crie um desenho com a tartaruga e exporte
          como PNG para compartilhar aqui!
        </p>
      </div>
    </div>
  );
}
