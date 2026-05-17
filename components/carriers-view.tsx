"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { Menu, Pencil, Search, Phone, Mail, Globe, MoreVertical, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type CarrierAccount = {
  label?: string
  phone: string
  email: string
  web: string
  pin?: string
  emailAsterisk?: boolean
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
  pin?: string
  accounts?: CarrierAccount[]
}

type CarrierDetail = {
  id: string
  customer: string
  depot: string
  username: string
}

// Sample carrier details data
const carrierDetails: Record<string, CarrierDetail[]> = {
  "amazon": [
    { id: "1", customer: "All", depot: "", username: "cscarrier@gfsdeliver.com" },
    { id: "2", customer: "Abbott Lyon", depot: "", username: "cscarrier+abbott@gfsdeliver.com" },
    { id: "3", customer: "IForce - Gain The Edge", depot: "", username: "cscarrier+gain@gfsdeliver.com" },
    { id: "4", customer: "IForce - Tailored Athlete", depot: "", username: "cscarrier+tailored@gfsdeliver.com" },
    { id: "5", customer: "IForce - Post Office", depot: "", username: "customercare+gfspostoffice@gfsdeliver.com" },
    { id: "6", customer: "Amazon DG", depot: "", username: "cscarrier+dg@gfsdeliver.com" },
    { id: "7", customer: "Amazon OTP (One Time Passcode)", depot: "", username: "cscarrier+gfsotp@gfsdeliver.com" },
  ],
  "dhl-express": [
    { id: "1", customer: "GFS UK", depot: "Birmingham", username: "gfs_dhl_uk" },
    { id: "2", customer: "NL Redwood", depot: "Amsterdam", username: "nl_redwood" },
    { id: "3", customer: "GFS DE", depot: "Frankfurt", username: "gfs_dhl_de" },
  ],
  "dpd": [
    { id: "1", customer: "GFS Domestic", depot: "Manchester", username: "gfs_dpd_dom" },
    { id: "2", customer: "GFS International", depot: "London", username: "gfs_dpd_int" },
  ],
  "evri": [
    { id: "1", customer: "GFS UK", depot: "Leeds", username: "gfs_evri_uk" },
  ],
  "ups": [
    { id: "1", customer: "GFS UK", depot: "Coventry", username: "gfs_ups_uk" },
    { id: "2", customer: "Omlet Germany", depot: "Cologne", username: "omlet_ups_de" },
  ],
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
    name: "BJS Home Delivery",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bjs-afsgnHhHzQfiKyJhtcibSSjp8jlkgn.jpg",
    logoAlt: "BJS Two-Man Home Delivery",
    logoClass: "w-full object-contain",
    cardBg: "bg-white",
    phone: "01922 645650",
    email: "customerservice@bjshomedelivery.com",
    web: "system.bjshomedelivery.com/",
  },
  {
    id: "collect-plus",
    name: "Collect+",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collect%2B-bl59G3G7qmRyh7KRchGukRABY6XryL.png",
    logoAlt: "Collect+",
    logoClass: "w-11/12 object-contain",
    cardBg: "bg-white",
    phone: "Use ERIN",
    email: "Use ERIN",
    web: "www.collectplus.co.uk/",
  },
  {
    id: "coll-8",
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
    logoClass: "w-11/12 object-contain",
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
    phone: "",
    email: "",
    web: "",
    accounts: [
      {
        label: "Evri Domestic",
        phone: "03444 113019",
        email: "csclientsupport@hermes-europe.co.uk",
        web: "www.hermes-europe.co.uk/webtracking/login.html",
        emailAsterisk: true,
      },
      {
        label: "Evri International",
        phone: "03446 443555",
        email: "IntCSSupport@hermes-europe.co.uk",
        web: "www.hermes-europe.co.uk/webtracking/login.html",
        emailAsterisk: true,
      },
    ],
  },
  {
    id: "fedex",
    name: "FedEx",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fedex-3kITNZnIiD8X5ZzVTQychTytgEmaSg.png",
    logoAlt: "FedEx",
    logoClass: "w-full object-contain",
    cardBg: "bg-transparent",
    phone: "",
    email: "",
    web: "",
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
    phone: "01604 215002",
    email: "clientadmin@panthergroup.co.uk",
    web: "portal.panthergroup.co.uk/account/login",
  },
  {
    id: "royal-mail",
    name: "Royal Mail",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/royal%20mail-Nl4Se5TtrV5bRUfLX9cBGEkypx91lE.png",
    logoAlt: "Royal Mail",
    logoClass: "w-2/5 object-contain",
    cardBg: "bg-transparent",
    phone: "08457 950950",
    email: "",
    web: "www.royalmail.com/track-your-item",
  },
  {
    id: "ocs",
    name: "OCS",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ocs-kzJO8EB02p68Lp93oVYBNJviuE4clK.png",
    logoAlt: "OCS",
    logoClass: "w-5/12 object-contain",
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
    phone: "08451 610015",
    email: "preferredde@ups.com",
    web: "www.ups.com/track?loc=en_GB&requester=ST/trackdetails",
    pin: "6314",
    accounts: [
      {
        label: "UPS Omlet Germany",
        phone: "+49 (0)6966 308031",
        email: "preferredde@ups.com",
        web: "www.ups.com/track?loc=en_GB&requester=ST/trackdetails",
        pin: "3104",
      },
      {
        label: "UPS Claims Only",
        phone: "03457 877877",
        email: "",
        web: "",
        pin: "",
      },
    ],
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
  const [selectedCarrier, setSelectedCarrier] = useState<Carrier | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (carrier: Carrier) => {
    setSelectedCarrier(carrier)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCarrier(null)
  }

  const handleEditDetail = (detailId: string) => {
    // Handle edit logic here
    console.log("[v0] Edit detail:", detailId)
  }

  const handleDeleteDetail = (detailId: string) => {
    // Handle delete logic here
    console.log("[v0] Delete detail:", detailId)
  }

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
            className={`flex flex-col rounded-lg border shadow-sm overflow-hidden w-80 ${carrier.cardBg} relative`}
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
                {carrier.pin && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">PIN:</span>
                    <span className="truncate">{carrier.pin}</span>
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
                        {account.emailAsterisk && (
                          <span className="text-red-500 font-semibold shrink-0">*</span>
                        )}
                      </div>
                    )}
                    {account.web && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3 shrink-0 text-foreground/60" />
                        <span className="truncate">{account.web}</span>
                      </div>
                    )}
                    {account.pin && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">PIN:</span>
                        <span className="truncate">{account.pin}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {carrier.accounts?.some((acc) => acc.emailAsterisk) && (
              <div className="px-4 py-2 text-xs text-muted-foreground bg-card border-t">
                <span className="text-red-500 font-semibold">*</span> Use email only when Webform is not available
              </div>
            )}
            {/* MoreInfo Icon */}
            <button 
              className="absolute bottom-3 right-3 p-1.5 hover:bg-muted rounded-full transition-colors"
              onClick={() => handleOpenModal(carrier)}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
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

      {/* Carrier Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[95vw] max-w-[95vw] w-fit">
          <DialogHeader>
            <DialogTitle>{selectedCarrier?.name} Details</DialogTitle>
          </DialogHeader>
          <div className="border rounded-lg mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap px-4">Customer</TableHead>
                  <TableHead className="whitespace-nowrap px-4">Depot</TableHead>
                  <TableHead className="whitespace-nowrap px-4">Username</TableHead>
                  <TableHead className="whitespace-nowrap text-right px-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCarrier && carrierDetails[selectedCarrier.id]?.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell className="font-medium whitespace-nowrap px-4">{detail.customer}</TableCell>
                    <TableCell className="whitespace-nowrap px-4">{detail.depot}</TableCell>
                    <TableCell className="whitespace-nowrap px-4">{detail.username}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditDetail(detail.id)}
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteDetail(detail.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {selectedCarrier && !carrierDetails[selectedCarrier.id]?.length && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No details available for this carrier
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
