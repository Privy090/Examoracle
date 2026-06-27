import { apiClient } from "@/services/api/client";

export const studyPlanService = {
  async getByCourse(courseId: string) {
    const { data } = await apiClient.get(`/api/study-plans/${courseId}`);
    return data;
  }
};
