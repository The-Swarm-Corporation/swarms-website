"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Download, FileText } from "lucide-react"
import { CourseCertificate } from "@/components/academy/course-certificate"
import { useAcademyProgress, getCertificateData } from "@/lib/academy/progress"
import { downloadCertificatePDF } from "@/lib/academy/certificate-pdf"

export default function CertificatePage() {
  const router = useRouter()
  const progress = useAcademyProgress()
  const [certificate, setCertificate] = useState<ReturnType<typeof getCertificateData> | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const cert = getCertificateData(progress)
    if (!cert) {
      router.push("/academy/swarms-api")
    } else {
      setCertificate(cert)
    }
    setLoading(false)
  }, [progress, router])

  const handleDownload = () => {
    if (!certificate) return
    setDownloading(true)
    try {
      downloadCertificatePDF(certificate)
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

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6 flex justify-end gap-3">
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