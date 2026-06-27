"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  asChild?: boolean;
}

export function Button({ className, variant = "primary", icon, children, asChild, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white shadow-[0_14px_36px_rgba(107,124,255,0.28)]",
    variant === "secondary" && "border border-[var(--border)] bg-[var(--surface)]/85 text-[var(--text)] shadow-[0_10px_28px_rgba(6,10,24,0.12)]",
    variant === "ghost" && "bg-transparent text-[var(--muted)] hover:bg-[var(--subtle)] hover:text-[var(--text)]",
    variant === "danger" && "bg-[var(--accent)] text-white shadow-[0_14px_36px_rgba(62,214,181,0.24)]",
    className
  );

  if (asChild && React.isValidElement<{ className?: string; children?: React.ReactNode }>(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      children: (
        <>
          {icon}
          {children.props.children}
        </>
      )
    });
  }

  return (
    <button className={classes} {...props}>
      {icon}
      {children}
    </button>
  );
}
