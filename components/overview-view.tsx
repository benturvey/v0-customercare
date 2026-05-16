"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Clock, PlaneTakeoff, ShieldCheck, Crown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  { value: "214", label: "TOTAL WAITING", green: true, target: "Target < 250" },
  { value: "13", label: "IN PROGRESS" },
  { value: "10", label: "DEFERRED" },
  { value: "14", label: "REVIEWED" },
  { value: "862", label: "NEW TODAY" },
  { value: "791", label: "COMPLETED TODAY" },
  { value: "80 mins", label: "OLDEST WAITING", amber: true, target: "Target < 60 mins" },
  { value: "15/30", label: "ACTIVE AGENTS" },
  { value: "1", label: "SLA RISK", green: true, target: "Target < 10" },
  { value: "48%", label: "AUTOMATION RATE", green: true, target: "Target: 48%" },
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
        <div className="flex gap-8 justify-between items-center">
          {stats.map((stat) => (
            <div key={stat.label} className="text-left flex-1">
              <p className={`text-3xl font-bold ${stat.green ? "text-green-600" : stat.amber ? "text-amber-500" : stat.red ? "text-red-600" : "text-[#1e3a5f]"}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">{stat.label}</p>
              {stat.target && (
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{stat.target}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Waiting by Skill Card */}
      <div className="border border-border rounded-lg bg-card mb-6">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
            WAITING BY SKILL
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground">Skill Level</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Typical Query Types</TableHead>
              <TableHead className="font-semibold text-muted-foreground">No. Waiting</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Oldest (mins)</TableHead>
              <TableHead className="font-semibold text-muted-foreground">New Last Hour</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Trend</TableHead>
              <TableHead className="font-semibold text-muted-foreground">SLA Risk</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Agents Online</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">L1</TableCell>
              <TableCell className="text-sm text-muted-foreground">WISMO, basic tracking, simple delays, POD/simple updates</TableCell>
              <TableCell>118</TableCell>
              <TableCell>22</TableCell>
              <TableCell>34</TableCell>
              <TableCell><span className="text-amber-500 font-medium">▲</span></TableCell>
              <TableCell>3</TableCell>
              <TableCell>8</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  Watch
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L2</TableCell>
              <TableCell className="text-sm text-muted-foreground">Change address, RTS, redelivery, collections, repeat contacts</TableCell>
              <TableCell>54</TableCell>
              <TableCell>35</TableCell>
              <TableCell>18</TableCell>
              <TableCell><span className="text-green-600 font-medium">▼</span></TableCell>
              <TableCell>1</TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Good
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L3</TableCell>
              <TableCell className="text-sm text-muted-foreground">International, investigations, multipart, customer focus accounts</TableCell>
              <TableCell>29</TableCell>
              <TableCell>52</TableCell>
              <TableCell>11</TableCell>
              <TableCell><span className="text-muted-foreground font-medium">—</span></TableCell>
              <TableCell>0</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Good
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L4</TableCell>
              <TableCell className="text-sm text-muted-foreground">Complaints, credits, senior escalations, sensitive cases</TableCell>
              <TableCell>13</TableCell>
              <TableCell>80</TableCell>
              <TableCell>7</TableCell>
              <TableCell><span className="text-red-600 font-medium">▲</span></TableCell>
              <TableCell>5</TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Action
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
              <TableHead className="font-semibold text-muted-foreground">Name</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Agent Level</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Current Ticket</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Ticket Level</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.name}>
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
                    {agent.status === "ADM" && (
                      <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                    )}
                    {agent.status === "MGM" && (
                      <Crown className="h-3.5 w-3.5 text-blue-600" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-medium">{agent.level}</TableCell>
                <TableCell className="text-foreground font-medium">
                  {agent.currentTicket || "—"}
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  {agent.ticketLevel || "—"}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                    agent.status === "In Progress"
                      ? "bg-green-100 text-green-800"
                      : agent.status === "Idle"
                      ? "bg-amber-100 text-amber-800"
                      : agent.status === "ADM"
                      ? "bg-purple-100 text-purple-800"
                      : agent.status === "MGM"
                      ? "bg-blue-100 text-blue-800"
                      : agent.status === "Out of Office"
                      ? "bg-red-100 text-red-800"
                      : "bg-muted text-muted-foreground"
                  }`}>
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
