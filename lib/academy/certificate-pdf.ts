import { jsPDF } from "jspdf"
import { CertificateData } from "./progress"

const PAGE_WIDTH = 297
const PAGE_HEIGHT = 210
const MARGIN = 24
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN

const RED = [239, 68, 68] as const
const WHITE = [255, 255, 255] as const
const GRAY_400 = [156, 163, 175] as const
const GRAY_500 = [107, 114, 128] as const
const GRAY_600 = [75, 85, 99] as const
const BLACK = [0, 0, 0] as const

function setFont(doc: jsPDF, style: "normal" | "bold" = "normal", size: number) {
  doc.setFont("helvetica", style)
  doc.setFontSize(size)
}

function setTextColor(doc: jsPDF, color: readonly [number, number, number]) {
  doc.setTextColor(...color)
}

function drawText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  options: {
    align?: "left" | "center" | "right"
    maxWidth?: number
    style?: "normal" | "bold"
    size?: number
    color?: readonly [number, number, number]
  } = {}
) {
  const { align = "left", maxWidth, style = "normal", size = 12, color = BLACK } = options
  setFont(doc, style, size)
  setTextColor(doc, color)
  doc.text(text, x, y, { align, maxWidth })
}

function drawLine(
  doc: jsPDF,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: readonly [number, number, number] = GRAY_400,
  width = 0.5
) {
  doc.setDrawColor(...color)
  doc.setLineWidth(width)
  doc.line(x1, y1, x2, y2)
}

function drawGradientLine(
  doc: jsPDF,
  x1: number,
  y: number,
  x2: number,
  color: readonly [number, number, number] = RED
) {
  const steps = 20
  const stepWidth = (x2 - x1) / steps
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1)
    const opacity = Math.sin(ratio * Math.PI) * 0.5 + 0.1
    const r = Math.round(color[0] * opacity + 255 * (1 - opacity))
    const g = Math.round(color[1] * opacity + 255 * (1 - opacity))
    const b = Math.round(color[2] * opacity + 255 * (1 - opacity))
    doc.setDrawColor(r, g, b)
    doc.setLineWidth(0.8)
    doc.line(x1 + i * stepWidth, y, x1 + (i + 1) * stepWidth, y)
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function generateCertificatePDF(certificate: CertificateData): Blob {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  })

  doc.setFillColor(0, 0, 0)
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F")

  let y = MARGIN

  doc.setDrawColor(...RED)
  doc.setLineWidth(1.5)
  doc.roundedRect(MARGIN, MARGIN, CONTENT_WIDTH, PAGE_HEIGHT - 2 * MARGIN, 4, 4, "D")

  y += 16

  const centerX = PAGE_WIDTH / 2

  setFont(doc, "normal", 9)
  setTextColor(doc, GRAY_500)
  doc.text("SWARMS ACADEMY", centerX, y, { align: "center", characterSpacing: 1.2 })
  y += 6

  setFont(doc, "bold", 28)
  setTextColor(doc, WHITE)
  doc.text("CERTIFICATE OF COMPLETION", centerX, y, { align: "center" })
  y += 14

  drawGradientLine(doc, centerX - 40, y, centerX + 40)
  y += 14

  setFont(doc, "normal", 14)
  setTextColor(doc, GRAY_400)
  doc.text("Presented to", centerX, y, { align: "center" })
  y += 16

  const displayName = certificate.recipientName?.trim() || "Your Name"
  setFont(doc, "bold", 32)
  setTextColor(doc, WHITE)
  const nameLines = doc.splitTextToSize(displayName, CONTENT_WIDTH - 20)
  const nameHeight = nameLines.length * 12
  doc.text(nameLines, centerX, y, { align: "center" })
  y += nameHeight + 10

  drawLine(doc, centerX - 60, y, centerX + 60, y, RED, 1)
  y += 10

  setFont(doc, "normal", 9)
  setTextColor(doc, RED)
  doc.text("RECIPIENT", centerX, y, { align: "center", characterSpacing: 1 })
  y += 16

  setFont(doc, "normal", 14)
  setTextColor(doc, GRAY_400)
  doc.text("For successfully completing", centerX, y, { align: "center" })
  y += 14

  setFont(doc, "bold", 22)
  setTextColor(doc, WHITE)
  const courseTitleLines = doc.splitTextToSize(certificate.courseTitle, CONTENT_WIDTH - 20)
  doc.text(courseTitleLines, centerX, y, { align: "center" })
  y += courseTitleLines.length * 11 + 18

  const metadataY = y
  const colWidth = CONTENT_WIDTH / 3
  const startX = MARGIN + 10

  setFont(doc, "normal", 8)
  setTextColor(doc, GRAY_500)

  doc.text("COMPLETION DATE", startX, metadataY, { align: "left" })
  setFont(doc, "bold", 11)
  setTextColor(doc, WHITE)
  doc.text(formatDate(certificate.completionDate), startX, metadataY + 6, { align: "left" })

  doc.text("CERTIFICATE ID", startX + colWidth, metadataY, { align: "center" })
  setFont(doc, "bold", 9)
  setTextColor(doc, WHITE)
  doc.text(certificate.certificateId, startX + colWidth, metadataY + 6, { align: "center" })

  doc.text("FINAL RANK", startX + 2 * colWidth, metadataY, { align: "right" })
  setFont(doc, "bold", 11)
  setTextColor(doc, RED)
  doc.text(certificate.finalRank, startX + 2 * colWidth, metadataY + 6, { align: "right" })

  y = metadataY + 22

  drawLine(doc, MARGIN + 20, y, PAGE_WIDTH - MARGIN - 20, y, GRAY_600, 0.3)
  y += 12

  const sigY = y + 20
  const sigLeftX = MARGIN + 30
  const sigRightX = PAGE_WIDTH - MARGIN - 30
  const sigLineWidth = 80

  drawLine(doc, sigLeftX, sigY, sigLeftX + sigLineWidth, sigY, WHITE, 0.5)
  drawLine(doc, sigLeftX, sigY + 4, sigLeftX + sigLineWidth, sigY + 4, GRAY_600, 0.3)

  drawLine(doc, sigRightX - sigLineWidth, sigY, sigRightX, sigY, WHITE, 0.5)
  drawLine(doc, sigRightX - sigLineWidth, sigY + 4, sigRightX, sigY + 4, GRAY_600, 0.3)

  setFont(doc, "normal", 7)
  setTextColor(doc, GRAY_500)
  doc.text("AUTHORIZED SIGNATURE", sigLeftX + sigLineWidth / 2, sigY + 10, { align: "center", characterSpacing: 0.5 })
  doc.text("DATE", sigRightX - sigLineWidth / 2, sigY + 10, { align: "center", characterSpacing: 0.5 })

  y = sigY + 18

  drawLine(doc, MARGIN + 20, y, PAGE_WIDTH - MARGIN - 20, y, GRAY_600, 0.3)
  y += 8

  setFont(doc, "normal", 7)
  setTextColor(doc, GRAY_600)
  doc.text(
    `Verify this certificate at swarms.ai/verify/${certificate.certificateId}`,
    centerX,
    y,
    { align: "center", characterSpacing: 0.3 }
  )
  y += 5
  doc.text(
    `Swarms Academy · ${certificate.courseTitle} · ${certificate.certificateId}`,
    centerX,
    y,
    { align: "center", characterSpacing: 0.3 }
  )

  return doc.output("blob")
}

export function downloadCertificatePDF(certificate: CertificateData): void {
  const blob = generateCertificatePDF(certificate)
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `swarms-certificate-${certificate.certificateId}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}