"use client"

import { useState } from "react"
import { ShipmentFilters } from "@/components/shipment-filters"
import { ShipmentTable } from "@/components/shipment-table"
import type { ShipmentFilters as ShipmentFiltersType, Shipment } from "@/types/shipment"

// Sample data for collections
const sampleCollections: Shipment[] = [
  {
    id: "1",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "14/03/2026",
    carrier: "DPD",
    service: "COLLECTION SERVICE",
    consignmentNo: "COL15500306013410",
    shipRef: "67020805",
    scanText: "COLLECTION SCHEDULED",
    packs: 1,
    country: "GB",
    contractNo: "0306",
  },
  {
    id: "2",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "14/03/2026",
    carrier: "DHL ECOMMERCE UK",
    service: "COLLECTION - SAME DAY",
    consignmentNo: "COL31501612852806",
    shipRef: "016783951002",
    scanText: "AWAITING COLLECTION",
    packs: 2,
    country: "GB",
    contractNo: "H950267",
  },
  {
    id: "3",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "13/03/2026",
    carrier: "DHL ECOMMERCE UK",
    service: "COLLECTION - NEXT DAY",
    consignmentNo: "COL31501612852539",
    shipRef: "016783579002",
    scanText: "COLLECTED",
    packs: 2,
    country: "GB",
    contractNo: "H950267",
  },
  {
    id: "4",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "13/03/2026",
    carrier: "EVRI",
    service: "COLLECTION SERVICE",
    consignmentNo: "COLT00FBA0007357845",
    shipRef: "017372146001",
    scanText: "COLLECTION COMPLETE",
    packs: 1,
    country: "GB",
    contractNo: "IOD4HR",
  },
  {
    id: "5",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "13/03/2026",
    carrier: "EVRI",
    service: "COLLECTION SERVICE",
    consignmentNo: "COLT04K4A0001193151",
    shipRef: "017371453002",
    scanText: "COLLECTED WITH SIGNATURE",
    packs: 1,
    country: "GB",
    contractNo: "1RY011",
  },
  {
    id: "6",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "18/03/2026",
    carrier: "DHL ECOMMERCE UK",
    service: "COLLECTION - URGENT",
    consignmentNo: "COL31501612855915",
    shipRef: "016787171001",
    scanText: "COLLECTION FAILED - NO ACCESS",
    packs: 1,
    country: "GB",
    contractNo: "H950267",
    isException: true,
  },
]

export function CollectionsView() {
  const [filters, setFilters] = useState<ShipmentFiltersType>({
    customer: "mamaspapas",
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

  const [collections] = useState<Shipment[]>(sampleCollections)

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

  // Filter collections based on current filters
  const filteredCollections = collections.filter((collection) => {
    if (filters.exceptionsOnly && !collection.isException) return false
    if (filters.carrier && collection.carrier !== filters.carrier) return false
    if (filters.service && collection.service !== filters.service) return false
    if (filters.country && collection.country !== filters.country) return false
    if (filters.consignmentNo && !collection.consignmentNo.toLowerCase().includes(filters.consignmentNo.toLowerCase())) return false
    if (filters.shipmentReferenceNo && !collection.shipRef.toLowerCase().includes(filters.shipmentReferenceNo.toLowerCase())) return false
    return true
  })

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Collections</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search and view collection details
        </p>
      </header>

      <ShipmentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className="mt-6">
        <ShipmentTable shipments={filteredCollections} />
      </div>
    </div>
  )
}
