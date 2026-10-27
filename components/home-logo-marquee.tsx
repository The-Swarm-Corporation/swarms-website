import type { ComponentType, SVGProps } from "react"
import {
  SiAdobe,
  SiAlibabadotcom,
  SiAmazon,
  SiApple,
  SiBaidu,
  SiBytedance,
  SiCisco,
  SiGoogle,
  SiHuawei,
  SiMeta,
  SiNetflix,
  SiNvidia,
  SiOpenai,
  SiOracle,
  SiRedhat,
  SiSamsung,
  SiSap,
  SiShopify,
  SiSiemens,
} from "react-icons/si"

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; title?: string }>

// Simple Icons does not ship the Microsoft mark, so draw the four squares.
export function MicrosoftIcon(props: SVGProps<SVGSVGElement> & { size?: number | string }) {
  const { size, ...rest } = props
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M1 1h10.5v10.5H1zM12.5 1H23v10.5H12.5zM1 12.5h10.5V23H1zM12.5 12.5H23V23H12.5z" />
    </svg>
  )
}

// Companies listed most often in the Company field of people who starred
// kyegomez/swarms on GitHub. Logos with a `wordmark` size already spell the
// name, so they render alone at that size (Simple Icons pads wordmarks into a
// square 24x24 box, hence the larger box and negative margin).
export const COMPANIES: { name: string; icon: Icon; wordmark?: number }[] = [
  { name: "Google", icon: SiGoogle },
  { name: "Microsoft", icon: MicrosoftIcon },
  { name: "OpenAI", icon: SiOpenai },
  { name: "NVIDIA", icon: SiNvidia },
  { name: "Meta", icon: SiMeta },
  { name: "Apple", icon: SiApple },
  { name: "Amazon", icon: SiAmazon },
  { name: "Netflix", icon: SiNetflix },
  { name: "Adobe", icon: SiAdobe },
  { name: "Oracle", icon: SiOracle },
  { name: "Alibaba", icon: SiAlibabadotcom },
  { name: "ByteDance", icon: SiBytedance },
  { name: "Huawei", icon: SiHuawei },
  { name: "Samsung", icon: SiSamsung, wordmark: 112 },
  { name: "Shopify", icon: SiShopify },
  { name: "SAP", icon: SiSap, wordmark: 56 },
  { name: "Siemens", icon: SiSiemens, wordmark: 104 },
  { name: "Baidu", icon: SiBaidu },
  { name: "Red Hat", icon: SiRedhat },
  { name: "Cisco", icon: SiCisco, wordmark: 56 },
]

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" aria-hidden={hidden || undefined}>
      {COMPANIES.map(({ name, icon: Icon, wordmark }) => (
        <li
          key={name}
          className="flex shrink-0 items-center gap-2.5 text-white/45 transition-colors duration-300 hover:text-white/90"
        >
          {wordmark ? (
            <Icon
              size={wordmark}
              title={hidden ? undefined : name}
              style={{ width: wordmark, height: wordmark, margin: `${(28 - wordmark) / 2}px 0` }}
            />
          ) : (
            <>
              <Icon size={22} aria-hidden="true" className="h-[22px] w-[22px]" />
              <span className="whitespace-nowrap text-base font-semibold tracking-tight sm:text-lg">{name}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export function HomeLogoMarquee() {
  return (
    <div className="relative border-t border-white/[0.08] py-5 sm:py-6">
      <div className="logo-marquee group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="logo-marquee-track flex w-max group-hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </div>
  )
}
