import { existsSync, openSync, readSync, closeSync } from "node:fs"
import path from "node:path"

/**
 * Pixel dimensions of an image in /public, read from the file header at
 * render time so blog images can go through next/image with their real
 * aspect ratio instead of a 16:9 guess. A wrong ratio makes the browser
 * reserve the wrong box and reflow when the image loads (layout shift).
 *
 * Server only: it touches the filesystem. Results are cached per process,
 * and posts are statically generated, so each file is read once per build.
 */

export interface ImageDimensions {
  width: number
  height: number
}

const PUBLIC_DIR = path.join(process.cwd(), "public")
const HEADER_BYTES = 64 * 1024
const cache = new Map<string, ImageDimensions | null>()

function readHeader(file: string): Buffer | null {
  if (!existsSync(file)) return null
  const fd = openSync(file, "r")
  try {
    const bytes = new Uint8Array(HEADER_BYTES)
    const n = readSync(fd, bytes, 0, HEADER_BYTES, 0)
    return Buffer.from(bytes.buffer, 0, n)
  } finally {
    closeSync(fd)
  }
}

function parsePng(b: Buffer): ImageDimensions | null {
  // Signature, then the IHDR chunk: length(4) "IHDR"(4) width(4) height(4).
  if (b.length < 24 || b.toString("ascii", 1, 4) !== "PNG") return null
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

function parseGif(b: Buffer): ImageDimensions | null {
  if (b.length < 10 || b.toString("ascii", 0, 3) !== "GIF") return null
  return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
}

function parseJpeg(b: Buffer): ImageDimensions | null {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null
  // Walk the marker segments until a start-of-frame marker (SOF0..SOF15,
  // excluding DHT/JPG/DAC) which holds height(2) then width(2).
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) return null
    const marker = b[i + 1]
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01 || marker === 0xff) {
      i += marker === 0xff ? 1 : 2
      continue
    }
    const length = b.readUInt16BE(i + 2)
    const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
    if (isSof) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) }
    }
    i += 2 + length
  }
  return null
}

function parseWebp(b: Buffer): ImageDimensions | null {
  if (b.length < 30 || b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") return null
  const chunk = b.toString("ascii", 12, 16)
  if (chunk === "VP8X") {
    return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
  }
  if (chunk === "VP8 ") {
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
  }
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21)
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
  }
  return null
}

/**
 * Dimensions for a `/public` path such as `/some_banner.png`, or null when
 * the file is missing or not a PNG, JPEG, GIF or WebP.
 */
export function publicImageDimensions(src: string): ImageDimensions | null {
  const clean = src.split(/[?#]/)[0]
  if (cache.has(clean)) return cache.get(clean) ?? null

  const file = path.join(PUBLIC_DIR, clean)
  let dims: ImageDimensions | null = null
  // Refuse anything that escapes /public; markdown can say "../".
  if (file.startsWith(PUBLIC_DIR + path.sep)) {
    const header = readHeader(file)
    if (header) {
      dims = parsePng(header) ?? parseJpeg(header) ?? parseGif(header) ?? parseWebp(header)
    }
  }
  cache.set(clean, dims)
  return dims
}
