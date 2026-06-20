"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/api/course.service";

export function useCourses() {
  return useQuery({ queryKey: ["courses"], queryFn: courseService.list, staleTime: 60_000 });
}

export function useAnalyzeCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.analyze,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] })
  });
}
