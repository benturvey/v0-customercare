"use client"

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
      <div className="flex flex-wrap items-center gap-0 rounded-lg border border-border bg-muted/30 overflow-hidden mb-6">
        {metaItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-4 py-3 ${
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
