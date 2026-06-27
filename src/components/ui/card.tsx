import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-[24px] border border-[var(--border)] bg-[var(--card)]/95 p-4 shadow-[var(--shadow)] backdrop-blur-xl sm:p-5", className)}
      {...props}
    />
  );
}
