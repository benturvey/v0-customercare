"use client"

import { useState } from "react"
import { Moon, LogOut, Coffee, UtensilsCrossed, Users, ClipboardList, Briefcase, BarChart2, GraduationCap, AlertTriangle, Home } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { LucideIcon } from "lucide-react"

interface UserDropdownMenuProps {
  userName: string
  userRole: string
  userInitials: string
  onLogOut?: () => void
}

interface LogOffReason {
  label: string
  icon: LucideIcon
}

const logOffReasons: LogOffReason[] = [
  { label: "Comfort break",   icon: Coffee },
  { label: "Official break",  icon: UtensilsCrossed },
  { label: "Meeting",         icon: Users },
  { label: "Admin work",      icon: ClipboardList },
  { label: "Coaching / 1:1",  icon: BarChart2 },
  { label: "Training",        icon: GraduationCap },
  { label: "System issues",   icon: AlertTriangle },
  { label: "End of shift",    icon: Home },
]

export function UserDropdownMenu({
  userName,
  userRole,
  userInitials,
  onLogOut,
}: UserDropdownMenuProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {userInitials}
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-foreground leading-tight">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              {userRole}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {userInitials}
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          <Moon className="h-4 w-4" />
          <span>Dark mode</span>
        </button>

        {/* Divider + Log Off Reason Label */}
        <div className="mt-1 border-t" />
        <div className="px-4 pt-2 pb-1">
          <p className="text-xs font-semibold text-muted-foreground">Log off reason</p>
        </div>

        {/* Log Off Reasons */}
        {logOffReasons.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setSelectedReason(label === selectedReason ? null : label)}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              selectedReason === label
                ? "bg-blue-50 text-blue-700"
                : "hover:bg-muted"
            }`}
          >
            <Icon className={`h-4 w-4 ${selectedReason === label ? "text-blue-600" : "text-muted-foreground"}`} />
            <span>{label}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="mt-1 border-t" />

        {/* Log Out */}
        <button
          onClick={onLogOut}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
