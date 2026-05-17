"use client"

import { useState, useRef, useEffect } from "react"
import { CollectionDetailsModal } from "@/components/collection-details-modal"
import { CollectionDetailPage } from "@/components/collection-detail-page"
import { ShipmentDetailsModal } from "@/components/shipment-details-modal"
import { shipmentDetailsData } from "@/components/shipment-table"
import type { ShipmentDetails, ShipmentFilters as ShipmentFiltersType } from "@/types/shipment"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  MoreVertical,
  Users,
  CalendarDays,
  Truck,
  User,
  Hash,
  SlidersHorizontal,
  Menu,
  Check,
  Search,
} from "lucide-react"

const CARRIERS_LIST = [
  "Amazon Logistics UK",
  "BJS",
  "Coll-8",
  "DHL ECommerce UK",
  "DHL Express",
  "DPD",
  "DPD Germany",
  "DPD Local",
  "DPD Netherlands",
  "DX Freight",
  "Evri",
  "Exelot",
  "FedEx",
  "GFS International",
  "OCS",
  "Royal Mail",
  "UPS",
]

const CUSTOMERS = [
  "365 Engines Ltd",
  "3PL UK Limited",
  "Abbot Lyon Ltd",
  "Andertons Music Company",
  "Babing Limited",
  "Baker Ross Limited",
  "Castles Technology UK & Ireland Ltd",
  "Dams Furniture Limited",
  "EC Group",
  "Fenwick Limited",
  "Hamleys",
  "IForce Limited",
  "John Winstanley & Company Limited",
  "KPSS",
  "Mamas & Papas",
  "Newhow",
  "Omlet",
  "Robert Welch Designs Limited",
  "Service Logistics",
  "Trinny London Limited",
  "Virginia Hayward Limited",
  "Woodland Group Limited - WGAC",
]

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
  {
    collectionId: "1090088",
    carrier: "DPD",
    customer: "AGTC LIMITED",
    serviceCode: "12",
    serviceDescr: "NEXT DAY",
    collectionDate: "15/05/2026",
    consignmentNo: "",
    customerRef: "SO741944/IF782241",
    packs: 2,
    contractNo: "",
  },
  {
    collectionId: "1090091",
    carrier: "DPD",
    customer: "AGTC LIMITED",
    serviceCode: "12",
    serviceDescr: "NEXT DAY",
    collectionDate: "15/05/2026",
    consignmentNo: "",
    customerRef: "IF770948",
    packs: 1,
    contractNo: "",
  },
]

