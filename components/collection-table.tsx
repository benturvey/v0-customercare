"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Shipment } from "@/types/shipment"

interface CollectionTableProps {
  collections: Shipment[]
}

export function CollectionTable({ collections }: CollectionTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getScanTextVariant = (scanText: string) => {
    const lowerText = scanText.toLowerCase()
    if (lowerText.includes("complete") || lowerText.includes("collected")) return "default"
    if (lowerText.includes("failed") || lowerText.includes("exception")) return "destructive"
    if (lowerText.includes("scheduled") || lowerText.includes("awaiting")) return "secondary"
    return "outline"
  }

  const handleViewDetails = (collectionId: string) => {
    alert(`View details for collection: ${collectionId}`)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          Results
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({collections.length} collections found)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Sender</TableHead>
                <TableHead className="whitespace-nowrap">Collection Date</TableHead>
                <TableHead className="whitespace-nowrap">Carrier</TableHead>
                <TableHead className="whitespace-nowrap">Collection ID</TableHead>
                <TableHead className="whitespace-nowrap">Customer Reference</TableHead>
                <TableHead className="whitespace-nowrap">Postcode</TableHead>
                <TableHead className="whitespace-nowrap">Scan Text</TableHead>
                <TableHead className="whitespace-nowrap text-right">Packs</TableHead>
                <TableHead className="whitespace-nowrap">Country</TableHead>
                <TableHead className="whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No collections found. Try adjusting your search filters.
                  </TableCell>
                </TableRow>
              ) : (
                collections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell className="font-medium">{collection.sender}</TableCell>
                    <TableCell>{formatDate(collection.despatchDate)}</TableCell>
                    <TableCell>{collection.carrier}</TableCell>
                    <TableCell className="font-mono text-sm">{collection.consignmentNo}</TableCell>
                    <TableCell className="font-mono text-sm">{collection.shipRef}</TableCell>
                    <TableCell>{collection.postcode || "WA4 2SN"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={getScanTextVariant(collection.scanText)}
                          className={collection.scanText.toLowerCase().includes("collect") && !collection.scanText.toLowerCase().includes("failed") ? "bg-[#3bc693] text-white hover:bg-[#3bc693]" : ""}
                        >
                          {collection.scanText}
                        </Badge>
                        {collection.isException && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#ff7353] text-white">
                            EXCEPTION
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{collection.packs}</TableCell>
                    <TableCell>{collection.country}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleViewDetails(collection.consignmentNo)}
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
