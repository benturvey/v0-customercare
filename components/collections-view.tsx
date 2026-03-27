"use client"

import { useState } from "react"
import { CollectionFilters } from "@/components/collection-filters"
import type { ShipmentFilters as ShipmentFiltersType } from "@/types/shipment"

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
    </div>
  )
}
