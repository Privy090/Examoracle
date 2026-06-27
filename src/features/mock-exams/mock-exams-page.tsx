"use client";

import { Brain, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";

export function MockExamsPage() {
  const courses = useAppStore((state) => state.courses);

  return (
    <div className="grid gap-4">
      <Card className="rounded-[24px] border-oracle-primary/20 bg-gradient-to-br from-oracle-primary/10 via-[var(--surface)] to-oracle-accent/10 p-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-oracle-primary/20 bg-white/10 px-3 py-1 text-sm font-semibold text-oracle-primary">
          <Sparkles size={15} />
          Mock exams
        </div>
        <h2 className="mt-3 text-xl font-black">Practice the questions most likely to appear in your exams.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">ExamOracle will suggest realistic practice questions for each course based on your uploaded materials and analysis.</p>
      </Card>

      {courses.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="rounded-[24px] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-oracle-primary/15 text-oracle-primary">
                  <Brain size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold">{course.code}</h3>
                  <p className="text-sm text-[var(--muted)]">{course.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">AI-generated mock questions will appear here once the course has enough materials and analysis.</p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-10 text-center">
          <h3 className="text-lg font-black">No courses yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Add a course first, then upload material to unlock mock exam practice.</p>
        </Card>
      )}
    </div>
  );
}
