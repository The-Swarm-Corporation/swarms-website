import { OgScreenshot, renderOgCard, resolvePublicImage, size, contentType } from "@/lib/og/card"
import { ogPages } from "@/lib/og/pages"

export { size, contentType }
export const alt = ogPages["/routehub"].alt

export async function renderRouteHubCard() {
  const src = await resolvePublicImage("/route_hub_banner.png")
  return renderOgCard({ ...ogPages["/routehub"], art: src ? <OgScreenshot src={src} /> : undefined })
}
