"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Globe,
  RefreshCw,
  MessageSquare,
  BarChart2,
  Clock,
  AlarmClock,
  Flag,
  Star,
  Truck,
  MapPin,
  Layers,
  Package,
  CalendarDays,
  User,
  Building2,
  Mail,
  Phone,
  PlusCircle,
  History,
  Activity,
  UserCircle,
  Home,
  FileText,
  Tag,
  Reply,
  PauseCircle,
  Eye,
  ArrowUpCircle,
  Link2,
  StickyNote,
  CheckCircle2,
  List,
  GitCommitHorizontal,
  ScanLine,
  Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Ticket = {
  id: string
  category: string
  consignmentNo: string
  packs: number
  customer: string
  carrier: string
  agent: string
  status: string
}

interface TicketDetailViewProps {
  ticket: Ticket
  onBack: () => void
}

const metaItems = [
  { icon: Globe,        label: "Origin",         value: "UK" },
  { icon: RefreshCw,    label: "Defer/Review",   value: "1" },
  { icon: MessageSquare,label: "Responded",       value: "1" },
  { icon: BarChart2,    label: "Level",           value: "L1 - Basic" },
  { icon: Clock,        label: "Ticket Age",      value: "42m" },
  { icon: AlarmClock,   label: "SLA Due",         value: "11:32 in 2h 15m" },
  { icon: Flag,         label: "Priority",        value: "Normal" },
  { icon: Star,         label: "Customer Tier",   value: "Focus Customer" },
]

