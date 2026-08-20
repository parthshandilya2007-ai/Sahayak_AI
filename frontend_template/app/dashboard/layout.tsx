import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Voice Assistant | Sahayak AI",
  description: "Voice-first AI assistant for agriculture, government schemes, weather, and healthcare in India",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {children}
    </div>
  )
}

