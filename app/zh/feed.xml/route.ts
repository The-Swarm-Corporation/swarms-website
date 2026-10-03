import { feedResponse } from "@/lib/rss"

export const dynamic = "force-static"

export function GET() {
  return feedResponse("zh")
}
