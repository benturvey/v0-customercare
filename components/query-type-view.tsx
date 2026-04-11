"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const QUERY_TYPES = [
  "CHANGE_ADDRESS",
  "COLLECTION_ENQUIRY",
  "CUSTOMS_INFO",
  "DELIVERED_DAMAGED",
  "DELIVERED_INCOMPLETE",
  "DELIVERY_DISPUTED",
  "GENERAL ENQUIRY",
  "PARCEL_DESCRIPTION_FOR_INVESTIGATION",
  "POST_DELIVERY_FEEDBACK",
  "REDELIVER_PARCEL",
  "REQUEST_PROOF_OF_DELIVERY",
  "RETURN_TO_SENDER",
  "WHERE_IS_MY_PARCEL",
  "WHY_WAS_THIS_DONE",
]

const CARRIERS = [
  "Amazon Logistics UK",
  "BJS",
  "DHL ECommerce UK",
  "DHL Express",
  "DPD",
  "DPD DE",
  "DPD Local",
  "DPD NL",
  "DX Freight",
  "Evri",
  "Evri PS",
  "GFS International",
  "OCS",
  "UPS",
]

const SKILL_LEVELS = ["L1", "L2", "L3", "L4", "MGM", "ADM"]

interface QueryTypeItem {
  id: string
  queryType: string
  carrier: string
  skillLevel: string
}

const initialQueryTypes: QueryTypeItem[] = []

const STORAGE_KEY = "queryTypeCarrierSkillLevels"

export function QueryTypeView() {
  const [queryTypes, setQueryTypes] = useState<QueryTypeItem[]>(initialQueryTypes)
  const [newEntry, setNewEntry] = useState({
    queryType: "",
    carrier: "",
    skillLevel: "",
  })

  // Load persisted data on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setQueryTypes(parsed)
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Persist data whenever queryTypes changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queryTypes))
  }, [queryTypes])

  const handleAddEntry = () => {
    if (newEntry.queryType && newEntry.carrier && newEntry.skillLevel) {
      const newId = Date.now().toString()
      setQueryTypes([
        ...queryTypes,
        {
          id: newId,
          queryType: newEntry.queryType,
          carrier: newEntry.carrier,
          skillLevel: newEntry.skillLevel,
        },
      ])
      setNewEntry({ queryType: "", carrier: "", skillLevel: "" })
    }
  }

  return (
    <div className="w-full px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Query Type / Carrier Skill Levels</h1>
      </header>

      {/* Add New Entry Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Add New Query Type / Carrier Skill Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="queryType">Query Type</Label>
              <Select
                value={newEntry.queryType}
                onValueChange={(value) => setNewEntry(prev => ({ ...prev, queryType: value }))}
              >
                <SelectTrigger id="queryType">
                  <SelectValue placeholder="Select query type" />
                </SelectTrigger>
                <SelectContent>
                  {QUERY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Select
                value={newEntry.carrier}
                onValueChange={(value) => setNewEntry(prev => ({ ...prev, carrier: value }))}
              >
                <SelectTrigger id="carrier">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  {CARRIERS.map((carrier) => (
                    <SelectItem key={carrier} value={carrier}>
                      {carrier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select
                value={newEntry.skillLevel}
                onValueChange={(value) => setNewEntry(prev => ({ ...prev, skillLevel: value }))}
              >
                <SelectTrigger id="skillLevel">
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

            <Button
              onClick={handleAddEntry}
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Type</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Carrier</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {queryTypes.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-b-0">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{item.queryType}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{item.carrier}</td>
                  <td className="py-4 px-4 text-sm text-foreground">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.skillLevel === "L4" ? "bg-purple-100 text-purple-800" :
                      item.skillLevel === "L3" ? "bg-blue-100 text-blue-800" :
                        item.skillLevel === "L2" ? "bg-green-100 text-green-800" :
                          "bg-gray-100 text-gray-800"
                      }`}>
                      {item.skillLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
