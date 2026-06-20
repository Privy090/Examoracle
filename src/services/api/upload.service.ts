import { apiClient } from "@/services/api/client";
import type { UploadedFileRecord } from "@/types/domain";

export interface UploadOptions {
  courseId: string;
  file: File;
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
}

export const uploadService = {
  async upload({ courseId, file, signal, onProgress }: UploadOptions): Promise<UploadedFileRecord> {
    const body = new FormData();
    body.append("courseId", courseId);
    body.append("file", file);

    const { data } = await apiClient.post<UploadedFileRecord>("/api/upload", body, {
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
