"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface Customer {
  id: string
  company: string
  tickets: number
  customTags: string[]
}

const initialCustomers: Customer[] = [
  { id: "1", company: "ABBOTT LYON LTD", tickets: 32, customTags: [] },
  { id: "2", company: "ACAI OUTDOORWEAR LTD", tickets: 2, customTags: [] },
  { id: "3", company: "AGTC LIMITED", tickets: 30, customTags: [] },
  { id: "4", company: "ANDERTONS MUSIC COMPANY", tickets: 8, customTags: [] },
  { id: "5", company: "APD", tickets: 5, customTags: [] },
  { id: "6", company: "ARK MAT", tickets: 1, customTags: [] },
  { id: "7", company: "ARMSTRONG DIRECT LIMITED", tickets: 2, customTags: [] },
  { id: "8", company: "AXMINSTER TOOL CENTRE LTD", tickets: 10, customTags: [] },
]

export function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")

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
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Tickets</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Custom Tags</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-border last:border-b-0">
                <td className="py-4 px-4 text-sm font-medium text-foreground">{customer.company}</td>
                <td className="py-4 px-4 text-sm text-center text-foreground">{customer.tickets}</td>
                <td className="py-4 px-4 text-sm text-center">
                  {editingId === customer.id ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-wrap justify-center gap-1">
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
                      <div className="flex items-center gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add tag..."
                          className="h-7 w-32 text-xs"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveTags(customer.id)
                            }
                          }}
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs"
                          onClick={() => handleSaveTags(customer.id)}
                        >
                          Add
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 text-xs"
                          onClick={handleCloseEdit}
                        >
                          Done
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleEditTags(customer.id)}
                  >
                    Edit Tags
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
