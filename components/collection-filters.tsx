"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type ShipmentFilters as ShipmentFiltersType,
  CUSTOMERS,
  CARRIERS,
  DESPATCH_DATE_PERIODS,
} from "@/types/shipment"
import { Search, RotateCcw } from "lucide-react"

interface CollectionFiltersProps {
  filters: ShipmentFiltersType
  onFilterChange: (filters: ShipmentFiltersType) => void
  onSearch: () => void
  onReset: () => void
}

export function CollectionFilters({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}: CollectionFiltersProps) {
  const updateFilter = <K extends keyof ShipmentFiltersType>(
    key: K,
    value: ShipmentFiltersType[K]
  ) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Customer Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select
              value={filters.customer}
              onValueChange={(value) => updateFilter("customer", value)}
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {CUSTOMERS.map((customer) => (
                  <SelectItem key={customer.value} value={customer.value}>
                    {customer.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Carrier Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="carrier">Carrier</Label>
            <Select
              value={filters.carrier}
              onValueChange={(value) => updateFilter("carrier", value)}
            >
              <SelectTrigger id="carrier">
                <SelectValue placeholder="Select carrier" />
              </SelectTrigger>
              <SelectContent>
                {CARRIERS.map((carrier) => (
                  <SelectItem key={carrier.value} value={carrier.value}>
                    {carrier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Collection ID (was Tracking No) */}
          <div className="space-y-2">
            <Label htmlFor="trackingNo">Collection ID</Label>
            <Input
              id="trackingNo"
              placeholder="Enter collection ID"
              value={filters.trackingNo}
              onChange={(e) => updateFilter("trackingNo", e.target.value)}
            />
          </div>

          {/* Customer Reference (was Shipment Reference No) */}
          <div className="space-y-2">
            <Label htmlFor="shipmentReferenceNo">Customer Reference</Label>
            <Input
              id="shipmentReferenceNo"
              placeholder="Enter customer reference"
              value={filters.shipmentReferenceNo}
              onChange={(e) => updateFilter("shipmentReferenceNo", e.target.value)}
            />
          </div>

          {/* Postcode */}
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              placeholder="Enter postcode"
              value={filters.postcode}
              onChange={(e) => updateFilter("postcode", e.target.value)}
            />
          </div>

          {/* Set Collection Date Period (was Set Despatch Date Period) */}
          <div className="space-y-2">
            <Label htmlFor="despatchDatePeriod">Set Collection Date Period</Label>
            <Select
              value={filters.despatchDatePeriod}
              onValueChange={(value) => updateFilter("despatchDatePeriod", value)}
            >
              <SelectTrigger id="despatchDatePeriod">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {DESPATCH_DATE_PERIODS.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Collection Date From (was Despatch Date From) */}
          <div className="space-y-2">
            <Label htmlFor="despatchDateFrom">Collection Date From</Label>
            <Input
              id="despatchDateFrom"
              type="date"
              value={filters.despatchDateFrom}
              onChange={(e) => updateFilter("despatchDateFrom", e.target.value)}
            />
          </div>

          {/* Collection Date To (was Despatch Date To) */}
          <div className="space-y-2">
            <Label htmlFor="despatchDateTo">Collection Date To</Label>
            <Input
              id="despatchDateTo"
              type="date"
              value={filters.despatchDateTo}
              onChange={(e) => updateFilter("despatchDateTo", e.target.value)}
            />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={onSearch} className="bg-[#009eff] hover:bg-[#007ecc] text-white">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
