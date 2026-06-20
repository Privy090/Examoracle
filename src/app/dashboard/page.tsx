import { ProtectedPage } from "@/components/layout/protected-page";
import { DashboardPage } from "@/features/dashboard/dashboard-page";

export default function DashboardRoute() {
  return (
    <ProtectedPage>
      <DashboardPage />
    </ProtectedPage>
  );
}