export function TicketDetailView({ ticket, onBack }: TicketDetailViewProps) {
  const [trackingView, setTrackingView] = useState<"list" | "timeline">("list")

  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-4 gap-1 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Ticket Queue
      </Button>

      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Ticket {ticket.id}</h1>
      </header>

      {/* Metadata strip */}
      <div className="flex items-center gap-0 rounded-lg border border-border bg-muted/30 overflow-hidden mb-6">
        {metaItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`flex flex-1 items-center gap-2 px-4 py-3 ${
                index !== metaItems.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 text-[#1e3a5f]" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <span className="text-sm font-semibold text-[#1e3a5f] whitespace-nowrap">{item.value}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Shipment Details Summary */}
      <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Shipment Details Summary</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">

        {/* Card 1 — Shipment Summary */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Shipment Summary</h3>
          <div className="grid gap-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Truck}    label="Carrier"      value="EVRI" />
              <DetailRow icon={MapPin}   label="Destination"  value="G73 4LZ" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Layers}   label="Service"        value="2 DAY SERVICE" />
              <DetailRow icon={Package}  label="Total Parcels"  value="1" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Globe}        label="Origin" value={
                <span className="flex items-center gap-1.5">
                  <span role="img" aria-label="UK flag" className="text-base leading-none">🇬🇧</span>
                  <span>UK</span>
                </span>
              } />
              <DetailRow icon={CalendarDays} label="Despatched" value="30/04/2026" />
            </div>
          </div>
        </div>

        {/* Card 2 — Customer Details */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Customer Details</h3>
          <div className="grid gap-2.5">
            <DetailRow icon={User}        label="Name"     value="CS Team" />
            <DetailRow icon={Building2}   label="Company"  value="LISA ELDRIDGE" />
            <DetailRow icon={Mail}        label="Email"    value="support@lisaeldridge.com" />
            <DetailRow icon={Phone}       label="Phone"    value="—" />
          </div>
        </div>

        {/* Card 3 — Ticket Summary */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Ticket Summary</h3>
          <div className="grid gap-2.5">
            <DetailRow icon={PlusCircle}  label="Created"        value="05/05/2026 15:49" />
            <DetailRow icon={History}     label="Last Updated"   value="05/05/2026 15:49" />
            <DetailRow icon={Activity}    label="Status"         value="Reviewing" />
            <DetailRow icon={RefreshCw}   label="Defer/Review"   value="1" />
            <DetailRow icon={UserCircle}  label="Assigned To"    value="Unassigned" />
          </div>
        </div>

        {/* Card 4 — Delivery Address */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Delivery Address</h3>
          <div className="grid gap-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Building2} label="Company"       value="CAROLINE BRILLANT" />
              <DetailRow icon={User}      label="Contact"       value="CAROLINE BRILLANT" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Phone}     label="Contact Phone" value="07927140269" />
              <DetailRow icon={Mail}      label="Contact Email" value="SISTERBRILLANT@YAHOO.CO.UK" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Home}      label="Address Line 1" value="0/1 (GROUND LEFT)" />
              <DetailRow icon={Home}      label="Address Line 2" value="9 ROWANTREE AVENUE" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={MapPin}    label="Town/City"     value="RUTHERGLEN" />
              <DetailRow icon={MapPin}    label="County"        value="SCT" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={MapPin}    label="Postcode"      value="G73 4LZ" />
              <DetailRow icon={Globe}     label="Country"       value="UNITED KINGDOM" />
            </div>
          </div>
        </div>

      </div>

      {/* Customer Query */}
      <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Customer Query</h2>
      <div className="rounded-lg border border-border bg-card p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <DetailRow icon={User}      label="Raised by" value="CS Team" />
            <div className="mt-3">
              <DetailRow icon={Tag}       label="Category"        value="WHERE_IS_MY_PARCEL" />
            </div>
          </div>
          <div>
            <DetailRow icon={Building2} label="Company"   value="LISA ELDRIDGE" />
            <div className="mt-3">
              <DetailRow icon={FileText}  label="Additional Info" value="Parcel unable to be delivered to parcel shop and now shows delayed. Please could we have further information regarding this delay as customer is very unhappy and unsure why delivery failed" />
            </div>
          </div>
          <DetailRow icon={User}      label="Contact"   value="CS Team (support@lisaeldridge.com)" />
        </div>
      </div>

      {/* Customer Conversation, Team Conversation & Exceptions, and Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Customer Conversation */}
        <div>
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Customer Conversation</h2>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="rounded-lg border border-blue-100 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">CS Team</span>
                <span className="text-xs text-muted-foreground">05/05/2026 15:49</span>
              </div>
              <p className="text-sm text-foreground">
                <span className="font-medium">Where is my parcel?</span>
                <br />
                <span className="text-muted-foreground">Additional Information:</span> Parcel unable to be delivered to parcel shop and now shows delayed. Please could we have further information regarding this delay as customer is very unhappy and unsure why delivery failed
              </p>
            </div>
          </div>
        </div>

        {/* Team Conversation & Exceptions */}
        <div>
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Team Conversation & Exceptions</h2>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="rounded-lg border border-yellow-100 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">Agent - OZ-USER</span>
                <span className="text-xs text-muted-foreground">05/05/2026 15:49</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Hello, Thanks for contacting GFS. I am sorry to advise the parcel has missed connection to the courier which has caused a delay. Evri are aiming to get this parcel back on track to your customer as soon as possible. We will check for further scans and update you daily. Kind regards -GFS Customer Care
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Actions</h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <Paperclip className="h-4 w-4" />
                Attach Items
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <Reply className="h-4 w-4" />
                Reply to Customer
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <PauseCircle className="h-4 w-4" />
                Defer / Awaiting Carrier
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <Eye className="h-4 w-4" />
                Review (Conditional)
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <ArrowUpCircle className="h-4 w-4" />
                Escalate to L2
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <ArrowUpCircle className="h-4 w-4" />
                Escalate to L3
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <Link2 className="h-4 w-4" />
                Merge / Link Tickets
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <StickyNote className="h-4 w-4" />
                Add Internal Notes
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <CheckCircle2 className="h-4 w-4" />
                Close as Resolved
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Tracking Visibility */}
      <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Tracking Visibility</h2>
      <div className="rounded-lg border border-border bg-card p-4 mb-6">
        {/* View toggle */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground font-medium">View as:</span>
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setTrackingView("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                trackingView === "list"
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              List
            </button>
            <button
              onClick={() => setTrackingView("timeline")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border-l border-border ${
                trackingView === "timeline"
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <GitCommitHorizontal className="h-3.5 w-3.5" />
              Timeline
            </button>
          </div>
        </div>

        {trackingView === "list" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Parcel No</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Tracking No</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Carrier & Service</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Latest Scan</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Latest Update</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Delivered / EDD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-medium">1</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3">
                    <span className="font-medium text-foreground">EVRI</span>
                    <br />
                    <span className="text-xs text-muted-foreground">2 DAY SERVICE</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      <ScanLine className="h-3 w-3" />
                      DELIVERY ATTEMPTED
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-xs">
                    WE HAVEN&apos;T BEEN ABLE TO DELIVER TO THE PARCELSHOP TODAY. WE&apos;LL RE-ATTEMPT ON THE NEXT WORKING DAY
                  </td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">04/04/2026 14:03</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-orange-500">EDD</span>
                    <br />
                    <span className="text-sm font-semibold text-orange-500">05/04/2026</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {trackingView === "timeline" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Parcel No</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Consignment No</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Scan Date</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Scan Text</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Scan Location</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Insert Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">04/05/2026 14:03</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>WE HAVEN&apos;T BEEN ABLE TO DELIVER TO THE PARCELSHOP TODAY. WE&apos;LL RE-ATTEMPT ON THE NEXT WORKING DAY</div>
                    <div className="text-blue-600 font-medium mt-1">UNABLE TO DELIVER; WILL RE-SCHEDULED DELIVERY</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">04/05/2026 15:37</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">04/05/2026 09:12</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>THIS PARCEL WILL BE DELIVERED TO THE PARCELSHOP OR LOCKER TODAY</div>
                    <div className="text-blue-600 font-medium mt-1">DELIVERY TO PARCEL SHOP/LOCKER SCHEDULED</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">07/05/2026 09:39</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 13:34</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>WE HAVEN&apos;T BEEN ABLE TO DELIVER TO THE PARCELSHOP TODAY. WE&apos;LL RE-ATTEMPT ON THE NEXT WORKING DAY</div>
                    <div className="text-blue-600 font-medium mt-1">UNABLE TO DELIVER; WILL RE-SCHEDULED DELIVERY</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 13:54</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 11:38</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>THIS PARCEL WILL BE DELIVERED TO THE PARCELSHOP OR LOCKER TODAY</div>
                    <div className="text-blue-600 font-medium mt-1">DELIVERY TO PARCEL SHOP/LOCKER SCHEDULED</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 11:54</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 08:53</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>THE PARCEL IS AT THE LOCAL DEPOT AND IS BEING SORTED FOR DELIVERY WITHIN 24 HOURS</div>
                    <div className="text-blue-600 font-medium mt-1">CONFIRMED AT DEPOT. PARCEL GOING OUT FOR DELIVERY</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 09:55</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 08:19</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>THIS PARCEL WILL BE DELIVERED TO THE PARCELSHOP OR LOCKER TODAY</div>
                    <div className="text-blue-600 font-medium mt-1">DELIVERY TO PARCEL SHOP/LOCKER SCHEDULED.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 09:55</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 09:34</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>MANIFESTED FOR DELIVERY</div>
                    <div className="text-blue-600 font-medium mt-1">SCHEDULED FOR DELIVERY.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">02/05/2026 09:55</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 16:06</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>THE PARCEL IS AT THE LOCAL DEPOT AND IS BEING SORTED FOR DELIVERY WITHIN 24 HOURS</div>
                    <div className="text-blue-600 font-medium mt-1">CONFIRMED AT DEPOT. PARCEL GOING OUT FOR DELIVERY.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 18:00</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 01:38</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>PARCEL PROCESSED AT THE HUB</div>
                    <div className="text-blue-600 font-medium mt-1">PROCESSED AT HUB.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 06:03</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 01:37</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>WE&apos;VE RECEIVED THIS PARCEL AT THE HUB AND WILL BE SORTED TO THE CUSTOMERS DELIVERY DEPOT</div>
                    <div className="text-blue-600 font-medium mt-1">ARRIVED AT HUB.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 06:03</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">30/04/2026 22:24</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>PARCELSHOP DIVERT REQUESTED</div>
                    <div className="text-blue-600 font-medium mt-1">ALTERNATIVE INSTRUCTIONS TO A PARCEL SHOP.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">01/05/2026 06:03</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-foreground font-mono text-xs">T06XUA0000734531</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">30/04/2026 20:15</td>
                  <td className="px-3 py-3 text-xs text-foreground max-w-sm">
                    <div>WE HAVE RECEIVED THE DETAILS FOR THIS PARCEL AND EXPECT IT TO REACH THE EVRI NETWORK SHORTLY</div>
                    <div className="text-blue-600 font-medium mt-1">PARCEL DATA RECEIVED - AWAITING CARRIER SCAN.</div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">—</td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">30/04/2026 22:05</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground break-words">{value}</span>
      </div>
    </div>
  )
}
