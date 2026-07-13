import Link from "next/link"
import { Languages } from "lucide-react"

// Pill link that jumps to the same page in the other language.
export function LanguageToggle({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-white/60 transition-colors duration-300 hover:border-white/40 hover:text-white"
    >
      <Languages className="h-4 w-4" />
      {label}
    </Link>
  )
}
