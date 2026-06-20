"use client";

import { useRef } from "react";
import { uploadService } from "@/services/api/upload.service";
import type { UploadedFileRecord } from "@/types/domain";

export function useUploadQueue(onUpdate: (file: UploadedFileRecord) => void) {
  const controllers = useRef(new Map<string, AbortController>());

  async function upload(courseId: string, file: File) {
    const id = `f-${crypto.randomUUID()}`;
    const type = file.name.split(".").pop()?.toLowerCase() ?? "file";
    const controller = new AbortController();
    controllers.current.set(id, controller);

    onUpdate({ id, courseId, name: file.name, size: file.size, type, status: "uploading", progress: 0, uploadedAt: new Date().toISOString().slice(0, 10) });

    try {
      const result = await uploadService.upload({
        courseId,
        file,
        signal: controller.signal,
        onProgress: (progress) => onUpdate({ id, courseId, name: file.name, size: file.size, type, status: "uploading", progress, uploadedAt: new Date().toISOString().slice(0, 10) })
      });
      onUpdate({ ...result, id, status: "completed", progress: 100 });
    } catch (error) {
      const cancelled = controller.signal.aborted;
      onUpdate({ id, courseId, name: file.name, size: file.size, type, status: cancelled ? "cancelled" : "error", progress: 0, uploadedAt: new Date().toISOString().slice(0, 10), error: cancelled ? "Upload cancelled" : "Upload failed" });
    } finally {
      controllers.current.delete(id);
    }

    return id;
  }

  function cancel(id: string) {
    controllers.current.get(id)?.abort();
  }

  return { upload, cancel };
}
