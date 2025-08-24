"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Car, Search, History, Award, MessageSquare,
  Settings, User, Home, BarChart
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Find Ride", href: "/dashboard/find-ride", icon: Search },
  { title: "Offer Ride", href: "/dashboard/offer-ride", icon: Car },
  { title: "My Rides", href: "/dashboard/my-rides", icon: History },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { title: "Leaderboard", href: "/dashboard/leaderboard", icon: Award },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r w-64 min-h-screen bg-background flex flex-col">
      {/* Header */}
      <SidebarHeader className="border-b p-4">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          SmartCommute<span className="text-blue-600">X</span>
        </Link>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-muted transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SmartCommuteX
      </SidebarFooter>
    </Sidebar>
  )
}
