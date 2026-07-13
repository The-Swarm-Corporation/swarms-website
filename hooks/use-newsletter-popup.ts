"use client"

import { useState, useEffect } from "react"

export function useNewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup or already subscribed
    const hasSeenPopup = localStorage.getItem("swarms-newsletter-popup-seen")
    const isSubscribed = localStorage.getItem("swarms-newsletter-subscribed")

    if (!hasSeenPopup && !isSubscribed) {
      // Show popup after 15 seconds to give users time to explore
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 15000)

      return () => clearTimeout(timer)
    }
  }, [])

  const closePopup = () => {
    setIsOpen(false)
    // Mark as seen so it doesn't show again
    localStorage.setItem("swarms-newsletter-popup-seen", "true")
  }

  const openPopup = () => {
    setIsOpen(true)
  }

  return {
    isOpen,
    closePopup,
    openPopup,
  }
}
