"use client";

import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Sparkles, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courseService } from "@/services/api/course.service";
import { useAppStore } from "@/store/app-store";
import { courseSchema } from "@/validators/course.schema";

const steps = [
  { title: "Add your first course", description: "Create the course you want ExamOracle to study.", icon: GraduationCap },
  { title: "Upload real materials", description: "Bring in notes, past questions, and slides to train the analysis.", icon: UploadCloud },
  { title: "Get predictions", description: "Review likely exam topics and a smarter study plan.", icon: Sparkles }
];

export function OnboardingPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const addCourse = useAppStore((state) => state.addCourse);
  const [course, setCourse] = useState({ code: "", title: "", level: "300", credits: 3 });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function finish() {
    if (!user) {
      router.replace("/auth");
      return;
    }

    if (course.code || course.title) {
      const parsed = courseSchema.safeParse(course);
      if (!parsed.success) {
        setError("Add both a valid course code and title, or skip this step.");
        return;
      }
      try {
        setIsSubmitting(true);
        const created = await courseService.create(parsed.data);
        addCourse(created);
      } catch {
        setError("Course service is unavailable. Start the FastAPI backend before onboarding courses.");
        setIsSubmitting(false);
        return;
      }
    }

    setUser({ ...user, onboardingComplete: true });
    setIsSubmitting(false);
    router.push(course.code ? "/upload" : "/courses");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8 sm:px-6">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl sm:p-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-oracle-primary/20 bg-oracle-primary/10 px-3 py-1 text-sm font-semibold text-oracle-primary">
            <Sparkles size={15} />
            Welcome to ExamOracle
          </div>
          <h1 className="max-w-xl text-3xl font-black leading-tight sm:text-4xl">Set up your study workspace in under two minutes.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">Bring your real course context into one calm dashboard so predictions, uploads, and revision planning all work together from day one.</p>

          <div className="mt-8 grid gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-oracle-primary/15 text-oracle-primary">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-extrabold">
                      <span className="text-[var(--muted)]">0{index + 1}</span>
                      <span>{step.title}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-oracle-primary to-oracle-accent text-white shadow-glow">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black">Start with your first course</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">You can skip this and come back later whenever you are ready.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="grid gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Course code</span>
              <Input value={course.code} onChange={(event) => setCourse((prev) => ({ ...prev, code: event.target.value }))} placeholder="e.g. CS301" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Course title</span>
              <Input value={course.title} onChange={(event) => setCourse((prev) => ({ ...prev, title: event.target.value }))} placeholder="e.g. Data Structures" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Level</span>
              <select value={course.level} onChange={(event) => setCourse((prev) => ({ ...prev, level: event.target.value }))} className="flex h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-3 text-sm font-semibold text-[var(--text)]">
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
              </select>
            </label>
          </div>

          {error && <p className="mt-3 text-sm font-semibold text-oracle-accent">{error}</p>}

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--subtle)] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[var(--text)]"><BookOpen size={16} />Next up</div>
            <p className="text-sm leading-6 text-[var(--muted)]">Upload lecture notes, past questions, and slides. Predictions stay locked until there is enough material to analyze.</p>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => { if (user) setUser({ ...user, onboardingComplete: true }); router.push("/courses"); }}>Skip for now</Button>
            <Button onClick={finish} icon={isSubmitting ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
