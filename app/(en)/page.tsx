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

  return (
    <div className="min-h-screen bg-black smooth-scroll">
      <Navigation />

      <main id="main-content" role="main" className="select-text scroll-optimized w-full overflow-x-hidden">
        <HomeHero />
        <HomeMission />
        <HomeFeatures />
        <HomeProducts />
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
