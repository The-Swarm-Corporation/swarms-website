import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "安装指南 - Swarms AI" },
  description:
    "快速安装 Swarms 多智能体框架，支持通过 pip、uv、conda 或源码方式安装 Python 版本，并支持 Rust 版本的安装。跟随本指南几分钟内完成环境搭建，开始构建你的多智能体 AI 系统。",
  keywords: [
    "swarms安装",
    "pip install swarms",
    "Python智能体框架",
    "Rust智能体框架",
    "多智能体框架",
    "智能体开发教程",
    "AI智能体入门",
    "swarms教程",
  ],
  alternates: {
    canonical: "https://swarms.ai/zh/installation",
    languages: {
      en: "https://swarms.ai/installation",
      "zh-Hans": "https://swarms.ai/zh/installation",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://swarms.ai/zh/installation",
    title: "安装指南 - Swarms AI",
    description:
      "快速安装 Swarms 多智能体框架，支持通过 pip、uv、conda 或源码方式安装 Python 版本，并支持 Rust 版本的安装。",
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

export default function InstallationLayoutZh({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
