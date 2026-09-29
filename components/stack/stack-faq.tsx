import { ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"

import { FAQS } from "./stack-data"

// Native <details> keeps every answer in the server HTML, where search
// engines and the FAQPage structured data in layout.tsx can both read it.
export function StackFaq() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Questions about the Swarms stack
            </h2>
            <p className="mt-5 max-w-md text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              What builders ask before they pick a framework, deploy their first agent, or list it
              for sale.
            </p>
          </div>

          <div className="border-t border-white/[0.08]">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                open={i === 0}
                className="group border-b border-white/[0.08]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold text-white/85 transition-colors group-open:text-white group-hover:text-white sm:text-lg">
                    {faq.q}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="pb-6 pr-10">
                  <p className="max-w-2xl text-sm font-normal leading-relaxed text-white/55 sm:text-base">
                    {faq.a}
                  </p>
                  {faq.link && (
                    <Link
                      href={faq.link.href}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                      {faq.link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
