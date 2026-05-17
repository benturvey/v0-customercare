"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle, Plus, Pencil, Trash2, ChevronDown, Menu } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SKILL_LEVELS = ["L1", "L2", "L3", "L4", "MGM", "ADM"]
const QUERY_LIFECYCLES = ["Opening", "Delegating", "Deferring", "Closing", "Updating", "Reviewing", "Reopening"]
const CARRIERS = ["Amazon Logistics UK", "BJS", "DHL ECommerce UK", "DHL Express", "DPD", "DPD DE", "DPD Local", "DPD NL", "DX Freight", "Evri", "Evri PS", "GFS International", "OCS", "UPS"]
const CONSIGNMENT_STATES = [
  "PARCEL DATA RECEIVED - AWAITING CARRIER SCAN",
  "YOUR PARCEL HAS ARRIVED AT THE DELIVERY DEPOT",
  "IN TRANSIT",
  "ARRIVED AT HUB",
  "DEPARTED DEPOT",
  "DEPARTED HUB",
  "OUT FOR DELIVERY",
  "DELIVERED - SPLIT",
  "DELIVERED"
]
const CUSTOMERS = [
  "ABBOTT LYON LTD",
  "ANDERTONS MUSIC COMPANY",
  "CASTLES TECHNOLOGY UK & IRELAND LTD",
  "CREW CLOTHING CO LIMITED",
  "FENWICK",
  "FINNING UK LTD",
  "MAMAS & PAPAS",
  "OKA DIRECT LIMITED",
  "ROBERT WELCH DESIGNS LIMITED",
  "SERVICE LOGISTICS",
  "SMEG (UK) LIMITED",
  "THE CAMBIUM GROUP UK HOLDINGS LIMITED"
]

interface AdvancedRule {
  id: string
  ruleDescription: string
  keyword: string
  itemValue: string
  skillLevel: string
}

interface QueryStateRule {
  id: string
  ruleDescription: string
  queryLifecycle: string
  lifecycleCountThreshold: string
  carrier: string
  skillLevel: string
}

interface ParcelCountRule {
  id: string
  ruleDescription: string
  queryCondition: string
  parcelCount: string
  skillLevel: string
}

interface ConsignmentStateRule {
  id: string
  ruleDescription: string
  consignmentState: string
  queryLifecycle: string
  skillLevel: string
}

interface CustomerBasedRule {
  id: string
  ruleDescription: string
  customer: string
  carrier: string
  skillLevel: string
}

interface ElapsedDaysRule {
  id: string
  ruleDescription: string
  elapsedDays: string
  skillLevel: string
}

const initialRules: AdvancedRule[] = [
  { id: "1", ruleDescription: "Complaint", keyword: "Complaint, Complain", itemValue: "", skillLevel: "L4" },
  { id: "2", ruleDescription: "High Value", keyword: "", itemValue: "300", skillLevel: "L4" },
]

const initialQueryStateRules: QueryStateRule[] = [
  { id: "1", ruleDescription: "Repeat Defer Premium Carrier", queryLifecycle: "Deferring, Reviewing", lifecycleCountThreshold: "6", carrier: "DHL ECommerce UK, DPD, DPD Local", skillLevel: "L4" },
  { id: "2", ruleDescription: "Repeat Contact", queryLifecycle: "Reopening", lifecycleCountThreshold: "3", carrier: "", skillLevel: "L4" },
  { id: "3", ruleDescription: "Repeat Defer", queryLifecycle: "Deferring, Reviewing", lifecycleCountThreshold: "11", carrier: "Amazon Logisitcs UK, DHL Express, DPD DE, DPD NL, Evri, Evri PS, GFS International, OCS, UPS", skillLevel: "L4" },
]

const initialParcelCountRules: ParcelCountRule[] = [
  { id: "1", ruleDescription: "Multi Parcel", queryCondition: "", parcelCount: "1", skillLevel: "L3" },
  { id: "2", ruleDescription: "Searches For Multi Parcel", queryCondition: "descriptions provided", parcelCount: "1", skillLevel: "L4" },
]

const initialConsignmentStateRules: ConsignmentStateRule[] = [
  { id: "1", ruleDescription: "Part Delivered", consignmentState: "DELIVERED - SPLIT", queryLifecycle: "", skillLevel: "L3" },
  { id: "2", ruleDescription: "Reopened Data", consignmentState: "PARCEL DATA RECEIVED - AWAITING CARRIER SCAN", queryLifecycle: "Reopening", skillLevel: "L4" },
]

const initialCustomerBasedRules: CustomerBasedRule[] = [
  { id: "1", ruleDescription: "Customer Carrier Specific - Fenwick", customer: "FENWICK", carrier: "DX Freight", skillLevel: "L4" },
]

const initialElapsedDaysRules: ElapsedDaysRule[] = [
  { id: "1", ruleDescription: "Elapsed Days No Scan", elapsedDays: "6", skillLevel: "L4" },
]

