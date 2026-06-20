import { apiClient } from "@/services/api/client";
import { mockPrediction } from "@/constants/mock-data";

export const studyPlanService = {
  async getByCourse(courseId: string) {
    try {
      const { data } = await apiClient.get(`/api/study-plan/${courseId}`);
      return data;
    } catch {
      return mockPrediction.weeklyPlan;
    }
  }
};
