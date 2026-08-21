"use client"

import dynamic from "next/dynamic"

// Dynamically load heavier, below-the-fold sections to reduce initial JS.
// The chunks stay code-split and lazy on the client, but they render on the
// server: with `ssr: false` these sections (and their headings and text) were
// invisible to any client that does not run JavaScript, which includes most
// AI crawlers reading the homepage.
export const HomeProducts = dynamic(() => import("@/components/home-products").then(m => m.HomeProducts))
export const HomeCookbook = dynamic(() => import("@/components/home-cookbook").then(m => m.HomeCookbook))
export const HomeCommunity = dynamic(() => import("@/components/home-community").then(m => m.HomeCommunity))
export const HomeHiring = dynamic(() => import("@/components/home-hiring").then(m => m.HomeHiring))
