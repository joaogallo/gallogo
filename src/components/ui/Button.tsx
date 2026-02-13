"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary-dark":
              variant === "primary",
            "bg-surface-secondary text-content border border-border hover:bg-surface-panel":
              variant === "secondary",
            "text-content-secondary hover:text-content hover:bg-surface-secondary":
              variant === "ghost",
          },
          {
            "h-8 px-3 text-sm rounded-[var(--radius-sm)]": size === "sm",
            "h-10 px-4 rounded-[var(--radius-md)]": size === "md",
            "h-12 px-6 text-lg rounded-[var(--radius-lg)]": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, type ButtonProps };
