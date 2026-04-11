"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface RulePriority {
  id: string
  priority: number
  ruleDescription: string
}

const initialRulePriorities: RulePriority[] = [
  { id: "1", priority: 1, ruleDescription: "Repeat Defer Premium Carrier" },
]

export function RulePriorityView() {
  const [rulePriorities] = useState<RulePriority[]>(initialRulePriorities)

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
              </tr>
            </thead>
            <tbody>
              {rulePriorities.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-muted-foreground text-sm">
                    No rule priorities defined
                  </td>
                </tr>
              ) : (
                rulePriorities.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.priority}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
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
