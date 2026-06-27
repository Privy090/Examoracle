import { Brain, LoaderCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

export function LoadingState({
  title = "Loading your workspace",
  description = "Preparing your experience so everything feels smoother and more reliable."
}: LoadingStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-[var(--border)]/70 bg-[var(--surface)]/90 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-oracle-primary/20 to-oracle-accent/20 text-oracle-primary">
          <Brain size={24} aria-hidden="true" />
        </div>
        <div className="mb-3 flex justify-center">
          <LoaderCircle className="h-5 w-5 animate-spin text-oracle-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-extrabold text-[var(--text)]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
      </Card>
    </div>
  );
}
