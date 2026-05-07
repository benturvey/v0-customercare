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
  Upload,
  X,
  Image as ImageIcon,
  FileCheck2,
  ToggleLeft,
  Workflow,
  CalendarClock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
  { icon: Globe,        label: "Origin",                  value: "UK",              iconColor: "#009eff" },
  { icon: ToggleLeft,   label: "State",                   value: "OPEN",            iconColor: "#009eff" },
  { icon: Workflow,     label: "Status",                  value: "Reviewing",       iconColor: "#009eff" },
  { icon: CalendarClock,label: "Next Review",             value: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return `${d.toLocaleDateString("en-GB")} 10:00`; })(), iconColor: "#009eff" },
  { icon: RefreshCw,    label: "Defer/Review",            value: "1",               iconColor: "#009eff" },
  { icon: MessageSquare,label: "Responded",               value: "1",               iconColor: "#009eff" },
  { icon: BarChart2,    label: "Level",                   value: "L1 - Basic",      iconColor: "#009eff", valueClass: "text-green-600 font-bold" },
  { icon: Clock,        label: "Ticket Age",              value: "42m",             iconColor: "#009eff", valueClass: "text-amber-600 font-bold" },
  { icon: AlarmClock,   label: "SLA Due",                 value: "11:32 in 2h 15m", iconColor: "#009eff" },
  { icon: Flag,         label: "Priority",                value: "Normal",          iconColor: "#009eff" },
  { icon: Star,         label: "Customer Tier",           value: "Focus Customer",  iconColor: "#009eff", valueClass: "text-purple-600 font-bold" },
  { icon: FileCheck2,   label: "Descriptions",   value: "Received",        iconColor: "#009eff", valueClass: "text-green-600 font-bold" },
]

