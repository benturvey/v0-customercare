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
  [key: string]: string
}

type CarrierColumnConfig = {
  key: string
  label: string
}

const defaultColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
]

const amazonColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
]

const gfsInternationalColumns: CarrierColumnConfig[] = [
  { key: "carrier", label: "Carrier" },
  { key: "fmNumberStart", label: "FM Number Start" },
  { key: "phone", label: "Phone No" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
  { key: "username", label: "Username" },
]

const internationalWebsitesColumns: CarrierColumnConfig[] = [
  { key: "carrier", label: "Carrier" },
  { key: "country", label: "Country" },
  { key: "website", label: "Website" },
  { key: "notes", label: "Notes" },
]

const dxColumns: CarrierColumnConfig[] = [
  { key: "depot", label: "Depot" },
  { key: "depotNo", label: "Depot No" },
  { key: "contactNumber", label: "Contact Number" },
  { key: "email", label: "Email" },
  { key: "trackingSite", label: "Tracking Site" },
  { key: "escalationContact", label: "Escalation Contact" },
]

const bjsColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
]

const dhlEcommerceColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
]

const dpdColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
]

const dpdLocalColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
]

const evriColumns: CarrierColumnConfig[] = [
  { key: "customer", label: "Customer" },
  { key: "depot", label: "Depot" },
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
]

const carrierColumns: Record<string, CarrierColumnConfig[]> = {
  "amazon": amazonColumns,
  "gfs-international": gfsInternationalColumns,
  "international-websites": internationalWebsitesColumns,
  "dx": dxColumns,
  "bjs": bjsColumns,
  "dhl-ecommerce": dhlEcommerceColumns,
  "dpd": dpdColumns,
  "dpd-local": dpdLocalColumns,
  "evri": evriColumns,
}

