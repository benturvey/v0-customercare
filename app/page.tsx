"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { ShipmentsView } from "@/components/shipments-view"
import { CollectionsView } from "@/components/collections-view"
import { OverviewView } from "@/components/overview-view"
import { TicketQueueView } from "@/components/ticket-queue-view"
import { RoutingRulesView } from "@/components/routing-rules-view"
import { AgentsView } from "@/components/agents-view"
import { TaggingRulesView } from "@/components/tagging-rules-view"
import { CustomersView } from "@/components/customers-view"
import { NonShipmentTicketView } from "@/components/non-shipment-ticket-view"
import { QueryTypeView } from "@/components/query-type-view"
import { AdvancedRulesView } from "@/components/advanced-rules-view"
import { RulePriorityView } from "@/components/rule-priority-view"
import { WorkingHoursView } from "@/components/working-hours-view"
import { LoginModal } from "@/components/login-modal"

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
  const [loggedIn, setLoggedIn] = useState(true)

  const handleLogOut = () => setLoggedIn(false)
  const handleSignIn = () => {
    setLoggedIn(true)
    setActiveView("overview")
  }

  const renderView = () => {
    if (activeView === "overview") {
      return <OverviewView onLogOut={handleLogOut} />
    }
    if (activeView === "ticket-queue") {
      return <TicketQueueView onLogOut={handleLogOut} />
    }
    if (activeView === "shipment-search") {
      return <ShipmentsView onLogOut={handleLogOut} />
    }
    if (activeView === "collection-search") {
      return <CollectionsView onLogOut={handleLogOut} />
    }
    if (activeView === "raise-non-shipment-ticket") {
      return <NonShipmentTicketView onLogOut={handleLogOut} />
    }
    if (activeView === "routing-rules") {
      return <RoutingRulesView onLogOut={handleLogOut} />
    }
    if (activeView === "agents") {
      return <AgentsView onLogOut={handleLogOut} />
    }
    if (activeView === "tagging-rules") {
      return <TaggingRulesView />
    }
    if (activeView === "customers") {
      return <CustomersView onLogOut={handleLogOut} />
    }
    if (activeView === "query-type") {
      return <QueryTypeView onLogOut={handleLogOut} />
    }
    if (activeView === "advanced-rules") {
      return <AdvancedRulesView onLogOut={handleLogOut} />
    }
    if (activeView === "rule-priority") {
      return <RulePriorityView onLogOut={handleLogOut} />
    }
    if (activeView === "working-hours") {
      return <WorkingHoursView onLogOut={handleLogOut} />
    }
    return <PlaceholderView title={viewTitles[activeView] || "Unknown"} />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {!loggedIn && <LoginModal onSignIn={handleSignIn} />}
      <TopNavigation activeItem={activeView} onItemSelect={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  )
}
