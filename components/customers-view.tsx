"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { X, Pencil, Search, MoreVertical } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomerDetailsModal } from "@/components/customer-details-modal"

const SKILL_LEVELS = ["L1", "L2", "L3", "L4", "MGM", "ADM"]

interface Customer {
  id: string
  company: string
  accountManager: string
  contact: string
  telephone: string
  emails: string[]
  receiveEmails: boolean
  tickets: number
  customTags: string[]
}

const initialCustomers: Customer[] = [
  { id: "1",  company: "ABBOTT LYON LTD",                          accountManager: "Vicky Lomax",        contact: "", telephone: "", emails: ["vicky.lomax@gfsdeliver.com"], receiveEmails: false, tickets: 32, customTags: [""] },
  { id: "2",  company: "ANDERTONS MUSIC COMPANY",                  accountManager: "Ben Lund",           contact: "Customer Service Team", telephone: "01483477162", emails: ["help@andertons.co.uk"], receiveEmails: true, tickets: 5, customTags: ["L4"] },
  { id: "3",  company: "CASTLES TECHNOLOGY UK & IRELAND LTD",      accountManager: "Tracey Crooke",      contact: "", telephone: "0871 3020213", emails: ["support-centre@castlestech.com"], receiveEmails: true, tickets: 5, customTags: ["L4"] },
  { id: "4",  company: "CREW CLOTHING CO LIMITED",                  accountManager: "Francine Payne",     contact: "Charlie Eaves", telephone: "+44 7525 594149", emails: ["helen.collett@crewclothing.co.uk", "josh.harwood@crewclothing.co.uk"], receiveEmails: true, tickets: 2, customTags: [] },
  { id: "5",  company: "FENWICK",                                   accountManager: "Kimberley McCormick",contact: "Jenny Brooks", telephone: "0208 546 1001", emails: ["Customerserviceinternal@fenwick.co.uk", "Eloisemcgurk@fenwick.co.uk"], receiveEmails: true, tickets: 30, customTags: [""] },
  { id: "6",  company: "FINNING UK LTD",                            accountManager: "Ben Lund",           contact: "Amy Maguire", telephone: "07716097906", emails: ["GFSPartsQueries@finning.com "], receiveEmails: true, tickets: 30, customTags: ["L4"] },
  { id: "7",  company: "MAMAS & PAPAS",                             accountManager: "Tracey Crooke",      contact: "", telephone: "01484 438394", emails: ["deliveries@mamasandpapas.com"], receiveEmails: false, tickets: 30, customTags: [] },
  { id: "8",  company: "OKA DIRECT LIMITED",                        accountManager: "Vicky Lomax",        contact: "Christopher Ferguson", telephone: "01235433933", emails: ["customerservice@oka.com"], receiveEmails: true, tickets: 8, customTags: [] },
  { id: "9",  company: "ROBERT WELCH DESIGNS LIMITED",              accountManager: "Francine Payne",     contact: "John Wright", telephone: "01386 840880", emails: ["help@robertwelch.com", "sales@robertwelch.com"], receiveEmails: true, tickets: 5, customTags: [] },
  { id: "10", company: "SERVICE LOGISTICS",                          accountManager: "Ben Lund",           contact: "", telephone: "03456200000", emails: ["customer.service@servicelogistics.co.uk"], receiveEmails: true, tickets: 1, customTags: [] },
  { id: "11", company: "SMEG (UK) LIMITED",                         accountManager: "Kimberley McCormick",contact: "Debra Spinks", telephone: "", emails: ["operations@smeguk.com", "support@smeguk.com"], receiveEmails: true, tickets: 2, customTags: [] },
  { id: "12", company: "THE CAMBIUM GROUP UK HOLDINGS LIMITED",     accountManager: "Tracey Crooke",      contact: "Lauren Pound", telephone: "01225615141", emails: ["lauren@thecambiumgroup.co.uk"], receiveEmails: false, tickets: 10, customTags: [""] },
]

export function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [editSheetOpen, setEditSheetOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [editForm, setEditForm] = useState({
    contact: "",
    telephone: "",
    emails: [] as string[],
    receiveEmails: false,
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
      contact: customer.contact,
      telephone: customer.telephone,
      emails: [...customer.emails],
      receiveEmails: customer.receiveEmails,
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
            contact: editForm.contact,
            telephone: editForm.telephone,
            emails: editForm.emails,
            receiveEmails: editForm.receiveEmails,
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
    return (
      customer.company.toLowerCase().includes(query) ||
      customer.contact.toLowerCase().includes(query) ||
      customer.telephone.toLowerCase().includes(query) ||
      customer.emails.some(email => email.toLowerCase().includes(query))
    )
  })

  const handleRemoveEmailFromForm = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Customers</h1>
      </header>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers by company, contact, telephone or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Company</th>
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
                <td className="py-4 px-4 text-sm font-medium text-foreground">{customer.company}</td>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      if (customer.company === "ABBOTT LYON LTD") {
                        handleViewCustomerDetails(customer)
                      }
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Customer Sheet */}
      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[500px]">
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

      {/* Customer Details Modal */}
      {selectedCustomerForDetails && (
        <CustomerDetailsModal
          open={customerDetailsOpen}
          onClose={() => {
            setCustomerDetailsOpen(false)
            setSelectedCustomerForDetails(null)
          }}
          customer={selectedCustomerForDetails}
        />
      )}
    </div>
  )
}
