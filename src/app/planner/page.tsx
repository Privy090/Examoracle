import { ProtectedPage } from "@/components/layout/protected-page";
import { PlannerPage } from "@/features/study-planner/planner-page";

export default function PlannerRoute() {
  return (
    <ProtectedPage>
      <PlannerPage />
    </ProtectedPage>
  );
}
