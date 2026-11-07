import type { Metadata } from "next"
import type React from "react"

import { IndustryStructuredData } from "@/components/industries/industry-structured-data"

import { industryMetadata } from "../metadata"

export const metadata: Metadata = industryMetadata("manufacturing")

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IndustryStructuredData slug="manufacturing" />
      {children}
    </>
  )
}
