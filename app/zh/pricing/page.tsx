"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Code,
  ChevronDown,
  Database,
  Activity,
  Users,
  Image as ImageIcon,
  Globe,
  Wrench,
  Search,
  Moon,
  Zap,
  CreditCard,
  DollarSign,
  Server,
  Shield,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type PricingTier = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  highlight?: boolean
}

const tiers: PricingTier[] = [
  {
    name: "免费版",
    price: "$0",
    cadence: "按实际使用量付费",
    description: "轻松开启 AI 之旅，无月费，按用量购买额度。",
    features: [
      "注册即送额度",
      "按需付费的 API 访问",
      "每分钟 100 次请求",
      "每日 1,200 次请求",
      "每个智能体 20 万 tokens",
      "可访问 Marketplace",
      "社区支持",
    ],
    cta: { label: "获取 API 密钥", href: "https://cloud.swarms.world/api-keys" },
  },
  {
    name: "专业版",
    price: "$19.99",
    cadence: "每月",
    description: "为需要更强性能与更多功能的专业用户打造。",
    features: [
      "包含免费版全部功能",
      "全球可用区",
      "专属多智能体架构",
      "加速硬件",
      "API 遥测平台",
      "优先队列",
      "专业版模型",
      "高级端点：批处理、推理、高级工作流",
    ],
    cta: { label: "升级到专业版", href: "https://cloud.swarms.world/settings" },
  },
  {
    name: "高级版",
    price: "$100",
    cadence: "每月 · 或每年 $1,020（节省 15%）",
    description: "面向生产环境的优先级访问方案。",
    highlight: true,
    features: [
      "包含专业版全部功能",
      "每分钟 2,000 次请求",
      "每日 10 万次请求",
      "每个智能体 200 万 tokens",
      "每批次 500 个智能体",
      "高级模型访问权限",
      "SOC 2 合规",
      "优先区域 / 可用区路由",
      "7x24 小时邮件与 Discord 支持",
    ],
    cta: { label: "升级到高级版", href: "https://cloud.swarms.world/settings" },
  },
  {
    name: "企业版",
    price: "定制报价",
    cadence: "按您的规模量身定制",
    description: "专属基础设施、私有化部署与 SLA 保障。",
    features: [
      "自定义速率限制，无上限",
      "专属基础设施",
      "私有化部署与 VPC 部署",
      "定制 SLA 与正常运行时间保障",
      "专属解决方案工程师",
      "现场培训与入驻支持",
      "定制智能体开发",
      "白标方案",
    ],
    cta: { label: "联系销售", href: "https://cal.com/swarms/swarms-strategy-session" },
  },
]

const usageItems = [
  {
    icon: Database,
    item: "输入 tokens",
    cost: "$6.50",
    unit: "每百万 tokens",
    note: "所有端点统一计价",
  },
  {
    icon: Activity,
    item: "输出 tokens",
    cost: "$18.50",
    unit: "每百万 tokens",
    note: "所有端点统一计价",
  },
  {
    icon: Users,
    item: "智能体费用",
    cost: "$0.01",
    unit: "每个智能体",
    note: "适用于 swarm 与工作流",
  },
  {
    icon: ImageIcon,
    item: "图像处理",
    cost: "$0.25",
    unit: "每张图像",
    note: "提供图像时收取",
  },
  {
    icon: Globe,
    item: "MCP 调用",
    cost: "$0.10",
    unit: "每次调用",
    note: "提供 MCP URL 时收取",
  },
  {
    icon: Search,
    item: "Exa 搜索工具",
    cost: "$0.04",
    unit: "每次搜索",
    note: "按每次搜索执行计费",
  },
  {
    icon: Wrench,
    item: "网页抓取工具",
    cost: "$0.15",
    unit: "每次抓取",
    note: "按每次抓取执行计费",
  },
]

const discounts = [
  {
    icon: Moon,
    title: "夜间折扣",
    label: "Token 五折优惠",
    description:
      "太平洋时间晚 8 点至次日早 6 点期间，Swarm Completions 的 token 费用享受 5 折优惠，智能体费用不变，系统自动生效。",
  },
  {
    icon: Zap,
    title: "疯狂模式",
    label: "全部请求免费",
    description:
      "在黑色星期五（11 月第四个星期五）当天 24 小时内，所有 API 请求完全免费，系统自动生效，无需任何操作。",
  },
  {
    icon: Sparkles,
    title: "统一定价",
    label: "全平台同价",
    description:
      "Swarm Completions、Agent Completions、Advanced Research、Auto Swarm Builder、Graph 工作流与 Batched Grid 工作流等所有端点，均采用完全相同的 token 定价。",
  },
]

