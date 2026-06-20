"use client";

import Link from "next/link";
import { Brain, Clock, FileUp, Plus, Upload, Zap } from "lucide-react";
import { TopicPreviewChart } from "@/components/charts/lazy-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COLORS } from "@/constants/design-tokens";
import { getRiskColor } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

export function DashboardPage() {
  const user = useAppStore((state) => state.user)!;
  const courses = useAppStore((state) => state.courses);
  const files = useAppStore((state) => state.files);
  const predictions = useAppStore((state) => state.predictions);
  const analyzedCount = courses.filter((course) => course.analyzed).length;
  const completedFiles = files.filter((file) => file.status === "completed").length;
  const latestPrediction = courses.map((course) => ({ course, prediction: predictions[course.id] })).find((item) => item.prediction);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="grid gap-4">
        <div className="relative overflow-hidden rounded-2xl border border-oracle-primary/30 bg-gradient-to-br from-oracle-primary/20 to-oracle-accent/10 p-5">
          <div className="relative">
            <p className="text-sm font-bold text-oracle-primary">Good morning</p>
            <h2 className="mt-1 text-2xl font-black leading-tight">{user.fullName.split(" ")[0]}, build predictions from your real materials.</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{user.school} · {user.department} · {user.level}L</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild icon={<Plus size={15} />}><Link href="/courses">Add Course</Link></Button>
              <Button asChild variant="secondary" icon={<Upload size={15} />}><Link href="/upload">Upload Materials</Link></Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Stat label="Active Courses" value={courses.length} icon={<Brain size={18} />} color={COLORS.primary} />
          <Stat label="AI Analyses" value={analyzedCount} icon={<Zap size={18} />} color={COLORS.accent} />
          <Stat label="Files Uploaded" value={completedFiles} icon={<FileUp size={18} />} color={COLORS.accentGreen} />
          <Stat label="Study Tasks" value={Object.keys(predictions).length ? "Ready" : "Pending"} icon={<Clock size={18} />} color={COLORS.accentAmber} />
        </div>

        {latestPrediction ? (
          <Card>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold">{latestPrediction.course.code} · Top Predictions</h3>
                <p className="text-sm text-[var(--muted)]">{latestPrediction.course.title}</p>
              </div>
              <Button asChild variant="secondary"><Link href="/predictions">View All</Link></Button>
            </div>
            <TopicPreviewChart topics={latestPrediction.prediction.topics} />
          </Card>
        ) : (
          <Card className="py-10 text-center">
            <h3 className="text-lg font-black">No analysis yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Create a course, upload completed study materials, then run analysis. Dashboards stay empty until they have student data to tabulate.</p>
            <Button asChild className="mt-4" icon={<Upload size={15} />}><Link href="/upload">Upload Materials</Link></Button>
          </Card>
        )}
      </section>

      <aside className="grid gap-3">
        <h3 className="text-sm font-extrabold text-[var(--muted)]">Your Courses</h3>
        {courses.length ? (
          courses.slice(0, 5).map((course) => (
            <Link key={course.id} href="/courses" className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 transition hover:border-oracle-primary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-oracle-primary/15 text-xs font-black text-oracle-primary">{course.code.slice(-3)}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-extrabold">{course.code}</div>
                <div className="truncate text-xs text-[var(--muted)]">{course.title}</div>
              </div>
              <Badge small color={course.analyzed ? getRiskColor(course.riskLevel) : "var(--muted)"}>{course.analyzed ? course.riskLevel?.toUpperCase() : "PENDING"}</Badge>
            </Link>
          ))
        ) : (
          <Card><p className="text-sm leading-6 text-[var(--muted)]">No courses yet. Your dashboard will fill in as students add courses and upload materials.</p></Card>
        )}
      </aside>
    </div>
  );
}

function Stat({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ color, backgroundColor: `${color}18` }}>{icon}</div>
      </div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs font-semibold text-[var(--muted)]">{label}</div>
    </Card>
  );
}
