"use client"

import { useState } from "react"
import { Moon, LogOut, ArrowUpRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserDropdownMenuProps {
  userName: string
  userRole: string
  userInitials: string
}

export function UserDropdownMenu({
  userName,
  userRole,
  userInitials,
}: UserDropdownMenuProps) {
  const [darkMode, setDarkMode] = useState(false)

  const logOffReasons = [
    "Toilet break",
    "Lunch",
    "Going home",
    "Meeting",
    "Other",
  ]

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
      <DropdownMenuContent align="end" className="w-48">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
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

        {/* Divider */}
        <div className="my-2 border-t" />

        {/* Log Off Reason Label */}
        <div className="px-4 py-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Log off reason
          </p>
        </div>

        {/* Log Off Reasons */}
        {logOffReasons.map((reason) => (
          <button
            key={reason}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span>{reason}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="my-2 border-t" />

        {/* Log Out */}
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
