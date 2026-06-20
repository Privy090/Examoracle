import { COLORS } from "@/constants/design-tokens";

interface ProgressProps {
  value: number;
  color?: string;
  height?: number;
}

export function Progress({ value, color = COLORS.primary, height = 6 }: ProgressProps) {
  const width = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full rounded-full bg-white/10" style={{ height }}>
      <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}
