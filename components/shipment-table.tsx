"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { ShipmentDetailsModal } from "@/components/shipment-details-modal"
import type { Shipment, ShipmentDetails } from "@/types/shipment"

interface ShipmentTableProps {
  shipments: Shipment[]
}

// Sample shipment details data - in a real app this would come from an API
const shipmentDetailsData: Record<string, ShipmentDetails> = {
  "15500306013410": {
    consignmentNo: "15500306013410",
    insertDate: "16/03/2026 15:56:00",
    despatchDate: "14/03/2026",
    customer: "MAMAS & PAPAS",
    carrier: "DPD",
    status: "PARCEL LABEL APPLIED",
    service: "NEXT DAY DELIVERY",
    weight: 3.56,
    content: "Baby Goods",
    accountNo: "423596",
    contractNo: "0306",
    contractComment: "DPD Snuzkot",
    sender: "MAMAS AND PAPAS LTD",
    instructions: "",
    shipmentRef: "67020805",
    consignmentRef: "67020805",
    trackingNo: "",
    collectionId: "",
    originDepot: "",
    destinationDepot: "",
    deliveryAddress: {
      contact: "LAURA STEELE",
      contactMobile: "+447935387279",
      contactPhone: "+447935387279",
      company: "LAURA STEELE",
      addressLine1: "17 SHADEWOOD CRESCENT",
      addressLine2: "",
      district: "",
      county: "",
      town: "GRAPPENHALL",
      country: "GB",
      postcode: "WA4 2SN",
      email: "LAURASTEELE@LIVE.CO.UK",
    },
    collectionAddress: {
      contact: "",
      contactMobile: "",
      contactPhone: "",
      company: "",
      addressLine1: "",
      addressLine2: "",
      district: "",
      county: "",
      town: "",
      country: "",
      postcode: "",
      email: "",
    },
    pieces: [
      {
        itemNo: 1,
        parcelNo: "15500306013410",
        carrierScanDate: "19/03/2026 04:37",
        carrierText: "PARCEL LABEL APPLIED",
        swap: "",
      },
      {
        itemNo: 2,
        parcelNo: "15500306013411",
        carrierScanDate: "19/03/2026 04:37",
        carrierText: "PARCEL LABEL APPLIED",
        swap: "",
      },
    ],
    pieceHistory: [
      {
        carrierScanDate: "19/03/2026 04:37",
        carrierScanText: "PARCEL LABEL APPLIED",
        gfsScanText: "PARCEL LABEL APPLIED",
        receivedByGfs: "19/03/2026 05:04",
        scanDepot: "",
        scanDeptName: "WARRINGTON",
      },
      {
        carrierScanDate: "19/03/2026 04:37",
        carrierScanText: "PARCEL RECONSIGNED FOR ONWARD JOURNEY (RETURN TO CONSIGNOR)",
        gfsScanText: "RETURNED TO SENDER",
        receivedByGfs: "19/03/2026 05:03",
        scanDepot: "",
        scanDeptName: "WARRINGTON",
      },
      {
        carrierScanDate: "19/03/2026 00:48",
        carrierScanText: "CONFIRMED AT DEPOT",
        gfsScanText: "YOUR PARCEL HAS ARRIVED AT THE DELIVERY DEPOT",
        receivedByGfs: "19/03/2026 05:03",
        scanDepot: "",
        scanDeptName: "WARRINGTON",
      },
      {
        carrierScanDate: "18/03/2026 19:44",
        carrierScanText: "CONFIRMED AT HUB",
        gfsScanText: "ARRIVED AT HUB",
        receivedByGfs: "18/03/2026 20:16",
        scanDepot: "",
        scanDeptName: "HUB 3 - BHAM",
      },
      {
        carrierScanDate: "18/03/2026 11:37",
        carrierScanText: "RECONSIGN DATA RECEIVED",
        gfsScanText: "RETURN TO SENDER - IN PROCESS",
        receivedByGfs: "19/03/2026 05:04",
        scanDepot: "",
        scanDeptName: "WARRINGTON",
      },
      {
        carrierScanDate: "18/03/2026 11:37",
        carrierScanText: "RETURN TO CONSIGNOR HAS BEEN REQUESTED",
        gfsScanText: "STOP AND RETURN REQUESTED",
        receivedByGfs: "18/03/2026 11:50",
        scanDepot: "",
        scanDeptName: "DPD CUSTOMER",
      },
      {
        carrierScanDate: "16/03/2026 15:56",
        carrierScanText: "CUSTOMER DATA RECEIVED",
        gfsScanText: "PARCEL DATA RECEIVED - AWAITING CARRIER SCAN",
        receivedByGfs: "16/03/2026 16:21",
        scanDepot: "",
        scanDeptName: "LEEDS",
      },
    ],
    queries: [
      {
        no: 1,
        queryId: "4696387",
        state: "Open",
        raisedBy: "Arfeen Mulla",
        createdDate: "18/03/2026",
        preferredContactType: "none",
        telNo: "",
        email: "arfeen.mulla@mamasandpapas.com",
      },
    ],
    queryHistory: [
      {
        messageTime: "19/03/2026 06:04",
        messageText: "Returned to sender.-Administrator Account",
        source: "CS Agent",
        lifeCycle: "Reopening",
        userName: "ADMINISTRATOR",
      },
    ],
    customsDetails: {
      eoriNumber: "",
      iossNumber: "",
      consignmentValue: 0,
      items: [
        {
          item: 1,
          productDescription: "",
          countryOfManufacture: "",
          value: 0,
          hsCode: "",
        },
      ],
    },
  },
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState<ShipmentDetails | null>(null)

  const formatDate = (dateString: string) => {
    // Date is already in DD/MM/YYYY format, just return it
    if (dateString.includes("/")) {
      return dateString
    }
    // Fallback for other formats
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getScanTextVariant = (scanText: string) => {
    const lowerText = scanText.toLowerCase()
    if (lowerText.includes("delivered")) return "default"
    if (lowerText.includes("exception")) return "destructive"
    if (lowerText.includes("transit") || lowerText.includes("delivery")) return "secondary"
    return "outline"
  }

  const handleViewDetails = (consignmentNo: string) => {
    const details = shipmentDetailsData[consignmentNo]
    if (details) {
      setSelectedDetails(details)
      setModalOpen(true)
    } else {
      alert(`No detailed information available for shipment: ${consignmentNo}`)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            Results
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({shipments.length} shipments found)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Sender</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Despatch Date</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Carrier</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Service</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Consignment No</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Ship Ref</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Scan Text</TableHead>
                  <TableHead className="whitespace-nowrap text-right text-muted-foreground">No. Parcels</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Country</TableHead>
                  <TableHead className="whitespace-nowrap text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No shipments found. Try adjusting your search filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.sender}</TableCell>
                      <TableCell>{formatDate(shipment.despatchDate)}</TableCell>
                      <TableCell>{shipment.carrier}</TableCell>
                      <TableCell>{shipment.service}</TableCell>
                      <TableCell className="font-mono text-sm">{shipment.consignmentNo}</TableCell>
                      <TableCell className="font-mono text-sm">{shipment.shipRef}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={getScanTextVariant(shipment.scanText)}
                            className={["2", "3", "4", "5"].includes(shipment.id) ? "bg-[#3bc693] text-white hover:bg-[#3bc693]" : ""}
                          >
                            {shipment.scanText}
                          </Badge>
                          {shipment.isException && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#ff7353] text-white">
                              EXCEPTION
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{shipment.packs}</TableCell>
                      <TableCell>{shipment.country}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleViewDetails(shipment.consignmentNo)}
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
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

      <ShipmentDetailsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        details={selectedDetails}
      />
    </>
  )
}
