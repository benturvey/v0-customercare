"use client"

import { useState } from "react"
import { ChevronDown, Search, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TicketDetailView } from "@/components/ticket-detail-view"

const ticketData = [
  { id: "#4772374", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T06XUA0000734531", packs: 1, customer: "LISA ELDRIDGE", carrier: "EVRI", agent: "", status: "Unassigned" },
  { id: "#4709717", level: "L1", category: "DELIVERY_DISPUTED", consignmentNo: "02770302900031291", packs: 1, customer: "ABBOTT LYON LTD", carrier: "GFS INTERNATIONAL", agent: "", status: "Unassigned" },
  { id: "#4709709", level: "L3", category: "DELIVERY_DISPUTED", consignmentNo: "02770302900031750", packs: 1, customer: "ABBOTT LYON LTD", carrier: "GFS INTERNATIONAL", agent: "Tracey Johnson", status: "In Progress" },
  { id: "#4709708", level: "L2", category: "RETURN_TO_SENDER", consignmentNo: "T04DDA5012749184", packs: 1, customer: "ABBOTT LYON LTD", carrier: "EVRI", agent: "Aaron Doherty", status: "In Progress" },
  { id: "#4709707", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T009LA0070811886", packs: 1, customer: "MILNER OFF ROAD", carrier: "EVRI", agent: "Andrei Costea", status: "In Progress" },
  { id: "#4709706", level: "L3", category: "DELIVERY_DISPUTED", consignmentNo: "31501612855889", packs: 1, customer: "MAMAS & PAPAS", carrier: "DHL ECOMMERCE UK", agent: "George Lilliston", status: "In Progress" },
  { id: "#4709697", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "65433138", packs: 4, customer: "GALLEON SUPPLIES LIMITED", carrier: "DX FREIGHT", agent: "Kirsty Doyle", status: "In Progress" },
  { id: "#4709696", level: "L2", category: "RETURN_TO_SENDER", consignmentNo: "T03ZFA0008231375", packs: 1, customer: "HIGH STREET TV", carrier: "EVRI", agent: "Arlene Griffin", status: "In Progress" },
  { id: "#4709691", level: "L2", category: "WHERE_IS_MY_PARCEL", consignmentNo: "15504962021774", packs: 1, customer: "BAKER ROSS LTD", carrier: "DPD", agent: "Rachel Martin", status: "In Progress" },
  { id: "#4709690", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "31541840059656", packs: 1, customer: "MAMAS & PAPAS", carrier: "DHL ECOMMERCE UK", agent: "Ibrahim Anidi", status: "In Progress" },
  { id: "#4709688", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T03IZA0007079400", packs: 1, customer: "PROCOOK UK LTD", carrier: "UPS", agent: "Sarah Tshikuna", status: "In Progress" },
  { id: "#4709685", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T00PXA0022199208", packs: 1, customer: "THE DUNE GROUP", carrier: "EVRI", agent: "Apryl Watson", status: "In Progress" },
  { id: "#4709684", level: "L1", category: "RETURN_TO_SENDER", consignmentNo: "T03IZA0007096608", packs: 1, customer: "PROCOOK UK LTD", carrier: "DPD LOCAL", agent: "Rebecca Gibson", status: "In Progress" },
  { id: "#4709683", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T0158A0008208726", packs: 1, customer: "WOODLAND GROUP LIMITED - WGAC", carrier: "EVRI", agent: "Audrey Johnson", status: "In Progress" },
  { id: "#4709682", level: "L1", category: "WHERE_IS_MY_PARCEL", consignmentNo: "T0158A0030206249", packs: 1, customer: "WOODLAND-DONCASTER2025", carrier: "EVRI", agent: "Danielle Marcroft", status: "In Progress" },
]

const filters = [
  { label: "All Statuses", options: ["All Statuses", "In Progress", "Unassigned", "Deferred", "Resolved"] },
  { label: "All Carriers", options: ["All Carriers", "DHL ECOMMERCE UK", "EVRI", "DPD", "GFS INTERNATIONAL", "DX FREIGHT", "UPS"] },
  { label: "All Customers", options: ["All Customers", "BRINDISA LIMITED", "ABBOTT LYON LTD", "MAMAS & PAPAS", "PROCOOK UK LTD"] },
  { label: "All Agents", options: ["All Agents", "Aaron Doherty", "Alex Lucy", "Andrei Costea"] },
  { label: "All Regions", options: ["All Regions", "UK", "EU", "US"] },
]

type Ticket = typeof ticketData[number]

export function TicketQueueView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    "All Statuses": "All Statuses",
    "All Carriers": "All Carriers",
    "All Customers": "All Customers",
    "All Agents": "All Agents",
    "All Regions": "All Regions",
  })

  if (selectedTicket) {
    return <TicketDetailView ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 mb-4">
        {filters.map((filter) => (
          <DropdownMenu key={filter.label}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-background text-foreground border-border">
                {selectedFilters[filter.label]}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filter.options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSelectedFilters({ ...selectedFilters, [filter.label]: option })}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Ticket No
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Level
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Category
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Consignment No
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                Packs
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Customer
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                Carrier
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                Agent
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ticketData.map((ticket, index) => (
              <tr
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`border-b border-border last:border-b-0 cursor-pointer ${index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } hover:bg-muted/40 transition-colors`}
              >
                <td className="px-4 py-3 text-sm font-medium text-[#1e3a5f]">
                  {ticket.id}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.level}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.category}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.consignmentNo}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.packs}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.customer}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {ticket.carrier}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.agent}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#e8f4f8] text-[#0d7377]">
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
