"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";
import { courseSchema } from "@/validators/course.schema";
import type { Course } from "@/types/domain";

export function CoursesPage() {
  const courses = useAppStore((state) => state.courses);
  const addCourse = useAppStore((state) => state.addCourse);
  const updateCourse = useAppStore((state) => state.updateCourse);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", title: "", level: "300", credits: 3 });
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  function submit() {
    const parsed = courseSchema.safeParse(form);
    if (!parsed.success) {
      setError("Add a valid course code, title, level, and credit load.");
      return;
    }
    addCourse({ id: `c-${crypto.randomUUID()}`, ...parsed.data, uploadCount: 0, analyzed: false, riskLevel: null, lastAnalyzed: null });
    setForm({ code: "", title: "", level: "300", credits: 3 });
    setOpen(false);
  }

  async function analyze(course: Course) {
    setAnalyzing(course.id);
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateCourse({ ...course, analyzed: true, riskLevel: course.riskLevel ?? "medium", lastAnalyzed: new Date().toISOString().slice(0, 10) });
    setAnalyzing(null);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--muted)]">{courses.length} courses enrolled</p>
        <Button onClick={() => setOpen((value) => !value)} icon={<Plus size={16} />}>Add Course</Button>
      </div>

      {open && (
        <Card className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input value={form.code} onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))} placeholder="CSC301" aria-label="Course code" />
            <Input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Operating Systems" aria-label="Course title" className="lg:col-span-2" />
            <Input value={form.credits} onChange={(event) => setForm((prev) => ({ ...prev, credits: Number(event.target.value) }))} type="number" min={1} max={6} aria-label="Credits" />
          </div>
          {error && <p className="text-sm font-semibold text-oracle-accent">{error}</p>}
          <Button className="w-full sm:w-fit" onClick={submit}>Save Course</Button>
        </Card>
      )}

      {analyzing && (
        <Card className="border-oracle-primary/30 bg-oracle-primary/10">
          <p className="text-sm font-extrabold text-oracle-primary">AI Analysis in Progress</p>
          <p className="text-sm text-[var(--muted)]">Processing materials and generating predictions...</p>
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => <CourseCard key={course.id} course={course} onAnalyze={analyze} />)}
      </div>
    </div>
  );
}
