import { COMPANIES } from "@/components/home-logo-marquee"

/**
 * Static grid of the hero's company logos (icon plus name). Wordmark-only
 * logos are skipped so every cell has the same shape.
 */
export function CompanyLogoGrid({ count = 6, className = "" }: { count?: number; className?: string }) {
  const logos = COMPANIES.filter((c) => !c.wordmark).slice(0, count)
  return (
    <ul className={`grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 ${className}`}>
      {logos.map(({ name, icon: Icon }) => (
        <li key={name} className="flex items-center gap-2.5 text-white/55">
          <Icon size={22} aria-hidden="true" className="h-[22px] w-[22px] shrink-0" />
          <span className="whitespace-nowrap text-base font-semibold tracking-tight">{name}</span>
        </li>
      ))}
    </ul>
  )
}
