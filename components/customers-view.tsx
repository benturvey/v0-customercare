"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { X, Pencil, Search, MapPin, Menu } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SKILL_LEVELS = ["L1", "L2", "L3", "L4", "MGM", "ADM"]

interface Customer {
  id: string
  company: string
  status?: "LIVE" | "TERM" | "TECH"
  accountManager: string
  contact: string
  telephone: string
  emails: string[]
  receiveEmails: boolean
  tickets: number
  customTags: string[]
  addressLine1?: string
  addressLine2?: string
  town?: string
  county?: string
  postcode?: string
  country?: string
}

const initialCustomers: Customer[] = [
  { id: "2684",  company: "11 DEGREES LIMITED",  status: "TERM",  accountManager: "",        contact: "", telephone: "", emails: [""], receiveEmails: false, tickets: "", customTags: [""] },
  { id: "3360",  company: "1973 LIMITED",     status: "TERM",      accountManager: "",           contact: "", telephone: "", emails: [""], receiveEmails: false, tickets: 0, customTags: [""] },
  { id: "3337",  company: "365 ENGINES",   status: "LIVE",   accountManager: "Mark Copeland",      contact: "", telephone: "", emails: [""], receiveEmails: false, tickets: 0, customTags: [""], addressLine1: "SAT PRO", addressLine2: "THE CUBE", town: "BOLTON", county: "GREATER MANCHESTER", postcode: "BL3 6BU", country: "GB" },
  { id: "615",  company: "3PL UK LIMITED",       status: "LIVE",           accountManager: "Mark Copeland",     contact: "", telephone: "01691 831332", emails: ["sales.channels@3pluk.co.uk; customer.service@3pluk.co.uk", "customer.service@3pluk.co.uk"], receiveEmails: true, tickets: 0, customTags: [] },
  { id: "3011",  company: "3PLUK VENLO",       status: "LIVE",             accountManager: "Mark Copeland",contact: "Sandra Nicholls", telephone: "01743 644174", emails: ["sales.channels@3pluk.co.uk"], receiveEmails: true, tickets: 1, customTags: [""] },
  { id: "3325",  company: "ABBOTT LYON LTD",     status: "LIVE",                        accountManager: "Simon Binns",           contact: "Antoine", telephone: "", emails: ["vicky.lomax@gfsdeliver.com"], receiveEmails: false, tickets: 14, customTags: ["L4"] },
  { id: "2528",  company: "BEAUTY BASE LIMITED",     status: "TECH",                        accountManager: "David Harding",           contact: "", telephone: "", emails: [""], receiveEmails: false, tickets: 0, customTags: [""] }
  ]

