import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function IndustryCta({ title, description }: { title: string; description: string }) {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold tracking-tighter text-white sm:text-3xl">{title}</h2>
            <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">{description}</p>
            <p className="text-sm text-white/40">New Swarms Cloud accounts start with $5 in API credits. Enterprise teams can talk to us about volume pricing, data handling and deployment options.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button className="h-11 w-full rounded-full px-6 text-sm font-medium sm:w-auto" asChild>
              <a href="https://cloud.swarms.world/login" target="_blank" rel="noopener noreferrer">
                Get an API key
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-full border-white/15 bg-transparent px-6 text-sm font-medium text-white hover:bg-white/[0.06] sm:w-auto" asChild>
              <Link href="/contact-sales">
                Talk to sales
                <ArrowUpRight className="ml-1 h-4 w-4 text-white/50" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
