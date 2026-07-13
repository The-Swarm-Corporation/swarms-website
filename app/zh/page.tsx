import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { HomeNewsletter } from "@/components/home-newsletter"
import {
  ArrowRight,
  ArrowUpRight,
  Network,
  ShieldCheck,
  Cpu,
  Plug,
  Activity,
  Code2,
  Boxes,
  Cloud,
  ShoppingBag,
} from "lucide-react"

export const metadata: Metadata = {
  title: { absolute: "Swarms AI - 企业级多智能体框架与智能体市场" },
  description:
    "Swarms 是面向企业的多智能体框架，帮助团队快速完成 AI智能体开发、智能体编排与生产部署。通过 Swarms Cloud 托管 API 与智能体市场，一站式获取、构建并规模化运行您的智能体系统。",
  keywords: [
    "智能体框架",
    "多智能体框架",
    "多智能体系统",
    "AI智能体",
    "AI智能体开发",
    "智能体编排",
    "多智能体编排",
    "智能体市场",
    "AI智能体平台",
    "提示词市场",
    "大模型智能体",
    "LLM智能体",
    "自主智能体",
    "企业级AI智能体",
    "Python智能体框架",
    "Rust智能体框架",
    "开源智能体框架",
    "智能体API",
    "智能体部署",
    "群体智能",
    "AI工作流自动化",
    "MCP协议",
    "swarms",
    "swarms中文",
  ],
  alternates: {
    canonical: "https://swarms.ai/zh",
    languages: {
      en: "https://swarms.ai",
      "zh-Hans": "https://swarms.ai/zh",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://swarms.ai/zh",
    title: "Swarms AI - 企业级多智能体框架与智能体市场",
    description:
      "构建、部署和扩展 AI 智能体的企业级平台。Python/Rust 多智能体框架、托管智能体 API 与智能体市场，一站式完成智能体编排与规模化落地。",
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

const stats = [
  { value: "5M+", label: "下载量" },
  { value: "100+", label: "贡献者" },
  { value: "15+", label: "种编排架构" },
  { value: "1000+", label: "模型支持" },
]

const products = [
  {
    icon: Boxes,
    title: "Swarms 框架",
    description:
      "开源的 Python / Rust 多智能体框架，内置 15 种以上编排架构，支持顺序、并发、分层等多种协作模式，助您快速搭建生产级智能体系统。",
    href: "/zh/framework",
    external: false,
    cta: "了解框架",
  },
  {
    icon: Cloud,
    title: "Swarms Cloud 托管 API",
    description:
      "无需自建基础设施，通过托管 API 即可调用智能体运行时。自动扩缩容、按需计费，让团队专注于业务逻辑而非运维。",
    href: "https://swarms.world",
    external: true,
    cta: "访问 Swarms Cloud",
  },
  {
    icon: ShoppingBag,
    title: "智能体市场",
    description:
      "在智能体市场中发现、购买和发布智能体、提示词与工具。连接开发者与企业，加速智能体从原型到生产的落地过程。",
    href: "https://swarms.world",
    external: true,
    cta: "进入市场",
  },
]

const features = [
  {
    icon: Network,
    title: "多智能体编排",
    description: "支持顺序、并发、分层等 15 种以上编排架构，灵活组合智能体协作方式。",
  },
  {
    icon: ShieldCheck,
    title: "生产级可靠性",
    description: "内置重试、容错与安全治理机制，满足企业级生产环境的稳定性要求。",
  },
  {
    icon: Cpu,
    title: "支持 1000+ 模型",
    description: "兼容主流大模型与自托管模型，一套代码即可灵活切换底层模型供应商。",
  },
  {
    icon: Plug,
    title: "MCP 协议支持",
    description: "原生支持 MCP 协议，轻松连接外部工具、数据源与服务生态。",
  },
  {
    icon: Activity,
    title: "完整可观测性",
    description: "提供全链路日志、追踪与监控能力，让智能体的每一次决策都清晰可查。",
  },
  {
    icon: Code2,
    title: "Apache 2.0 开源",
    description: "采用 Apache 2.0 协议开源，代码透明可控，企业可自由集成与二次开发。",
  },
]

export default function ZhHomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="pt-28 sm:pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div className="container relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                企业级多智能体框架与智能体市场
              </p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                构建、部署和扩展 AI 智能体的企业级平台
              </h1>
              <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl">
                Swarms 提供开源的 Python / Rust 多智能体框架、托管智能体 API 与智能体市场，
                覆盖从本地开发到生产部署的完整流程，帮助企业快速构建、编排并规模化运行 AI 智能体系统。
              </p>
              <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/zh/installation"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black transition-colors hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                >
                  开始使用
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="https://github.com/kyegomez/swarms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] sm:h-14 sm:w-auto sm:text-lg"
                >
                  GitHub
                  <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-1 bg-black px-4 py-8 text-center sm:py-10"
                >
                  <span className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-xs font-normal text-white/50 sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto mb-10 max-w-7xl sm:mb-14">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                产品矩阵
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                一套平台，覆盖智能体的全生命周期
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                从开源框架到托管云服务，再到智能体市场，Swarms 为企业提供开发、部署与变现智能体所需的全部基础设施。
              </p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
              {products.map((product) => (
                <a
                  key={product.title}
                  href={product.href}
                  target={product.external ? "_blank" : undefined}
                  rel={product.external ? "noopener noreferrer" : undefined}
                  className="group flex min-h-[260px] flex-col justify-between gap-8 bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <product.icon
                    className="h-6 w-6 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {product.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/70 group-hover:text-white">
                      {product.cta}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why Swarms */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto mb-10 max-w-7xl sm:mb-14">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                核心优势
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                为什么选择 Swarms
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                专为企业级多智能体编排打造的基础设施，兼顾灵活性、可靠性与开放性。
              </p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex min-h-[160px] flex-col justify-between gap-6 bg-black p-5 sm:min-h-[220px] sm:p-8"
                >
                  <feature.icon
                    className="h-5 w-5 text-white/50"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog teaser */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12">
              <div className="max-w-2xl space-y-3">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  博客
                </p>
                <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  深入了解多智能体系统的工程实践
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  阅读产品更新、架构解析与实战案例，紧跟 Swarms 与多智能体技术的最新进展。
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/zh/blog"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-neutral-200 sm:w-auto"
                >
                  阅读中文博客
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
              <h2 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                准备好构建您的智能体系统了吗
              </h2>
              <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                立即安装 Swarms，或查看适合您团队规模的定价方案。
              </p>
              <div className="mt-4 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/zh/installation"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black transition-colors hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                >
                  开始使用
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/zh/pricing"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] sm:h-14 sm:w-auto sm:text-lg"
                >
                  查看定价
                  <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <HomeNewsletter locale="zh" />
      </main>
    </div>
  )
}
