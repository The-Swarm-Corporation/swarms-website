"use client"

import Image from "next/image"
import { CertificateData } from "@/lib/academy/progress"

export function CourseCertificate({ certificate }: { certificate: CertificateData }) {
  const displayName = certificate.recipientName?.trim() || "Your Name"
  const formattedDate = certificate.completionDate
    ? new Date(certificate.completionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—"

  return (
    <article className="academy-certificate border border-red-500/20 bg-black p-8 sm:p-12 md:p-16 print:border-red-500 print:border-2 print:rounded-none print:shadow-none" role="article" aria-labelledby="certificate-title">
      <div className="relative h-full min-h-[calc(100vh-4rem)] flex flex-col print:min-h-auto print:flex-col">
        <header className="flex flex-col items-center text-center pb-8 border-b border-red-500/20 print:pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-500/10 border border-red-500/30">
              <Image
                src="/logo.svg"
                alt="Swarms"
                width={28}
                height={28}
                className="text-red-400"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-red-400/80">
                Swarms Academy
              </p>
              <p className="font-mono text-[9px] text-white/30 tracking-[0.2em]">Certificate of Completion</p>
            </div>
          </div>
          <h1 id="certificate-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
            Certificate of Completion
          </h1>
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-500/50 to-transparent print:bg-red-500/30" aria-hidden="true" />
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-red-500/30 bg-red-500/10">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="text-red-400"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-500/50 to-transparent print:bg-red-500/30" aria-hidden="true" />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center py-10 print:py-6">
          <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg mb-6 max-w-2xl">
            This certificate is proudly awarded to
          </p>

          <div className="mb-8">
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono leading-tight break-words px-4">
              {displayName}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-red-500/50 to-transparent print:bg-red-500/30" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400/60">Recipient</span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-red-500/50 to-transparent print:bg-red-500/30" aria-hidden="true" />
            </div>
          </div>

          <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg mb-4 max-w-2xl">
            for successfully completing the
          </p>

          <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white font-serif mb-8 max-w-3xl leading-snug">
            {certificate.courseTitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white/30">Issued:</span>
              <span className="text-white/70">{formattedDate}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 sm:hidden" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="text-white/30">Certificate ID:</span>
              <span className="text-white/50 tracking-wider">{certificate.certificateId}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 sm:hidden" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="text-white/30">Rank:</span>
              <span className="text-red-400/80 font-medium">{certificate.finalRank}</span>
            </div>
          </div>
        </main>

        <footer className="pt-8 border-t border-red-500/20 print:pt-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-3xl mx-auto">
            <div className="sm:col-span-2">
              <div className="relative h-20">
                <div className="absolute bottom-0 left-0 right-12 h-[1px] bg-white/20" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-12 h-[1px] bg-white/10" style={{ bottom: '8px' }} aria-hidden="true" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 text-center mt-2">
                Authorized Signature
              </p>
            </div>
            <div className="sm:col-span-2 text-right">
              <div className="relative h-20">
                <div className="absolute bottom-0 left-12 right-0 h-[1px] bg-white/20" aria-hidden="true" />
                <div className="absolute bottom-0 left-12 right-0 h-[1px] bg-white/10" style={{ bottom: '8px' }} aria-hidden="true" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 text-center mt-2">
                Date
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              Verify this certificate at swarms.ai/verify/{certificate.certificateId}
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              Swarms Academy · {certificate.courseTitle} · {certificate.certificateId}
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @media print {
          .academy-certificate {
            border: 1px solid #ef4444 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 2rem !important;
            max-width: none !important;
            page-break-inside: avoid;
            background: #000 !important;
            min-height: auto !important;
          }
          @page {
            margin: 0.5in;
            size: landscape;
            background: #000;
          }
          html, body {
            background: #000 !important;
            color: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .academy-certificate * {
            color: #fff !important;
          }
          .academy-certificate img {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </article>
  )
}