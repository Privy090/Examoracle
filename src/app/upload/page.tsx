import { ProtectedPage } from "@/components/layout/protected-page";
import { UploadPage } from "@/features/upload/upload-page";

export default function UploadRoute() {
  return (
    <ProtectedPage>
      <UploadPage />
    </ProtectedPage>
  );
}
