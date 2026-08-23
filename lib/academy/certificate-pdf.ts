import { jsPDF } from "jspdf"
import { CertificateData } from "./progress"

const PAGE_WIDTH = 297
const PAGE_HEIGHT = 210
const MARGIN = 24
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN

const RED = [239, 68, 68] as const
const RED_GLOW = [239, 68, 68, 120] as const
const WHITE = [255, 255, 255] as const
const GRAY_300 = [209, 213, 219] as const
const GRAY_400 = [156, 163, 175] as const
const GRAY_500 = [107, 114, 128] as const
const GRAY_600 = [75, 85, 99] as const
const GRAY_700 = [55, 65, 81] as const
const GRAY_800 = [31, 41, 55] as const
const BLACK = [0, 0, 0] as const
const NEON_RED = [255, 45, 85] as const
const DARK_RED = [139, 0, 30] as const

function setFont(doc: jsPDF, style: "normal" | "bold" = "normal", size: number) {
  doc.setFont("helvetica", style)
  doc.setFontSize(size)
}

function setTextColor(doc: jsPDF, color: readonly [number, number, number] | readonly [number, number, number, number]) {
  doc.setTextColor(color[0], color[1], color[2])
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

function drawGlowLine(
  doc: jsPDF,
  x1: number,
  y: number,
  x2: number,
  color: readonly [number, number, number] = NEON_RED,
  glowWidth = 3
) {
  const steps = 30
  const stepWidth = (x2 - x1) / steps
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1)
    const opacity = Math.sin(ratio * Math.PI)
    const r = Math.round(color[0] * opacity)
    const g = Math.round(color[1] * opacity)
    const b = Math.round(color[2] * opacity)
    doc.setDrawColor(r, g, b)
    doc.setLineWidth(glowWidth * opacity + 0.3)
    doc.line(x1 + i * stepWidth, y, x1 + (i + 1) * stepWidth, y)
  }
}

function drawFuturisticGrid(doc: jsPDF) {
  doc.setDrawColor(239, 68, 68, 15)
  doc.setLineWidth(0.15)
  const gridSize = 12
  for (let x = MARGIN; x <= PAGE_WIDTH - MARGIN; x += gridSize) {
    doc.line(x, MARGIN, x, PAGE_HEIGHT - MARGIN)
  }
  for (let y = MARGIN; y <= PAGE_HEIGHT - MARGIN; y += gridSize) {
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  }
}

function drawCornerBrackets(doc: jsPDF, x: number, y: number, w: number, h: number, color: readonly [number, number, number], size = 12, width = 1.5) {
  doc.setDrawColor(...color)
  doc.setLineWidth(width)
  // Top-left
  doc.line(x, y, x + size, y)
  doc.line(x, y, x, y + size)
  // Top-right
  doc.line(x + w - size, y, x + w, y)
  doc.line(x + w, y, x + w, y + size)
  // Bottom-left
  doc.line(x, y + h, x + size, y + h)
  doc.line(x, y + h - size, x, y + h)
  // Bottom-right
  doc.line(x + w - size, y + h, x + w, y + h)
  doc.line(x + w, y + h - size, x + w, y + h)
}

