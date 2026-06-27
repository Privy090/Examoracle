"use client";

import Link from "next/link";
import { BookOpen, Brain, FileUp, Sparkles, Upload, Zap } from "lucide-react";
import { TopicPreviewChart } from "@/components/charts/lazy-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JourneyProgress } from "@/components/shared/journey-progress";
import { COLORS } from "@/constants/design-tokens";
import { getRiskColor } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

export function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const courses = useAppStore((state) => state.courses);
  const files = useAppStore((state) => state.files);
  const predictions = useAppStore((state) => state.predictions);
  const analyzedCount = courses.filter((course) => course.analyzed).length;
  const completedFiles = files.filter((file) => file.status === "completed").length;
  const latestPrediction = courses.map((course) => ({ course, prediction: predictions[course.id] })).find((item) => item.prediction);
  const journeySteps = [
    { title: "Add your first course", description: "Create the class you want to study for.", href: "/courses", done: courses.length > 0, ctaLabel: courses.length > 0 ? "View" : "Start", icon: BookOpen },
    { title: "Upload materials", description: "Bring in notes, slides, and past questions.", href: "/courses", done: completedFiles > 0, ctaLabel: completedFiles > 0 ? "Review" : "Upload", icon: Upload },
    { title: "Run analysis", description: "Let AI turn materials into exam predictions.", href: "/predictions", done: analyzedCount > 0, ctaLabel: analyzedCount > 0 ? "Open" : "Analyze", icon: Brain },
    { title: "Practice mock exams", description: "Try likely exam questions for each course.", href: "/mock-exams", done: Object.keys(predictions).length > 0, ctaLabel: Object.keys(predictions).length > 0 ? "Open" : "Practice", icon: Sparkles }
  ];

  if (!user) return null;

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_350px]">
      <section className="grid gap-4">
        <div className="relative overflow-hidden rounded-[28px] border border-oracle-primary/20 bg-gradient-to-br from-oracle-primary/20 via-[var(--surface)] to-oracle-accent/10 p-5 sm:p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-oracle-primary/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-oracle-primary/20 bg-white/10 px-3 py-1 text-sm font-semibold text-oracle-primary">
              <Sparkles size={15} />
              Ready to study smarter
            </div>
            <h2 className="mt-4 max-w-2xl text-2xl font-black leading-tight sm:text-3xl">{user.fullName.split(" ")[0]}, your next best study move is waiting.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{user.school} · {user.department}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild icon={<Upload size={15} />}><Link href="/courses">Continue with your course</Link></Button>
            </div>
          </div>
        </div>

        <JourneyProgress
          title="Your study journey"
          subtitle="A clear path from setup to smarter revision. Complete the steps below to unlock your first full experience."
          steps={journeySteps}
          primaryHref={courses.length ? "/courses" : "/courses"}
          primaryLabel={courses.length ? "Open your courses" : "Add your first course"}
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Active Courses" value={courses.length} icon={<BookOpen size={18} />} color={COLORS.primary} />
          <Stat label="AI Analyses" value={analyzedCount} icon={<Zap size={18} />} color={COLORS.accent} />
          <Stat label="Completed Files" value={completedFiles} icon={<FileUp size={18} />} color={COLORS.accentGreen} />
          <Stat label="Mock Exams" value={Object.keys(predictions).length ? "Ready" : "Soon"} icon={<Sparkles size={18} />} color={COLORS.accentAmber} />
        </div>

        {latestPrediction ? (
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] p-4 sm:p-5">
              <div>
                <h3 className="font-extrabold">{latestPrediction.course.code} · Top Predictions</h3>
                <p className="text-sm text-[var(--muted)]">{latestPrediction.course.title}</p>
              </div>
              <Button asChild variant="secondary"><Link href="/predictions">View All</Link></Button>
            </div>
            <div className="p-4 sm:p-5">
              <TopicPreviewChart topics={latestPrediction.prediction.topics} />
            </div>
          </Card>
        ) : (
          <Card className="py-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-oracle-primary/15 text-oracle-primary">
              <Brain size={24} />
            </div>
            <h3 className="text-lg font-black">No analysis yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Add a course, upload real materials, and run analysis to unlock your first prediction insights.</p>
            <Button asChild className="mt-4" icon={<Upload size={15} />}><Link href="/courses">Go to courses</Link></Button>
          </Card>
        )}
      </section>

      <aside className="grid gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[var(--muted)]">Your Courses</h3>
          <Link href="/courses" className="text-sm font-semibold text-oracle-primary">Manage</Link>
        </div>
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
          <Card><p className="text-sm leading-6 text-[var(--muted)]">No courses yet. Your dashboard will fill in as your learning workspace grows.</p></Card>
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
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</div>
    </Card>
  );
}
