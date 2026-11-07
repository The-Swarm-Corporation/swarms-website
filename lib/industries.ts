import type { LucideIcon } from "lucide-react"

const WHITE = "#ffffff"
/** The one accent the industry visuals use for alerts, breaches and rejections. */
export const RED = "#ef4444"
import {
  Building2,
  Factory,
  FlaskConical,
  GraduationCap,
  HardHat,
  HeartPulse,
  Landmark,
  Megaphone,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Umbrella,
  Zap,
} from "lucide-react"

// The industry landing pages under /industries. Each page owns its content
// (data.ts), its live visualizations (visuals.tsx) and its layout (page.tsx);
// this registry is only what the index, the navigation, the sitemap and the
// cross-links between pages need to agree on.

export type IndustrySlug =
  | "finance"
  | "healthcare"
  | "life-sciences"
  | "marketing"
  | "construction"
  | "manufacturing"
  | "legal"
  | "insurance"
  | "retail"
  | "logistics"
  | "energy"
  | "real-estate"
  | "education"
  | "cybersecurity"

export type Industry = {
  slug: IndustrySlug
  name: string
  /** Short line under the name on the index cards and in menus. */
  tagline: string
  /** Meta description, about 150 to 160 characters. */
  description: string
  keywords: string[]
  icon: LucideIcon
  /**
   * Highlight color for chart lines, active diagram nodes and markers. The site
   * is black and white with a little red, so every industry uses white here
   * and the visuals reserve RED for alerts, breaches and rejections.
   */
  accent: string
  /** The orchestration pattern the page's main example runs on the Swarms API. */
  swarmType: string
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "finance",
    name: "Finance",
    tagline: "Research, risk and execution desks staffed by agents.",
    description:
      "Multi-agent AI for finance: equity research, risk review and trade workflows built on the Swarms API, Swarms Cloud and the Swarms Rust framework, with runnable code.",
    keywords: [
      "ai agents for finance",
      "multi-agent ai finance",
      "ai equity research agents",
      "llm trading agents",
      "ai risk management agents",
      "financial analysis ai api",
      "swarms api finance",
    ],
    icon: Landmark,
    accent: WHITE,
    swarmType: "HierarchicalSwarm",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Triage, documentation and coding with a clinician in the loop.",
    description:
      "Multi-agent AI for healthcare: intake triage, clinical documentation and ICD coding pipelines on the Swarms API, with review steps for clinicians and runnable code.",
    keywords: [
      "ai agents for healthcare",
      "multi-agent ai healthcare",
      "clinical documentation ai",
      "medical coding ai agents",
      "patient triage ai",
      "healthcare llm api",
    ],
    icon: HeartPulse,
    accent: WHITE,
    swarmType: "SequentialWorkflow",
  },
  {
    slug: "life-sciences",
    name: "Life Sciences",
    tagline: "Literature, assay and trial data reviewed by specialist agents.",
    description:
      "Multi-agent AI for life sciences: literature review, target triage and clinical trial document pipelines on the Swarms API, with runnable Python, cURL and TypeScript code.",
    keywords: [
      "ai agents for life sciences",
      "ai drug discovery agents",
      "literature review ai agents",
      "clinical trial ai",
      "biotech llm agents",
      "pharma multi-agent ai",
    ],
    icon: FlaskConical,
    accent: WHITE,
    swarmType: "MixtureOfAgents",
  },
  {
    slug: "marketing",
    name: "Marketing",
    tagline: "Campaign teams that research, write, review and report.",
    description:
      "Multi-agent AI for marketing: campaign research, copy generation, brand review and performance reporting on the Swarms API and Swarms Cloud, with runnable code.",
    keywords: [
      "ai agents for marketing",
      "marketing automation ai agents",
      "ai content generation pipeline",
      "campaign analysis ai",
      "multi-agent marketing",
      "brand voice ai review",
    ],
    icon: Megaphone,
    accent: WHITE,
    swarmType: "SequentialWorkflow",
  },
  {
    slug: "construction",
    name: "Construction",
    tagline: "Bids, schedules, RFIs and safety reports handled by agents.",
    description:
      "Multi-agent AI for construction: bid analysis, schedule risk, RFI handling and site safety reporting on the Swarms API, with runnable Python, cURL and TypeScript code.",
    keywords: [
      "ai agents for construction",
      "construction bid analysis ai",
      "rfi automation ai",
      "construction schedule risk ai",
      "site safety ai agents",
      "multi-agent construction",
    ],
    icon: HardHat,
    accent: WHITE,
    swarmType: "ConcurrentWorkflow",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Quality, maintenance and supply agents on the line.",
    description:
      "Multi-agent AI for manufacturing: defect triage, predictive maintenance review and supplier analysis on the Swarms API and Swarms Cloud, with runnable code.",
    keywords: [
      "ai agents for manufacturing",
      "predictive maintenance ai agents",
      "quality control ai",
      "manufacturing llm agents",
      "supply chain ai agents",
      "multi-agent manufacturing",
    ],
    icon: Factory,
    accent: WHITE,
    swarmType: "MultiAgentRouter",
  },
  {
    slug: "legal",
    name: "Legal",
    tagline: "Contract review, research and drafting with citations checked.",
    description:
      "Multi-agent AI for legal teams: contract review, clause extraction, legal research and drafting on the Swarms API, with judge agents that check every citation.",
    keywords: [
      "ai agents for legal",
      "contract review ai agents",
      "legal research ai",
      "ai contract analysis api",
      "multi-agent legal ai",
      "legal document ai",
    ],
    icon: Scale,
    accent: WHITE,
    swarmType: "CouncilAsAJudge",
  },
  {
    slug: "insurance",
    name: "Insurance",
    tagline: "Claims, underwriting and fraud review in parallel.",
    description:
      "Multi-agent AI for insurance: claims intake, underwriting review and fraud signals on the Swarms API, with majority voting for decisions and runnable code.",
    keywords: [
      "ai agents for insurance",
      "claims processing ai agents",
      "underwriting ai",
      "insurance fraud detection ai",
      "multi-agent insurance ai",
      "insurance llm api",
    ],
    icon: Umbrella,
    accent: WHITE,
    swarmType: "MajorityVoting",
  },
  {
    slug: "retail",
    name: "Retail",
    tagline: "Catalog, pricing, support and demand agents for commerce.",
    description:
      "Multi-agent AI for retail and e-commerce: product content, pricing review, customer support and demand analysis on the Swarms API, with runnable code.",
    keywords: [
      "ai agents for retail",
      "ecommerce ai agents",
      "product description ai pipeline",
      "retail pricing ai",
      "customer support ai agents",
      "multi-agent retail",
    ],
    icon: ShoppingBag,
    accent: WHITE,
    swarmType: "AgentRearrange",
  },
  {
    slug: "logistics",
    name: "Logistics",
    tagline: "Routing, exceptions and customs paperwork, agent by agent.",
    description:
      "Multi-agent AI for logistics and supply chain: shipment exceptions, route planning review and customs documents on the Swarms API, with runnable code.",
    keywords: [
      "ai agents for logistics",
      "supply chain ai agents",
      "shipment exception ai",
      "customs documentation ai",
      "route planning ai agents",
      "multi-agent logistics",
    ],
    icon: Truck,
    accent: WHITE,
    swarmType: "PlannerWorkerSwarm",
  },
  {
    slug: "energy",
    name: "Energy",
    tagline: "Grid, asset and trading desks watched by agents.",
    description:
      "Multi-agent AI for energy and utilities: grid event analysis, asset maintenance review and power trading research on the Swarms API, with runnable code.",
    keywords: [
      "ai agents for energy",
      "utilities ai agents",
      "grid analysis ai",
      "energy trading ai agents",
      "asset maintenance ai",
      "multi-agent energy",
    ],
    icon: Zap,
    accent: WHITE,
    swarmType: "GroupChat",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Listings, due diligence and lease review at portfolio scale.",
    description:
      "Multi-agent AI for real estate: listing generation, acquisition due diligence and lease abstraction on the Swarms API, with runnable Python, cURL and TypeScript code.",
    keywords: [
      "ai agents for real estate",
      "lease abstraction ai",
      "real estate due diligence ai",
      "property listing ai",
      "multi-agent real estate",
      "proptech ai agents",
    ],
    icon: Building2,
    accent: WHITE,
    swarmType: "SequentialWorkflow",
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Tutoring, grading and curriculum agents that explain themselves.",
    description:
      "Multi-agent AI for education: tutoring, rubric-based grading with review and curriculum planning on the Swarms API, with runnable Python, cURL and TypeScript code.",
    keywords: [
      "ai agents for education",
      "ai tutoring agents",
      "automated grading ai",
      "curriculum planning ai",
      "edtech multi-agent ai",
      "education llm api",
    ],
    icon: GraduationCap,
    accent: WHITE,
    swarmType: "DebateWithJudge",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Alert triage, threat research and incident write-ups.",
    description:
      "Multi-agent AI for security teams: alert triage, threat intelligence research and incident reporting on the Swarms API, with runnable Python, cURL and TypeScript code.",
    keywords: [
      "ai agents for cybersecurity",
      "soc automation ai agents",
      "alert triage ai",
      "threat intelligence ai agents",
      "incident response ai",
      "multi-agent security",
    ],
    icon: ShieldCheck,
    accent: WHITE,
    swarmType: "HeavySwarm",
  },
]

export function industryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}

/** The other industries, for the "More industries" strip at the bottom of a page. */
export function otherIndustries(slug: IndustrySlug, count = 4): Industry[] {
  const index = INDUSTRIES.findIndex((i) => i.slug === slug)
  const rest = [...INDUSTRIES.slice(index + 1), ...INDUSTRIES.slice(0, index)]
  return rest.slice(0, count)
}
