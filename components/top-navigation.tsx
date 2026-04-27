"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type NavItem = {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "ticket-queue", label: "Ticket Queue" },
  { id: "shipment-search", label: "Shipment Search" },
  { id: "collection-search", label: "Collection Search" },
  { id: "raise-non-shipment-ticket", label: "Raise Non-Shipment Ticket" },
  { id: "agents", label: "Agents" },
  { id: "customers", label: "Customers" },
  { id: "query-type", label: "Basic Rules" },
  { id: "advanced-rules", label: "Advanced Rules" },
  { id: "rule-priority", label: "Rule Priority" },
  { id: "working-hours", label: "Working Hours" },
]

interface TopNavigationProps {
  activeItem: string
  onItemSelect: (id: string) => void
}

export function TopNavigation({ activeItem, onItemSelect }: TopNavigationProps) {
  return (
    <nav className="w-56 shrink-0 min-h-screen border-r border-border bg-gray-100 flex flex-col">
      <div className="flex items-center justify-center p-4 border-b border-border">
        <Image
          src="/gfs-logo.png"
          alt="GFS Logo"
          width={180}
          height={80}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-1 p-3 pt-6">
        <p className="px-3 pb-2 text-xs font-semibold text-muted-foreground">Dashboard</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemSelect(item.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
