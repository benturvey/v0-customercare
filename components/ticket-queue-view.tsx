"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, ArrowUpDown, Menu, Users, CalendarDays, Truck, User, Hash, Check, CircleDot, Layers, X, ChevronRight } from "lucide-react"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TicketDetailView } from "@/components/ticket-detail-view"

const CUSTOMERS = [
  "365 Engines Ltd",
  "3PL UK Limited",
  "Abbot Lyon Ltd",
  "Andertons Music Company",
  "Babing Limited",
  "Baker Ross Limited",
  "Castles Technology UK & Ireland Ltd",
  "Dams Furniture Limited",
  "EC Group",
  "Fenwick Limited",
  "Hamleys",
  "IForce Limited",
  "John Winstanley & Company Limited",
  "KPSS",
  "Mamas & Papas",
  "Newhow",
  "Omlet",
  "Robert Welch Designs Limited",
  "Service Logistics",
  "Trinny London Limited",
  "Virginia Hayward Limited",
  "Woodland Group Limited - WGAC",
]

const CARRIERS_LIST = [
  "Amazon Logistics UK",
  "BJS",
  "Coll-8",
  "DHL ECommerce UK",
  "DHL Express",
  "DPD",
  "DPD Germany",
  "DPD Local",
  "DPD Netherlands",
  "DX Freight",
  "Evri",
  "Exelot",
  "FedEx",
  "GFS International",
  "OCS",
  "Royal Mail",
  "UPS",
]

const PERIOD_OPTIONS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 14 Days",
  "Last 30 Days",
  "Last Month",
  "This Month",
  "Custom",
]

