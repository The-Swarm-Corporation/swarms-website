import { renderMarketplaceCard, size, contentType } from "./og-shared"

export { size, contentType }
export const alt = "Swarms Marketplace — buy, sell, and monetize AI agents, prompts, tools, MCP servers, and skills"

export default async function Image() {
  return renderMarketplaceCard()
}
