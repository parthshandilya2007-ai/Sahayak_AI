import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | AI for Public Good",
  description: "Voice-first AI solutions for underserved communities",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {children}
    </div>
  )
}
