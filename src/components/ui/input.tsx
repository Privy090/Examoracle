import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "min-h-11 w-full rounded-[10px] border border-[var(--border)] bg-[var(--subtle)] px-3.5 text-sm text-[var(--text)] placeholder:text-[var(--muted)]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
