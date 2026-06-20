"use client";

import { RotateCcw, Trash2, UploadCloud, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { localFileStore } from "@/services/uploads/local-file-store";
import { useAppStore } from "@/store/app-store";
import { formatBytes, getFileColor } from "@/lib/utils";
import { uploadFileSchema } from "@/validators/upload.schema";

export function UploadPage() {
  const courses = useAppStore((state) => state.courses);
  const files = useAppStore((state) => state.files);
  const upsertFile = useAppStore((state) => state.upsertFile);
  const removeFile = useAppStore((state) => state.removeFile);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedCourse && courses[0]) setSelectedCourse(courses[0].id);
  }, [courses, selectedCourse]);

  const handleFiles = useCallback(async (incoming: FileList | File[]) => {
    if (!selectedCourse) return;
    const list = Array.from(incoming);
    for (const file of list) {
      const parsed = uploadFileSchema.safeParse(file);
      const id = `f-${crypto.randomUUID()}`;
      const type = file.name.split(".").pop()?.toLowerCase() ?? "file";
      if (!parsed.success) {
        upsertFile({ id, courseId: selectedCourse, name: file.name, size: file.size, type, status: "error", uploadedAt: new Date().toISOString().slice(0, 10), error: parsed.error.issues[0]?.message });
        continue;
      }
      await localFileStore.putBlob(id, file);
      upsertFile({ id, courseId: selectedCourse, name: file.name, size: file.size, type, status: "uploading", progress: 0, uploadedAt: new Date().toISOString().slice(0, 10) });
      for (const progress of [25, 55, 85, 100]) {
        await new Promise((resolve) => setTimeout(resolve, 120));
        upsertFile({ id, courseId: selectedCourse, name: file.name, size: file.size, type, status: progress === 100 ? "completed" : "uploading", progress, uploadedAt: new Date().toISOString().slice(0, 10) });
      }
    }
  }, [selectedCourse, upsertFile]);

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <Card className="h-fit">
        <label className="mb-2 block text-sm font-bold text-[var(--muted)]">Upload for Course</label>
        {courses.length ? <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {courses.map((course) => (
            <button key={course.id} onClick={() => setSelectedCourse(course.id)} className={selectedCourse === course.id ? "shrink-0 rounded-[10px] border border-oracle-primary bg-oracle-primary/15 px-4 py-2 text-sm font-bold text-oracle-primary" : "shrink-0 rounded-[10px] border border-[var(--border)] bg-[var(--subtle)] px-4 py-2 text-sm font-bold text-[var(--muted)]"}>
              {course.code}
            </button>
          ))}
        </div> : <p className="text-sm text-[var(--muted)]">Add a course before uploading study material.</p>}
      </Card>

      <section className="grid gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); void handleFiles(event.dataTransfer.files); }}
          className={courses.length ? (dragging ? "cursor-pointer rounded-2xl border-2 border-dashed border-oracle-primary bg-oracle-primary/10 p-8 text-center" : "cursor-pointer rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--subtle)] p-8 text-center") : "pointer-events-none rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--subtle)] p-8 text-center opacity-60"}
          role="button"
          tabIndex={0}
        >
          <input ref={inputRef} type="file" multiple accept=".pdf,.docx,.txt,.jpg,.jpeg,.png" className="hidden" onChange={(event) => event.target.files && void handleFiles(event.target.files)} />
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-oracle-primary/15 text-oracle-primary"><UploadCloud size={28} /></div>
          <h2 className="text-lg font-extrabold">Drop files here or tap to browse</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">PDF, DOCX, TXT, JPG, PNG up to 50MB each</p>
        </div>

        <div className="grid gap-2">
          {files.map((file) => {
            const color = getFileColor(file.type);
            return (
              <Card key={file.id} className="flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[10px] font-black" style={{ color, backgroundColor: `${color}20` }}>{file.type.toUpperCase()}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold">{file.name}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span>{formatBytes(file.size)}</span>
                    {file.status === "uploading" && <Progress value={file.progress ?? 0} height={4} />}
                  </div>
                  {file.error && <p className="mt-1 text-xs font-semibold text-oracle-accent">{file.error}</p>}
                </div>
                <Badge small color={file.status === "completed" ? "#00D9A0" : file.status === "error" ? "#FF6B6B" : "#6C63FF"}>{file.status.toUpperCase()}</Badge>
                {file.status === "error" && <Button variant="ghost" className="h-9 w-9 px-0" aria-label="Retry"><RotateCcw size={15} /></Button>}
                {file.status === "uploading" && <Button variant="ghost" className="h-9 w-9 px-0" aria-label="Cancel"><X size={15} /></Button>}
                <Button variant="ghost" className="h-9 w-9 px-0" aria-label="Remove file" onClick={() => removeFile(file.id)}><Trash2 size={15} /></Button>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
