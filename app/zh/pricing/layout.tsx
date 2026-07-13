import type React from "react"
import type { Metadata } from "next"

const title = "价格方案 - Swarms AI"
const description =
  "Swarms 多智能体平台的透明定价：免费版无需信用卡即可开始，专业版每月 $19.99，高级版每月 $100（或每年 $1,020）。所有端点统一按 token 用量计费，并提供企业级定制方案与私有化部署。"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms价格",
    "AI智能体价格",
    "智能体平台价格",
    "多智能体框架",
    "AI智能体开发",
    "智能体API",
    "企业级AI智能体",
    "智能体云平台",
  ],
  alternates: {
    canonical: "https://swarms.ai/zh/pricing",
    languages: {
      en: "https://swarms.ai/pricing",
      "zh-Hans": "https://swarms.ai/zh/pricing",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://swarms.ai/zh/pricing",
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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
