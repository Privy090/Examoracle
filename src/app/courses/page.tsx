import { ProtectedPage } from "@/components/layout/protected-page";
import { CoursesPage } from "@/features/courses/courses-page";

export default function CoursesRoute() {
  return (
    <ProtectedPage>
      <CoursesPage />
    </ProtectedPage>
  );
}
