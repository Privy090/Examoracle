export type RiskLevel = "low" | "medium" | "high";
export type UploadStatus = "queued" | "uploading" | "processing" | "completed" | "error" | "cancelled";
export type UserRole = "student" | "admin" | "support";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  school: string;
  faculty: string;
  department: string;
  level: string;
  avatar?: string | null;
  role?: UserRole;
  joinedAt: string;
  onboardingComplete?: boolean;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  level: string;
  credits: number;
  uploadCount: number;
  analyzed: boolean;
  riskLevel: RiskLevel | null;
  lastAnalyzed: string | null;
}

export interface UploadedFileRecord {
  id: string;
  courseId?: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress?: number;
  uploadedAt: string;
  error?: string;
}

export interface PredictionTopic {
  name: string;
  probability: number;
  confidence: "Low" | "Medium" | "High";
  category: "Core" | "Supporting" | "Extra";
}

export interface WeeklyPlanItem {
  week: number;
  focus: string;
  hours: number;
  topics: string[];
}

export interface CoursePrediction {
  courseId: string;
  topics: PredictionTopic[];
  studyOrder: string[];
  recommendations: string[];
  riskMeter: number;
  weeklyPlan: WeeklyPlanItem[];
  generatedAt?: string;
  sourceFileIds?: string[];
  analytics?: PredictionAnalytics;
}

export interface PredictionAnalytics {
  confidence: number;
  materialCoverage: number;
  pastQuestionWeight: number;
  sourceCount: number;
  fileTypeMix: Array<{ type: string; count: number }>;
}

export interface StudyTask {
  id: string;
  title: string;
  course: string;
  due: string;
  done: boolean;
  priority: RiskLevel;
}
