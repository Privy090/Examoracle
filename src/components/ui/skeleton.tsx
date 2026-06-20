import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-[shimmer_1.5s_infinite] rounded-lg bg-[linear-gradient(90deg,#ffffff08_25%,#ffffff15_50%,#ffffff08_75%)] bg-[length:200%_100%]",
        className
      )}
    />
  );
}
