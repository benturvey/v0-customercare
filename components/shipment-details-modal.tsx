"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, User, Truck, Zap, Hash, CalendarDays, Activity, Clock, PenLine, List, GitCommitHorizontal } from "lucide-react"
import { useState } from "react"
import type { ShipmentDetails } from "@/types/shipment"

interface ShipmentDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  details: ShipmentDetails | null
}

export function ShipmentDetailsModal({
  open,
  onOpenChange,
  details,
}: ShipmentDetailsModalProps) {
  const [collectionAddressOpen, setCollectionAddressOpen] = useState(false)
  const [collectionAddressSheetOpen, setCollectionAddressSheetOpen] = useState(false)
  const [relatedDocumentsSheetOpen, setRelatedDocumentsSheetOpen] = useState(false)
  const [customsDetailsSheetOpen, setCustomsDetailsSheetOpen] = useState(false)
  const [queryHistoryOpen, setQueryHistoryOpen] = useState(false)
  const [customerContactModalOpen, setCustomerContactModalOpen] = useState(false)
  const [parcelsView, setParcelsView] = useState<"parcels" | "tracking">("parcels")

  // Customer contact details
  const customerContactDetails = {
    contactName: "",
    contactPhone: "01484 438394",
    contactEmails: ["deliveries@mamasandpapas.com"],
    address: "COLNE BRIDGE ROAD, HUDDERSFIELD, WEST YORKSHIRE, HD5 0RH",
  }

  if (!details) return null

  const detailRows = [
    [
      { label: "Insert Date", value: details.insertDate },
      { label: "Weight", value: details.weight.toString() },
      { label: "Content", value: details.content },
    ],
    [
      { label: "Account No", value: details.accountNo },
      { label: "Contract No", value: details.contractNo },
      { label: "Contract Comment", value: details.contractComment },
    ],
    [
      { label: "Sender", value: details.sender },
      { label: "Instructions", value: details.instructions || "-" },
    ],
    [
      { label: "Consignment Ref", value: details.consignmentRef || "-" },
      { label: "Origin Depot", value: details.originDepot },
      { label: "Destination Depot", value: details.destinationDepot },
    ],
    [
      { label: "Collection ID", value: details.collectionId || "-" },
      { label: "Tracking No(s)", value: details.trackingNo || "-" },
    ],
  ]

  const deliveryAddressRows = details.deliveryAddress ? [
    [
      { label: "Contact", value: details.deliveryAddress.contact },
      { label: "Contact Mobile", value: details.deliveryAddress.contactMobile || "-" },
      { label: "Contact Phone", value: details.deliveryAddress.contactPhone },
    ],
    [
      { label: "Contact Email", value: details.deliveryAddress.email },
    ],
    [
      { label: "Address Line 1", value: details.deliveryAddress.addressLine1 },
      { label: "Address Line 2", value: details.deliveryAddress.addressLine2 || "-" },
      { label: "Town", value: details.deliveryAddress.town },
    ],
    [
      { label: "County", value: details.deliveryAddress.county },
      { label: "Postcode", value: details.deliveryAddress.postcode },
    ],
  ] : []

  const collectionAddressRows = details.collectionAddress ? [
    [
      { label: "Contact", value: details.collectionAddress.contact || "-" },
      { label: "Contact Mobile", value: details.collectionAddress.contactMobile || "-" },
      { label: "Contact Phone", value: details.collectionAddress.contactPhone || "-" },
      { label: "Company", value: details.collectionAddress.company || "-" },
    ],
    [
      { label: "Address Line 1", value: details.collectionAddress.addressLine1 || "-" },
      { label: "Address Line 2", value: details.collectionAddress.addressLine2 || "-" },
      { label: "District", value: details.collectionAddress.district || "-" },
      { label: "County", value: details.collectionAddress.county || "-" },
    ],
    [
      { label: "Town", value: details.collectionAddress.town || "-" },
      { label: "Country", value: details.collectionAddress.country || "-" },
      { label: "Postcode", value: details.collectionAddress.postcode || "-" },
      { label: "Email", value: details.collectionAddress.email || "-" },
    ],
  ] : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[98vw] !max-w-[98vw] !h-[95vh] !max-h-[95vh] !translate-x-[-50%] !translate-y-[-50%] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1e3a5f]">
            Consignment #15500306013410
            <div className="text-lg font-semibold text-foreground mt-2">MAMAS & PAPAS</div>
          </DialogTitle>
        </DialogHeader>

        {/* Info strip — matches ticket detail page style */}
        <div className="grid grid-cols-7 gap-0 rounded-lg border border-border bg-muted/30 mb-4">
          {[
            { icon: Truck,        label: "Carrier",        value: "DPD" },
            { icon: Zap,          label: "Service",        value: "NEXT DAY" },
            { icon: Hash,         label: "Ship Ref",       value: "67020805" },
            { icon: CalendarDays, label: "Despatch Date",  value: "14/03/2026" },
            { icon: Activity,     label: "Status",         value: "PARCEL LABEL APPLIED", isHighlight: true },
            { icon: Clock,        label: "ETA",            value: "—" },
            { icon: PenLine,      label: "Sign By",        value: "—" },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`flex items-center gap-2 py-3 pl-4 ${idx < 6 ? "border-r border-border pr-4" : "pr-4"}`}
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-[#009eff]" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.isHighlight ? "text-amber-600" : "text-[#1e3a5f]"}`}>{item.value}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-lg font-medium">Shipment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
{detailRows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="grid grid-cols-3 gap-4">
                                      {row.map((item) => (
                                        <div key={item.label} className="flex flex-col gap-1">
                                          <span className="text-sm font-medium text-muted-foreground">
                                            {item.label}
                                          </span>
                                          {item.label === "Customer" ? (
                                            <div className="flex items-center gap-2">
                                              <span className="text-sm whitespace-nowrap">
                                                {item.value}
                                              </span>
                                              <button
                                                onClick={() => setCustomerContactModalOpen(true)}
                                                className="p-1 rounded hover:bg-muted transition-colors"
                                                title="View Customer Contact Details"
                                              >
                                                <User className="h-4 w-4 text-[#009eff]" />
                                              </button>
                                            </div>
                                          ) : (
                                            <span className="text-sm whitespace-nowrap">
                                              {item.value}
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ))}

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Related documents</h4>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Claim ID:</span> 9051562 <span className="text-muted-foreground ml-4">Status:</span> Claim Incomplete
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Invoice No:</span> 1374819
                      </div>
                    </div>
                  </div>
                </div>
                </CardContent>
              </Card>

            {(details.pieces && details.pieces.length > 0) || (details.pieceHistory && details.pieceHistory.length > 0) ? (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Parcels & Tracking</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">View as:</span>
                      <div className="flex rounded-md border border-border overflow-hidden">
                        <button
                          onClick={() => setParcelsView("parcels")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                            parcelsView === "parcels"
                              ? "bg-[#1e3a5f] text-white"
                              : "bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          <List className="h-3.5 w-3.5" />
                          Parcels
                        </button>
                        <button
                          onClick={() => setParcelsView("tracking")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border-l border-border ${
                            parcelsView === "tracking"
                              ? "bg-[#1e3a5f] text-white"
                              : "bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          <GitCommitHorizontal className="h-3.5 w-3.5" />
                          Tracking
                        </button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {parcelsView === "parcels" && details.pieces && details.pieces.length > 0 && (
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="whitespace-nowrap">Parcel No</TableHead>
                            <TableHead className="whitespace-nowrap">Tracking No</TableHead>
                            <TableHead className="whitespace-nowrap">Latest Carrier Update</TableHead>
                            <TableHead className="whitespace-nowrap">Carrier Scan Text</TableHead>
                            <TableHead className="whitespace-nowrap">Swap</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {details.pieces.map((piece) => (
                            <TableRow key={piece.itemNo}>
                              <TableCell>{piece.itemNo}</TableCell>
                              <TableCell className="font-mono text-sm">{piece.parcelNo}</TableCell>
                              <TableCell>{piece.carrierScanDate}</TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  <span>{piece.carrierText}</span>
                                  <span className="text-xs font-semibold text-blue-600">PARCEL LABEL APPLIED</span>
                                </div>
                              </TableCell>
                              <TableCell>{piece.swap || "-"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {parcelsView === "tracking" && details.pieceHistory && details.pieceHistory.length > 0 && (
                    <div className={`relative ${details.pieceHistory.length > 5 ? "max-h-[400px] overflow-y-auto pr-2" : ""}`}>
                      {details.pieceHistory.map((history, index) => (
                        <div key={index} className="flex gap-4 pb-6 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#98d9ff] shrink-0" />
                            {index < details.pieceHistory!.length - 1 && (
                              <div className="w-0.5 h-full bg-border mt-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{history.carrierScanDate}</span>
                              {history.scanDepot && <span>· {history.scanDepot}</span>}
                              {history.scanDeptName && <span>· {history.scanDeptName}</span>}
                            </div>
                            <div className="font-medium text-sm mt-1">{history.carrierScanText}</div>
                            <div className="text-sm text-blue-600 mt-0.5">{history.gfsScanText}</div>
                            <div className="text-xs text-muted-foreground mt-1">Received by GFS: {history.receivedByGfs}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {parcelsView === "tracking" && (!details.pieceHistory || details.pieceHistory.length === 0) && (
                    <div className="text-center py-4 text-muted-foreground">
                      No tracking history available.
                    </div>
                  )}

                  {parcelsView === "parcels" && (!details.pieces || details.pieces.length === 0) && (
                    <div className="text-center py-4 text-muted-foreground">
                      No parcels available.
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            {details.deliveryAddress && (
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-lg font-medium">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    {deliveryAddressRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-3 gap-4">
                        {row.map((item) => (
                          <div key={item.label} className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                            <span className="text-sm whitespace-nowrap">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => setCollectionAddressSheetOpen(true)}
              >
                View Collection Address
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => setCustomsDetailsSheetOpen(true)}
              >
                View Customs Details
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => setRelatedDocumentsSheetOpen(true)}
              >
                View Related Documents
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => {
                  const queriesSection = document.getElementById('queries-section');
                  queriesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Queries
              </Button>
            </div>

            {details.collectionAddress && (
              <Collapsible open={collectionAddressOpen} onOpenChange={setCollectionAddressOpen}>
                <Card>
                  <CardHeader className="pb-1">
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full text-left">
                        <CardTitle className="text-lg font-medium">Collection Address</CardTitle>
                        <ChevronDown className={`h-5 w-5 transition-transform ${collectionAddressOpen ? "rotate-180" : ""}`} />
                      </button>
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {collectionAddressRows.map((row, rowIndex) => (
                          <div key={rowIndex} className="grid grid-cols-4 gap-4">
                            {row.map((item) => (
                              <div key={item.label} className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                                <span className="text-sm whitespace-nowrap">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )}

            {details.customsDetails && (
              <Card id="customs-details-section">
                <CardHeader className="pb-1">
                  <CardTitle className="text-lg font-medium">Customs Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">EORI Number</span>
                      <span className="text-sm whitespace-nowrap">{details.customsDetails.eoriNumber || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">IOSS Number</span>
                      <span className="text-sm whitespace-nowrap">{details.customsDetails.iossNumber || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">Consignment Value</span>
                      <span className="text-sm whitespace-nowrap">{details.customsDetails.consignmentValue || "-"}</span>
                    </div>
                  </div>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">Item</TableHead>
                          <TableHead className="whitespace-nowrap">Product Description</TableHead>
                          <TableHead className="whitespace-nowrap">Country of Manufacture</TableHead>
                          <TableHead className="whitespace-nowrap">Value</TableHead>
                          <TableHead className="whitespace-nowrap">HS Code</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {details.customsDetails.items && details.customsDetails.items.length > 0 ? (
                          details.customsDetails.items.map((item) => (
                            <TableRow key={item.item}>
                              <TableCell>{item.item}</TableCell>
                              <TableCell>{item.productDescription || "-"}</TableCell>
                              <TableCell>{item.countryOfManufacture || "-"}</TableCell>
                              <TableCell>{item.value || "-"}</TableCell>
                              <TableCell>{item.hsCode || "-"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              No customs items found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card id="queries-section">
              <CardHeader className="pb-1">
                <CardTitle className="text-lg font-medium">Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">No</TableHead>
                        <TableHead className="whitespace-nowrap">Query ID</TableHead>
                        <TableHead className="whitespace-nowrap">State</TableHead>
                        <TableHead className="whitespace-nowrap">Raised By</TableHead>
                        <TableHead className="whitespace-nowrap">Created Date</TableHead>
                        <TableHead className="whitespace-nowrap">Preferred Contact Type</TableHead>
                        <TableHead className="whitespace-nowrap">Tel No</TableHead>
                        <TableHead className="whitespace-nowrap">Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {details.queries && details.queries.length > 0 ? (
                        details.queries.map((query) => (
                          <TableRow key={query.no}>
                            <TableCell>{query.no}</TableCell>
                            <TableCell>{query.queryId || "-"}</TableCell>
                            <TableCell>{query.state || "-"}</TableCell>
                            <TableCell>{query.raisedBy || "-"}</TableCell>
                            <TableCell>{query.createdDate || "-"}</TableCell>
                            <TableCell>{query.preferredContactType || "-"}</TableCell>
                            <TableCell>{query.telNo || "-"}</TableCell>
                            <TableCell>{query.email || "-"}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                            No queries found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => setQueryHistoryOpen(true)}>View Query</Button>
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => alert("Raise Query functionality")}>Raise Query</Button>
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => alert("Update Query functionality")}>Update Query</Button>
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => alert("Resolve Query functionality")}>Resolve Query</Button>
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => alert("Defer functionality")}>Defer</Button>
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => alert("Review functionality")}>Review</Button>
                  <Button className="bg-[#009eff] hover:bg-[#007ecc] text-white" onClick={() => alert("Delegate functionality")}>Delegate</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>

      <Sheet open={collectionAddressSheetOpen} onOpenChange={setCollectionAddressSheetOpen}>
        <SheetContent className="w-[600px] sm:w-[700px] sm:max-w-[700px] px-8">
          <SheetHeader className="pb-2">
            <button
              onClick={() => setCollectionAddressSheetOpen(false)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 -ml-1"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
              Back to Shipment
            </button>
            <SheetTitle className="text-xl font-semibold">Collection Address</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-x-6 gap-y-8">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Contact</span>
                <span className="text-sm">{details.collectionAddress?.contact || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Contact Mobile</span>
                <span className="text-sm">{details.collectionAddress?.contactMobile || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Contact Phone</span>
                <span className="text-sm">{details.collectionAddress?.contactPhone || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Company</span>
                <span className="text-sm">{details.collectionAddress?.company || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Address Line 1</span>
                <span className="text-sm">{details.collectionAddress?.addressLine1 || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Address Line 2</span>
                <span className="text-sm">{details.collectionAddress?.addressLine2 || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">District</span>
                <span className="text-sm">{details.collectionAddress?.district || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">County</span>
                <span className="text-sm">{details.collectionAddress?.county || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Town</span>
                <span className="text-sm">{details.collectionAddress?.town || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Country</span>
                <span className="text-sm">{details.collectionAddress?.country || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Postcode</span>
                <span className="text-sm">{details.collectionAddress?.postcode || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Email</span>
                <span className="text-sm">{details.collectionAddress?.email || "-"}</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={relatedDocumentsSheetOpen} onOpenChange={setRelatedDocumentsSheetOpen}>
        <SheetContent className="w-[500px] sm:w-[550px] sm:max-w-[550px] px-8">
          <SheetHeader className="pb-2">
            <button
              onClick={() => setRelatedDocumentsSheetOpen(false)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 -ml-1"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
              Back to Shipment
            </button>
            <SheetTitle className="text-xl font-semibold">Related Documents</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Claim ID</span>
                <span className="text-sm">9051562</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Status</span>
                <span className="text-sm">Claim incomplete</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Invoice No</span>
                <span className="text-sm">1374819</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={customsDetailsSheetOpen} onOpenChange={setCustomsDetailsSheetOpen}>
        <SheetContent className="w-[700px] sm:w-[800px] sm:max-w-[800px] px-8">
          <SheetHeader className="pb-2">
            <button
              onClick={() => setCustomsDetailsSheetOpen(false)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 -ml-1"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
              Back to Shipment
            </button>
            <SheetTitle className="text-xl font-semibold">Customs Details</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">EORI Number</span>
                <span className="text-sm">{details.customsDetails?.eoriNumber || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">IOSS Number</span>
                <span className="text-sm">{details.customsDetails?.iossNumber || "-"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#1e3a5f]">Consignment Value</span>
                <span className="text-sm">{details.customsDetails?.consignmentValue || "-"}</span>
              </div>
            </div>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Item</TableHead>
                    <TableHead className="whitespace-nowrap">Product Description</TableHead>
                    <TableHead className="whitespace-nowrap">Country of Manufacture</TableHead>
                    <TableHead className="whitespace-nowrap">Value</TableHead>
                    <TableHead className="whitespace-nowrap">HS Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.customsDetails?.items && details.customsDetails.items.length > 0 ? (
                    details.customsDetails.items.map((item) => (
                      <TableRow key={item.item}>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.productDescription || "-"}</TableCell>
                        <TableCell>{item.countryOfManufacture || "-"}</TableCell>
                        <TableCell>{item.value || "-"}</TableCell>
                        <TableCell>{item.hsCode || "-"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No customs items found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={queryHistoryOpen} onOpenChange={setQueryHistoryOpen}>
        <SheetContent className="w-[600px] sm:w-[800px] sm:max-w-[800px]">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">Query History</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Message Time</TableHead>
                    <TableHead className="whitespace-nowrap">Message Text</TableHead>
                    <TableHead className="whitespace-nowrap">Source</TableHead>
                    <TableHead className="whitespace-nowrap">Life Cycle</TableHead>
                    <TableHead className="whitespace-nowrap">User Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.queryHistory && details.queryHistory.length > 0 ? (
                    details.queryHistory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap">{item.messageTime}</TableCell>
                        <TableCell>{item.messageText}</TableCell>
                        <TableCell>{item.source}</TableCell>
                        <TableCell>{item.lifeCycle}</TableCell>
                        <TableCell>{item.userName}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No query history found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Customer Contact Details Modal */}
      <Dialog open={customerContactModalOpen} onOpenChange={setCustomerContactModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Customer Contact Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Contact Name</p>
              <p className="font-medium">{customerContactDetails.contactName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Phone</p>
              <p className="font-medium">{customerContactDetails.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Email</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {customerContactDetails.contactEmails.map((email, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-sm font-medium"
                  >
                    {email}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{customerContactDetails.address}</p>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setCustomerContactModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}
