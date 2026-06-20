import { Badge } from "@/components/ui/badge";
import { COLORS } from "@/constants/design-tokens";

export function RiskMeter({ value }: { value: number }) {
  const color = value < 40 ? COLORS.accentGreen : value < 70 ? COLORS.accentAmber : COLORS.accent;
  const label = value < 40 ? "Low Risk" : value < 70 ? "Medium Risk" : "High Risk";
  const angle = (value / 100) * 180;

  return (
    <div className="py-3 text-center">
      <div className="relative mx-auto mb-4 h-[100px] w-[180px]">
        <svg width="180" height="100" viewBox="0 0 180 100" role="img" aria-label={`Exam risk ${value}%`}>
          <path d="M 10 90 A 80 80 0 0 1 170 90" fill="none" stroke="var(--border)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 10 90 A 80 80 0 0 1 170 90" fill="none" stroke="url(#riskGrad)" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${(value / 100) * 251.2} 251.2`} />
          <defs>
            <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.accentGreen} />
              <stop offset="50%" stopColor={COLORS.accentAmber} />
              <stop offset="100%" stopColor={COLORS.accent} />
            </linearGradient>
          </defs>
          <g transform={`translate(90, 90) rotate(${angle - 90})`}>
            <line x1="0" y1="0" x2="0" y2="-65" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="0" r="5" fill={color} />
          </g>
        </svg>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-3xl font-extrabold" style={{ color }}>{value}%</div>
      </div>
      <Badge color={color}>{label}</Badge>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">Focus on high-priority topics first, then close gaps in lower-confidence supporting areas.</p>
    </div>
  );
}
