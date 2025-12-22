"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => Promise<void>
      }
      ready: (callback: (twttr: any) => void) => void
    }
  }
}

export function HomeTwitterUpdates() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadWidget = () => {
      if (window.twttr && containerRef.current) {
        window.twttr.ready((twttr: any) => {
          // Find all twitter-timeline elements and load them
          const timelines = containerRef.current?.querySelectorAll('.twitter-timeline')
          if (timelines && timelines.length > 0) {
            twttr.widgets.load()
          }
        })
      }
    }

    // Try to load immediately if script is already available
    if (window.twttr) {
      loadWidget()
    } else {
      // Wait for script to be available
      const interval = setInterval(() => {
        if (window.twttr) {
          clearInterval(interval)
          loadWidget()
        }
      }, 100)

      // Cleanup after 10 seconds
      const timeout = setTimeout(() => clearInterval(interval), 10000)
      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <div className="container py-24 md:py-32 px-4 sm:px-6 bg-black">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
        id="twitter-widgets"
        onLoad={() => {
          // Force reload widgets after script loads
          if (window.twttr && containerRef.current) {
            window.twttr.ready((twttr: any) => {
              twttr.widgets.load(containerRef.current || undefined)
            })
          }
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-6 mb-16"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Latest Updates
        </h2>
        <p className="text-xl text-white/60 max-w-3xl mx-auto font-normal">
          Follow our latest announcements, releases, and insights
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="text-white font-bold">Swarms</div>
                  <div className="text-white/60 text-sm">@swarms_corp</div>
                </div>
              </div>
              <div className="space-y-4" ref={containerRef}>
                <a
                  className="twitter-timeline"
                  data-theme="dark"
                  data-tweet-limit="5"
                  data-chrome="noheader nofooter noborders noscrollbar transparent"
                  data-width="100%"
                  href="https://twitter.com/swarms_corp?ref_src=twsrc%5Etfw"
                >
                  Tweets by swarms_corp
                </a>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

