"use client"

import { Button } from "@/components/ui/button"
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
  { value: "24", label: "DEFERRED" },
  { value: "13/30", label: "ACTIVE AGENTS" },
]

const agents = [
  { name: "Aaron Doherty", level: "L2", currentTicket: 4709708, status: "In Progress" },
  { name: "Alex Lucy", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Andrei Costea", level: "L2", currentTicket: 4709707, status: "In Progress" },
  { name: "Annette Davidson", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Apryl Watson", level: "L2", currentTicket: 4709685, status: "In Progress" },
  { name: "Arlene Griffin", level: "L2", currentTicket: 4709696, status: "In Progress" },
  { name: "Audrey Johnson", level: "L1", currentTicket: 4709683, status: "In Progress" },
  { name: "Ben Lund", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Danielle Marcroft", level: "L2", currentTicket: 4709682, status: "In Progress" },
  { name: "Francine Payne", level: "L1", currentTicket: null, status: "Idle" },
  { name: "George Lilliston", level: "L3", currentTicket: 4709706, status: "In Progress" },
  { name: "Georgia Collins", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Ibrahim Anidi", level: "L2", currentTicket: 4709690, status: "In Progress" },
  { name: "Kimberley McCormick", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Kirsty Doyle", level: "L2", currentTicket: 4709697, status: "In Progress" },
  { name: "Lee Higgins", level: "L2", currentTicket: null, status: "Idle" },
  { name: "Lisa Yates", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Lucy King", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Lynn Forrest", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Olivia Liburd", level: "L2", currentTicket: null, status: "Idle" },
  { name: "Patricia McGuire", level: "L3", currentTicket: null, status: "Idle" },
  { name: "Rachel Martin", level: "L2", currentTicket: 4709691, status: "In Progress" },
  { name: "Rebecca Gibson", level: "L1", currentTicket: 4709684, status: "In Progress" },
  { name: "Sarah Adams", level: "L2", currentTicket: null, status: "Idle" },
  { name: "Sarah Tshikuna", level: "L1", currentTicket: 4709688, status: "In Progress" },
  { name: "Sharon Pearce", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Sue Foster", level: "L2", currentTicket: null, status: "Idle" },
  { name: "Tracey Crooke", level: "L1", currentTicket: null, status: "Idle" },
  { name: "Tracey Johnson", level: "L3", currentTicket: 4709709, status: "In Progress" },
  { name: "Vicky Lomax", level: "L1", currentTicket: null, status: "Idle" },
]

export function OverviewView() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Stats Card */}
      <div className="border border-border rounded-lg bg-card p-6">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-left">
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
              <TableHead className="font-semibold text-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.name}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell className="text-muted-foreground">{agent.level}</TableCell>
                <TableCell className="text-muted-foreground">
                  {agent.currentTicket || "—"}
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
