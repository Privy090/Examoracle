"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCourses, mockFiles, mockTasks, mockUser } from "@/constants/mock-data";
import type { Course, StudyTask, UploadedFileRecord, UserProfile } from "@/types/domain";

interface AppState {
  darkMode: boolean;
  user: UserProfile | null;
  courses: Course[];
  files: UploadedFileRecord[];
  tasks: StudyTask[];
  setDarkMode: (darkMode: boolean) => void;
  setUser: (user: UserProfile | null) => void;
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  setFiles: (files: UploadedFileRecord[]) => void;
  upsertFile: (file: UploadedFileRecord) => void;
  toggleTask: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: true,
      user: mockUser,
      courses: mockCourses,
      files: mockFiles,
      tasks: mockTasks,
      setDarkMode: (darkMode) => set({ darkMode }),
      setUser: (user) => set({ user }),
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (course) => set((state) => ({ courses: state.courses.map((item) => (item.id === course.id ? course : item)) })),
      setFiles: (files) => set({ files }),
      upsertFile: (file) => set((state) => ({ files: [...state.files.filter((item) => item.id !== file.id), file] })),
      toggleTask: (id) => set((state) => ({ tasks: state.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)) }))
    }),
    { name: "examoracle.app" }
  )
);
