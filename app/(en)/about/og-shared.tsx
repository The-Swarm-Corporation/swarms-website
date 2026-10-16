import { renderCompanyCard, size, contentType } from "@/lib/og/company-card"
import { releases } from "@/lib/story"

export { size, contentType }
export const alt =
  "About Swarms: started in 2023 as a research project putting multiple GPT-3 models in a group chat"

export function renderAboutCard() {
  return renderCompanyCard({
    eyebrow: "About us · Founded 2023",
    title: "Many models, one conversation.",
    subtitle: "How a GPT-3 group chat became the open-source multi-agent stack.",
    milestones: releases
      .filter((r) => r.kind === "Product" || r.kind === "Open source")
      .map((r) => ({ date: r.year, label: r.title.replace(/^Swarms /, "") })),
  })
}
