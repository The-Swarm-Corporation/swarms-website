"use client"

import { useEffect, useRef } from "react"

interface ScrollingTickerProps {
  announcements: string[]
  speed?: number
  className?: string
}

export function ScrollingTicker({ announcements, speed = 50, className = "" }: ScrollingTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tickerRef.current) return

    const ticker = tickerRef.current
    const tickerContent = ticker.querySelector(".ticker-content") as HTMLDivElement

    if (!tickerContent) return

    // Clone the content to create a seamless loop
    ticker.appendChild(tickerContent.cloneNode(true))

    let animationId: number
    let position = 0

    const animate = () => {
      if (!ticker) return

      position -= 1

      if (position <= -tickerContent.offsetWidth) {
        position = 0
      }

      ticker.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [announcements, speed])


  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div ref={tickerRef} className="whitespace-nowrap inline-flex items-center" style={{ willChange: "transform" }}>
        <div className="ticker-content inline-flex items-center">
          {announcements.map((announcement, index) => (
            <div key={index} className="inline-flex items-center mx-4 text-sm text-slate-400">
              <span>{announcement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
