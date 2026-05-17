"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Clock, PlaneTakeoff, ShieldCheck, Crown, Zap, WifiOff, Menu } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function OverviewView() {
  const [peakMode, setPeakMode] = useState(false)

  const stats = [
    { value: "214", label: "TOTAL WAITING", green: true, target: peakMode ? "Target < 700" : "Target < 250" },
    { value: "13", label: "IN PROGRESS" },
    { value: "10", label: "DEFERRED" },
    { value: "14", label: "REVIEWED" },
    { value: "862", label: "NEW TODAY" },
    { value: "791", label: "COMPLETED TODAY" },
    { value: "80", label: "OLDEST WAITING", amber: true, target: "Target < 60 mins" },
    { value: "15/30", label: "ACTIVE AGENTS" },
    { value: "9", label: "SLA RISK", green: true, target: peakMode ? "Target < 35" : "Target < 10" },
    { value: "48%", label: "AUTOMATION RATE", green: !peakMode, red: peakMode, target: peakMode ? "Target: 55%" : "Target: 48%" },
  ]

  const agents = [
    { name: "Andrei Costea", level: "L2", currentTicket: "TKT-1042", ticketLevel: "L2", status: "In Progress" },
    { name: "Arlene Griffin", level: "L1", currentTicket: "TKT-1039", ticketLevel: "L1", status: "In Progress" },
    { name: "Apryl Watson", level: "L3", currentTicket: "TKT-1037", ticketLevel: "L2", status: "In Progress" },
    { name: "George Lilliston", level: "L2", currentTicket: null, ticketLevel: null, status: "Idle" },
    { name: "Ibrahim Anidi", level: "L1", currentTicket: "TKT-1041", ticketLevel: "L1", status: "In Progress" },
    { name: "Lisa Yates", level: "L4", currentTicket: null, ticketLevel: null, status: "Offline" },
    { name: "Lynn Forrest", level: "L1", currentTicket: null, ticketLevel: null, status: "Out of Office" },
    { name: "Sue Foster", level: "ADM", currentTicket: null, ticketLevel: null, status: "ADM" },
    { name: "Vicky Lomax", level: "MGM", currentTicket: null, ticketLevel: null, status: "MGM" },
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page header bar */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Overview</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            JA
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-foreground leading-tight">Jacquie Cadger</p>
            <p className="text-xs text-muted-foreground leading-tight">admin</p>
          </div>
        </div>
      </div>
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
          {/* Peak Mode Toggle */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 pl-4 border-l border-border">
            <button
              onClick={() => setPeakMode((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                peakMode
                  ? "bg-amber-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${peakMode ? "fill-white" : ""}`} />
              PEAK MODE
            </button>
            <span className="text-[10px] text-muted-foreground/70">
              {peakMode ? "On" : "Off"}
            </span>
          </div>
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
              <TableCell>74</TableCell>
              <TableCell>35</TableCell>
              <TableCell>18</TableCell>
              <TableCell><span className="text-green-600 font-medium">▼</span></TableCell>
              <TableCell>1</TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  OK
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L3</TableCell>
              <TableCell>26</TableCell>
              <TableCell>52</TableCell>
              <TableCell>11</TableCell>
              <TableCell><span className="text-muted-foreground font-medium">—</span></TableCell>
              <TableCell>0</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  OK
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L4</TableCell>
              <TableCell>6</TableCell>
              <TableCell>80</TableCell>
              <TableCell>7</TableCell>
              <TableCell><span className="text-red-600 font-medium">▲</span></TableCell>
              <TableCell>5</TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Alert
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Staff Coverage vs Requirement Card */}
      <div className="border border-border rounded-lg bg-card">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
            STAFF COVERAGE VS REQUIREMENT
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground">Skill Level</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Required</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Online</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Gap</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Utilisation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">L1</TableCell>
              <TableCell>10</TableCell>
              <TableCell>8</TableCell>
              <TableCell><span className="text-amber-500 font-medium">-2</span></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "80%" }} />
                  </div>
                  <span className="text-sm text-foreground">80%</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L2</TableCell>
              <TableCell>6</TableCell>
              <TableCell>4</TableCell>
              <TableCell><span className="text-red-600 font-medium">-2</span></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "67%" }} />
                  </div>
                  <span className="text-sm text-foreground">67%</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>4</TableCell>
              <TableCell><span className="text-green-600 font-medium">0</span></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }} />
                  </div>
                  <span className="text-sm text-foreground">100%</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">L4</TableCell>
              <TableCell>2</TableCell>
              <TableCell>1</TableCell>
              <TableCell><span className="text-red-600 font-medium">-1</span></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "50%" }} />
                  </div>
                  <span className="text-sm text-foreground">50%</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Top Demand Drivers Card */}
      <div className="border border-border rounded-lg bg-card">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
            TOP DEMAND DRIVERS
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground">Driver</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Tickets Today</TableHead>
              <TableHead className="font-semibold text-muted-foreground">% of Total</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Change vs Yesterday</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Linked Skill</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">WISMO — Evri delayed</TableCell>
              <TableCell>214</TableCell>
              <TableCell>24.8%</TableCell>
              <TableCell><span className="text-red-600 font-medium">▲ +32</span></TableCell>
              <TableCell><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">L1</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Failed delivery — no access</TableCell>
              <TableCell>143</TableCell>
              <TableCell>16.6%</TableCell>
              <TableCell><span className="text-amber-500 font-medium">▲ +11</span></TableCell>
              <TableCell><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">L2</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address change request</TableCell>
              <TableCell>98</TableCell>
              <TableCell>11.4%</TableCell>
              <TableCell><span className="text-green-600 font-medium">▼ -8</span></TableCell>
              <TableCell><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">L2</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">International customs hold</TableCell>
              <TableCell>74</TableCell>
              <TableCell>8.6%</TableCell>
              <TableCell><span className="text-red-600 font-medium">▲ +19</span></TableCell>
              <TableCell><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">L3</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">POD request</TableCell>
              <TableCell>61</TableCell>
              <TableCell>7.1%</TableCell>
              <TableCell><span className="text-muted-foreground font-medium">— 0</span></TableCell>
              <TableCell><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">L1</span></TableCell>
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
                    {agent.status === "Offline" && (
                      <WifiOff className="h-3.5 w-3.5 text-gray-500" />
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
