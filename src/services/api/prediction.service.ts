import { apiClient } from "@/services/api/client";
import type { CoursePrediction } from "@/types/domain";

export const predictionService = {
  async getByCourse(courseId: string): Promise<CoursePrediction> {
    const { data } = await apiClient.get<CoursePrediction>(`/api/predictions/${courseId}`);
    return data;
  },
  async predict(courseId: string): Promise<CoursePrediction> {
    const { data } = await apiClient.post<CoursePrediction>("/api/predict", { courseId });
    return data;
  },
  async analytics(courseId: string) {
    const { data } = await apiClient.get(`/api/analytics/${courseId}`);
    return data;
  }
};
