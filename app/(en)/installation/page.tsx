import { CodeBlock } from "@/components/code-block"
import { InstallationClientPage } from "./InstallationClientPage"
import { quickStart, tabsData, troubleshooting, verification } from "./installation-data"

// Every shell command the page shows. Each is highlighted once here on the
// server; the client page looks its block up by the command string, so Shiki
// never ships to the browser for this route. A command that appears in more
// than one section collapses to a single entry on purpose.
const commands = [
  ...quickStart.map((step) => step.command),
  ...Object.values(tabsData).flatMap((method) => method.steps.map((step) => step.command)),
  ...verification.map((step) => step.command),
  ...troubleshooting.map((issue) => issue.command),
]

export default function InstallationPage() {
  const blocks = Object.fromEntries(
    commands.map((command) => [
      command,
      <CodeBlock
        code={command}
        lang="bash"
        className="whitespace-pre-wrap break-all font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]"
      />,
    ]),
  )

  return <InstallationClientPage blocks={blocks} />
}
