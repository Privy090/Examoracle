"use client";

import { BookOpen, Check, FileText, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRiskColor } from "@/lib/utils";
import type { Course } from "@/types/domain";

interface CourseCardProps {
  course: Course;
  onAnalyze?: (course: Course) => void;
}

export function CourseCard({ course, onAnalyze }: CourseCardProps) {
  const riskColor = course.analyzed ? getRiskColor(course.riskLevel) : "var(--muted)";

  return (
    <Card className="relative overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-oracle-primary to-oracle-primaryLight opacity-80" />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-extrabold">{course.code}</h3>
            <Badge small>{course.level}L</Badge>
          </div>
          <p className="line-clamp-2 text-sm font-medium text-[var(--muted)]">{course.title}</p>
        </div>
        {course.analyzed && <Badge color={riskColor}>{course.riskLevel?.toUpperCase()}</Badge>}
      </div>
      <div className="mb-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        <span className="inline-flex items-center gap-1.5"><FileText size={15} />{course.uploadCount} files</span>
        <span className="inline-flex items-center gap-1.5"><BookOpen size={15} />{course.credits} credits</span>
      </div>
      <Button className="w-full" variant={course.analyzed ? "secondary" : "primary"} onClick={() => onAnalyze?.(course)} icon={course.analyzed ? <Check size={15} /> : <Zap size={15} />}>
        {course.analyzed ? "Re-analyze" : "Analyze Now"}
      </Button>
    </Card>
  );
}
