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

const ticketData = [
  { id: "#4709718", category: "WHERE_IS_MY_PARCEL", customer: "BRINDISA LIMITED", carrier: "DHL ECOMMERCE UK", agent: "", status: "Unassigned" },
  { id: "#4709717", category: "DELIVERY_DISPUTED", customer: "ABBOTT LYON LTD", carrier: "GFS INTERNATIONAL", agent: "", status: "Unassigned" },
  { id: "#4709709", category: "DELIVERY_DISPUTED", customer: "ABBOTT LYON LTD", carrier: "GFS INTERNATIONAL", agent: "Tracey Johnson", status: "In Progress" },
  { id: "#4709708", category: "RETURN_TO_SENDER", customer: "ABBOTT LYON LTD", carrier: "EVRI", agent: "Aaron Doherty", status: "In Progress" },
  { id: "#4709707", category: "WHERE_IS_MY_PARCEL", customer: "MILNER OFF ROAD", carrier: "EVRI", agent: "Andrei Costea", status: "In Progress" },
  { id: "#4709706", category: "DELIVERY_DISPUTED", customer: "MAMAS & PAPAS", carrier: "DHL ECOMMERCE UK", agent: "George Lilliston", status: "In Progress" },
  { id: "#4709697", category: "RETURN_TO_SENDER", customer: "GALLEON SUPPLIES LIMITED", carrier: "DX FREIGHT", agent: "Kirsty Doyle", status: "In Progress" },
  { id: "#4709696", category: "RETURN_TO_SENDER", customer: "HIGH STREET TV", carrier: "EVRI", agent: "Arlene Griffin", status: "In Progress" },
  { id: "#4709691", category: "WHERE_IS_MY_PARCEL", customer: "BAKER ROSS LTD", carrier: "DPD", agent: "Rachel Martin", status: "In Progress" },
  { id: "#4709690", category: "WHERE_IS_MY_PARCEL", customer: "MAMAS & PAPAS", carrier: "DHL ECOMMERCE UK", agent: "Ibrahim Anidi", status: "In Progress" },
  { id: "#4709688", category: "RETURN_TO_SENDER", customer: "PROCOOK UK LTD", carrier: "UPS", agent: "Sarah Tshikuna", status: "In Progress" },
  { id: "#4709685", category: "RETURN_TO_SENDER", customer: "THE DUNE GROUP", carrier: "EVRI", agent: "Apryl Watson", status: "In Progress" },
  { id: "#4709684", category: "RETURN_TO_SENDER", customer: "PROCOOK UK LTD", carrier: "DPD LOCAL", agent: "Rebecca Gibson", status: "In Progress" },
  { id: "#4709683", category: "WHERE_IS_MY_PARCEL", customer: "WOODLAND GROUP LIMITED - WGAC", carrier: "EVRI", agent: "Audrey Johnson", status: "In Progress" },
  { id: "#4709682", category: "WHERE_IS_MY_PARCEL", customer: "WOODLAND-DONCASTER2025", carrier: "EVRI", agent: "Danielle Marcroft", status: "In Progress" },
]

const filters = [
  { label: "All Statuses", options: ["All Statuses", "In Progress", "Unassigned", "Deferred", "Resolved"] },
  { label: "All Carriers", options: ["All Carriers", "DHL ECOMMERCE UK", "EVRI", "DPD", "GFS INTERNATIONAL", "DX FREIGHT", "UPS"] },
  { label: "All Customers", options: ["All Customers", "BRINDISA LIMITED", "ABBOTT LYON LTD", "MAMAS & PAPAS", "PROCOOK UK LTD"] },
  { label: "All Agents", options: ["All Agents", "Aaron Doherty", "Alex Lucy", "Andrei Costea"] },
  { label: "All Regions", options: ["All Regions", "UK", "EU", "US"] },
]

export function TicketQueueView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    "All Statuses": "All Statuses",
    "All Carriers": "All Carriers",
    "All Customers": "All Customers",
    "All Agents": "All Agents",
    "All Regions": "All Regions",
  })

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
                  #
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
                className={`border-b border-border last:border-b-0 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } hover:bg-muted/40 transition-colors`}
              >
                <td className="px-4 py-3 text-sm font-medium text-[#1e3a5f]">
                  {ticket.id}
                </td>
                <td className="px-4 py-3 text-sm text-[#1e3a5f]">
                  {ticket.category}
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
