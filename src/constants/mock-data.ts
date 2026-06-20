import type { Course, CoursePrediction, StudyTask, UploadedFileRecord, UserProfile } from "@/types/domain";

export const mockUser: UserProfile = {
  id: "u1",
  fullName: "Chidera Okonkwo",
  email: "chidera@unn.edu.ng",
  school: "University of Nigeria, Nsukka",
  faculty: "Engineering",
  department: "Computer Science",
  level: "300",
  avatar: null,
  role: "student",
  joinedAt: "2024-09-01"
};

export const mockCourses: Course[] = [
  { id: "c1", code: "CSC301", title: "Operating Systems", level: "300", credits: 3, uploadCount: 5, analyzed: true, riskLevel: "medium", lastAnalyzed: "2025-06-10" },
  { id: "c2", code: "CSC305", title: "Database Systems", level: "300", credits: 3, uploadCount: 3, analyzed: true, riskLevel: "low", lastAnalyzed: "2025-06-09" },
  { id: "c3", code: "CSC307", title: "Computer Networks", level: "300", credits: 3, uploadCount: 2, analyzed: false, riskLevel: null, lastAnalyzed: null },
  { id: "c4", code: "MTH301", title: "Numerical Methods", level: "300", credits: 2, uploadCount: 0, analyzed: false, riskLevel: null, lastAnalyzed: null }
];

export const mockPrediction: CoursePrediction = {
  courseId: "c1",
  topics: [
    { name: "Process Scheduling", probability: 94, confidence: "High", category: "Core" },
    { name: "Memory Management", probability: 89, confidence: "High", category: "Core" },
    { name: "Deadlocks & Synchronization", probability: 83, confidence: "High", category: "Core" },
    { name: "File Systems", probability: 76, confidence: "Medium", category: "Supporting" },
    { name: "I/O Management", probability: 71, confidence: "Medium", category: "Supporting" },
    { name: "Virtual Memory", probability: 65, confidence: "Medium", category: "Supporting" },
    { name: "Semaphores & Mutex", probability: 58, confidence: "Low", category: "Extra" }
  ],
  studyOrder: ["Process Scheduling", "Memory Management", "Deadlocks & Synchronization", "File Systems", "I/O Management", "Virtual Memory"],
  recommendations: [
    "Focus heavily on Process Scheduling algorithms. FCFS, SJF, Round Robin, and Priority Scheduling appear repeatedly in past questions.",
    "Memory Management concepts like paging and segmentation are consistently tested. Prepare diagrams.",
    "Deadlock conditions and prevention strategies are high-probability exam topics.",
    "Review past questions from 2019-2023 to spot recurring patterns in question structure."
  ],
  riskMeter: 58,
  weeklyPlan: [
    { week: 1, focus: "Process Scheduling", hours: 8, topics: ["FCFS", "SJF", "Round Robin"] },
    { week: 2, focus: "Memory Management", hours: 7, topics: ["Paging", "Segmentation", "TLB"] },
    { week: 3, focus: "Deadlocks", hours: 6, topics: ["Detection", "Prevention", "Avoidance"] },
    { week: 4, focus: "File Systems & I/O", hours: 5, topics: ["FAT", "NTFS", "Disk Scheduling"] }
  ]
};

export const mockFiles: UploadedFileRecord[] = [
  { id: "f1", courseId: "c1", name: "OS_Lecture_Notes_2024.pdf", size: 2400000, type: "pdf", status: "completed", uploadedAt: "2025-06-08" },
  { id: "f2", courseId: "c1", name: "Past_Questions_2019_2023.pdf", size: 1800000, type: "pdf", status: "completed", uploadedAt: "2025-06-08" },
  { id: "f3", courseId: "c1", name: "Textbook_Chapter1_5.pdf", size: 5200000, type: "pdf", status: "completed", uploadedAt: "2025-06-09" },
  { id: "f4", courseId: "c1", name: "Lab_Manual.docx", size: 890000, type: "docx", status: "completed", uploadedAt: "2025-06-09" },
  { id: "f5", courseId: "c1", name: "Assignment_Solutions.pdf", size: 1100000, type: "pdf", status: "completed", uploadedAt: "2025-06-10" }
];

export const mockTasks: StudyTask[] = [
  { id: "1", title: "Read Process Scheduling notes", course: "CSC301", due: "Today", done: true, priority: "high" },
  { id: "2", title: "Solve past questions on Memory Management", course: "CSC301", due: "Today", done: false, priority: "high" },
  { id: "3", title: "Review ER Diagrams chapter", course: "CSC305", due: "Tomorrow", done: false, priority: "medium" },
  { id: "4", title: "Practice SQL queries", course: "CSC305", due: "Jun 15", done: false, priority: "medium" },
  { id: "5", title: "Solve Gaussian Elimination problems", course: "MTH301", due: "Jun 16", done: false, priority: "low" }
];
