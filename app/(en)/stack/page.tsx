import { Navigation } from "@/components/navigation"
import { ProductsCallToAction } from "@/components/products-call-to-action"
import { StackPage } from "@/components/stack/stack-page"

export default function Stack() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main id="main-content" className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        <StackPage />
        <ProductsCallToAction />
      </main>
    </div>
  )
}
