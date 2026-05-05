"use client"

import {
  ArrowLeft,
  Globe,
  RefreshCw,
  MessageSquare,
  BarChart2,
  Clock,
  AlarmClock,
  Flag,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Ticket = {
  id: string
  category: string
  consignmentNo: string
  packs: number
  customer: string
  carrier: string
  agent: string
  status: string
}

interface TicketDetailViewProps {
  ticket: Ticket
  onBack: () => void
}

const metaItems = [
  { icon: Globe,        label: "Origin",         value: "UK" },
  { icon: RefreshCw,    label: "Defer/Review",   value: "1" },
  { icon: MessageSquare,label: "Responded",       value: "1" },
  { icon: BarChart2,    label: "Level",           value: "L1 - Basic" },
  { icon: Clock,        label: "Ticket Age",      value: "42m" },
  { icon: AlarmClock,   label: "SLA Due",         value: "11:32 in 2h 15m" },
  { icon: Flag,         label: "Priority",        value: "Normal" },
  { icon: Star,         label: "Customer Tier",   value: "Focus Customer" },
]

export function TicketDetailView({ ticket, onBack }: TicketDetailViewProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-4 gap-1 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Ticket Queue
      </Button>

      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Ticket {ticket.id}</h1>
      </header>

      {/* Metadata strip */}
      <div className="flex flex-wrap items-center gap-0 rounded-lg border border-border bg-muted/30 overflow-hidden mb-6">
        {metaItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-4 py-3 ${
                index !== metaItems.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 text-[#1e3a5f]" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <span className="text-sm font-semibold text-[#1e3a5f] whitespace-nowrap">{item.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
