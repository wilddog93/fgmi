"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth"

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push("/(auth)/login")
  }, [user])

  return (
    <div className="flex">
      <aside className="w-64">Sidebar</aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
