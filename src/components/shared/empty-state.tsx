import { Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oracle-primary/15 text-oracle-primary">
        <Brain size={24} aria-hidden="true" />
      </div>
      <h2 className="text-base font-extrabold text-[var(--text)]">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Card>
  );
}