export function AdvancedRulesView() {
  const [rules, setRules] = useState<AdvancedRule[]>(initialRules)
  const [queryStateRules, setQueryStateRules] = useState<QueryStateRule[]>(initialQueryStateRules)
  const [parcelCountRules, setParcelCountRules] = useState<ParcelCountRule[]>(initialParcelCountRules)
  const [consignmentStateRules, setConsignmentStateRules] = useState<ConsignmentStateRule[]>(initialConsignmentStateRules)
  const [customerBasedRules, setCustomerBasedRules] = useState<CustomerBasedRule[]>(initialCustomerBasedRules)
  const [elapsedDaysRules, setElapsedDaysRules] = useState<ElapsedDaysRule[]>(initialElapsedDaysRules)

  // Modal state for General Advanced Rules
  const [isGeneralRuleModalOpen, setIsGeneralRuleModalOpen] = useState(false)
  const [newGeneralRule, setNewGeneralRule] = useState({
    ruleDescription: "",
    keyword: "",
    itemValue: "",
    skillLevel: "",
  })

  // Edit state for General Advanced Rules
  const [editingGeneralRuleId, setEditingGeneralRuleId] = useState<string | null>(null)
  const [editingGeneralRule, setEditingGeneralRule] = useState({
    ruleDescription: "",
    keyword: "",
    itemValue: "",
    skillLevel: "",
  })

  // Delete confirmation state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ section: string; id: string; description: string } | null>(null)

  // Modal state for Query State Specific Rules
  const [isQueryStateRuleModalOpen, setIsQueryStateRuleModalOpen] = useState(false)
  const [newQueryStateRule, setNewQueryStateRule] = useState({
    ruleDescription: "",
    queryLifecycle: [] as string[],
    lifecycleCountThreshold: "",
    carrier: [] as string[],
    skillLevel: "",
  })

  // Edit state for Query State Specific Rules
  const [editingQueryStateRuleId, setEditingQueryStateRuleId] = useState<string | null>(null)
  const [editingQueryStateRule, setEditingQueryStateRule] = useState({
    ruleDescription: "",
    queryLifecycle: [] as string[],
    lifecycleCountThreshold: "",
    carrier: [] as string[],
    skillLevel: "",
  })

  // Modal state for Parcel Count Rules
  const [isParcelCountRuleModalOpen, setIsParcelCountRuleModalOpen] = useState(false)
  const [newParcelCountRule, setNewParcelCountRule] = useState({
    ruleDescription: "",
    queryCondition: "",
    parcelCount: "",
    skillLevel: "",
  })

  // Edit state for Parcel Count Rules
  const [editingParcelCountRuleId, setEditingParcelCountRuleId] = useState<string | null>(null)
  const [editingParcelCountRule, setEditingParcelCountRule] = useState({
    ruleDescription: "",
    queryCondition: "",
    parcelCount: "",
    skillLevel: "",
  })

  // Modal state for Consignment State Based Rules
  const [isConsignmentStateRuleModalOpen, setIsConsignmentStateRuleModalOpen] = useState(false)
  const [newConsignmentStateRule, setNewConsignmentStateRule] = useState({
    ruleDescription: "",
    consignmentState: "",
    queryLifecycle: [] as string[],
    skillLevel: "",
  })

  // Edit state for Consignment State Based Rules
  const [editingConsignmentStateRuleId, setEditingConsignmentStateRuleId] = useState<string | null>(null)
  const [editingConsignmentStateRule, setEditingConsignmentStateRule] = useState({
    ruleDescription: "",
    consignmentState: "",
    queryLifecycle: [] as string[],
    skillLevel: "",
  })

  // Modal state for Customer Carrier Based Rules
  const [isCustomerBasedRuleModalOpen, setIsCustomerBasedRuleModalOpen] = useState(false)
  const [newCustomerBasedRule, setNewCustomerBasedRule] = useState({
    ruleDescription: "",
    customer: "",
    carrier: [] as string[],
    skillLevel: "",
  })

  // Edit state for Customer Carrier Based Rules
  const [editingCustomerBasedRuleId, setEditingCustomerBasedRuleId] = useState<string | null>(null)
  const [editingCustomerBasedRule, setEditingCustomerBasedRule] = useState({
    ruleDescription: "",
    customer: "",
    carrier: [] as string[],
    skillLevel: "",
  })

  // Modal state for Elapsed Days Since Last Scan Rules
  const [isElapsedDaysRuleModalOpen, setIsElapsedDaysRuleModalOpen] = useState(false)
  const [newElapsedDaysRule, setNewElapsedDaysRule] = useState({
    ruleDescription: "",
    elapsedDays: "",
    skillLevel: "",
  })

  // Edit state for Elapsed Days Since Last Scan Rules
  const [editingElapsedDaysRuleId, setEditingElapsedDaysRuleId] = useState<string | null>(null)
  const [editingElapsedDaysRule, setEditingElapsedDaysRule] = useState({
    ruleDescription: "",
    elapsedDays: "",
    skillLevel: "",
  })

  const handleAddGeneralRule = () => {
    if (newGeneralRule.ruleDescription || newGeneralRule.keyword || newGeneralRule.itemValue) {
      const newRule: AdvancedRule = {
        id: String(rules.length + 1),
        ruleDescription: newGeneralRule.ruleDescription,
        keyword: newGeneralRule.keyword,
        itemValue: newGeneralRule.itemValue,
        skillLevel: newGeneralRule.skillLevel || "L1",
      }
      setRules([...rules, newRule])
      setNewGeneralRule({ ruleDescription: "", keyword: "", itemValue: "", skillLevel: "" })
      setIsGeneralRuleModalOpen(false)
    }
  }

  const handleOpenGeneralRuleModal = () => {
    setNewGeneralRule({ ruleDescription: "", keyword: "", itemValue: "", skillLevel: "" })
    setIsGeneralRuleModalOpen(true)
  }

  const handleOpenQueryStateRuleModal = () => {
    setNewQueryStateRule({
      ruleDescription: "",
      queryLifecycle: [],
      lifecycleCountThreshold: "",
      carrier: [],
      skillLevel: "",
    })
    setIsQueryStateRuleModalOpen(true)
  }

  const handleAddQueryStateRule = () => {
    if (newQueryStateRule.ruleDescription || newQueryStateRule.queryLifecycle.length > 0) {
      const newRule: QueryStateRule = {
        id: String(queryStateRules.length + 1),
        ruleDescription: newQueryStateRule.ruleDescription,
        queryLifecycle: newQueryStateRule.queryLifecycle.join(", "),
        lifecycleCountThreshold: newQueryStateRule.lifecycleCountThreshold,
        carrier: newQueryStateRule.carrier.join(", "),
        skillLevel: newQueryStateRule.skillLevel || "L1",
      }
      setQueryStateRules([...queryStateRules, newRule])
      setNewQueryStateRule({
        ruleDescription: "",
        queryLifecycle: [],
        lifecycleCountThreshold: "",
        carrier: [],
        skillLevel: "",
      })
      setIsQueryStateRuleModalOpen(false)
    }
  }

  const toggleQueryLifecycle = (lifecycle: string) => {
    setNewQueryStateRule(prev => ({
      ...prev,
      queryLifecycle: prev.queryLifecycle.includes(lifecycle)
        ? prev.queryLifecycle.filter(l => l !== lifecycle)
        : [...prev.queryLifecycle, lifecycle]
    }))
  }

  const toggleCarrier = (carrier: string) => {
    setNewQueryStateRule(prev => ({
      ...prev,
      carrier: prev.carrier.includes(carrier)
        ? prev.carrier.filter(c => c !== carrier)
        : [...prev.carrier, carrier]
    }))
  }

  const handleEditQueryStateRule = (rule: QueryStateRule) => {
    setEditingQueryStateRuleId(rule.id)
    setEditingQueryStateRule({
      ruleDescription: rule.ruleDescription,
      queryLifecycle: rule.queryLifecycle ? rule.queryLifecycle.split(", ").map(s => s.trim()).filter(Boolean) : [],
      lifecycleCountThreshold: rule.lifecycleCountThreshold,
      carrier: rule.carrier ? rule.carrier.split(", ").map(s => s.trim()).filter(Boolean) : [],
      skillLevel: rule.skillLevel,
    })
  }

  const handleSaveQueryStateRuleEdit = (ruleId: string) => {
    setQueryStateRules(queryStateRules.map(rule =>
      rule.id === ruleId
        ? {
          ...rule,
          ruleDescription: editingQueryStateRule.ruleDescription,
          queryLifecycle: editingQueryStateRule.queryLifecycle.join(", "),
          lifecycleCountThreshold: editingQueryStateRule.lifecycleCountThreshold,
          carrier: editingQueryStateRule.carrier.join(", "),
          skillLevel: editingQueryStateRule.skillLevel,
        }
        : rule
    ))
    setEditingQueryStateRuleId(null)
  }

  const handleCancelQueryStateRuleEdit = () => {
    setEditingQueryStateRuleId(null)
  }

  const toggleEditQueryLifecycle = (lifecycle: string) => {
    setEditingQueryStateRule(prev => ({
      ...prev,
      queryLifecycle: prev.queryLifecycle.includes(lifecycle)
        ? prev.queryLifecycle.filter(l => l !== lifecycle)
        : [...prev.queryLifecycle, lifecycle]
    }))
  }

  const toggleEditCarrier = (carrier: string) => {
    setEditingQueryStateRule(prev => ({
      ...prev,
      carrier: prev.carrier.includes(carrier)
        ? prev.carrier.filter(c => c !== carrier)
        : [...prev.carrier, carrier]
    }))
  }

  const handleOpenParcelCountRuleModal = () => {
    setNewParcelCountRule({
      ruleDescription: "",
      queryCondition: "",
      parcelCount: "",
      skillLevel: "",
    })
    setIsParcelCountRuleModalOpen(true)
  }

  const handleAddParcelCountRule = () => {
    if (newParcelCountRule.ruleDescription || newParcelCountRule.parcelCount) {
      const newRule: ParcelCountRule = {
        id: String(parcelCountRules.length + 1),
        ruleDescription: newParcelCountRule.ruleDescription,
        queryCondition: newParcelCountRule.queryCondition,
        parcelCount: newParcelCountRule.parcelCount,
        skillLevel: newParcelCountRule.skillLevel || "L1",
      }
      setParcelCountRules([...parcelCountRules, newRule])
      setNewParcelCountRule({
        ruleDescription: "",
        queryCondition: "",
        parcelCount: "",
        skillLevel: "",
      })
      setIsParcelCountRuleModalOpen(false)
    }
  }

  const handleEditParcelCountRule = (rule: ParcelCountRule) => {
    setEditingParcelCountRuleId(rule.id)
    setEditingParcelCountRule({
      ruleDescription: rule.ruleDescription,
      queryCondition: rule.queryCondition,
      parcelCount: rule.parcelCount,
      skillLevel: rule.skillLevel,
    })
  }

  const handleSaveParcelCountRuleEdit = (ruleId: string) => {
    setParcelCountRules(parcelCountRules.map(rule =>
      rule.id === ruleId
        ? { ...rule, ...editingParcelCountRule }
        : rule
    ))
    setEditingParcelCountRuleId(null)
  }

  const handleCancelParcelCountRuleEdit = () => {
    setEditingParcelCountRuleId(null)
  }

  const handleOpenConsignmentStateRuleModal = () => {
    setNewConsignmentStateRule({
      ruleDescription: "",
      consignmentState: "",
      queryLifecycle: [],
      skillLevel: "",
    })
    setIsConsignmentStateRuleModalOpen(true)
  }

  const handleAddConsignmentStateRule = () => {
    if (newConsignmentStateRule.ruleDescription || newConsignmentStateRule.consignmentState) {
      const newRule: ConsignmentStateRule = {
        id: String(consignmentStateRules.length + 1),
        ruleDescription: newConsignmentStateRule.ruleDescription,
        consignmentState: newConsignmentStateRule.consignmentState,
        queryLifecycle: newConsignmentStateRule.queryLifecycle.join(", "),
        skillLevel: newConsignmentStateRule.skillLevel || "L1",
      }
      setConsignmentStateRules([...consignmentStateRules, newRule])
      setNewConsignmentStateRule({
        ruleDescription: "",
        consignmentState: "",
        queryLifecycle: [],
        skillLevel: "",
      })
      setIsConsignmentStateRuleModalOpen(false)
    }
  }

  const toggleConsignmentQueryLifecycle = (lifecycle: string) => {
    setNewConsignmentStateRule(prev => ({
      ...prev,
      queryLifecycle: prev.queryLifecycle.includes(lifecycle)
        ? prev.queryLifecycle.filter(l => l !== lifecycle)
        : [...prev.queryLifecycle, lifecycle]
    }))
  }

  const handleEditConsignmentStateRule = (rule: ConsignmentStateRule) => {
    setEditingConsignmentStateRuleId(rule.id)
    setEditingConsignmentStateRule({
      ruleDescription: rule.ruleDescription,
      consignmentState: rule.consignmentState,
      queryLifecycle: rule.queryLifecycle ? rule.queryLifecycle.split(", ").map(s => s.trim()).filter(Boolean) : [],
      skillLevel: rule.skillLevel,
    })
  }

  const handleSaveConsignmentStateRuleEdit = (ruleId: string) => {
    setConsignmentStateRules(consignmentStateRules.map(rule =>
      rule.id === ruleId
        ? {
          ...rule,
          ruleDescription: editingConsignmentStateRule.ruleDescription,
          consignmentState: editingConsignmentStateRule.consignmentState,
          queryLifecycle: editingConsignmentStateRule.queryLifecycle.join(", "),
          skillLevel: editingConsignmentStateRule.skillLevel,
        }
        : rule
    ))
    setEditingConsignmentStateRuleId(null)
  }

  const handleCancelConsignmentStateRuleEdit = () => {
    setEditingConsignmentStateRuleId(null)
  }

  const toggleEditConsignmentQueryLifecycle = (lifecycle: string) => {
    setEditingConsignmentStateRule(prev => ({
      ...prev,
      queryLifecycle: prev.queryLifecycle.includes(lifecycle)
        ? prev.queryLifecycle.filter(l => l !== lifecycle)
        : [...prev.queryLifecycle, lifecycle]
    }))
  }

  const handleOpenCustomerBasedRuleModal = () => {
    setNewCustomerBasedRule({
      ruleDescription: "",
      customer: "",
      carrier: [],
      skillLevel: "",
    })
    setIsCustomerBasedRuleModalOpen(true)
  }

  const handleAddCustomerBasedRule = () => {
    if (newCustomerBasedRule.ruleDescription || newCustomerBasedRule.customer) {
      const newRule: CustomerBasedRule = {
        id: String(customerBasedRules.length + 1),
        ruleDescription: newCustomerBasedRule.ruleDescription,
        customer: newCustomerBasedRule.customer,
        carrier: newCustomerBasedRule.carrier.join(", "),
        skillLevel: newCustomerBasedRule.skillLevel || "L1",
      }
      setCustomerBasedRules([...customerBasedRules, newRule])
      setNewCustomerBasedRule({
        ruleDescription: "",
        customer: "",
        carrier: [],
        skillLevel: "",
      })
      setIsCustomerBasedRuleModalOpen(false)
    }
  }

  const toggleCustomerBasedCarrier = (carrier: string) => {
    setNewCustomerBasedRule(prev => ({
      ...prev,
      carrier: prev.carrier.includes(carrier)
        ? prev.carrier.filter(c => c !== carrier)
        : [...prev.carrier, carrier]
    }))
  }

  const handleEditCustomerBasedRule = (rule: CustomerBasedRule) => {
    setEditingCustomerBasedRuleId(rule.id)
    setEditingCustomerBasedRule({
      ruleDescription: rule.ruleDescription,
      customer: rule.customer,
      carrier: rule.carrier ? rule.carrier.split(", ").map(s => s.trim()).filter(Boolean) : [],
      skillLevel: rule.skillLevel,
    })
  }

  const handleSaveCustomerBasedRuleEdit = (ruleId: string) => {
    setCustomerBasedRules(customerBasedRules.map(rule =>
      rule.id === ruleId
        ? {
          ...rule,
          ruleDescription: editingCustomerBasedRule.ruleDescription,
          customer: editingCustomerBasedRule.customer,
          carrier: editingCustomerBasedRule.carrier.join(", "),
          skillLevel: editingCustomerBasedRule.skillLevel,
        }
        : rule
    ))
    setEditingCustomerBasedRuleId(null)
  }

  const handleCancelCustomerBasedRuleEdit = () => {
    setEditingCustomerBasedRuleId(null)
  }

  const toggleEditCustomerBasedCarrier = (carrier: string) => {
    setEditingCustomerBasedRule(prev => ({
      ...prev,
      carrier: prev.carrier.includes(carrier)
        ? prev.carrier.filter(c => c !== carrier)
        : [...prev.carrier, carrier]
    }))
  }

  const handleOpenElapsedDaysRuleModal = () => {
    setNewElapsedDaysRule({
      ruleDescription: "",
      elapsedDays: "",
      skillLevel: "",
    })
    setIsElapsedDaysRuleModalOpen(true)
  }

  const handleAddElapsedDaysRule = () => {
    if (newElapsedDaysRule.ruleDescription || newElapsedDaysRule.elapsedDays) {
      const newRule: ElapsedDaysRule = {
        id: String(elapsedDaysRules.length + 1),
        ruleDescription: newElapsedDaysRule.ruleDescription,
        elapsedDays: newElapsedDaysRule.elapsedDays,
        skillLevel: newElapsedDaysRule.skillLevel || "L1",
      }
      setElapsedDaysRules([...elapsedDaysRules, newRule])
      setNewElapsedDaysRule({
        ruleDescription: "",
        elapsedDays: "",
        skillLevel: "",
      })
      setIsElapsedDaysRuleModalOpen(false)
    }
  }

  const handleEditElapsedDaysRule = (rule: ElapsedDaysRule) => {
    setEditingElapsedDaysRuleId(rule.id)
    setEditingElapsedDaysRule({
      ruleDescription: rule.ruleDescription,
      elapsedDays: rule.elapsedDays,
      skillLevel: rule.skillLevel,
    })
  }

  const handleSaveElapsedDaysRuleEdit = (ruleId: string) => {
    setElapsedDaysRules(elapsedDaysRules.map(rule =>
      rule.id === ruleId
        ? { ...rule, ...editingElapsedDaysRule }
        : rule
    ))
    setEditingElapsedDaysRuleId(null)
  }

  const handleCancelElapsedDaysRuleEdit = () => {
    setEditingElapsedDaysRuleId(null)
  }

  const handleEditGeneralRule = (rule: AdvancedRule) => {
    setEditingGeneralRuleId(rule.id)
    setEditingGeneralRule({
      ruleDescription: rule.ruleDescription,
      keyword: rule.keyword,
      itemValue: rule.itemValue,
      skillLevel: rule.skillLevel,
    })
  }

  const handleSaveGeneralRuleEdit = (ruleId: string) => {
    setRules(rules.map(rule =>
      rule.id === ruleId
        ? { ...rule, ...editingGeneralRule }
        : rule
    ))
    setEditingGeneralRuleId(null)
  }

  const handleCancelGeneralRuleEdit = () => {
    setEditingGeneralRuleId(null)
  }

  const handleOpenDeleteModal = (section: string, id: string, description: string) => {
    setDeleteTarget({ section, id, description })
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return

    switch (deleteTarget.section) {
      case "general":
        setRules(rules.filter(r => r.id !== deleteTarget.id))
        break
      case "queryState":
        setQueryStateRules(queryStateRules.filter(r => r.id !== deleteTarget.id))
        break
      case "parcelCount":
        setParcelCountRules(parcelCountRules.filter(r => r.id !== deleteTarget.id))
        break
      case "consignmentState":
        setConsignmentStateRules(consignmentStateRules.filter(r => r.id !== deleteTarget.id))
        break
      case "customerBased":
        setCustomerBasedRules(customerBasedRules.filter(r => r.id !== deleteTarget.id))
        break
      case "elapsedDays":
        setElapsedDaysRules(elapsedDaysRules.filter(r => r.id !== deleteTarget.id))
        break
    }

    setDeleteModalOpen(false)
    setDeleteTarget(null)
  }

  const getSkillLevelBadgeClass = (skillLevel: string) => {
    switch (skillLevel) {
      case "L4": return "bg-purple-100 text-purple-800"
      case "L3": return "bg-blue-100 text-blue-800"
      case "L2": return "bg-green-100 text-green-800"
      case "MGM": return "bg-orange-100 text-orange-800"
      case "ADM": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page header bar */}
      <div className="flex items-center justify-between border-b pb-3 mb-6">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-foreground shrink-0" />
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Advanced Rules</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">JA</div>
          <div className="text-right">
            <p className="text-xs font-semibold text-foreground leading-tight">Jacquie Cadger</p>
            <p className="text-xs text-muted-foreground leading-tight">admin</p>
          </div>
        </div>
      </div>

      {/* General Advanced Rules */}
      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">General Advanced Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenGeneralRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    Keyword
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Customer must specifically state the keyword(s) in the query text</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    Item Value £
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Customer must specifically state the item value and the stated value must be equal to or greater than the assigned value</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                    No advanced rules defined
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingGeneralRuleId === rule.id ? (
                        <Input
                          value={editingGeneralRule.ruleDescription}
                          onChange={(e) => setEditingGeneralRule({ ...editingGeneralRule, ruleDescription: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingGeneralRuleId === rule.id ? (
                        <Input
                          value={editingGeneralRule.keyword}
                          onChange={(e) => setEditingGeneralRule({ ...editingGeneralRule, keyword: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.keyword
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingGeneralRuleId === rule.id ? (
                        <Input
                          value={editingGeneralRule.itemValue}
                          onChange={(e) => setEditingGeneralRule({ ...editingGeneralRule, itemValue: e.target.value })}
                          className="h-8 text-sm w-24"
                        />
                      ) : (
                        rule.itemValue
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingGeneralRuleId === rule.id ? (
                        <Select
                          value={editingGeneralRule.skillLevel}
                          onValueChange={(value) => setEditingGeneralRule({ ...editingGeneralRule, skillLevel: value })}
                        >
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getSkillLevelBadgeClass(rule.skillLevel)}`}>
                          {rule.skillLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingGeneralRuleId === rule.id ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveGeneralRuleEdit(rule.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleCancelGeneralRuleEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => handleEditGeneralRule(rule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Delete" onClick={() => handleOpenDeleteModal("general", rule.id, rule.ruleDescription)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Query State Specific Rules */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Query State Specific Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenQueryStateRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Lifecycle</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Lifecycle Count Threshold</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Carrier</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queryStateRules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
                    No query state specific rules defined
                  </td>
                </tr>
              ) : (
                queryStateRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingQueryStateRuleId === rule.id ? (
                        <Input
                          value={editingQueryStateRule.ruleDescription}
                          onChange={(e) => setEditingQueryStateRule({ ...editingQueryStateRule, ruleDescription: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingQueryStateRuleId === rule.id ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-full justify-between font-normal text-left">
                              <span className="truncate text-xs">
                                {editingQueryStateRule.queryLifecycle.length > 0
                                  ? editingQueryStateRule.queryLifecycle.join(", ")
                                  : "Select"}
                              </span>
                              <ChevronDown className="h-3 w-3 opacity-50 shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-2" align="start">
                            <div className="grid gap-2">
                              {QUERY_LIFECYCLES.map((lifecycle) => (
                                <div key={lifecycle} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`edit-lifecycle-${rule.id}-${lifecycle}`}
                                    checked={editingQueryStateRule.queryLifecycle.includes(lifecycle)}
                                    onCheckedChange={() => toggleEditQueryLifecycle(lifecycle)}
                                  />
                                  <label htmlFor={`edit-lifecycle-${rule.id}-${lifecycle}`} className="text-sm cursor-pointer">
                                    {lifecycle}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        rule.queryLifecycle
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingQueryStateRuleId === rule.id ? (
                        <Input
                          value={editingQueryStateRule.lifecycleCountThreshold}
                          onChange={(e) => setEditingQueryStateRule({ ...editingQueryStateRule, lifecycleCountThreshold: e.target.value })}
                          className="h-8 text-sm w-20"
                        />
                      ) : (
                        rule.lifecycleCountThreshold
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingQueryStateRuleId === rule.id ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-full justify-between font-normal text-left">
                              <span className="truncate text-xs">
                                {editingQueryStateRule.carrier.length > 0
                                  ? editingQueryStateRule.carrier.join(", ")
                                  : "Select"}
                              </span>
                              <ChevronDown className="h-3 w-3 opacity-50 shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-2 max-h-60 overflow-y-auto" align="start">
                            <div className="grid gap-2">
                              {CARRIERS.map((carrier) => (
                                <div key={carrier} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`edit-carrier-${rule.id}-${carrier}`}
                                    checked={editingQueryStateRule.carrier.includes(carrier)}
                                    onCheckedChange={() => toggleEditCarrier(carrier)}
                                  />
                                  <label htmlFor={`edit-carrier-${rule.id}-${carrier}`} className="text-sm cursor-pointer">
                                    {carrier}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        rule.carrier
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingQueryStateRuleId === rule.id ? (
                        <Select
                          value={editingQueryStateRule.skillLevel}
                          onValueChange={(value) => setEditingQueryStateRule({ ...editingQueryStateRule, skillLevel: value })}
                        >
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getSkillLevelBadgeClass(rule.skillLevel)}`}>
                          {rule.skillLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingQueryStateRuleId === rule.id ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveQueryStateRuleEdit(rule.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleCancelQueryStateRuleEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => handleEditQueryStateRule(rule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Delete" onClick={() => handleOpenDeleteModal("queryState", rule.id, rule.ruleDescription)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Parcel Count Rules */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Parcel Count Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenParcelCountRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Condition</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Parcel Count</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcelCountRules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                    No parcel count rules defined
                  </td>
                </tr>
              ) : (
                parcelCountRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingParcelCountRuleId === rule.id ? (
                        <Input
                          value={editingParcelCountRule.ruleDescription}
                          onChange={(e) => setEditingParcelCountRule({ ...editingParcelCountRule, ruleDescription: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingParcelCountRuleId === rule.id ? (
                        <Input
                          value={editingParcelCountRule.queryCondition}
                          onChange={(e) => setEditingParcelCountRule({ ...editingParcelCountRule, queryCondition: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.queryCondition
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingParcelCountRuleId === rule.id ? (
                        <Input
                          value={editingParcelCountRule.parcelCount}
                          onChange={(e) => setEditingParcelCountRule({ ...editingParcelCountRule, parcelCount: e.target.value })}
                          className="h-8 text-sm w-20"
                        />
                      ) : (
                        rule.parcelCount
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingParcelCountRuleId === rule.id ? (
                        <Select
                          value={editingParcelCountRule.skillLevel}
                          onValueChange={(value) => setEditingParcelCountRule({ ...editingParcelCountRule, skillLevel: value })}
                        >
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getSkillLevelBadgeClass(rule.skillLevel)}`}>
                          {rule.skillLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingParcelCountRuleId === rule.id ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveParcelCountRuleEdit(rule.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleCancelParcelCountRuleEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => handleEditParcelCountRule(rule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Delete" onClick={() => handleOpenDeleteModal("parcelCount", rule.id, rule.ruleDescription)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Consignment State Based Rules */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Consignment State Based Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenConsignmentStateRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Consignment State</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Query Lifecycle</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {consignmentStateRules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                    No consignment state based rules defined
                  </td>
                </tr>
              ) : (
                consignmentStateRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingConsignmentStateRuleId === rule.id ? (
                        <Input
                          value={editingConsignmentStateRule.ruleDescription}
                          onChange={(e) => setEditingConsignmentStateRule({ ...editingConsignmentStateRule, ruleDescription: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingConsignmentStateRuleId === rule.id ? (
                        <Select
                          value={editingConsignmentStateRule.consignmentState}
                          onValueChange={(value) => setEditingConsignmentStateRule({ ...editingConsignmentStateRule, consignmentState: value })}
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CONSIGNMENT_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        rule.consignmentState
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingConsignmentStateRuleId === rule.id ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-full justify-between font-normal text-left">
                              <span className="truncate text-xs">
                                {editingConsignmentStateRule.queryLifecycle.length > 0
                                  ? editingConsignmentStateRule.queryLifecycle.join(", ")
                                  : "Select"}
                              </span>
                              <ChevronDown className="h-3 w-3 opacity-50 shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-2" align="start">
                            <div className="grid gap-2">
                              {QUERY_LIFECYCLES.map((lifecycle) => (
                                <div key={lifecycle} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`edit-cs-lifecycle-${rule.id}-${lifecycle}`}
                                    checked={editingConsignmentStateRule.queryLifecycle.includes(lifecycle)}
                                    onCheckedChange={() => toggleEditConsignmentQueryLifecycle(lifecycle)}
                                  />
                                  <label htmlFor={`edit-cs-lifecycle-${rule.id}-${lifecycle}`} className="text-sm cursor-pointer">
                                    {lifecycle}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        rule.queryLifecycle
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingConsignmentStateRuleId === rule.id ? (
                        <Select
                          value={editingConsignmentStateRule.skillLevel}
                          onValueChange={(value) => setEditingConsignmentStateRule({ ...editingConsignmentStateRule, skillLevel: value })}
                        >
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getSkillLevelBadgeClass(rule.skillLevel)}`}>
                          {rule.skillLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingConsignmentStateRuleId === rule.id ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveConsignmentStateRuleEdit(rule.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleCancelConsignmentStateRuleEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => handleEditConsignmentStateRule(rule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Delete" onClick={() => handleOpenDeleteModal("consignmentState", rule.id, rule.ruleDescription)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Customer Carrier Based Rules */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Customer Carrier Based Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenCustomerBasedRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Carrier</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerBasedRules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                    No customer based rules defined
                  </td>
                </tr>
              ) : (
                customerBasedRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingCustomerBasedRuleId === rule.id ? (
                        <Input
                          value={editingCustomerBasedRule.ruleDescription}
                          onChange={(e) => setEditingCustomerBasedRule({ ...editingCustomerBasedRule, ruleDescription: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingCustomerBasedRuleId === rule.id ? (
                        <Select
                          value={editingCustomerBasedRule.customer}
                          onValueChange={(value) => setEditingCustomerBasedRule({ ...editingCustomerBasedRule, customer: value })}
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CUSTOMERS.map((customer) => (
                              <SelectItem key={customer} value={customer}>
                                {customer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        rule.customer
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingCustomerBasedRuleId === rule.id ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-full justify-between font-normal text-left">
                              <span className="truncate text-xs">
                                {editingCustomerBasedRule.carrier.length > 0
                                  ? editingCustomerBasedRule.carrier.join(", ")
                                  : "Select"}
                              </span>
                              <ChevronDown className="h-3 w-3 opacity-50 shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-2 max-h-60 overflow-y-auto" align="start">
                            <div className="grid gap-2">
                              {CARRIERS.map((carrier) => (
                                <div key={carrier} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`edit-cb-carrier-${rule.id}-${carrier}`}
                                    checked={editingCustomerBasedRule.carrier.includes(carrier)}
                                    onCheckedChange={() => toggleEditCustomerBasedCarrier(carrier)}
                                  />
                                  <label htmlFor={`edit-cb-carrier-${rule.id}-${carrier}`} className="text-sm cursor-pointer">
                                    {carrier}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        rule.carrier
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingCustomerBasedRuleId === rule.id ? (
                        <Select
                          value={editingCustomerBasedRule.skillLevel}
                          onValueChange={(value) => setEditingCustomerBasedRule({ ...editingCustomerBasedRule, skillLevel: value })}
                        >
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getSkillLevelBadgeClass(rule.skillLevel)}`}>
                          {rule.skillLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingCustomerBasedRuleId === rule.id ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveCustomerBasedRuleEdit(rule.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleCancelCustomerBasedRuleEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => handleEditCustomerBasedRule(rule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Delete" onClick={() => handleOpenDeleteModal("customerBased", rule.id, rule.ruleDescription)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Elapsed Days Since Last Scan Rules */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Elapsed Days Since Last Scan Rules</h2>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleOpenElapsedDaysRuleModal}>
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Rule Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Elapsed Days</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Skill Level</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {elapsedDaysRules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
                    No elapsed days rules defined
                  </td>
                </tr>
              ) : (
                elapsedDaysRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingElapsedDaysRuleId === rule.id ? (
                        <Input
                          value={editingElapsedDaysRule.ruleDescription}
                          onChange={(e) => setEditingElapsedDaysRule({ ...editingElapsedDaysRule, ruleDescription: e.target.value })}
                          className="h-8 text-sm"
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingElapsedDaysRuleId === rule.id ? (
                        <Input
                          value={editingElapsedDaysRule.elapsedDays}
                          onChange={(e) => setEditingElapsedDaysRule({ ...editingElapsedDaysRule, elapsedDays: e.target.value })}
                          className="h-8 text-sm w-20"
                        />
                      ) : (
                        rule.elapsedDays
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingElapsedDaysRuleId === rule.id ? (
                        <Select
                          value={editingElapsedDaysRule.skillLevel}
                          onValueChange={(value) => setEditingElapsedDaysRule({ ...editingElapsedDaysRule, skillLevel: value })}
                        >
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getSkillLevelBadgeClass(rule.skillLevel)}`}>
                          {rule.skillLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {editingElapsedDaysRuleId === rule.id ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveElapsedDaysRuleEdit(rule.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleCancelElapsedDaysRuleEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => handleEditElapsedDaysRule(rule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors" title="Delete" onClick={() => handleOpenDeleteModal("elapsedDays", rule.id, rule.ruleDescription)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add General Advanced Rule Modal */}
      <Dialog open={isGeneralRuleModalOpen} onOpenChange={setIsGeneralRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add General Advanced Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="ruleDescription">Rule Description</Label>
              <Input
                id="ruleDescription"
                value={newGeneralRule.ruleDescription}
                onChange={(e) => setNewGeneralRule({ ...newGeneralRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keyword">Keyword</Label>
              <Input
                id="keyword"
                value={newGeneralRule.keyword}
                onChange={(e) => setNewGeneralRule({ ...newGeneralRule, keyword: e.target.value })}
                placeholder="Enter keyword(s)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="itemValue">Item Value</Label>
              <Input
                id="itemValue"
                value={newGeneralRule.itemValue}
                onChange={(e) => setNewGeneralRule({ ...newGeneralRule, itemValue: e.target.value })}
                placeholder="Enter item value"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select
                value={newGeneralRule.skillLevel}
                onValueChange={(value) => setNewGeneralRule({ ...newGeneralRule, skillLevel: value })}
              >
                <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGeneralRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGeneralRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Query State Specific Rule Modal */}
      <Dialog open={isQueryStateRuleModalOpen} onOpenChange={setIsQueryStateRuleModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Query State Specific Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="qsRuleDescription">Rule Description</Label>
              <Input
                id="qsRuleDescription"
                value={newQueryStateRule.ruleDescription}
                onChange={(e) => setNewQueryStateRule({ ...newQueryStateRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label>Query Lifecycle</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {newQueryStateRule.queryLifecycle.length > 0
                      ? newQueryStateRule.queryLifecycle.join(", ")
                      : "Select lifecycle stages"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2" align="start">
                  <div className="grid gap-2">
                    {QUERY_LIFECYCLES.map((lifecycle) => (
                      <div key={lifecycle} className="flex items-center gap-2">
                        <Checkbox
                          id={`lifecycle-${lifecycle}`}
                          checked={newQueryStateRule.queryLifecycle.includes(lifecycle)}
                          onCheckedChange={() => toggleQueryLifecycle(lifecycle)}
                        />
                        <label htmlFor={`lifecycle-${lifecycle}`} className="text-sm cursor-pointer">
                          {lifecycle}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="qsLifecycleThreshold">Lifecycle Count Threshold</Label>
              <Input
                id="qsLifecycleThreshold"
                value={newQueryStateRule.lifecycleCountThreshold}
                onChange={(e) => setNewQueryStateRule({ ...newQueryStateRule, lifecycleCountThreshold: e.target.value })}
                placeholder="Enter threshold"
              />
            </div>
            <div className="grid gap-2">
              <Label>Carrier</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal text-left">
                    <span className="truncate">
                      {newQueryStateRule.carrier.length > 0
                        ? newQueryStateRule.carrier.join(", ")
                        : "Select carriers"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2 max-h-60 overflow-y-auto" align="start">
                  <div className="grid gap-2">
                    {CARRIERS.map((carrier) => (
                      <div key={carrier} className="flex items-center gap-2">
                        <Checkbox
                          id={`carrier-${carrier}`}
                          checked={newQueryStateRule.carrier.includes(carrier)}
                          onCheckedChange={() => toggleCarrier(carrier)}
                        />
                        <label htmlFor={`carrier-${carrier}`} className="text-sm cursor-pointer">
                          {carrier}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="qsSkillLevel">Skill Level</Label>
              <Select
                value={newQueryStateRule.skillLevel}
                onValueChange={(value) => setNewQueryStateRule({ ...newQueryStateRule, skillLevel: value })}
              >
                <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQueryStateRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQueryStateRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Elapsed Days Since Last Scan Rule Modal */}
      <Dialog open={isElapsedDaysRuleModalOpen} onOpenChange={setIsElapsedDaysRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Elapsed Days Since Last Scan Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edRuleDescription">Rule Description</Label>
              <Input
                id="edRuleDescription"
                value={newElapsedDaysRule.ruleDescription}
                onChange={(e) => setNewElapsedDaysRule({ ...newElapsedDaysRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edElapsedDays">Elapsed Days</Label>
              <Input
                id="edElapsedDays"
                value={newElapsedDaysRule.elapsedDays}
                onChange={(e) => setNewElapsedDaysRule({ ...newElapsedDaysRule, elapsedDays: e.target.value })}
                placeholder="Enter elapsed days"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edSkillLevel">Skill Level</Label>
              <Select
                value={newElapsedDaysRule.skillLevel}
                onValueChange={(value) => setNewElapsedDaysRule({ ...newElapsedDaysRule, skillLevel: value })}
              >
                <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsElapsedDaysRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddElapsedDaysRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Customer Based Rule Modal */}
      <Dialog open={isCustomerBasedRuleModalOpen} onOpenChange={setIsCustomerBasedRuleModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Customer Based Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cbRuleDescription">Rule Description</Label>
              <Input
                id="cbRuleDescription"
                value={newCustomerBasedRule.ruleDescription}
                onChange={(e) => setNewCustomerBasedRule({ ...newCustomerBasedRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cbCustomer">Customer</Label>
              <Select
                value={newCustomerBasedRule.customer}
                onValueChange={(value) => setNewCustomerBasedRule({ ...newCustomerBasedRule, customer: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {CUSTOMERS.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Carrier</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal text-left">
                    <span className="truncate">
                      {newCustomerBasedRule.carrier.length > 0
                        ? newCustomerBasedRule.carrier.join(", ")
                        : "Select carriers"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2 max-h-60 overflow-y-auto" align="start">
                  <div className="grid gap-2">
                    {CARRIERS.map((carrier) => (
                      <div key={carrier} className="flex items-center gap-2">
                        <Checkbox
                          id={`cb-carrier-${carrier}`}
                          checked={newCustomerBasedRule.carrier.includes(carrier)}
                          onCheckedChange={() => toggleCustomerBasedCarrier(carrier)}
                        />
                        <label htmlFor={`cb-carrier-${carrier}`} className="text-sm cursor-pointer">
                          {carrier}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cbSkillLevel">Skill Level</Label>
              <Select
                value={newCustomerBasedRule.skillLevel}
                onValueChange={(value) => setNewCustomerBasedRule({ ...newCustomerBasedRule, skillLevel: value })}
              >
                <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomerBasedRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomerBasedRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Consignment State Based Rule Modal */}
      <Dialog open={isConsignmentStateRuleModalOpen} onOpenChange={setIsConsignmentStateRuleModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Consignment State Based Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="csRuleDescription">Rule Description</Label>
              <Input
                id="csRuleDescription"
                value={newConsignmentStateRule.ruleDescription}
                onChange={(e) => setNewConsignmentStateRule({ ...newConsignmentStateRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="csConsignmentState">Consignment State</Label>
              <Select
                value={newConsignmentStateRule.consignmentState}
                onValueChange={(value) => setNewConsignmentStateRule({ ...newConsignmentStateRule, consignmentState: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select consignment state" />
                </SelectTrigger>
                <SelectContent>
                  {CONSIGNMENT_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Query Lifecycle</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {newConsignmentStateRule.queryLifecycle.length > 0
                      ? newConsignmentStateRule.queryLifecycle.join(", ")
                      : "Select lifecycle stages"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2" align="start">
                  <div className="grid gap-2">
                    {QUERY_LIFECYCLES.map((lifecycle) => (
                      <div key={lifecycle} className="flex items-center gap-2">
                        <Checkbox
                          id={`cs-lifecycle-${lifecycle}`}
                          checked={newConsignmentStateRule.queryLifecycle.includes(lifecycle)}
                          onCheckedChange={() => toggleConsignmentQueryLifecycle(lifecycle)}
                        />
                        <label htmlFor={`cs-lifecycle-${lifecycle}`} className="text-sm cursor-pointer">
                          {lifecycle}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="csSkillLevel">Skill Level</Label>
              <Select
                value={newConsignmentStateRule.skillLevel}
                onValueChange={(value) => setNewConsignmentStateRule({ ...newConsignmentStateRule, skillLevel: value })}
              >
                <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConsignmentStateRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddConsignmentStateRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Parcel Count Rule Modal */}
      <Dialog open={isParcelCountRuleModalOpen} onOpenChange={setIsParcelCountRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Parcel Count Rule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pcRuleDescription">Rule Description</Label>
              <Input
                id="pcRuleDescription"
                value={newParcelCountRule.ruleDescription}
                onChange={(e) => setNewParcelCountRule({ ...newParcelCountRule, ruleDescription: e.target.value })}
                placeholder="Enter rule description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pcQueryCondition">Query Condition</Label>
              <Input
                id="pcQueryCondition"
                value={newParcelCountRule.queryCondition}
                onChange={(e) => setNewParcelCountRule({ ...newParcelCountRule, queryCondition: e.target.value })}
                placeholder="Enter query condition"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pcParcelCount">Parcel Count</Label>
              <Input
                id="pcParcelCount"
                value={newParcelCountRule.parcelCount}
                onChange={(e) => setNewParcelCountRule({ ...newParcelCountRule, parcelCount: e.target.value })}
                placeholder="Enter parcel count"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pcSkillLevel">Skill Level</Label>
              <Select
                value={newParcelCountRule.skillLevel}
                onValueChange={(value) => setNewParcelCountRule({ ...newParcelCountRule, skillLevel: value })}
              >
                <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsParcelCountRuleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddParcelCountRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete the rule{" "}
              <span className="font-medium text-foreground">{deleteTarget?.description || "this rule"}</span>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
