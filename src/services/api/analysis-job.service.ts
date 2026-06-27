import { apiClient } from "@/services/api/client";
import type { AnalysisJob } from "@/types/domain";

interface CreateAnalysisJobInput {
  courseId: string;
  modelProvider?: string;
  includePastQuestions?: boolean;
}

export const analysisJobService = {
  async create(input: CreateAnalysisJobInput): Promise<AnalysisJob> {
    const { data } = await apiClient.post<AnalysisJob>("/api/analysis-jobs", {
      course_id: input.courseId,
      model_provider: input.modelProvider ?? "llama",
      include_past_questions: input.includePastQuestions ?? true
    });
    return data;
  },
  async get(jobId: string): Promise<AnalysisJob> {
    const { data } = await apiClient.get<AnalysisJob>(`/api/analysis-jobs/${jobId}`);
    return data;
  }
};
