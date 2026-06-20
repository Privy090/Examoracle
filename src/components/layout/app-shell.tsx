"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Menu, Moon, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { accountItems, navItems } from "@/components/layout/nav-items";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const pageCopy: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back" },
  "/courses": { title: "My Courses", subtitle: "Course workspaces and analysis" },
  "/upload": { title: "Upload Center", subtitle: "Upload lecture notes and past questions" },
  "/predictions": { title: "AI Predictions", subtitle: "Exam topic predictions and study guide" },
  "/planner": { title: "Study Planner", subtitle: "Your personalized study schedule" },
  "/profile": { title: "Profile", subtitle: "Account settings and preferences" },
  "/settings": { title: "Settings", subtitle: "App preferences" }
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const darkMode = useAppStore((state) => state.darkMode);
  const setDarkMode = useAppStore((state) => state.setDarkMode);
  const user = useAppStore((state) => state.user);
  const copy = pageCopy[pathname] ?? pageCopy["/dashboard"];
  const initials = useMemo(() => user?.fullName?.slice(0, 1) ?? "E", [user?.fullName]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-[var(--border)] bg-[var(--surface)] px-2 py-5 transition-[width] md:flex md:flex-col",
          collapsed ? "w-[68px]" : "w-[232px]"
        )}
      >
        <Link href="/dashboard" className="mb-7 flex items-center gap-3 px-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-oracle-primary to-oracle-primaryLight text-white shadow-glow">
            <Brain size={18} aria-hidden="true" />
          </span>
          {!collapsed && <span className="text-base font-extrabold tracking-normal">ExamOracle</span>}
        </Link>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-semibold text-[var(--muted)] transition hover:bg-oracle-primary/10 hover:text-oracle-primary",
                  collapsed && "justify-center px-0",
                  active && "bg-oracle-primary/15 text-oracle-primary"
                )}
              >
                <Icon size={18} aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--border)] pt-3">
          {accountItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--subtle)]", collapsed && "justify-center px-0")}
              >
                <Icon size={18} aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
          {!collapsed && user && (
            <div className="mt-3 flex items-center gap-3 rounded-[10px] bg-[var(--subtle)] p-3">
              <Avatar initial={initials} />
              <div className="min-w-0">
                <div className="truncate text-sm font-extrabold">{user.fullName.split(" ")[0]}</div>
                <div className="text-xs text-[var(--muted)]">{user.level}L Student</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className={cn("min-h-screen transition-[padding]", collapsed ? "md:pl-[68px]" : "md:pl-[232px]")}>
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 px-3 py-3 backdrop-blur sm:px-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="secondary" className="hidden h-10 w-10 px-0 md:inline-flex" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle sidebar">
                <Menu size={18} />
              </Button>
              <div className="min-w-0">
                <h1 className="truncate text-base font-extrabold sm:text-lg">{copy.title}</h1>
                <p className="truncate text-xs text-[var(--muted)] sm:text-sm">{copy.subtitle}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="secondary" className="h-10 w-10 px-0" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              <Avatar initial={initials} />
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-7xl px-3 pb-24 pt-4 sm:px-5 md:pb-8">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-[var(--border)] bg-[var(--surface)] px-1 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 md:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-bold text-[var(--muted)]", active && "text-oracle-primary")}>
              <Icon size={20} aria-hidden="true" />
              <span className="max-w-full truncate">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function Avatar({ initial }: { initial: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-oracle-primary to-oracle-accent text-sm font-extrabold text-white">
      {initial}
    </div>
  );
}
