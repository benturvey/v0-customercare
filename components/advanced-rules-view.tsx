"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface AdvancedRule {
  id: string
  keyword: string
  itemValue: string
  parcelCount: string
  state: string
  condition: string
  skillLevel: string
}

const initialRules: AdvancedRule[] = [
  { id: "1", keyword: "\"Complaint\", \"Complain\"", itemValue: "", parcelCount: "", state: "", condition: "", skillLevel: "L4" },
]

export function AdvancedRulesView() {
  const [rules] = useState<AdvancedRule[]>(initialRules)

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Advanced Skill Level Rules</h1>
      </header>

      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-medium text-foreground">General Advanced Rules</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Keyword</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Item Value</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Parcel Count</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">State</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Condition</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
                    No advanced rules defined
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.keyword}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.itemValue}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.parcelCount}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.state}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.condition}</td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                        rule.skillLevel === "L4" ? "bg-purple-100 text-purple-800" :
                        rule.skillLevel === "L3" ? "bg-blue-100 text-blue-800" :
                        rule.skillLevel === "L2" ? "bg-green-100 text-green-800" :
                        rule.skillLevel === "MGM" ? "bg-orange-100 text-orange-800" :
                        rule.skillLevel === "ADM" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {rule.skillLevel}
                      </span>
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
