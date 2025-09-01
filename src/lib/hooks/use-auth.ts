"use client";

import { useAuthStore } from "@/stores/auth";
import api from "@/lib/utils/axios"; // axios interceptor
import { useCallback, useEffect } from "react";

export function useAuth() {
  const {
    accessToken,
    user,
    loading,
    setAccessToken,
    setUser,
    setLoading,
    clearAuth,
  } = useAuthStore();

  const login = useCallback(
    async (
      email: string,
      password: string,
      callback?: { onSuccess: () => void; onError: (error: string) => void }
    ) => {
      setLoading(true);
      try {
        const { data, status } = await api.post("/auth/login", {
          email,
          password,
        });
        if (status !== 200) throw new Error("Login failed");
        if (data) {
          setAccessToken(data.data?.tokens?.access?.token);
          setUser(data.data?.user);
          callback?.onSuccess();
        }
        return data.data?.user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        callback?.onError(e?.response?.data?.message || e?.message);
      } finally {
        setLoading(false);
      }
    },
    [setAccessToken, setUser, setLoading]
  );

  const logout = useCallback(
    async (callback?: {
      onSuccess: () => void;
      onError: (error: Error) => void;
    }) => {
      try {
        await api.post("/auth/logout");
        callback?.onSuccess();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.warn("Logout failed but clearing client state", e);
        callback?.onError(e?.response?.data?.message || e?.message);
      } finally {
        clearAuth();
        window.location.href = "/login";
      }
    },
    [clearAuth]
  );

  const fetchProfile = useCallback(async () => {
    if (!accessToken) return null;
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.data.user); // 👈 sesuai format BE
      return data.data.user;
    } catch (err) {
      console.error("Failed to fetch profile", err);
      clearAuth();
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, setUser, setLoading, clearAuth]);

  const loginWithProvider = useCallback((provider: "google" | "github") => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    window.location.href = `${
      process.env.NEXT_PUBLIC_API_URL
    }/auth/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
  }, []);

  useEffect(() => {
    if (accessToken && !user) {
      fetchProfile();
    }
  }, [accessToken, user, fetchProfile]);

  return {
    accessToken,
    setAccessToken,
    user,
    loading,
    isAuthenticated: !!accessToken && !!user,
    login,
    logout,
    fetchProfile,
    loginWithProvider,
  };
}
