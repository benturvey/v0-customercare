"use client"

import { useState } from "react"
import { ChevronDown, Pencil, Menu } from "lucide-react"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
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
  role: "agent" | "senior-agent" | "admin" | "management" | "team-leader" | "trainer" | "senior-management" | "director"
  skillLevel: "L1" | "L2" | "L3" | "L4" | "MGM" | "ADM"
  status: "active" | "inactive"
  currentTickets: number
  expanded: boolean
}

const initialAgents: Agent[] = [
  {
    id: "1",
    name: "Aaron Doherty",
    email: "aaron.doherty@gfsdeliver.com",
    role: "agent",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "2",
    name: "Alex Lucy",
    email: "alex.lucy@gfsdeliver.com",
    role: "admin",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "3",
    name: "Andrei Costea",
    email: "andrei.costea@gfsdeliver.com",
    role: "agent",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "4",
    name: "Annette Davidson",
    email: "annette.davidson@gfsdeliver.com",
    role: "admin",
    skillLevel: "ADM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "5",
    name: "Apryl Watson",
    email: "apryl.watson@gfsdeliver.com",
    role: "agent",
    skillLevel: "L3",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "6",
    name: "Arlene Griffin",
    email: "arlene.griffin@gfsdeliver.com",
    role: "agent",
    skillLevel: "L1",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "7",
    name: "Audrey Johnson",
    email: "audrey.johnson@gfsdeliver.com",
    role: "agent",
    skillLevel: "L1",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "8",
    name: "Ben Lund",
    email: "ben.lund@gfsdeliver.com",
    role: "management",
    skillLevel: "MGM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "9",
    name: "Danielle Marcroft",
    email: "danielle.marcroft@gfsdeliver.com",
    role: "agent",
    skillLevel: "L3",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "10",
    name: "Francine Payne",
    email: "francine.payne@gfsdeliver.com",
    role: "team-leader",
    skillLevel: "MGM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "11",
    name: "George Lilliston",
    email: "george.lilliston@gfsdeliver.com",
    role: "agent",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "12",
    name: "Georgia Collins",
    email: "georgia.collins@gfsdeliver.com",
    role: "agent",
    skillLevel: "L3",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "13",
    name: "Ibrahim Anidi",
    email: "ibrahim.anidi@gfsdeliver.com",
    role: "agent",
    skillLevel: "L1",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "14",
    name: "Kimberley McCormick",
    email: "kimberley.mcCormick@gfsdeliver.com",
    role: "team-leader",
    skillLevel: "MGM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "15",
    name: "Kirsty Doyle",
    email: "kirsty.doyle@gfsdeliver.com",
    role: "agent",
    skillLevel: "L3",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "16",
    name: "Lee Higgins",
    email: "lee.higgins@gfsdeliver.com",
    role: "admin",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "17",
    name: "Lisa Yates",
    email: "lisa.yates@gfsdeliver.com",
    role: "senior-agent",
    skillLevel: "L4",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "18",
    name: "Lucy King",
    email: "lucy.king@gfsdeliver.com",
    role: "agent",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "19",
    name: "Lynn Forrest",
    email: "lynn.forrest@gfsdeliver.com",
    role: "agent",
    skillLevel: "L3",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "20",
    name: "Olivia Liburd",
    email: "olivia.liburd@gfsdeliver.com",
    role: "agent",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "21",
    name: "Patricia McGuire",
    email: "patricia.mcGuire@gfsdeliver.com",
    role: "agent",
    skillLevel: "L1",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "22",
    name: "Rachel Martin",
    email: "rachel.martin@gfsdeliver.com",
    role: "agent",
    skillLevel: "L1",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "23",
    name: "Rebecca Gibson",
    email: "rebecca.gibson@gfsdeliver.com",
    role: "agent",
    skillLevel: "L4",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "24",
    name: "Sarah Adams",
    email: "sarah.adams@gfsdeliver.com",
    role: "senior-agent",
    skillLevel: "L4",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "25",
    name: "Sarah Tshikuna",
    email: "sarah.tshikuna@gfsdeliver.com",
    role: "agent",
    skillLevel: "L2",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "26",
    name: "Sharon Pearce",
    email: "sharon.pearce@gfsdeliver.com",
    role: "agent",
    skillLevel: "L1",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "27",
    name: "Sue Foster",
    email: "sue.foster@gfsdeliver.com",
    role: "admin",
    skillLevel: "ADM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "28",
    name: "Tracey Crooke",
    email: "tracey.crooke@gfsdeliver.com",
    role: "team-leader",
    skillLevel: "MGM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "29",
    name: "Tracey Johnson",
    email: "tracey.johnson@gfsdeliver.com",
    role: "senior-agent",
    skillLevel: "L4",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "30",
    name: "Vicky Lomax",
    email: "vicky.lomax@gfsdeliver.com",
    role: "director",
    skillLevel: "MGM",
    status: "active",
    currentTickets: 0,
    expanded: false,
  },
  {
    id: "31",
    name: "Deborah Hoolihan",
    email: "deborah.hoolihan@gfsdeliver.com",
    role: "trainer",
    skillLevel: "TRN",
    status: "active",
    currentTickets: 0,
    expanded: false,
  }
]

