"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { Menu, Pencil, Search, Phone, Mail, Globe } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type CarrierAccount = {
  label?: string
  phone: string
  email: string
  web: string
}

type Carrier = {
  id: string
  name: string
  logo: string
  logoAlt: string
  logoClass: string
  cardBg: string
  phone: string
  email: string
  web: string
  accounts?: CarrierAccount[]
}

const carriers: Carrier[] = [
  {
    id: "amazon",
    name: "Amazon Shipping",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon-shipping-XlLKPcZ5buPu8bMsmeeTlLc8bg1lG5.png",
    logoAlt: "Amazon Shipping",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "",
    email: "",
    web: "ship.amazon.co.uk",
  },
  {
    id: "bjs",
    name: "BJS Two-Man Home Delivery",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bjs-afsgnHhHzQfiKyJhtcibSSjp8jlkgn.jpg",
    logoAlt: "BJS Two-Man Home Delivery",
    logoClass: "w-full object-contain",
    cardBg: "bg-white",
    phone: "01922 645650",
    email: "customerservice@bjshomedelivery.com",
    web: "system.bjshomedelivery.com/",
  },
  {
    id: "collectplus",
    name: "Collect+",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collect%2B%20logo-TRE19iBHK7EnHIBPY4hJsdHDl08eP5.jpg",
    logoAlt: "Collect+",
    logoClass: "w-full object-contain",
    cardBg: "bg-white",
    phone: "Use ERIN",
    email: "Use ERIN",
    web: "www.collectplus.co.uk/",
  },
  {
    id: "coll8",
    name: "Coll-8 Logistics",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coll-8-ImRjjcFHWxE9CQeEzOYdezOnSVxUUB.jpeg",
    logoAlt: "Coll-8 Logistics",
    logoClass: "w-2/3 object-contain",
    cardBg: "bg-white",
    phone: "",
    email: "customerservices@coll-8.com",
    web: "coll8.drop2shop.ie/tracking",
  },
  {
    id: "dhl-ecommerce",
    name: "DHL eCommerce",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DHL-eCommerce-CQbgFp7GXy6ZHfRMZATr7Y9RODuhQp.png",
    logoAlt: "DHL eCommerce",
    logoClass: "w-full object-contain",
    cardBg: "bg-white",
    phone: "02476 937778",
    email: "gfs_ecsuk@dhl.com",
    web: "track.dhlparcel.co.uk/",
  },
  {
    id: "dhl-express",
    name: "DHL Express",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dhl%20express%20logo-HLXuu7EPHNEwK5wE4OranxixhxFH58.jpg",
    logoAlt: "DHL Express",
    logoClass: "w-full object-contain",
    cardBg: "bg-white",
    phone: "08442 480888",
    email: "premiercustomerservice@dhl.com",
    web: "www.dhl.co.uk/en/express/tracking.html",
    accounts: [
      {
        label: "NL Redwood",
        phone: "Use Email",
        email: "ams.backline@dhl.com",
        web: "https://www.dhl.com/nl",
      },
      {
        label: "Collections",
        phone: "08442 480844",
        email: "",
        web: "",
      },
    ],
  },
  {
    id: "dpd",
    name: "DPD",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPD-logo%20%281%29-79fXEz5ywPAPYB8FPb6zBxOUEg62na.png",
    logoAlt: "DPD",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "",
    email: "",
    web: "",
    accounts: [
      {
        label: "DPD Domestic",
        phone: "01213 364802",
        email: "elite@dpd.co.uk",
        web: "www.dpd.co.uk/umslogon/public/logon.do",
      },
      {
        label: "DPD International",
        phone: "01213 364691 / 0121 6 983783",
        email: "dpd.exports@dpd.co.uk",
        web: "www.dpd.co.uk/umslogon/public/logoff.do",
      },
    ],
  },
  {
    id: "dpd-local",
    name: "DPD Local",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPD-Local-iA4J3IQjAi782SuGgcUthVN44efiet.png",
    logoAlt: "DPD Local",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "01213 364802",
    email: "elite@dpd.co.uk",
    web: "www.dpdlocal.co.uk/umslogon/public/logon.do",
  },
  {
    id: "evri",
    name: "Evri",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Evri%20%281%29-QUyYLdTFBy8PWmD5TsdIHo5nm6mFGo.png",
    logoAlt: "Evri",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "+44 330 808 5456",
    email: "business@evri.com",
    web: "www.evri.com",
  },
  {
    id: "fedex",
    name: "FedEx",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fedex-3kITNZnIiD8X5ZzVTQychTytgEmaSg.png",
    logoAlt: "FedEx",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "+44 345 600 0068",
    email: "customer.support@fedex.com",
    web: "www.fedex.com/en-gb",
  },
  {
    id: "gfs-international",
    name: "GFS International",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GFS-International-MyPuR96FE8DB2c1BI7Nun0GkICs1JC.png",
    logoAlt: "GFS International",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "+44 1527 518 000",
    email: "info@gfsdeliver.com",
    web: "www.gfsdeliver.com",
  },
  {
    id: "panther",
    name: "Panther Logistics",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panther%20logo-xaesEBBowMJPKzTDSqtCNLxhVxbN2Y.jpg",
    logoAlt: "Panther Logistics Experts",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "+44 1 582 516 400",
    email: "enquiries@pantherlogistics.co.uk",
    web: "www.pantherlogistics.co.uk",
  },
  {
    id: "royal-mail",
    name: "Royal Mail",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/royal%20mail-Nl4Se5TtrV5bRUfLX9cBGEkypx91lE.png",
    logoAlt: "Royal Mail",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "+44 345 774 0740",
    email: "business@royalmail.com",
    web: "www.royalmail.com",
  },
  {
    id: "ocs",
    name: "OCS",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ocs-kzJO8EB02p68Lp93oVYBNJviuE4clK.png",
    logoAlt: "OCS",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "+44 1932 837 000",
    email: "enquiries@ocs.com",
    web: "www.ocs.com",
  },
  {
    id: "ups",
    name: "UPS",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UPS-rBYRW409MXRpDyJN3rPMhS1EoWTR7D.png",
    logoAlt: "UPS",
    logoClass: "h-16 object-contain",
    cardBg: "bg-transparent",
    phone: "+44 345 787 7877",
    email: "customer.service@ups.com",
    web: "www.ups.com/gb",
  },
]

