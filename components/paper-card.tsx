import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

// A research paper as a single quiet tile: the title and nothing else. The
// system's name (before the colon) reads in white and the rest of the title in
// gray beneath it, the way Apple sets two-tone headlines. Shared by /research,
// /research-papers and the /routehub paper section.
export function PaperCard({
  title,
  href,
  className,
}: {
  title: string
  href: string
  className?: string
}) {
  const split = title.indexOf(": ")
  const name = split > 0 ? title.slice(0, split) : title
  const rest = split > 0 ? title.slice(split + 2) : ""

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex min-h-[220px] flex-col justify-between rounded-[28px] bg-[#0f0f10] p-7 ring-1 ring-inset ring-white/[0.06] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[#151517] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:min-h-[280px] sm:p-10",
        className,
      )}
    >
      <h3 className="max-w-[26ch] text-balance text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.022em] sm:text-[2rem]">
        <span className="block text-white">{name}</span>
        {rest && (
          <>
            <span className="sr-only">: </span>
            <span className="mt-1 block text-white/45">{rest}</span>
          </>
        )}
      </h3>
      <span
        aria-hidden="true"
        className="mt-10 flex h-10 w-10 items-center justify-center self-end rounded-full bg-white/[0.08] text-white/80 transition-colors duration-300 group-hover:bg-white group-hover:text-black"
      >
        <ArrowUpRight className="h-[18px] w-[18px]" />
      </span>
    </a>
  )
}
