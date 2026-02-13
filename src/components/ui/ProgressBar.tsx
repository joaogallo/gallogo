import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: "primary" | "secondary" | "accent";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = "primary",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-surface-secondary",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300", {
          "bg-primary": color === "primary",
          "bg-secondary": color === "secondary",
          "bg-accent": color === "accent",
        })}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
