import { jsPDF } from "jspdf";
import { CertificateData } from "./progress";
import { Canvg } from "canvg";

const PAGE_WIDTH = 297;
const PAGE_HEIGHT = 210;
const MARGIN = 24;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;

const WHITE = [255, 255, 255] as const;
const GRAY_300 = [209, 213, 219] as const;
const GRAY_500 = [107, 114, 128] as const;
const NEON_RED = [239, 68, 68] as const;

// Montserrat Variable Font (weights 400-700) - base64 encoded TTF
const MONTSERRAT_FONT_BASE64 = "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";

const SWARMS_LOGO_SVG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05MCAyLjVDMTM4LjMyNSAyLjUgMTc3LjUgNDEuNjc1MSAxNzcuNSA5MEMxNzcuNSAxMzguMzI1IDEzOC4zMjUgMTc3LjUgOTAgMTc3LjVDNDEuNjc1MSAxNzcuNSAyLjUgMTM4LjMyNSAyLjUgOTBDMi41IDQxLjY3NTEgNDEuNjc1MSAyLjUgOTAgMi41WiIgc3Ryb2tlPSIjRUUwNzEyIiBzdHJva2Utd2lkdGg9IjUiLz4KPHBhdGggZD0iTTc4LjEwNTQgMjcuMzg4N0w5MC4wNzM4IDQ4LjIzMUw3OC4xMDU0IDY5LjA3MzRINTQuMTY4NUw0Mi4yIDQ4LjIzMUw1NC4xNjg1IDI3LjM4ODdMNzguMTA1NCAyNy4zODg3WiIgZmlsbD0iI0Y1MDcwQyIvPgo8cGF0aCBkPSJNNzguMTA1NCAxMTEuMzY3TDkwLjA3MzggMTMyLjIwOUw3OC4xMDU0IDE1My4wNTJINTQuMTY4NUw0Mi4yIDEzMi4yMDlMNTQuMTY4NSAxMTEuMzY3SDc4LjEwNTRaIiBmaWxsPSIjRjUwNzBDIi8+CjxwYXRoIGQ9Ik01NC4xNjY0IDY5LjQwMTZMNjYuMTM0OSA5MC4yNDM5TDU0LjE2NjQgMTExLjA4NkgzMC4yMjk2TDE4LjI2MTEgOTAuMjQzOUwzMC4yMjk2IDY5LjQwMTZINTQuMTY2NFoiIGZpbGw9IiNGNTA3MEMiLz4KPHBhdGggZD0iTTEyNi4xNjggMjcuMzg4N0wxMzguMTM3IDQ4LjIzMUwxMjYuMTY4IDY5LjA3MzRIMTAyLjIzMkw5MC4yNjMxIDQ4LjIzMUwxMDIuMjMyIDI3LjM4ODdMMTI2LjE2OCAyNy4zODg3WiIgZmlsbD0iI0Y1MDcwQyIvPgo8cGF0aCBkPSJNMTI2LjE2OCAxMTEuMzY3TDEzOC4xMzcgMTMyLjIwOUwxMjYuMTY4IDE1My4wNTJIMTAyLjIzMkw5MC4yNjMxIDEzMi4yMDlMMTAyLjIzMiAxMTEuMzY3SDEyNi4xNjhaIiBmaWxsPSIjRjUwNzBDIi8+CjxwYXRoIGQ9Ik0xMDIuMjMgNjkuNDAxNkwxMTQuMTk4IDkwLjI0MzlMMTAyLjIzIDExMS4wODZINzguMjkyN0w2Ni4zMjQyIDkwLjI0MzlMNzguMjkyNyA2OS40MDE2SDEwMi4yM1oiIGZpbGw9IiNGNTA3MEMiLz4KPHBhdGggZD0iTTE1MC4yOTMgNjkuNDAxNkwxNjIuMjYxIDkwLjI0MzlMMTUwLjI5MyAxMTEuMDg2SDEyNi4zNTZMMTE0LjM4NyA5MC4yNDM5TDEyNi4zNTYgNjkuNDAxNkgxNTAuMjkzWiIgZmlsbD0iI0Y1MDcwQyIvPgo8L3N2Zz4K";

function setFont(
  doc: jsPDF,
  family: "Montserrat",
  style: "normal" | "bold" = "normal",
  size: number,
) {
  doc.setFont(family, style);
  doc.setFontSize(size);
}

function setTextColor(doc: jsPDF, color: readonly [number, number, number]) {
  doc.setTextColor(color[0], color[1], color[2]);
}

/**
 * Picks the largest font size (down to minSize) that keeps `text` on a
 * single line within maxWidth, so layout height stays predictable and
 * never wraps into a second line that could overflow the page.
 * Leaves the doc's font/size set to the chosen size on return.
 */
