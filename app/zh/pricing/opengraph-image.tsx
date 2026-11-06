import { size, contentType } from "@/lib/og/card"
import { ogPages, renderPageCard } from "@/lib/og/pages"

export { size, contentType }
export const alt = ogPages["/zh/pricing"].alt

export default function Image() {
  return renderPageCard("/zh/pricing")
}
