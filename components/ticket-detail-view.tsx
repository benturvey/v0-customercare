"use client"

import { ArrowLeft } from "lucide-react"
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

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Ticket {ticket.id}</h1>
      </header>
    </div>
  )
}
