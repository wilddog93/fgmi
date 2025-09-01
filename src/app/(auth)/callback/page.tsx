"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken, fetchProfile } = useAuth();

  useEffect(() => {
    const token = searchParams.get("accessToken");
    if (token) {
      setAccessToken(token);
      fetchProfile().then((user) => {
        if(user && user?.role !== 'ADMIN') {
          router.replace("/");
          return;
        };
        router.replace("/dashboard"); // redirect ke dashboard
      });
    } else {
      router.replace("/sign-in");
    }
  }, [searchParams, setAccessToken, fetchProfile, router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="text-xs font-medium">Processing sign in...</div>
    </div>
  )
}
