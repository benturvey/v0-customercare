"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AdvancedRule {
  id: string
  ruleDescription: string
  keyword: string
  itemValue: string
  parcelCount: string
  state: string
  condition: string
  skillLevel: string
}

interface QueryStateRule {
  id: string
  ruleDescription: string
  queryLifecycle: string
  lifecycleCountThreshold: string
  carrier: string
  skillLevel: string
}

const initialRules: AdvancedRule[] = [
  { id: "1", ruleDescription: "Complaint", keyword: "\"Complaint\", \"Complain\"", itemValue: "", parcelCount: "", state: "", condition: "", skillLevel: "L4" },
  { id: "2", ruleDescription: "High Value", keyword: "", itemValue: "300", parcelCount: "", state: "", condition: "", skillLevel: "L4" },
]

const initialQueryStateRules: QueryStateRule[] = [
  { id: "1", ruleDescription: "Repeat Defer Premium Carrier", queryLifecycle: "Defer, Review", lifecycleCountThreshold: "6", carrier: "DPD", skillLevel: "L4" },
]

export function AdvancedRulesView() {
  const [rules] = useState<AdvancedRule[]>(initialRules)
  const [queryStateRules] = useState<QueryStateRule[]>(initialQueryStateRules)

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
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    Keyword
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Customer must specifically state the keyword(s) in the query text</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    Item Value £
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Customer must specifically state the item value and the stated value must be equal to or greater than the assigned value</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    Parcel Count
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The parcel count on the consignment must be greater than the assigned value</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    State
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Current state of the shipment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    Condition
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Additional conditions for this rule</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground text-sm">
                    No advanced rules defined
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.keyword}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.itemValue}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.parcelCount}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.state}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.condition}</td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${rule.skillLevel === "L4" ? "bg-purple-100 text-purple-800" :
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

      {/* Query State Specific Rules Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-medium text-foreground">Query State Specific Rules</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Lifecycle</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Lifecycle Count Threshold</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Carrier</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {queryStateRules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                    No query state specific rules defined
                  </td>
                </tr>
              ) : (
                queryStateRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.queryLifecycle}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.lifecycleCountThreshold}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.carrier}</td>
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
