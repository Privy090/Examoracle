"use client";

import { Check } from "lucide-react";
import { WeeklyStudyChart } from "@/components/charts/lazy-charts";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { COLORS } from "@/constants/design-tokens";
import { useAppStore } from "@/store/app-store";
import type { RiskLevel } from "@/types/domain";

const priorityColor: Record<RiskLevel, string> = {
  high: COLORS.accent,
  medium: COLORS.accentAmber,
  low: COLORS.accentGreen
};

export function PlannerPage() {
  const tasks = useAppStore((state) => state.tasks);
  const toggleTask = useAppStore((state) => state.toggleTask);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
      <Card>
        <h2 className="text-base font-black">Weekly Study Hours</h2>
        <p className="mb-4 text-sm text-[var(--muted)]">This week's planned schedule</p>
        <WeeklyStudyChart />
      </Card>
      <section className="grid gap-2">
        <h2 className="text-base font-black">Study Tasks</h2>
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center gap-3 p-3">
            <button onClick={() => toggleTask(task.id)} className={task.done ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-oracle-green text-black" : "h-6 w-6 shrink-0 rounded-md border-2 border-[var(--border)]"} aria-label={`Toggle ${task.title}`}>
              {task.done && <Check size={14} />}
            </button>
            <div className="min-w-0 flex-1">
              <div className={task.done ? "truncate text-sm font-bold text-[var(--muted)] line-through" : "truncate text-sm font-bold"}>{task.title}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge small>{task.course}</Badge>
                <span className="text-xs text-[var(--muted)]">{task.due}</span>
              </div>
            </div>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: priorityColor[task.priority] }} />
          </Card>
        ))}
      </section>
    </div>
  );
}
