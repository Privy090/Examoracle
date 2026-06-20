import { ProtectedPage } from "@/components/layout/protected-page";
import { ProfilePage } from "@/features/profile/profile-page";

export default function SettingsRoute() {
  return (
    <ProtectedPage>
      <ProfilePage settingsOnly />
    </ProtectedPage>
  );
}
