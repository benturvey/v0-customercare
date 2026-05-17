"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface RoutingRule {
  id: string
  agent: string
  tags: string[]
  priority: number
  active: boolean
}

const initialRules: RoutingRule[] = [
  { id: "#82a5", agent: "Aaron Doherty", tags: ["carrier:evri", "region:domestic"], priority: 10, active: true },
  { id: "#82a7", agent: "Alex Lucy", tags: ["carrier:evri"], priority: 10, active: true },
  { id: "#82a6", agent: "Aaron Doherty", tags: ["carrier:dpd"], priority: 5, active: true },
  { id: "#82a8", agent: "Alex Lucy", tags: ["customer:abbott lyon"], priority: 8, active: true },
]

const availableTags = [
  { id: "contact", label: "CONTACT" },
  { id: "first", label: "first" },
]

const agents = ["Aaron Doherty", "Alex Lucy", "Andrei Costea", "Annette Davidson", "Apryl Watson"]

export function RoutingRulesView() {
  const [rules, setRules] = useState<RoutingRule[]>(initialRules)
  const [selectedAgent, setSelectedAgent] = useState("Sarah Chen")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priority, setPriority] = useState("10")

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    )
  }

  const handleSaveRule = () => {
    const newRule: RoutingRule = {
      id: `#${Math.random().toString(16).slice(2, 6)}`,
      agent: selectedAgent,
      tags: selectedTags,
      priority: parseInt(priority) || 10,
      active: true,
    }
    setRules(prev => [...prev, newRule])
    setSelectedTags([])
    setPriority("10")
  }

  const handleDelete = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page header bar */}
      <div className="flex items-center justify-between border-b pb-3 mb-6">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Basic Rules</span>
        </div>
        <UserDropdownMenu userName="Jacquie Cadger" userRole="admin" userInitials="JA" />
      </div>
      <h1 className="text-2xl font-semibold text-[#1e3a5f] mb-6">Routing Rules</h1>

      {/* Rules Table */}
      <div className="border border-border rounded-lg bg-card mb-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-medium">Rule</TableHead>
              <TableHead className="text-muted-foreground font-medium">Agent</TableHead>
              <TableHead className="text-muted-foreground font-medium">Tags</TableHead>
              <TableHead className="text-muted-foreground font-medium">Priority</TableHead>
              <TableHead className="text-muted-foreground font-medium">Active</TableHead>
              <TableHead className="text-muted-foreground font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id} className="border-b border-border">
                <TableCell className="text-muted-foreground">{rule.id}</TableCell>
                <TableCell className="text-foreground">{rule.agent}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {rule.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded border border-border text-xs text-muted-foreground bg-muted/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{rule.priority}</TableCell>
                <TableCell>
                  {rule.active && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#1a1a1a] text-white">
                      Active
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(rule.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Routing Rule Form */}
      <div className="border border-border rounded-lg bg-card p-6">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Add Routing Rule</h2>

        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Agent</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent} value={agent}>
                    {agent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Tags</label>
            <div className="flex flex-col gap-1">
              {availableTags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => handleTagToggle(tag.id)}
                  />
                  <label htmlFor={tag.id} className="text-sm text-foreground cursor-pointer">
                    {tag.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Priority</label>
            <Input
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-20"
            />
          </div>

          <Button
            onClick={handleSaveRule}
            className="bg-[#1a1a1a] hover:bg-[#333] text-white"
          >
            Save Rule
          </Button>
        </div>
      </div>
    </div>
  )
}
