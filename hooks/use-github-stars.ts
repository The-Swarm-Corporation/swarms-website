"use client"

import { useEffect, useState } from "react"

export function useGithubStars() {
  const [stars, setStars] = useState<Record<string, number>>({})
  useEffect(() => {
    fetch("/api/github-stars")
      .then((r) => r.json())
      .then(setStars)
      .catch(() => {})
  }, [])
  return stars
}
