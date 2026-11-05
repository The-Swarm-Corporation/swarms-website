import type { ShikiTransformer } from "shiki/core"

import { cn } from "@/lib/utils"

// Shared by the server-side CodeBlock and the browser-side JSON highlighter in
// ApiTrial, so a live API response gets exactly the same <pre> as every other
// code block. Only the type is imported from Shiki, so this file adds nothing
// to the client bundle.
export function preTransformer(className?: string): ShikiTransformer {
  return {
    pre(node) {
      // Drop Shiki's own background so the surrounding card styling wins.
      node.properties.style = ""
      node.properties.class = cn(node.properties.class as string, "overflow-x-auto", className)
    },
  }
}
