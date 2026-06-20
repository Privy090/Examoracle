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
import { buildStudyTasks, canAnalyzeCourse, generateLocalPrediction } from "@/lib/local-analysis";

export function CoursesPage() {
  const courses = useAppStore((state) => state.courses);
  const addCourse = useAppStore((state) => state.addCourse);
  const updateCourse = useAppStore((state) => state.updateCourse);
  const files = useAppStore((state) => state.files);
  const setPrediction = useAppStore((state) => state.setPrediction);
  const setTasks = useAppStore((state) => state.setTasks);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", title: "", level: "300", credits: 3 });
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
    if (!canAnalyzeCourse(course, files)) {
      setNotice(`Upload completed materials for ${course.code} before running analysis.`);
      return;
    }
    setNotice(null);
    setAnalyzing(course.id);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const prediction = generateLocalPrediction(course, files);
    setPrediction(prediction);
    setTasks(buildStudyTasks(course, prediction));
    updateCourse({
      ...course,
      uploadCount: files.filter((file) => file.courseId === course.id && file.status === "completed").length,
      analyzed: true,
      riskLevel: prediction.riskMeter < 40 ? "low" : prediction.riskMeter < 70 ? "medium" : "high",
      lastAnalyzed: new Date().toISOString().slice(0, 10)
    });
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
            <Input value={form.code} onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))} placeholder="Course code" aria-label="Course code" />
            <Input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Course title" aria-label="Course title" className="lg:col-span-2" />
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

      {notice && (
        <Card className="border-oracle-amber/40 bg-oracle-amber/10">
          <p className="text-sm font-bold text-oracle-amber">{notice}</p>
        </Card>
      )}

      {courses.length ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => <CourseCard key={course.id} course={{ ...course, uploadCount: files.filter((file) => file.courseId === course.id && file.status === "completed").length }} onAnalyze={analyze} />)}
        </div>
      ) : (
        <Card className="py-10 text-center">
          <h2 className="text-lg font-black">No courses yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Add your real courses first. ExamOracle will only generate predictions after you upload materials for each course.</p>
        </Card>
      )}
    </div>
  );
}
