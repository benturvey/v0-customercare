"use client"

import {
  Zap,
  Hash,
  CalendarDays,
  Activity,
  ArrowLeft,
  Package,
  MapPin,
  FileText,
  Weight,
  Box,
  AlignLeft,
  Building2,
  Tag,
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
  const detailRows = [
    [
      { label: "Insert Date",            value: collection.collectionDate,        icon: CalendarDays, flagIcon: false },
      { label: "Total Parcels",          value: String(collection.packs),         icon: Package,      flagIcon: false },
      { label: "Weight",                 value: "—",                              icon: Weight,       flagIcon: false },
      { label: "Content",                value: "—",                              icon: Box,          flagIcon: false },
    ],
    [
      { label: "Account No",             value: "—",                              icon: Hash,         flagIcon: false },
      { label: "Contract No",            value: collection.contractNo || "—",     icon: FileText,     flagIcon: false },
      { label: "Contract Comment",       value: "—",                              icon: AlignLeft,    flagIcon: false },
      { label: "Consignment Ref",        value: collection.customerRef || "—",    icon: Tag,          flagIcon: false },
    ],
    [
      { label: "Origin Depot",           value: "—",                              icon: Building2,    flagIcon: false },
      { label: "Destination Depot",      value: "—",                              icon: MapPin,       flagIcon: false },
      { label: "Sender",                 value: collection.customer,              icon: Building2,    flagIcon: false },
      { label: "Destination",            value: "—",                              icon: MapPin,       flagIcon: true },
    ],
    [
      { label: "Collection ID",          value: collection.collectionId,          icon: Hash,         flagIcon: false },
      { label: "Alternate Tracking Nos", value: "—",                              icon: Hash,         flagIcon: false },
      { label: "Instructions",           value: "—",                              icon: AlignLeft,    flagIcon: false },
      { label: "",                       value: "",                               icon: null,         flagIcon: false },
    ],
  ]

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
      <div className="grid grid-cols-8 gap-1 rounded-lg border border-border bg-muted/30 overflow-x-auto">
        {stripItems.map((item, idx, arr) => {
          const Icon = (item as any).icon
          return (
            <div
              key={item.label}
              className={`flex flex-col gap-1 py-3 px-3 min-w-max ${idx < arr.length - 1 ? "border-r border-border" : ""}`}
            >
              <div className="flex items-center gap-1.5">
                {(item as any).logo ? (
                  <img
                    src={`/${(item as any).logo}-logo.png`}
                    alt={item.label}
                    className="h-6 w-12 shrink-0 object-contain"
                  />
                ) : (
                  Icon && <Icon className="h-4 w-4 flex-shrink-0 text-[#009eff]" />
                )}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">{item.label}</span>
              <span className={`text-sm font-semibold whitespace-nowrap ${item.isHighlight ? "text-amber-600" : "text-[#1e3a5f]"}`}>{item.value}</span>
            </div>
          )
        })}
      </div>

      {/* Shipment Details card */}
      <div className="border border-border rounded-lg bg-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Package className="h-5 w-5 text-[#009eff]" />
          <h2 className="text-base font-semibold text-foreground">Shipment Details</h2>
        </div>
        <div className="flex flex-col gap-6">
          {detailRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-6">
              {row.map((item) => {
                const IconComponent = item.icon
                return (
                  <div key={item.label} className="flex flex-col gap-1">
                    {item.label && (
                      <div className="flex items-center gap-1.5">
                        {item.flagIcon ? (
                          <img
                            src="https://flagcdn.com/w20/gb.png"
                            alt="UK flag"
                            className="h-3.5 w-5 shrink-0 mt-0.5 rounded-sm object-cover"
                          />
                        ) : (
                          IconComponent && <IconComponent className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#009eff]" />
                        )}
                        <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                      </div>
                    )}
                    <span className="text-sm text-foreground pl-5">{item.value}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
