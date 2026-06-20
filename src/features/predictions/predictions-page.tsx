"use client";

import { Brain } from "lucide-react";
import { useMemo, useState } from "react";
import { TopicProbabilityChart } from "@/components/charts/lazy-charts";
import { PredictionCard } from "@/components/predictions/prediction-card";
import { RiskMeter } from "@/components/predictions/risk-meter";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { mockPrediction } from "@/constants/mock-data";
import { useAppStore } from "@/store/app-store";

type Tab = "topics" | "recommendations" | "risk" | "plan" | "analytics";

export function PredictionsPage() {
  const courses = useAppStore((state) => state.courses);
  const analyzedCourses = courses.filter((course) => course.analyzed);
  const [selectedId, setSelectedId] = useState(analyzedCourses[0]?.id);
  const [tab, setTab] = useState<Tab>("topics");
  const selected = courses.find((course) => course.id === selectedId);
  const prediction = useMemo(() => ({ ...mockPrediction, courseId: selectedId ?? "c1" }), [selectedId]);

  if (!selected) {
    return <EmptyState title="No Predictions Yet" description="Upload materials and run analysis on a course to see AI predictions here." />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="flex gap-2 overflow-x-auto pb-1 xl:flex-col xl:overflow-visible">
        {analyzedCourses.map((course) => (
          <button key={course.id} onClick={() => setSelectedId(course.id)} className={selectedId === course.id ? "shrink-0 rounded-[10px] border border-oracle-primary bg-oracle-primary/15 px-4 py-2 text-left text-sm font-bold text-oracle-primary" : "shrink-0 rounded-[10px] border border-[var(--border)] bg-[var(--subtle)] px-4 py-2 text-left text-sm font-bold text-[var(--muted)]"}>
            {course.code}
          </button>
        ))}
      </aside>

      <section className="min-w-0">
        <Card className="mb-4 flex items-center gap-3 border-oracle-primary/30 bg-oracle-primary/10">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-oracle-primary/15 text-oracle-primary"><Brain size={22} /></div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-black sm:text-base">{selected.title} · AI Analysis Complete</h2>
            <p className="truncate text-xs text-[var(--muted)]">{prediction.topics.length} topics analyzed · Analyzed {selected.lastAnalyzed}</p>
          </div>
        </Card>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {[
            ["topics", "Topics"],
            ["recommendations", "Study Guide"],
            ["risk", "Risk Meter"],
            ["analytics", "Analytics"],
            ["plan", "Revision Plan"]
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as Tab)} className={tab === id ? "shrink-0 rounded-[10px] bg-oracle-primary px-4 py-2 text-xs font-bold text-white" : "shrink-0 rounded-[10px] border border-[var(--border)] bg-[var(--subtle)] px-4 py-2 text-xs font-bold text-[var(--muted)]"}>
              {label}
            </button>
          ))}
        </div>

        {tab === "topics" && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
            <Card><TopicProbabilityChart topics={prediction.topics} /></Card>
            <div className="grid gap-2">{prediction.topics.map((topic, index) => <PredictionCard key={topic.name} topic={topic} rank={index + 1} />)}</div>
          </div>
        )}

        {tab === "recommendations" && (
          <div className="grid gap-3">
            {prediction.recommendations.map((item, index) => (
              <Card key={item} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-oracle-primary/15 text-xs font-black text-oracle-primary">{index + 1}</div>
                <p className="text-sm leading-6">{item}</p>
              </Card>
            ))}
          </div>
        )}

        {tab === "risk" && <Card><RiskMeter value={prediction.riskMeter} /></Card>}

        {tab === "analytics" && (
          <div className="grid gap-3 md:grid-cols-2">
            {["Topic Frequency Analysis", "Lecturer Pattern Analysis", "Study Priority Matrix", "Exam Confidence Meter"].map((title, index) => (
              <Card key={title}>
                <p className="text-sm font-black">{title}</p>
                <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-oracle-primary/15 to-oracle-accent/10" />
                <Badge className="mt-3" color={index % 2 ? "#00D9A0" : "#6C63FF"}>{index % 2 ? "Stable" : "High signal"}</Badge>
              </Card>
            ))}
          </div>
        )}

        {tab === "plan" && (
          <div className="grid gap-3">
            {prediction.weeklyPlan.map((week) => (
              <Card key={week.week}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[var(--muted)]">WEEK {week.week}</p>
                    <h3 className="text-base font-black">{week.focus}</h3>
                  </div>
                  <Badge>{week.hours}h</Badge>
                </div>
                <div className="flex flex-wrap gap-2">{week.topics.map((topic) => <Badge key={topic} small color="#4FC3F7">{topic}</Badge>)}</div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
