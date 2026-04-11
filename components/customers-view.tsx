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
import { X, Pencil } from "lucide-react"

interface Customer {
  id: string
  company: string
  contact: string
  telephone: string
  emails: string[]
  receiveEmails: boolean
  tickets: number
  customTags: string[]
}

const initialCustomers: Customer[] = [
  { id: "1", company: "ABBOTT LYON LTD", contact: "", telephone: "", emails: ["vicky.lomax@gfsdeliver.com"], receiveEmails: false, tickets: 32, customTags: [""] },
  { id: "2", company: "ANDERTONS MUSIC COMPANY", contact: "Customer Service Team", telephone: "01483477162", emails: ["help@andertons.co.uk"], receiveEmails: true, tickets: 5, customTags: ["L4"] },
  { id: "2", company: "CASTLES TECHNOLOGY UK & IRELAND LTD", contact: "", telephone: "0871 3020213", emails: ["support-centre@castlestech.com"], receiveEmails: true, tickets: 5, customTags: ["L4"] },
  { id: "2", company: "CREW CLOTHING CO LIMITED", contact: "Charlie Eaves", telephone: "+44 7525 594149", emails: ["helen.collett@crewclothing.co.uk", "josh.harwood@crewclothing.co.uk"], receiveEmails: true, tickets: 2, customTags: [] },
  { id: "3", company: "FENWICK", contact: "Jenny Brooks", telephone: "0208 546 1001", emails: ["Customerserviceinternal@fenwick.co.uk", "Eloisemcgurk@fenwick.co.uk"], receiveEmails: true, tickets: 30, customTags: [""] },
  { id: "3", company: "FINNING UK LTD", contact: "Amy Maguire", telephone: "07716097906", emails: ["GFSPartsQueries@finning.com "], receiveEmails: true, tickets: 30, customTags: ["L4"] },
  { id: "3", company: "MAMAS & PAPAS", contact: "", telephone: "01484 438394", emails: ["deliveries@mamasandpapas.com"], receiveEmails: false, tickets: 30, customTags: [] },
  { id: "4", company: "OKA DIRECT LIMITED", contact: "Christopher Ferguson", telephone: "01235433933", emails: ["customerservice@oka.com"], receiveEmails: true, tickets: 8, customTags: [] },
  { id: "5", company: "ROBERT WELCH DESIGNS LIMITED", contact: "John Wright", telephone: "01386 840880", emails: ["help@robertwelch.com", "sales@robertwelch.com"], receiveEmails: true, tickets: 5, customTags: [] },
  { id: "6", company: "SERVICE LOGISTICS", contact: "", telephone: "03456200000", emails: ["customer.service@servicelogistics.co.uk"], receiveEmails: true, tickets: 1, customTags: [] },
  { id: "7", company: "SMEG (UK) LIMITED", contact: "Debra Spinks", telephone: "", emails: ["operations@smeguk.com", "support@smeguk.com"], receiveEmails: true, tickets: 2, customTags: [] },
  { id: "8", company: "THE CAMBIUM GROUP UK HOLDINGS LIMITED", contact: "Lauren Pound", telephone: "01225615141", emails: ["lauren@thecambiumgroup.co.uk"], receiveEmails: false, tickets: 10, customTags: ["routing: focus"] },
]

export function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
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

  const handleEditTags = (customerId: string) => {
    setEditingId(customerId)
    setTagInput("")
  }

  const handleSaveTags = (customerId: string) => {
    if (tagInput.trim()) {
      setCustomers(customers.map(c =>
        c.id === customerId
          ? { ...c, customTags: [...c.customTags, tagInput.trim()] }
          : c
      ))
    }
    setTagInput("")
  }

  const handleRemoveTag = (customerId: string, tagIndex: number) => {
    setCustomers(customers.map(c =>
      c.id === customerId
        ? { ...c, customTags: c.customTags.filter((_, i) => i !== tagIndex) }
        : c
    ))
  }

  const handleCloseEdit = () => {
    setEditingId(null)
    setTagInput("")
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

      <div className="bg-card rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Company</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Telephone</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Email</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Receive Emails</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Tickets</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Custom Tags</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-border last:border-b-0">
                <td className="py-4 px-4 text-sm font-medium text-foreground">{customer.company}</td>
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
                    <div className="flex flex-col items-start gap-3">
                      {/* Display existing tags */}
                      {customer.customTags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {customer.customTags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs"
                            >
                              {tag}
                              <button
                                onClick={() => handleRemoveTag(customer.id, index)}
                                className="hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Input row with Add button */}
                      <div className="flex items-center gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="e.g. custom:vip"
                          className="h-9 w-48 text-sm rounded-full border-border"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveTags(customer.id)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 text-sm px-4"
                          onClick={() => handleSaveTags(customer.id)}
                        >
                          Add
                        </Button>
                      </div>
                      {/* Save and Cancel buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="h-9 text-sm px-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
                          onClick={handleCloseEdit}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 text-sm px-4"
                          onClick={handleCloseEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      {customer.customTags.length > 0
                        ? customer.customTags.join(", ")
                        : "—"}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleEditTags(customer.id)}
                    >
                      Edit Tags
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
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
    </div>
  )
}
