"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
  SERVICES,
  COUNTRIES,
  DESPATCH_DATE_PERIODS,
} from "@/types/shipment"
import { Search, RotateCcw } from "lucide-react"

interface ShipmentFiltersProps {
  filters: ShipmentFiltersType
  onFilterChange: (filters: ShipmentFiltersType) => void
  onSearch: () => void
  onReset: () => void
}

export function ShipmentFilters({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}: ShipmentFiltersProps) {
  const updateFilter = <K extends keyof ShipmentFiltersType>(
    key: K,
    value: ShipmentFiltersType[K]
  ) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
          {/* Customer Dropdown */}
          <div className="space-y-2 min-w-[200px]">
            <Label htmlFor="customer" className="whitespace-nowrap">Customer</Label>
            <Select
              value={filters.customer}
              onValueChange={(value) => updateFilter("customer", value)}
            >
              <SelectTrigger id="customer" className="min-w-[200px]">
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
          <div className="space-y-2 min-w-[180px]">
            <Label htmlFor="carrier" className="whitespace-nowrap">Carrier</Label>
            <Select
              value={filters.carrier}
              onValueChange={(value) => updateFilter("carrier", value)}
            >
              <SelectTrigger id="carrier">
                <SelectValue placeholder="Select carrier" />
              </SelectTrigger>
              <SelectContent className="max-h-[180px] overflow-y-auto">
                {CARRIERS.map((carrier) => (
                  <SelectItem key={carrier.value} value={carrier.value}>
                    {carrier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Dropdown */}
          <div className="space-y-2 min-w-[180px]">
            <Label htmlFor="service" className="whitespace-nowrap">Service</Label>
            <Select
              value={filters.service}
              onValueChange={(value) => updateFilter("service", value)}
            >
              <SelectTrigger id="service">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Consignment No */}
          <div className="space-y-2 min-w-[160px]">
            <Label htmlFor="consignmentNo" className="whitespace-nowrap">Consignment No</Label>
            <Input
              id="consignmentNo"
              placeholder="Enter consignment no"
              value={filters.consignmentNo}
              onChange={(e) => updateFilter("consignmentNo", e.target.value)}
            />
          </div>

          {/* Parcel No */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="parcelNo" className="whitespace-nowrap">Parcel No</Label>
            <Input
              id="parcelNo"
              placeholder="Enter parcel no"
              value={filters.parcelNo}
              onChange={(e) => updateFilter("parcelNo", e.target.value)}
            />
          </div>

          {/* Tracking No */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="trackingNo" className="whitespace-nowrap">Tracking No</Label>
            <Input
              id="trackingNo"
              placeholder="Enter tracking no"
              value={filters.trackingNo}
              onChange={(e) => updateFilter("trackingNo", e.target.value)}
            />
          </div>

          {/* Shipment Reference No */}
          <div className="space-y-2 min-w-[180px]">
            <Label htmlFor="shipmentReferenceNo" className="whitespace-nowrap">Shipment Reference No</Label>
            <Input
              id="shipmentReferenceNo"
              placeholder="Enter reference no"
              value={filters.shipmentReferenceNo}
              onChange={(e) => updateFilter("shipmentReferenceNo", e.target.value)}
            />
          </div>

          {/* Company */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="company" className="whitespace-nowrap">Company</Label>
            <Input
              id="company"
              placeholder="Enter company"
              value={filters.company}
              onChange={(e) => updateFilter("company", e.target.value)}
            />
          </div>

          {/* County */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="county" className="whitespace-nowrap">County</Label>
            <Input
              id="county"
              placeholder="Enter county"
              value={filters.county}
              onChange={(e) => updateFilter("county", e.target.value)}
            />
          </div>

          {/* Postcode */}
          <div className="space-y-2 min-w-[120px]">
            <Label htmlFor="postcode" className="whitespace-nowrap">Postcode</Label>
            <Input
              id="postcode"
              placeholder="Enter postcode"
              value={filters.postcode}
              onChange={(e) => updateFilter("postcode", e.target.value)}
            />
          </div>

          {/* Country Dropdown */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="country" className="whitespace-nowrap">Country</Label>
            <Select
              value={filters.country}
              onValueChange={(value) => updateFilter("country", value)}
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Set Despatch Date Period Dropdown */}
          <div className="space-y-2 min-w-[200px]">
            <Label htmlFor="despatchDatePeriod" className="whitespace-nowrap">Set Despatch Date Period</Label>
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

          {/* Despatch Date From */}
          <div className="space-y-2 min-w-[160px]">
            <Label htmlFor="despatchDateFrom" className="whitespace-nowrap">Despatch Date From</Label>
            <Input
              id="despatchDateFrom"
              type="date"
              value={filters.despatchDateFrom}
              onChange={(e) => updateFilter("despatchDateFrom", e.target.value)}
            />
          </div>

          {/* Despatch Date To */}
          <div className="space-y-2 min-w-[160px]">
            <Label htmlFor="despatchDateTo" className="whitespace-nowrap">Despatch Date To</Label>
            <Input
              id="despatchDateTo"
              type="date"
              value={filters.despatchDateTo}
              onChange={(e) => updateFilter("despatchDateTo", e.target.value)}
            />
          </div>
        </div>

        {/* Checkboxes and Buttons Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-4 border-t">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeExceptions"
                checked={filters.includeExceptions}
                onCheckedChange={(checked) =>
                  updateFilter("includeExceptions", checked === true)
                }
                className="data-[state=checked]:bg-[#009eff] data-[state=checked]:border-[#009eff]"
              />
              <Label htmlFor="includeExceptions" className="cursor-pointer">
                Include Exceptions
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="exceptionsOnly"
                checked={filters.exceptionsOnly}
                onCheckedChange={(checked) =>
                  updateFilter("exceptionsOnly", checked === true)
                }
                className="data-[state=checked]:bg-[#009eff] data-[state=checked]:border-[#009eff]"
              />
              <Label htmlFor="exceptionsOnly" className="cursor-pointer">
                Exceptions Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeDeleted"
                checked={filters.includeDeleted}
                onCheckedChange={(checked) =>
                  updateFilter("includeDeleted", checked === true)
                }
                className="data-[state=checked]:bg-[#009eff] data-[state=checked]:border-[#009eff]"
              />
              <Label htmlFor="includeDeleted" className="cursor-pointer">
                Include Deleted Shipments
              </Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onSearch} className="bg-[#009eff] hover:bg-[#007ecc] text-white">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
