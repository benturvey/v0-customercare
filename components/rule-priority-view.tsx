"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"

interface RulePriority {
  id: string
  priority: number
  ruleDescription: string
}

const initialRulePriorities: RulePriority[] = [
  { id: "1", priority: 1, ruleDescription: "Customer" },
  { id: "2", priority: 2, ruleDescription: "Carrier" },
  { id: "3", priority: 3, ruleDescription: "Repeat Defer Premium Carrier" },
  { id: "4", priority: 4, ruleDescription: "Repeat Contact" },
  { id: "5", priority: 5, ruleDescription: "Complaint" },
  { id: "6", priority: 6, ruleDescription: "Parcel Count " },
  { id: "7", priority: 7, ruleDescription: "Part Delivered" },
  { id: "8", priority: 8, ruleDescription: "High Value" },
  { id: "9", priority: 9, ruleDescription: "Searches for Multi Parcel" },
  { id: "10", priority: 10, ruleDescription: "Customer Carrier Specific - Fenwick" },
  { id: "11", priority: 11, ruleDescription: "Repeat Defer" },
  { id: "12", priority: 12, ruleDescription: "Reopened Data" },
  { id: "13", priority: 13, ruleDescription: "Elapsed Days No Scan" },
  { id: "14", priority: 14, ruleDescription: "Customer Specific Rules" },
  { id: "15", priority: 15, ruleDescription: "Basic Rules" },
]

export function RulePriorityView() {
  const [rulePriorities, setRulePriorities] = useState<RulePriority[]>(initialRulePriorities)

  const moveUp = (index: number) => {
    if (index === 0) return
    const newRules = [...rulePriorities]
    const temp = newRules[index]
    newRules[index] = newRules[index - 1]
    newRules[index - 1] = temp
    // Update priorities
    const updatedRules = newRules.map((rule, idx) => ({
      ...rule,
      priority: idx + 1
    }))
    setRulePriorities(updatedRules)
  }

  const moveDown = (index: number) => {
    if (index === rulePriorities.length - 1) return
    const newRules = [...rulePriorities]
    const temp = newRules[index]
    newRules[index] = newRules[index + 1]
    newRules[index + 1] = temp
    // Update priorities
    const updatedRules = newRules.map((rule, idx) => ({
      ...rule,
      priority: idx + 1
    }))
    setRulePriorities(updatedRules)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Rule Priorities</h1>
      </header>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Priority</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Reorder</th>
              </tr>
            </thead>
            <tbody>
              {rulePriorities.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-muted-foreground text-sm">
                    No rule priorities defined
                  </td>
                </tr>
              ) : (
                rulePriorities.map((rule, index) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.priority}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="h-8 w-8 p-0"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveDown(index)}
                          disabled={index === rulePriorities.length - 1}
                          className="h-8 w-8 p-0"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
