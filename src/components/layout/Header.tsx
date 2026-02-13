"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import type { AgeGroupId } from "@/theme/age-themes";

const NAV_ITEMS = [
  { href: "/playground", label: "Playground" },
  { href: "/lessons", label: "Licoes" },
  { href: "/challenges", label: "Desafios" },
  { href: "/gallery", label: "Galeria" },
];

function ThemeSwitcher() {
  const { ageGroup, setAgeGroup } = useTheme();

  const options: { id: AgeGroupId; label: string }[] = [
    { id: "6-8", label: "6-8" },
    { id: "8-12", label: "8-12" },
    { id: "10-14", label: "10-14" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-[var(--radius-md)] border border-border p-0.5">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setAgeGroup(opt.id)}
          className={cn(
            "rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium transition-colors",
            ageGroup === opt.id
              ? "bg-primary text-white"
              : "text-content-muted hover:text-content-secondary"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-surface px-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 L20 18 L4 18 Z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-content">GalloGo</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === item.href || pathname?.startsWith(item.href + "/")
                  ? "bg-surface-panel text-primary"
                  : "text-content-secondary hover:bg-surface-secondary hover:text-content"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
