"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { LoadingState } from "@/components/shared/loading-state";
import { useAppStore } from "@/store/app-store";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const user = useAppStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  const isOnboardingRoute = pathname === "/onboarding";
  const shouldBlockForOnboarding = Boolean(user && !user.onboardingComplete && !isOnboardingRoute);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (!user) {
      router.replace("/auth");
      return;
    }

    if (shouldBlockForOnboarding) {
      router.replace("/onboarding");
    }
  }, [isReady, pathname, router, shouldBlockForOnboarding, user]);

  if (!isReady) return <LoadingState title="Preparing your workspace" description="Checking your session and route access before loading the app shell." />;
  if (!user) return <LoadingState title="Redirecting to sign in" description="You’ll be taken to the authentication flow momentarily." />;
  if (shouldBlockForOnboarding) return <LoadingState title="Finishing onboarding" description="We’re sending you to complete your profile setup first." />;

  return <AppShell>{children}</AppShell>;
}
