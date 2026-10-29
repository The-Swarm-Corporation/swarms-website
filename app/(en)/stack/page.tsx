import { CodeBlock } from "@/components/code-block"
import { Navigation } from "@/components/navigation"
import { ProductsCallToAction } from "@/components/products-call-to-action"
import { PRODUCTS } from "@/components/stack/stack-data"
import type { StackCodeBlocks } from "@/components/stack/stack-explorer"
import { StackFaq } from "@/components/stack/stack-faq"
import { StackPage } from "@/components/stack/stack-page"

export default function Stack() {
  // The explorer is a client component, so each product's code sample is
  // highlighted here and passed in as a rendered node.
  const codeBlocks: StackCodeBlocks = {}
  for (const product of PRODUCTS) {
    if (product.artifact.kind === "telemetry") continue
    codeBlocks[product.id] = (
      <CodeBlock
        code={product.artifact.code}
        file={product.artifact.file}
        className="font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]"
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main id="main-content" className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        <StackPage codeBlocks={codeBlocks} />
        <StackFaq />
        <ProductsCallToAction />
      </main>
    </div>
  )
}
