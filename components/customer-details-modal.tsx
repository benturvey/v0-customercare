"use client"

import { useState } from "react"
import { X, Building2, MapPin, User, Mail, Phone } from "lucide-react"

interface CustomerDetailsModalProps {
  open: boolean
  onClose: () => void
  customer: {
    company: string
  }
}

const tabs = [
  "Overview",
  "Addresses & Contacts",
  "Contracts (0)",
  "Collections",
  "Support Tickets",
  "Financials",
  "Health Index",
  "Documents",
  "Activity",
]

export function CustomerDetailsModal({ open, onClose, customer }: CustomerDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Overview")

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex gap-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Details Card */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Company Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Registered Name</p>
                    <p className="text-sm font-medium text-foreground">ABBOTT LYON LTD</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Trading Name</p>
                    <p className="text-sm font-medium text-foreground">ABBOTT LYON LTD</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Customer ID</p>
                    <p className="text-sm font-medium text-foreground">3225</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">NetSuite Code</p>
                    <p className="text-sm font-medium text-foreground">ABBO0001</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Company Reg No.</p>
                    <p className="text-sm font-medium text-foreground">08953621</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Website</p>
                    <p className="text-sm font-medium text-blue-600">www.abbottlyon.com</p>
                  </div>
                </div>
              </div>

              {/* Registered Address Card */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Registered Address</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="col-span-2">
                    <p className="text-sm text-orange-500 mb-1">Address</p>
                    <p className="text-sm font-medium text-foreground">12 Bond Street</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">City</p>
                    <p className="text-sm font-medium text-foreground">Bath</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Postcode</p>
                    <p className="text-sm font-medium text-foreground">BA1 1BP</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">County</p>
                    <p className="text-sm font-medium text-foreground">Somerset</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Country</p>
                    <p className="text-sm font-medium text-foreground">United Kingdom</p>
                  </div>
                </div>
              </div>

              {/* Primary Contact Card */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Primary Contact</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-muted-foreground">
                    SD
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Steve Davies</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Operations Director</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-blue-600">steve@abbottlyon.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">07837 560610</span>
                  </div>
                </div>
              </div>

              {/* Service Status Card */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Service Status</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Customer Since</p>
                    <p className="text-sm font-medium text-foreground">2021</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Account Manager</p>
                    <p className="text-sm font-medium text-foreground">Simon Binns</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Sector</p>
                    <p className="text-sm font-medium text-foreground">INDUSTRIAL GOODS</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-500 mb-1">Partnership Status</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "Overview" && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              {activeTab} content coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
