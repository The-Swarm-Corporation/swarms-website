"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

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

  // Let's update the language detection function to include the new languages
  const detectLanguage = (text: string): "en" | "zh" | "ja" | "ru" | "es" | "de" | "fr" | "hi" | "other" => {
    // Chinese character range check (simplified and traditional)
    if (/[\u4e00-\u9fff]/.test(text)) {
      return "zh"
    }
    // Japanese character range check (hiragana, katakana)
    else if (/[\u3040-\u30ff]/.test(text)) {
      return "ja"
    }
    // Russian character range check (Cyrillic)
    else if (/[\u0400-\u04FF]/.test(text)) {
      return "ru"
    }
    // Hindi character range check (Devanagari)
    else if (/[\u0900-\u097F]/.test(text)) {
      return "hi"
    }
    // Spanish, German, French (check for specific accented characters)
    else if (/[áéíóúüñ]/i.test(text)) {
      return "es"
    } else if (/[äöüß]/i.test(text)) {
      return "de"
    } else if (/[àâçéèêëîïôùûüÿ]/i.test(text)) {
      return "fr"
    }
    // Default to English for Latin characters
    else if (/[a-zA-Z]/.test(text)) {
      return "en"
    }
    // Fallback
    return "other"
  }

  // Update the language indicator function to support new languages
  const getLanguageIndicator = (text: string) => {
    const lang = detectLanguage(text)

    switch (lang) {
      case "en":
        return <span className="mr-2 text-xs text-slate-400/70">[EN]</span>
      case "zh":
        return <span className="mr-2 text-xs text-slate-400/70">[中文]</span>
      case "ja":
        return <span className="mr-2 text-xs text-slate-400/70">[日本語]</span>
      case "ru":
        return <span className="mr-2 text-xs text-slate-400/70">[РУ]</span>
      case "es":
        return <span className="mr-2 text-xs text-slate-400/70">[ES]</span>
      case "de":
        return <span className="mr-2 text-xs text-slate-400/70">[DE]</span>
      case "fr":
        return <span className="mr-2 text-xs text-slate-400/70">[FR]</span>
      case "hi":
        return <span className="mr-2 text-xs text-slate-400/70">[हिं]</span>
      default:
        return <ArrowRight className="mr-2 h-4 w-4" />
    }
  }

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div ref={tickerRef} className="whitespace-nowrap inline-flex items-center" style={{ willChange: "transform" }}>
        <div className="ticker-content inline-flex items-center">
          {announcements.map((announcement, index) => (
            <div key={index} className="inline-flex items-center mx-4 text-sm text-slate-400">
              {getLanguageIndicator(announcement)}
              <span>{announcement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
