"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
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
  Weight,
  Warehouse,
  Hash,
  Zap,
  ExternalLink,
  Info,
  BookOpen,
  AlertTriangle,
  ClipboardList,
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
  const [infoMenuOpen, setInfoMenuOpen] = useState(false)
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
  const [deliveryAddressModalOpen, setDeliveryAddressModalOpen] = useState(false)
  const [escalateDialogOpen, setEscalateDialogOpen] = useState(false)
  const [escalateLevel, setEscalateLevel] = useState("")
  const [escalatePerson, setEscalatePerson] = useState("")
  const [escalateReason, setEscalateReason] = useState("")
  const [escalationEntries, setEscalationEntries] = useState<Array<{ agent: string; date: string; text: string }>>([])
  const [internalNoteEntries, setInternalNoteEntries] = useState<Array<{ agent: string; date: string; text: string }>>([])
  const [snoozeEntries, setSnoozeEntries] = useState<Array<{ agent: string; date: string; reason: string }>>([])

  const [snoozeDialogOpen, setSnoozeDialogOpen] = useState(false)
  const [snoozeReason, setSnoozeReason] = useState("")
  const [snoozeUntilDate, setSnoozeUntilDate] = useState("")
  const [snoozeUntilTime, setSnoozeUntilTime] = useState("09:00")

  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyResponseCategory, setReplyResponseCategory] = useState("")
  const [replyCommentToCustomer, setReplyCommentToCustomer] = useState("")
  const [replyInternalComments, setReplyInternalComments] = useState("")
  const [replySendEmail, setReplySendEmail] = useState(true)
  const [replyEmailAddresses, setReplyEmailAddresses] = useState("")

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
  const [conversationFilter, setConversationFilter] = useState<"all" | "customer">("all")

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
    { ticketNo: "#4712301", raisedDate: "04/05/2026 09:15", raisedBy: "CS Team",   status: "Open", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4718844", raisedDate: "04/05/2026 11:42", raisedBy: "CS Team",   status: "Reviewing",  category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4721009", raisedDate: "05/05/2026 08:30", raisedBy: "Jane Doe",  status: "Deferred",   category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4724115", raisedDate: "05/05/2026 10:05", raisedBy: "CS Team",   status: "Open", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4726830", raisedDate: "05/05/2026 11:17", raisedBy: "Mark Smith",status: "Reviewing",  category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4729442", raisedDate: "05/05/2026 13:50", raisedBy: "CS Team",   status: "Deferred",   category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4731067", raisedDate: "06/05/2026 08:22", raisedBy: "Jane Doe",  status: "Open", category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4733298", raisedDate: "06/05/2026 09:44", raisedBy: "CS Team",   status: "Reviewing",  category: "WHERE_IS_MY_PARCEL" },
    { ticketNo: "#4735814", raisedDate: "06/05/2026 11:30", raisedBy: "Mark Smith",status: "Open", category: "WHERE_IS_MY_PARCEL" },
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Ticket {ticket.id}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Open
            </span>
          </div>

          {/* Info icon with dropdown */}
          <div className="relative">
            <button
              onClick={() => setInfoMenuOpen((prev) => !prev)}
              className="flex items-center justify-center h-8 w-8 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Resources"
            >
              <BookOpen className="h-4 w-4 text-[#009eff]" />
            </button>

            {infoMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setInfoMenuOpen(false)} />
                <div className="absolute right-0 top-10 z-50 w-72 rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                  {/* Knowledge Articles */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Knowledge Articles</p>
                    <ul className="space-y-1.5">
                      <li>
                        <a href="#" className="flex items-center gap-2 text-sm text-[#009eff] hover:text-blue-700 transition-colors">
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          How to handle missing parcels
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 text-sm text-[#009eff] hover:text-blue-700 transition-colors">
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          Evri delivery delay process
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 text-sm text-[#009eff] hover:text-blue-700 transition-colors">
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          Customer refund &amp; resolution policy
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Carrier Contact Details */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Carrier Contact Details</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="font-medium">03444 113019</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <a href="mailto:csclientsupport@hermes-europe.co.uk" className="hover:underline">csclientsupport@hermes-europe.co.uk</a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <a href="https://www.hermes-europe.co.uk/webtracking/login.html" target="_blank" rel="noopener noreferrer" className="text-[#009eff] hover:text-blue-700 transition-colors">
                          hermes-europe.co.uk
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ClipboardList className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>Use email only when Webform is not available</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Alerts */}
                  <div className="px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Service Alerts</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 px-2.5 py-2">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
                        <p className="text-xs text-amber-800">Evri are experiencing delays in the North West region. Expected resolution 17/05/2026.</p>
                      </div>
                      <div className="flex items-start gap-2 rounded-md bg-blue-50 border border-blue-200 px-2.5 py-2">
                        <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-600" />
                        <p className="text-xs text-blue-800">Bank Holiday impact: reduced collections on 26/05/2026.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
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

      {/* Two-column layout: main content + right sidebar */}
      <div className="flex gap-6 items-start">

        {/* Main content column */}
        <div className="flex-1 min-w-0">

      <div className="rounded-lg border border-border bg-card p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
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
        <div className="flex gap-4">
          {/* Summary card */}
          <div className="rounded-lg border border-border bg-muted/40 p-3 flex-shrink-0 w-64 space-y-2.5">
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Customer</p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-[#1e3a5f]">LISA ELDRIDGE</p>
                <button
                  onClick={() => setCustomerContactDialogOpen(true)}
                  className="text-[#009eff] hover:text-blue-700 transition-colors"
                  aria-label="View customer contact details"
                >
                  <UserCircle className="h-4 w-4" />
                </button>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-700">
                  Focus Account
                </span>
              </div>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Category</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">WHERE_IS_MY_PARCEL</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Raised by</p>
              <p className="text-sm font-semibold text-[#1e3a5f]">CS Team (support@lisaeldridge.com)</p>
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

      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Customer Conversation */}
        <div>
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#1e3a5f]">Conversation</h2>
            </div>
            <div className="flex items-center gap-2 border border-border rounded-md mb-4 w-fit">
              <button
                onClick={() => setConversationFilter("all")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded transition-colors",
                  conversationFilter === "all"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All Conversations
              </button>
              <button
                onClick={() => setConversationFilter("customer")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded transition-colors",
                  conversationFilter === "customer"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Customer Conversations
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-medium text-foreground">Legend:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs border border-blue-200 bg-blue-50 rounded text-[#1e3a5f]">Text</span>
                  <span className="text-xs text-muted-foreground">Customer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs border border-border bg-white rounded text-[#1e3a5f]">Text</span>
                  <span className="text-xs text-muted-foreground">Team &amp; Exceptions</span>
                </div>
              </div>
            </div>
            {conversationFilter === "all" && (
            <div className="rounded-lg border border-blue-100 bg-white p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">Agent - OZ-USER</span>
                <span className="text-xs text-muted-foreground">06/05/2026 09:49</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Good morning, Evri are still experiencing delays. We apologise for the inconvenience and will continue to monitor. Kind regards -GFS Customer Care
              </p>
            </div>
            )}
            {(conversationFilter === "all" || conversationFilter === "customer") && (
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 mb-3">
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
            )}
            {conversationFilter === "all" && (
            <div className="rounded-lg border border-blue-100 bg-white p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1e3a5f]">Agent - OZ-USER</span>
                <span className="text-xs text-muted-foreground">05/05/2026 15:49</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Hello, Thanks for contacting GFS. I am sorry to advise the parcel has missed connection to the courier which has caused a delay. Evri are aiming to get this parcel back on track to your customer as soon as possible. We will check for further scans and update you daily. Kind regards -GFS Customer Care
              </p>
            </div>
            )}
            {(conversationFilter === "all" || conversationFilter === "customer") && (
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 mb-3">
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
            )}
            <button className="w-full text-center text-sm text-[#009eff] hover:text-blue-700 font-medium transition-colors py-2 border-t border-blue-100">
              View More
            </button>
          </div>
        </div>

        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4">

        {/* Actions */}
        <div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Actions</h2>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setAttachDialogOpen(true)}>
                <Paperclip className="h-4 w-4" style={{ color: "#009eff" }} />
                Attach Items
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setDeferDialogOpen(true)}>
                <PauseCircle className="h-4 w-4" style={{ color: "#009eff" }} />
                Defer (Awaiting Carrier)
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setReviewDialogOpen(true)}>
                <Eye className="h-4 w-4" style={{ color: "#009eff" }} />
                Review (Conditional)
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setSnoozeDialogOpen(true)}>
                <AlarmClock className="h-4 w-4" style={{ color: "#009eff" }} />
                Snooze Ticket
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setEscalateDialogOpen(true)}>
                <ArrowUpCircle className="h-4 w-4" style={{ color: "#009eff" }} />
                Escalate
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setMergeDialogOpen(true)}>
                <Link2 className="h-4 w-4" style={{ color: "#009eff" }} />
                Link Tickets
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setInternalNotesDialogOpen(true)}>
                <StickyNote className="h-4 w-4" style={{ color: "#009eff" }} />
                Add Internal Notes
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-left" onClick={() => setCloseResolvedDialogOpen(true)}>
                <CheckCircle2 className="h-4 w-4" style={{ color: "#009eff" }} />
                Resolve (Close ticket)
              </Button>
            </div>
          </div>
        </div>

        {/* Next Best Action */}
        <div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Next Best Action</h2>
            <div className="flex items-start gap-2 mb-2">
              <Zap className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-blue-800">Chase carrier for update</p>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Consignment has been delayed beyond SLA. Contact Evri for a status update and relay to the customer within 2 hours.
            </p>
          </div>
        </div>

      </div>

      </div>

      <div className="flex flex-col gap-4 mb-6">

        {/* Card 1 — Shipment Summary */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Shipment Details</h2>
          <div className="grid gap-2.5">
            <div className="grid grid-cols-5 gap-2.5">
              <div className="flex items-start gap-2">
                <img src="/evri-logo.png" alt="Evri" className="h-4 w-8 shrink-0 mt-0.5" />
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-xs text-muted-foreground">Carrier</span>
                  <span className="text-sm font-medium text-foreground break-words">EVRI</span>
                </div>
              </div>
              <DetailRow icon={Layers}       label="Service"        value="2 DAY SERVICE" />
              <DetailRow icon={CalendarDays} label="Insert Date"    value="29/04/2026" />
              <DetailRow icon={CalendarDays} label="Despatched"     value="30/04/2026" />
              <DetailRow icon={Tag}          label="Consignment No"  value="T06XUA0000734531" />
            </div>
            <div className="grid grid-cols-5 gap-2.5">
              <DetailRow icon={Package}      label="Total Parcels"      value="1" />
              <DetailRow icon={Weight}       label="Weight"             value="0.17" />
              <DetailRow icon={FileText}     label="Shipment Ref"       value="BM21437818" />
              <DetailRow icon={Warehouse}    label="Origin Depot"       value="DEPOT=AIR=84" />
              <DetailRow icon={MapPin}       label="Destination Depot"  value="VAN=86=86" />
            </div>
            <div className="grid grid-cols-5 gap-2.5">
              <DetailRow icon={Hash}         label="Account No"         value="303" />
              <DetailRow icon={FileText}     label="Contract No"        value="1RY010" />
              <DetailRow icon={MessageSquare} label="Contract Comment"   value="Hermes POD" />
              <DetailRow icon={Package}      label="Content"            value="Cosmetics" />
              <div className="flex items-start gap-2">
                <img src="https://flagcdn.com/w20/gb.png" alt="UK flag" className="h-3.5 w-5 shrink-0 mt-0.5 rounded-sm object-cover" />
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-xs text-muted-foreground">Destination</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground">RUTHERGLEN, G73 4LZ</span>
                    <button
                      onClick={() => setDeliveryAddressModalOpen(true)}
                      className="text-[#009eff] hover:text-blue-700 transition-colors"
                      aria-label="View delivery address details"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2.5">
              <DetailRow icon={Package}  label="Collection Id"           value="12345678" />
              <DetailRow icon={Hash}     label="Alternate Tracking No's" value="N/A" />
              <DetailRow icon={FileText} label="Consignment Ref"         value="BM21437818" />
              <DetailRow icon={User}     label="Sender"                  value="LISAUK" />
              <DetailRow icon={CalendarDays} label="EDD" value={<span className="font-bold text-amber-500">02/05/2026</span>} />
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              <DetailRow icon={ClipboardList} label="Instructions" value="Leave in porch if no answer. Do not leave with neighbour." />
            </div>
          </div>
        </div>

      </div>
      {/* Tracking */}
      <div className="rounded-lg border border-border bg-card p-4 mb-6">
        <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Tracking</h2>
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
              Parcels
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
              Tracking
            </button>
          </div>
          {trackingView === "timeline" && (
            <a
              href="https://www.evri.com/track-a-parcel"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1.5 text-sm font-medium text-[#009eff] hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View on Carrier Site
            </a>
          )}
        </div>

        {trackingView === "list" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Item No</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Parcel No</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Carrier & Service</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Latest Scan</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider whitespace-nowrap">Latest Update</th>
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
                    <p className="text-sm font-medium mt-2" style={{ color: "#009eff" }}>
                      UNABLE TO DELIVER; WILL RE-SCHEDULED DELIVERY
                    </p>
                  </td>
                  <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">04/04/2026 14:03</td>
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
                  <td className="px-3 py-3 text-sm text-muted-foreground">���</td>
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

        {/* Defer (Awaiting Carrier) Dialog */}
        <Dialog open={deferDialogOpen} onOpenChange={setDeferDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Defer (Awaiting Carrier)</DialogTitle>
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

      {/* Escalate Dialog */}
      <Dialog open={escalateDialogOpen} onOpenChange={(open) => { setEscalateDialogOpen(open); if (!open) { setEscalateLevel(""); setEscalatePerson("") } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escalate Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Escalate to Level</label>
              <select
                value={escalateLevel}
                onChange={(e) => setEscalateLevel(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select level...</option>
                <option value="L2">L2 - Specialist</option>
                <option value="L3">L3 - Senior Specialist</option>
                <option value="L4">L4 - Team Lead</option>
                <option value="L5">L5 - Manager</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Escalate to Person</label>
              <select
                value={escalatePerson}
                onChange={(e) => setEscalatePerson(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select person...</option>
                <option value="agent1">Agent - OZ-USER</option>
                <option value="agent2">Agent - CS-USER</option>
                <option value="agent3">Agent - SR-USER</option>
                <option value="teamlead">Team Lead - TL-USER</option>
                <option value="manager">Manager - MG-USER</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Reason for Escalation</label>
              <textarea
                value={escalateReason}
                onChange={(e) => setEscalateReason(e.target.value)}
                placeholder="Enter reason for escalation..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEscalateDialogOpen(false)}>Cancel</Button>
            <Button
              disabled={!escalateLevel && !escalatePerson}
              onClick={() => {
                const now = new Date()
                const formattedDate = now.toLocaleDateString("en-GB") + " " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                const newEntry = {
                  agent: "Jacquie Cadger",
                  date: formattedDate,
                  text: `Escalated to ${escalateLevel || "Management"} as requested by my senior advisor Tracey${escalateReason ? `. Reason: ${escalateReason}` : ""}`
                }
                setEscalationEntries([newEntry, ...escalationEntries])
                setEscalateDialogOpen(false)
                setEscalateLevel("")
                setEscalatePerson("")
                setEscalateReason("")
              }}
              style={{ backgroundColor: "#009eff", color: "#fff" }}
            >
              Escalate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Snooze Ticket Dialog */}
      <Dialog open={snoozeDialogOpen} onOpenChange={(open) => {
        setSnoozeDialogOpen(open)
        if (!open) { setSnoozeReason(""); setSnoozeUntilDate(""); setSnoozeUntilTime("09:00") }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Snooze Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Snooze Reason</label>
              <select
                value={snoozeReason}
                onChange={(e) => setSnoozeReason(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select reason...</option>
                <option value="carrier_closed">Carrier Closed</option>
                <option value="weekend">Weekend</option>
                <option value="bank_holiday">Bank Holiday</option>
                <option value="out_of_hours">Out of Hours</option>
                <option value="awaiting_customer">Awaiting Customer Response</option>
              </select>
            </div>
            {snoozeReason && snoozeReason !== "awaiting_customer" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Snooze Until (Date)</label>
                  <input
                    type="date"
                    value={snoozeUntilDate}
                    onChange={(e) => setSnoozeUntilDate(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Time</label>
                  <input
                    type="time"
                    value={snoozeUntilTime}
                    onChange={(e) => setSnoozeUntilTime(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setSnoozeDialogOpen(false)}>Cancel</Button>
            <Button
              disabled={!snoozeReason}
              onClick={() => {
                if (snoozeReason) {
                  let dateTimeString = ""
                  if (snoozeReason !== "awaiting_customer" && snoozeUntilDate && snoozeUntilTime) {
                    const dateObj = new Date(snoozeUntilDate)
                    dateTimeString = dateObj.toLocaleDateString("en-GB") + " " + snoozeUntilTime
                  } else {
                    const now = new Date()
                    dateTimeString = now.toLocaleDateString("en-GB") + " " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                  }
                  
                  const reasonLabels: { [key: string]: string } = {
                    carrier_closed: "Carrier Closed",
                    weekend: "Weekend",
                    bank_holiday: "Bank Holiday",
                    out_of_hours: "Out of Hours",
                    awaiting_customer: "Awaiting Customer Response"
                  }
                  
                  const newEntry = {
                    agent: "Jacquie Cadger",
                    date: dateTimeString,
                    reason: reasonLabels[snoozeReason] || snoozeReason
                  }
                  setSnoozeEntries([newEntry, ...snoozeEntries])
                  setSnoozeDialogOpen(false)
                  setSnoozeReason("")
                  setSnoozeUntilDate("")
                  setSnoozeUntilTime("09:00")
                }
              }}
              style={{ backgroundColor: "#009eff", color: "#fff" }}
            >
              Snooze
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply to Customer Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={(open) => { 
        setReplyDialogOpen(open)
        if (!open) {
          setReplyResponseCategory("")
          setReplyCommentToCustomer("")
          setReplyInternalComments("")
          setReplySendEmail(true)
          setReplyEmailAddresses("")
        }
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Reply to Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Response Category</label>
              <select
                value={replyResponseCategory}
                onChange={(e) => setReplyResponseCategory(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select category...</option>
                <option value="address_query">GFS Investigation: Address Query</option>
                <option value="awaiting_info">GFS Investigation: Awaiting information from</option>
                <option value="customs_info">GFS Investigation: Customs require further information</option>
                <option value="eta_requested">GFS Investigation: ETA requested from carrier. Awaiting feedback</option>
                <option value="no_scan_data">GFS Investigation: No scan data, please confirm if label used</option>
                <option value="parcel_damaged">GFS Investigation: Parcel damaged</option>
                <option value="parcel_stolen">GFS Investigation: Parcel stolen, Sender to raise claim within carrier set timelimit</option>
                <option value="part_delivery">GFS Investigation: Part delivery. Outstanding items due for delivery</option>
                <option value="packaging_desc">GFS Investigation: Please supply a description of the packaging, contents and value</option>
                <option value="contact_number">GFS Investigation: Please supply consignee contact number</option>
                <option value="redelivery">GFS Investigation: Redelivery requested</option>
                <option value="searches">GFS Investigation: Searches being actioned. Awaiting carrier feedback</option>
                <option value="awaiting_carrier">GFS Investigation: Awaiting carrier feedback</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Comment to Customer</label>
              <textarea
                value={replyCommentToCustomer}
                onChange={(e) => setReplyCommentToCustomer(e.target.value)}
                placeholder="Enter comment to customer..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                rows={4}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Internal Comments</label>
              <textarea
                value={replyInternalComments}
                onChange={(e) => setReplyInternalComments(e.target.value)}
                placeholder="Enter internal comments..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="replySendEmail"
                checked={replySendEmail}
                onChange={(e) => setReplySendEmail(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="replySendEmail" className="text-sm font-medium text-foreground">
                Must email be sent to customer?
              </label>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email Address(es)</label>
              <textarea
                value={replyEmailAddresses}
                onChange={(e) => setReplyEmailAddresses(e.target.value)}
                placeholder="Enter email addresses (one per line or comma-separated)..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => setReplyDialogOpen(false)}
              style={{ backgroundColor: "#009eff", color: "#fff" }}
            >
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Address Modal */}
      {deliveryAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeliveryAddressModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-base font-semibold text-[#1e3a5f]">Delivery Address</h2>
              <button
                onClick={() => setDeliveryAddressModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Company</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">CAROLINE BRILLANT</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Contact</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">CAROLINE BRILLANT</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Contact Phone</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">07927140269</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Contact Email</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">SISTERBRILLANT@YAHOO.CO.UK</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Address Line 1</p>
                <p className="text-sm font-medium text-[#1e3a5f]">0/1 (GROUND LEFT)</p>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Address Line 2</p>
                <p className="text-sm font-medium text-[#1e3a5f]">9 ROWANTREE AVENUE</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Town/City</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">RUTHERGLEN</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">County</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">SCT</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Postcode</p>
                  <p className="text-sm font-medium text-[#1e3a5f]">G73 4LZ</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Country</p>
                <p className="text-sm font-medium text-[#1e3a5f]">UNITED KINGDOM</p>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t">
              <Button variant="outline" onClick={() => setDeliveryAddressModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

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

        {/* Link Tickets Dialog */}
        <Dialog open={mergeDialogOpen} onOpenChange={(open) => { setMergeDialogOpen(open); if (!open) setMergeMatchesFound(false) }}>
          <DialogContent className="sm:max-w-5xl">
            <DialogHeader>
              <DialogTitle>Link Tickets</DialogTitle>
            <DialogDescription>
              Find related tickets based on match criteria
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
                size="sm"
                onClick={() => setMergeMatchesFound(true)}
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Find Matches
              </Button>
            </div>

            {/* Matched tickets table */}
            <div className="space-y-2">
              <Label>Matched Tickets</Label>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="overflow-y-auto" style={{ maxHeight: "calc(8 * 41px + 41px)" }}>
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
                            t.status === "Open" ? "bg-gray-100 text-gray-700" :
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
            </div>

            {/* Reason for merge */}
            <div className="space-y-1.5">
              <Label htmlFor="merge-reason">Reason for Ticket Linking</Label>
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
            <Button onClick={() => setMergeDialogOpen(false)}>Confirm Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* Resolve (Close ticket) Dialog */}
        <Dialog open={closeResolvedDialogOpen} onOpenChange={setCloseResolvedDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Resolve (Close ticket)</DialogTitle>
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
            <Button onClick={() => {
              if (internalNotesComment.trim()) {
                const now = new Date()
                const formattedDate = now.toLocaleDateString("en-GB") + " " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                const newEntry = {
                  agent: "Jacquie Cadger",
                  date: formattedDate,
                  text: internalNotesComment
                }
                setInternalNoteEntries([newEntry, ...internalNoteEntries])
                setInternalNotesDialogOpen(false)
                setInternalNotesComment("")
              }
            }}>Save Note</Button>
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
