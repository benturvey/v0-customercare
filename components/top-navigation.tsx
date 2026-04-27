"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  LayoutDashboard,
  ListTodo,
  Search,
  PackageSearch,
  TicketPlus,
  Users,
  Building2,
  BookOpen,
  ShieldCheck,
  ArrowUpDown,
  Clock,
  type LucideIcon,
} from "lucide-react"

type NavItem = {
  id: string
  label: string
  icon: LucideIcon
  section?: "dashboard" | "operations" | "configuration"
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, section: "dashboard" },
  { id: "ticket-queue", label: "Ticket Queue", icon: ListTodo, section: "operations" },
  { id: "shipment-search", label: "Shipment Search", icon: PackageSearch, section: "operations" },
  { id: "collection-search", label: "Collection Search", icon: Search, section: "operations" },
  { id: "raise-non-shipment-ticket", label: "Raise Non-Shipment Ticket", icon: TicketPlus, section: "operations" },
  { id: "agents", label: "Agents", icon: Users, section: "configuration" },
  { id: "customers", label: "Customers", icon: Building2, section: "configuration" },
  { id: "query-type", label: "Basic Rules", icon: BookOpen, section: "configuration" },
  { id: "advanced-rules", label: "Advanced Rules", icon: ShieldCheck, section: "configuration" },
  { id: "rule-priority", label: "Rule Priority", icon: ArrowUpDown, section: "configuration" },
  { id: "working-hours", label: "Working Hours", icon: Clock, section: "configuration" },
]

function NavButton({ item, active, onSelect }: { item: NavItem; active: boolean; onSelect: (id: string) => void }) {
  const Icon = item.icon
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </button>
  )
}

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
          <NavButton key={item.id} item={item} active={activeItem === item.id} onSelect={onItemSelect} />
        ))}

        <div className="my-2" />

        <p className="px-3 pb-2 text-xs font-semibold text-muted-foreground">Operations</p>
        {navItems.filter(item => item.section === "operations").map((item) => (
          <NavButton key={item.id} item={item} active={activeItem === item.id} onSelect={onItemSelect} />
        ))}

        <div className="my-2" />

        <p className="px-3 pb-2 text-xs font-semibold text-muted-foreground">Configuration</p>
        {navItems.filter(item => item.section === "configuration").map((item) => (
          <NavButton key={item.id} item={item} active={activeItem === item.id} onSelect={onItemSelect} />
        ))}
      </div>
    </nav>
  )
}
