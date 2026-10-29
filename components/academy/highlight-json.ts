import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import theme from "shiki/themes/github-dark-default.mjs"
import json from "shiki/langs/json.mjs"

import { preTransformer } from "@/components/shiki-transformer"

// Browser-side highlighter for the live API responses in ApiTrial. It is
// reached only through a dynamic import(), the first time a response is about
// to be shown, so it stays out of every page's initial JavaScript. Only the
// JSON grammar is bundled: responses are the one thing it highlights.
const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes: [theme],
  langs: [json],
})

// Same markup as the server-side CodeBlock, so a response looks like every
// other code block on the page.
export function highlightJson(code: string, className?: string) {
  return highlighter.codeToHtml(code.replace(/\s+$/, ""), {
    lang: "json",
    theme: "github-dark-default",
    transformers: [preTransformer(className)],
  })
}
