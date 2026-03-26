"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { ShipmentsView } from "@/components/shipments-view"
import { OverviewView } from "@/components/overview-view"
import { TicketQueueView } from "@/components/ticket-queue-view"

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          This section is coming soon
        </p>
      </header>
      <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-lg bg-muted/30">
        <p className="text-muted-foreground">Content for {title} will be displayed here</p>
      </div>
    </div>
  )
}

const viewTitles: Record<string, string> = {
  "overview": "Overview",
  "ticket-queue": "Ticket Queue",
  "ticket-search": "Ticket Search",
  "routing-rules": "Routing Rules",
  "agents": "Agents",
  "customers": "Customers",
  "tagging-rules": "Tagging Rules",
}

export default function MainPage() {
  const [activeView, setActiveView] = useState("overview")

  const renderView = () => {
    if (activeView === "overview") {
      return <OverviewView />
    }
    if (activeView === "ticket-queue") {
      return <TicketQueueView />
    }
    if (activeView === "shipment-search") {
      return <ShipmentsView />
    }
    return <PlaceholderView title={viewTitles[activeView] || "Unknown"} />
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeItem={activeView} onItemSelect={setActiveView} />
      {renderView()}
    </div>
  )
}
