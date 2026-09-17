import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import theme from "shiki/themes/github-dark-default.mjs"
import bash from "shiki/langs/bash.mjs"
import docker from "shiki/langs/docker.mjs"
import javascript from "shiki/langs/javascript.mjs"
import json from "shiki/langs/json.mjs"
import markdown from "shiki/langs/markdown.mjs"
import nginx from "shiki/langs/nginx.mjs"
import python from "shiki/langs/python.mjs"
import rust from "shiki/langs/rust.mjs"
import toml from "shiki/langs/toml.mjs"
import tsx from "shiki/langs/tsx.mjs"
import typescript from "shiki/langs/typescript.mjs"
import yaml from "shiki/langs/yaml.mjs"

import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

// One Shiki highlighter shared by every code block on the site. The sync core
// keeps this usable from server and client components alike without any async
// plumbing, and only the languages we actually ship are bundled.
const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes: [theme],
  langs: [
    bash,
    docker,
    javascript,
    json,
    markdown,
    nginx,
    python,
    rust,
    toml,
    tsx,
    typescript,
    yaml,
  ],
})

const loaded = new Set(highlighter.getLoadedLanguages())

const EXTENSIONS: Record<string, string> = {
  js: "javascript",
  jsx: "tsx",
  md: "markdown",
  mjs: "javascript",
  py: "python",
  rs: "rust",
  sh: "bash",
  ts: "typescript",
  yml: "yaml",
}

function resolveLang(lang?: string, file?: string) {
  const name = (lang ?? "").toLowerCase().replace(/^language-/, "").trim()
  if (loaded.has(name)) return name
  const ext = file?.toLowerCase().split(".").pop() ?? ""
  const fromFile = EXTENSIONS[ext] ?? ext
  return loaded.has(fromFile) ? fromFile : "text"
}

// Shown in the header bar instead of the raw Shiki grammar id.
const LABELS: Record<string, string> = {
  bash: "Shell",
  docker: "Dockerfile",
  javascript: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  nginx: "Nginx",
  python: "Python",
  rust: "Rust",
  text: "Code",
  toml: "TOML",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
}

export function CodeBlock({
  code,
  lang,
  file,
  className,
  chrome = false,
}: {
  code: string
  /** Language id or a `language-*` class; falls back to the file extension. */
  lang?: string
  file?: string
  className?: string
  /** Wrap the block in a rounded card with a language label and copy button. */
  chrome?: boolean
}) {
  const resolved = resolveLang(lang, file)
  const html = highlighter.codeToHtml(code.replace(/\s+$/, ""), {
    lang: resolved,
    theme: "github-dark-default",
    transformers: [
      {
        pre(node) {
          // Drop Shiki's own background so the surrounding card styling wins.
          node.properties.style = ""
          node.properties.class = cn(
            node.properties.class as string,
            "overflow-x-auto",
            className,
          )
        },
      },
    ],
  })

  const block = <div dangerouslySetInnerHTML={{ __html: html }} />

  if (!chrome) return block

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] font-normal tracking-wide text-white/40">
          {file ?? LABELS[resolved] ?? resolved}
        </span>
        <CopyButton value={code} className="ml-auto" />
      </div>
      {block}
    </div>
  )
}
