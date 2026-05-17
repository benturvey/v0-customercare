"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { Menu, X, Pencil, Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialCarriers = [
  {
    id: "1",
    name: "DPD UK",
    email: "info@dpdgroup.com",
    phone: "+44 1902 123456",
    location: "Wolverhampton, UK",
  },
  {
    id: "2",
    name: "Yodel",
    email: "business@yodel.co.uk",
    phone: "+44 1902 654321",
    location: "Birmingham, UK",
  },
  {
    id: "3",
    name: "Hermes",
    email: "business@hermesworld.com",
    phone: "+44 121 333 6666",
    location: "Solihull, UK",
  },
  {
    id: "4",
    name: "Parcelforce",
    email: "business@parcelforce.com",
    phone: "+44 344 800 4466",
    location: "Various, UK",
  },
]

export function CarriersView({ onLogOut }: { onLogOut?: () => void }) {
  const [carriers, setCarriers] = useState(initialCarriers)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const filteredCarriers = carriers.filter((carrier) =>
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Carriers</span>
        </div>
        <UserDropdownMenu userName="Jacquie Cadger" userRole="admin" userInitials="JA" onLogOut={onLogOut} />
      </div>

      {/* Carrier Cards */}
      <div className="flex flex-wrap gap-4">
        {/* Amazon Shipping Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon-shipping-XlLKPcZ5buPu8bMsmeeTlLc8bg1lG5.png"
            alt="Amazon Shipping"
            className="w-full object-contain"
          />
        </div>
        {/* BJS Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-white px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bjs-afsgnHhHzQfiKyJhtcibSSjp8jlkgn.jpg"
            alt="BJS Two-Man Home Delivery"
            className="w-full object-contain"
          />
        </div>
        {/* Collect+ Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-white px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collect%2B%20logo-TRE19iBHK7EnHIBPY4hJsdHDl08eP5.jpg"
            alt="Collect+"
            className="w-full object-contain"
          />
        </div>
        {/* Coll-8 Logistics Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-white px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coll-8-ImRjjcFHWxE9CQeEzOYdezOnSVxUUB.jpeg"
            alt="Coll-8 Logistics"
            className="w-2/3 object-contain"
          />
        </div>
        {/* DHL eCommerce Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-white px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DHL-eCommerce-CQbgFp7GXy6ZHfRMZATr7Y9RODuhQp.png"
            alt="DHL eCommerce"
            className="w-full object-contain"
          />
        </div>
        {/* DHL Express Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-white px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dhl%20express%20logo-HLXuu7EPHNEwK5wE4OranxixhxFH58.jpg"
            alt="DHL Express"
            className="w-full object-contain"
          />
        </div>
        {/* DPD Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPD-logo%20%281%29-79fXEz5ywPAPYB8FPb6zBxOUEg62na.png"
            alt="DPD"
            className="w-full object-contain"
          />
        </div>
        {/* DPD Local Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPD-Local-iA4J3IQjAi782SuGgcUthVN44efiet.png"
            alt="DPD Local"
            className="w-full object-contain"
          />
        </div>
        {/* Evri Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Evri%20%281%29-QUyYLdTFBy8PWmD5TsdIHo5nm6mFGo.png"
            alt="Evri"
            className="w-full object-contain"
          />
        </div>
        {/* FedEx Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fedex-3kITNZnIiD8X5ZzVTQychTytgEmaSg.png"
            alt="FedEx"
            className="w-full object-contain"
          />
        </div>
        {/* GFS International Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GFS-International-MyPuR96FE8DB2c1BI7Nun0GkICs1JC.png"
            alt="GFS International"
            className="w-full object-contain"
          />
        </div>
        {/* Panther Logistics Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panther%20logo-xaesEBBowMJPKzTDSqtCNLxhVxbN2Y.jpg"
            alt="Panther Logistics Experts"
            className="w-full object-contain"
          />
        </div>
        {/* Royal Mail Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/royal%20mail-Nl4Se5TtrV5bRUfLX9cBGEkypx91lE.png"
            alt="Royal Mail"
            className="w-full object-contain"
          />
        </div>
        {/* OCS Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ocs-kzJO8EB02p68Lp93oVYBNJviuE4clK.png"
            alt="OCS"
            className="w-full object-contain"
          />
        </div>
        {/* UPS Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-transparent px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UPS-rBYRW409MXRpDyJN3rPMhS1EoWTR7D.png"
            alt="UPS"
            className="h-full object-contain"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search carriers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Carriers Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Carrier Name</TableHead>
              <TableHead className="w-1/4">Email</TableHead>
              <TableHead className="w-1/4">Phone</TableHead>
              <TableHead className="w-1/4">Location</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCarriers.map((carrier) => (
              <TableRow key={carrier.id}>
                <TableCell className="font-medium">{carrier.name}</TableCell>
                <TableCell>{carrier.email}</TableCell>
                <TableCell>{carrier.phone}</TableCell>
                <TableCell>{carrier.location}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setEditingId(editingId === carrier.id ? null : carrier.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
