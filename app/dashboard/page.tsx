import type { Metadata } from "next"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export const metadata: Metadata = {
  title: "Dashboard - SmartCommuteX",
  description: "Manage your rides and account",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your rides, view your history, and more.
        </p>
      </div>
      <DashboardTabs />
    </div>
  )
}
