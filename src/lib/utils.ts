import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS } from "@/constants/design-tokens";
import type { RiskLevel } from "@/types/domain";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFileColor(type: string) {
  const colors: Record<string, string> = {
    pdf: "#FF4444",
    docx: "#2B7CD3",
    txt: "#888888",
    jpg: "#E67E22",
    jpeg: "#E67E22",
    png: "#27AE60"
  };
  return colors[type.toLowerCase()] ?? "#888888";
}

export function getRiskColor(level?: RiskLevel | null) {
  if (level === "low") return COLORS.accentGreen;
  if (level === "medium") return COLORS.accentAmber;
  return COLORS.accent;
}

export function getProbabilityColor(value: number) {
  if (value >= 85) return COLORS.accent;
  if (value >= 70) return COLORS.accentAmber;
  return COLORS.accentGreen;
}
