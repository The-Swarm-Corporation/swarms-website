import { renderIndustryCard, size, contentType } from "./og-shared"

export { size, contentType }
export const alt = "Swarms by industry: AI agent teams on the Swarms API for finance, healthcare, manufacturing, legal and more"

export default async function Image() {
  return renderIndustryCard()
}
