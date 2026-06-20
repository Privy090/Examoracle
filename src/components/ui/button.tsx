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
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "bg-gradient-to-br from-oracle-primary to-oracle-primaryLight text-white shadow-glow",
    variant === "secondary" && "border border-[var(--border)] bg-[var(--subtle)] text-[var(--text)]",
    variant === "ghost" && "bg-transparent text-[var(--muted)] hover:bg-[var(--subtle)]",
    variant === "danger" && "bg-oracle-accent text-white",
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
