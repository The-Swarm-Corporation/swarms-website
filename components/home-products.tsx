"use client"

import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { useGithubStars } from "@/hooks/use-github-stars"
import { formatStarsShort } from "@/lib/github-stars"
import Image from "next/image"
import Link from "next/link"
import { type Product, swarmsStack } from "@/components/home-products-data"
import { CodeRunTabs } from "@/components/code-run-tabs"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// `codeBlocks` maps a product title to its highlighted code sample, rendered
// by the server page so this client section ships no Shiki.
export function HomeProducts({ codeBlocks }: { codeBlocks: Record<string, ReactNode> }) {
  const stars = useGithubStars()

  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto mb-8 max-w-7xl sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Products
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
            One stack. End-to-end agent infrastructure.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
            Frameworks, interfaces, and cloud services to help you build your own
            multi-agent systems.
          </p>
          <Link
            href="/stack"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            See how the Swarms stack fits together
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          {swarmsStack.map((product, index) => (
            <ProductRow
              key={product.title}
              product={product}
              index={index}
              starCount={product.github ? stars[product.github] : undefined}
              codeBlock={codeBlocks[product.title]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductRow({
  product,
  index,
  starCount,
  codeBlock,
}: {
  product: Product
  index: number
  starCount?: number
  codeBlock?: ReactNode
}) {
  const isEven = index % 2 === 0
  const isInternalDocs = product.docsLink.startsWith("/")

  return (
    <motion.div
      className="grid items-center gap-8 border-t border-white/[0.08] py-10 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Copy */}
      <div className={`space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          {String(index + 1).padStart(2, "0")} · {product.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {product.title}
          </h3>
          {starCount !== undefined && (
            <a
              href={`https://github.com/${product.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <Star className="h-3 w-3" />
              {formatStarsShort(starCount)}
            </a>
          )}
        </div>
        <p className="max-w-xl text-base font-normal leading-relaxed text-white/50">
          {product.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            className="h-10 rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-5 text-sm font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d]"
            asChild
          >
            {product.link.startsWith("/") ? (
              <Link href={product.link}>
                {product.ctaLabel ?? "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                {product.ctaLabel ?? "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            )}
          </Button>
          {isInternalDocs ? (
            <Link
              href={product.docsLink}
              className="group inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {product.docsLabel ?? "Documentation"}
              <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
            </Link>
          ) : (
            <a
              href={product.docsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {product.docsLabel ?? "Documentation"}
              <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Code / image panel */}
      <div className={`w-full min-w-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        {product.image ? (
          (() => {
            const panel = (
              <Image
                src={product.image}
                alt={`${product.title}: ${product.subtitle}`}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            )
            const panelClass =
              "block overflow-hidden rounded-lg border border-white/[0.08] transition-colors hover:border-white/20"
            return product.link.startsWith("/") ? (
              <Link href={product.link} className={panelClass}>
                {panel}
              </Link>
            ) : (
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className={panelClass}
              >
                {panel}
              </a>
            )
          })()
        ) : (
          <CodeRunTabs
            file={product.file ?? ""}
            code={product.code ?? ""}
            command={product.command}
            output={product.output ?? []}
            codeNode={codeBlock}
          />
        )}
      </div>
    </motion.div>
  )
}
