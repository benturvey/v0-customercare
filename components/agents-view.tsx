"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RoutingRule {
  id: string
  agentId: string
  agentName: string
  tags: string[]
  priority: number
  active: boolean
}

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

const initialRoutingRules: RoutingRule[] = [
  { id: "#82a5", agentId: "1", agentName: "Sarah Chen", tags: ["carrier:dpd", "region:domestic"], priority: 10, active: true },
  { id: "#82a7", agentId: "2", agentName: "Marcus Webb", tags: ["carrier:royal-mail"], priority: 10, active: true },
  { id: "#82a6", agentId: "1", agentName: "Sarah Chen", tags: ["region:international"], priority: 5, active: true },
  { id: "#82a8", agentId: "2", agentName: "Marcus Webb", tags: ["type:collection"], priority: 8, active: true },
]

const availableTags = ["CONTACT", "first"]

export function AgentsView() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [routingRules, setRoutingRules] = useState<RoutingRule[]>(initialRoutingRules)
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    role: "agent" as "agent" | "team-lead",
    password: "",
  })
  const [newRule, setNewRule] = useState({
    agentId: "1",
    tags: [] as string[],
    priority: 10,
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

  const handleAddRule = (agentId: string, agentName: string) => {
    if (newRule.tags.length > 0) {
      const rule: RoutingRule = {
        id: `#${Math.random().toString(36).substr(2, 4)}`,
        agentId,
        agentName,
        tags: newRule.tags,
        priority: newRule.priority,
        active: true,
      }
      setRoutingRules([...routingRules, rule])
      setNewRule({ agentId: "1", tags: [], priority: 10 })
    }
  }

  const handleDeleteRule = (ruleId: string) => {
    setRoutingRules(routingRules.filter(rule => rule.id !== ruleId))
  }

  const toggleRuleTag = (tag: string) => {
    setNewRule(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const getAgentRules = (agentId: string) => {
    return routingRules.filter(rule => rule.agentId === agentId)
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
              <div className="px-4 py-6 bg-muted/20 border-t border-border">
                {/* Routing Rules Section */}
                <h3 className="text-xl font-semibold text-[#1e3a5f] mb-4">Routing Rules</h3>
                
                {/* Routing Rules Table */}
                <div className="border border-border rounded-lg bg-card mb-6">
                  {/* Table Header */}
                  <div className="grid grid-cols-[80px_140px_1fr_100px_80px_140px] gap-4 px-4 py-3 border-b border-border bg-muted/30">
                    <div className="text-sm font-medium text-muted-foreground">Rule</div>
                    <div className="text-sm font-medium text-muted-foreground">Agent</div>
                    <div className="text-sm font-medium text-muted-foreground">Tags</div>
                    <div className="text-sm font-medium text-muted-foreground">Priority</div>
                    <div className="text-sm font-medium text-muted-foreground">Active</div>
                    <div className="text-sm font-medium text-muted-foreground">Actions</div>
                  </div>

                  {/* Table Body */}
                  {getAgentRules(agent.id).map((rule) => (
                    <div key={rule.id} className="grid grid-cols-[80px_140px_1fr_100px_80px_140px] gap-4 px-4 py-3 items-center border-b border-border last:border-b-0">
                      <div className="text-sm text-muted-foreground">{rule.id}</div>
                      <div className="text-sm text-foreground">{rule.agentName}</div>
                      <div className="flex flex-wrap gap-2">
                        {rule.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded border border-border text-xs font-medium text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-foreground text-center">{rule.priority}</div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#1a1a1a] text-white">
                          Active
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="text-xs bg-red-600 hover:bg-red-700"
                          onClick={() => handleDeleteRule(rule.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}

                  {getAgentRules(agent.id).length === 0 && (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No routing rules for this agent.
                    </div>
                  )}
                </div>

                {/* Add Routing Rule Form */}
                <div className="border border-border rounded-lg bg-card p-6">
                  <h4 className="text-lg font-semibold text-[#1e3a5f] mb-4">Add Routing Rule</h4>
                  <div className="flex items-end gap-4 flex-wrap">
                    <div className="w-[160px]">
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Agent</label>
                      <Select value={agent.id} disabled>
                        <SelectTrigger className="bg-background">
                          <SelectValue>{agent.name}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={agent.id}>{agent.name}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Tags</label>
                      <div className="flex flex-col gap-1">
                        {availableTags.map((tag) => (
                          <div key={tag} className="flex items-center gap-2">
                            <Checkbox
                              id={`tag-${agent.id}-${tag}`}
                              checked={newRule.tags.includes(tag)}
                              onCheckedChange={() => toggleRuleTag(tag)}
                            />
                            <label htmlFor={`tag-${agent.id}-${tag}`} className="text-sm text-muted-foreground">
                              {tag}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-[100px]">
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Priority</label>
                      <Input
                        type="number"
                        value={newRule.priority}
                        onChange={(e) => setNewRule({ ...newRule, priority: parseInt(e.target.value) || 0 })}
                        className="bg-background"
                      />
                    </div>
                    <Button 
                      onClick={() => handleAddRule(agent.id, agent.name)}
                      className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
                    >
                      Save Rule
                    </Button>
                  </div>
                </div>
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
