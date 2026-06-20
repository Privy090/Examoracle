import { BookOpen, Brain, CalendarDays, Gauge, Settings, Upload, UserRound } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/upload", label: "Upload Center", icon: Upload },
  { href: "/predictions", label: "AI Predictions", icon: Brain },
  { href: "/planner", label: "Study Planner", icon: CalendarDays }
];

export const accountItems = [
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings }
];
