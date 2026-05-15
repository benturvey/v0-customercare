"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const EMPLOYEES = [
  { value: "aaron-doherty", label: "Aaron Doherty" },
  { value: "alex-lucy", label: "Alex Lucy" },
  { value: "andrei-costea", label: "Andrei Costea" },
  { value: "charlie-eaves", label: "Charlie Eaves" },
  { value: "john-smith", label: "John Smith" },
  { value: "sarah-jones", label: "Sarah Jones" },
]

const GROUPS = [
  { value: "call-handlers", label: "Call Handlers" },
  { value: "claims", label: "Claims" },
  { value: "collections", label: "Collections" },
  { value: "collections-exceptions", label: "Collections Exceptions" },
  { value: "dhl-ecommerce-tracking", label: "DHL ECommerce Tracking" },
  { value: "dhl-express-tracking", label: "DHL Express Tracking" },
  { value: "dpd-tracking", label: "DPD Tracking" },
  { value: "escalations", label: "Escalations" },
  { value: "escalations-exceptions", label: "Escalations Exceptions" },
  { value: "international", label: "International" },
  { value: "international-exceptions", label: "International Exceptions" },
  { value: "oz", label: "Oz" },
  { value: "simple-tickets", label: "Simple Tickets" },
  { value: "evri", label: "Evri" },
  { value: "evri-tracking", label: "Evri Tracking" },
  { value: "focus-customers", label: "Focus Customers" },
  { value: "focus-exceptions", label: "Focus Exceptions" },
  { value: "new-customer", label: "New Customer" },
  { value: "new-customer-exceptions", label: "New Customer Exceptions" },
  { value: "saturday-deliveries", label: "Saturday Deliveries" },
]

