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
  { value: "0", label: "IN PROGRESS" },
  { value: "0", label: "DEFERRED" },
  { value: "0 / 2", label: "ACTIVE AGENTS" },
]

const agents = [
  { name: "Aaron Doherty", currentTicket: null, status: "Idle" },
  { name: "Alex Lucy", currentTicket: null, status: "Idle" },
  { name: "Andrei Costea", currentTicket: null, status: "Idle" },
  { name: "Annette Davidson", currentTicket: null, status: "Idle" },
  { name: "Apryl Watson", currentTicket: null, status: "Idle" },
  { name: "Arlene Griffin", currentTicket: null, status: "Idle" },
  { name: "Audrey Johnson", currentTicket: null, status: "Idle" },
  { name: "Ben Lund", currentTicket: null, status: "Idle" },
  { name: "Danielle Marcroft", currentTicket: null, status: "Idle" },
  { name: "Francine Payne", currentTicket: null, status: "Idle" },
  { name: "George Lilliston", currentTicket: null, status: "Idle" },
  { name: "Georgia Collins", currentTicket: null, status: "Idle" },
  { name: "Ibrahim Anidi", currentTicket: null, status: "Idle" },
  { name: "Kimberley McCormick", currentTicket: null, status: "Idle" },
  { name: "Kirsty Doyle", currentTicket: null, status: "Idle" },
  { name: "Lee Higgins", currentTicket: null, status: "Idle" },
  { name: "Lisa Yates", currentTicket: null, status: "Idle" },
  { name: "Lucy King", currentTicket: null, status: "Idle" },
  { name: "Lynn Forrest", currentTicket: null, status: "Idle" },
  { name: "Olivia Liburd", currentTicket: null, status: "Idle" },
  { name: "Patricia McGuire", currentTicket: null, status: "Idle" },
  { name: "Rachel Martin", currentTicket: null, status: "Idle" },
  { name: "Rebecca Gibson", currentTicket: null, status: "Idle" },
  { name: "Sarah Adams", currentTicket: null, status: "Idle" },
  { name: "Sarah Tshikuna", currentTicket: null, status: "Idle" },
  { name: "Sharon Pearce", currentTicket: null, status: "Idle" },
  { name: "Sue Foster", currentTicket: null, status: "Idle" },
  { name: "Tracey Crooke", currentTicket: null, status: "Idle" },
  { name: "Tracey Johnson", currentTicket: 4709709, status: "Idle" },
  { name: "Vicky Lomax", currentTicket: null, status: "Idle" },
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
              <TableHead className="font-semibold text-foreground">Current Ticket</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.name}>
                <TableCell className="font-medium">{agent.name}</TableCell>
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