// Sample carrier details data
const carrierDetails: Record<string, CarrierDetail[]> = {
  "amazon": [
    { id: "1", customer: "All", depot: "", username: "cscarrier@gfsdeliver.com", password: "Amazon123!" },
    { id: "2", customer: "Abbott Lyon", depot: "", username: "cscarrier+abbott@gfsdeliver.com", password: "Amazon123!" },
    { id: "3", customer: "IForce - Gain The Edge", depot: "", username: "cscarrier+gain@gfsdeliver.com", password: "Amazon123!" },
    { id: "4", customer: "IForce - Tailored Athlete", depot: "", username: "cscarrier+tailored@gfsdeliver.com", password: "Amazon123!" },
    { id: "5", customer: "IForce - Post Office", depot: "", username: "customercare+gfspostoffice@gfsdeliver.com", password: "Amazon123!" },
    { id: "6", customer: "Amazon DG", depot: "", username: "cscarrier+dg@gfsdeliver.com", password: "Amazon123!" },
    { id: "7", customer: "Amazon OTP (One Time Passcode)", depot: "", username: "cscarrier+gfsotp@gfsdeliver.com", password: "Amazon123!" },
  ],
  "gfs-international": [
    { id: "1", carrier: "APG", fmNumberStart: "", phone: "02039 620242", email: "generalsupport@apgecommerce.com", website: "www.apgecommerce.com", username: "" },
    { id: "2", carrier: "Deutschepost", fmNumberStart: "LY or RS", phone: "02087 503340", email: "mail.uk@deutschepost.com", website: "mail.uk@deutschepost.com", username: "cscarrier@gfsdeliver.com" },
    { id: "3", carrier: "Deutschepost", fmNumberStart: "", phone: "", email: "", website: "Alternate: www.deutschepost.de/sendung/simpleQueryResult.html", username: "" },
    { id: "4", carrier: "Deutschepost", fmNumberStart: "", phone: "", email: "", website: "Alternate: www.dhl.com/us-en/home/tracking/tracking-ecommerce.html", username: "" },
    { id: "5", carrier: "DPD Core DE", fmNumberStart: "0150", phone: "", email: "info@depot150.dpd.de", website: "tracking.dpd.de/status/en_US/parcel/", username: "gfsdpdmax1" },
    { id: "6", carrier: "DPD Core DE", fmNumberStart: "", phone: "", email: "", website: "Alternate: portal.dpd.de/home", username: "Global031" },
    { id: "7", carrier: "DPD Core DE", fmNumberStart: "", phone: "", email: "", website: "Alternate: business.dpd.de/home.aspx", username: "Global001" },
    { id: "8", carrier: "DPD Core NL", fmNumberStart: "051 or 052", phone: "", email: "customerservice522specials@dpd.nl", website: "tracking.dpd.de/status/en_US/parcel/", username: "gfsdpdmax1" },
    { id: "9", carrier: "DPD Core NL", fmNumberStart: "", phone: "", email: "Keyaccountservice@dpd.nl", website: "Alternate: insights.dpd.nl/login", username: "admin@globalfs01" },
    { id: "10", carrier: "Landmark Global", fmNumberStart: "LTN", phone: "02070 421300", email: "clientservicesuk@landmarkglobal-group.com", website: "track.landmarkglobal.com/", username: "GFS_CS" },
    { id: "11", carrier: "RPX/Linex", fmNumberStart: "", phone: "", email: "cs@linexsolutions.co.uk", website: "www.linexsolutions.com", username: "" },
    { id: "12", carrier: "Skynet", fmNumberStart: "53", phone: "", email: "manchester@deltec-international.com", website: "www.skynetworldwide.com/services/track-and-trace", username: "" },
    { id: "13", carrier: "Spring", fmNumberStart: "", phone: "02085 741414", email: "custserv.glm@spring-gds.com", website: "www.spring-gds.com/", username: "" },
    { id: "14", carrier: "Spring", fmNumberStart: "", phone: "", email: "", website: "Alternate: springtracking.com/", username: "" },
    { id: "15", carrier: "Exelot", fmNumberStart: "", phone: "", email: "ukhelp@exelot.com", website: "public.exelot.com/tracking", username: "" },
    { id: "16", carrier: "OCS", fmNumberStart: "", phone: "02076 403900", email: "customer.services@ocsworldwide.co.uk", website: "www.ocsworldwide.co.uk/", username: "" },
  ],
  "dhl-express": [
    { id: "1", customer: "GFS UK", depot: "Birmingham", username: "gfs_dhl_uk" },
    { id: "2", customer: "NL Redwood", depot: "Amsterdam", username: "nl_redwood" },
    { id: "3", customer: "GFS DE", depot: "Frankfurt", username: "gfs_dhl_de" },
  ],
  "dpd": [
    { id: "1", customer: "All", depot: "", username: "gfshypercom", password: "Glo0gfs-22" },
  ],
  "evri": [
    { id: "1", section: "domestic", customer: "All", depot: "", username: "gfs1", password: "Re1JJ1wL4GnGvP6g4uCj" },
    { id: "2", section: "domestic", customer: "Alternate log in", depot: "", username: "gfs2", password: "9VbPeXpBvuNAauGBTfqG" },
    { id: "3", section: "domestic", customer: "Alternate log in", depot: "", username: "gfs3", password: "73YCmXJeYoAJnVHCKZ59" },
    { id: "4", section: "domestic", customer: "Alternate log in", depot: "", username: "gfs4", password: "4aYcJ59mnwGHRb49JhWq" },
    { id: "5", section: "domestic", customer: "Alternate log in", depot: "", username: "gfs5", password: "jMPYg7RWKwCmZK6QPgwA" },
    { id: "6", section: "international", customer: "All", depot: "", username: "glo001s", password: "glo001s" },
  ],
  "ups": [
    { id: "1", customer: "GFS UK", depot: "Coventry", username: "gfs_ups_uk" },
    { id: "2", customer: "Omlet Germany", depot: "Cologne", username: "omlet_ups_de" },
  ],
  "dx": [
    { id: "1",  depot: "DX Nottingham",           depotNo: "26", contactNumber: "03332 415026", email: "Depot26@dxfreight.co.uk",          trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Julie.winfield@thedx.co.uk" },
    { id: "2",  depot: "DX Northampton",           depotNo: "10", contactNumber: "03332 415010", email: "Northampton@dxfreight.co.uk",      trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Tamison.bramhall@thedx.co.uk" },
    { id: "3",  depot: "DX Cannock",               depotNo: "35", contactNumber: "03332 415035", email: "depot35@dxfreight.co.uk",          trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Matt.hearsey@thedx.co.uk" },
    { id: "4",  depot: "DX Leeds",                 depotNo: "37", contactNumber: "03332 415037", email: "depot37@dxfreight.co.uk",          trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Gemma.Dolphin@thedx.co.uk" },
    { id: "5",  depot: "DX Burnley",               depotNo: "",   contactNumber: "03332 415092", email: "depot42@thedx.co.uk",             trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Nikki.ward@thedx.co.uk" },
    { id: "6",  depot: "DX Glasgow",               depotNo: "69", contactNumber: "03332 415065", email: "Glasgow@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Charris.Johnstone@dxdelivery.com CS Manager" },
    { id: "7",  depot: "DX Sheffield",             depotNo: "47", contactNumber: "03332 415047", email: "Depot47@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Amanda.robinson@dxdelivery.com" },
    { id: "8",  depot: "DX Exeter",                depotNo: "82", contactNumber: "03332 415092", email: "depot82@dxfreight.co.uk",          trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Ashley.Taylor@thedx.co.uk" },
    { id: "9",  depot: "DX Exeter (2 Man)",         depotNo: "82", contactNumber: "03332 415082", email: "2-man-info@thedx.co.uk",          trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "Jane.worrall@thedx.co.uk" },
    { id: "10", depot: "DX 2 Man (NEW NUMBER)",     depotNo: "G",  contactNumber: "03332 411168", email: "",                               trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "11", depot: "DX Crewe",                 depotNo: "34", contactNumber: "03332 415034", email: "depot34@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "12", depot: "DX Manchester",            depotNo: "44", contactNumber: "03332 415044", email: "depot44@thedx.co.uk",             trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "13", depot: "DX Bristol",               depotNo: "32", contactNumber: "03332 415132", email: "Bristol@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "14", depot: "DX West Bromwich",         depotNo: "55", contactNumber: "03332 415155", email: "depot55@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "15", depot: "DX Sheffield",             depotNo: "47", contactNumber: "03332 415026", email: "Depot47@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "16", depot: "DX Ipswich",               depotNo: "88", contactNumber: "03342 415088", email: "depot88@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "17", depot: "DX Basildon",              depotNo: "12", contactNumber: "03332 415012", email: "Basildon@dxdelivery.com",          trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "18", depot: "DX Edinburgh",             depotNo: "16", contactNumber: "01636 815186", email: "depot16@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "19", depot: "DX Coventry",              depotNo: "65", contactNumber: "03332 415109", email: "depot65@dxdelivery.com",           trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
    { id: "20", depot: "1 Man network (Saturday Support)", depotNo: "", contactNumber: "", email: "keyaccounts@thedx.co.uk", trackingSite: "https://dx-track.com/tracker/search.aspx", escalationContact: "" },
  ],
  "bjs": [
    { id: "1", customer: "All", depot: "", username: "CSCarrier@GFS", password: "Gfspass1234!" },
  ],
  "dhl-ecommerce": [
    { id: "1", customer: "All", depot: "", username: "cs.warrington@justshoutgfs.com", password: "GFspass1658" },
  ],
  "dpd-local": [
    { id: "1", customer: "Omlet", depot: "", username: "gfsomlet", password: "Gfspass123!" },
    { id: "2", customer: "All", depot: "", username: "GFSLOCALMASTER", password: "Gfspass123" },
  ],
  "international-websites": [
    { id: "1",  carrier: "Evri", country: "All", website: "https://clients.hermescloud.co.uk/", notes: "" },
    { id: "2",  carrier: "Evri", country: "All", website: "https://www.hermesworld.com/Search/", notes: "" },
    { id: "3",  carrier: "Evri", country: "All", website: "https://www.hermes-europe.co.uk/webtracking/parceldetails.html", notes: "" },
    { id: "4",  carrier: "Evri", country: "All", website: "https://www.trackyourparcel.eu/", notes: "" },
    { id: "5",  carrier: "Evri", country: "All", website: "https://www.evri.com/track/parcel/", notes: "" },
    { id: "6",  carrier: "Evri", country: "Ireland", website: "https://www.fastway.ie/", notes: "" },
    { id: "7",  carrier: "Evri", country: "Spain", website: "https://www.zeleris.com/busqueda-envio.aspx", notes: "" },
    { id: "8",  carrier: "Evri", country: "Spain", website: "https://www.correos.es/", notes: "" },
    { id: "9",  carrier: "Evri", country: "France", website: "https://www.colisprive.fr/en/", notes: "" },
    { id: "10", carrier: "Evri", country: "Germany", website: "https://www.myhermes/de/", notes: "" },
    { id: "11", carrier: "Evri", country: "Netherlands", website: "https://my.dhlparcel.nl/", notes: "" },
    { id: "12", carrier: "Evri", country: "Scandinavia", website: "https://www.postnord.dk/en", notes: "" },
    { id: "13", carrier: "Evri", country: "Numbers beg. with 00", website: "https://cn.etowertech.com/home?trackNos", notes: "" },
    { id: "14", carrier: "Evri", country: "Italy nos beg. with 6", website: "https://gls-group.com/IT/en/online-services/track-trace.html", notes: "" },
    { id: "15", carrier: "Evri", country: "Finland nos beg. with 8", website: "https://www.posti.fi/en/tracking", notes: "" },
    { id: "16", carrier: "Evri", country: "Portugal", website: "https://www.ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx?request_locale=en", notes: "" },
    { id: "17", carrier: "Evri", country: "Austria/Czech R 33", website: "https://gls-group.eu/GROUP/en/parcel-tracking", notes: "" },
    { id: "18", carrier: "DPD", country: "France", website: "https://www.chronopost.fr/en/private/track-your-parcel", notes: "" },
    { id: "19", carrier: "DPD", country: "All", website: "https://tracking.dpd.de/status/en_US/", notes: "" },
    { id: "20", carrier: "DPD", country: "Spain", website: "https://www.seur.com/livetracking/pages/seguimiento-online-", notes: "" },
    { id: "21", carrier: "DPD", country: "Other", website: "https://www.parcelmonitor.com/track-it-online/", notes: "" },
    { id: "22", carrier: "Spring", country: "All", website: "https://www.spring-gds.com/", notes: "" },
    { id: "23", carrier: "Spring", country: "All", website: "https://www.sending.es/en/find-your-shipment/", notes: "Tracking numbers starting with 7" },
    { id: "24", carrier: "Spring", country: "All", website: "https://www.myhermes.de/", notes: "Tracking numbers starting with 2" },
    { id: "25", carrier: "Spring", country: "Poland", website: "https://mailingtechnology.com/tracking/?tn", notes: "Tracking numbers starting with z" },
    { id: "26", carrier: "Other", country: "All", website: "https://www.17track.net/en", notes: "Can be used for both Spring and Deutsche Post parcels" },
    { id: "27", carrier: "Other", country: "All", website: "https://parcelsapp.com/en/tracking/", notes: "" },
    { id: "28", carrier: "Other", country: "All/Belgium", website: "https://track.bpost.cloud/btr/web/#/home?lang=en", notes: "Usually used for Landmark tickets (login to Mercury to get the tracking number)" },
    { id: "29", carrier: "Other", country: "Ireland", website: "https://www.anpost.com/", notes: "" },
    { id: "30", carrier: "Other", country: "France", website: "https://www.laposte.fr/", notes: "" },
    { id: "31", carrier: "Other", country: "Italy", website: "https://www.poste.it/", notes: "" },
    { id: "32", carrier: "Other", country: "Spain", website: "https://www.correos.es/", notes: "" },
    { id: "33", carrier: "Other", country: "Norway", website: "https://sporing.posten.no/sporing/L", notes: "" },
    { id: "34", carrier: "Other", country: "USA/USPS", website: "https://tools.usps.com/", notes: "Exelot FM numbers beginning with 9" },
    { id: "35", carrier: "UPS", country: "All", website: "https://www.ups.com/track?loc=en_GB&requester=ST/trackdetails", notes: "" },
    { id: "36", carrier: "Coll8", country: "All", website: "https://coll8.drop2shop.ie/tracking", notes: "customerservices@coll-8.com" },
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
    id: "dx",
    name: "DX",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DX-i5l4ARsQnXGswoEraJ3WrqOAeTkHSt.jpg",
    logoAlt: "DX",
    logoClass: "w-4/5 object-contain",
    cardBg: "bg-transparent",
    phone: "",
    email: "",
    web: "",
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
    phone: "",
    email: "",
    web: "",
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
    phone: "02076 403900",
    email: "customer.services@ocsworldwide.co.uk",
    web: "www.ocsworldwide.co.uk/",
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
  {
    id: "international-websites",
    name: "International Websites",
    logo: "",
    logoAlt: "International Websites",
    logoClass: "",
    cardBg: "bg-transparent",
    phone: "",
    email: "",
    web: "",
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
    console.log("[v0] Edit detail:", detailId)
  }

  const handleDeleteDetail = (detailId: string) => {
    console.log("[v0] Delete detail:", detailId)
  }

  const renderLink = (value: string, className = "") => {
    if (!value) return null
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    const isUrl = /^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/.test(value.trim()) && !isEmail
    if (isEmail) {
      return (
        <a href={`mailto:${value.trim()}`} className={`hover:underline text-foreground ${className}`} onClick={(e) => e.stopPropagation()}>
          {value}
        </a>
      )
    }
    if (isUrl) {
      const href = value.trim().startsWith("http") ? value.trim() : `https://${value.trim()}`
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`hover:underline text-foreground ${className}`} onClick={(e) => e.stopPropagation()}>
          {value}
        </a>
      )
    }
    return <span className={className}>{value}</span>
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
              {carrier.logo ? (
                <img
                  src={carrier.logo}
                  alt={carrier.logoAlt}
                  className={carrier.logoClass}
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Globe className="h-10 w-10 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground text-center leading-tight">{carrier.name}</span>
                </div>
              )}
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
                    {renderLink(carrier.email, "truncate")}
                  </div>
                )}
                {carrier.web && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 shrink-0 text-foreground/60" />
                    {renderLink(carrier.web, "truncate")}
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
                        {renderLink(account.email, "truncate")}
                        {account.emailAsterisk && (
                          <span className="text-red-500 font-semibold shrink-0">*</span>
                        )}
                      </div>
                    )}
                    {account.web && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3 shrink-0 text-foreground/60" />
                        {renderLink(account.web, "truncate")}
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
        <DialogContent className="sm:max-w-[95vw] max-w-[95vw] w-fit max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedCarrier?.name} Details</DialogTitle>
          </DialogHeader>
          <div className="border rounded-lg mt-4 overflow-y-auto flex-1">
            {(() => {
              const columns = selectedCarrier ? (carrierColumns[selectedCarrier.id] ?? defaultColumns) : defaultColumns
              const rows = selectedCarrier ? (carrierDetails[selectedCarrier.id] ?? []) : []
              const isEvri = selectedCarrier?.id === "evri"
              const isDX = selectedCarrier?.id === "dx"
              const sectionLabels: Record<string, string> = {
                domestic: "Evri Domestic",
                international: "Evri International",
              }
              return (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((col) => (
                        <TableHead key={col.key} className="whitespace-nowrap px-4">{col.label}</TableHead>
                      ))}
                      <TableHead className="whitespace-nowrap text-right px-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isDX && rows.length > 0 && (
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableCell colSpan={columns.length + 1} className="px-4 py-2 font-semibold text-sm">
                          DX Depot Contact
                        </TableCell>
                      </TableRow>
                    )}
                    {rows.reduce<React.ReactNode[]>((acc, detail, index) => {
                      if (isEvri) {
                        const prevSection = index > 0 ? rows[index - 1].section : null
                        if (detail.section !== prevSection) {
                          acc.push(
                            <TableRow key={`section-${detail.section}`} className="bg-muted/50 hover:bg-muted/50">
                              <TableCell colSpan={columns.length + 1} className="px-4 py-2 font-semibold text-sm">
                                {sectionLabels[detail.section] ?? detail.section}
                              </TableCell>
                            </TableRow>
                          )
                        }
                      }
                      acc.push(
                        <TableRow key={detail.id}>
                          {columns.map((col) => (
                            <TableCell key={col.key} className="whitespace-nowrap px-4">
                              {renderLink(detail[col.key] ?? "") ?? (detail[col.key] ?? "")}
                            </TableCell>
                          ))}
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
                      )
                      return acc
                    }, [])}
                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">
                          No details available for this carrier
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
