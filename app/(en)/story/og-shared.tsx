import { renderOgCard, size, contentType } from "@/lib/og/card"
import { OgMilestones } from "@/lib/og/milestones"

export { size, contentType }
export const alt =
  "The Swarms Story: a timeline of every Swarms release, from a 2023 GPT-3 group chat to RouteHub"

export function renderStoryCard() {
  return renderOgCard({
    eyebrow: "Our story",
    title: "The Swarms Story",
    description: "From a group chat of GPT-3s to a full multi-agent stack.",
    footer: <OgMilestones dateFormat="date" />,
  })
}
