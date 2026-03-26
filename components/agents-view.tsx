"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Agent {
  id: string
  name: string
  email: string
  role: "agent" | "team-lead"
  status: "active" | "inactive"
  currentTickets: number
  expanded: boolean
}

const initialAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "agent@timbits.local",
    role: "agent",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "2",
    name: "Marcus Webb",
    email: "agent2@timbits.local",
    role: "agent",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "lead@timbits.local",
    role: "team-lead",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
]

export function AgentsView() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    role: "agent" as "agent" | "team-lead",
    password: "",
  })

  const toggleExpand = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, expanded: !agent.expanded } : agent
    ))
  }

  const updateRole = (id: string, role: "agent" | "team-lead") => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, role } : agent
    ))
  }

  const toggleStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, status: agent.status === "active" ? "inactive" : "active" } : agent
    ))
  }

  const handleCreateAgent = () => {
    if (newAgent.name && newAgent.email && newAgent.password) {
      const agent: Agent = {
        id: Date.now().toString(),
        name: newAgent.name,
        email: newAgent.email,
        role: newAgent.role,
        status: "active",
        currentTickets: 0,
        expanded: false,
      }
      setAgents([...agents, agent])
      setNewAgent({ name: "", email: "", role: "agent", password: "" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Agent Management</h1>
      </header>

      {/* Agents Table */}
      <div className="border border-border rounded-lg bg-card mb-6">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_1fr_1fr_150px_100px_120px_120px] gap-4 px-4 py-3 border-b border-border bg-muted/30">
          <div></div>
          <div className="text-sm font-medium text-muted-foreground">Name</div>
          <div className="text-sm font-medium text-muted-foreground">Email</div>
          <div className="text-sm font-medium text-muted-foreground">Role</div>
          <div className="text-sm font-medium text-muted-foreground">Status</div>
          <div className="text-sm font-medium text-muted-foreground">Current Tickets</div>
          <div className="text-sm font-medium text-muted-foreground">Actions</div>
        </div>

        {/* Table Body */}
        {agents.map((agent) => (
          <div key={agent.id} className="border-b border-border last:border-b-0">
            <div className="grid grid-cols-[40px_1fr_1fr_150px_100px_120px_120px] gap-4 px-4 py-3 items-center">
              <button 
                onClick={() => toggleExpand(agent.id)}
                className="flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${agent.expanded ? "rotate-180" : ""}`} />
              </button>
              <div className="text-sm font-medium text-foreground">{agent.name}</div>
              <div className="text-sm text-muted-foreground">{agent.email}</div>
              <div>
                <Select value={agent.role} onValueChange={(value: "agent" | "team-lead") => updateRole(agent.id, value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                  agent.status === "active" 
                    ? "bg-teal-100 text-teal-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {agent.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="text-sm text-foreground text-center">{agent.currentTickets}</div>
              <div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleStatus(agent.id)}
                  className="text-xs"
                >
                  {agent.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
            {agent.expanded && (
              <div className="px-4 py-3 bg-muted/20 border-t border-border">
                <p className="text-sm text-muted-foreground">Additional agent details would appear here.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Agent Form */}
      <div className="border border-border rounded-lg bg-card p-6">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">New Agent</h2>
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Name</label>
            <Input
              placeholder="Full name"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              className="bg-background"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
              className="bg-background"
            />
          </div>
          <div className="w-[140px]">
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Role</label>
            <Select value={newAgent.role} onValueChange={(value: "agent" | "team-lead") => setNewAgent({ ...newAgent, role: value })}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="team-lead">Team Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
            <Input
              type="password"
              placeholder="Password"
              value={newAgent.password}
              onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
              className="bg-background"
            />
          </div>
          <Button 
            onClick={handleCreateAgent}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          >
            Create Agent
          </Button>
        </div>
      </div>
    </div>
  )
}
