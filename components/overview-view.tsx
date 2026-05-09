"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Clock, PlaneTakeoff } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  { value: "15", label: "UNASSIGNED" },
  { value: "13", label: "IN PROGRESS" },
  { value: "10", label: "DEFERRED" },
  { value: "14", label: "REVIEWED" },
  { value: "13/30", label: "ACTIVE AGENTS" },
]

const agents = [
  { name: "Aaron Doherty", level: "L2", currentTicket: 4709708, ticketLevel: "L2", status: "In Progress" },
  { name: "Alex Lucy", level: "L2", currentTicket: null, ticketLevel: null, status: "Idle" },
  { name: "Andrei Costea", level: "L2", currentTicket: 4709707, ticketLevel: "L1", status: "In Progress" },
  { name: "Annette Davidson", level: "ADM", currentTicket: null, ticketLevel: null, status: "ADM" },
  { name: "Apryl Watson", level: "L3", currentTicket: 4709685, ticketLevel: "L3", status: "In Progress" },
  { name: "Arlene Griffin", level: "L1", currentTicket: 4709696, ticketLevel: "L1", status: "In Progress" },
  { name: "Audrey Johnson", level: "L1", currentTicket: 4709683, ticketLevel: "L1", status: "In Progress" },
  { name: "Ben Lund", level: "MGM", currentTicket: null, ticketLevel: null, status: "MGM" },
  { name: "Danielle Marcroft", level: "L3", currentTicket: 4709682, ticketLevel: "L2", status: "In Progress" },
  { name: "Francine Payne", level: "MGM", currentTicket: null, ticketLevel: null, status: "MGM" },
  { name: "George Lilliston", level: "L2", currentTicket: 4709706, ticketLevel: "L2", status: "In Progress" },
  { name: "Georgia Collins", level: "L3", currentTicket: null, ticketLevel: null, status: "Idle" },
  { name: "Ibrahim Anidi", level: "L1", currentTicket: 4709690, ticketLevel: "L1", status: "In Progress" },
  { name: "Kimberley McCormick", level: "MGM", currentTicket: null, ticketLevel: null, status: "MGM" },
  { name: "Kirsty Doyle", level: "L3", currentTicket: 4709697, ticketLevel: "L1", status: "In Progress" },
  { name: "Lee Higgins", level: "ADM", currentTicket: null, ticketLevel: null, status: "Out of Office" },
  { name: "Lisa Yates", level: "L4", currentTicket: null, ticketLevel: null, status: "Idle" },
  { name: "Lucy King", level: "L2", currentTicket: null, ticketLevel: null, status: "Out of Office" },
  { name: "Lynn Forrest", level: "L3", currentTicket: null, ticketLevel: null, status: "Idle" },
  { name: "Olivia Liburd", level: "L2", currentTicket: null, ticketLevel: null, status: "Idle" },
  { name: "Patricia McGuire", level: "L1", currentTicket: null, ticketLevel: null, status: "Out of Office" },
  { name: "Rachel Martin", level: "L1", currentTicket: 4709691, ticketLevel: "L2", status: "In Progress" },
  { name: "Rebecca Gibson", level: "L4", currentTicket: 4709684, ticketLevel: "L1", status: "In Progress" },
  { name: "Sarah Adams", level: "L4", currentTicket: null, ticketLevel: null, status: "Out of Office" },
  { name: "Sarah Tshikuna", level: "L2", currentTicket: 4709688, ticketLevel: "L1", status: "In Progress" },
  { name: "Sharon Pearce", level: "L1", currentTicket: null, ticketLevel: null, status: "Idle" },
  { name: "Sue Foster", level: "ADM", currentTicket: null, ticketLevel: null, status: "Out of Office" },
  { name: "Tracey Crooke", level: "MGM", currentTicket: null, ticketLevel: null, status: "MGM" },
  { name: "Tracey Johnson", level: "L4", currentTicket: 4709709, ticketLevel: "L3", status: "In Progress" },
  { name: "Vicky Lomax", level: "MGM", currentTicket: null, ticketLevel: null, status: "MGM" },
]

export function OverviewView() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Stats Card */}
      <div className="border border-border rounded-lg bg-card p-6">
        <div className="flex gap-8 justify-between items-end">
          {stats.map((stat) => (
            <div key={stat.label} className="text-left flex-1">
              <p className="text-3xl font-bold text-[#1e3a5f]">{stat.value}</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Status Card */}
      <div className="border border-border rounded-lg bg-card">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
            AGENT STATUS
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-foreground">Name</TableHead>
              <TableHead className="font-semibold text-foreground">Agent Level</TableHead>
              <TableHead className="font-semibold text-foreground">Current Ticket</TableHead>
              <TableHead className="font-semibold text-foreground">Ticket Level</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.name} className={agent.status === "In Progress" ? "bg-green-50" : agent.status === "Idle" ? "bg-amber-50" : agent.status === "Out of Office" ? "bg-red-50" : (agent.status === "ADM" || agent.status === "MGM") ? "bg-purple-50" : ""}>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    {agent.name}
                    {agent.status === "In Progress" && (
                      <Loader2 className="h-3.5 w-3.5 text-green-600 animate-spin" />
                    )}
                    {agent.status === "Idle" && (
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    {agent.status === "Out of Office" && (
                      <PlaneTakeoff className="h-3.5 w-3.5 text-red-500" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{agent.level}</TableCell>
                <TableCell className="text-muted-foreground">
                  {agent.currentTicket || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {agent.ticketLevel || "—"}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    {agent.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
          Routing Rules
        </Button>
        <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white">
          Manage Agents
        </Button>
      </div>
    </div>
  )
}
