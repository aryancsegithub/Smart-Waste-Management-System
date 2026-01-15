"use client";

import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-background dark:bg-[#0E0E0F]">
        <div className="text-foreground dark:text-white text-lg">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}