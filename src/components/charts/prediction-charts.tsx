"use client";

import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { COLORS } from "@/constants/design-tokens";
import type { PredictionTopic } from "@/types/domain";
import { getProbabilityColor } from "@/lib/utils";

export function TopicPreviewChart({ topics }: { topics: PredictionTopic[] }) {
  const data = topics.slice(0, 5).map((topic) => ({ name: topic.name.split(" ")[0], pct: topic.probability }));
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart data={data} barSize={24}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
        <YAxis hide domain={[0, 100]} />
        <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`, "Probability"]} />
        <Bar dataKey="pct" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TopicProbabilityChart({ topics }: { topics: PredictionTopic[] }) {
  const data = topics.map((topic) => ({
    name: topic.name.split(" ").slice(0, 2).join(" "),
    value: topic.probability,
    fill: getProbabilityColor(topic.probability)
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" barSize={16}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={90} />
        <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WeeklyStudyChart() {
  const data = [
    { day: "Mon", csc301: 3, csc305: 2, mth301: 0 },
    { day: "Tue", csc301: 0, csc305: 3, mth301: 2 },
    { day: "Wed", csc301: 4, csc305: 0, mth301: 1 },
    { day: "Thu", csc301: 2, csc305: 2, mth301: 2 },
    { day: "Fri", csc301: 0, csc305: 4, mth301: 0 },
    { day: "Sat", csc301: 3, csc305: 1, mth301: 3 },
    { day: "Sun", csc301: 0, csc305: 0, mth301: 0 }
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barSize={16} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="csc301" name="CSC301" fill={COLORS.primary} radius={[3, 3, 0, 0]} />
        <Bar dataKey="csc305" name="CSC305" fill={COLORS.accentGreen} radius={[3, 3, 0, 0]} />
        <Bar dataKey="mth301" name="MTH301" fill={COLORS.accentAmber} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
