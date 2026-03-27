"use client"

import { useState } from "react"
import { CollectionFilters } from "@/components/collection-filters"
import type { ShipmentFilters as ShipmentFiltersType } from "@/types/shipment"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface Collection {
  collectionId: string
  carrier: string
  customer: string
  serviceCode: string
  serviceDescr: string
  collectionDate: string
  consignmentNo: string
  customerRef: string
  packs: number
  contractNo: string
}

const sampleCollections: Collection[] = [
  {
    collectionId: "1072652",
    carrier: "DPD",
    customer: "CREW CLOTHING CO LIMITED",
    serviceCode: "12",
    serviceDescr: "NEXT DAY DELIVERY",
    collectionDate: "13/03/2026",
    consignmentNo: "15508022322873",
    customerRef: "consolidation",
    packs: 5,
    contractNo: "0637",
  },
  {
    collectionId: "1072677",
    carrier: "DPD",
    customer: "SERVICE LOGISTICS",
    serviceCode: "12",
    serviceDescr: "NEXT DAY DELIVERY",
    collectionDate: "16/03/2026",
    consignmentNo: "15508022325097",
    customerRef: "Can Do Payments 1850266003 ADHOC",
    packs: 1,
    contractNo: "0138",
  },
  {
    collectionId: "1072996",
    carrier: "DPD",
    customer: "OKA DIRECT LIMITED",
    serviceCode: "13",
    serviceDescr: "NEXT DAY BY NOON",
    collectionDate: "13/03/2026",
    consignmentNo: "15508022317593",
    customerRef: "RAUK66350",
    packs: 1,
    contractNo: "5638",
  },
  {
    collectionId: "1073014",
    carrier: "DPD",
    customer: "ROBERT WELCH DESINGS LIMITED",
    serviceCode: "19",
    serviceDescr: "DPD CLASSIC PARCEL",
    collectionDate: "13/03/2026",
    consignmentNo: "15508022323261",
    customerRef: "C1065103 Adamson",
    packs: 1,
    contractNo: "5789",
  },
  {
    collectionId: "1074361",
    carrier: "DPD",
    customer: "MAMAS & PAPAS",
    serviceCode: "12",
    serviceDescr: "NEXT DAY DELIVERY",
    collectionDate: "18/03/2026",
    consignmentNo: "15508022337272",
    customerRef: "1105217001-002-003",
    packs: 3,
    contractNo: "0848",
  },
  {
    collectionId: "1074369",
    carrier: "DPD",
    customer: "CREW CLOTHING CO LIMITED",
    serviceCode: "12",
    serviceDescr: "NEXT DAY DELIVERY",
    collectionDate: "17/03/2026",
    consignmentNo: "15508022332796",
    customerRef: "Crew - Returned Parcel",
    packs: 1,
    contractNo: "0637",
  },
]

export function CollectionsView() {
  const [filters, setFilters] = useState<ShipmentFiltersType>({
    customer: "",
    carrier: "dpd",
    service: "",
    consignmentNo: "",
    parcelNo: "",
    trackingNo: "",
    shipmentReferenceNo: "",
    company: "",
    county: "",
    postcode: "",
    country: "",
    despatchDatePeriod: "",
    despatchDateFrom: "",
    despatchDateTo: "",
    includeExceptions: false,
    exceptionsOnly: false,
    includeDeleted: false,
  })

  const handleFilterChange = (newFilters: ShipmentFiltersType) => {
    setFilters(newFilters)
  }

  const handleSearch = () => {
    // In a real application, this would trigger an API call with the filters
    console.log("Searching collections with filters:", filters)
  }

  const handleReset = () => {
    setFilters({
      customer: "",
      carrier: "",
      service: "",
      consignmentNo: "",
      parcelNo: "",
      trackingNo: "",
      shipmentReferenceNo: "",
      company: "",
      county: "",
      postcode: "",
      country: "",
      despatchDatePeriod: "",
      despatchDateFrom: "",
      despatchDateTo: "",
      includeExceptions: false,
      exceptionsOnly: false,
      includeDeleted: false,
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Collections</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search and view collection details
        </p>
      </header>

      <CollectionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* Results Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Collection ID</TableHead>
                  <TableHead className="whitespace-nowrap">Carrier</TableHead>
                  <TableHead className="whitespace-nowrap">Customer</TableHead>
                  <TableHead className="whitespace-nowrap">Service Code</TableHead>
                  <TableHead className="whitespace-nowrap">Service Desc</TableHead>
                  <TableHead className="whitespace-nowrap">Collection Date</TableHead>
                  <TableHead className="whitespace-nowrap">Consignment No</TableHead>
                  <TableHead className="whitespace-nowrap">Customer Ref</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Packs</TableHead>
                  <TableHead className="whitespace-nowrap">Contract No</TableHead>
                  <TableHead className="whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleCollections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      No collections found. Try adjusting your search filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  sampleCollections.map((collection) => (
                    <TableRow key={collection.collectionId}>
                      <TableCell className="font-mono text-sm">{collection.collectionId}</TableCell>
                      <TableCell>{collection.carrier}</TableCell>
                      <TableCell className="font-medium">{collection.customer}</TableCell>
                      <TableCell>{collection.serviceCode}</TableCell>
                      <TableCell>{collection.serviceDescr}</TableCell>
                      <TableCell>{collection.collectionDate}</TableCell>
                      <TableCell className="font-mono text-sm">{collection.consignmentNo || "—"}</TableCell>
                      <TableCell className="font-mono text-sm">{collection.customerRef}</TableCell>
                      <TableCell className="text-right">{collection.packs}</TableCell>
                      <TableCell className="font-mono text-sm">{collection.contractNo}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
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
    </div>
  )
}
