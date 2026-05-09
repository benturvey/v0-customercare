"use client"

import { useState } from "react"
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
                  <RadioGroupItem value="person" id="person" />
                  <Label htmlFor="person" className="cursor-pointer font-normal">Person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="cursor-pointer font-normal">Group</Label>
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
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
