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
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-black px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon-shipping-zyCMlDZbwMIeTHBZca2OQasxwLqn1y.png"
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
        {/* Coll-8 Logistics Card */}
        <div className="flex items-center justify-center w-56 h-28 rounded-lg border bg-white px-6 py-4 shadow-sm">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coll-8-ImRjjcFHWxE9CQeEzOYdezOnSVxUUB.jpeg"
            alt="Coll-8 Logistics"
            className="w-3/4 object-contain"
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
