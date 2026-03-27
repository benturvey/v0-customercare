export interface ShipmentFilters {
  customer: string
  carrier: string
  service: string
  consignmentNo: string
  parcelNo: string
  trackingNo: string
  shipmentReferenceNo: string
  company: string
  county: string
  postcode: string
  country: string
  despatchDatePeriod: string
  despatchDateFrom: string
  despatchDateTo: string
  includeExceptions: boolean
  exceptionsOnly: boolean
  includeDeleted: boolean
}

export interface Shipment {
  id: string
  sender: string
  despatchDate: string
  carrier: string
  service: string
  consignmentNo: string
  shipRef: string
  scanText: string
  packs: number
  country: string
  contractNo: string
  isException?: boolean
  isDeleted?: boolean
}

export interface DeliveryAddress {
  contact: string
  contactMobile: string
  contactPhone: string
  company: string
  addressLine1: string
  addressLine2: string
  district: string
  county: string
  town: string
  country: string
  postcode: string
  email: string
}

export interface CollectionAddress {
  contact: string
  contactMobile: string
  contactPhone: string
  company: string
  addressLine1: string
  addressLine2: string
  district: string
  county: string
  town: string
  country: string
  postcode: string
  email: string
}

export interface Piece {
  itemNo: number
  parcelNo: string
  carrierScanDate: string
  carrierText: string
  swap: string
}

export interface PieceHistory {
  carrierScanDate: string
  carrierScanText: string
  gfsScanText: string
  receivedByGfs: string
  scanDepot: string
  scanDeptName: string
}

export interface Query {
  no: number
  queryId: string
  state: string
  raisedBy: string
  createdDate: string
  preferredContactType: string
  telNo: string
  email: string
}

export interface QueryHistoryItem {
  messageTime: string
  messageText: string
  source: string
  lifeCycle: string
  userName: string
}

export interface CustomsItem {
  item: number
  productDescription: string
  countryOfManufacture: string
  value: number
  hsCode: string
}

export interface CustomsDetails {
  eoriNumber: string
  iossNumber: string
  consignmentValue: number
  items: CustomsItem[]
}

export interface ShipmentDetails {
  consignmentNo: string
  insertDate: string
  despatchDate: string
  customer: string
  carrier: string
  status: string
  service: string
  weight: number
  content: string
  accountNo: string
  contractNo: string
  contractComment: string
  sender: string
  instructions: string
  shipmentRef: string
  consignmentRef: string
  trackingNo: string
  collectionId: string
  originDepot: string
  destinationDepot: string
  deliveryAddress?: DeliveryAddress
  collectionAddress?: CollectionAddress
  pieces?: Piece[]
  pieceHistory?: PieceHistory[]
  queries?: Query[]
  queryHistory?: QueryHistoryItem[]
  customsDetails?: CustomsDetails
}

export const DESPATCH_DATE_PERIODS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last3days", label: "Last 3 days" },
  { value: "last7days", label: "Last 7 days" },
  { value: "last14days", label: "Last 14 days" },
  { value: "currentMonth", label: "Current month" },
  { value: "previousMonth", label: "Previous month" },
] as const

export const CUSTOMERS = [
  { value: "abbottlyon", label: "ABBOTT LYON LTD" },
  { value: "crewclothing", label: "CREW CLOTHING CO LIMITED" },
  { value: "mamaspapas", label: "MAMAS & PAPAS" },
  { value: "okadirect", label: "OKA DIRECT LIMITED" },
  { value: "robertwelch", label: "ROBERT WELCH DESIGNS LIMITED" },
  { value: "servicelogistics", label: "SERVICE LOGISTICS" },
] as const

export const CARRIERS = [
  { value: "amazonlogistics", label: "AMAZON LOGISTICS UK" },
  { value: "bjs", label: "BJS" },
  { value: "dhlecommerce", label: "DHL ECOMMERCE UK" },
  { value: "dhlexpress", label: "DHL EXPRESS" },
  { value: "dpd", label: "DPD" },
  { value: "dpdde", label: "DPD DE" },
  { value: "dpdlocal", label: "DPD LOCAL" },
  { value: "dpdnl", label: "DPD NL" },
  { value: "dxfreight", label: "DX FREIGHT" },
  { value: "evri", label: "EVRI" },
  { value: "evrips", label: "EVRI PS" },
  { value: "exelot", label: "EXELOT" },
  { value: "fedex", label: "FEDEX" },
  { value: "gfsinternational", label: "GFS INTERNATIONAL" },
  { value: "ocs", label: "OCS" },
  { value: "ups", label: "UPS" },
] as const

export const SERVICES = [
  { value: "express", label: "Express" },
  { value: "standard", label: "Standard" },
  { value: "economy", label: "Economy" },
  { value: "nextday", label: "Next Day" },
  { value: "sameday", label: "Same Day" },
] as const

export const COUNTRIES = [
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "nl", label: "Netherlands" },
  { value: "be", label: "Belgium" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "us", label: "United States" },
] as const
