import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  small?: boolean;
  className?: string;
}

export function Badge({ children, color = "#6C63FF", small = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-md border font-bold tracking-normal",
        small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
        className
      )}
      style={{ color, backgroundColor: `${color}22`, borderColor: `${color}44` }}
    >
      {children}
    </span>
  );
}
