"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Zap,
  Layers,
  Wallet,
  Lock,
  Code2,
  Server,
  Smartphone,
  CheckCircle2,
  Coins,
} from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function ATPPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Hero — mobile-first: compact padding, touch targets, fluid type */}
      <section className="relative min-h-[85dvh] sm:min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(30,58,138,0.22),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(37,99,235,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_70%,rgba(59,130,246,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container relative z-10 w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 py-14 sm:py-20 md:py-28 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-950/40 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-blue-200 max-w-[95vw] sm:max-w-none"
            >
              <Coins className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-blue-400" />
              <span className="truncate">Agent-to-agent payments on Solana</span>
            </motion.div>

            <div className="space-y-2 sm:space-y-4 md:space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.6, ease: "easeOut" }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-bold tracking-tight text-white leading-[0.95] break-words"
                style={{ fontSize: "clamp(2.25rem, 10vw + 1rem, 7.5rem)" }}
              >
                ATP
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="text-xs sm:text-base md:text-lg text-blue-300/90 font-medium tracking-widest uppercase break-words px-1"
              >
                Agent Trade Protocol
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/75 max-w-2xl mx-auto leading-relaxed px-2 break-words"
            >
              The premier payment protocol and foundational framework for the agent economy.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="text-xs sm:text-sm md:text-base text-white/50 max-w-lg mx-auto px-2 break-words"
            >
              Automatic payment processing, response encryption, and zero-config middleware. Pay-per-use on Solana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none sm:w-auto justify-center px-2 sm:px-0"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/95 font-semibold text-sm sm:text-base min-h-[48px] sm:min-h-0 px-5 sm:px-8 py-5 sm:py-7 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto touch-manipulation"
                asChild
              >
                <a
                  href="https://github.com/The-Swarm-Corporation/ATP-Protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] sm:min-h-0"
                >
                  View on GitHub
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/35 font-medium text-sm sm:text-base min-h-[48px] sm:min-h-0 px-5 sm:px-8 py-5 sm:py-7 rounded-xl bg-transparent backdrop-blur-sm transition-all active:scale-[0.98] w-full sm:w-auto touch-manipulation"
                asChild
              >
                <a
                  href="https://docs.swarms.ai/docs/atp/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] sm:min-h-0"
                >
                  Documentation
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-4 sm:pt-8 flex flex-col items-center gap-1.5 sm:gap-2"
            >
              <span className="text-[10px] sm:text-xs text-white/40 font-medium">Scroll to explore</span>
              <div className="h-7 w-4 sm:h-8 sm:w-5 rounded-full border-2 border-white/20 flex items-start justify-center p-1 sm:p-1.5">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/50"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is ATP — overview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words px-1">
              What is ATP?
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
              ATP is the agent-to-agent payment protocol that makes pay-to-unlock results simple on Solana.
            </p>
          </motion.div>
          <motion.div {...fadeIn} className="min-w-0">
            <Card className="border-white/10 bg-white/[0.02] p-4 sm:p-6 md:p-8 min-w-0">
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed break-words">
                ATP (Agent Trade Protocol) is designed to overcome x402&apos;s limitations and make agent-to-agent payments dynamic and simple. 
                It provides a <strong className="text-white">middleware layer</strong> that automatically deducts payments from user wallets based on token usage. 
                Responses are <strong className="text-white">encrypted</strong> until payment is confirmed on-chain, so users only see output after paying. 
                All settlements run on the <strong className="text-white">Solana blockchain</strong> with full transparency, and the protocol supports 
                multiple usage formats (OpenAI, Anthropic, Google, etc.) out of the box.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key features */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words px-1">
              Key features
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2">
              Security, automation, and decentralization built in.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                icon: Zap,
                title: "High-performance settlement",
                desc: "Rust-built settlement infrastructure delivers low-latency, reliable payment processing and on-chain finality at scale.",
              },
              {
                icon: Code2,
                title: "Rapid integration",
                desc: "Deploy with minimal configuration. Integrate into existing FastAPI services without architectural changes or vendor lock-in.",
              },
              {
                icon: Layers,
                title: "API middleware",
                desc: "Production-ready middleware layer for FastAPI that enforces payment-gating and automates settlement across protected endpoints.",
              },
              {
                icon: Lock,
                title: "Security & compliance",
                desc: "Response encryption keeps output inaccessible until on-chain payment confirmation, supporting pay-to-unlock policies and audit requirements.",
              },
              {
                icon: Coins,
                title: "Usage-based billing",
                desc: "Metered billing aligned to token consumption. Automatic settlement with transparent, auditable pricing for cost control and forecasting.",
              },
              {
                icon: Wallet,
                title: "SOL & USDC",
                desc: "Settle in Solana native token or USDC with full transaction visibility and on-chain auditability for finance and compliance teams.",
              },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeIn} transition={{ ...fadeIn.transition, delay: i * 0.05 }}>
                <Card className="border-white/10 bg-white/[0.02] h-full hover:border-white/20 transition-colors min-w-0">
                  <CardHeader className="p-4 sm:p-5 md:p-6">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-900/20 text-blue-400 border border-blue-700/30 mb-2 shrink-0">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <CardTitle className="text-white text-sm sm:text-base md:text-lg break-words">{item.title}</CardTitle>
                    <CardDescription className="text-white/60 text-xs sm:text-sm break-words">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick 3-step tutorial */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            {...fadeIn}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words px-1">
              Get started in 3 steps
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2">
              Add ATP to your FastAPI server and start accepting agent payments in minutes.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Step 1 */}
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="min-w-0">
              <Card className="border-white/10 bg-white/[0.02] overflow-hidden min-w-0">
                <CardHeader className="pb-2 p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-900/25 text-blue-400 border border-blue-700/40">
                      <span className="text-base sm:text-lg font-bold">1</span>
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-white text-base sm:text-lg md:text-xl break-words">Install</CardTitle>
                      <CardDescription className="text-white/60 text-xs sm:text-sm">Install the ATP protocol package</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  <pre className="rounded-lg border border-white/10 bg-black/40 p-3 sm:p-4 text-xs sm:text-sm text-white/90 font-mono overflow-x-auto overflow-y-hidden min-w-0 -mx-1 sm:mx-0">
                    <code className="block min-w-max">pip install atp-protocol</code>
                  </pre>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.15 }} className="min-w-0">
              <Card className="border-white/10 bg-white/[0.02] overflow-hidden min-w-0">
                <CardHeader className="pb-2 p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-900/25 text-blue-400 border border-blue-700/40">
                      <span className="text-base sm:text-lg font-bold">2</span>
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-white text-base sm:text-lg md:text-xl break-words">Add middleware to your server</CardTitle>
                      <CardDescription className="text-white/60 text-xs sm:text-sm">Protect endpoints and enable automatic payments</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  <pre className="rounded-lg border border-white/10 bg-black/40 p-3 sm:p-4 text-[11px] xs:text-xs sm:text-sm text-white/90 font-mono overflow-x-auto overflow-y-hidden min-w-0 -mx-1 sm:mx-0">
{`from fastapi import FastAPI
from atp.middleware import ATPSettlementMiddleware
from atp.schemas import PaymentToken

app = FastAPI()
app.add_middleware(
    ATPSettlementMiddleware,
    allowed_endpoints=["/v1/chat", "/v1/completions"],
    input_cost_per_million_usd=10.0,
    output_cost_per_million_usd=30.0,
    recipient_pubkey="YourSolanaWalletPublicKeyHere",
    payment_token=PaymentToken.SOL,
    require_wallet=True,
)`}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="min-w-0">
              <Card className="border-white/10 bg-white/[0.02] overflow-hidden min-w-0">
                <CardHeader className="pb-2 p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-900/25 text-blue-400 border border-blue-700/40">
                      <span className="text-base sm:text-lg font-bold">3</span>
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-white text-base sm:text-lg md:text-xl break-words">Call from the client</CardTitle>
                      <CardDescription className="text-white/60 text-xs sm:text-sm">Clients pay automatically; responses decrypt after payment</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  <pre className="rounded-lg border border-white/10 bg-black/40 p-3 sm:p-4 text-[11px] xs:text-xs sm:text-sm text-white/90 font-mono overflow-x-auto overflow-y-hidden min-w-0 -mx-1 sm:mx-0">
{`from atp.client import ATPClient

client = ATPClient(
    wallet_private_key="[1,2,3,...]",
    settlement_service_url="https://facilitator.swarms.world"
)
response = await client.post(
    url="https://api.example.com/v1/chat",
    json={"message": "Hello!"}
)
print(response["response"])  # Agent output
print(response["atp_settlement"])  # Payment details`}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words px-1">
              Architecture
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2">
              Three components power the protocol: Settlement, Middleware, and Client.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Server,
                title: "Settlement service",
                sub: "Facilitator",
                desc: "Handles settlement logic, usage parsing, payment calculation, and blockchain transaction execution.",
              },
              {
                icon: Layers,
                title: "Middleware",
                sub: "FastAPI",
                desc: "Intercepts responses, extracts usage, encrypts output, runs payments, and decrypts only after confirmation.",
              },
              {
                icon: Smartphone,
                title: "Client",
                sub: "User-facing",
                desc: "Simplifies requests to ATP-protected endpoints and interaction with the settlement service.",
              },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeIn} transition={{ ...fadeIn.transition, delay: i * 0.08 }} className="min-w-0">
                <Card className="border-white/10 bg-white/[0.02] h-full min-w-0">
                  <CardHeader className="p-4 sm:p-5 md:p-6">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-900/20 text-blue-400 border border-blue-700/30 mb-2 sm:mb-3 shrink-0">
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0 min-w-0">
                      <CardTitle className="text-white text-base sm:text-lg break-words">{item.title}</CardTitle>
                      <span className="text-xs text-white/50 font-medium shrink-0">({item.sub})</span>
                    </div>
                    <CardDescription className="text-white/60 text-xs sm:text-sm break-words">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-6 sm:mt-10 md:mt-12 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 md:p-8 overflow-hidden min-w-0"
            {...fadeIn}
          >
            <h3 className="text-xs sm:text-sm font-semibold text-white/80 mb-4 sm:mb-6">Request flow</h3>
            {/* Desktop: horizontal pipeline with connecting line */}
            <div className="hidden sm:block relative">
              <div className="absolute inset-x-0 top-5 h-0.5 bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" aria-hidden />
              <div className="relative flex justify-between gap-2">
                {[
                  { label: "Client request", short: "Client" },
                  { label: "Agent API", short: "Agent" },
                  { label: "Encrypt response", short: "Encrypt" },
                  { label: "Execute payment", short: "Settlement" },
                  { label: "Decrypt & return", short: "Decrypt" },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center text-center flex-1 min-w-0">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-600/50 bg-black text-sm font-semibold text-blue-300">
                      {i + 1}
                    </div>
                    <span className="mt-2 text-xs font-medium text-white/90 truncate w-full px-1" title={step.label}>
                      {step.short}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile: vertical timeline with connecting line */}
            <div className="sm:hidden relative pl-5 pr-2">
              <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-600/50 via-blue-600/30 to-transparent" aria-hidden />
              {[
                "Client request",
                "Agent API",
                "Middleware: encrypt response",
                "Settlement: execute payment",
                "Decrypt after confirmation",
              ].map((label, i) => (
                <div key={label} className="relative flex items-center gap-3 py-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-blue-600/50 bg-black text-[10px] font-semibold text-blue-300 z-10">
                    {i + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-white/90 font-medium break-words">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security & payment details */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words px-1">
              Security & payment
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2">
              Pay-to-unlock and transparent splits.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <motion.div {...fadeIn} className="min-w-0">
              <Card className="border-white/10 bg-white/[0.02] h-full min-w-0">
                <CardHeader className="p-4 sm:p-5 md:p-6">
                  <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg flex-wrap break-words">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-blue-400" />
                    Security features
                  </CardTitle>
                  <CardDescription className="text-white/60 text-xs sm:text-sm space-y-2 break-words">
                    <span className="block">• Responses are encrypted before payment verification.</span>
                    <span className="block">• Decryption only after successful on-chain confirmation (status=&quot;paid&quot;).</span>
                    <span className="block">• Failed payments return encrypted response with error details; no free access to output.</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div {...fadeIn} className="min-w-0">
              <Card className="border-white/10 bg-white/[0.02] h-full min-w-0">
                <CardHeader className="p-4 sm:p-5 md:p-6">
                  <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg flex-wrap break-words">
                    <Coins className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-blue-400" />
                    Payment structure
                  </CardTitle>
                  <CardDescription className="text-white/60 text-xs sm:text-sm space-y-2 break-words">
                    <span className="block">• <strong className="text-white/80">Treasury</strong>: processing fee (default 5%).</span>
                    <span className="block">• <strong className="text-white/80">Recipient</strong>: remainder (95%) — your wallet via <code className="rounded bg-white/10 px-1 break-all">recipient_pubkey</code>.</span>
                    <span className="block">• Supported tokens: <strong className="text-white/80">SOL</strong> and <strong className="text-white/80">USDC</strong> on Solana.</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Usage formats */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div className="text-center mb-6 sm:mb-10 md:mb-12" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words px-1">
              Usage data formats
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2">
              Middleware auto-detects OpenAI, Anthropic, and Google-style usage.
            </p>
          </motion.div>
          <motion.div {...fadeIn} className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {["OpenAI", "Anthropic", "Google / Gemini"].map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white/80"
              >
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-blue-400" />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
        <div className="container w-full text-center max-w-3xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight break-words px-1">
              Build the agent economy
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-xl mx-auto px-2 break-words">
              Add ATP to your agent API and start accepting payments on Solana in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none sm:w-auto mx-auto justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-semibold min-h-[48px] px-5 sm:px-6 py-5 sm:py-6 w-full sm:w-auto touch-manipulation"
                asChild
              >
                <a
                  href="https://github.com/The-Swarm-Corporation/ATP-Protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] sm:min-h-0"
                >
                  <Code2 className="mr-2 h-4 w-4 shrink-0" />
                  Get ATP on GitHub
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 min-h-[48px] px-5 sm:px-6 py-5 sm:py-6 w-full sm:w-auto touch-manipulation"
                asChild
              >
                <a
                  href="https://docs.swarms.ai/docs/atp/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] sm:min-h-0"
                >
                  Full documentation
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
