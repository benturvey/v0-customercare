"use client"

import { useState } from "react"
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
  "DPD",
  "DHL Express",
  "DHL ECommerce",
  "Evri",
  "UPS",
  "FedEx",
]

const SKILL_LEVELS = ["L1", "L2", "L3", "L4", "MGM", "ADM"]

interface QueryTypeItem {
  id: string
  queryType: string
  carrier: string
  skillLevel: string
}

const initialQueryTypes: QueryTypeItem[] = [
  { id: "1", queryType: "Delivery Query", carrier: "DPD", skillLevel: "L1" },
  { id: "2", queryType: "Delivery Query", carrier: "DHL Express", skillLevel: "L2" },
  { id: "3", queryType: "Delivery Query", carrier: "DHL ECommerce", skillLevel: "L2" },
  { id: "4", queryType: "Delivery Query", carrier: "Evri", skillLevel: "L1" },
  { id: "5", queryType: "Collection Query", carrier: "DPD", skillLevel: "L2" },
  { id: "6", queryType: "Collection Query", carrier: "DHL Express", skillLevel: "L3" },
  { id: "7", queryType: "Damage Claim", carrier: "DPD", skillLevel: "L3" },
  { id: "8", queryType: "Damage Claim", carrier: "DHL Express", skillLevel: "L3" },
  { id: "9", queryType: "Damage Claim", carrier: "DHL ECommerce", skillLevel: "L3" },
  { id: "10", queryType: "Damage Claim", carrier: "Evri", skillLevel: "L3" },
  { id: "11", queryType: "Lost Shipment", carrier: "DPD", skillLevel: "L4" },
  { id: "12", queryType: "Lost Shipment", carrier: "DHL Express", skillLevel: "L4" },
  { id: "13", queryType: "Lost Shipment", carrier: "DHL ECommerce", skillLevel: "L4" },
  { id: "14", queryType: "Lost Shipment", carrier: "Evri", skillLevel: "L4" },
  { id: "15", queryType: "Tracking Update", carrier: "DPD", skillLevel: "L1" },
  { id: "16", queryType: "Tracking Update", carrier: "DHL Express", skillLevel: "L1" },
  { id: "17", queryType: "Tracking Update", carrier: "DHL ECommerce", skillLevel: "L1" },
  { id: "18", queryType: "Tracking Update", carrier: "Evri", skillLevel: "L1" },
  { id: "19", queryType: "Address Amendment", carrier: "DPD", skillLevel: "L2" },
  { id: "20", queryType: "Address Amendment", carrier: "DHL Express", skillLevel: "L2" },
]

export function QueryTypeView() {
  const [queryTypes, setQueryTypes] = useState<QueryTypeItem[]>(initialQueryTypes)
  const [newEntry, setNewEntry] = useState({
    queryType: "",
    carrier: "",
    skillLevel: "",
  })

  const handleAddEntry = () => {
    if (newEntry.queryType && newEntry.carrier && newEntry.skillLevel) {
      const newId = (queryTypes.length + 1).toString()
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
