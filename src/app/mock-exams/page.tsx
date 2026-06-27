import { ProtectedPage } from "@/components/layout/protected-page";
import { MockExamsPage } from "@/features/mock-exams/mock-exams-page";

export default function MockExamsRoute() {
  return (
    <ProtectedPage>
      <MockExamsPage />
    </ProtectedPage>
  );
}
