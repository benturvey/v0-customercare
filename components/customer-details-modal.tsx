"use client"

import { useState } from "react"
import { X, Building2, MapPin, User, Mail, Phone, MoreVertical } from "lucide-react"

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
  const [contractDetailOpen, setContractDetailOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<string | null>(null)

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
                    <p className="text-sm text-muted-foreground mb-1">Registered Name</p>
                    <p className="text-sm font-medium text-foreground">ABBOTT LYON LTD</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Trading Name</p>
                    <p className="text-sm font-medium text-foreground">ABBOTT LYON LTD</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer ID</p>
                    <p className="text-sm font-medium text-foreground">3225</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">NetSuite Code</p>
                    <p className="text-sm font-medium text-foreground">ABBO0001</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Company Reg No.</p>
                    <p className="text-sm font-medium text-foreground">08953621</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Website</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-sm font-medium text-foreground">12 Bond Street</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">City</p>
                    <p className="text-sm font-medium text-foreground">Bath</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Postcode</p>
                    <p className="text-sm font-medium text-foreground">BA1 1BP</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">County</p>
                    <p className="text-sm font-medium text-foreground">Somerset</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Country</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Customer Since</p>
                    <p className="text-sm font-medium text-foreground">2021</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Account Manager</p>
                    <p className="text-sm font-medium text-foreground">Simon Binns</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sector</p>
                    <p className="text-sm font-medium text-foreground">INDUSTRIAL GOODS</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Partnership Status</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Addresses & Contacts" && (
            <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Invoice Address */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Invoice Address</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-sm font-medium text-foreground">12 Bond Street</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">City</p>
                      <p className="text-sm font-medium text-foreground">Bath</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Postcode</p>
                      <p className="text-sm font-medium text-foreground">BA1 1BP</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">County</p>
                      <p className="text-sm font-medium text-foreground">Somerset</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="text-sm font-medium text-foreground">United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice Address */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Notice Address</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-sm font-medium text-foreground">12 Bond Street</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">City</p>
                      <p className="text-sm font-medium text-foreground">Bath</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Postcode</p>
                      <p className="text-sm font-medium text-foreground">BA1 1BP</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">County</p>
                      <p className="text-sm font-medium text-foreground">Somerset</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="text-sm font-medium text-foreground">United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collection Address */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Collection Address</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-sm font-medium text-foreground">Unit BG180, Lilliput Road, Brackmills</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">City</p>
                      <p className="text-sm font-medium text-foreground">Northampton</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Postcode</p>
                      <p className="text-sm font-medium text-foreground">NN4 7AS</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">County</p>
                      <p className="text-sm font-medium text-foreground">Northamptonshire</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="text-sm font-medium text-foreground">United Kingdom</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vendor</p>
                    <p className="text-sm font-medium text-foreground">International Logistics Group</p>
                  </div>
                  {/* Locations table */}
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-foreground mb-3">Locations</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left text-xs text-muted-foreground font-medium pb-2">Site ID</th>
                          <th className="text-left text-xs text-muted-foreground font-medium pb-2">Integration</th>
                          <th className="text-left text-xs text-muted-foreground font-medium pb-2">Location</th>
                          <th className="text-left text-xs text-muted-foreground font-medium pb-2">Version</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 text-foreground">2906</td>
                          <td className="py-2 text-foreground">Enterprise</td>
                          <td className="py-2 text-foreground">Google Cloud</td>
                          <td className="py-2 text-foreground">4.50.3.0</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-foreground">3029</td>
                          <td className="py-2 text-foreground">Enterprise</td>
                          <td className="py-2 text-foreground">Google Cloud</td>
                          <td className="py-2 text-foreground">4.50.4.2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Returns Address */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Returns Address</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-sm font-medium text-foreground">Unit BG180, Lilliput Road, Brackmills</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">City</p>
                      <p className="text-sm font-medium text-foreground">Northampton</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Postcode</p>
                      <p className="text-sm font-medium text-foreground">NN4 7AS</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">County</p>
                      <p className="text-sm font-medium text-foreground">Northamptonshire</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="text-sm font-medium text-foreground">United Kingdom</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vendor</p>
                    <p className="text-sm font-medium text-foreground">International Logistics Group</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts section */}
            <div className="mt-8">
              <h3 className="text-base font-semibold text-foreground mb-4">Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Service Agreement",
                  "Admin",
                  "Billing",
                  "Technical",
                  "Customer Service",
                  "Operations",
                  "Marketing",
                  "ECM Owner",
                ].map((role) => (
                  <div key={role} className="border rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{role}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground shrink-0">
                        SD
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">Steve Davies</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Operations Director</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 pl-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground">steve@abbottlyon.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground">07837 560610</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </>
          )}

          {activeTab !== "Overview" && activeTab !== "Addresses & Contacts" && activeTab !== "Contracts (0)" && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              {activeTab} content coming soon
            </div>
          )}

          {activeTab === "Contracts (0)" && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 w-48">Carrier</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3 w-40">Contract</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Service Suite</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      logoComponent: (
                        <img src="/dpd-logo.png" alt="DPD" className="h-12 w-auto" />
                      ),
                      contract: "3300",
                      suite: "Domestic Standard, European Standard, Domestic Expresspaks < 5kg",
                    },
                    {
                      logoComponent: (
                        <img src="/dpd-logo.png" alt="DPD" className="h-12 w-auto" />
                      ),
                      contract: "3518",
                      suite: "Domestic Standard, European Standard, Domestic Expresspaks < 5kg",
                    },
                    {
                      logoComponent: (
                        <img src="/dpd-local-logo.png" alt="DPD Local" className="h-10 w-auto" />
                      ),
                      contract: "3024907",
                      suite: "Domestic Standard, Domestic Expresspaks < 5kg",
                    },
                    {
                      logoComponent: (
                        <img src="/evri-logo.png" alt="EVRi" className="h-12 w-auto" />
                      ),
                      contract: "1RY011",
                      suite: "1 Hr ETA - New Business Service Suite POD",
                    },
                    {
                      logoComponent: (
                        <img src="/evri-logo.png" alt="EVRi" className="h-12 w-auto" />
                      ),
                      contract: "7RY071",
                      suite: "1 Hr ETA - New Business Service Suite IOD",
                    },
                    {
                      logoComponent: (
                        <div className="border rounded px-2 py-1 text-center" style={{ minWidth: 80 }}>
                          <span className="font-bold text-sm" style={{ color: "#00AEEF", fontStyle: "italic" }}>EVRi</span>
                          <div className="text-[9px] text-gray-500 leading-none">ParcelShop</div>
                        </div>
                      ),
                      contract: "3RY031",
                      suite: "International NON IOSS Service Suite",
                    },
                    {
                      logoComponent: (
                        <img src="/gfs-international-logo.png" alt="GFS International" className="h-10 w-auto" />
                      ),
                      contract: "GFS900277",
                      suite: "International",
                    },
                    {
                      logoComponent: (
                        <img src="/ups-logo.png" alt="UPS" className="h-10 w-auto" />
                      ),
                      contract: "CW7297",
                      suite: "Standard, Express",
                    },
                    {
                      logoComponent: (
                        <img src="/ups-logo.png" alt="UPS" className="h-10 w-auto" />
                      ),
                      contract: "E7714J",
                      suite: "Standard, Express",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="px-6 py-4">{row.logoComponent}</td>
                      <td className="px-6 py-4 text-foreground">{row.contract}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.suite}</td>
                      <td className="px-2 py-4">
                        <button 
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => {
                            if (row.contract === "3300" || row.contract === "3518" || row.contract === "3024907" || row.contract === "1RY011" || row.contract === "7RY071" || row.contract === "3RY031" || row.contract === "GFS900277" || row.contract === "CW7297" || row.contract === "E7714J") {
                              setSelectedContract(row.contract)
                              setContractDetailOpen(true)
                            }
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Contract Detail Modal */}
      {contractDetailOpen && (selectedContract === "3300" || selectedContract === "3518") && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* DPD Logo */}
              <div className="mb-8">
                <img src="/dpd-logo.png" alt="DPD" className="h-14 w-auto" />
              </div>

              {/* Contract fields */}
              <div className="grid grid-cols-4 gap-8 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">{selectedContract === "3300" ? "Onboarding" : "CHG-001"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">{selectedContract}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">SLID</p>
                  <p className="text-sm font-medium text-foreground">{selectedContract}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Auth Code</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm font-medium text-foreground">{selectedContract === "3300" ? "DDP" : "ILG"}</p>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-56">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-foreground align-top">Domestic Standard</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["01 - Sunday", "11 - 2 Day", "12 - Next Day", "13 - Next Day by 12:00", "14 - Next Day by 10:30", "16 - Saturday", "18 - Saturday by 10:30", "29 - Sunday by 12:00"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-foreground align-top">European Standard</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["19 - Parcel", "39 - Expresspak"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">{"Domestic Expresspaks < 5kg"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["09 - Sunday", "23 - Sunday by 10:30", "32 - Next Day", "33 - Next Day by 12:00", "34 - Next Day by 10:30", "36 - Saturday", "37 - Saturday by 12:00", "38 - Saturday by 10:30", "51 - Sunday by 12:00"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DPD Local Contract Detail Modal */}
      {contractDetailOpen && selectedContract === "3024907" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* DPD Local Logo */}
              <div className="mb-8">
                <img src="/dpd-local-logo.png" alt="DPD Local" className="h-14 w-auto" />
              </div>

              {/* Contract fields */}
              <div className="grid grid-cols-4 gap-8 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">CHG-124</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">3024907</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Range From</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Range To</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm font-medium text-foreground">ILG</p>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-56">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-foreground align-top">Domestic Standard</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["08 - Next Day by 10:30", "09 - Saturday by 10:30", "11 - 2 Day", "12 - Next Day", "13 - Next Day by 12:00", "15 - Sunday by 12:00", "17 - Saturday by 12:00", "71 - Saturday", "75 - Sunday"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">{"Domestic Expresspaks < 5kg"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["23 - Sunday by 10:30", "28 - Next Day by 10:30", "29 - Saturday by 10:30", "32 - Next Day", "33 - Next Day by 12:00", "37 - Saturday by 12:00", "51 - Sunday by 12:00", "77 - Sunday"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVRi Contract Detail Modal */}
      {contractDetailOpen && (selectedContract === "1RY011" || selectedContract === "7RY071") && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* EVRi Logo */}
              <div className="mb-8">
                <span className="font-extrabold text-4xl tracking-tight" style={{ color: "#00AEEF", fontStyle: "italic" }}>EVRi</span>
              </div>

              {/* Contract fields - Row 1 */}
              <div className="grid grid-cols-3 gap-8 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">Onboarding</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">{selectedContract}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client ID</p>
                  <p className="text-sm font-medium text-foreground">5665</p>
                </div>
              </div>

              {/* Contract fields - Row 2 */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client Name</p>
                  <p className="text-sm font-medium text-foreground">Abbott Lyon</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Child ID</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Child Name</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-80">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">
                        {selectedContract === "1RY011" ? "1 Hr ETA - New Business Service Suite POD" : "1 Hr ETA - New Business Service Suite IOD"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["2 Day", "Next Day"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVRi ParcelShop Contract Detail Modal */}
      {contractDetailOpen && selectedContract === "3RY031" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* EVRi ParcelShop Logo */}
              <div className="mb-8">
                <div className="inline-block border rounded-lg px-4 py-2">
                  <span className="font-bold text-xl" style={{ color: "#00AEEF" }}>EVRi</span>
                  <div className="text-[10px] text-orange-500 leading-none">ParcelShop</div>
                </div>
              </div>

              {/* Contract fields - Row 1 */}
              <div className="grid grid-cols-3 gap-8 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">Onboarding</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">3RY031</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client ID</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>

              {/* Contract fields - Row 2 */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client Name</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Child ID</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Child Name</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-80">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">International NON IOSS Service Suite</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">HOME</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GFS International Contract Detail Modal */}
      {contractDetailOpen && selectedContract === "GFS900277" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* GFS International Logo */}
              <div className="mb-8">
                <img src="/gfs-international-logo.png" alt="GFS International" className="h-12 w-auto" />
              </div>

              {/* Contract fields - Row 1 */}
              <div className="grid grid-cols-3 gap-8 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">Onboarding</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">GFS900277</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Range From</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>

              {/* Contract fields - Row 2 */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Range To</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">API Key</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div></div>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-40">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">International</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "EECO - eCommerce Economy (DDU/DAP Tracked up to 2 kgs)",
                            "EEDP - eCommerce Economy (IOSS Tracked up to 2 kgs)",
                            "EEUT - eCommerce Economy Un-Tracked (DDU/DAP up to 2 kgs)",
                            "EPDP - eCommerce Plus IOSS (Tracked up to 30 kgs)",
                            "EPLU - eCommerce Plus (DDU/DAP Tracked up to 30 kgs)"
                          ].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPS Contract Detail Modal */}
      {contractDetailOpen && selectedContract === "CW7297" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* UPS Logo */}
              <div className="mb-8">
                <img src="/ups-logo.png" alt="UPS" className="h-14 w-auto" />
              </div>

              {/* Contract fields */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">Onboarding</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">CW7297</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tariff</p>
                  <p className="text-sm font-medium text-foreground">4</p>
                </div>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-40">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-foreground align-top">Standard</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">11 - Standard</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">Express</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["07 - Express", "65 - Express Saver"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPS E7714J Contract Detail Modal */}
      {contractDetailOpen && selectedContract === "E7714J" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setContractDetailOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={() => setContractDetailOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {/* UPS Logo */}
              <div className="mb-8">
                <img src="/ups-logo.png" alt="UPS" className="h-14 w-auto" />
              </div>

              {/* Contract fields */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="text-sm font-medium text-foreground">Onboarding</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract</p>
                  <p className="text-sm font-medium text-foreground">E7714J</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tariff</p>
                  <p className="text-sm font-medium text-foreground">4</p>
                </div>
              </div>

              {/* Service Suite Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3 w-40">Service Suite</th>
                      <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service Codes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-foreground align-top">Standard</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">11 - Standard</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground align-top">Express</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {["07 - Express", "65 - Express Saver"].map((code) => (
                            <span key={code} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{code}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
