"use client"

import { cn } from "@/lib/utils"

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
  { id: "tagging-rules", label: "Tagging Rules" },
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
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemSelect(item.id)}
              className={cn(
                "whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
                "hover:text-foreground",
                "border-b-2 -mb-px",
                activeItem === item.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
