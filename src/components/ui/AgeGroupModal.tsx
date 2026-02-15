"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AgeGroupId } from "@/theme/age-themes";
import galloExplorer from "@/media/avatar/gallo-explorer.png";
import galloAdventurer from "@/media/avatar/gallo-adventurer.png";
import galloHacker from "@/media/avatar/gallo-hacker.png";

const AGE_PROFILES = [
  {
    id: "6-8" as AgeGroupId,
    title: "Explorador",
    age: "6 a 8 anos",
    image: galloExplorer,
    description:
      "Interface colorida e divertida com elementos grandes, perfeita para os primeiros passos na programação.",
    border: "border-yellow-400/60 hover:border-yellow-400",
    bg: "hover:bg-yellow-400/5",
    ring: "ring-yellow-400",
  },
  {
    id: "8-10" as AgeGroupId,
    title: "Aventureiro",
    age: "8 a 10 anos",
    image: galloAdventurer,
    description:
      "Visual equilibrado com estética de game, ideal para quem já conhece o básico e quer explorar mais.",
    border: "border-teal-400/60 hover:border-teal-400",
    bg: "hover:bg-teal-400/5",
    ring: "ring-teal-400",
  },
  {
    id: "10-14" as AgeGroupId,
    title: "Hacker",
    age: "10 a 14 anos",
    image: galloHacker,
    description:
      "Tema escuro com estética de terminal, para quem quer se sentir um programador de verdade.",
    border: "border-green-400/60 hover:border-green-400",
    bg: "hover:bg-green-400/5",
    ring: "ring-green-400",
  },
];

interface AgeGroupModalProps {
  open: boolean;
  dismissable?: boolean;
  onSelect: (id: AgeGroupId) => void;
  onClose?: () => void;
}

export function AgeGroupModal({
  open,
  dismissable = false,
  onSelect,
  onClose,
}: AgeGroupModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismissable ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button — only when dismissable */}
        {dismissable && onClose && (
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
        )}

        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Escolha seu perfil
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Isso define a aparência e a experiência do GalloGo
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {AGE_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => onSelect(profile.id)}
                className={cn(
                  "group flex flex-col items-center rounded-xl border-2 bg-white p-4 text-center transition-all duration-200",
                  "hover:shadow-lg hover:-translate-y-1",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  profile.border,
                  profile.bg,
                  profile.ring
                )}
              >
                <div className="relative mb-3 h-32 w-32 sm:h-28 sm:w-28">
                  <Image
                    src={profile.image}
                    alt={profile.title}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {profile.title}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  {profile.age}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  {profile.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
