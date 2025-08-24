"use client"

import { useState } from "react"
import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
  }
>(({ children, defaultOpen, ...props }, ref) => {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(defaultOpen ?? false)
  const [openMobile, setOpenMobile] = useState(false)

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const contextValue: SidebarContext = {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})

export const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()
  return <div className={`flex flex-col ${open ? "w-full" : "w-0"} transition-all`}>{children}</div>
}

export const SidebarFooter = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()
  return <div className={`flex flex-col ${open ? "w-full" : "w-0"} transition-all`}>{children}</div>
}

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()
  return <div className={`flex flex-col ${open ? "w-full" : "w-0"} transition-all`}>{children}</div>
}

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()
  return <div className={`flex flex-col ${open ? "w-full" : "w-0"} transition-all`}>{children}</div>
}

export const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()
  return <div className={`flex flex-col ${open ? "w-full" : "w-0"} transition-all`}>{children}</div>
}

export const SidebarMenuButton = ({
  children,
  isActive,
  tooltip,
}: { children: React.ReactNode; isActive: boolean; tooltip: string }) => {
  const { open, toggleSidebar } = useSidebar()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? "default" : "ghost"}
            onClick={toggleSidebar}
            className="flex items-center justify-center gap-2 px-4 py-3 text-left hover:bg-accent"
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const SidebarRail = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()
  return <div className={`flex flex-col ${open ? "w-full" : "w-0"} transition-all`}>{children}</div>
}