function fitSingleLine(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  family: "Montserrat",
  style: "normal" | "bold",
  maxSize: number,
  minSize = 12,
): number {
  let size = maxSize;
  setFont(doc, family, style, size);
  while (doc.getTextWidth(text) > maxWidth && size > minSize) {
    size -= 1;
    setFont(doc, family, style, size);
  }
  return size;
}

/** A horizontal line whose opacity ramps up then down, like a soft neon glow. */
function drawGlowLine(
  doc: jsPDF,
  x1: number,
  y: number,
  x2: number,
  color: readonly [number, number, number] = NEON_RED,
  peakWidth = 1.4,
) {
  const steps = 36;
  const stepWidth = (x2 - x1) / steps;
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const opacity = Math.sin(ratio * Math.PI);
    doc.setDrawColor(color[0], color[1], color[2], opacity);
    doc.setLineWidth(peakWidth * opacity + 0.15);
    doc.line(x1 + i * stepWidth, y, x1 + (i + 1) * stepWidth, y);
  }
}

/** Very faint horizontal scanlines across the whole page for a screen-like texture. */
function drawScanlines(doc: jsPDF) {
  doc.setDrawColor(239, 68, 68, 5);
  doc.setLineWidth(0.1);
  for (let y = 0; y <= PAGE_HEIGHT; y += 1.4) {
    doc.line(0, y, PAGE_WIDTH, y);
  }
}

function drawFuturisticGrid(doc: jsPDF) {
  doc.setDrawColor(239, 68, 68, 9);
  doc.setLineWidth(0.15);
  const gridSize = 14;
  for (let x = MARGIN; x <= PAGE_WIDTH - MARGIN; x += gridSize) {
    doc.line(x, MARGIN, x, PAGE_HEIGHT - MARGIN);
  }
  for (let y = MARGIN; y <= PAGE_HEIGHT - MARGIN; y += 14) {
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  }
}

/** HUD-style corner brackets with a small filled node at each vertex. */
function drawCornerBrackets(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  color: readonly [number, number, number],
  size = 16,
  width = 1.4,
) {
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(width);
  doc.line(x, y, x + size, y);
  doc.line(x, y, x, y + size);
  doc.line(x + w - size, y, x + w, y);
  doc.line(x + w, y, x + w, y + size);
  doc.line(x, y + h, x + size, y + h);
  doc.line(x, y + h - size, x, y + h);
  doc.line(x + w - size, y + h, x + w, y + h);
  doc.line(x + w, y + h - size, x + w, y + h);

  doc.setFillColor(color[0], color[1], color[2]);
  const corners: [number, number][] = [
    [x, y],
    [x + w, y],
    [x, y + h],
    [x + w, y + h],
  ];
  corners.forEach(([cx, cy]) => doc.circle(cx, cy, 0.7, "F"));
}

