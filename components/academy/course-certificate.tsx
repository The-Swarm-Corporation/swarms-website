"use client"

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
    <article
      className="academy-certificate relative w-full overflow-hidden rounded-2xl bg-black p-10 sm:p-14 md:p-16 shadow-xl"
      role="article"
      aria-labelledby="certificate-title"
      style={{
        backgroundImage:
          "linear-gradient(rgba(239,68,68,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Inner hairline frame */}
      <div
        className="pointer-events-none absolute inset-6 sm:inset-8 rounded-xl border border-red-500/25"
        aria-hidden="true"
      />

      {/* Corner brackets */}
      <span
        className="pointer-events-none absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-red-500 sm:left-6 sm:top-6"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-red-500 sm:right-6 sm:top-6"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-4 left-4 h-10 w-10 border-b-2 border-l-2 border-red-500 sm:bottom-6 sm:left-6"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-red-500 sm:bottom-6 sm:right-6"
        aria-hidden="true"
      />

      <div className="relative flex flex-col">
        <header className="flex flex-col items-center text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-red-500">
            Swarms Academy
          </p>

          <h1
            id="certificate-title"
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Certificate of Completion
          </h1>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div
              className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent via-red-500/60 to-red-500/60"
              aria-hidden="true"
            />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-red-500 bg-black">
              {/* hexagon dot cluster */}
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <circle cx="11" cy="4.5" r="2.6" fill="#ef4444" />
                <circle cx="5.5" cy="8" r="2.6" fill="#ef4444" />
                <circle cx="16.5" cy="8" r="2.6" fill="#ef4444" />
                <circle cx="5.5" cy="14" r="2.6" fill="#ef4444" />
                <circle cx="16.5" cy="14" r="2.6" fill="#ef4444" />
                <circle cx="11" cy="17.5" r="2.6" fill="#ef4444" />
                <circle cx="11" cy="11" r="2.6" fill="#ef4444" />
              </svg>
            </div>
            <div
              className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent via-red-500/60 to-red-500/60"
              aria-hidden="true"
            />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <p className="text-sm sm:text-base font-semibold text-white/50 mb-5">
            This certificate is proudly awarded to
          </p>

          <p className="mb-8 px-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white break-words">
            {displayName}
          </p>

          <p className="text-sm sm:text-base font-semibold text-white/50 mb-3">
            for successfully completing the
          </p>

          <p className="mb-10 max-w-3xl text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            {certificate.courseTitle}
          </p>

          <p className="font-mono text-sm text-white/40">
            <span>Completion Date: </span>
            <span className="font-semibold text-white">{formattedDate}</span>
          </p>
        </main>
      </div>
    </article>
  )
}