export function NonShipmentTicketView() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactNo: "",
    comments: "",
    emailCommentsTo: false,
    emailAddress: "",
    assignType: "" as "" | "person" | "group",
    assignTo: "",
  })

  const [commentsModalOpen, setCommentsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<{
    ticketId: string
    rows: { date: string; updatedBy: string; state: string; comment: string }[]
  } | null>(null)

  const ticketComments: Record<string, { date: string; updatedBy: string; state: string; comment: string }[]> = {
    "4785452": [
      { date: "13/05/2026 10:36", updatedBy: "Alex Lucy", state: "Deferring", comment: "Book in" },
      { date: "13/05/2026 10:31", updatedBy: "Alex Lucy", state: "Opening", comment: "1089538 - Book this Omlet one in for 15/05" },
    ],
    "4785455": [
      { date: "13/05/2026 10:35", updatedBy: "Alex Lucy", state: "Deferring", comment: "Book in" },
      { date: "13/05/2026 10:33", updatedBy: "Alex Lucy", state: "Opening", comment: "1089538 - Book this Omlet one in for 15/05" },
    ],
    "4785564": [
      { date: "13/05/2026 11:01", updatedBy: "Alex Lucy", state: "Deferring", comment: "Book in" },
      { date: "13/05/2026 10:33", updatedBy: "Alex Lucy", state: "Opening", comment: "1089596 - Book this Omlet one in for 15/05" },
    ],
    "4785607": [
      { date: "13/05/2026 11:18", updatedBy: "Alex Lucy", state: "Deferring", comment: "Book in" },
      { date: "13/05/2026 11:17", updatedBy: "Alex Lucy", state: "Opening", comment: "1089610 - Book this Omlet one in for 15/05" },
    ],
    "4786110": [{ date: "13/05/2026 13:15", updatedBy: "Alex Lucy", state: "Defer", comment: "Book in" }],
    "4786662": [{ date: "13/05/2026 15:25", updatedBy: "Annette Davidson", state: "Defer", comment: "1089726 Monitor this collection for OKA" }],
  }

  const handleViewComments = (ticketId: string) => {
    setSelectedTicket({ ticketId, rows: ticketComments[ticketId] ?? [] })
    setCommentsModalOpen(true)
  }

  const handleSubmit = () => {
    console.log("Submitting non-shipment ticket:", formData)
    // In a real application, this would submit to an API
    alert("Ticket submitted successfully!")
    setFormData({
      contactName: "",
      contactNo: "",
      comments: "",
      emailCommentsTo: false,
      emailAddress: "",
      assignType: "",
      assignTo: "",
    })
  }

  const handleReset = () => {
    setFormData({
      contactName: "",
      contactNo: "",
      comments: "",
      emailCommentsTo: false,
      emailAddress: "",
      assignType: "",
      assignTo: "",
    })
  }

  return (
    <div className="w-full px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Non-Shipment Ticket</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Raise a ticket not related to a specific shipment
        </p>
      </header>

      {/* Tickets List */}
      <div className="mb-6 border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Ticket ID</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Raised</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Raised By</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Updated</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Updated By</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">State</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Category</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Delegated To</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Comments</th>
              <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-foreground font-medium">4785452</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 10:31</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3 text-foreground">14/05/2026 11:09</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  Closed
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">General</td>
              <td className="px-4 py-3 text-foreground">Collections</td>
              <td className="px-4 py-3 text-foreground">Cancelled as change of address required</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleViewComments("4785452")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-foreground font-medium">4785455</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 10:33</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 10:35</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  Closed
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">General</td>
              <td className="px-4 py-3 text-foreground">Collections</td>
              <td className="px-4 py-3 text-foreground">1ZH9R8139533951209</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleViewComments("4785455")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-foreground font-medium">4785564</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 11:00</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 11:05</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  Closed
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">General</td>
              <td className="px-4 py-3 text-foreground">Collections</td>
              <td className="px-4 py-3 text-foreground">1ZH9R8139539677791</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleViewComments("4785564")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-foreground font-medium">4785607</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 11:17</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3 text-foreground">14/05/2026 11:02</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Defer
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">General</td>
              <td className="px-4 py-3 text-foreground">Collections</td>
              <td className="px-4 py-3 text-foreground">Book in</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleViewComments("4785607")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-foreground font-medium">4786110</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 13:15</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 13:18</td>
              <td className="px-4 py-3 text-foreground">Alex Lucy</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Defer
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">General</td>
              <td className="px-4 py-3 text-foreground">Collections</td>
              <td className="px-4 py-3 text-foreground">Book in</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleViewComments("4786110")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-foreground font-medium">4786662</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 15:25</td>
              <td className="px-4 py-3 text-foreground">Annette Davidson</td>
              <td className="px-4 py-3 text-foreground">13/05/2026 15:28</td>
              <td className="px-4 py-3 text-foreground">Annette Davidson</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Defer
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">General</td>
              <td className="px-4 py-3 text-foreground">Collections</td>
              <td className="px-4 py-3 text-foreground">1089726 Monitor this collection for OKA</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleViewComments("4786662")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6 max-w-4xl">
            {/* Contact Name and Contact No - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Name */}
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-muted-foreground">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Enter contact name"
                />
              </div>

              {/* Contact No */}
              <div className="space-y-2">
                <Label htmlFor="contactNo" className="text-muted-foreground">Contact No</Label>
                <Input
                  id="contactNo"
                  value={formData.contactNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactNo: e.target.value }))}
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            {/* Assign Ticket To - Below Contact Name */}
            <div className="space-y-3 max-w-md">
              <Label className="text-muted-foreground">Assign Ticket To</Label>
              <RadioGroup
                value={formData.assignType}
                onValueChange={(value: "person" | "group") => 
                  setFormData(prev => ({ ...prev, assignType: value, assignTo: "" }))
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="person" id="person" className="border-blue-600 text-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="person" className={`cursor-pointer font-normal ${formData.assignType === "person" ? "text-blue-600" : ""}`}>Person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" className="border-blue-600 text-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="group" className={`cursor-pointer font-normal ${formData.assignType === "group" ? "text-blue-600" : ""}`}>Group</Label>
                </div>
              </RadioGroup>

              {formData.assignType === "person" && (
                <Select
                  value={formData.assignTo}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, assignTo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {EMPLOYEES.map((employee) => (
                      <SelectItem key={employee.value} value={employee.value}>
                        {employee.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {formData.assignType === "group" && (
                <Select
                  value={formData.assignTo}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, assignTo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {GROUPS.map((group) => (
                      <SelectItem key={group.value} value={group.value}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-muted-foreground">Comments</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                placeholder="Enter your comments here..."
                rows={6}
                className="resize-y"
              />
            </div>

            {/* Email Comments To */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emailCommentsTo"
                  checked={formData.emailCommentsTo}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      emailCommentsTo: checked === true,
                      emailAddress: checked === true ? prev.emailAddress : ""
                    }))
                  }
                />
                <Label htmlFor="emailCommentsTo" className="cursor-pointer">
                  Email Comments To
                </Label>
              </div>

              {formData.emailCommentsTo && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailAddress: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Ticket
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-blue-400 hover:bg-blue-500 text-white"
              >
                Submit &amp; Resolve Ticket
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Modal */}
      {commentsModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCommentsModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-foreground">
                Comments - Ticket #{selectedTicket.ticketId}
              </h2>
              <button
                onClick={() => setCommentsModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Date</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Updated By</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">State</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTicket.rows.map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-3 text-foreground">{row.date}</td>
                        <td className="px-4 py-3 text-foreground">{row.updatedBy}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            row.state === "Closed"
                              ? "bg-gray-200 text-gray-800"
                              : row.state === "Opening"
                              ? "bg-blue-100 text-blue-800"
                              : row.state === "Deferring"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {row.state}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground">{row.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t">
              <Button variant="outline" onClick={() => setCommentsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
