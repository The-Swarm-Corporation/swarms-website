import { Navigation } from "@/components/navigation"
import { ProductsCallToAction } from "@/components/products-call-to-action"
import { SwarmsRsBenchmarks } from "@/components/swarms-rs/swarms-rs-benchmarks"
import { SwarmsRsFaq } from "@/components/swarms-rs/swarms-rs-faq"
import { SwarmsRsFeatures } from "@/components/swarms-rs/swarms-rs-features"
import { SwarmsRsHarnesses } from "@/components/swarms-rs/swarms-rs-harnesses"
import { SwarmsRsHero } from "@/components/swarms-rs/swarms-rs-hero"
import { SwarmsRsQuickstart } from "@/components/swarms-rs/swarms-rs-quickstart"
import { SwarmsRsReading } from "@/components/swarms-rs/swarms-rs-reading"

export default function SwarmsRs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main id="main-content" className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        <SwarmsRsHero />
        <SwarmsRsQuickstart />
        <SwarmsRsHarnesses />
        <SwarmsRsBenchmarks />
        <SwarmsRsFeatures />
        <SwarmsRsReading />
        <SwarmsRsFaq />
        <ProductsCallToAction />
      </main>
    </div>
  )
}