export function TicketDetailView({ ticket, onBack }: TicketDetailViewProps) {
  const [trackingView, setTrackingView] = useState<"list" | "timeline">("list")
  const [attachDialogOpen, setAttachDialogOpen] = useState(false)
  const [attachments, setAttachments] = useState<{ name: string; url: string }[]>([])
  const [attachmentsSheetOpen, setAttachmentsSheetOpen] = useState(false)
  const [deferDialogOpen, setDeferDialogOpen] = useState(false)

  const getTomorrowDate = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split("T")[0]
  }
  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  const [deferDate, setDeferDate] = useState(getTomorrowDate)
  const [deferTime, setDeferTime] = useState(getCurrentTime)
  const [deferReason, setDeferReason] = useState("")
  const [deferCommentToCustomer, setDeferCommentToCustomer] = useState("")
  const [deferInternalComments, setDeferInternalComments] = useState("")
  const [deferSendEmail, setDeferSendEmail] = useState(true)
  const [deferEmailAddresses, setDeferEmailAddresses] = useState("")

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [reviewDate, setReviewDate] = useState(getTomorrowDate)
  const [reviewTime, setReviewTime] = useState(getCurrentTime)
  const [reviewExpectedStatus, setReviewExpectedStatus] = useState("out-for-delivery")
  const [reviewReason, setReviewReason] = useState("")
  const [reviewCommentToCustomer, setReviewCommentToCustomer] = useState("")
  const [reviewInternalComments, setReviewInternalComments] = useState("")
  const [reviewSendEmail, setReviewSendEmail] = useState(true)
  const [reviewEmailAddresses, setReviewEmailAddresses] = useState("")

  const [internalNotesDialogOpen, setInternalNotesDialogOpen] = useState(false)
  const [internalNotesComment, setInternalNotesComment] = useState("")

  const [closeResolvedDialogOpen, setCloseResolvedDialogOpen] = useState(false)
  const [closeResolvedCategory, setCloseResolvedCategory] = useState("")
  const [closeResolvedCommentToCustomer, setCloseResolvedCommentToCustomer] = useState("")
  const [closeResolvedInternalComments, setCloseResolvedInternalComments] = useState("")
  const [closeResolvedSendEmail, setCloseResolvedSendEmail] = useState(true)
  const [closeResolvedEmailAddresses, setCloseResolvedEmailAddresses] = useState("")

  const [mergeDialogOpen, setMergeDialogOpen] = useState(false)
  const [mergeCriteria, setMergeCriteria] = useState<string[]>([])
  const [customerContactDialogOpen, setCustomerContactDialogOpen] = useState(false)
  const [mergeReason, setMergeReason] = useState("")
  const [mergeUpdateCategory, setMergeUpdateCategory] = useState("")
  const [mergeCommentToCustomer, setMergeCommentToCustomer] = useState("")
  const [mergeInternalComments, setMergeInternalComments] = useState("")
  const [mergeSendEmail, setMergeSendEmail] = useState(true)
  const [mergeEmailAddresses, setMergeEmailAddresses] = useState("")
  const [mergeSelectedRows, setMergeSelectedRows] = useState<string[]>([])
  const [mergeMatchesFound, setMergeMatchesFound] = useState(false)
  const [mergeCriteriaStore, setMergeCriteriaStore] = useState("")
  const [mergeCriteriaPostcode, setMergeCriteriaPostcode] = useState("")
  const [mergeCriteriaDate, setMergeCriteriaDate] = useState("")
  const [mergeCriteriaCategory, setMergeCriteriaCategory] = useState("")

  const mergeCriteriaOptions = [
    { value: "store",     label: "Store" },
    { value: "postcode",  label: "Postcode" },
    { value: "date",      label: "Date" },
    { value: "category",  label: "Category" },
  ]

  const toggleMergeCriteria = (value: string) => {
    setMergeCriteria((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const mockMatchedTickets = [
    { ticketNo: "#4712301", raisedDate: "04/05/2026 09:15", raisedBy: "CS Team",   status: "Unassigned", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4718844", raisedDate: "04/05/2026 11:42", raisedBy: "CS Team",   status: "Reviewing",  category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4721009", raisedDate: "05/05/2026 08:30", raisedBy: "Jane Doe",  status: "Deferred",   category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4724115", raisedDate: "05/05/2026 10:05", raisedBy: "CS Team",   status: "Unassigned", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4726830", raisedDate: "05/05/2026 11:17", raisedBy: "Mark Smith",status: "Reviewing",  category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4729442", raisedDate: "05/05/2026 13:50", raisedBy: "CS Team",   status: "Deferred",   category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4731067", raisedDate: "06/05/2026 08:22", raisedBy: "Jane Doe",  status: "Unassigned", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4733298", raisedDate: "06/05/2026 09:44", raisedBy: "CS Team",   status: "Reviewing",  category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4735814", raisedDate: "06/05/2026 11:30", raisedBy: "Mark Smith",status: "Unassigned", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4738521", raisedDate: "06/05/2026 14:12", raisedBy: "CS Team",   status: "Deferred",   category: "WHERE_IS_MY_PARCEL" },
  ]

  const toggleMergeRow = (ticketNo: string) => {
    setMergeSelectedRows((prev) =>
      prev.includes(ticketNo) ? prev.filter((t) => t !== ticketNo) : [...prev, ticketNo]
    )
  }
  const allMergeRowsSelected = mergeSelectedRows.length === mockMatchedTickets.length && mockMatchedTickets.length > 0
  const someMergeRowsSelected = mergeSelectedRows.length > 0 && !allMergeRowsSelected
  const toggleAllMergeRows = () => {
    setMergeSelectedRows(allMergeRowsSelected ? [] : mockMatchedTickets.map((t) => t.ticketNo))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newAttachments = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }))
      setAttachments((prev) => [...prev, ...newAttachments])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

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
              className={`flex items-center gap-2 px-3 py-3 min-w-0 ${
                index !== metaItems.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${typeof item.iconColor === "string" && item.iconColor.startsWith("text-") ? item.iconColor : "text-[#1e3a5f]"}`} style={typeof item.iconColor === "string" && item.iconColor.startsWith("#") ? { color: item.iconColor } : undefined} />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <span className={`text-sm font-semibold text-[#1e3a5f] whitespace-nowrap ${item.valueClass ?? ""}`}>{item.value}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Customer Query */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-[#1e3a5f]">Customer Query</h2>
        {attachments.length > 0 && (
          <button
            onClick={() => setAttachmentsSheetOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#009eff] hover:text-blue-700 transition-colors"
          >
            <Paperclip className="h-4 w-4" />
            View Attachments ({attachments.length})
          </button>
        )}
      </div>
      <div className="rounded-lg border border-border bg-card p-4 mb-6">
        <div className="flex gap-4">
          {/* Summary card */}
          <div className="rounded-lg border border-border bg-muted/40 p-3 flex-shrink-0 w-64 space-y-2.5">
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Category</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">WHERE_IS_MY_PARCEL</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Raised by</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">CS Team (support@lisaeldridge.com)</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Customer</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[#1e3a5f]">LISA ELDRIDGE</p>
                <button
                  onClick={() => setCustomerContactDialogOpen(true)}
                  className="text-[#009eff] hover:text-blue-700 transition-colors"
                  aria-label="View customer contact details"
                >
                  <UserCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Ticket Info card */}
          <div className="rounded-lg border border-border bg-muted/40 p-3 flex-shrink-0 w-52 space-y-2.5">
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Created</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">05/05/2026 15:49</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Last Updated</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">05/05/2026 15:49</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Assigned To</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">—</p>
            </div>
          </div>

          {/* Additional Info card */}
          <div className="rounded-lg border border-border bg-muted/40 p-3 flex-1">
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Additional Info</p>
              <p className="text-sm text-[#1e3a5f] leading-relaxed">Parcel unable to be delivered to parcel shop and now shows delayed. Please could we have further information regarding this delay as customer is very unhappy and unsure why delivery failed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Customer Conversation */}
        <div>
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Customer Conversation</h2>
          <div className="rounded-lg border border-blue-200 p-4" style={{ backgroundColor: "#98d9ff" }}>
            <div className="rounded-lg border border-blue-100 bg-white p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">CS Team</span>
                <span className="text-xs text-muted-foreground">06/05/2026 09:49</span>
              </div>
              <p className="text-sm text-foreground">
                <span className="font-medium">Where is my parcel?</span>
                <br />
                <span className="text-muted-foreground">Additional Information:</span> What is happening with the delivery? Why is this taking so long?
              </p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-white p-3 mb-3">
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
            <button className="w-full text-center text-sm text-[#009eff] hover:text-blue-700 font-medium transition-colors py-2 border-t border-blue-100">
              View More
            </button>
          </div>
        </div>

        {/* Team Conversation & Exceptions */}
        <div>
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Team Conversation & Exceptions</h2>
          <div className="rounded-lg border border-yellow-200 p-4" style={{ backgroundColor: "#ffbdad" }}>
            <div className="rounded-lg border border-yellow-100 bg-white p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">Agent - OZ-USER</span>
                <span className="text-xs text-muted-foreground">06/05/2026 09:49</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Good morning, Evri are still experiencing delays. We apologise for the inconvenience and will continue to monitor. Kind regards -GFS Customer Care
              </p>
            </div>
            <div className="rounded-lg border border-yellow-100 bg-white p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">Agent - OZ-USER</span>
                <span className="text-xs text-muted-foreground">05/05/2026 15:49</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Hello, Thanks for contacting GFS. I am sorry to advise the parcel has missed connection to the courier which has caused a delay. Evri are aiming to get this parcel back on track to your customer as soon as possible. We will check for further scans and update you daily. Kind regards -GFS Customer Care
              </p>
            </div>
            <button className="w-full text-center text-sm text-[#009eff] hover:text-blue-700 font-medium transition-colors py-2 border-t border-yellow-100">
              View More
            </button>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Actions</h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setAttachDialogOpen(true)}>
                <Paperclip className="h-4 w-4" style={{ color: "#009eff" }} />
                Attach Items
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <Reply className="h-4 w-4" style={{ color: "#009eff" }} />
                Reply to Customer
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setDeferDialogOpen(true)}>
                <PauseCircle className="h-4 w-4" style={{ color: "#009eff" }} />
                Defer / Awaiting Carrier
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setReviewDialogOpen(true)}>
                <Eye className="h-4 w-4" style={{ color: "#009eff" }} />
                Review (Conditional)
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <ArrowUpCircle className="h-4 w-4" style={{ color: "#009eff" }} />
                Escalate to L2
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left">
                <ArrowUpCircle className="h-4 w-4" style={{ color: "#009eff" }} />
                Escalate to L3
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setMergeDialogOpen(true)}>
                <Link2 className="h-4 w-4" style={{ color: "#009eff" }} />
                Merge / Link Tickets
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setInternalNotesDialogOpen(true)}>
                <StickyNote className="h-4 w-4" style={{ color: "#009eff" }} />
                Add Internal Notes
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setCloseResolvedDialogOpen(true)}>
                <CheckCircle2 className="h-4 w-4" style={{ color: "#009eff" }} />
                Close as Resolved
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Details Summary */}
      <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Shipment Details Summary</h2>
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "1.5fr 2fr" }}>

        {/* Card 1 — Shipment Summary */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Shipment Summary</h3>
          <div className="grid gap-2.5">
            <div className="grid grid-cols-3 gap-2.5">
              <DetailRow icon={CalendarDays} label="Despatched"    value="30/04/2026" />
              <DetailRow icon={Truck}        label="Carrier"       value="EVRI" />
              <DetailRow icon={Layers}       label="Service"       value="2 DAY SERVICE" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <DetailRow icon={Package}      label="Total Parcels" value="1" />
              <DetailRow icon={Globe}        label="Origin"        value="UK" />
            </div>
          </div>
        </div>

        {/* Card 2 — Delivery Address */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Delivery Address</h3>
          <div className="grid gap-2.5">
            <div className="grid grid-cols-3 gap-2.5">
              <DetailRow icon={Building2} label="Company"       value="CAROLINE BRILLANT" />
              <DetailRow icon={User}      label="Contact"       value="CAROLINE BRILLANT" />
              <DetailRow icon={Phone}     label="Contact Phone" value="07927140269" />
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              <DetailRow icon={Mail}      label="Contact Email" value="SISTERBRILLANT@YAHOO.CO.UK" />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <DetailRow icon={Home}      label="Address Line 1" value="0/1 (GROUND LEFT)" />
              <DetailRow icon={Home}      label="Address Line 2" value="9 ROWANTREE AVENUE" />
              <DetailRow icon={MapPin}    label="Town/City"      value="RUTHERGLEN" />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <DetailRow icon={MapPin}    label="County"        value="SCT" />
              <DetailRow icon={Globe}     label="Country"       value="UNITED KINGDOM" />
              <DetailRow icon={MapPin}    label="Postcode"      value="G73 4LZ" />
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

      {/* Defer / Awaiting Carrier Dialog */}
      <Dialog open={deferDialogOpen} onOpenChange={setDeferDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Defer / Awaiting Carrier</DialogTitle>
            <DialogDescription>
              Set a deferral date and reason for this ticket.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Row 1: Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="defer-date">Defer Query To Date</Label>
                <Input
                  id="defer-date"
                  type="date"
                  value={deferDate}
                  onChange={(e) => setDeferDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="defer-time">Time</Label>
                <Input
                  id="defer-time"
                  type="time"
                  value={deferTime}
                  onChange={(e) => setDeferTime(e.target.value)}
                />
              </div>
            </div>

            {/* Reason for Deferral */}
            <div className="space-y-1.5">
              <Label htmlFor="defer-reason">Reason for Deferral</Label>
              <Select value={deferReason} onValueChange={setDeferReason}>
                <SelectTrigger id="defer-reason">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="address-query">GFS Investigation: Address Query</SelectItem>
                  <SelectItem value="awaiting-information">GFS Investigation: Awaiting information from</SelectItem>
                  <SelectItem value="customs">GFS Investigation: Customs require further information</SelectItem>
                  <SelectItem value="eta-requested">GFS Investigation: ETA requested from carrier. Awaiting feedback</SelectItem>
                  <SelectItem value="no-scan">GFS Investigation: No scan data, please confirm if label used</SelectItem>
                  <SelectItem value="parcel-damaged">GFS Investigation: Parcel damaged</SelectItem>
                  <SelectItem value="parcel-stolen">GFS Investigation: Parcel stolen</SelectItem>
                  <SelectItem value="claim">Sender to raise claim within carrier set timelimit</SelectItem>
                  <SelectItem value="part-delivery">GFS Investigation: Part delivery. Outstanding items due for delivery</SelectItem>
                  <SelectItem value="packaging-description">GFS Investigation: Please supply a description of the packaging, contents and value</SelectItem>
                  <SelectItem value="contact-number">GFS Investigation: Please supply consignee contact number</SelectItem>
                  <SelectItem value="redelivery">GFS Investigation: Redelivery requested</SelectItem>
                  <SelectItem value="searches-actioned">GFS Investigation: Searches being actioned. Awaiting carrier feedback</SelectItem>
                  <SelectItem value="awaiting-carrier">GFS Investigation: Awaiting carrier feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment to Customer */}
            <div className="space-y-1.5">
              <Label htmlFor="defer-customer-comment">Comment to Customer</Label>
              <Textarea
                id="defer-customer-comment"
                placeholder="Enter a comment to send to the customer..."
                rows={3}
                value={deferCommentToCustomer}
                onChange={(e) => setDeferCommentToCustomer(e.target.value)}
              />
            </div>

            {/* Internal Comments */}
            <div className="space-y-1.5">
              <Label htmlFor="defer-internal-comments">Internal Comments</Label>
              <Textarea
                id="defer-internal-comments"
                placeholder="Enter internal comments (not visible to customer)..."
                rows={3}
                value={deferInternalComments}
                onChange={(e) => setDeferInternalComments(e.target.value)}
              />
            </div>

            {/* Send Email checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="defer-send-email"
                checked={deferSendEmail}
                onCheckedChange={(checked) => setDeferSendEmail(checked === true)}
              />
              <Label htmlFor="defer-send-email" className="cursor-pointer">
                Must email be sent to customer?
              </Label>
            </div>

            {/* Email addresses */}
            <div className="space-y-1.5">
              <Label htmlFor="defer-email">Email Address</Label>
              <Input
                id="defer-email"
                type="text"
                placeholder="Enter one or more email addresses, separated by commas..."
                value={deferEmailAddresses}
                onChange={(e) => setDeferEmailAddresses(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate multiple addresses with commas.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeferDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDeferDialogOpen(false)}>
              Submit Deferral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review (Conditional) Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review (Conditional)</DialogTitle>
            <DialogDescription>
              Set a snooze date and review conditions for this ticket.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Row 1: Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="review-date">Snooze Query To Date</Label>
                <Input
                  id="review-date"
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="review-time">Time</Label>
                <Input
                  id="review-time"
                  type="time"
                  value={reviewTime}
                  onChange={(e) => setReviewTime(e.target.value)}
                />
              </div>
            </div>

            {/* Expected Status */}
            <div className="space-y-1.5">
              <Label>Expected Status</Label>
              <RadioGroup value={reviewExpectedStatus} onValueChange={setReviewExpectedStatus} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="out-for-delivery" id="status-ofd" />
                  <Label htmlFor="status-ofd" className="cursor-pointer font-normal">Out For Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivered" id="status-delivered" />
                  <Label htmlFor="status-delivered" className="cursor-pointer font-normal">Delivered</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Reason for Review */}
            <div className="space-y-1.5">
              <Label htmlFor="review-reason">Reason for Review</Label>
              <Select value={reviewReason} onValueChange={setReviewReason}>
                <SelectTrigger id="review-reason">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="address-query">GFS Investigation: Address Query</SelectItem>
                  <SelectItem value="awaiting-information">GFS Investigation: Awaiting information from</SelectItem>
                  <SelectItem value="customs">GFS Investigation: Customs require further information</SelectItem>
                  <SelectItem value="eta-requested">GFS Investigation: ETA requested from carrier. Awaiting feedback</SelectItem>
                  <SelectItem value="no-scan">GFS Investigation: No scan data, please confirm if label used</SelectItem>
                  <SelectItem value="parcel-damaged">GFS Investigation: Parcel damaged</SelectItem>
                  <SelectItem value="parcel-stolen">GFS Investigation: Parcel stolen</SelectItem>
                  <SelectItem value="claim">Sender to raise claim within carrier set timelimit</SelectItem>
                  <SelectItem value="part-delivery">GFS Investigation: Part delivery. Outstanding items due for delivery</SelectItem>
                  <SelectItem value="packaging-description">GFS Investigation: Please supply a description of the packaging, contents and value</SelectItem>
                  <SelectItem value="contact-number">GFS Investigation: Please supply consignee contact number</SelectItem>
                  <SelectItem value="redelivery">GFS Investigation: Redelivery requested</SelectItem>
                  <SelectItem value="searches-actioned">GFS Investigation: Searches being actioned. Awaiting carrier feedback</SelectItem>
                  <SelectItem value="awaiting-carrier">GFS Investigation: Awaiting carrier feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment to Customer */}
            <div className="space-y-1.5">
              <Label htmlFor="review-customer-comment">Comment to Customer</Label>
              <Textarea
                id="review-customer-comment"
                placeholder="Enter a comment to send to the customer..."
                rows={3}
                value={reviewCommentToCustomer}
                onChange={(e) => setReviewCommentToCustomer(e.target.value)}
              />
            </div>

            {/* Internal Comments */}
            <div className="space-y-1.5">
              <Label htmlFor="review-internal-comments">Internal Comments</Label>
              <Textarea
                id="review-internal-comments"
                placeholder="Enter internal comments (not visible to customer)..."
                rows={3}
                value={reviewInternalComments}
                onChange={(e) => setReviewInternalComments(e.target.value)}
              />
            </div>

            {/* Send Email checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="review-send-email"
                checked={reviewSendEmail}
                onCheckedChange={(checked) => setReviewSendEmail(checked === true)}
              />
              <Label htmlFor="review-send-email" className="cursor-pointer">
                Must email be sent to customer?
              </Label>
            </div>

            {/* Email addresses */}
            <div className="space-y-1.5">
              <Label htmlFor="review-email">Email Address</Label>
              <Input
                id="review-email"
                type="text"
                placeholder="Enter one or more email addresses, separated by commas..."
                value={reviewEmailAddresses}
                onChange={(e) => setReviewEmailAddresses(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate multiple addresses with commas.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setReviewDialogOpen(false)}>
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Contact Dialog */}
      <Dialog open={customerContactDialogOpen} onOpenChange={setCustomerContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>LISA ELDRIDGE Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
              <p className="text-sm text-foreground">CS Team</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
              <p className="text-sm text-foreground break-all">support@lisaeldridge.com</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</p>
              <p className="text-sm text-foreground">—</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setCustomerContactDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Merge / Link Tickets Dialog */}
      <Dialog open={mergeDialogOpen} onOpenChange={(open) => { setMergeDialogOpen(open); if (!open) setMergeMatchesFound(false) }}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Merge / Link Tickets</DialogTitle>
            <DialogDescription>
              Select matching criteria to find related tickets, then choose a reason for the merge.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Criteria multi-select */}
            <div className="space-y-3">
              <Label>Criteria to Match</Label>
              <div className="flex flex-wrap gap-2">
                {mergeCriteriaOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleMergeCriteria(opt.value)}
                    className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                      mergeCriteria.includes(opt.value)
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Contextual inputs for selected criteria */}
              {mergeCriteria.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {mergeCriteria.includes("store") && (
                    <div className="space-y-1.5">
                      <Label htmlFor="criteria-store">Store</Label>
                      <Input
                        id="criteria-store"
                        placeholder="Enter store name or ID..."
                        value={mergeCriteriaStore}
                        onChange={(e) => setMergeCriteriaStore(e.target.value)}
                      />
                    </div>
                  )}
                  {mergeCriteria.includes("postcode") && (
                    <div className="space-y-1.5">
                      <Label htmlFor="criteria-postcode">Postcode</Label>
                      <Input
                        id="criteria-postcode"
                        placeholder="Enter postcode..."
                        value={mergeCriteriaPostcode}
                        onChange={(e) => setMergeCriteriaPostcode(e.target.value)}
                      />
                    </div>
                  )}
                  {mergeCriteria.includes("date") && (
                    <div className="space-y-1.5">
                      <Label htmlFor="criteria-date">Date</Label>
                      <Input
                        id="criteria-date"
                        type="date"
                        value={mergeCriteriaDate}
                        onChange={(e) => setMergeCriteriaDate(e.target.value)}
                      />
                    </div>
                  )}
                  {mergeCriteria.includes("category") && (
                    <div className="space-y-1.5">
                      <Label htmlFor="criteria-category">Category</Label>
                      <Select value={mergeCriteriaCategory} onValueChange={setMergeCriteriaCategory}>
                        <SelectTrigger id="criteria-category">
                          <SelectValue placeholder="Select a category..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="collection-enquiry">Collection enquiry</SelectItem>
                          <SelectItem value="disputed-delivery">Disputed Delivery</SelectItem>
                          <SelectItem value="incomplete-delivery">Order has been delivered incomplete</SelectItem>
                          <SelectItem value="delivered-damaged">Parcel has been delivered damaged</SelectItem>
                          <SelectItem value="post-delivery-feedback">Post Delivery feedback</SelectItem>
                          <SelectItem value="additional-delivery-info">Provide additional delivery information</SelectItem>
                          <SelectItem value="customs-info">Provide Customs Information</SelectItem>
                          <SelectItem value="collect-parcel">Request for consignee to collect parcel</SelectItem>
                          <SelectItem value="change-address">Request to change delivery address</SelectItem>
                          <SelectItem value="redeliver">Request to redeliver</SelectItem>
                          <SelectItem value="return-to-sender">Request to return parcel to sender</SelectItem>
                          <SelectItem value="where-is-my-parcel">Where is my parcel?</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Find Matches button */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMergeMatchesFound(true)}
              >
                Find Matches
              </Button>
            </div>

            {/* Matched tickets table */}
            <div className="space-y-2">
              <Label>Matched Tickets</Label>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="px-3 py-2.5 w-8">
                        <Checkbox
                          checked={allMergeRowsSelected}
                          data-indeterminate={someMergeRowsSelected}
                          onCheckedChange={toggleAllMergeRows}
                          aria-label="Select all tickets"
                          className={someMergeRowsSelected ? "opacity-70" : ""}
                        />
                      </th>
                      <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">Ticket No</th>
                      <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">Raised Date</th>
                      <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">Raised By</th>
                      <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">Status</th>
                      <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergeMatchesFound ? mockMatchedTickets.map((t) => (
                      <tr
                        key={t.ticketNo}
                        className={`border-b border-border last:border-b-0 transition-colors cursor-pointer ${
                          mergeSelectedRows.includes(t.ticketNo) ? "bg-blue-50" : "hover:bg-muted/20"
                        }`}
                        onClick={() => toggleMergeRow(t.ticketNo)}
                      >
                        <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={mergeSelectedRows.includes(t.ticketNo)}
                            onCheckedChange={() => toggleMergeRow(t.ticketNo)}
                            aria-label={`Select ticket ${t.ticketNo}`}
                          />
                        </td>
                        <td className="px-3 py-2.5 font-medium text-foreground">{t.ticketNo}</td>
                        <td className="px-3 py-2.5 text-foreground whitespace-nowrap">{t.raisedDate}</td>
                        <td className="px-3 py-2.5 text-foreground">{t.raisedBy}</td>
                        <td className="px-3 py-2.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            t.status === "Unassigned" ? "bg-gray-100 text-gray-700" :
                            t.status === "Reviewing"  ? "bg-blue-50 text-blue-700" :
                            "bg-yellow-50 text-yellow-700"
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-foreground">{t.category}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-3 py-6 text-center text-sm text-muted-foreground">
                          Click &quot;Find Matches&quot; to search for related tickets.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reason for merge */}
            <div className="space-y-1.5">
              <Label htmlFor="merge-reason">Reason for Ticket Merge</Label>
              <Select value={mergeReason} onValueChange={setMergeReason}>
                <SelectTrigger id="merge-reason">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duplicate">Duplicate Query</SelectItem>
                  <SelectItem value="same-consignment">Same Consignment</SelectItem>
                  <SelectItem value="same-customer">Same Customer — Multiple Submissions</SelectItem>
                  <SelectItem value="same-issue">Same Issue �� Different Contacts</SelectItem>
                  <SelectItem value="related">Related Tickets — Single Resolution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Update Category */}
            <div className="space-y-1.5">
              <Label htmlFor="merge-update-category">Update Category</Label>
              <Select value={mergeUpdateCategory} onValueChange={setMergeUpdateCategory}>
                <SelectTrigger id="merge-update-category">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="address-query">GFS Investigation: Address Query</SelectItem>
                  <SelectItem value="awaiting-information">GFS Investigation: Awaiting information from</SelectItem>
                  <SelectItem value="customs">GFS Investigation: Customs require further information</SelectItem>
                  <SelectItem value="eta-requested">GFS Investigation: ETA requested from carrier. Awaiting feedback</SelectItem>
                  <SelectItem value="no-scan">GFS Investigation: No scan data, please confirm if label used</SelectItem>
                  <SelectItem value="parcel-damaged">GFS Investigation: Parcel damaged</SelectItem>
                  <SelectItem value="parcel-stolen">GFS Investigation: Parcel stolen</SelectItem>
                  <SelectItem value="claim">Sender to raise claim within carrier set timelimit</SelectItem>
                  <SelectItem value="part-delivery">GFS Investigation: Part delivery. Outstanding items due for delivery</SelectItem>
                  <SelectItem value="packaging-description">GFS Investigation: Please supply a description of the packaging, contents and value</SelectItem>
                  <SelectItem value="contact-number">GFS Investigation: Please supply consignee contact number</SelectItem>
                  <SelectItem value="redelivery">GFS Investigation: Redelivery requested</SelectItem>
                  <SelectItem value="searches-actioned">GFS Investigation: Searches being actioned. Awaiting carrier feedback</SelectItem>
                  <SelectItem value="awaiting-carrier">GFS Investigation: Awaiting carrier feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment to Customer */}
            <div className="space-y-1.5">
              <Label htmlFor="merge-customer-comment">Comment to Customer</Label>
              <Textarea
                id="merge-customer-comment"
                placeholder="Enter a comment to send to the customer..."
                rows={3}
                value={mergeCommentToCustomer}
                onChange={(e) => setMergeCommentToCustomer(e.target.value)}
              />
            </div>

            {/* Internal Comments */}
            <div className="space-y-1.5">
              <Label htmlFor="merge-internal-comments">Internal Comments</Label>
              <Textarea
                id="merge-internal-comments"
                placeholder="Enter internal comments (not visible to customer)..."
                rows={3}
                value={mergeInternalComments}
                onChange={(e) => setMergeInternalComments(e.target.value)}
              />
            </div>

            {/* Send Email checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="merge-send-email"
                checked={mergeSendEmail}
                onCheckedChange={(checked) => setMergeSendEmail(checked === true)}
              />
              <Label htmlFor="merge-send-email" className="cursor-pointer">
                Must email be sent to customer?
              </Label>
            </div>

            {/* Email addresses */}
            <div className="space-y-1.5">
              <Label htmlFor="merge-email">Email Address</Label>
              <Input
                id="merge-email"
                type="text"
                placeholder="Enter one or more email addresses, separated by commas..."
                value={mergeEmailAddresses}
                onChange={(e) => setMergeEmailAddresses(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate multiple addresses with commas.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMergeDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setMergeDialogOpen(false)}>Confirm Merge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close as Resolved Dialog */}
      <Dialog open={closeResolvedDialogOpen} onOpenChange={setCloseResolvedDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Close as Resolved</DialogTitle>
            <DialogDescription>
              Mark this ticket as resolved and optionally notify the customer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Resolution Category */}
            <div className="space-y-1.5">
              <Label htmlFor="close-resolved-category">Resolution Category</Label>
              <Select value={closeResolvedCategory} onValueChange={setCloseResolvedCategory}>
                <SelectTrigger id="close-resolved-category">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="address-query">GFS Investigation: Address Query</SelectItem>
                  <SelectItem value="awaiting-information">GFS Investigation: Awaiting information from</SelectItem>
                  <SelectItem value="customs">GFS Investigation: Customs require further information</SelectItem>
                  <SelectItem value="eta-requested">GFS Investigation: ETA requested from carrier. Awaiting feedback</SelectItem>
                  <SelectItem value="no-scan">GFS Investigation: No scan data, please confirm if label used</SelectItem>
                  <SelectItem value="parcel-damaged">GFS Investigation: Parcel damaged</SelectItem>
                  <SelectItem value="parcel-stolen">GFS Investigation: Parcel stolen</SelectItem>
                  <SelectItem value="claim">Sender to raise claim within carrier set timelimit</SelectItem>
                  <SelectItem value="part-delivery">GFS Investigation: Part delivery. Outstanding items due for delivery</SelectItem>
                  <SelectItem value="packaging-description">GFS Investigation: Please supply a description of the packaging, contents and value</SelectItem>
                  <SelectItem value="contact-number">GFS Investigation: Please supply consignee contact number</SelectItem>
                  <SelectItem value="redelivery">GFS Investigation: Redelivery requested</SelectItem>
                  <SelectItem value="searches-actioned">GFS Investigation: Searches being actioned. Awaiting carrier feedback</SelectItem>
                  <SelectItem value="awaiting-carrier">GFS Investigation: Awaiting carrier feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment to Customer */}
            <div className="space-y-1.5">
              <Label htmlFor="close-resolved-customer-comment">Comment to Customer</Label>
              <Textarea
                id="close-resolved-customer-comment"
                placeholder="Enter a comment to send to the customer..."
                rows={3}
                value={closeResolvedCommentToCustomer}
                onChange={(e) => setCloseResolvedCommentToCustomer(e.target.value)}
              />
            </div>

            {/* Internal Comments */}
            <div className="space-y-1.5">
              <Label htmlFor="close-resolved-internal-comments">Internal Comments</Label>
              <Textarea
                id="close-resolved-internal-comments"
                placeholder="Enter internal comments (not visible to customer)..."
                rows={3}
                value={closeResolvedInternalComments}
                onChange={(e) => setCloseResolvedInternalComments(e.target.value)}
              />
            </div>

            {/* Send Email checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="close-resolved-send-email"
                checked={closeResolvedSendEmail}
                onCheckedChange={(checked) => setCloseResolvedSendEmail(checked === true)}
              />
              <Label htmlFor="close-resolved-send-email" className="cursor-pointer">
                Must email be sent to customer?
              </Label>
            </div>

            {/* Email addresses */}
            <div className="space-y-1.5">
              <Label htmlFor="close-resolved-email">Email Address</Label>
              <Input
                id="close-resolved-email"
                type="text"
                placeholder="Enter one or more email addresses, separated by commas..."
                value={closeResolvedEmailAddresses}
                onChange={(e) => setCloseResolvedEmailAddresses(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate multiple addresses with commas.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCloseResolvedDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setCloseResolvedDialogOpen(false)}>Resolve Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Internal Notes Dialog */}
      <Dialog open={internalNotesDialogOpen} onOpenChange={(open) => { setInternalNotesDialogOpen(open); if (!open) setInternalNotesComment("") }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Internal Notes</DialogTitle>
            <DialogDescription>
              Add internal comments to this ticket. These are not visible to the customer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="internal-notes-comment">Internal Comments</Label>
            <Textarea
              id="internal-notes-comment"
              placeholder="Enter internal comments..."
              rows={6}
              value={internalNotesComment}
              onChange={(e) => setInternalNotesComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInternalNotesDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setInternalNotesDialogOpen(false)}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attach Items Dialog */}
      <Dialog open={attachDialogOpen} onOpenChange={setAttachDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Attach Items</DialogTitle>
            <DialogDescription>
              Upload files to attach to this ticket.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            {attachments.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Uploaded files:</p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <ImageIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttachDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAttachDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attachments Sheet */}
      <Sheet open={attachmentsSheetOpen} onOpenChange={setAttachmentsSheetOpen}>
        <SheetContent side="right" className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Attachments ({attachments.length})</SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-3 overflow-y-auto flex-1">
            {attachments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No attachments yet.</p>
            ) : (
              <div className="space-y-3">
                {attachments.map((file, index) => {
                  const isImage = /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(file.name) || file.type?.startsWith("image/")
                  return isImage ? (
                    <div key={index} className="rounded-lg border border-border overflow-hidden">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full object-contain max-h-64 bg-muted"
                      />
                      <div className="flex items-center gap-2 px-3 py-2 bg-card border-t border-border">
                        <ImageIcon className="h-4 w-4 shrink-0" style={{ color: "#009eff" }} />
                        <p className="text-sm font-medium text-foreground truncate flex-1">{file.name}</p>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#009eff] hover:underline shrink-0">Open</a>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-muted transition-colors group"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                        <FileText className="h-5 w-5" style={{ color: "#009eff" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">Click to open</p>
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
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
      <Icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#009eff" }} />
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground break-words">{value}</span>
      </div>
    </div>
  )
}
