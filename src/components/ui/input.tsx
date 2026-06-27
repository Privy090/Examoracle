import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "min-h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 px-3.5 py-2.5 text-sm text-[var(--text)] shadow-inner shadow-black/10 placeholder:text-[var(--muted)] transition focus:border-[var(--primary)] focus:bg-[var(--surface)]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
