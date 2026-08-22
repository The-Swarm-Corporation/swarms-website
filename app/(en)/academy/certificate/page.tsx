"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Download, Printer } from "lucide-react"
import { CourseCertificate } from "@/components/academy/course-certificate"
import { useAcademyProgress, getCertificateData } from "@/lib/academy/progress"

export default function CertificatePage() {
  const router = useRouter()
  const progress = useAcademyProgress()
  const [certificate, setCertificate] = useState<ReturnType<typeof getCertificateData> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cert = getCertificateData(progress)
    if (!cert) {
      router.push("/academy/swarms-api")
    } else {
      setCertificate(cert)
    }
    setLoading(false)
  }, [progress, router])

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

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6 flex justify-end gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-black/50 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:border-red-400 hover:text-red-300 hover:bg-red-500/10 backdrop-blur-sm"
            aria-label="Print certificate"
          >
            <Printer className="h-4 w-4" strokeWidth={1.5} />
            Print
          </button>
          <button
            type="button"
            onClick={async () => {
              await window.print()
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white hover:bg-white/10 backdrop-blur-sm"
            aria-label="Save as PDF"
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Save as PDF
          </button>
        </div>

        <CourseCertificate certificate={certificate} />
      </div>
    </div>
  )
}