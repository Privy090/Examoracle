import { ProtectedPage } from "@/components/layout/protected-page";
import { PredictionsPage } from "@/features/predictions/predictions-page";

export default function PredictionsRoute() {
  return (
    <ProtectedPage>
      <PredictionsPage />
    </ProtectedPage>
  );
}
