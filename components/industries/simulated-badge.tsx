import { cn } from "@/lib/utils"

// Every live visualization on the industry pages runs on generated data. The
// badge says so in place, so a chart is never mistaken for a customer's
// numbers.
export function SimulatedBadge({ className, label = "Simulated data" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-black/60 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/40",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/60" />
      </span>
      {label}
    </span>
  )
}
