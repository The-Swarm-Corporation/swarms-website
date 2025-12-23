"use client"

import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HomeHero } from "@/components/home-hero"
import { HomeMission } from "@/components/home-mission"
import { HomeEnterpriseInfrastructure } from "@/components/home-enterprise-infrastructure"
import { HomeFeatures } from "@/components/home-features"
import { ProductsCallToAction } from "@/components/products-call-to-action"

// Dynamically load heavier, below-the-fold sections to reduce initial JS
const HomeProducts = dynamic(() => import("@/components/home-products").then(m => m.HomeProducts), {
  ssr: false,
})
const HomeCookbook = dynamic(() => import("@/components/home-cookbook").then(m => m.HomeCookbook), {
  ssr: false,
})
const HomeCommunity = dynamic(() => import("@/components/home-community").then(m => m.HomeCommunity), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-black smooth-scroll overflow-x-hidden">
      <Navigation />

      <main id="main-content" role="main" className="select-text scroll-optimized w-full">
        <div className="sr-only">
          <h1>Swarms AI - Enterprise Multi-Agent Framework</h1>
          <p>Build, deploy, and scale autonomous AI agent swarms with unprecedented control and efficiency</p>
        </div>

        <HomeHero />
        <HomeMission />
        <HomeFeatures />
        <HomeProducts />
        <HomeEnterpriseInfrastructure />
        <HomeCookbook />
        <ProductsCallToAction />
        <HomeCommunity />
      </main>
    </div>
  )
}
