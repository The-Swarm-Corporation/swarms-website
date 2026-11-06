import { size, contentType } from "@/lib/og/card"
import { ogPages, renderPageCard } from "@/lib/og/pages"

export { size, contentType }
export const alt = ogPages["/contact-sales"].alt

export default function Image() {
  return renderPageCard("/contact-sales")
}
