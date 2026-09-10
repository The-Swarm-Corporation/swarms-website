"use client"

import { useEffect, useRef, useState } from "react"
import { CourseCompleteModal } from "@/components/academy/course-complete-modal"
import { useAcademyProgress, isCourseComplete } from "@/lib/academy/progress"

export function CourseCompleteDetector({ partSlug }: { partSlug: string }) {
  const progress = useAcademyProgress()
  const [showModal, setShowModal] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const courseComplete = isCourseComplete(progress)
  const isPart4 = partSlug === "production"
  const prevComplete = useRef(courseComplete)

  useEffect(() => {
    if (isPart4 && courseComplete && !prevComplete.current && !hasTriggered) {
      setShowModal(true)
      setHasTriggered(true)
    }
    prevComplete.current = courseComplete
  }, [courseComplete, isPart4, hasTriggered])

  if (!isPart4 || !courseComplete) {
    return null
  }

  return (
    <CourseCompleteModal
      open={showModal}
      onOpenChange={setShowModal}
      onViewCertificate={() => {
        window.dispatchEvent(new CustomEvent("open-certificate-modal"))
      }}
    />
  )
}