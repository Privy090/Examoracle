"use client";

import Link from "next/link";
import { Brain, Clock, FileUp, Zap } from "lucide-react";
import { TopicPreviewChart } from "@/components/charts/lazy-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COLORS } from "@/constants/design-tokens";
import { mockPrediction } from "@/constants/mock-data";
import { getRiskColor } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

export function DashboardPage() {
  const user = useAppStore((state) => state.user)!;
  const courses = useAppStore((state) => state.courses);
  const files = useAppStore((state) => state.files);
  const analyzedCount = courses.filter((course) => course.analyzed).length;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="grid gap-4">
        <div className="relative overflow-hidden rounded-2xl border border-oracle-primary/30 bg-gradient-to-br from-oracle-primary/20 to-oracle-accent/10 p-5">
          <div className="relative">
            <p className="text-sm font-bold text-oracle-primary">Good morning</p>
            <h2 className="mt-1 text-2xl font-black leading-tight">Chidera, ready to ace your exams?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{user.school} · {user.department} · {user.level}L</p>
            <Button asChild className="mt-4" icon={<Zap size={15} />}><Link href="/predictions">View Predictions</Link></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Stat label="Active Courses" value={courses.length} icon={<Brain size={18} />} color={COLORS.primary} />
          <Stat label="AI Analyses" value={analyzedCount} icon={<Zap size={18} />} color={COLORS.accent} trend="+2" />
          <Stat label="Files Uploaded" value={files.length} icon={<FileUp size={18} />} color={COLORS.accentGreen} />
          <Stat label="Study Hours" value="24h" icon={<Clock size={18} />} color={COLORS.accentAmber} />
        </div>

        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold">CSC301 · Top Predictions</h3>
              <p className="text-sm text-[var(--muted)]">Operating Systems</p>
            </div>
            <Button asChild variant="secondary"><Link href="/predictions">View All</Link></Button>
          </div>
          <TopicPreviewChart topics={mockPrediction.topics} />
        </Card>
      </section>

      <aside className="grid gap-3">
        <h3 className="text-sm font-extrabold text-[var(--muted)]">Your Courses</h3>
        {courses.slice(0, 5).map((course) => (
          <Link key={course.id} href="/courses" className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 transition hover:border-oracle-primary/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-oracle-primary/15 text-xs font-black text-oracle-primary">{course.code.slice(-3)}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-extrabold">{course.code}</div>
              <div className="truncate text-xs text-[var(--muted)]">{course.title}</div>
            </div>
            <Badge small color={course.analyzed ? getRiskColor(course.riskLevel) : "var(--muted)"}>{course.analyzed ? course.riskLevel?.toUpperCase() : "PENDING"}</Badge>
          </Link>
        ))}
      </aside>
    </div>
  );
}

function Stat({ label, value, icon, color, trend }: { label: string; value: string | number; icon: React.ReactNode; color: string; trend?: string }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ color, backgroundColor: `${color}18` }}>{icon}</div>
        {trend && <Badge small color={color}>{trend}</Badge>}
      </div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs font-semibold text-[var(--muted)]">{label}</div>
    </Card>
  );
}
