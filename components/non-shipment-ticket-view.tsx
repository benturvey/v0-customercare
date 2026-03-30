"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export function NonShipmentTicketView() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactNo: "",
    comments: "",
    emailCommentsTo: false,
    emailAddress: "",
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
    })
  }

  const handleReset = () => {
    setFormData({
      contactName: "",
      contactNo: "",
      comments: "",
      emailCommentsTo: false,
      emailAddress: "",
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
          <div className="space-y-6 max-w-2xl">
            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                placeholder="Enter contact name"
              />
            </div>

            {/* Contact No */}
            <div className="space-y-2">
              <Label htmlFor="contactNo">Contact No</Label>
              <Input
                id="contactNo"
                value={formData.contactNo}
                onChange={(e) => setFormData(prev => ({ ...prev, contactNo: e.target.value }))}
                placeholder="Enter contact number"
              />
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
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
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
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
