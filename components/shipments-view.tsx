"use client"

import { useState, useRef, useEffect } from "react"
import { ShipmentFilters } from "@/components/shipment-filters"
import { ShipmentTable } from "@/components/shipment-table"
import type { ShipmentFilters as ShipmentFiltersType, Shipment } from "@/types/shipment"
import { Users, CalendarDays, Truck, User, Hash, SlidersHorizontal, LayoutDashboard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const PERIOD_OPTIONS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 14 Days",
  "Last 30 Days",
  "Last Month",
  "This Month",
  "Custom",
]

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

export function ShipmentsView() {
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

  const [activeStatus, setActiveStatus] = useState("ANY CUSTOMER")
  const [activePeriod, setActivePeriod] = useState("Yesterday")
  const [activeCarrier, setActiveCarrier] = useState("ANY CARRIER")
  const [activeRecipient, setActiveRecipient] = useState("ANY RECIPIENT")
  const [periodOpen, setPeriodOpen] = useState(false)
  const [carrierOpen, setCarrierOpen] = useState(false)
  const [selectedCarrier, setSelectedCarrier] = useState("All carriers")
  const [selectedContract, setSelectedContract] = useState("All contracts")
  const [selectedService, setSelectedService] = useState("All services")
  const [customFrom, setCustomFrom] = useState("2026-05-14")
  const [customTo, setCustomTo] = useState("2026-05-14")
  const periodRef = useRef<HTMLDivElement>(null)
  const carrierRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setPeriodOpen(false)
      }
      if (carrierRef.current && !carrierRef.current.contains(e.target as Node)) {
        setCarrierOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full px-4 py-6">
      {/* Filter pill bar */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <div className="flex items-center flex-wrap gap-3">
          <LayoutDashboard className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Search Shipments</span>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
          >
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            {activeStatus}
          </Button>
          <div ref={periodRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-bold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setPeriodOpen((o) => !o)}
            >
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              {activePeriod.toUpperCase()}
            </Button>
            {periodOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-56">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">SHIPMENT DESPATCHED</span>
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => { setActivePeriod("Yesterday"); setPeriodOpen(false) }}
                  >
                    Reset
                  </button>
                </div>
                <div className="py-2">
                  {PERIOD_OPTIONS.map((option) => {
                    const isSelected = activePeriod === option
                    return (
                      <button
                        key={option}
                        onClick={() => { setActivePeriod(option); if (option !== "Custom") setPeriodOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm mx-2 my-0.5 rounded-full transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-foreground hover:bg-muted"
                        }`}
                        style={{ width: "calc(100% - 16px)" }}
                      >
                        {isSelected ? (
                          <Check className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-muted-foreground inline-block" />
                        )}
                        {option}
                      </button>
                    )
                  })}
                  {activePeriod === "Custom" && (
                    <div className="px-4 pt-3 pb-2 space-y-3 border-t mt-2">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">From</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={customFrom}
                            onChange={(e) => setCustomFrom(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">To</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={customTo}
                            onChange={(e) => setCustomTo(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div ref={carrierRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setCarrierOpen((o) => !o)}
            >
              <Truck className="h-3.5 w-3.5 text-muted-foreground" />
              ANY CARRIER
            </Button>
            {carrierOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-72">
                <div className="px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">CARRIER FILTERS</span>
                </div>
                <div className="px-4 py-4 space-y-4">
                  {/* Carrier */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Carrier</label>
                    <div className="relative">
                      <select
                        value={selectedCarrier}
                        onChange={(e) => setSelectedCarrier(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white pr-8"
                      >
                        <option>All carriers</option>
                        <option>Amazon Logistics UK</option>
                        <option>BJS</option>
                        <option>Coll-8</option>
                        <option>DHL ECommerce UK</option>
                        <option>DHL Express</option>
                        <option>DPD</option>
                        <option>DPD Germany</option>
                        <option>DPD Local</option>
                        <option>DPD Netherlands</option>
                        <option>DX Freight</option>
                        <option>Evri</option>
                        <option>Exelot</option>
                        <option>FedEx</option>
                        <option>GFS International</option>
                        <option>OCS</option>
                        <option>Royal Mail</option>
                        <option>UPS</option>
                      </select>
                      <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  {/* Contract */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Contract</label>
                    <div className="relative">
                      <select
                        value={selectedContract}
                        onChange={(e) => setSelectedContract(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white pr-8"
                      >
                        <option>All contracts</option>
                      </select>
                      <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Service</label>
                    <div className="relative">
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white pr-8"
                      >
                        <option>All services</option>
                      </select>
                      <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
          >
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            {activeRecipient}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
          >
            <Hash className="h-3.5 w-3.5 text-muted-foreground" />
            REFERENCES
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            OTHER
          </Button>
          <button
            onClick={handleReset}
            className="text-xs text-foreground hover:text-muted-foreground ml-1"
          >
            Reset
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            JA
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-foreground leading-tight">jacquie.cadger@gfsdeliver.com</p>
            <p className="text-xs text-muted-foreground leading-tight">MAMAS &amp; PAPAS</p>
          </div>
        </div>
      </div>

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
  )
}
