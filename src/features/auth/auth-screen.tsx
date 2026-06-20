"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Brain, Eye, Lock, Mail, School, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/constants/mock-data";
import { useAppStore } from "@/store/app-store";
import { loginSchema, signupSchema } from "@/validators/auth.schema";

type AuthValues = {
  email: string;
  password: string;
  fullName: string;
  school: string;
  faculty: string;
  department: string;
  level: string;
};

export function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const schema = mode === "login" ? loginSchema : signupSchema;
  const form = useForm<AuthValues>({
    resolver: zodResolver(schema) as unknown as Resolver<AuthValues>,
    defaultValues: { email: "", password: "", fullName: "", school: "", faculty: "", department: "", level: "300" }
  });

  async function onSubmit() {
    setUser(mockUser);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-oracle-primary to-oracle-primaryLight text-white shadow-glow">
              <Brain size={22} />
            </span>
            <span className="text-2xl font-black">ExamOracle <span className="text-oracle-primary">AI</span></span>
          </div>
          <p className="text-sm text-[var(--muted)]">Your AI-powered exam prediction engine</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl sm:p-7">
          <div className="mb-6 grid grid-cols-2 rounded-[10px] bg-[var(--subtle)] p-1">
            {(["login", "signup"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setMode(item)} className={item === mode ? "rounded-lg bg-oracle-primary py-2 text-sm font-bold text-white" : "rounded-lg py-2 text-sm font-bold text-[var(--muted)]"}>
                {item === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <div className="grid gap-4">
              <Field icon={<UserRound size={16} />} label="Full Name" error={form.formState.errors.fullName?.message}>
                <Input {...form.register("fullName")} placeholder="Enter full name" />
              </Field>
              <Field icon={<School size={16} />} label="University / School" error={form.formState.errors.school?.message}>
                <Input {...form.register("school")} placeholder="University of Nigeria, Nsukka" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Faculty" error={form.formState.errors.faculty?.message}><Input {...form.register("faculty")} /></Field>
                <Field label="Department" error={form.formState.errors.department?.message}><Input {...form.register("department")} /></Field>
              </div>
            </div>
          )}

          <div className="mt-4 grid gap-4">
            <Field icon={<Mail size={16} />} label="Email Address" error={form.formState.errors.email?.message}>
              <Input {...form.register("email")} type="email" placeholder="chidera@unn.edu.ng" />
            </Field>
            <Field icon={<Lock size={16} />} label="Password" error={form.formState.errors.password?.message}>
              <div className="relative">
                <Input {...form.register("password")} type={showPass ? "text" : "password"} placeholder="Enter password" className="pr-11" />
                <button type="button" onClick={() => setShowPass((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-label="Toggle password visibility">
                  <Eye size={16} />
                </button>
              </div>
            </Field>
          </div>

          <Button className="mt-6 w-full" type="submit">{mode === "login" ? "Sign In to ExamOracle" : "Create Free Account"}</Button>
        </form>
      </div>
    </main>
  );
}

function Field({ label, icon, error, children }: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[var(--muted)]">{icon}{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-semibold text-oracle-accent">{error}</span>}
    </label>
  );
}
