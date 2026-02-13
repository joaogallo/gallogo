"use client";

import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import type { AgeGroupId } from "@/theme/age-themes";

const AGE_MAP: Record<string, AgeGroupId> = {
  AGE_6_8: "6-8",
  AGE_8_12: "8-12",
  AGE_10_14: "10-14",
};

const LEVEL_NAMES = [
  "",
  "Tartaruga Iniciante",
  "Explorador",
  "Artista",
  "Programador",
  "Mestre",
  "Ninja",
  "Lendario",
  "Mestre Logo",
  "Guru",
  "Arquiteto Digital",
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const { ageGroup, setAgeGroup } = useTheme();

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-content-muted">Carregando...</p>
      </div>
    );
  }

  const user = session.user;
  const userAgeGroup = AGE_MAP[(user as any).ageGroup] || ageGroup;
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
          {initials}
        </div>
        <div>
          <h1 className="text-xl font-bold text-content">
            {user.name || "Usuario"}
          </h1>
          <p className="text-sm text-content-muted">{user.email}</p>
          <p className="text-xs text-content-muted mt-0.5">
            Perfil: {userAgeGroup} anos
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center">
          <div className="text-2xl font-bold text-primary">1</div>
          <div className="text-xs text-content-muted">Nivel</div>
          <div className="text-[10px] text-content-secondary">
            {LEVEL_NAMES[1]}
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center">
          <div className="text-2xl font-bold text-primary">0</div>
          <div className="text-xs text-content-muted">Pontos</div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center">
          <div className="text-2xl font-bold text-primary">0</div>
          <div className="text-xs text-content-muted">Badges</div>
        </div>
      </div>

      {/* Theme switcher */}
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 space-y-3">
        <h2 className="text-sm font-semibold text-content">
          Perfil de idade (tema visual)
        </h2>
        <div className="flex gap-2">
          {(["6-8", "8-12", "10-14"] as AgeGroupId[]).map((ag) => (
            <button
              key={ag}
              onClick={() => setAgeGroup(ag)}
              className={cn(
                "flex-1 rounded-[var(--radius-sm)] border py-2 text-sm font-medium transition-colors",
                ageGroup === ag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-content-secondary hover:bg-surface-secondary"
              )}
            >
              {ag}
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="w-full rounded-[var(--radius-md)] border border-error/30 py-3 text-sm font-medium text-error hover:bg-error/5 transition-colors"
      >
        Sair da conta
      </button>
    </div>
  );
}