const creditDetails = [
  {
    icon: CreditCard,
    title: "额度优先级",
    description:
      "免费额度会优先于付费额度被消耗，确保促销与免费额度物尽其用。",
  },
  {
    icon: DollarSign,
    title: "按调用计费",
    description:
      "系统会根据每次调用的操作类型、token 用量、智能体数量以及 MCP、图像处理等附加项进行扣费。",
  },
  {
    icon: Server,
    title: "实时成本 API",
    description:
      "通过 /v1/usage/costs 接口以编程方式获取实时定价数据，帮助您精准做好预算规划。",
  },
]

const enterpriseBenefits = [
  {
    icon: Shield,
    title: "安全与合规",
    description: "SOC 2 安全控制、审计日志、加密传输、权限受限的 API 密钥，以及支持数据主权的私有化部署。",
  },
  {
    icon: Server,
    title: "专属基础设施",
    description: "预留算力、自定义区域、专属工作节点，杜绝多租户干扰，性能表现稳定可预期。",
  },
  {
    icon: HeadphonesIcon,
    title: "尊享级支持服务",
    description: "指定解决方案工程师、定制 SLA、现场培训，以及直达工程团队的升级通道。",
  },
]

const faqs = [
  {
    question: "按需计费是如何运作的？",
    answer:
      "每次请求后，系统会自动扣除相应额度。所有端点均采用统一定价：每百万输入 tokens 收费 $6.50，每百万输出 tokens 收费 $18.50。此外可能还会产生按智能体、按图像、按 MCP 调用及按工具计算的费用。免费额度会优先于付费额度被消耗。",
  },
  {
    question: "什么是统一定价？",
    answer:
      "Swarm Completions、Agent Completions、Advanced Research、Auto Swarm Builder、Graph Workflow 与 Batched Grid Workflow 等所有端点，均采用完全相同的 token 定价，全平台价格统一、透明可预测。",
  },
  {
    question: "夜间折扣是如何运作的？",
    answer:
      "太平洋时间晚 8 点至次日早 6 点期间，Swarm Completions 的 token 费用可享 5 折优惠，智能体费用保持不变。折扣会在该时间段内对符合条件的调用自动生效。",
  },
  {
    question: "什么是高级端点（Premium Endpoints）？",
    answer:
      "高级端点包括批处理、推理智能体、Batched Grid 工作流、Graph 工作流、Auto Swarm Builder 以及 Advanced Research，仅在专业版与高级版方案中开放，免费版无法使用。",
  },
  {
    question: "专业版与高级版有什么区别？",
    answer:
      "专业版（每月 $19.99）提供全球可用区、多智能体架构、加速硬件、API 遥测、优先支持、专业版模型以及高级端点。高级版（每月 $100 或每年 $1,020）则进一步提供每分钟 2,000 次请求、每个智能体 200 万 tokens、每批次 500 个智能体、SOC 2 合规、增强安全性、优先区域 / 可用区路由，以及 7x24 小时支持。",
  },
  {
    question: "可以随时更换方案吗？",
    answer:
      "可以。您可以随时在 cloud.swarms.world/settings 中升级或降级方案，变更会立即生效，且您的 API 密钥不受影响。",
  },
  {
    question: "额度用尽后会发生什么？",
    answer:
      "API 调用将返回明确的错误代码，您可以充值额度或升级方案以获得更高的限额。计费提醒可在控制台中自行配置。",
  },
  {
    question: "是否支持私有化部署？",
    answer:
      "支持。私有化部署包含在企业版方案中，提供完整技术栈的 Docker 镜像、源码访问权限、无限用量以及享有优先更新的企业级许可证，非常适合受监管环境与有数据主权要求的场景。",
  },
  {
    question: "图像处理如何计费？",
    answer:
      "每张传入智能体的图像均按 $0.25 计费，该规则在所有方案与端点中统一适用。",
  },
  {
    question: "疯狂模式（Frenzy Mode）是如何运作的？",
    answer:
      "从黑色星期五（11 月第四个星期五）开始的 24 小时内，所有 API 请求完全免费。此促销活动自动生效，无需输入任何代码或进行额外操作。",
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-7xl sm:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      {eyebrow && (
        <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                透明计费，按需付费，企业级保障。
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                价格方案
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                免费开始，按需付费，同一组 API 密钥即可平滑扩展至企业级。
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://cloud.swarms.world/api-keys" target="_blank" rel="noopener noreferrer">
                    免费开始使用
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    联系销售
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION TIERS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="订阅方案"
              title="覆盖每个阶段的方案"
              description="免费版适合原型开发，专业版与高级版面向生产团队，企业版专为关键业务负载打造。"
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col rounded-lg border p-6 transition-colors duration-300 sm:p-7 md:p-8 ${
                    tier.highlight
                      ? "border-white/20 bg-[#0a0a0a]"
                      : "border-white/[0.08] bg-black hover:bg-[#0a0a0a]"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-white/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                      最受欢迎
                    </div>
                  )}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">{tier.name}</h3>
                    <p className="text-xs leading-relaxed text-white/50 sm:text-sm">{tier.description}</p>
                  </div>
                  <div className="mb-5 border-b border-white/[0.08] pb-5 sm:mb-6 sm:pb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        {tier.price}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/50 sm:text-sm">{tier.cadence}</p>
                  </div>
                  <ul className="mb-6 flex-1 space-y-2.5 sm:mb-8 sm:space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-white/70 sm:text-sm"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.75} />
                        <span className={feature.startsWith("包含") ? "font-semibold text-white" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      tier.highlight
                        ? "w-full rounded-full bg-white font-medium text-black hover:bg-neutral-200"
                        : "w-full rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    }
                    variant={tier.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href={tier.cta.href} target="_blank" rel="noopener noreferrer">
                      {tier.cta.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* USAGE-BASED PRICING TABLE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="按需计费"
              title="按实际使用付费"
              description="所有端点均采用透明的按操作计费，没有隐藏费用，也没有最低消费。"
            />

            <div className="mx-auto max-w-7xl">
              <div className="max-w-5xl overflow-hidden rounded-lg border border-white/[0.08]">
                <div className="hidden gap-4 border-b border-white/[0.08] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:grid md:grid-cols-12 lg:px-8">
                  <div className="col-span-5">项目</div>
                  <div className="col-span-3 text-right">价格</div>
                  <div className="col-span-4 text-right">备注</div>
                </div>
                {usageItems.map((row, i) => (
                  <motion.div
                    key={row.item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 gap-3 border-b border-white/[0.08] px-4 py-5 transition-colors duration-300 last:border-b-0 hover:bg-[#0a0a0a] sm:px-6 md:grid-cols-12 md:gap-4 md:py-6 lg:px-8"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:col-span-5">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black sm:h-10 sm:w-10">
                        <row.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white sm:text-base">{row.item}</span>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                      <span className="font-mono text-base font-semibold text-white sm:text-lg">{row.cost}</span>
                      <span className="ml-1.5 text-xs text-white/50 sm:text-sm">{row.unit}</span>
                    </div>
                    <div className="text-xs text-white/50 sm:text-sm md:col-span-4 md:text-right">{row.note}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DISCOUNTS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="折扣与政策"
              title="内置省钱机制"
              description="限时折扣、统一的 token 定价，以及自动发放的促销额度。"
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {discounts.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <d.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white sm:mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">{d.title}</h3>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40 sm:text-sm">
                    {d.label}
                  </p>
                  <p className="text-sm leading-relaxed text-white/50 sm:text-base">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDIT DETAILS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="计费机制"
              title="计费方式说明"
              description="扣费逻辑清晰可预测，额度优先级明确，并提供实时成本接口，助力您的数据看板。"
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {creditDetails.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <d.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white sm:mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50 sm:text-base">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE & ON-PREMISE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 xl:py-40">
            <motion.div
              className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/[0.08] bg-black"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="grid gap-0 lg:grid-cols-5">
                <div className="flex flex-col justify-between gap-8 border-b border-white/[0.08] p-6 sm:p-8 md:p-10 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-12">
                  <div>
                    <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                      企业版与私有化部署
                    </p>
                    <h2 className="mb-4 text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:mb-5 sm:text-4xl md:text-5xl">
                      以您的方式运行 Swarms。
                    </h2>
                    <p className="text-base leading-relaxed text-white/50 sm:text-lg">
                      专属算力、定制 SLA、白标方案与完整的私有化部署能力，专为受监管行业与大规模智能体负载而生。
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="rounded-full bg-white font-medium text-black hover:bg-neutral-200" asChild>
                      <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                        联系销售
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                      asChild
                    >
                      <Link href="/api">
                        <Code className="mr-2 h-4 w-4" />
                        API 参考文档
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-3">
                  {enterpriseBenefits.map((b, i) => (
                    <div
                      key={b.title}
                      className={`p-6 sm:p-7 md:p-8 ${i < enterpriseBenefits.length - 1 ? "border-b border-white/[0.08] sm:border-b-0 sm:border-r" : ""}`}
                    >
                      <b.icon className="mb-4 h-5 w-5 text-white/50" strokeWidth={1.5} />
                      <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{b.title}</h3>
                      <p className="text-sm leading-relaxed text-white/50">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading eyebrow="常见问题" title="价格相关常见问题" />

            <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="overflow-hidden rounded-lg border border-white/[0.08] bg-black transition-colors duration-300 hover:bg-[#0a0a0a]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="text-sm font-medium leading-snug text-white sm:text-base md:text-lg">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-white/50 sm:px-6 sm:pb-6 sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
            >
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  免费开始，准备好后随时扩展。
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  不到一分钟即可生成 API 密钥。使用同一组密钥即可升级到专业版、高级版或企业版，无需迁移，也不会造成任何停机。
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://cloud.swarms.world/api-keys" target="_blank" rel="noopener noreferrer">
                    获取 API 密钥
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    联系销售
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
