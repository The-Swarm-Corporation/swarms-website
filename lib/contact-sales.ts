// Shared by the contact sales form and its API route so the options the
// form offers are exactly the values the route accepts.
export const SALES_PRODUCTS = [
  { id: "swarms-cloud", label: "Swarms Cloud" },
  { id: "swarms-api", label: "Swarms API" },
  { id: "swarms-python", label: "Swarms Python framework" },
  { id: "swarms-rs", label: "Swarms RS" },
  { id: "routehub", label: "RouteHub" },
  { id: "marketplace", label: "Swarms Marketplace" },
  { id: "enterprise", label: "Enterprise deployment" },
  { id: "other", label: "Something else" },
] as const

export type SalesProductId = (typeof SALES_PRODUCTS)[number]["id"]

export function salesProductLabel(id: string): string | undefined {
  return SALES_PRODUCTS.find((p) => p.id === id)?.label
}
