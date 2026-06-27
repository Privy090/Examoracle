"use client";

import { Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";
import { courseSchema } from "@/validators/course.schema";
import type { Course } from "@/types/domain";
import { analysisJobService } from "@/services/api/analysis-job.service";
import { courseService } from "@/services/api/course.service";

export function CoursesPage() {
  const courses = useAppStore((state) => state.courses);
  const addCourse = useAppStore((state) => state.addCourse);
  const updateCourse = useAppStore((state) => state.updateCourse);
  const files = useAppStore((state) => state.files);
  const setAnalysisJob = useAppStore((state) => state.setAnalysisJob);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", title: "", level: "300", credits: 3 });
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit() {
    const parsed = courseSchema.safeParse(form);
    if (!parsed.success) {
      setError("Add a valid course code, title, level, and credit load.");
      return;
    }
    try {
      const created = await courseService.create(parsed.data);
      addCourse(created);
    } catch {
      setError("Course service is unavailable. Start the FastAPI backend before creating courses.");
      return;
    }
    setForm({ code: "", title: "", level: "300", credits: 3 });
    setOpen(false);
  }

  async function analyze(course: Course) {
    if (!files.some((file) => file.courseId === course.id && file.status === "completed")) {
      setNotice(`Upload completed materials for ${course.code} before running analysis.`);
      return;
    }
    setNotice(null);
    setAnalyzing(course.id);
    try {
      const job = await analysisJobService.create({ courseId: course.id });
      setAnalysisJob(job);
      updateCourse({ ...course, uploadCount: files.filter((file) => file.courseId === course.id && file.status === "completed").length });
      setNotice(`${course.code} analysis job queued. Results will appear when the backend worker completes.`);
    } catch {
      setNotice("Analysis job service is unavailable. Start the FastAPI backend and queue worker.");
    } finally {
      setAnalyzing(null);
    }
  }

  return (
    <div className="grid gap-4">
      <Card className="flex flex-col gap-4 rounded-[24px] border-oracle-primary/20 bg-gradient-to-br from-oracle-primary/10 via-[var(--surface)] to-oracle-accent/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-oracle-primary/20 bg-white/10 px-3 py-1 text-sm font-semibold text-oracle-primary">
            <Sparkles size={15} />
            Course hub
          </div>
          <h2 className="mt-3 text-xl font-black">Keep everything organized in one place.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Manage the courses you are studying, attach materials, and queue analysis without leaving the flow.</p>
        </div>
        <Button onClick={() => setOpen((value) => !value)} icon={<Plus size={16} />}>Add Course</Button>
      </Card>

      {open && (
        <Card className="grid gap-3 rounded-[24px]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input value={form.code} onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))} placeholder="Course code" aria-label="Course code" />
            <Input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Course title" aria-label="Course title" className="lg:col-span-2" />
            <label className="grid gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Level</span>
              <select value={form.level} onChange={(event) => setForm((prev) => ({ ...prev, level: event.target.value }))} className="flex h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-3 text-sm font-semibold text-[var(--text)]">
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
              </select>
            </label>
            <Input value={form.credits} onChange={(event) => setForm((prev) => ({ ...prev, credits: Number(event.target.value) }))} type="number" min={1} max={6} aria-label="Credits" />
          </div>
          {error && <p className="text-sm font-semibold text-oracle-accent">{error}</p>}
          <Button className="w-full sm:w-fit" onClick={submit}>Save Course</Button>
        </Card>
      )}

      {analyzing && (
        <Card className="border-oracle-primary/30 bg-oracle-primary/10">
          <p className="text-sm font-extrabold text-oracle-primary">Creating Analysis Job</p>
          <p className="text-sm text-[var(--muted)]">Heavy AI processing will run in the backend queue worker.</p>
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
