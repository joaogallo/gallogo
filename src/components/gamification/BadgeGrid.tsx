"use client";

import { BADGES, type BadgeDefinition } from "@/data/badges";

interface BadgeGridProps {
  earnedBadgeIds: string[];
  /** Show only earned badges */
  earnedOnly?: boolean;
}

/** Grid displaying all badges (earned = color, unearned = grayscale) */
export function BadgeGrid({ earnedBadgeIds, earnedOnly }: BadgeGridProps) {
  const earned = new Set(earnedBadgeIds);
  const badges = earnedOnly ? BADGES.filter((b) => earned.has(b.id)) : BADGES;

  if (earnedOnly && badges.length === 0) {
    return (
      <p className="text-sm text-content-muted py-4 text-center">
        Nenhuma conquista ainda. Continue praticando!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
      {badges.map((badge) => (
        <BadgeItem
          key={badge.id}
          badge={badge}
          isEarned={earned.has(badge.id)}
        />
      ))}
    </div>
  );
}

function BadgeItem({
  badge,
  isEarned,
}: {
  badge: BadgeDefinition;
  isEarned: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col items-center gap-1 rounded-[var(--radius-md)] border p-2 text-center transition-colors ${
        isEarned
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-surface-secondary opacity-40 grayscale"
      }`}
      title={isEarned ? badge.descriptionPt : `??? — ${badge.descriptionPt}`}
    >
      <span className="text-2xl">{badge.icon}</span>
      <span className="text-[10px] leading-tight font-medium text-content-secondary">
        {isEarned ? badge.namePt : "???"}
      </span>
    </div>
  );
}