export function CollectionsView() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [detailPageOpen, setDetailPageOpen] = useState(false)
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails | null>(null)
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false)

  // Customer dropdown
  const [customerOpen, setCustomerOpen] = useState(false)
  const [customerSearch, setCustomerSearch] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  // Period dropdown
  const [periodOpen, setPeriodOpen] = useState(false)
  const [activePeriod, setActivePeriod] = useState("Yesterday")
  const [customFrom, setCustomFrom] = useState("2026-05-14")
  const [customTo, setCustomTo] = useState("2026-05-14")

  // Carrier dropdown
  const [carrierOpen, setCarrierOpen] = useState(false)
  const [selectedCarrier, setSelectedCarrier] = useState<string[]>([])
  const [carrierSearch, setCarrierSearch] = useState("")
  const [selectedContract, setSelectedContract] = useState("All contracts")
  const [selectedService, setSelectedService] = useState("All services")

  // Recipient dropdown
  const [recipientOpen, setRecipientOpen] = useState(false)
  const [recipientPostcode, setRecipientPostcode] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientCompany, setRecipientCompany] = useState("")
  const [recipientTown, setRecipientTown] = useState("")
  const [recipientCounty, setRecipientCounty] = useState("")
  const [recipientCountry, setRecipientCountry] = useState("Any country")

  // References dropdown
  const [refsOpen, setRefsOpen] = useState(false)
  const [refConsignment, setRefConsignment] = useState("")
  const [refParcel, setRefParcel] = useState("")
  const [refShipment, setRefShipment] = useState("")

  // Other dropdown
  const [otherOpen, setOtherOpen] = useState(false)
  const [hasComments, setHasComments] = useState(false)
  const [deletedOnly, setDeletedOnly] = useState(false)
  const [exceptionStatus, setExceptionStatus] = useState(false)

  // Refs for click-outside
  const customerRef = useRef<HTMLDivElement>(null)
  const periodRef = useRef<HTMLDivElement>(null)
  const carrierRef = useRef<HTMLDivElement>(null)
  const recipientRef = useRef<HTMLDivElement>(null)
  const refsRef = useRef<HTMLDivElement>(null)
  const otherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (customerRef.current && !customerRef.current.contains(e.target as Node)) setCustomerOpen(false)
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) setPeriodOpen(false)
      if (carrierRef.current && !carrierRef.current.contains(e.target as Node)) setCarrierOpen(false)
      if (recipientRef.current && !recipientRef.current.contains(e.target as Node)) setRecipientOpen(false)
      if (refsRef.current && !refsRef.current.contains(e.target as Node)) setRefsOpen(false)
      if (otherRef.current && !otherRef.current.contains(e.target as Node)) setOtherOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleReset = () => {
    setSelectedCustomers([])
    setActivePeriod("Yesterday")
    setSelectedCarrier([])
    setCarrierSearch("")
    setRecipientPostcode("")
    setRecipientName("")
    setRecipientCompany("")
    setRecipientTown("")
    setRecipientCounty("")
    setRecipientCountry("Any country")
    setRefConsignment("")
    setRefParcel("")
    setRefShipment("")
    setHasComments(false)
    setDeletedOnly(false)
    setExceptionStatus(false)
  }

  const handleViewDetails = (collection: Collection) => {
    setSelectedCollection(collection)
    if (!collection.consignmentNo) {
      setDetailPageOpen(true)
    } else {
      const details = shipmentDetailsData[collection.consignmentNo]
      if (details) {
        setShipmentDetails(details)
        setShipmentModalOpen(true)
      } else {
        const fallback: ShipmentDetails = {
          consignmentNo: collection.consignmentNo,
          insertDate: collection.collectionDate,
          despatchDate: collection.collectionDate,
          customer: collection.customer,
          carrier: collection.carrier,
          status: "Consignment Created",
          service: collection.serviceDescr,
          weight: 0,
          content: "",
          accountNo: "",
          contractNo: collection.contractNo || "",
          contractComment: "",
          sender: collection.customer,
          instructions: "",
          shipmentRef: collection.customerRef || "",
          consignmentRef: collection.customerRef || "",
          trackingNo: collection.consignmentNo,
          collectionId: collection.collectionId,
          originDepot: "",
          destinationDepot: "",
        }
        setShipmentDetails(fallback)
        setShipmentModalOpen(true)
      }
    }
  }

  return (
    <>
      {detailPageOpen && selectedCollection ? (
        <CollectionDetailPage
          collection={selectedCollection}
          onBack={() => { setDetailPageOpen(false); setSelectedCollection(null) }}
        />
      ) : (
    <div className="w-full px-4 py-6">
      {/* Filter pill bar */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <div className="flex items-center flex-wrap gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Search Collections</span>

          {/* ANY CUSTOMER */}
          <div ref={customerRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setCustomerOpen((o) => !o)}
            >
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              {selectedCustomers.length > 0 ? `${selectedCustomers.length} CUSTOMER${selectedCustomers.length > 1 ? "S" : ""}` : "ANY CUSTOMER"}
            </Button>
            {customerOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-64">
                <div className="flex items-center gap-2 px-3 py-2 border-b">
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="Search options..."
                    className="flex-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {(() => {
                    const filtered = CUSTOMERS.filter((c) => c.toLowerCase().includes(customerSearch.toLowerCase()))
                    const allSelected = filtered.length > 0 && filtered.every((c) => selectedCustomers.includes(c))
                    return (
                      <>
                        <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                          <Checkbox
                            checked={allSelected}
                            onCheckedChange={(v) => {
                              if (v) setSelectedCustomers((prev) => Array.from(new Set([...prev, ...filtered])))
                              else setSelectedCustomers((prev) => prev.filter((c) => !filtered.includes(c)))
                            }}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <span className="text-sm text-foreground">(Select All)</span>
                        </label>
                        {filtered.map((customer) => (
                          <label key={customer} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                            <Checkbox
                              checked={selectedCustomers.includes(customer)}
                              onCheckedChange={(v) => setSelectedCustomers((prev) => v ? [...prev, customer] : prev.filter((c) => c !== customer))}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <span className="text-sm text-foreground">{customer}</span>
                          </label>
                        ))}
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* YESTERDAY */}
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
                  <button className="text-xs text-blue-600 hover:underline" onClick={() => { setActivePeriod("Yesterday"); setPeriodOpen(false) }}>Reset</button>
                </div>
                <div className="py-2">
                  {PERIOD_OPTIONS.map((option) => {
                    const isSelected = activePeriod === option
                    return (
                      <button
                        key={option}
                        onClick={() => { setActivePeriod(option); if (option !== "Custom") setPeriodOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm mx-2 my-0.5 rounded-full transition-colors ${isSelected ? "bg-blue-600 text-white font-semibold" : "text-foreground hover:bg-muted"}`}
                        style={{ width: "calc(100% - 16px)" }}
                      >
                        {isSelected ? <Check className="h-3.5 w-3.5 shrink-0" /> : <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-muted-foreground inline-block" />}
                        {option}
                      </button>
                    )
                  })}
                  {activePeriod === "Custom" && (
                    <div className="px-4 pt-3 pb-2 space-y-3 border-t mt-2">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">From</label>
                        <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">To</label>
                        <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ANY CARRIER */}
          <div ref={carrierRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setCarrierOpen((o) => !o)}
            >
              <Truck className="h-3.5 w-3.5 text-muted-foreground" />
              {selectedCarrier.length > 0 ? `${selectedCarrier.length} CARRIER${selectedCarrier.length > 1 ? "S" : ""}` : "ANY CARRIER"}
            </Button>
            {carrierOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-72">
                <div className="px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">CARRIER FILTERS</span>
                </div>
                <div className="px-4 py-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Carrier</label>
                    <div className="flex items-center gap-2 px-2 py-1.5 border rounded-md">
                      <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <input type="text" value={carrierSearch} onChange={(e) => setCarrierSearch(e.target.value)} placeholder="Search options..." className="flex-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
                    </div>
                    <div className="max-h-48 overflow-y-auto border rounded-md py-1">
                      {(() => {
                        const filtered = CARRIERS_LIST.filter((c) => c.toLowerCase().includes(carrierSearch.toLowerCase()))
                        const allSelected = filtered.length > 0 && filtered.every((c) => selectedCarrier.includes(c))
                        return (
                          <>
                            <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                              <Checkbox checked={allSelected} onCheckedChange={(v) => { if (v) setSelectedCarrier((prev) => Array.from(new Set([...prev, ...filtered]))); else setSelectedCarrier((prev) => prev.filter((c) => !filtered.includes(c))) }} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                              <span className="text-sm text-foreground">(Select All)</span>
                            </label>
                            {filtered.map((carrier) => (
                              <label key={carrier} className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted cursor-pointer">
                                <Checkbox checked={selectedCarrier.includes(carrier)} onCheckedChange={(v) => setSelectedCarrier((prev) => v ? [...prev, carrier] : prev.filter((c) => c !== carrier))} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                                <span className="text-sm text-foreground">{carrier}</span>
                              </label>
                            ))}
                          </>
                        )
                      })()}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Contract</label>
                    <div className="relative">
                      <select value={selectedContract} onChange={(e) => setSelectedContract(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white pr-8">
                        <option>All contracts</option>
                      </select>
                      <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Service</label>
                    <div className="relative">
                      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white pr-8">
                        <option>All services</option>
                      </select>
                      <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ANY RECIPIENT */}
          <div ref={recipientRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setRecipientOpen((o) => !o)}
            >
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              ANY RECIPIENT
            </Button>
            {recipientOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-72">
                <div className="px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">RECIPIENT FILTERS</span>
                </div>
                <div className="px-4 py-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Postcode</label>
                    <input autoFocus type="text" value={recipientPostcode} onChange={(e) => setRecipientPostcode(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Recipient</label>
                    <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Company</label>
                    <input type="text" value={recipientCompany} onChange={(e) => setRecipientCompany(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Town / City</label>
                    <input type="text" value={recipientTown} onChange={(e) => setRecipientTown(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">County</label>
                    <input type="text" value={recipientCounty} onChange={(e) => setRecipientCounty(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Country</label>
                    <div className="relative">
                      <select value={recipientCountry} onChange={(e) => setRecipientCountry(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white pr-8">
                        <option>Any country</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Netherlands</option>
                        <option>Ireland</option>
                        <option>Australia</option>
                        <option>Canada</option>
                      </select>
                      <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* REFERENCES */}
          <div ref={refsRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground border rounded-sm px-3 py-1.5 h-auto"
              onClick={() => setRefsOpen((o) => !o)}
            >
              <Hash className="h-3.5 w-3.5 text-muted-foreground" />
              REFERENCES
            </Button>
            {refsOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg w-72">
                <div className="px-4 py-3 border-b">
                  <span className="text-xs font-bold text-foreground tracking-wide">REFERENCES</span>
                </div>
                <div className="px-4 py-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      Consignment No(s).
                      <span className="inline-flex items-center justify-center h-4 w-4 rounded-full border border-blue-500 text-blue-500 text-[10px] font-bold cursor-help" title="Key in or paste consignment numbers and press Enter or comma to add.">i</span>
                    </label>
                    <input autoFocus type="text" value={refConsignment} onChange={(e) => setRefConsignment(e.target.value)} placeholder="Key in or paste consignment numbers and press Enter or comma to add." className="w-full border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Collection ID</label>
                    <input type="text" value={refParcel} onChange={(e) => setRefParcel(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Shipment Ref.</label>
                    <input type="text" value={refShipment} onChange={(e) => setRefShipment(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={handleReset} className="text-xs text-foreground hover:text-muted-foreground ml-1">
            Reset
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            JA
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-foreground leading-tight">Jacquie Cadger</p>
            <p className="text-xs text-muted-foreground leading-tight">admin</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Collection ID</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Carrier</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Customer</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Service Code</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Service Desc</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Collection Date</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Consignment No</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Customer Ref</TableHead>
                  <TableHead className="whitespace-nowrap text-right text-muted-foreground">No. Parcels</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Contract No</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground w-10"></TableHead>
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
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => handleViewDetails(collection)}
                        >
                          <MoreVertical className="h-4 w-4" />
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

      <CollectionDetailsModal
        collection={selectedCollection}
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />
      <ShipmentDetailsModal
        open={shipmentModalOpen}
        onOpenChange={setShipmentModalOpen}
        details={shipmentDetails}
      />
    </div>
      )}
    </>
  )
}
