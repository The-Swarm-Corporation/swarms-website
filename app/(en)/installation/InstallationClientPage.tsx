"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  installationMethods,
  nextSteps,
  quickStart,
  requirements,
  tabsData,
  troubleshooting,
  verification,
} from "./installation-data"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

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

/** `blocks` holds each command's highlighted HTML, rendered by page.tsx and keyed by the command. */
export function InstallationClientPage({ blocks }: { blocks: Record<string, React.ReactNode> }) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = async (text: string, commandId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(commandId)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const CodeBlock = ({
    command,
    commandId,
    filename = "terminal",
    description,
  }: {
    command: string
    commandId: string
    filename?: string
    description?: string
  }) => (
    <div>
      <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{filename}</span>
          <button
            type="button"
            onClick={() => copyToClipboard(command, commandId)}
            aria-label="Copy command"
            className="ml-auto flex-shrink-0 text-white/50 transition-colors hover:text-white"
          >
            {copiedCommand === commandId ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <div className="p-4 sm:p-5">{blocks[command]}</div>
      </div>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-white/50 break-words">{description}</p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* Hero */}
        <section className="relative flex items-center overflow-hidden border-b border-white/[0.08] bg-black">
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
                Installation Guide
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Install Swarms
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Get started with the Swarms framework in minutes. Choose your
                preferred installation method and start building multi-agent AI
                systems.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-8 text-base font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:h-14 sm:w-auto sm:text-lg"
                  onClick={() => copyToClipboard("pip install swarms", "hero-copy")}
                >
                  {copiedCommand === "hero-copy" ? (
                    <>
                      Copied
                      <Check className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      pip install swarms
                      <Copy className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    Documentation
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Recommended · uv"
              title="Quick start"
              description="The fastest way to get Swarms up and running — uv is up to 10x faster than pip."
            />

            <motion.div
              className="mx-auto max-w-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <div className="max-w-2xl space-y-6">
                {quickStart.map((step, index) => (
                  <div key={step.commandId} className="space-y-3">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                      {String(index + 1).padStart(2, "0")} — {step.label}
                    </p>
                    <CodeBlock command={step.command} commandId={step.commandId} filename={step.file} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Installation Methods */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Choose your method"
              title="Installation methods"
              description="Choose the installation method that works best for your environment."
            />

            <motion.div
              className="mx-auto max-w-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <Tabs defaultValue="pip" className="w-full max-w-3xl">
                <TabsList className="flex h-auto w-full flex-wrap items-center justify-start gap-2 rounded-lg border border-white/[0.08] bg-black p-1.5">
                  {installationMethods.map((method) => (
                    <TabsTrigger
                      key={method.id}
                      value={method.id}
                      className="flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/[0.05] data-[state=active]:border-white/20 data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      <method.icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                      {method.title}
                      {method.recommended && (
                        <span className="rounded-full border border-white/20 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                          Recommended
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {installationMethods.map((method) => {
                  const data = tabsData[method.id]
                  return (
                    <TabsContent key={method.id} value={method.id} className="mt-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
                            <data.icon className="h-5 w-5 text-white/50" strokeWidth={1.5} />
                            {data.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                            {data.description}
                          </p>
                        </div>

                        {data.note && (
                          <div className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-[#0a0a0a] px-4 py-3.5">
                            {data.note.type === "success" ? (
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/50" strokeWidth={1.5} />
                            ) : (
                              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/50" strokeWidth={1.5} />
                            )}
                            <p className="text-sm leading-relaxed text-white/60">{data.note.text}</p>
                          </div>
                        )}

                        <div className="space-y-5">
                          {data.steps.map((step) => (
                            <div key={step.command} className="space-y-2">
                              <p className="text-sm font-medium text-white">{step.label}</p>
                              <CodeBlock
                                command={step.command}
                                commandId={`${method.id}-${step.command}`}
                                description={step.description}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Requirements */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading eyebrow="Before you begin" title="Requirements & verification" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                className="rounded-lg border border-white/[0.08] bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                <h3 className="mb-5 text-lg font-semibold text-white">System requirements</h3>
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.5} />
                      <span className="text-sm text-white/70">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="rounded-lg border border-white/[0.08] bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.08, ease }}
              >
                <h3 className="mb-5 text-lg font-semibold text-white">Verify installation</h3>
                <div className="space-y-5">
                  {verification.map((step) => (
                    <div key={step.commandId}>
                      <p className="mb-2 text-sm font-medium text-white/70">{step.label}</p>
                      <CodeBlock command={step.command} commandId={step.commandId} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="What's next"
              title="Next steps"
              description="Now that you have Swarms installed, here's what you can do next."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {nextSteps.map((step) => (
                <div
                  key={step.title}
                  className="group flex flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <step.icon
                    className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{step.title}</h3>
                    <p className="mb-5 text-sm font-normal leading-relaxed text-white/50">
                      {step.description}
                    </p>
                    <Button
                      variant="outline"
                      className="h-9 w-full rounded-full border-white/[0.14] bg-black px-4 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                      asChild
                    >
                      <a href={step.href} target="_blank" rel="noopener noreferrer">
                        {step.label}
                        <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Support"
              title="Troubleshooting"
              description="Common issues and their solutions."
            />

            <div className="mx-auto max-w-7xl">
              <div className="max-w-2xl space-y-4">
                {troubleshooting.map((issue, i) => (
                  <motion.div
                    key={issue.title}
                    className="rounded-lg border border-white/[0.08] bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  >
                    <h3 className="mb-2 text-base font-semibold text-white">{issue.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-white/50">{issue.description}</p>
                    <CodeBlock command={issue.command} commandId={`issue-${i}`} />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto mt-14 flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center"
            >
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Still having issues?
                </h3>
                <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                  Get help from our community on Discord or report an issue on GitHub.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                    Join Discord
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
                <Button
                  className="h-11 w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-6 text-sm font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:w-auto"
                  asChild
                >
                  <a
                    href="https://github.com/kyegomez/swarms/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report Issue
                    <ArrowRight className="ml-2 h-4 w-4" />
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
