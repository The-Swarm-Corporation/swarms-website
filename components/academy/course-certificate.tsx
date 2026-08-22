"use client"

import Image from "next/image"
import { Printer } from "lucide-react"
import { CertificateData } from "@/lib/academy/progress"

export function CourseCertificate({ certificate }: { certificate: CertificateData }) {
  const handlePrint = () => {
    window.print()
  }

  const displayName = certificate.recipientName?.trim() || "Your Name"

  return (
    <div className="academy-certificate-container min-h-screen w-full bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex justify-end print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-black/50 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:border-red-400 hover:text-red-300 hover:bg-red-500/10 backdrop-blur-sm"
            aria-label="Print certificate"
          >
            <Printer className="h-4 w-4" strokeWidth={1.5} />
            Print
          </button>
        </div>

        <article className="academy-certificate border border-red-500/20 bg-black p-8 sm:p-12 md:p-16 print:border-red-500 print:border-2 print:rounded-none print:shadow-none" role="article" aria-labelledby="certificate-title">
          <div className="relative space-y-10 print:space-y-6">
            <header className="text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-red-400/80">
                Swarms Academy
              </p>
              <h1 id="certificate-title" className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Certificate of Completion
              </h1>
              <div className="mt-8 flex items-center justify-center gap-8 print:mt-6 print:gap-4">
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent print:bg-red-500/30" aria-hidden="true" />
                <div className="relative p-3">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="absolute -inset-1 rounded-lg border border-red-500/10 animate-pulse" aria-hidden="true" />
                </div>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent print:bg-red-500/30" aria-hidden="true" />
              </div>
            </header>

            <section className="space-y-6 text-center print:space-y-3">
              <p className="text-lg font-normal leading-relaxed text-white/50 sm:text-xl">
                This certificate is awarded to
              </p>
              <div className="space-y-3">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl break-words leading-tight font-mono">
                  {displayName}
                </p>
              </div>
              <p className="text-lg font-normal leading-relaxed text-white/50 sm:text-xl">
                for successfully completing the
              </p>
              <p className="text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                {certificate.courseTitle}
              </p>
            </section>

            <section className="grid gap-8 text-center sm:grid-cols-3 border-t border-red-500/20 pt-8 print:border-red-500/30">
              <div className="space-y-2">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Final Rank
                </p>
                <p className="text-2xl font-bold tracking-tight text-red-400 sm:text-3xl">
                  {certificate.finalRank}
                </p>
              </div>
              <div className="space-y-2 border-l border-red-500/20 pl-6 sm:border-l-0 sm:border-t sm:pt-6 sm:pl-0 print:border-red-500/30">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Total Points
                </p>
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {certificate.totalPoints.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2 border-l border-red-500/20 pl-6 sm:border-l-0 sm:border-t sm:pt-6 sm:pl-0 print:border-red-500/30">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Completion Date
                </p>
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {certificate.completionDate ?? "—"}
                </p>
              </div>
            </section>
          </div>
        </article>
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
          }
          .academy-certificate-container {
            padding: 0 !important;
            min-height: auto !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
          @page {
            margin: 0.5in 0.5in 0.5in 0.5in;
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
          .academy-certificate .print-border {
            border-color: #ef4444 !important;
          }
          .academy-certificate .print-bg {
            background-color: #ef4444 !important;
          }
          .academy-certificate .print-emerald {
            color: #ef4444 !important;
          }
          .academy-certificate .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
          .academy-certificate img {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}