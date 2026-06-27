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
    // 1) Request a presigned upload URL from the backend
    const presignRes = await apiClient.post<{ uploadId: string; uploadUrl: string }>("/api/uploads/presign", {
      course_id: courseId,
      filename: file.name,
      content_type: file.type || "application/octet-stream",
      material_type: materialType,
    });

    const { uploadId, uploadUrl } = presignRes.data;

    // 2) PUT the file directly to the provided upload URL (use fetch to allow AbortSignal)
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "x-filename": file.name,
      },
      body: file,
      signal,
    });

    // 3) Tell the backend to finalize the upload and create metadata
    const { data } = await apiClient.post<UploadedFileRecord>("/api/uploads/complete", {
      uploadId,
      courseId,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      materialType: materialType,
    });

    // Note: we don't have per-chunk progress with this simple flow; call onProgress=100
    onProgress?.(100);
    return data;
  }
};
