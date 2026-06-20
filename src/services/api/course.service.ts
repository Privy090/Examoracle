import { apiClient } from "@/services/api/client";
import type { Course } from "@/types/domain";

export const courseService = {
  async list(): Promise<Course[]> {
    const { data } = await apiClient.get<Course[]>("/api/courses");
    return data;
  },
  async create(input: Pick<Course, "code" | "title" | "level" | "credits">): Promise<Course> {
    const { data } = await apiClient.post<Course>("/api/courses", input);
    return data;
  },
  async analyze(courseId: string): Promise<Course> {
    const { data } = await apiClient.post<Course>("/api/analyze", { courseId });
    return data;
  }
};