function drawCircuitAccents(doc: jsPDF) {
  doc.setDrawColor(239, 68, 68, 40)
  doc.setLineWidth(0.4)
  const cx = PAGE_WIDTH / 2
  const cy = PAGE_HEIGHT / 2
  
  // Subtle circuit lines radiating from center
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const r1 = 80
    const r2 = 120
    const x1 = cx + r1 * Math.cos(angle)
    const y1 = cy + r1 * Math.sin(angle)
    const x2 = cx + r2 * Math.cos(angle)
    const y2 = cy + r2 * Math.sin(angle)
    doc.line(x1, y1, x2, y2)
    
    // Small nodes
    doc.setFillColor(239, 68, 68, 60)
    doc.circle(x1, y1, 1.5, "F")
    doc.circle(x2, y2, 1, "F")
  }
  
  // Corner micro-chips
  const chipSize = 8
  const corners = [
    [MARGIN + 8, MARGIN + 8],
    [PAGE_WIDTH - MARGIN - 8, MARGIN + 8],
    [MARGIN + 8, PAGE_HEIGHT - MARGIN - 8],
    [PAGE_WIDTH - MARGIN - 8, PAGE_HEIGHT - MARGIN - 8],
  ]
  corners.forEach(([x, y]) => {
    doc.setDrawColor(239, 68, 68, 80)
    doc.setLineWidth(0.5)
    doc.roundedRect(x - chipSize/2, y - chipSize/2, chipSize, chipSize, 1, 1, "D")
    doc.setFillColor(239, 68, 68, 30)
    doc.roundedRect(x - chipSize/2 + 1, y - chipSize/2 + 1, chipSize - 2, chipSize - 2, 0.5, 0.5, "F")
  })
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

  // Deep black background
  doc.setFillColor(4, 4, 8)
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F")

  // Subtle grid pattern
  drawFuturisticGrid(doc)

  // Circuit accents
  drawCircuitAccents(doc)

  // Outer border with corner brackets
  const borderX = MARGIN
  const borderY = MARGIN
  const borderW = CONTENT_WIDTH
  const borderH = PAGE_HEIGHT - 2 * MARGIN
  
  drawCornerBrackets(doc, borderX, borderY, borderW, borderH, NEON_RED, 16, 2)
  
  // Inner subtle border
  doc.setDrawColor(239, 68, 68, 60)
  doc.setLineWidth(0.5)
  doc.roundedRect(borderX + 3, borderY + 3, borderW - 6, borderH - 6, 3, 3, "D")

  let y = MARGIN + 20
  const centerX = PAGE_WIDTH / 2

  // SWARMS ACADEMY - small, tracked, neon red
  setFont(doc, "normal", 9)
  setTextColor(doc, NEON_RED)
  doc.text("SWARMS ACADEMY", centerX, y, { align: "center", characterSpacing: 4 })
  y += 14

  // CERTIFICATE OF COMPLETION - large, bold, white
  setFont(doc, "bold", 32)
  setTextColor(doc, WHITE)
  doc.text("CERTIFICATE OF COMPLETION", centerX, y, { align: "center", characterSpacing: 1 })
  y += 18

  // Glowing divider
  drawGlowLine(doc, centerX - 80, y, centerX + 80)
  y += 22

  // "This certifies that" - elegant, gray
  setFont(doc, "normal", 15)
  setTextColor(doc, GRAY_300)
  doc.text("This certifies that", centerX, y, { align: "center" })
  y += 22

  // Recipient name - FOCAL POINT, large, bold, white with subtle glow effect
  const displayName = certificate.recipientName?.trim() || "Your Name"
  setFont(doc, "bold", 40)
  setTextColor(doc, WHITE)
  const nameLines = doc.splitTextToSize(displayName, CONTENT_WIDTH - 30)
  // Draw name with slight letter spacing for impact
  nameLines.forEach((line: string, i: number) => {
    doc.text(line, centerX, y + i * 18, { align: "center", characterSpacing: 0.5 })
  })
  y += nameLines.length * 18 + 16

  // Accent line under name
  drawGlowLine(doc, centerX - 60, y, centerX + 60, NEON_RED, 2)
  y += 18

  // "has successfully completed" - gray
  setFont(doc, "normal", 15)
  setTextColor(doc, GRAY_300)
  doc.text("has successfully completed", centerX, y, { align: "center" })
  y += 22

  // Course title - bold, white, serif-like (helvetica bold)
  setFont(doc, "bold", 26)
  setTextColor(doc, WHITE)
  const courseTitleLines = doc.splitTextToSize(certificate.courseTitle, CONTENT_WIDTH - 30)
  courseTitleLines.forEach((line: string, i: number) => {
    doc.text(line, centerX, y + i * 14, { align: "center", characterSpacing: 0.3 })
  })
  y += courseTitleLines.length * 14 + 28

  // Major divider line - full width, glowing
  drawGlowLine(doc, MARGIN + 20, y, PAGE_WIDTH - MARGIN - 20, NEON_RED, 1.5)
  y += 22

  // Metadata row - Completion Date | Certificate ID
  const colWidth = CONTENT_WIDTH / 2
  const startX = MARGIN + 30

  // Labels - small, tracked, dim
  setFont(doc, "normal", 7.5)
  setTextColor(doc, GRAY_500)
  doc.text("COMPLETION DATE", startX, y, { align: "left", characterSpacing: 1.2 })
  doc.text("CERTIFICATE ID", startX + colWidth, y, { align: "right", characterSpacing: 1.2 })
  y += 10

  // Values - clean, white
  setFont(doc, "normal", 11)
  setTextColor(doc, WHITE)
  doc.text(formatDate(certificate.completionDate), startX, y, { align: "left" })
  setFont(doc, "normal", 9)
  doc.text(certificate.certificateId, startX + colWidth, y, { align: "right" })
  y += 18

  // Rank badge - small, neon red, right-aligned
  setFont(doc, "normal", 7.5)
  setTextColor(doc, GRAY_500)
  doc.text("FINAL RANK", startX, y, { align: "left", characterSpacing: 1.2 })
  setFont(doc, "bold", 11)
  setTextColor(doc, NEON_RED)
  doc.text(certificate.finalRank, startX, y + 9, { align: "left" })

  // Swarms logo mark - bottom center
  setFont(doc, "normal", 8)
  setTextColor(doc, GRAY_500)
  doc.text("SWARMS TEAM", centerX, PAGE_HEIGHT - MARGIN - 14, { align: "center", characterSpacing: 2 })

  // Futuristic corner marks on the inner content area
  const innerX = MARGIN + 15
  const innerY = MARGIN + 15
  const innerW = CONTENT_WIDTH - 30
  const innerH = PAGE_HEIGHT - 2 * MARGIN - 30
  drawCornerBrackets(doc, innerX, innerY, innerW, innerH, [239, 68, 68, 40], 8, 0.8)

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