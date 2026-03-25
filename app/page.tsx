"use client"

import { useState } from "react"
import { ShipmentFilters } from "@/components/shipment-filters"
import { ShipmentTable } from "@/components/shipment-table"
import type { ShipmentFilters as ShipmentFiltersType, Shipment } from "@/types/shipment"

// Sample data for demonstration
const sampleShipments: Shipment[] = [
  {
    id: "1",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "14/03/2026",
    carrier: "DPD",
    service: "NEXT DAY DELIVERY",
    consignmentNo: "15500306013410",
    shipRef: "67020805",
    scanText: "PARCEL LABEL APPLIED",
    packs: 1,
    country: "GB",
    contractNo: "0306",
  },
  {
    id: "2",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "14/03/2026",
    carrier: "DHL ECOMMERCE UK",
    service: "SIGNATURE MANDATORY - ALL DAY",
    consignmentNo: "31501612852806",
    shipRef: "016783951002",
    scanText: "IOD PARCEL SCAN",
    packs: 2,
    country: "GB",
    contractNo: "H950267",
  },
  {
    id: "3",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "13/03/2026",
    carrier: "DHL ECOMMERCE UK",
    service: "SIGNATURE MANDATORY - ALL DAY",
    consignmentNo: "31501612852539",
    shipRef: "016783579002",
    scanText: "IOD PARCEL SCAN",
    packs: 2,
    country: "GB",
    contractNo: "H950267",
  },
  {
    id: "4",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "13/03/2026",
    carrier: "EVRI",
    service: "2 DAY SERVICE",
    consignmentNo: "T00FBA0007357845",
    shipRef: "017372146001",
    scanText: "SECURE DELIVERY (BACK DOOR)",
    packs: 1,
    country: "GB",
    contractNo: "IOD4HR",
  },
  {
    id: "5",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "13/03/2026",
    carrier: "EVRI",
    service: "2 DAY SERVICE",
    consignmentNo: "T04K4A0001193151",
    shipRef: "017371453002",
    scanText: "PARCEL DELIVERED WITH A SIGNATURE",
    packs: 1,
    country: "GB",
    contractNo: "1RY011",
  },
  {
    id: "6",
    sender: "MAMAS AND PAPAS LTD",
    despatchDate: "18/03/2026",
    carrier: "DHL ECOMMERCE UK",
    service: "NEXT DAY",
    consignmentNo: "31501612855915",
    shipRef: "016787171001",
    scanText: "52 - CARD LEFT: GREY",
    packs: 1,
    country: "GB",
    contractNo: "H950267",
    isException: true,
  },
]

export default function ShipmentsPage() {
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

  const [shipments] = useState<Shipment[]>(sampleShipments)

  const handleFilterChange = (newFilters: ShipmentFiltersType) => {
    setFilters(newFilters)
  }

  const handleSearch = () => {
    // In a real application, this would trigger an API call with the filters
    console.log("Searching with filters:", filters)
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

  // Filter shipments based on current filters
  const filteredShipments = shipments.filter((shipment) => {
    if (filters.exceptionsOnly && !shipment.isException) return false
    if (filters.carrier && shipment.carrier !== filters.carrier) return false
    if (filters.service && shipment.service !== filters.service) return false
    if (filters.country && shipment.country !== filters.country) return false
    if (filters.consignmentNo && !shipment.consignmentNo.toLowerCase().includes(filters.consignmentNo.toLowerCase())) return false
    if (filters.shipmentReferenceNo && !shipment.shipRef.toLowerCase().includes(filters.shipmentReferenceNo.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Shipments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search and view shipment details
          </p>
        </header>

        <ShipmentFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className="mt-6">
          <ShipmentTable shipments={filteredShipments} />
        </div>
      </div>
    </div>
  )
}
