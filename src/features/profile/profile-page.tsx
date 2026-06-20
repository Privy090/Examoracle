"use client";

import { BookOpen, GraduationCap, Moon, School, Star, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";

export function ProfilePage({ settingsOnly = false }: { settingsOnly?: boolean }) {
  const user = useAppStore((state) => state.user)!;
  const darkMode = useAppStore((state) => state.darkMode);
  const setDarkMode = useAppStore((state) => state.setDarkMode);

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      {!settingsOnly && (
        <section className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-oracle-primary to-oracle-accent text-3xl font-black text-white shadow-glow">{user.fullName[0]}</div>
          <h2 className="text-2xl font-black">{user.fullName}</h2>
          <p className="text-sm text-[var(--muted)]">{user.email}</p>
          <Badge className="mt-3">{user.level}L Student</Badge>
        </section>
      )}

      {!settingsOnly && (
        <Card className="divide-y divide-[var(--border)] p-0">
          {[
            [School, "University", user.school],
            [GraduationCap, "Faculty", user.faculty],
            [BookOpen, "Department", user.department],
            [Star, "Level", `${user.level} Level`]
          ].map(([Icon, label, value]) => {
            const TypedIcon = Icon as typeof School;
            return (
              <div key={label as string} className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-oracle-primary/15 text-oracle-primary"><TypedIcon size={18} /></div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--muted)]">{label as string}</p>
                  <p className="truncate text-sm font-bold">{value as string}</p>
                </div>
              </div>
            );
          })}
        </Card>
      )}

      <Card className="divide-y divide-[var(--border)] p-0">
        <SettingRow label="Dark Mode">
          <Button variant="secondary" className="h-10 w-10 px-0" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </SettingRow>
        {["Exam Reminders", "AI Analysis Alerts", "Study Streak Tracking", "Offline Draft Persistence"].map((item, index) => <SettingRow key={item} label={item}><Toggle enabled={index !== 2} /></SettingRow>)}
      </Card>
    </div>
  );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-3 p-4">
      <span className="text-sm font-bold">{label}</span>
      {children}
    </div>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return <span className={enabled ? "relative h-6 w-11 rounded-full bg-oracle-primary" : "relative h-6 w-11 rounded-full bg-[var(--border)]"}><span className={enabled ? "absolute left-[23px] top-1 h-4 w-4 rounded-full bg-white" : "absolute left-1 top-1 h-4 w-4 rounded-full bg-white"} /></span>;
}
