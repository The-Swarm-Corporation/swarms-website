"use client"

import dynamic from "next/dynamic"

// Dynamically load heavier, below-the-fold sections to reduce initial JS.
// `ssr: false` requires a client module, which keeps app/(en)/page.tsx free to
// stay a server component (it reads blog posts from the filesystem at build time).
export const HomeProducts = dynamic(() => import("@/components/home-products").then(m => m.HomeProducts), {
  ssr: false,
})
export const HomeCookbook = dynamic(() => import("@/components/home-cookbook").then(m => m.HomeCookbook), {
  ssr: false,
})
export const HomeCommunity = dynamic(() => import("@/components/home-community").then(m => m.HomeCommunity), {
  ssr: false,
})
export const HomeHiring = dynamic(() => import("@/components/home-hiring").then(m => m.HomeHiring), {
  ssr: false,
})