const ticketData = [
  { id: "#4772374", level: "L4", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T06XUA0000734531", packs: 1, customer: "LISA ELDRIDGE", carrier: "EVRI", agent: "", status: "Open" },
  { id: "#4709717", level: "L3", category: "DELIVERY_DISPUTED", consignmentNo: "02770302900031291", packs: 1, customer: "ABBOTT LYON LTD", carrier: "GFS INTERNATIONAL", agent: "", status: "Open" },
  { id: "#4709709", level: "L3", category: "DELIVERY_DISPUTED", consignmentNo: "02770302900031750", packs: 1, customer: "ABBOTT LYON LTD", carrier: "GFS INTERNATIONAL", agent: "Tracey Johnson", status: "In Progress" },
  { id: "#4709708", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T04DDA5012749184", packs: 1, customer: "ABBOTT LYON LTD", carrier: "EVRI", agent: "Aaron Doherty", status: "In Progress" },
  { id: "#4709707", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T009LA0070811886", packs: 1, customer: "MILNER OFF ROAD", carrier: "EVRI", agent: "Andrei Costea", status: "In Progress" },
  { id: "#4709706", level: "L2", category: "DELIVERY_DISPUTED", consignmentNo: "31501612855889", packs: 1, customer: "MAMAS & PAPAS", carrier: "DHL ECOMMERCE UK", agent: "George Lilliston", status: "In Progress" },
  { id: "#4709697", level: "L3", category: "RETURN_TO_SENDER", consignmentNo: "65433138", packs: 4, customer: "GALLEON SUPPLIES LIMITED", carrier: "DX FREIGHT", agent: "Kirsty Doyle", status: "In Progress" },
  { id: "#4709696", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T03ZFA0008231375", packs: 1, customer: "HIGH STREET TV", carrier: "EVRI", agent: "Arlene Griffin", status: "In Progress" },
  { id: "#4709691", level: "L2", category: "WHERE_IS_MY_PARCEL", consignmentNo: "15504962021774", packs: 1, customer: "BAKER ROSS LTD", carrier: "DPD", agent: "Rachel Martin", status: "In Progress" },
  { id: "#4709690", level: "L2", category: "WHERE_IS_MY_PARCEL", consignmentNo: "31541840059656", packs: 1, customer: "MAMAS & PAPAS", carrier: "DHL ECOMMERCE UK", agent: "Ibrahim Anidi", status: "In Progress" },
  { id: "#4709688", level: "L3", category: "RETURN_TO_SENDER", consignmentNo: "T03IZA0007079400", packs: 1, customer: "PROCOOK UK LTD", carrier: "UPS", agent: "Sarah Tshikuna", status: "In Progress" },
  { id: "#4709685", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T00PXA0022199208", packs: 1, customer: "THE DUNE GROUP", carrier: "EVRI", agent: "Apryl Watson", status: "In Progress" },
  { id: "#4709684", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T03IZA0007096608", packs: 1, customer: "PROCOOK UK LTD", carrier: "DPD LOCAL", agent: "Rebecca Gibson", status: "In Progress" },
  { id: "#4709683", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T0158A0008208726", packs: 1, customer: "WOODLAND GROUP LIMITED - WGAC", carrier: "EVRI", agent: "Audrey Johnson", status: "In Progress" },
  { id: "#4709682", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T0158A0030206249", packs: 1, customer: "WOODLAND-DONCASTER2025", carrier: "EVRI", agent: "Danielle Marcroft", status: "In Progress" },
]

const filters = [
  { label: "All Statuses", options: ["All Statuses", "In Progress", "Open", "Deferred", "Resolved"] },
  { label: "All Carriers", options: ["All Carriers", "DHL ECOMMERCE UK", "EVRI", "DPD", "GFS INTERNATIONAL", "DX FREIGHT", "UPS"] },
  { label: "All Customers", options: ["All Customers", "BRINDISA LIMITED", "ABBOTT LYON LTD", "MAMAS & PAPAS", "PROCOOK UK LTD"] },
  { label: "All Agents", options: ["All Agents", "Aaron Doherty", "Alex Lucy", "Andrei Costea"] },
  { label: "All Regions", options: ["All Regions", "UK", "EU", "US"] },
]

type TicketKey = "id" | "level" | "category" | "consignmentNo" | "packs" | "customer" | "carrier" | "agent" | "status"

const GROUPABLE_COLUMNS: { key: TicketKey; label: string }[] = [
  { key: "level", label: "Level" },
  { key: "category", label: "Category" },
  { key: "customer", label: "Customer" },
  { key: "carrier", label: "Carrier" },
  { key: "agent", label: "Agent" },
  { key: "status", label: "Status" },
]

type Ticket = typeof ticketData[number]

export function TicketQueueView({ onLogOut }: { onLogOut?: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [sortField, setSortField] = useState<"packs" | "carrier" | "agent" | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    "All Statuses": "All Statuses",
    "All Carriers": "All Carriers",
    "All Customers": "All Customers",
    "All Agents": "All Agents",
    "All Regions": "All Regions",
  })

  // New header state
  const [customerOpen, setCustomerOpen] = useState(false)
  const [customerSearch, setCustomerSearch] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [periodOpen, setPeriodOpen] = useState(false)
  const [activePeriod, setActivePeriod] = useState("Yesterday")
  const [customFrom, setCustomFrom] = useState("2026-05-14")
  const [customTo, setCustomTo] = useState("2026-05-14")
  const [carrierOpen, setCarrierOpen] = useState(false)
  const [carrierSearch, setCarrierSearch] = useState("")
  const [selectedCarrier, setSelectedCarrier] = useState<string[]>([])
  const [agentOpen, setAgentOpen] = useState(false)
  const [agentSearch, setAgentSearch] = useState("")
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [refsOpen, setRefsOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [otherOpen, setOtherOpen] = useState(false)
  const [hasComments, setHasComments] = useState(false)
  const [deletedOnly, setDeletedOnly] = useState(false)
  const [exceptionStatus, setExceptionStatus] = useState(false)
  const [groupByOpen, setGroupByOpen] = useState(false)
  const [groupByColumns, setGroupByColumns] = useState<TicketKey[]>([])
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  const groupByRef = useRef<HTMLDivElement>(null)

  const customerRef = useRef<HTMLDivElement>(null)
  const periodRef = useRef<HTMLDivElement>(null)
  const carrierRef = useRef<HTMLDivElement>(null)
  const agentRef = useRef<HTMLDivElement>(null)
  const refsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (customerRef.current && !customerRef.current.contains(e.target as Node)) setCustomerOpen(false)
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) setPeriodOpen(false)
      if (carrierRef.current && !carrierRef.current.contains(e.target as Node)) setCarrierOpen(false)
      if (agentRef.current && !agentRef.current.contains(e.target as Node)) setAgentOpen(false)
      if (refsRef.current && !refsRef.current.contains(e.target as Node)) setRefsOpen(false)
      if (groupByRef.current && !groupByRef.current.contains(e.target as Node)) setGroupByOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSort = (field: "packs" | "carrier" | "agent") => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const sortedTickets = [...ticketData].sort((a, b) => {
    if (!sortField) return 0
    const aVal = sortField === "packs" ? a.packs : (a[sortField] || "").toLowerCase()
    const bVal = sortField === "packs" ? b.packs : (b[sortField] || "").toLowerCase()
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1
    return 0
  })

  // Build grouped rows
  type GroupedRow = { type: "group"; key: string; label: string; count: number } | { type: "ticket"; ticket: Ticket }
  const groupedRows: GroupedRow[] = (() => {
    if (groupByColumns.length === 0) return sortedTickets.map((t) => ({ type: "ticket" as const, ticket: t }))
    const seen = new Map<string, Ticket[]>()
    for (const ticket of sortedTickets) {
      const key = groupByColumns.map((col) => String(ticket[col] ?? "")).join(" | ")
      if (!seen.has(key)) seen.set(key, [])
      seen.get(key)!.push(ticket)
    }
    const rows: GroupedRow[] = []
    for (const [key, tickets] of seen) {
      const label = groupByColumns.map((col) => {
        const colLabel = GROUPABLE_COLUMNS.find((c) => c.key === col)?.label ?? col
        return `${colLabel}: ${tickets[0][col] || "(none)"}`
      }).join("  ·  ")
      rows.push({ type: "group", key, label, count: tickets.length })
      if (!collapsedGroups.has(key)) {
        rows.push(...tickets.map((t) => ({ type: "ticket" as const, ticket: t })))
      }
    }
    return rows
  })()

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  if (selectedTicket) {
    return <TicketDetailView ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Filter pill bar */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <div className="flex items-center flex-wrap gap-3">
            <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Search Tickets</span>

          {/* ANY STATUS */}
          <div ref={refsRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setRefsOpen((o) => !o)}
            >
              <CircleDot className="h-3.5 w-3.5 text-muted-foreground" />
              {selectedStatuses.length > 0 ? `${selectedStatuses.length} STATUS${selectedStatuses.length > 1 ? "ES" : ""}` : "ANY STATUS"}
            </Button>
            {refsOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-52">
                <div className="px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">STATUS</span>
                </div>
                <div className="py-1">
                  {(() => {
                    const statuses = ["Open", "In Progress", "Deferred", "Reviewed", "Resolved", "Snoozed"]
                    const allSelected = statuses.every((s) => selectedStatuses.includes(s))
                    return (
                      <>
                        <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                          <Checkbox
                            checked={allSelected}
                            onCheckedChange={(v) => setSelectedStatuses(v ? [...statuses] : [])}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <span className="text-sm text-foreground">(Select All)</span>
                        </label>
                        {statuses.map((status) => (
                          <label key={status} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                            <Checkbox
                              checked={selectedStatuses.includes(status)}
                              onCheckedChange={(v) => {
                                setSelectedStatuses((prev) =>
                                  v ? [...prev, status] : prev.filter((s) => s !== status)
                                )
                              }}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <span className="text-sm text-foreground">{status}</span>
                          </label>
                        ))}
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* ANY CUSTOMER */}
          <div ref={customerRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setCustomerOpen((o) => !o)}
            >
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              {selectedCustomers.length > 0 ? `${selectedCustomers.length} CUSTOMER${selectedCustomers.length > 1 ? "S" : ""}` : "ANY CUSTOMER"}
            </Button>
            {customerOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-64">
                <div className="flex items-center gap-2 px-3 py-2 border-b">
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="Search options..."
                    className="flex-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {(() => {
                    const filtered = CUSTOMERS.filter((c) =>
                      c.toLowerCase().includes(customerSearch.toLowerCase())
                    )
                    const allSelected = filtered.length > 0 && filtered.every((c) => selectedCustomers.includes(c))
                    return (
                      <>
                        <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                          <Checkbox
                            checked={allSelected}
                            onCheckedChange={(v) => {
                              if (v) setSelectedCustomers((prev) => Array.from(new Set([...prev, ...filtered])))
                              else setSelectedCustomers((prev) => prev.filter((c) => !filtered.includes(c)))
                            }}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <span className="text-sm text-foreground">(Select All)</span>
                        </label>
                        {filtered.map((customer) => (
                          <label key={customer} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                            <Checkbox
                              checked={selectedCustomers.includes(customer)}
                              onCheckedChange={(v) => {
                                setSelectedCustomers((prev) =>
                                  v ? [...prev, customer] : prev.filter((c) => c !== customer)
                                )
                              }}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <span className="text-sm text-foreground">{customer}</span>
                          </label>
                        ))}
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* YESTERDAY Period */}
          <div ref={periodRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-bold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setPeriodOpen((o) => !o)}
            >
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              {activePeriod.toUpperCase()}
            </Button>
            {periodOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-56">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">TICKETS PRESENTED</span>
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => { setActivePeriod("Yesterday"); setPeriodOpen(false) }}
                  >
                    Reset
                  </button>
                </div>
                <div className="py-2">
                  {PERIOD_OPTIONS.map((option) => {
                    const isSelected = activePeriod === option
                    return (
                      <button
                        key={option}
                        onClick={() => { setActivePeriod(option); if (option !== "Custom") setPeriodOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm mx-2 my-0.5 rounded-full transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-foreground hover:bg-muted"
                        }`}
                        style={{ width: "calc(100% - 16px)" }}
                      >
                        {isSelected ? (
                          <Check className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-muted-foreground inline-block" />
                        )}
                        {option}
                      </button>
                    )
                  })}
                  {activePeriod === "Custom" && (
                    <div className="px-4 pt-3 pb-2 space-y-3 border-t mt-2">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">From</label>
                        <input
                          type="date"
                          value={customFrom}
                          onChange={(e) => setCustomFrom(e.target.value)}
                          className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">To</label>
                        <input
                          type="date"
                          value={customTo}
                          onChange={(e) => setCustomTo(e.target.value)}
                          className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ANY CARRIER */}
          <div ref={carrierRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setCarrierOpen((o) => !o)}
            >
              <Truck className="h-3.5 w-3.5 text-muted-foreground" />
              {selectedCarrier.length > 0 ? `${selectedCarrier.length} CARRIER${selectedCarrier.length > 1 ? "S" : ""}` : "ANY CARRIER"}
            </Button>
            {carrierOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-72">
                <div className="px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">CARRIER FILTERS</span>
                </div>
                <div className="px-4 py-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Carrier</label>
                    <div className="flex items-center gap-2 px-2 py-1.5 border rounded-md">
                      <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <input
                        type="text"
                        value={carrierSearch}
                        onChange={(e) => setCarrierSearch(e.target.value)}
                        placeholder="Search options..."
                        className="flex-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto border rounded-md py-1">
                      {(() => {
                        const filtered = CARRIERS_LIST.filter((c) =>
                          c.toLowerCase().includes(carrierSearch.toLowerCase())
                        )
                        const allSelected = filtered.length > 0 && filtered.every((c) => selectedCarrier.includes(c))
                        return (
                          <>
                            <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                              <Checkbox
                                checked={allSelected}
                                onCheckedChange={(v) => {
                                  if (v) setSelectedCarrier((prev) => Array.from(new Set([...prev, ...filtered])))
                                  else setSelectedCarrier((prev) => prev.filter((c) => !filtered.includes(c)))
                                }}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                              <span className="text-sm text-foreground">(Select All)</span>
                            </label>
                            {filtered.map((carrier) => (
                              <label key={carrier} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                                <Checkbox
                                  checked={selectedCarrier.includes(carrier)}
                                  onCheckedChange={(v) => {
                                    setSelectedCarrier((prev) =>
                                      v ? [...prev, carrier] : prev.filter((c) => c !== carrier)
                                    )
                                  }}
                                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <span className="text-sm text-foreground">{carrier}</span>
                              </label>
                            ))}
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ANY AGENT */}
          <div ref={agentRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setAgentOpen((o) => !o)}
            >
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              {selectedAgents.length > 0 ? `${selectedAgents.length} AGENT${selectedAgents.length > 1 ? "S" : ""}` : "ANY AGENT"}
            </Button>
            {agentOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-64">
                <div className="flex items-center gap-2 px-3 py-2 border-b">
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={agentSearch}
                    onChange={(e) => setAgentSearch(e.target.value)}
                    placeholder="Search options..."
                    className="flex-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {(() => {
                    const agents = [
                      "Jacquie Cadger",
                      "James Smith",
                      "Laura Jones",
                      "Mark Taylor",
                      "Sarah Williams",
                    ]
                    const filtered = agents.filter((a) =>
                      a.toLowerCase().includes(agentSearch.toLowerCase())
                    )
                    const allSelected = filtered.length > 0 && filtered.every((a) => selectedAgents.includes(a))
                    return (
                      <>
                        <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                          <Checkbox
                            checked={allSelected}
                            onCheckedChange={(v) => {
                              if (v) setSelectedAgents((prev) => Array.from(new Set([...prev, ...filtered])))
                              else setSelectedAgents((prev) => prev.filter((a) => !filtered.includes(a)))
                            }}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <span className="text-sm text-foreground">(Select All)</span>
                        </label>
                        {filtered.map((agent) => (
                          <label key={agent} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                            <Checkbox
                              checked={selectedAgents.includes(agent)}
                              onCheckedChange={(v) => {
                                setSelectedAgents((prev) =>
                                  v ? [...prev, agent] : prev.filter((a) => a !== agent)
                                )
                              }}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <span className="text-sm text-foreground">{agent}</span>
                          </label>
                        ))}
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedCustomers([])
              setActivePeriod("Yesterday")
              setSelectedCarrier([])
              setSelectedStatuses([])
              setSelectedAgents([])
            }}
            className="text-xs text-foreground hover:text-muted-foreground ml-1"
          >
            Reset
          </button>

          {/* GROUP BY */}
          <div ref={groupByRef} className="relative ml-auto">
            <Button
              variant={groupByColumns.length > 0 ? "default" : "outline"}
              size="sm"
              className={`flex items-center gap-1.5 text-xs font-semibold border rounded-sm px-3 py-1.5 h-auto ${groupByColumns.length > 0 ? "bg-blue-600 text-white border-blue-600" : "text-foreground"}`}
              onClick={() => setGroupByOpen((o) => !o)}
            >
              <Layers className="h-3.5 w-3.5" />
              {groupByColumns.length > 0 ? `GROUPED BY ${groupByColumns.length}` : "GROUP BY"}
              {groupByColumns.length > 0 && (
                <span
                  onClick={(e) => { e.stopPropagation(); setGroupByColumns([]); setCollapsedGroups(new Set()) }}
                  className="ml-1 hover:text-white/70"
                >
                  <X className="h-3 w-3" />
                </span>
              )}
            </Button>
            {groupByOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-56">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground tracking-wide">GROUP BY</span>
                  {groupByColumns.length > 0 && (
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => { setGroupByColumns([]); setCollapsedGroups(new Set()) }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="py-1">
                  {GROUPABLE_COLUMNS.map((col) => {
                    const isSelected = groupByColumns.includes(col.key)
                    const order = groupByColumns.indexOf(col.key)
                    return (
                      <label key={col.key} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(v) => {
                            setGroupByColumns((prev) =>
                              v ? [...prev, col.key] : prev.filter((k) => k !== col.key)
                            )
                            setCollapsedGroups(new Set())
                          }}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-foreground flex-1">{col.label}</span>
                        {isSelected && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-1.5 py-0.5">
                            {order + 1}
                          </span>
                        )}
                      </label>
                    )
                  })}
                </div>
                {groupByColumns.length > 1 && (
                  <div className="px-4 py-2 border-t">
                    <p className="text-xs text-muted-foreground">Grouping order: {groupByColumns.map((k) => GROUPABLE_COLUMNS.find((c) => c.key === k)?.label).join(" → ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* User info */}
        <UserDropdownMenu userName="Jacquie Cadger" userRole="admin" userInitials="JA" onLogOut={onLogOut} />
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search #, customer, category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>

      {/* Tickets Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Ticket No
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Level
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Category
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Consignment No
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort("packs")}>
                <div className="flex items-center gap-1">
                  No. Parcels
                  <ArrowUpDown className={`h-3 w-3 ${sortField === "packs" ? "text-blue-600" : ""}`} />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Customer
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort("carrier")}>
                <div className="flex items-center gap-1">
                  Carrier
                  <ArrowUpDown className={`h-3 w-3 ${sortField === "carrier" ? "text-blue-600" : ""}`} />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort("agent")}>
                <div className="flex items-center gap-1">
                  Agent
                  <ArrowUpDown className={`h-3 w-3 ${sortField === "agent" ? "text-blue-600" : ""}`} />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedRows.map((row, index) => {
              if (row.type === "group") {
                const isCollapsed = collapsedGroups.has(row.key)
                return (
                  <tr
                    key={`group-${row.key}`}
                    className="bg-muted/40 border-b border-border cursor-pointer select-none hover:bg-muted/60"
                    onClick={() => toggleGroup(row.key)}
                  >
                    <td colSpan={9} className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isCollapsed ? "" : "rotate-90"}`} />
                        <span className="text-xs font-semibold text-foreground">{row.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground bg-background border rounded-full px-2 py-0.5">{row.count}</span>
                      </div>
                    </td>
                  </tr>
                )
              }
              const ticket = row.ticket
              return (
                <tr
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`border-b border-border last:border-b-0 cursor-pointer ${index % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">{ticket.id}</td>
                  <td className="px-4 py-3 text-sm text-[#1e3a5f]">{ticket.level}</td>
                  <td className="px-4 py-3 text-sm text-[#1e3a5f]">{ticket.category}</td>
                  <td className="px-4 py-3 text-sm text-[#1e3a5f]">{ticket.consignmentNo}</td>
                  <td className="px-4 py-3 text-sm text-[#1e3a5f]">{ticket.packs}</td>
                  <td className="px-4 py-3 text-sm text-[#1e3a5f]">{ticket.customer}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ticket.carrier}</td>
                  <td className="px-4 py-3 text-sm text-[#1e3a5f]">{ticket.agent}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#e8f4f8] text-[#0d7377]">
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
