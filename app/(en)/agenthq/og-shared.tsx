import { OgScreenshot, renderOgCard, resolvePublicImage, size, contentType } from "@/lib/og/card"
import { ogPages } from "@/lib/og/pages"

export { size, contentType }
export const alt = ogPages["/agenthq"].alt

export async function renderAgentHQCard() {
  const src = await resolvePublicImage("/agenthq_game_map.png")
  return renderOgCard({ ...ogPages["/agenthq"], art: src ? <OgScreenshot src={src} /> : undefined })
}
