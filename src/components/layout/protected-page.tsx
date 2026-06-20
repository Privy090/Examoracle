"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAppStore } from "@/store/app-store";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const user = useAppStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [router, user]);

  if (!user) return null;
  return <AppShell>{children}</AppShell>;
}
