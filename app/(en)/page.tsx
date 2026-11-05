import type { ReactNode } from "react"

import { CodeBlock } from "@/components/code-block"
import { swarmsStack } from "@/components/home-products-data"
import { Navigation } from "@/components/navigation"
import { HomeHero } from "@/components/home-hero"
import { HomeMission } from "@/components/home-mission"
import { HomeEnterpriseInfrastructure } from "@/components/home-enterprise-infrastructure"
import { HomeFeatures } from "@/components/home-features"
import { HomeNewsletter } from "@/components/home-newsletter"
import { ProductsCallToAction } from "@/components/products-call-to-action"
import {
  HomeProducts,
  HomeCookbook,
  HomeCommunity,
  HomeHiring,
} from "@/components/home-lazy-sections"
import { getAllPostMeta } from "@/lib/blog"

export default function Home() {
  const recentPosts = getAllPostMeta().slice(0, 3)

  // The products section is a client component (loaded through next/dynamic),
  // so its code samples are highlighted here and passed in as rendered nodes.
  const productCodeBlocks: Record<string, ReactNode> = {}
  for (const product of swarmsStack) {
    if (!product.code) continue
    productCodeBlocks[product.title] = (
      <CodeBlock
        code={product.code}
        file={product.file}
        className="font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]"
      />
    )
  }

  return (
    <div className="min-h-screen bg-black smooth-scroll">
      <Navigation />

      <main id="main-content" role="main" className="select-text scroll-optimized w-full overflow-x-hidden">
        <HomeHero />
        <HomeMission />
        <HomeFeatures />
        <HomeProducts codeBlocks={productCodeBlocks} />
        <HomeEnterpriseInfrastructure />
        <HomeCookbook />
        <HomeNewsletter posts={recentPosts} />
        <HomeHiring />
        <HomeCommunity />
        <ProductsCallToAction />
      </main>
    </div>
  )
}
