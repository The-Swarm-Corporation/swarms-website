import type React from "react"
import type { Metadata } from "next"

const title = "Swarms 框架 — 企业级 Python 多智能体框架"
const description =
  "Swarms 是面向生产环境的企业级多智能体框架，内置 15+ 种智能体编排架构，支持 1,000+ 种大模型，并提供原生 MCP 支持与生产级可观测性。基于 Apache 2.0 协议完全开源，助力团队从原型快速迈向规模化部署。"
const url = "https://swarms.ai/zh/framework"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "智能体框架",
    "多智能体框架",
    "多智能体系统",
    "Python智能体框架",
    "智能体编排",
    "多智能体编排",
    "AI智能体开发",
    "开源智能体框架",
    "企业级AI智能体",
    "群体智能",
    "swarms框架",
    "swarms中文文档",
    "LangChain替代品",
    "大模型智能体",
    "LLM智能体",
    "MCP协议",
  ],
  alternates: {
    canonical: url,
    languages: {
      en: "https://swarms.ai/framework",
      "zh-Hans": "https://swarms.ai/zh/framework",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url,
    title,
    description,
    siteName: "Swarms AI",
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function FrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
