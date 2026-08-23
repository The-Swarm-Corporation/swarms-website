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
    <article
      className="relative w-full max-w-4xl mx-auto bg-[#040408] text-white"
      role="article"
      aria-labelledby="certificate-title"
      style={{
        backgroundColor: "#040408",
        color: "#ffffff",
        fontFamily: "Montserrat, sans-serif",
        position: "relative",
      }}
    >
      {/* Scanlines background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(239, 68, 68, 0.05) 0px,
            rgba(239, 68, 68, 0.05) 1px,
            transparent 1px,
            transparent 2px
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: "14px 14px",
          pointerEvents: "none",
        }}
      />

      {/* Outer border with corner brackets */}
      <div className="relative" style={{ margin: "24px" }}>
        {/* Corner brackets */}
        <div
          className="absolute inset-0"
          style={{
            border: "2px solid #ef4444",
            borderRadius: "16px",
            pointerEvents: "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              border: "0.5px solid rgba(239, 68, 68, 0.6)",
              borderRadius: "12px",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Edge ticks */}
        <div className="absolute inset-0 pointer-events-none" style={{ margin: "24px" }}>
          <div
            className="absolute inset-0"
            style={{
              border: "0.3px solid rgba(239, 68, 68, 0.3)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Corner brackets outer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            margin: "24px",
            border: "1.4px solid #ef4444",
            borderRadius: "16px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              border: "0.5px solid rgba(239, 68, 68, 0.6)",
              borderRadius: "12px",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          className="relative h-full flex flex-col"
          style={{
            minHeight: "calc(100vh - 4rem)",
            padding: "48px",
          }}
        >
          <header className="flex flex-col items-center text-center pb-8 border-b" style={{ borderColor: "rgba(239, 68, 68, 0.2)" }}>
            {/* SWARMS ACADEMY */}
            <p
              className="font-mono uppercase tracking-widest"
              style={{
                fontSize: "9pt",
                fontWeight: "700",
                color: "#ef4444",
                letterSpacing: "0.4em",
              }}
            >
              S W A R M S   A C A D E M Y
            </p>

            {/* Certificate of Completion */}
            <h1
              id="certificate-title"
              className="font-bold"
              style={{
                fontSize: "26pt",
                fontWeight: "700",
                color: "#ffffff",
                marginTop: "22pt",
              }}
            >
              Certificate of Completion
            </h1>
            <div style={{ marginTop: "22pt" }}>
              {/* Logo flanked by glowing lines */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-24 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent)",
                  }}
                />
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border"
                    style={{
                      borderColor: "rgba(239, 68, 68, 0.3)",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    <Image
                      src="/logo.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div
                  className="w-24 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent)",
                  }}
                />
              </div>
            </div>

            {/* Diamond nodes at ends of glow lines */}
            <div
              className="absolute"
              style={{
                bottom: "calc(100% - 20pt)",
                left: "calc(50% - 68pt)",
                width: "8pt",
                height: "8pt",
                backgroundColor: "#ef4444",
                borderRadius: "2pt",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: "calc(100% - 20pt)",
                right: "calc(50% - 68pt)",
                width: "8pt",
                height: "8pt",
                backgroundColor: "#ef4444",
                borderRadius: "2pt",
              }}
            />
          </header>

          <main className="flex-1 flex flex-col items-center justify-center text-center py-10">
            {/* This certificate is proudly awarded to */}
            <p
              className="max-w-2xl"
              style={{
                fontSize: "12pt",
                fontWeight: "400",
                lineHeight: "1.6",
                color: "rgba(209, 213, 219, 1)",
                marginBottom: "18pt",
              }}
            >
              This certificate is proudly awarded to
            </p>

            {/* Recipient name - FOCAL POINT */}
            <div className="mb-8">
              <p
                className="font-mono font-bold tracking-tight leading-tight break-words px-4"
                style={{
                  fontSize: "28pt",
                  fontWeight: "700",
                  color: "#ffffff",
                  lineHeight: "1.1",
                  marginBottom: "17pt",
                }}
              >
                {displayName}
              </p>
              {/* Accent line under name */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-16 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent)",
                  }}
                />
                <span
                  className="font-mono uppercase tracking-wider"
                  style={{
                    fontSize: "10pt",
                    color: "rgba(239, 68, 68, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                  }}
                >
                  Recipient
                </span>
                <div
                  className="w-16 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent)",
                  }}
                />
              </div>
            </div>

            {/* for successfully completing the */}
            <p
              className="max-w-2xl"
              style={{
                fontSize: "12pt",
                fontWeight: "400",
                lineHeight: "1.6",
                color: "rgba(209, 213, 219, 1)",
                marginBottom: "17pt",
              }}
            >
              for successfully completing the
            </p>

            {/* Course title */}
            <p
              className="font-serif max-w-3xl"
              style={{
                fontSize: "20pt",
                fontWeight: "600",
                color: "#ffffff",
                lineHeight: "1.2",
                marginBottom: "26pt",
              }}
            >
              {certificate.courseTitle}
            </p>

            {/* Completion Date */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm" style={{ fontFamily: "Montserrat, monospace" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: "rgba(107, 114, 128, 1)" }}>Completion Date:</span>
                <span style={{ color: "#ffffff" }}>
                  {formattedDate}
                </span>
              </div>
            </div>
          </main>

          <footer className="pt-8">
            <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <p
                className="font-mono uppercase tracking-widest"
                style={{
                  fontSize: "8pt",
                  color: "rgba(156, 163, 175, 1)",
                  letterSpacing: "0.2em",
                }}
              >
                Swarms Team
              </p>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}