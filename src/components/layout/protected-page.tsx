"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAppStore } from "@/store/app-store";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const user = useAppStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) router.replace("/auth");
    if (user && !user.onboardingComplete && pathname !== "/onboarding") router.replace("/onboarding");
  }, [pathname, router, user]);

  if (!user) return null;
  if (!user.onboardingComplete && pathname !== "/onboarding") return null;
  return <AppShell>{children}</AppShell>;
}
