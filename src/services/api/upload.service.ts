import { apiClient } from "@/services/api/client";
import type { UploadedFileRecord } from "@/types/domain";

export interface UploadOptions {
  courseId: string;
  file: File;
  materialType?: "material" | "past_question" | "handout" | "lecture_note" | "course_outline";
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
}

export const uploadService = {
  async upload({ courseId, file, materialType = "material", signal, onProgress }: UploadOptions): Promise<UploadedFileRecord> {
    const body = new FormData();
    body.append("course_id", courseId);
    body.append("material_type", materialType);
    body.append("file", file);

    const { data } = await apiClient.post<UploadedFileRecord>("/api/uploads", body, {
      signal,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (!event.total) return;
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    });

    return data;
  }
};
