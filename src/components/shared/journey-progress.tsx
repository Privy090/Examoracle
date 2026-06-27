"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JourneyStep {
  title: string;
  description: string;
  href: string;
  done: boolean;
  ctaLabel: string;
  icon: LucideIcon;
}

interface JourneyProgressProps {
  title: string;
  subtitle: string;
  steps: JourneyStep[];
  primaryHref: string;
  primaryLabel: string;
}

export function JourneyProgress({ title, subtitle, steps, primaryHref, primaryLabel }: JourneyProgressProps) {
  const completed = steps.filter((step) => step.done).length;
  const progress = Math.round((completed / steps.length) * 100);

  return (
    <Card className="rounded-[24px] border-oracle-primary/20 bg-[var(--surface)]/90 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-oracle-primary/20 bg-oracle-primary/10 px-3 py-1 text-sm font-semibold text-oracle-primary">
            <Sparkles size={15} />
            {title}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--subtle)] px-3 py-2 text-right">
          <div className="text-lg font-black">{progress}%</div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">ready</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-[var(--subtle)]">
          <div className="h-full rounded-full bg-gradient-to-r from-oracle-primary to-oracle-accent" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm font-semibold text-[var(--muted)]">{completed}/{steps.length}</span>
      </div>

      <div className="mt-4 grid gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Link key={step.title} href={step.href} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 transition hover:border-oracle-primary/40">
              <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", step.done ? "bg-oracle-primary/15 text-oracle-primary" : "bg-[var(--subtle)] text-[var(--muted)]")}>
                {step.done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-extrabold">{step.title}</div>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{step.description}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-oracle-primary">{step.ctaLabel}</span>
            </Link>
          );
        })}
      </div>

      <Button asChild className="mt-4" icon={<Sparkles size={15} />}>
        <Link href={primaryHref}>{primaryLabel}</Link>
      </Button>
    </Card>
  );
}
