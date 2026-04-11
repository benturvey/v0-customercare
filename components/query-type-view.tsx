"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

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
  const [queryTypes] = useState<QueryTypeItem[]>(initialQueryTypes)

  return (
    <div className="w-full px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Query Type / Carrier Skill Levels</h1>
      </header>

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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                      item.skillLevel === "L4" ? "bg-purple-100 text-purple-800" :
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
