import { renderCompanyCard, size, contentType } from "@/lib/og/company-card"
import { releases } from "@/lib/story"

export { size, contentType }
export const alt =
  "The Swarms Story: a timeline of every Swarms release, from a 2023 GPT-3 group chat to RouteHub"

export function renderStoryCard() {
  return renderCompanyCard({
    eyebrow: "Our story",
    title: "The Swarms Story",
    subtitle: "From a group chat of GPT-3s to a full multi-agent stack.",
    milestones: releases
      .filter((r) => r.kind === "Product" || r.kind === "Open source")
      .map((r) => ({ date: r.date, label: r.title.replace(/^Swarms /, "") })),
  })
}
