import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getProbabilityColor } from "@/lib/utils";
import type { PredictionTopic } from "@/types/domain";

export function PredictionCard({ topic, rank }: { topic: PredictionTopic; rank: number }) {
  const color = getProbabilityColor(topic.probability);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-sm font-extrabold" style={{ color, backgroundColor: `${color}18` }}>
        {rank}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 truncate text-sm font-bold">{topic.name}</div>
        <Progress value={topic.probability} color={color} height={5} />
      </div>
      <div className="shrink-0 text-right">
        <div className="text-lg font-extrabold" style={{ color }}>{topic.probability}%</div>
        <Badge small color={color}>{topic.confidence}</Badge>
      </div>
    </div>
  );
}
