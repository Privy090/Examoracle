import { BookOpen, Brain, CalendarDays, FileCheck2, Gauge, GraduationCap, Settings, UserRound } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/predictions", label: "AI Predictions", icon: Brain },
  { href: "/planner", label: "Study Planner", icon: CalendarDays },
  { href: "/mock-exams", label: "Mock Exams", icon: GraduationCap }
];

// Keep account items empty — profile + settings live inside the profile area now.
export const accountItems: { href: string; label: string; icon: any }[] = [];