export function CustomersView({ onLogOut }: { onLogOut?: () => void }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [liveOnly, setLiveOnly] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [editSheetOpen, setEditSheetOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [editForm, setEditForm] = useState({
    status: "LIVE" as "LIVE" | "TERM" | "TECH",
    accountManager: "",
    contact: "",
    telephone: "",
    emails: [] as string[],
    receiveEmails: false,
    skillLevel: "",
  })
  const [newEmailInput, setNewEmailInput] = useState("")
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false)
  const [selectedCustomerForDetails, setSelectedCustomerForDetails] = useState<Customer | null>(null)

  const handleViewCustomerDetails = (customer: Customer) => {
    setSelectedCustomerForDetails(customer)
    setCustomerDetailsOpen(true)
  }

  const handleEditSkillLevel = (customerId: string) => {
    setEditingId(customerId)
  }

  const handleSkillLevelChange = (customerId: string, skillLevel: string) => {
    setCustomers(customers.map(c =>
      c.id === customerId
        ? { ...c, customTags: skillLevel ? [skillLevel] : [] }
        : c
    ))
    setEditingId(null)
  }

  const handleCloseEdit = () => {
    setEditingId(null)
  }

  const handleRemoveEmail = (customerId: string, emailIndex: number) => {
    setCustomers(customers.map(c =>
      c.id === customerId
        ? { ...c, emails: c.emails.filter((_, i) => i !== emailIndex) }
        : c
    ))
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setEditForm({
      status: customer.status ?? "LIVE",
      accountManager: customer.accountManager,
      contact: customer.contact,
      telephone: customer.telephone,
      emails: [...customer.emails],
      receiveEmails: customer.receiveEmails,
      skillLevel: customer.customTags[0] || "",
    })
    setNewEmailInput("")
    setEditSheetOpen(true)
  }

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c =>
        c.id === editingCustomer.id
          ? {
            ...c,
            status: editForm.status,
            accountManager: editForm.accountManager,
            contact: editForm.contact,
            telephone: editForm.telephone,
            emails: editForm.emails,
            receiveEmails: editForm.receiveEmails,
            customTags: editForm.skillLevel ? [editForm.skillLevel] : [],
          }
          : c
      ))
      setEditSheetOpen(false)
      setEditingCustomer(null)
    }
  }

  const handleAddEmailToForm = () => {
    if (newEmailInput.trim()) {
      setEditForm(prev => ({
        ...prev,
        emails: [...prev.emails, newEmailInput.trim()]
      }))
      setNewEmailInput("")
    }
  }

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      customer.company.toLowerCase().includes(query) ||
      customer.contact.toLowerCase().includes(query) ||
      customer.telephone.toLowerCase().includes(query) ||
      customer.emails.some(email => email.toLowerCase().includes(query))
    const matchesLive = !liveOnly || (customer.status ?? "LIVE") === "LIVE"
    return matchesSearch && matchesLive
  })

  const handleRemoveEmailFromForm = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page header bar */}
      <div className="flex items-center justify-between border-b pb-3 mb-6">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Customers</span>
        </div>
        <UserDropdownMenu userName="Jacquie Cadger" userRole="admin" userInitials="JA" onLogOut={onLogOut} />
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers by company, contact, telephone or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Switch
            id="live-only"
            checked={liveOnly}
            onCheckedChange={setLiveOnly}
          />
          <Label htmlFor="live-only" className="text-sm whitespace-nowrap cursor-pointer">
            Live Customers Only
          </Label>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">ID</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Company</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Account Manager</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Telephone</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Email</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Receive Emails</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Tickets</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-border last:border-b-0">
                <td className="py-4 px-4 text-sm text-muted-foreground">{customer.id}</td>
                <td className="py-4 px-4 text-sm font-medium text-foreground">{customer.company}</td>
                <td className="py-4 px-4 text-sm text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    (customer.status ?? "LIVE") === "LIVE"
                      ? "bg-green-100 text-green-800"
                      : (customer.status ?? "LIVE") === "TERM"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                  }`}>
                    {customer.status ?? "LIVE"}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-foreground">{customer.accountManager || "—"}</td>
                <td className="py-4 px-4 text-sm text-foreground">{customer.contact}</td>
                <td className="py-4 px-4 text-sm text-foreground">{customer.telephone}</td>
                <td className="py-4 px-4 text-sm text-foreground">
                  <div className="flex flex-wrap gap-1">
                    {customer.emails.map((email, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs"
                      >
                        {email}
                        <button
                          onClick={() => handleRemoveEmail(customer.id, index)}
                          className="hover:text-destructive"
                          title="Remove email"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {customer.emails.length === 0 && <span className="text-muted-foreground">—</span>}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-center text-foreground">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${customer.receiveEmails
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                    }`}>
                    {customer.receiveEmails ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-center text-foreground">{customer.tickets}</td>
                <td className="py-4 px-4 text-sm text-center">
                  {editingId === customer.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <Select
                        value={customer.customTags[0] || ""}
                        onValueChange={(value) => handleSkillLevelChange(customer.id, value)}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {SKILL_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={handleCloseEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                      customer.customTags[0] === "L4" ? "bg-purple-100 text-purple-800" :
                      customer.customTags[0] === "L3" ? "bg-blue-100 text-blue-800" :
                      customer.customTags[0] === "L2" ? "bg-green-100 text-green-800" :
                      customer.customTags[0] === "L1" ? "bg-gray-100 text-gray-800" :
                      customer.customTags[0] === "MGM" ? "bg-orange-100 text-orange-800" :
                      customer.customTags[0] === "ADM" ? "bg-red-100 text-red-800" :
                      "text-muted-foreground"
                    }`}>
                      {customer.customTags.length > 0 && customer.customTags[0]
                        ? customer.customTags[0]
                        : "—"}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {(customer.status ?? "LIVE") !== "TERM" && (
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEditCustomer(customer)}
                        title="Edit customer"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleViewCustomerDetails(customer)}
                        title="View address"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Customer Sheet */}
      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent className="w-[440px] sm:w-[600px] px-6">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold text-[#1e3a5f]">Edit Customer Details</SheetTitle>
          </SheetHeader>

          {editingCustomer && (
            <div className="space-y-6 mt-6">
              {/* Company (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={editingCustomer.company}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value as "LIVE" | "TERM" | "TECH" }))}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LIVE">LIVE</SelectItem>
                    <SelectItem value="TERM">TERM</SelectItem>
                    <SelectItem value="TECH">TECH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Account Manager */}
              <div className="space-y-2">
                <Label htmlFor="accountManager">Account Manager</Label>
                <Input
                  id="accountManager"
                  value={editForm.accountManager}
                  onChange={(e) => setEditForm(prev => ({ ...prev, accountManager: e.target.value }))}
                  placeholder="Enter account manager"
                />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={editForm.contact}
                  onChange={(e) => setEditForm(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Enter contact name"
                />
              </div>

              {/* Telephone */}
              <div className="space-y-2">
                <Label htmlFor="telephone">Telephone</Label>
                <Input
                  id="telephone"
                  value={editForm.telephone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, telephone: e.target.value }))}
                  placeholder="Enter telephone number"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editForm.emails.map((email, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted rounded-md text-sm"
                    >
                      {email}
                      <button
                        onClick={() => handleRemoveEmailFromForm(index)}
                        className="hover:text-destructive"
                        title="Remove email"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="Enter email address"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddEmailToForm()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={handleAddEmailToForm}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Receive Emails */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="receiveEmails"
                  checked={editForm.receiveEmails}
                  onCheckedChange={(checked) =>
                    setEditForm(prev => ({ ...prev, receiveEmails: checked === true }))
                  }
                />
                <Label htmlFor="receiveEmails" className="cursor-pointer">
                  Receive Emails
                </Label>
              </div>

              {/* Skill Level */}
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select
                  value={editForm.skillLevel}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, skillLevel: value }))}
                >
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSaveCustomer}
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditSheetOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Customer Address Sheet */}
      <Sheet
        open={customerDetailsOpen}
        onOpenChange={(open) => {
          setCustomerDetailsOpen(open)
          if (!open) setSelectedCustomerForDetails(null)
        }}
      >
        <SheetContent className="w-[440px] sm:w-[600px] px-6">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold text-[#1e3a5f]">Customer Address</SheetTitle>
          </SheetHeader>

          {selectedCustomerForDetails && (
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" value={selectedCustomerForDetails.addressLine1 ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" value={selectedCustomerForDetails.addressLine2 ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="town">Town</Label>
                <Input id="town" value={selectedCustomerForDetails.town ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Input id="county" value={selectedCustomerForDetails.county ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input id="postcode" value={selectedCustomerForDetails.postcode ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={selectedCustomerForDetails.country ?? ""} readOnly />
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
