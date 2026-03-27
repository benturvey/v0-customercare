"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

interface CollectionDetailsModalProps {
  collection: Collection | null
  open: boolean
  onClose: () => void
}

export function CollectionDetailsModal({ collection, open, onClose }: CollectionDetailsModalProps) {
  const [collectionAddressOpen, setCollectionAddressOpen] = useState(false)

  if (!collection) return null

  // Sample data for the modal
  const shipmentDetails = {
    consignmentNo: collection.consignmentNo || "15508022322873",
    insertDate: "13/03/2026 15:07:04",
    despatchDate: "13/03/2026",
    customer: collection.customer,
    carrier: collection.carrier,
    service: collection.serviceDescr,
    status: "DELIVERED",
    weight: "500",
    content: "N/A",
    accountNo: "119258",
    contractNo: collection.contractNo,
    contractComment: "DPD B2B Crew Clothing Retail",
    sender: collection.customer,
    instructions: "from store",
    shipmentRef: "consolidation",
    consignmentRef: "",
    trackingNo: "-",
    collectionId: collection.collectionId,
    originDepot: "-",
    destinationDepot: "-",
  }

  const relatedDocuments = {
    invoiceNo: "1374819",
  }

  const deliveryAddress = {
    contact: "store manager",
    contactMobile: "01943662900",
    contactPhone: "",
    company: "crew clothing",
    addressLine1: "22 the grove",
    addressLine2: "-",
    district: "-",
    county: "west yorkshire",
    town: "ilkley",
    country: "GB",
    postcode: "ls29 9eg",
    email: "ilkley@crewclothing.co.uk",
  }

  const pieces = [
    { itemNo: 1, parcelNo: "15502088322873", carrierScanDate: "16/03/2026 10:38", carrierText: "DELIVERED, RECEIVED BY SARAH", swap: "-" },
    { itemNo: 2, parcelNo: "15502088322874", carrierScanDate: "16/03/2026 10:38", carrierText: "DELIVERED, RECEIVED BY SARAH", swap: "-" },
    { itemNo: 3, parcelNo: "15502088322875", carrierScanDate: "16/03/2026 10:38", carrierText: "DELIVERED, RECEIVED BY SARAH", swap: "-" },
    { itemNo: 4, parcelNo: "15502088322876", carrierScanDate: "16/03/2026 10:38", carrierText: "DELIVERED, RECEIVED BY SARAH", swap: "-" },
    { itemNo: 5, parcelNo: "15502088322877", carrierScanDate: "16/03/2026 10:38", carrierText: "DELIVERED, RECEIVED BY SARAH", swap: "-" },
  ]

  const pieceHistory = [
    { date: "16/03/2026 10:38", location: "LEEDS", status: "DELIVERED, RECEIVED BY SARAH", description: "DELIVERED", receivedBy: "Received by GFS: 16/03/2026 10:59" },
    { date: "16/03/2026 07:45", location: "LEEDS", status: "OUT FOR DELIVERY", description: "OUT FOR DELIVERY", receivedBy: "Received by GFS: 16/03/2026 07:56" },
    { date: "16/03/2026 02:23", location: "LEEDS", status: "CONFIRMED AT DEPOT", description: "YOUR PARCEL HAS ARRIVED AT THE DELIVERY DEPOT", receivedBy: "Received by GFS: 16/03/2026 06:02" },
    { date: "16/03/2026 02:17", location: "LEEDS", status: "PARCEL LABEL APPLIED", description: "PARCEL LABEL APPLIED", receivedBy: "Received by GFS: 16/03/2026 06:02" },
    { date: "14/03/2026 03:55", location: "LEEDS", status: "PARCEL LEFT DEPOT", description: "DEPARTED DEPOT", receivedBy: "Received by GFS: 14/03/2026 07:34" },
    { date: "13/03/2026 20:35", location: "HUB 5 - HINCKLEY", status: "CONFIRMED AT HUB", description: "ARRIVED AT HUB", receivedBy: "Received by GFS: 13/03/2026 20:54" },
    { date: "13/03/2026 16:31", location: "BOURNEMOUTH", status: "PARCEL LEFT DEPOT", description: "DEPARTED DEPOT", receivedBy: "Received by GFS: 13/03/2026 16:52" },
    { date: "13/03/2026 16:27", location: "BOURNEMOUTH", status: "PARCEL LABEL APPLIED", description: "PARCEL LABEL APPLIED", receivedBy: "Received by GFS: 13/03/2026 17:36" },
    { date: "13/03/2026 15:05", location: "BOURNEMOUTH", status: "COLLECTED FROM SENDER", description: "COLLECTED", receivedBy: "Received by GFS: 13/03/2026 15:11" },
    { date: "13/03/2026 15:05", location: "BOURNEMOUTH", status: "PARCEL DATA ENTERED", description: "PARCEL DATA RECEIVED - AWAITING CARRIER SCAN", receivedBy: "Received by GFS: 13/03/2026 15:31" },
  ]

  const queries = [
    { no: 1, queryId: "4696387", state: "Open", raisedBy: "Arfeen Mulla", createdDate: "18/03/2026", preferredContactType: "none", telNo: "-", email: "arfeen.mulla@mamasandpapas.com" },
  ]

  const customsItems = [
    { item: 1, productDescription: "-", countryOfManufacture: "-", value: "-", hsCode: "-" },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] sm:max-w-[98vw] w-[98vw] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">View Collection Details</DialogTitle>
        </DialogHeader>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Shipment Details */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Shipment Details</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Consignment No</p>
                  <p className="font-medium">{shipmentDetails.consignmentNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Insert Date</p>
                  <p className="font-medium">{shipmentDetails.insertDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Despatch Date</p>
                  <p className="font-medium">{shipmentDetails.despatchDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{shipmentDetails.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Carrier</p>
                  <p className="font-medium">{shipmentDetails.carrier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service</p>
                  <p className="font-medium">{shipmentDetails.service}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{shipmentDetails.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Weight</p>
                  <p className="font-medium">{shipmentDetails.weight}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Content</p>
                  <p className="font-medium">{shipmentDetails.content}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Account No</p>
                  <p className="font-medium">{shipmentDetails.accountNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contract No</p>
                  <p className="font-medium">{shipmentDetails.contractNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contract Comment</p>
                  <p className="font-medium">{shipmentDetails.contractComment}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sender</p>
                  <p className="font-medium">{shipmentDetails.sender}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Instructions</p>
                  <p className="font-medium">{shipmentDetails.instructions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tracking No</p>
                  <p className="font-medium">{shipmentDetails.trackingNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Shipment Ref</p>
                  <p className="font-medium">{shipmentDetails.shipmentRef}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Consignment Ref</p>
                  <p className="font-medium">{shipmentDetails.consignmentRef}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Destination Depot</p>
                  <p className="font-medium">{shipmentDetails.destinationDepot}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Collection ID</p>
                  <p className="font-medium">{shipmentDetails.collectionId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Origin Depot</p>
                  <p className="font-medium">{shipmentDetails.originDepot}</p>
                </div>
              </div>

              {/* Related Documents */}
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-semibold mb-2">Related documents</h4>
                <div className="text-sm">
                  <p>Claim ID: {relatedDocuments.claimId} &nbsp;&nbsp; Status: <span className="text-blue-600 underline cursor-pointer">{relatedDocuments.status}</span></p>
                  <p>Invoice No: {relatedDocuments.invoiceNo}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium">{deliveryAddress.contact}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact Mobile</p>
                  <p className="font-medium">{deliveryAddress.contactMobile}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact Phone</p>
                  <p className="font-medium">{deliveryAddress.contactPhone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Company</p>
                  <p className="font-medium">{deliveryAddress.company}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Address Line 1</p>
                  <p className="font-medium">{deliveryAddress.addressLine1}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Address Line 2</p>
                  <p className="font-medium">{deliveryAddress.addressLine2}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">District</p>
                  <p className="font-medium">{deliveryAddress.district}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">County</p>
                  <p className="font-medium">{deliveryAddress.county || "-"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Town</p>
                  <p className="font-medium">{deliveryAddress.town}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Country</p>
                  <p className="font-medium">{deliveryAddress.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Postcode</p>
                  <p className="font-medium">{deliveryAddress.postcode}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{deliveryAddress.email}</p>
                </div>
              </div>
            </div>

            {/* Collection Address (Collapsible) */}
            <div className="border border-border rounded-lg">
              <button
                className="w-full p-4 flex items-center justify-between text-left"
                onClick={() => setCollectionAddressOpen(!collectionAddressOpen)}
              >
                <h3 className="text-lg font-semibold">Collection Address</h3>
                {collectionAddressOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {collectionAddressOpen && (
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Contact</p>
                      <p className="font-medium">yael sagar</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contact Mobile</p>
                      <p className="font-medium">-</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contact Phone</p>
                      <p className="font-medium">-</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Company</p>
                      <p className="font-medium">Crew Clothing</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Address Line 1</p>
                      <p className="font-medium">41 High Street</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Address Line 2</p>
                      <p className="font-medium">-</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">District</p>
                      <p className="font-medium">-</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">County</p>
                      <p className="font-medium">Dorset</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Town</p>
                      <p className="font-medium">Wimborne</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Country</p>
                      <p className="font-medium">-</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Postcode</p>
                      <p className="font-medium">BH21 1HR</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">-</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customs Details */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Customs Details</h3>
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">EORI Number</p>
                  <p className="font-medium">-</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ioss Number</p>
                  <p className="font-medium">-</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Consignment Value</p>
                  <p className="font-medium">-</p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Product Description</TableHead>
                    <TableHead>Country of Manufacture</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>HS Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customsItems.map((item) => (
                    <TableRow key={item.item}>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.productDescription}</TableCell>
                      <TableCell>{item.countryOfManufacture}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.hsCode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pieces */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Pieces</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item No</TableHead>
                    <TableHead>Parcel No</TableHead>
                    <TableHead>Carrier Scan Date</TableHead>
                    <TableHead>Carrier Text</TableHead>
                    <TableHead>Swap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pieces.map((piece) => (
                    <TableRow key={piece.itemNo}>
                      <TableCell>{piece.itemNo}</TableCell>
                      <TableCell className="font-mono text-sm">{piece.parcelNo}</TableCell>
                      <TableCell>{piece.carrierScanDate}</TableCell>
                      <TableCell>{piece.carrierText}</TableCell>
                      <TableCell>{piece.swap}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Piece History */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Piece History</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {pieceHistory.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#009eff]" />
                      {index < pieceHistory.length - 1 && <div className="w-0.5 h-full bg-border flex-1 mt-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-muted-foreground">{event.date} - {event.location}</p>
                      <p className="font-semibold">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      {event.receivedBy && <p className="text-xs text-muted-foreground mt-1">{event.receivedBy}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Queries */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Queries</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Query ID</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Raised By</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Preferred Contact Type</TableHead>
                    <TableHead>Tel No</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.map((query) => (
                    <TableRow key={query.no}>
                      <TableCell>{query.no}</TableCell>
                      <TableCell>{query.queryId}</TableCell>
                      <TableCell>{query.state}</TableCell>
                      <TableCell>{query.raisedBy}</TableCell>
                      <TableCell>{query.createdDate}</TableCell>
                      <TableCell>{query.preferredContactType}</TableCell>
                      <TableCell>{query.telNo}</TableCell>
                      <TableCell className="text-sm">{query.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">View Query</Button>
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">Raise Query</Button>
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">Update Query</Button>
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">Resolve Query</Button>
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">Defer</Button>
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">Review</Button>
                <Button size="sm" className="bg-[#009eff] hover:bg-[#007ecc] text-white">Delegate</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
