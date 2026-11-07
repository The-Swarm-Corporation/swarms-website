import { renderIndustryCard, size, contentType } from "../og-shared"

export { size, contentType }
export const alt = "Swarms for Marketing: AI agent teams on the Swarms API"

export default async function Image() {
  return renderIndustryCard("marketing")
}
