"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AnalysisJob, Course, CoursePrediction, StudyTask, UploadedFileRecord, UserProfile } from "@/types/domain";

interface AppState {
  darkMode: boolean;
  user: UserProfile | null;
  courses: Course[];
  files: UploadedFileRecord[];
  predictions: Record<string, CoursePrediction>;
  analysisJobs: Record<string, AnalysisJob>;
  tasks: StudyTask[];
  setDarkMode: (darkMode: boolean) => void;
  setUser: (user: UserProfile | null) => void;
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  setFiles: (files: UploadedFileRecord[]) => void;
  upsertFile: (file: UploadedFileRecord) => void;
  removeFile: (id: string) => void;
  setPrediction: (prediction: CoursePrediction) => void;
  setAnalysisJob: (job: AnalysisJob) => void;
  setTasks: (tasks: StudyTask[]) => void;
  toggleTask: (id: string) => void;
  resetWorkspace: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: true,
      user: null,
      courses: [],
      files: [],
      predictions: {},
      analysisJobs: {},
      tasks: [],
      setDarkMode: (darkMode) => set({ darkMode }),
      setUser: (user) => set({ user }),
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (course) => set((state) => ({ courses: state.courses.map((item) => (item.id === course.id ? course : item)) })),
      setFiles: (files) => set({ files }),
      upsertFile: (file) => set((state) => ({ files: [...state.files.filter((item) => item.id !== file.id), file] })),
      removeFile: (id) => set((state) => ({ files: state.files.filter((file) => file.id !== id) })),
      setPrediction: (prediction) => set((state) => ({ predictions: { ...state.predictions, [prediction.courseId]: prediction } })),
      setAnalysisJob: (job) => set((state) => ({ analysisJobs: { ...state.analysisJobs, [job.courseId]: job } })),
      setTasks: (tasks) => set({ tasks }),
      toggleTask: (id) => set((state) => ({ tasks: state.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)) })),
      resetWorkspace: () => set({ courses: [], files: [], predictions: {}, analysisJobs: {}, tasks: [] })
    }),
    {
      name: "examoracle.app",
      version: 2,
      migrate: () => ({
        darkMode: true,
        user: null,
        courses: [],
        files: [],
        predictions: {},
        analysisJobs: {},
        tasks: []
      })
    }
  )
);
