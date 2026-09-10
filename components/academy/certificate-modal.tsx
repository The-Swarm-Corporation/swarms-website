"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Loader2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CourseCertificate } from "@/components/academy/course-certificate"
import { getCertificateData, getProfile, setProfileName, isCourseComplete } from "@/lib/academy/progress"
import { useAcademyProgress } from "@/lib/academy/progress"

type CertificateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificateModal({ open, onOpenChange }: CertificateModalProps) {
  const progress = useAcademyProgress()
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const certificate = getCertificateData(progress)
  const profile = getProfile(progress)
  const hasName = profile.name?.trim().length ?? 0 >= 2

  // Real-time validation
  useEffect(() => {
    const trimmed = name.trim()
    if (trimmed.length >= 2) {
      setError("")
    } else if (trimmed.length > 0) {
      setError("Name must be at least 2 characters")
    } else {
      setError("")
    }
  }, [name])

  // Auto-hide success toast
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [saved])

  // Focus input when name form appears
  useEffect(() => {
    if (showNameInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showNameInput])

  // Show name input when modal opens and no name exists
  useEffect(() => {
    if (open && !hasName) {
      setShowNameInput(true)
    }
  }, [open, hasName])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters")
      return
    }
    setSaving(true)
    setProfileName(trimmed)
    setError("")
    setShowNameInput(false)
    setSaving(false)
    setSaved(true)
  }

  const handleClose = () => {
    setShowNameInput(false)
    setName("")
    setError("")
    onOpenChange(false)
  }

  if (!certificate) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${showNameInput ? "max-w-md" : "max-w-7xl"} max-h-[90vh] overflow-y-auto p-0 bg-black border-white/[0.08]`}>
        {showNameInput ? (
          <div className="space-y-6">
            <DialogHeader className="p-6 pt-8 border-b border-white/[0.08]">
              <DialogTitle className="text-2xl font-bold text-white">Enter Your Name</DialogTitle>
              <DialogDescription className="text-white/50">
                This name will appear on your Swarms Academy certificate.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNameSubmit} className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="certificate-name" className="block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    id="certificate-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    autoComplete="name"
                    disabled={saving}
                    className="bg-[#0a0a0a] border-white/[0.14] text-white placeholder:text-white/40 h-12 text-base focus:border-white/30 focus:bg-white/[0.06]"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "name-error" : undefined}
                  />
                  {!saving && name.trim().length >= 2 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 transition-opacity">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  {saving && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 animate-spin">
                      <Loader2 className="h-5 w-5" />
                    </div>
                  )}
                </div>
                {error && (
                  <p id="name-error" className="font-mono text-[11px] text-red-400 flex items-center gap-1" role="alert">
                    <X className="h-3.5 w-3.5 flex-shrink-0" />
                    {error}
                  </p>
                )}
              </div>
              <DialogFooter className="pt-4 border-t border-white/[0.08]">
                <Button
                  type="submit"
                  disabled={saving || name.trim().length < 2}
                  className="w-full sm:w-auto h-12 text-base"
                  size="lg"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Continue
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
            {saved && (
              <div
                className="fixed bottom-6 right-6 z-50 animate-slide-up bg-emerald-500/90 text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg"
                role="status"
                aria-live="polite"
              >
                <Check className="h-4 w-4" />
                Name saved!
              </div>
            )}
          </div>
        ) : (
          <>
            <DialogTitle className="sr-only">Certificate of Completion</DialogTitle>
            <CourseCertificate certificate={certificate} />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}