"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import type { AgeGroupId } from "@/theme/age-themes";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { StreakDisplay } from "@/components/gamification/StreakDisplay";
import { useGamificationStore } from "@/stores/gamification-store";

const NAV_ITEMS = [
  { href: "/playground", label: "Playground" },
  { href: "/lessons", label: "Licoes" },
  { href: "/challenges", label: "Desafios" },
  { href: "/gallery", label: "Galeria" },
  { href: "/leaderboard", label: "Ranking" },
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

function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
      >
        Entrar
      </Link>
    );
  }

  const user = session.user;
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors"
      >
        {initials}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-[var(--radius-md)] border border-border bg-surface shadow-lg">
            <div className="border-b border-border px-3 py-2">
              <p className="text-sm font-medium text-content truncate">
                {user.name || "Usuario"}
              </p>
              <p className="text-xs text-content-muted truncate">
                {user.email}
              </p>
            </div>
            <div className="p-1">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block w-full rounded-[var(--radius-sm)] px-3 py-1.5 text-left text-sm text-content-secondary hover:bg-surface-secondary transition-colors"
              >
                Perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="block w-full rounded-[var(--radius-sm)] px-3 py-1.5 text-left text-sm text-error hover:bg-error/5 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function GamificationHeader() {
  const { loaded, streak } = useGamificationStore();
  if (!loaded) return null;
  return (
    <div className="flex items-center gap-2">
      <PointsDisplay />
      <StreakDisplay streak={streak} />
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
        <GamificationHeader />
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </header>
  );
}