/** Small tick marks along the top and bottom border edges, like a HUD ruler. */
function drawEdgeTicks(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  color: readonly [number, number, number],
) {
  doc.setDrawColor(color[0], color[1], color[2], 30);
  doc.setLineWidth(0.3);
  const tickGap = 8;
  const tickLen = 1.6;
  for (let tx = x + 30; tx <= x + w - 30; tx += tickGap) {
    doc.line(tx, y, tx, y + tickLen);
    doc.line(tx, y + h, tx, y + h - tickLen);
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateCertificatePDF(
  certificate: CertificateData,
): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Register Montserrat font (variable font covers all weights)
  doc.addFileToVFS("Montserrat.ttf", MONTSERRAT_FONT_BASE64);
  doc.addFont("Montserrat.ttf", "Montserrat", "normal");
  doc.addFont("Montserrat.ttf", "Montserrat", "bold");

  // Deep black background
  doc.setFillColor(4, 4, 8);
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");

  drawScanlines(doc);
  drawFuturisticGrid(doc);

  const borderX = MARGIN;
  const borderY = MARGIN;
  const borderW = CONTENT_WIDTH;
  const borderH = PAGE_HEIGHT - 2 * MARGIN;
  const centerX = PAGE_WIDTH / 2;
  const textMaxWidth = CONTENT_WIDTH - 50;

  drawEdgeTicks(doc, borderX, borderY, borderW, borderH, NEON_RED);
  drawCornerBrackets(
    doc,
    borderX,
    borderY,
    borderW,
    borderH,
    NEON_RED,
    16,
    1.4,
  );

  doc.setDrawColor(239, 68, 68, 45);
  doc.setLineWidth(0.4);
  doc.roundedRect(
    borderX + 3,
    borderY + 3,
    borderW - 6,
    borderH - 6,
    3,
    3,
    "D",
  );

  // Fixed vertical rhythm — every line has a known, single-line height,
  // so the stack can never overrun the border like the last version did.
  let y = 46;

  // SWARMS ACADEMY
  setFont(doc, "Montserrat", "bold", 8);
  setTextColor(doc, NEON_RED);
  doc.text("S W A R M S   A C A D E M Y", centerX, y, { align: "center" });
  y += 13;

  // Certificate of Completion
  setFont(doc, "Montserrat", "bold", 23);
  setTextColor(doc, WHITE);
  doc.text("Certificate of Completion", centerX, y, { align: "center" });
  y += 22;

  // Logo flanked by glowing lines with small diamond nodes at the ends
  const logoSize = 16;
  const badgeY = y - 2;
  drawGlowLine(
    doc,
    centerX - 68,
    badgeY,
    centerX - logoSize / 2 - 4,
    NEON_RED,
    1,
  );
  drawGlowLine(
    doc,
    centerX + logoSize / 2 + 4,
    badgeY,
    centerX + 68,
    NEON_RED,
    1,
  );
  doc.setFillColor(NEON_RED[0], NEON_RED[1], NEON_RED[2]);
  doc.circle(centerX - 68, badgeY, 0.6, "F");
  doc.circle(centerX + 68, badgeY, 0.6, "F");

  const logoSvg = SWARMS_LOGO_SVG.replace("data:image/svg+xml;base64,", "");
  const logoSvgDecoded = atob(logoSvg);

  // Render onto a canvas larger than the final display size, with the SVG
  // drawn inset from the canvas edges. The logo's outer ring sits right at
  // its own viewBox boundary, so rendering it at 100% of a tight canvas
  // clips the ring during rasterization — the inset margin fixes that.
  const canvasScale = 12;
  const canvas = document.createElement("canvas");
  canvas.width = logoSize * canvasScale;
  canvas.height = logoSize * canvasScale;
  const ctx = canvas.getContext("2d")!;
  const inset = canvas.width * 0.06;
  const v = await Canvg.from(ctx, logoSvgDecoded, {
    ignoreDimensions: true,
    offsetX: inset,
    offsetY: inset,
    scaleWidth: canvas.width - inset * 2,
    scaleHeight: canvas.height - inset * 2,
  });
  await v.render();
  const logoPng = canvas.toDataURL("image/png");
  doc.addImage(
    logoPng,
    "PNG",
    centerX - logoSize / 2,
    badgeY - logoSize / 2,
    logoSize,
    logoSize,
  );

  y += 20;

  // This certificate is proudly awarded to
  setFont(doc, "Montserrat", "normal", 11);
  setTextColor(doc, GRAY_300);
  doc.text("This certificate is proudly awarded to", centerX, y, {
    align: "center",
  });
  y += 18;

  // Recipient name — bold monospace, auto-sized to always stay on one line
  const displayName = certificate.recipientName?.trim() || "Your Name";
  fitSingleLine(doc, displayName, textMaxWidth, "Montserrat", "bold", 28, 16);
  setTextColor(doc, WHITE);
  doc.text(displayName, centerX, y, { align: "center" });
  y += 17;

  // for successfully completing the
  setFont(doc, "Montserrat", "normal", 11);
  setTextColor(doc, GRAY_300);
  doc.text("for successfully completing the", centerX, y, { align: "center" });
  y += 17;

  // Course title — serif, auto-sized to stay on one line
  const courseTitle = certificate.courseTitle?.trim() || "";
  fitSingleLine(doc, courseTitle, textMaxWidth, "Montserrat", "normal", 18, 12);
  setTextColor(doc, WHITE);
  doc.text(courseTitle, centerX, y, { align: "center" });
  y += 26;

  // Completion Date — inline label + value, monospace
  const label = "Completion Date: ";
  const value = formatDate(certificate.completionDate);
  setFont(doc, "Montserrat", "normal", 10);
  const labelWidth = doc.getTextWidth(label);
  setFont(doc, "Montserrat", "bold", 10);
  const valueWidth = doc.getTextWidth(value);
  const lineStartX = centerX - (labelWidth + valueWidth) / 2;

  setFont(doc, "Montserrat", "normal", 10);
  setTextColor(doc, GRAY_500);
  doc.text(label, lineStartX, y, { align: "left" });
  setFont(doc, "Montserrat", "bold", 10);
  setTextColor(doc, WHITE);
  doc.text(value, lineStartX + labelWidth, y, { align: "left" });

  return doc.output("blob");
}

export async function downloadCertificatePDF(
  certificate: CertificateData,
): Promise<void> {
  const blob = await generateCertificatePDF(certificate);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `swarms-certificate-${certificate.certificateId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}