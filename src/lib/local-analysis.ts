import type { Course, CoursePrediction, PredictionTopic, StudyTask, UploadedFileRecord } from "@/types/domain";

const domainTopics: Record<string, string[]> = {
  operating: ["Process Scheduling", "Memory Management", "Deadlocks & Synchronization", "File Systems", "Virtual Memory", "I/O Management"],
  database: ["SQL Queries", "Normalization", "ER Diagrams", "Transactions", "Indexing", "Relational Algebra"],
  network: ["OSI Model", "TCP/IP", "Routing", "Subnetting", "Congestion Control", "Network Security"],
  numerical: ["Gaussian Elimination", "Interpolation", "Numerical Integration", "Root Finding", "Error Analysis", "Differential Equations"],
  default: ["Core Concepts", "Past Question Patterns", "Definitions & Theory", "Worked Examples", "Diagrams", "Common Problem Types"]
};

export function canAnalyzeCourse(course: Course, files: UploadedFileRecord[]) {
  return files.some((file) => file.courseId === course.id && file.status === "completed");
}

export function generateLocalPrediction(course: Course, files: UploadedFileRecord[]): CoursePrediction {
  const courseFiles = files.filter((file) => file.courseId === course.id && file.status === "completed");
  const key = Object.keys(domainTopics).find((item) => `${course.code} ${course.title}`.toLowerCase().includes(item)) ?? "default";
  const fileNames = courseFiles.map((file) => file.name.toLowerCase()).join(" ");
  const hasPastQuestions = /past|question|exam|pq|quiz/.test(fileNames);
  const hasLectureNotes = /lecture|note|slide|handout|outline/.test(fileNames);
  const hasText = courseFiles.some((file) => file.type === "txt");
  const sourceStrength = Math.min(24, courseFiles.length * 5 + (hasPastQuestions ? 8 : 0) + (hasLectureNotes ? 5 : 0) + (hasText ? 3 : 0));

  const topics: PredictionTopic[] = domainTopics[key].map((name, index) => {
    const matched = name.toLowerCase().split(/\W+/).some((part) => part.length > 4 && fileNames.includes(part));
    const probability = Math.max(42, Math.min(96, 82 - index * 6 + sourceStrength + (matched ? 7 : 0)));
    return {
      name,
      probability,
      confidence: probability >= 82 ? "High" : probability >= 66 ? "Medium" : "Low",
      category: index < 3 ? "Core" : index < 5 ? "Supporting" : "Extra"
    };
  });

  const riskMeter = Math.max(18, Math.min(88, 78 - sourceStrength - courseFiles.length * 4));
  const fileTypeMix = Object.entries(
    courseFiles.reduce<Record<string, number>>((acc, file) => {
      acc[file.type] = (acc[file.type] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([type, count]) => ({ type, count }));

  return {
    courseId: course.id,
    topics,
    studyOrder: topics.slice().sort((a, b) => b.probability - a.probability).map((topic) => topic.name),
    recommendations: [
      hasPastQuestions ? "Past-question material was detected, so recurring question patterns are weighted strongly." : "Add past questions to improve pattern confidence and ranking accuracy.",
      hasLectureNotes ? "Lecture notes or handouts were detected and used to strengthen topic coverage." : "Upload lecture notes or handouts so the model can compare taught material with likely exam topics.",
      `Analysis used ${courseFiles.length} completed source file${courseFiles.length === 1 ? "" : "s"} for ${course.code}.`
    ],
    riskMeter,
    weeklyPlan: topics.slice(0, 4).map((topic, index) => ({
      week: index + 1,
      focus: topic.name,
      hours: Math.max(3, Math.round((100 - topic.probability) / 8) + 4),
      topics: [topic.category, topic.confidence, `${topic.probability}% probability`]
    })),
    generatedAt: new Date().toISOString(),
    sourceFileIds: courseFiles.map((file) => file.id),
    analytics: {
      confidence: Math.round(topics.reduce((sum, topic) => sum + topic.probability, 0) / topics.length),
      materialCoverage: Math.min(100, 28 + sourceStrength * 3),
      pastQuestionWeight: hasPastQuestions ? 82 : 34,
      sourceCount: courseFiles.length,
      fileTypeMix
    }
  };
}

export function buildStudyTasks(course: Course, prediction: CoursePrediction): StudyTask[] {
  return prediction.weeklyPlan.flatMap((week) => [
    {
      id: `${course.id}-${week.week}-read`,
      title: `Review ${week.focus} for ${course.code}`,
      course: course.code,
      due: `Week ${week.week}`,
      done: false,
      priority: week.week <= 2 ? "high" : "medium"
    }
  ]);
}
