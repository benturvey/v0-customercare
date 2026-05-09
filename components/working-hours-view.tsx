"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

// Generate time options in 15-minute increments (24-hour format)
const generateTimeOptions = () => {
  const options: string[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      options.push(timeString)
    }
  }
  return options
}

const TIME_OPTIONS = generateTimeOptions()

interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  label: string
  isActive?: boolean
}

function TimeInput({ value, onChange, label, isActive }: TimeInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    // Validate and update if it matches HH:MM format
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newValue)) {
      // Normalize to always have leading zero
      const [hours, minutes] = newValue.split(":")
      const normalized = `${hours.padStart(2, "0")}:${minutes}`
      onChange(normalized)
    }
  }

  const handleInputBlur = () => {
    // Reset to last valid value if invalid
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputValue)) {
      setInputValue(value)
    }
  }

  const handleTimeSelect = (time: string) => {
    onChange(time)
    setInputValue(time)
    setIsOpen(false)
  }

  return (
    <div className="grid gap-2">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="HH:MM"
              className="w-32 font-mono pr-8"
              maxLength={5}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDown 
                className="h-4 w-4" 
                style={{ 
                  stroke: isActive ? '#2563eb' : '#9ca3af',
                  color: isActive ? '#2563eb' : '#9ca3af'
                }} 
              />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-32 p-0 max-h-60 overflow-y-auto" align="start">
          <div className="grid">
            {TIME_OPTIONS.map((time) => (
              <button
                key={time}
                type="button"
                className={`px-3 py-1.5 text-sm text-left hover:bg-muted transition-colors ${time === value ? "bg-muted font-medium" : ""
                  }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function WorkingHoursView() {
  const [activeHoursType, setActiveHoursType] = useState<"standard" | "extended">("standard")
  const [standardStartTime, setStandardStartTime] = useState("08:00")
  const [standardEndTime, setStandardEndTime] = useState("18:45")
  const [extendedStartTime, setExtendedStartTime] = useState("07:00")
  const [extendedEndTime, setExtendedEndTime] = useState("20:00")

  const handleToggle = (type: "standard" | "extended") => {
    setActiveHoursType(type)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Working Hours</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Standard Working Hours Card */}
        <Card className={activeHoursType !== "standard" ? "opacity-60" : ""}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-foreground">Standard Working Hours</h2>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="standard-toggle" className="text-sm text-muted-foreground">
                  {activeHoursType === "standard" ? "Active" : "Inactive"}
                </Label>
                <Switch
                  id="standard-toggle"
                  checked={activeHoursType === "standard"}
                  onCheckedChange={() => handleToggle("standard")}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TimeInput
                label="Start Time"
                value={standardStartTime}
                onChange={setStandardStartTime}
                isActive={activeHoursType === "standard"}
              />
              <TimeInput
                label="End Time"
                value={standardEndTime}
                onChange={setStandardEndTime}
                isActive={activeHoursType === "standard"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Extended Working Hours Card */}
        <Card className={activeHoursType !== "extended" ? "opacity-60" : ""}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-foreground">Extended Working Hours</h2>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="extended-toggle" className="text-sm text-muted-foreground">
                  {activeHoursType === "extended" ? "Active" : "Inactive"}
                </Label>
                <Switch
                  id="extended-toggle"
                  checked={activeHoursType === "extended"}
                  onCheckedChange={() => handleToggle("extended")}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TimeInput
                label="Start Time"
                value={extendedStartTime}
                onChange={setExtendedStartTime}
                isActive={activeHoursType === "extended"}
              />
              <TimeInput
                label="End Time"
                value={extendedEndTime}
                onChange={setExtendedEndTime}
                isActive={activeHoursType === "extended"}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Carrier Working Hours Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Carrier Working Times</h2>
        <CarrierWorkingHoursTable />
      </div>
    </div>
  )
}

const CARRIERS = [
  "Amazon Logistics UK",
  "BJS",
  "Coll-8",
  "DHL ECommerce UK",
  "DHL Express",
  "DPD",
  "DPD Germany",
  "DPD Local",
  "DPD Netherlands",
  "DX Freight",
  "Evri",
  "Exelot",
  "FedEx",
  "GFS International",
  "OCS",
  "Royal Mail",
  "UPS",
]

type CarrierRow = {
  monFri: boolean
  sat: boolean
  sun: boolean
  bankHolidays: boolean
}

function CarrierWorkingHoursTable() {
  const [rows, setRows] = useState<Record<string, CarrierRow>>(
    Object.fromEntries(
      CARRIERS.map((c) => [c, { monFri: true, sat: false, sun: false, bankHolidays: false }])
    )
  )

  const toggle = (carrier: string, field: keyof CarrierRow) => {
    setRows((prev) => ({
      ...prev,
      [carrier]: { ...prev[carrier], [field]: !prev[carrier][field] },
    }))
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Carrier</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Mon - Fri</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Sat</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Sun</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Bank Holidays</th>
              </tr>
            </thead>
            <tbody>
              {CARRIERS.map((carrier, index) => (
                <tr key={carrier} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="px-4 py-3 font-medium text-foreground">{carrier}</td>
                  {(["monFri", "sat", "sun", "bankHolidays"] as (keyof CarrierRow)[]).map((field) => (
                    <td key={field} className="px-4 py-3 text-center">
                      <Checkbox
                        checked={rows[carrier][field]}
                        onCheckedChange={() => toggle(carrier, field)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mx-auto"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