const tableCarriers = [
  { id: "1", name: "DPD UK", email: "info@dpdgroup.com", phone: "+44 1902 123456", location: "Wolverhampton, UK" },
  { id: "2", name: "Yodel", email: "business@yodel.co.uk", phone: "+44 1902 654321", location: "Birmingham, UK" },
  { id: "3", name: "Hermes", email: "business@hermesworld.com", phone: "+44 121 333 6666", location: "Solihull, UK" },
  { id: "4", name: "Parcelforce", email: "business@parcelforce.com", phone: "+44 344 800 4466", location: "Various, UK" },
]

export function CarriersView({ onLogOut }: { onLogOut?: () => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const filteredCarriers = tableCarriers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        {carriers.map((carrier) => (
          <div
            key={carrier.id}
            className={`flex flex-col rounded-lg border shadow-sm overflow-hidden w-64 ${carrier.cardBg}`}
          >
            {/* Logo area */}
            <div className="flex items-center justify-center px-6 py-4 h-24">
              <img
                src={carrier.logo}
                alt={carrier.logoAlt}
                className={carrier.logoClass}
              />
            </div>
            {/* Contact details */}
            {(carrier.phone || carrier.email || carrier.web) && (
              <div className="border-t px-4 py-3 space-y-1.5 bg-card">
                {carrier.phone && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3 shrink-0 text-foreground/60" />
                    <span className="truncate">{carrier.phone}</span>
                  </div>
                )}
                {carrier.email && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3 shrink-0 text-foreground/60" />
                    <span className="truncate">{carrier.email}</span>
                  </div>
                )}
                {carrier.web && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 shrink-0 text-foreground/60" />
                    <span className="truncate">{carrier.web}</span>
                  </div>
                )}
              </div>
            )}
            {carrier.accounts && carrier.accounts.length > 0 && (
              <div className="border-t px-4 py-3 space-y-1.5 bg-card">
                {carrier.accounts.map((account, i) => (
                  <div key={i} className={i > 0 ? "pt-2 mt-1 border-t space-y-1.5" : "space-y-1.5"}>
                    {account.label && (
                      <p className="text-xs font-semibold text-foreground">{account.label}</p>
                    )}
                    {account.phone && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 shrink-0 text-foreground/60" />
                        <span className="truncate">{account.phone}</span>
                      </div>
                    )}
                    {account.email && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 shrink-0 text-foreground/60" />
                        <span className="truncate">{account.email}</span>
                      </div>
                    )}
                    {account.web && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3 shrink-0 text-foreground/60" />
                        <span className="truncate">{account.web}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
