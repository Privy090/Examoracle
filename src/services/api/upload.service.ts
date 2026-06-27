import { apiClient } from "@/services/api/client";
import { env } from "@/config/env";
import type { UploadedFileRecord } from "@/types/domain";

export interface UploadOptions {
  courseId: string;
  file: File;
  materialType?: "material" | "past_question" | "handout" | "lecture_note" | "course_outline";
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
}

async function putFileWithProgress(url: string, file: File, signal?: AbortSignal, onProgress?: (progress: number) => void) {
  const uploadUrl = url.startsWith("http") ? url : `${env.apiUrl}${url}`;
  const total = file.size;
  let loaded = 0;
  const reader = file.stream().getReader();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }
          loaded += value?.byteLength ?? 0;
          onProgress?.(Math.round((loaded / total) * 100));
          controller.enqueue(value);
        }
      } catch (error) {
        controller.error(error);
      }
    }
  });

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "x-filename": file.name,
    },
    body: stream,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }
}

export const uploadService = {
  async upload({ courseId, file, materialType = "material", signal, onProgress }: UploadOptions): Promise<UploadedFileRecord> {
    const presignRes = await apiClient.post<{ uploadId: string; uploadUrl: string }>("/api/uploads/presign", {
      course_id: courseId,
      filename: file.name,
      content_type: file.type || "application/octet-stream",
      material_type: materialType,
    });

    const { uploadId, uploadUrl } = presignRes.data;
    await putFileWithProgress(uploadUrl, file, signal, onProgress);

    const { data } = await apiClient.post<UploadedFileRecord>("/api/uploads/complete", {
      uploadId,
      courseId,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      materialType: materialType,
    });

    onProgress?.(100);
    return data;
  }
};
