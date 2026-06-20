"use client";

import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";
import { courseSchema } from "@/validators/course.schema";

export function OnboardingPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const addCourse = useAppStore((state) => state.addCourse);
  const [course, setCourse] = useState({ code: "", title: "", level: user?.level ?? "300", credits: 3 });
  const [error, setError] = useState<string | null>(null);

  function finish() {
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
      addCourse({ id: `c-${crypto.randomUUID()}`, ...parsed.data, uploadCount: 0, analyzed: false, riskLevel: null, lastAnalyzed: null });
    }

    setUser({ ...user, onboardingComplete: true });
    router.push(course.code ? "/upload" : "/courses");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8">
      <Card className="w-full max-w-2xl p-6 sm:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-oracle-primary/15 text-oracle-primary">
            <GraduationCap size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-black">Set up your first course</h1>
            <p className="text-sm text-[var(--muted)]">ExamOracle starts empty and learns from the materials each student uploads.</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-xs font-bold text-[var(--muted)]">Course Code</span>
            <Input value={course.code} onChange={(event) => setCourse((prev) => ({ ...prev, code: event.target.value }))} placeholder="Course code" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-bold text-[var(--muted)]">Course Title</span>
            <Input value={course.title} onChange={(event) => setCourse((prev) => ({ ...prev, title: event.target.value }))} placeholder="Course title" />
          </label>
        </div>
        {error && <p className="mt-3 text-sm font-semibold text-oracle-accent">{error}</p>}

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--subtle)] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-extrabold"><BookOpen size={16} />Next step</div>
          <p className="text-sm leading-6 text-[var(--muted)]">Upload lecture notes, handouts, outlines, or past questions. Predictions stay locked until a course has completed source files.</p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => { if (user) setUser({ ...user, onboardingComplete: true }); router.push("/courses"); }}>Skip for now</Button>
          <Button onClick={finish} icon={<ArrowRight size={16} />}>Continue</Button>
        </div>
      </Card>
    </main>
  );
}
