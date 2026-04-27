"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type NavItem = {
  id: string
  label: string
  section?: "dashboard" | "operations" | "configuration"
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", section: "dashboard" },
  { id: "ticket-queue", label: "Ticket Queue", section: "operations" },
  { id: "shipment-search", label: "Shipment Search", section: "operations" },
  { id: "collection-search", label: "Collection Search", section: "operations" },
  { id: "raise-non-shipment-ticket", label: "Raise Non-Shipment Ticket", section: "operations" },
  { id: "agents", label: "Agents", section: "configuration" },
  { id: "customers", label: "Customers", section: "configuration" },
  { id: "query-type", label: "Basic Rules", section: "configuration" },
  { id: "advanced-rules", label: "Advanced Rules", section: "configuration" },
  { id: "rule-priority", label: "Rule Priority", section: "configuration" },
  { id: "working-hours", label: "Working Hours", section: "configuration" },
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
        {navItems.filter(item => item.section === "dashboard").map((item) => (
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
        
        <div className="my-2" />
        
        <p className="px-3 pb-2 text-xs font-semibold text-muted-foreground">Operations</p>
        {navItems.filter(item => item.section === "operations").map((item) => (
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
        
        <div className="my-2" />
        
        <p className="px-3 pb-2 text-xs font-semibold text-muted-foreground">Configuration</p>
        {navItems.filter(item => item.section === "configuration").map((item) => (
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
