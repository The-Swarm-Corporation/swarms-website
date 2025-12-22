"use client"

import { Navigation } from "@/components/navigation"
import { HomeHero } from "@/components/home-hero"
import { HomeMission } from "@/components/home-mission"
import { HomeEnterpriseInfrastructure } from "@/components/home-enterprise-infrastructure"
import { HomeFeatures } from "@/components/home-features"
import { HomeProducts } from "@/components/home-products"
import { HomeCookbook } from "@/components/home-cookbook"
import { HomeCommunity } from "@/components/home-community"

export default function Home() {
  return (
    <div className="min-h-screen bg-black smooth-scroll">
      <Navigation />
      
      <main id="main-content" role="main" className="select-text scroll-optimized">
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
        <HomeCommunity />
      </main>
    </div>
  )
}