const initialRoutingRules: RoutingRule[] = [
  { id: "#82a5", agentId: "1", agentName: "Aaron Doherty", tags: ["carrier:dpd", "region:domestic"], priority: 10, active: true },
  { id: "#82a7", agentId: "2", agentName: "Alex Lucy", tags: ["carrier:royal-mail"], priority: 10, active: true },
  { id: "#82a6", agentId: "1", agentName: "Aaron Doherty", tags: ["region:international"], priority: 5, active: true },
  { id: "#82a8", agentId: "2", agentName: "Alex Lucy", tags: ["type:collection"], priority: 8, active: true },
]

const availableTags = ["CONTACT", "first"]

export function AgentsView({ onLogOut }: { onLogOut?: () => void }) {
  const [agents, setAgents] = useState<Agent[]>([...initialAgents].sort((a, b) => a.name.localeCompare(b.name)))
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
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setAgents(agents.map(agent =>
      agent.id === id ? { ...agent, expanded: !agent.expanded } : agent
    ))
  }

  const updateRole = (id: string, role: Agent["role"]) => {
    setAgents(agents.map(agent =>
      agent.id === id ? { ...agent, role } : agent
    ))
  }

  const updateSkillLevel = (id: string, skillLevel: Agent["skillLevel"]) => {
    setAgents(agents.map(agent =>
      agent.id === id ? { ...agent, skillLevel } : agent
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
      {/* Page header bar */}
      <div className="flex items-center justify-between border-b pb-3 mb-6">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Agent Management</span>
        </div>
        <UserDropdownMenu userName="Jacquie Cadger" userRole="admin" userInitials="JA" onLogOut={onLogOut} />
      </div>
      
      {/* Agents Table */}
      <div className="border border-border rounded-lg bg-card mb-6">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_1fr_1fr_150px_120px_100px_120px_120px] gap-4 px-4 py-3 border-b border-border bg-muted/30">
          <div></div>
          <div className="text-sm font-medium text-muted-foreground">Name</div>
          <div className="text-sm font-medium text-muted-foreground">Email</div>
          <div className="text-sm font-medium text-muted-foreground">Role</div>
          <div className="text-sm font-medium text-muted-foreground">Skill Level</div>
          <div className="text-sm font-medium text-muted-foreground">Status</div>
          <div className="text-sm font-medium text-muted-foreground">Current Tickets</div>
          <div className="text-sm font-medium text-muted-foreground">Actions</div>
        </div>

        {/* Table Body */}
        {agents.map((agent) => (
          <div key={agent.id} className="border-b border-border last:border-b-0">
            <div className="grid grid-cols-[40px_1fr_1fr_150px_120px_100px_120px_120px] gap-4 px-4 py-3 items-center">
              <button
                onClick={() => toggleExpand(agent.id)}
                className="flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${agent.expanded ? "rotate-180" : ""}`} />
              </button>
              <div className="text-sm font-medium text-foreground">{agent.name}</div>
              <div className="text-sm text-muted-foreground">{agent.email}</div>
              <div>
                {editingAgentId === agent.id ? (
                  <Select value={agent.role} onValueChange={(value: Agent["role"]) => updateRole(agent.id, value)}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="senior-agent">Senior Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="team-leader">Team Leader</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                      <SelectItem value="senior-management">Senior Management</SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm text-foreground capitalize">{agent.role.replace("-", " ")}</span>
                )}
              </div>
              <div>
                {editingAgentId === agent.id ? (
                  <Select value={agent.skillLevel} onValueChange={(value: Agent["skillLevel"]) => updateSkillLevel(agent.id, value)}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">L1</SelectItem>
                      <SelectItem value="L2">L2</SelectItem>
                      <SelectItem value="L3">L3</SelectItem>
                      <SelectItem value="L4">L4</SelectItem>
                      <SelectItem value="MGM">MGM</SelectItem>
                      <SelectItem value="ADM">ADM</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm text-foreground">{agent.skillLevel}</span>
                )}
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${agent.status === "active"
                  ? "bg-teal-100 text-teal-800"
                  : "bg-gray-100 text-gray-800"
                  }`}>
                  {agent.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="text-sm text-foreground text-center">{agent.currentTickets}</div>
              <div className="flex items-center gap-2">
                {editingAgentId === agent.id ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setEditingAgentId(null)}
                    className="text-xs"
                  >
                    Save
                  </Button>
                ) : (
                  <button
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title="Edit"
                    onClick={() => setEditingAgentId(agent.id)}
                  >
                    <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
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
            <Select value={newAgent.role} onValueChange={(value: "agent" | "senior" | "team-lead") => setNewAgent({ ...newAgent, role: value })}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="team-lead">Team Lead</SelectItem>
                <SelectItem value="management">Management</SelectItem>
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
