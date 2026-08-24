"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Download, FileText, Check, ArrowLeft } from "lucide-react"
import { CourseCertificate } from "@/components/academy/course-certificate"
import { useAcademyProgress, getCertificateData, setProfileName, getProfile } from "@/lib/academy/progress"
import { downloadCertificatePDF } from "@/lib/academy/certificate-pdf"

export default function CertificatePage() {
  const router = useRouter()
  const progress = useAcademyProgress()
  const [certificate, setCertificate] = useState<ReturnType<typeof getCertificateData> | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [showNameInput, setShowNameInput] = useState(false)
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [savingName, setSavingName] = useState(false)

  useEffect(() => {
    const cert = getCertificateData(progress)
    const profile = getProfile(progress)
    const hasName = profile.name?.trim().length ?? 0 >= 2

    if (!cert) {
      router.push("/academy/swarms-api")
    } else if (!hasName) {
      setShowNameInput(true)
      setCertificate(cert)
      setLoading(false)
    } else {
      setCertificate(cert)
      setLoading(false)
    }
  }, [progress, router])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setNameError("Name must be at least 2 characters")
      return
    }
    setSavingName(true)
    setProfileName(trimmed)
    setNameError("")
    setShowNameInput(false)
    setSavingName(false)
  }

  const handleDownload = async () => {
    if (!certificate) return
    setDownloading(true)
    try {
      await downloadCertificatePDF(certificate)
    } finally {
      setTimeout(() => setDownloading(false), 500)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Loading certificate
          </p>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return null
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="space-y-6">
            <div className="text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-red-400/80 mb-2">
                Swarms Academy
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Certificate of Completion
              </h1>
              <p className="mt-4 text-white/50">
                Enter your name to personalize your certificate
              </p>
            </div>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="certificate-name" className="block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="certificate-name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(""); }}
                    placeholder=""
                    autoComplete="name"
                    disabled={savingName}
                    className="w-full bg-[#0a0a0a] border border-white/[0.14] text-white placeholder:text-white/40 h-12 text-base px-4 focus:border-white/30 focus:bg-white/[0.06] focus:outline-none rounded-lg"
                    aria-invalid={nameError ? "true" : "false"}
                    autoFocus
                  />
                  {!savingName && name.trim().length >= 2 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  {savingName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 animate-spin">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}
                </div>
                {nameError && (
                  <p className="font-mono text-[11px] text-red-400 flex items-center gap-1" role="alert">
                    <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                    {nameError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={savingName || name.trim().length < 2}
                className="w-full h-12 text-base rounded-full bg-white text-black font-medium transition-colors hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingName ? (
                  <>
                    <FileText className="mr-2 h-4 w-4 animate-spin inline-block" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4 inline-block" />
                    Continue
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white hover:bg-white/10 backdrop-blur-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Back
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-black/50 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:border-red-400 hover:text-red-300 hover:bg-red-500/10 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download certificate PDF"
          >
            <FileText className="h-4 w-4" strokeWidth={1.5} />
            {downloading ? "Generating..." : "Download Certificate PDF"}
          </button>
        </div>

        <CourseCertificate certificate={certificate} />
      </div>
    </div>
  )
}