"use client"

import { useEffect } from "react"
import { Check, GraduationCap, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

import { useAcademyProgress, isCourseComplete } from "@/lib/academy/progress"

type CourseCompleteModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewCertificate: () => void
}

export function CourseCompleteModal({ open, onOpenChange, onViewCertificate }: CourseCompleteModalProps) {
  const progress = useAcademyProgress()
  const { current } = isCourseComplete(progress) ? { current: { name: "Swarm Architect" } } : { current: { name: "Recruit" } }
  const points = progress ? 0 : 0

  // Fire confetti when modal opens
  useEffect(() => {
    if (!open) return

    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: ["#ef4444", "#f97316", "#fbbf24", "#22c55e", "#3b82f6", "#a855f7"],
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: ["#ef4444", "#f97316", "#fbbf24", "#22c55e", "#3b82f6", "#a855f7"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
            <Check className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
          </div>
          <DialogTitle className="text-2xl font-bold">Course Complete!</DialogTitle>
          <DialogDescription className="text-white/60">
            Congratulations! You've completed all four parts of <strong>The Swarms API Course</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* <div className="space-y-4 py-4 border-t border-b border-white/10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Final Rank</p>
              <p className="mt-1 text-2xl font-semibold text-emerald-300">Swarm Architect</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Parts Completed</p>
              <p className="mt-1 text-2xl font-semibold text-white">4 / 4</p>
            </div>
          </div>
        </div> */}

        <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={() => {
              onViewCertificate()
              onOpenChange(false)
            }}
            className="w-full sm:w-auto flex-1"
            size="lg"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            View Certificate
          </Button>
          <Button variant="outline" className="w-full sm:w-auto flex-1" size="lg" asChild>
            <a
              href="https://docs.swarms.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Go to Docs
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}