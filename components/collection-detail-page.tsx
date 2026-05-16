"use client"

import {
  Zap,
  Hash,
  CalendarDays,
  Activity,
  ArrowLeft,
  Package,
  MapPin,
  Weight,
  Tag,
  User,
  Phone,
  Building2,
  Globe,
} from "lucide-react"

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

interface CollectionDetailPageProps {
  collection: Collection
  onBack: () => void
}

export function CollectionDetailPage({ collection, onBack }: CollectionDetailPageProps) {
  const stripItems = [
    { logo: "dpd",        label: "CARRIER",          value: collection.carrier,                                    isHighlight: false },
    { icon: Zap,          label: "SERVICE",           value: collection.serviceDescr,                               isHighlight: false },
    { icon: Hash,         label: "CUSTOMER REF",      value: collection.customerRef || "—",                         isHighlight: false },
    { icon: CalendarDays, label: "COLLECTION DATE",   value: collection.collectionDate,                             isHighlight: false },
    { icon: Tag,          label: "CARRIER REF",       value: `${collection.collectionId}:${collection.customerRef}`, isHighlight: false },
    { icon: Package,      label: "PACKS",             value: String(collection.packs),                              isHighlight: false },
    { icon: Weight,       label: "WEIGHT",            value: "34 KG",                                               isHighlight: false },
    { icon: Activity,     label: "STATUS",            value: "Consignment Created",                                  isHighlight: true  },
  ]

  return (
    <div className="w-full px-6 py-6 space-y-6">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Collections
      </button>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Collection #{collection.collectionId}</h1>
        <p className="text-sm font-semibold text-foreground mt-1">{collection.customer}</p>
      </div>

      {/* Info strip */}
      <div className="flex gap-0 w-full rounded-lg border border-border bg-muted/30">
        {stripItems.map((item, idx, arr) => {
          const IconComp = (item as any).icon
          return (
            <div
              key={item.label}
              className={`flex flex-1 flex-row items-start gap-2 py-3 px-4 min-w-fit ${idx < arr.length - 1 ? "border-r border-border" : ""}`}
            >
              <div className="flex items-center gap-1 shrink-0 pt-0.5">
                {(item as any).logo ? (
                  <img
                    src={`/${(item as any).logo}-logo.png`}
                    alt={item.label}
                    className="h-6 w-12 shrink-0 object-contain"
                  />
                ) : IconComp ? (
                  <IconComp className="h-4 w-4 flex-shrink-0 text-[#009eff]" />
                ) : null}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">{item.label}</span>
                <span className={`text-sm font-semibold whitespace-nowrap ${item.isHighlight ? "text-amber-600" : "text-[#1e3a5f]"}`}>{item.value}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Address cards side by side */}
      <div className="grid grid-cols-2 gap-6">

        {/* Collection Address */}
        <div className="border border-border rounded-lg bg-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#009eff]" />
            <h2 className="text-base font-semibold text-foreground">Collection Address</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Company</span></div>
              <span className="text-sm text-foreground pl-5">N/A</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Contact</span></div>
              <span className="text-sm text-foreground pl-5">tavi-v@hotmail.co.uk</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Phone</span></div>
              <span className="text-sm text-foreground pl-5">+44 7368 978335</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Street</span></div>
              <span className="text-sm text-foreground pl-5">55 Blenheim Road</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">District</span></div>
              <span className="text-sm text-foreground pl-5">—</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Town</span></div>
              <span className="text-sm text-foreground pl-5">Leighton Buzzard</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">County</span></div>
              <span className="text-sm text-foreground pl-5">Bedfordshire</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Country</span></div>
              <span className="text-sm text-foreground pl-5">GB</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Hash className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Postcode</span></div>
              <span className="text-sm text-foreground pl-5">LU7 3DZ</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="border border-border rounded-lg bg-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#009eff]" />
            <h2 className="text-base font-semibold text-foreground">Delivery Address</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Company</span></div>
              <span className="text-sm text-foreground pl-5">AGTC LIMITED</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Recipient</span></div>
              <span className="text-sm text-foreground pl-5">GOODS IN</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Phone</span></div>
              <span className="text-sm text-foreground pl-5">01865 692 334</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Street</span></div>
              <span className="text-sm text-foreground pl-5">UNIT 2 NETHER LANE</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">District</span></div>
              <span className="text-sm text-foreground pl-5">PROVINCAL PARK</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Town</span></div>
              <span className="text-sm text-foreground pl-5">SHEFFIELD</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">County</span></div>
              <span className="text-sm text-foreground pl-5">ECCLESFIELD</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Country</span></div>
              <span className="text-sm text-foreground pl-5">GB</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5"><Hash className="h-3.5 w-3.5 text-[#009eff]" /><span className="text-xs text-muted-foreground">Postcode</span></div>
              <span className="text-sm text-foreground pl-5">S35 9ZX</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
