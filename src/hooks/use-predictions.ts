"use client";

import { useQuery } from "@tanstack/react-query";
import { predictionService } from "@/services/api/prediction.service";

export function useCoursePrediction(courseId?: string) {
  return useQuery({
    queryKey: ["predictions", courseId],
    queryFn: () => predictionService.getByCourse(courseId!),
    enabled: Boolean(courseId),
    staleTime: 60_000
  });
}
