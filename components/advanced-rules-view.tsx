"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle, Plus } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SKILL_LEVELS = ["L1", "L2", "L3", "L4", "MGM", "ADM"]

interface AdvancedRule {
  id: string
  ruleDescription: string
  keyword: string
  itemValue: string
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

interface ParcelCountRule {
  id: string
  ruleDescription: string
  queryCondition: string
  parcelCount: string
  skillLevel: string
}

interface ConsignmentStateRule {
  id: string
  ruleDescription: string
  consignmentState: string
  queryLifecycle: string
  skillLevel: string
}

interface CustomerBasedRule {
  id: string
  ruleDescription: string
  customer: string
  carrier: string
  skillLevel: string
}

interface ElapsedDaysRule {
  id: string
  ruleDescription: string
  elapsedDays: string
  skillLevel: string
}

const initialRules: AdvancedRule[] = [
  { id: "1", ruleDescription: "Complaint", keyword: "Complaint, Complain", itemValue: "", skillLevel: "L4" },
  { id: "2", ruleDescription: "High Value", keyword: "", itemValue: "300", skillLevel: "L4" },
]

const initialQueryStateRules: QueryStateRule[] = [
  { id: "1", ruleDescription: "Repeat Defer Premium Carrier", queryLifecycle: "Defer, Review", lifecycleCountThreshold: "6", carrier: "DHL ECommerce UK, DPD, DPD Local", skillLevel: "L4" },
  { id: "2", ruleDescription: "Repeat Contact", queryLifecycle: "Reopened", lifecycleCountThreshold: "3", carrier: "", skillLevel: "L4" },
  { id: "3", ruleDescription: "Repeat Defer", queryLifecycle: "Defer, Review", lifecycleCountThreshold: "11", carrier: "Amazon Logisitcs UK, DHL Express, DPD DE, DPD NL, Evri, Evri PS, GFS International, OCS, UPS", skillLevel: "L4" },
]

const initialParcelCountRules: ParcelCountRule[] = [
  { id: "1", ruleDescription: "Multi Parcel", queryCondition: "", parcelCount: "1", skillLevel: "L3" },
  { id: "2", ruleDescription: "Searches For Multi Parcel", queryCondition: "descriptions provided", parcelCount: "1", skillLevel: "L4" },
]

const initialConsignmentStateRules: ConsignmentStateRule[] = [
  { id: "1", ruleDescription: "Part Delivered", consignmentState: "PARTIALLY DELIVERED", queryLifecycle: "", skillLevel: "L3" },
  { id: "2", ruleDescription: "Reopened Data", consignmentState: "PARCEL DATA RECEIVED - AWAITING CARRIER SCAN", queryLifecycle: "Reopening", skillLevel: "L4" },
]

const initialCustomerBasedRules: CustomerBasedRule[] = [
  { id: "1", ruleDescription: "Customer Specific - Fenwick", customer: "FENWICK", carrier: "DX Freight", skillLevel: "L4" },
]

const initialElapsedDaysRules: ElapsedDaysRule[] = [
  { id: "1", ruleDescription: "Elapsed Days No Scan", elapsedDays: "6", skillLevel: "L4" },
]

export function AdvancedRulesView() {
  const [rules, setRules] = useState<AdvancedRule[]>(initialRules)
  const [queryStateRules] = useState<QueryStateRule[]>(initialQueryStateRules)
  const [parcelCountRules] = useState<ParcelCountRule[]>(initialParcelCountRules)
  const [consignmentStateRules] = useState<ConsignmentStateRule[]>(initialConsignmentStateRules)
  const [customerBasedRules] = useState<CustomerBasedRule[]>(initialCustomerBasedRules)
  const [elapsedDaysRules] = useState<ElapsedDaysRule[]>(initialElapsedDaysRules)

  // Modal state for General Advanced Rules
  const [isGeneralRuleModalOpen, setIsGeneralRuleModalOpen] = useState(false)
  const [newGeneralRule, setNewGeneralRule] = useState({
    ruleDescription: "",
    keyword: "",
    itemValue: "",
    skillLevel: "",
  })

  const handleAddGeneralRule = () => {
    if (newGeneralRule.ruleDescription || newGeneralRule.keyword || newGeneralRule.itemValue) {
      const newRule: AdvancedRule = {
        id: String(rules.length + 1),
        ruleDescription: newGeneralRule.ruleDescription,
        keyword: newGeneralRule.keyword,
        itemValue: newGeneralRule.itemValue,
        skillLevel: newGeneralRule.skillLevel || "L1",
      }
      setRules([...rules, newRule])
      setNewGeneralRule({ ruleDescription: "", keyword: "", itemValue: "", skillLevel: "" })
      setIsGeneralRuleModalOpen(false)
    }
  }

  const handleOpenGeneralRuleModal = () => {
    setNewGeneralRule({ ruleDescription: "", keyword: "", itemValue: "", skillLevel: "" })
    setIsGeneralRuleModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Advanced Skill Level Rules</h1>
      </header>

      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">General Advanced Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenGeneralRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
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
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
                    No advanced rules defined
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.keyword}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.itemValue}</td>
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
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Query State Specific Rules</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
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

      {/* Parcel Count Rules Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Parcel Count Rules</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Condition</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Parcel Count</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {parcelCountRules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
                    No parcel count rules defined
                  </td>
                </tr>
              ) : (
                parcelCountRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.queryCondition}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.parcelCount}</td>
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

      {/* Consignment State Based Rules Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Consignment State Based Rules</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Consignment State</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Lifecycle</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {consignmentStateRules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
                    No consignment state based rules defined
                  </td>
                </tr>
              ) : (
                consignmentStateRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.consignmentState}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.queryLifecycle}</td>
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

      {/* Customer Based Rules Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Customer Based Rules</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Carrier</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {customerBasedRules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
                    No customer based rules defined
                  </td>
                </tr>
              ) : (
                customerBasedRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.customer}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.carrier}</td>
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

      {/* Elapsed Days Since Last Scan Rules Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Elapsed Days Since Last Scan Rules</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Elapsed Days</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {elapsedDaysRules.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-muted-foreground text-sm">
                    No elapsed days rules defined
                  </td>
                </tr>
              ) : (
                elapsedDaysRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">{rule.ruleDescription}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{rule.elapsedDays}</td>
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

      {/* Add General Advanced Rule Modal */}
      <Dialog open={isGeneralRuleModalOpen} onOpenChange={setIsGeneralRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add General Advanced Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="ruleDescription">Rule Description</Label>
              <Input
                id="ruleDescription"
                value={newGeneralRule.ruleDescription}
                onChange={(e) => setNewGeneralRule({ ...newGeneralRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keyword">Keyword</Label>
              <Input
                id="keyword"
                value={newGeneralRule.keyword}
                onChange={(e) => setNewGeneralRule({ ...newGeneralRule, keyword: e.target.value })}
                placeholder="Enter keyword(s)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="itemValue">Item Value</Label>
              <Input
                id="itemValue"
                value={newGeneralRule.itemValue}
                onChange={(e) => setNewGeneralRule({ ...newGeneralRule, itemValue: e.target.value })}
                placeholder="Enter item value"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select
                value={newGeneralRule.skillLevel}
                onValueChange={(value) => setNewGeneralRule({ ...newGeneralRule, skillLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGeneralRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGeneralRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
