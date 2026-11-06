import { renderOgCard, size, contentType } from "@/lib/og/card"
import { OgMilestones } from "@/lib/og/milestones"

export { size, contentType }
export const alt =
  "About Swarms: started in 2023 as a research project putting multiple GPT-3 models in a group chat"

export function renderAboutCard() {
  return renderOgCard({
    eyebrow: "About us · Founded 2023",
    title: "Many models, one conversation.",
    description: "How a GPT-3 group chat became the open-source multi-agent stack.",
    footer: <OgMilestones dateFormat="year" />,
  })
}
